import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    isLoggedIn() {
        return localStorage.getItem('LOGIN');
    }

    saveLoginUser(id: string) {
        localStorage.setItem('LOGIN', id);
    }

    login(email: string, password: string) {
        return this.http.post('http://localhost:3000/auth/login', {
            emailId: email,
            password: password
        }).toPromise();
    }

    register(email: string, password: string) {
        return this.http.post('http://localhost:3000/auth/register', {
            emailId: email,
            password: password
        }).toPromise();
    }

    forgotpassword(email: string) {
        return this.http.post('http://localhost:3000/auth/forgot-password', {
            emailId: email
        }).toPromise();
    }

    passcode(email: string, passcode: string) {
        return this.http.post('http://localhost:3000/auth/passcode', {
            emailId: email,
            passcode: passcode
        }).toPromise();
    }

    logout() {
        localStorage.removeItem('LOGIN');
    }
}