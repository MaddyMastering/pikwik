import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.html',
    styleUrls: ['forgot-password.scss'],
})
export class ForgotPasswordPage {

    user = {
        email: ''
    };

    constructor(
        public router: Router,
        public toastController: ToastController
    ) { }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Account not found.',
            duration: 2000
        });
        toast.present();
    }

    forgotPassword() {
        this.presentToast();
        this.router.navigate(['passcode']);
    }

}
