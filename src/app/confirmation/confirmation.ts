import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-confirmation',
    templateUrl: 'confirmation.html',
    styleUrls: ['confirmation.scss'],
})
export class ConfirmationPage implements AfterViewInit, OnDestroy {

    subscribe: Subscription;

    constructor(
        public router: Router,
        public platform: Platform
    ) { }

    ngAfterViewInit() {
        this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
            window.history.back();
        });
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    back() {
        this.router.navigate(['home']);
    }
}
