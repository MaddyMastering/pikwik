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

  cities = [];
  facilities = [];
  floors = [];

  selected = {
    city: '',
    facility: '',
    floor: 0,
    date: ''
  }

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

    this.cities = [
      'Bangalore',
      'Chennai',
      'Delhi'
    ];

    this.facilities = [
      'Koramangala',
      'Basavangudi',
      'Hongasandra',
      'Attibele'
    ];

    this.floors = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  chooseFloor(floor) {
    this.selected.floor = floor;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  book() {
    this.selected = {
      city: '',
      facility: '',
      floor: 0,
      date: ''
    };
    
    this.router.navigate(['confirm']);
  }
}
