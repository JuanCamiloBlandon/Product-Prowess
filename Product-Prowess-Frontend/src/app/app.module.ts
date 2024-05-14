import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import {routes} from "./app.routes";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SearchModalComponent } from "./components/search-modal/search-modal.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent, 
        RegisterComponent,
        DashboardComponent,
        SearchModalComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes)
    ],

    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}