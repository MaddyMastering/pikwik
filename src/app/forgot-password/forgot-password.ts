import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.html',
    styleUrls: ['forgot-password.scss'],
})
export class ForgotPasswordPage implements AfterViewInit, OnDestroy {

    user = {
        email: ''
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

    forgotPassword() {
        this.auth.forgotpassword(this.user.email).then((res: any) => {
            if (res.status === 200) {
                this.router.navigate(['passcode', this.user.email]);
            } else {
                this.presentToast(res.error);
            }
        }).catch(err => {
            console.error(err);
            this.presentToast('We are sorry, trouble at our end');
        });
    }
}
