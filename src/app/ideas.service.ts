import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IdeasService {
    constructor(private http: HttpClient) { }

    getOrganizations() {
        return this.http.get('https://pikwok.herokuapp.com/idea/organizations').toPromise();
    }

    getCities(organizationId: any) {
        return this.http.get('https://pikwok.herokuapp.com/idea/cities/' + organizationId).toPromise();
    }

    getFacilites(organizationId: any, city: string) {
        return this.http.get('https://pikwok.herokuapp.com/idea/facilities/' + organizationId + '/' + city).toPromise();
    }

    getFloors(organizationId: any, city: string, facility: string) {
        return this.http.get('https://pikwok.herokuapp.com/idea/floors/' + organizationId + '/' + city + '/' + facility).toPromise();
    }

    confirmBooking(id: string, today: boolean, tomorrow: boolean, email: string) {
        return this.http.post('https://pikwok.herokuapp.com/idea/book', {
            id: id,
            requireToday: today,
            requireTomorrow: tomorrow,
            emailId: email
        }).toPromise();
    }
}