import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-confirmation',
    templateUrl: 'confirmation.html',
    styleUrls: ['confirmation.scss'],
})
export class ConfirmationPage implements OnInit, AfterViewInit, OnDestroy {

    isSuccess = false;
    subscribe: Subscription;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public platform: Platform
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['status'] === 'SUCCESS') {
                this.isSuccess = true;
            } else {
                this.isSuccess = false;
            }
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

    back() {
        this.router.navigate(['home']);
    }
}
