import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.html',
    styleUrls: ['signin.scss'],
})
export class SignInPage {

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

    signin() {
        this.auth.login(this.user.email, this.user.password).then((resp: any) => {
            if (resp.status === 200) {
                this.auth.saveLoginUser('TRUE');
                this.router.navigate(['home']);
            } else if (resp.status === 404) {
                this.presentToast(resp.error);
            }
        }).catch(err => {
            console.error(err);
            this.presentToast('We are sorry trouble at our end');
        });
    }
}
