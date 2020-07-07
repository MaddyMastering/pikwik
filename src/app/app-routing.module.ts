import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { SignInPage } from './signin/signin.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password';
import { PasscodePage } from './passcode/passcode';
import { RegisterPage } from './register/register';
import { ConfirmationPage } from './confirmation/confirmation';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'login',
    component: SignInPage
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPage
  },
  {
    path: 'passcode',
    component: PasscodePage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'confirm',
    component: ConfirmationPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
