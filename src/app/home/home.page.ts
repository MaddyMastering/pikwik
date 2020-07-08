import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  subscribe: Subscription;

  constructor(
    public router: Router,
    public platform: Platform,
    public auth: AuthService
  ) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(0, () => {
      if (window.confirm("Do you want to exit app ?")) {
        navigator["app"].exitApp();
      }
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  book() {
    this.router.navigate(['confirm']);
  }
}
