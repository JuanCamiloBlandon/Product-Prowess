import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RegisterService } from "./services/register/register.service";


import { ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AvatarModule} from 'primeng/avatar';
import { AvatarGroupModule} from 'primeng/avatargroup';
import { MessageService } from "primeng/api";
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CarouselModule } from 'primeng/carousel';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogModule} from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule} from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ChipModule} from 'primeng/chip';
import { CalendarModule} from 'primeng/calendar';

import {routes} from "./app.routes";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SearchModalComponent } from "./components/search-modal/search-modal.component";
import { AvatarsComponent } from "./components/avatars/avatars.component";
import { TechnologiesComponent } from "./components/technologies/technologies.component";
import { ImageselectorComponent } from "./components/imageselector/imageselector.component";
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ProductdetailsComponent } from "./components/productdetails/productdetails.component";



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent, 
        RegisterComponent,
        DashboardComponent,
        SearchModalComponent,
        AvatarsComponent,
        TechnologiesComponent,
        ImageselectorComponent,
        ListProductsComponent,
        FooterComponent,
        ProductdetailsComponent
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
        PanelModule,
        CardModule,
        InputTextareaModule,
        CarouselModule,
        TreeSelectModule,
        DialogModule,
        ProgressSpinnerModule,
        DynamicDialogModule,
        ChipModule,
        CalendarModule,
        RouterModule.forRoot(routes),
        
    ],

    providers: [
        RegisterService,
        MessageService,
        DialogService,
        
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}