import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
        public toastController: ToastController
    ) { }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Invalid username or password.',
            duration: 2000
        });
        toast.present();
    }

    signin() {
        this.presentToast();
        this.router.navigate(['home']);
    }
}
