import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router,
    public auth: AuthService
    ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  book() {
    this.router.navigate(['confirm']);
  }
}
