import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

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
        public auth: AuthService,
        public toastController: ToastController
    ) { }

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
