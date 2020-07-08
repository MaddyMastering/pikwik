import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, LoginGuard, UserGuard } from './app-routing.module';
import { HomePage } from './home/home.page';
import { SignInPage } from './signin/signin.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password';
import { PasscodePage } from './passcode/passcode';
import { RegisterPage } from './register/register';
import { ConfirmationPage } from './confirmation/confirmation';
import { AuthService } from './auth.service';

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
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    AuthService,
    LoginGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
