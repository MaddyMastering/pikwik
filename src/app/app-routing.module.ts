import { NgModule, Injectable } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Router, CanActivate } from '@angular/router';

import { HomePage } from './home/home.page';
import { SignInPage } from './signin/signin.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password';
import { PasscodePage } from './passcode/passcode';
import { RegisterPage } from './register/register';
import { ConfirmationPage } from './confirmation/confirmation';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}


@Injectable()
export class UserGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      return true;
    }
  }
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: SignInPage,
    canActivate: [UserGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPage,
    canActivate: [UserGuard]
  },
  {
    path: 'passcode/:emailId',
    component: PasscodePage,
    canActivate: [UserGuard]
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [UserGuard]
  },
  {
    path: 'confirm',
    component: ConfirmationPage,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
