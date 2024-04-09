const express = require('express');
const dbConnection = require('./database/config');
require('dotenv').config();

// Env VARS
const { APP_PORT } = process.env


const app = express();

// Parsing body payload
app.use(express.json());

// DB CONNECTION
dbConnection()


// app routes
app.use('/api/v1', require('./routes/auth') );
app.use('/api/v1', require('./routes/productsRoute') );
app.use('/api/v1', require('./routes/commentsRoute') )


app.listen(APP_PORT, () => {
    console.log(`Servidor corriendo en puerto: ${APP_PORT}`);
  });