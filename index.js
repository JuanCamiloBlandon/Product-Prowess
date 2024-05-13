const express = require('express');
const dbConnection = require('./scr/infrastructure/database/config');
require('dotenv').config();
const path = require("path");

// Env VARS
const { APP_PORT } = process.env

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product-Prowess API",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:"+APP_PORT
      }
    ]
  },
  apis: [`${path.join(__dirname, "./scr/infrastructure/routes/*.js")}`]
};


const app = express();

// Parsing body payload
app.use(express.json());

// DB CONNECTION
dbConnection()


// app routes
app.use('/api/v1', require('./scr/infrastructure/routes/usersRoute') );
app.use('/api/v1', require('./scr/infrastructure/routes/productsRoute') );
app.use('/api/v1', require('./scr/infrastructure/routes/commentsRoute') )
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.listen(APP_PORT, () => {
    console.log(`Servidor corriendo en puerto: ${APP_PORT}`);
  });