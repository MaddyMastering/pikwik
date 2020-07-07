import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirmation',
    templateUrl: 'confirmation.html',
    styleUrls: ['confirmation.scss'],
})
export class ConfirmationPage {

    constructor(public router: Router) { }

    back() {
        this.router.navigate(['home']);
    }
}
