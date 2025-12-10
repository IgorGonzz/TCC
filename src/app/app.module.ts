import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 

import { routes } from './app.routes'; 

// IMPORTAÇÕES (Caminho: Pasta/Nome do Arquivo TS)
import { AppComponent } from './app';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ScoreboardComponent } from './scoreboard/scoreboard';
import { HomeComponent } from './home/home';
import { FooterComponent } from './shared/footer/footer';
import { LgpdBannerComponent } from './shared/lgpd-banner/lgpd-banner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ScoreboardComponent,
    HomeComponent,
    FooterComponent,
    LgpdBannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }