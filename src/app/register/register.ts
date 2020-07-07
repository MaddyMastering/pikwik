import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
        public toastController: ToastController
    ) { }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Account successfully created.',
            duration: 2000
        });
        toast.present();
    }

    register() {
        this.presentToast();
        this.router.navigate(['passcode']);
    }
}
