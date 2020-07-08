import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.html',
    styleUrls: ['register.scss'],
})
export class RegisterPage {
    user = {
        email: '',
        password: ''
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

    register() {
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
