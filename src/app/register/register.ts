import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.html',
    styleUrls: ['register.scss'],
})
export class RegisterPage implements AfterViewInit, OnDestroy {
    user = {
        email: '',
        password: ''
    };

    subscribe: Subscription;

    constructor(
        public router: Router,
        public auth: AuthService,
        public platform: Platform,
        public toastController: ToastController
    ) { }

    ngAfterViewInit() {
        this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
            window.history.back();
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

    register() {
        if (this.user.email.length <= 0) {
            this.presentToast('Please enter email');
            return;
        }

        if (this.user.password.length <= 0) {
            this.presentToast('Please enter password');
            return;
        }
        
        this.auth.register(this.user.email, this.user.password).then((resp: any) => {
            if (resp.status === 200) {
                this.router.navigate(['passcode', this.user.email]);
            } else {
                this.presentToast(resp.error);
            }
        }).catch(err => {
            console.error(err);
            this.presentToast('We are sorry, trouble at our end');
        });
    }
}
