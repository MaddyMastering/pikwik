import { Component, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.html',
    styleUrls: ['signin.scss'],
})
export class SignInPage implements AfterViewInit, OnDestroy {

    user = {
        email: '',
        password: ''
    };

    subscribe: Subscription;

    constructor(
        public router: Router,
        public auth: AuthService,
        public platform: Platform,
        public splashScreen: SplashScreen,
        public toastController: ToastController
    ) { }

    ngAfterViewInit() {
        this.splashScreen.hide();

        this.subscribe = this.platform.backButton.subscribeWithPriority(0, () => {
            if (window.confirm("Do you want to exit app ?")) {
                navigator["app"].exitApp();
            }
        });
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

    signin() {
        if (this.user.email.length <= 0) {
            this.presentToast('Please enter email');
            return;
        }

        if (this.user.password.length <= 0) {
            this.presentToast('Please enter password');
            return;
        }

        this.auth.login(this.user.email, this.user.password).then((resp: any) => {
            if (resp.status === 200) {
                this.auth.saveLoginUser({ loggedIn: true, user: resp.message.user });
                this.router.navigate(['home']);
            } else if (resp.status === 406) {
                this.router.navigate(['passcode', this.user.email]);
            } else if (resp.status === 404) {
                this.presentToast(resp.error);
            } 
        }).catch(err => {
            console.error(err);
            this.presentToast('We are sorry trouble at our end');
        });
    }
}
