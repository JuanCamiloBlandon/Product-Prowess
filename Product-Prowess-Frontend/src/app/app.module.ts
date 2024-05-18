import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RegisterService } from "./services/register.service";


import { ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AvatarModule} from 'primeng/avatar';
import { AvatarGroupModule} from 'primeng/avatargroup';
import { MessageService } from "primeng/api";


import {routes} from "./app.routes";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SearchModalComponent } from "./components/search-modal/search-modal.component";
import { AvatarsComponent } from "./components/avatars/avatars.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent, 
        RegisterComponent,
        DashboardComponent,
        SearchModalComponent,
        AvatarsComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        ToastModule,
        AvatarModule,
        AvatarGroupModule,
        RouterModule.forRoot(routes),
        
    ],

    providers: [
        RegisterService,
        MessageService
        
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}