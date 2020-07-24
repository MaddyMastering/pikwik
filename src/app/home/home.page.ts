import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { IdeasService } from '../ideas.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  cities = [];
  facilities = [];
  floors = [];

  selected = {
    city: '',
    facility: '',
    floor: '',
    date: '',
    checkbox: {
      today: true,
      tomorrow: true
    },
    idea_uuid: ''
  };

  isCovidPerson = false;

  user = {
    organization_name: '',
    organization_uuid: '',
    user_emailId: '',
    user_organizationUuid: '',
    user_passcode: '',
    user_password: '',
    user_uuid: ''
  };

  subscribe: Subscription;

  constructor(
    public router: Router,
    public platform: Platform,
    public auth: AuthService,
    public idea: IdeasService,
    public splashScreen: SplashScreen,
    public toastController: ToastController
  ) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(0, () => {
      if (window.confirm("Do you want to exit app ?")) {
        navigator["app"].exitApp();
      }
    });
  }

  ngOnInit() {
    const authData = this.auth.isLoggedIn();
    this.user = authData.user;
    
    this.idea.getCities(this.user.user_organizationUuid).then((resp: any) => {
      this.cities = resp.cities;
    });
  }

  ngAfterViewInit() {
    this.splashScreen.hide();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onCitySelected() {
    if (this.selected.city != '') {
      this.idea.getFacilites(this.user.user_organizationUuid, this.selected.city).then((resp: any) => {
        this.facilities = resp.facilities;
        this.floors = [];
        this.selected.facility = '';
        this.selected.floor = '';
      });
    }
  }

  onFacilitySelected() {
    if (this.selected.city != '' && this.selected.facility != '') {
      this.idea.getFloors(this.user.user_organizationUuid, this.selected.city, this.selected.facility).then((resp: any) => {
        this.floors = resp.floors;
        this.selected.floor = '';
      });
    }
  }

  onFloorSelected(floor: any) {
    this.selected.floor = floor.idea_floor;
    this.selected.idea_uuid = floor.idea_uuid;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  book() {
    if (!this.selected.city) {
      this.presentToast('Please select city');
      return;
    }

    if (!this.selected.facility) {
      this.presentToast('Please select facility');
      return;
    }

    if (!this.selected.floor) {
      this.presentToast('Please select floor');
      return;
    }

    this.idea.confirmBooking(
      this.selected.idea_uuid,
      this.selected.checkbox.today,
      this.selected.checkbox.tomorrow,
      this.user.user_emailId
    ).then((resp: any) => {
      this.selected = {
        city: '',
        facility: '',
        floor: '',
        date: '',
        checkbox: {
          today: true,
          tomorrow: true
        },
        idea_uuid: ''
      };

      this.floors = [];

      if (resp.status === 200) {
        this.router.navigate(['confirm', 'SUCCESS', resp.message.id]);
      } else {
        this.router.navigate(['confirm', 'FAILURE', ''])
      }
    }).catch(err => {
      console.error(err);
      this.presentToast('We are sorry trouble at our end');
    });
  }
}
