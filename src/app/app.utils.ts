import {
    Directive,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    Input
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[btnClickDebounce]'
})
export class BtnClickDebounce implements OnInit {
    @Input() debounceTime = 500;
    @Output() dbClick = new EventEmitter();
    private clicks = new Subject();
    private subscription: Subscription;

    constructor() { }

    ngOnInit() {
        this.subscription = this.clicks
            .pipe(debounceTime(this.debounceTime))
            .subscribe(e => this.dbClick.emit(e));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}