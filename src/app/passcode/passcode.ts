import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-passcode',
    templateUrl: 'passcode.html',
    styleUrls: ['passcode.scss'],
})
export class PasscodePage implements OnInit, AfterViewInit, OnDestroy {

    user = {
        email: '',
        code: ''
    };

    subscribe: Subscription;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public auth: AuthService,
        public platform: Platform,
        public toastController: ToastController
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.user.email = params['emailId'];
        });
    }

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

    confirm() {
        if (this.user.code.length <= 0) {
            this.presentToast('Please enter passcode');
            return;
        }

        this.auth.passcode(this.user.email, this.user.code).then((res: any) => {
            if (res.status === 200) {
                this.auth.saveLoginUser('TRUE');
                this.router.navigate(['home']);
            } else {
                this.presentToast(res.error);
            }
        }).catch(err => {
            console.error(err);
            this.presentToast('We are sorry, trouble at our end');
        });
    }

}
