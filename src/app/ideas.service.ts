import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IdeasService {
    constructor(private http: HttpClient) { }

    getCities() {
        return this.http.get('https://pikwok.herokuapp.com/idea/cities').toPromise();
    }

    getFacilites(city: string) {
        return this.http.get('https://pikwok.herokuapp.com/idea/facilities/' + city).toPromise();
    }

    getFloors(city: string, facility: string) {
        return this.http.get('https://pikwok.herokuapp.com/idea/floors/' + city + '/' + facility).toPromise();
    }

    confirmBooking(city: string, facility: string, date: string, floor: string) {
        return this.http.post('https://pikwok.herokuapp.com/idea/book', {
            city: city,
            facility: facility,
            date: new Date(date).getTime().toString(),
            floor: floor
        }).toPromise();
    }
}