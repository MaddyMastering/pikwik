import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    isLoggedIn() {
        const message = localStorage.getItem('LOGIN');
        if (message) {
            return JSON.parse(message);
        }

        return null;
    }

    saveLoginUser(message: any) {
        localStorage.setItem('LOGIN', JSON.stringify(message));
    }

    login(email: string, password: string) {
        return this.http.post('https://pikwok.herokuapp.com/auth/login', {
            emailId: email,
            password: password
        }).toPromise();
    }

    register(email: string, password: string) {
        return this.http.post('https://pikwok.herokuapp.com/auth/register', {
            emailId: email,
            password: password
        }).toPromise();
    }

    forgotpassword(email: string) {
        return this.http.post('https://pikwok.herokuapp.com/auth/forgot-password', {
            emailId: email
        }).toPromise();
    }

    passcode(email: string, passcode: string) {
        return this.http.post('https://pikwok.herokuapp.com/auth/passcode', {
            emailId: email,
            passcode: passcode
        }).toPromise();
    }

    logout() {
        localStorage.removeItem('LOGIN');
    }
}