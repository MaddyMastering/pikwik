import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { SignInPage } from './signin/signin.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password';
import { PasscodePage } from './passcode/passcode';
import { RegisterPage } from './register/register';
import { ConfirmationPage } from './confirmation/confirmation';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePage,
    SignInPage,
    ForgotPasswordPage,
    PasscodePage,
    RegisterPage,
    ConfirmationPage,
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
