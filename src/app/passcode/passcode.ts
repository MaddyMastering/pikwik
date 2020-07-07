import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-passcode',
    templateUrl: 'passcode.html',
    styleUrls: ['passcode.scss'],
})
export class PasscodePage {

    user = {
        code: ''
    };

    constructor(
        public router: Router,
        public toastController: ToastController
    ) { }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Passcode is invalid.',
            duration: 2000
        });
        toast.present();
    }

    confirm() {
        this.presentToast();
        this.router.navigate(['home']);
    }

}
