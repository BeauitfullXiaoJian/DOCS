import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
    IgxNavigationDrawerModule,
    IgxNavbarModule,
    IgxLayoutModule,
    IgxRippleModule,
    IgxIconModule,
    IgxButtonModule,
    IgxCardModule,
    IgxInputGroupModule,
    IgxRadioModule,
    IgxButtonGroupModule,
    IgxTabComponent,
    IgxTabsModule,
    IgxDialogModule,
    IgxSwitchModule,
} from 'igniteui-angular/main';
import { HomeComponent } from './home/home.component';
import { ApiService } from './api.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        IgxNavigationDrawerModule,
        IgxNavbarModule,
        IgxLayoutModule,
        IgxRippleModule,
        IgxIconModule,
        IgxButtonModule,
        IgxCardModule,
        IgxInputGroupModule,
        IgxRadioModule,
        IgxButtonGroupModule,
        IgxTabsModule,
        IgxDialogModule,
        IgxSwitchModule,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
