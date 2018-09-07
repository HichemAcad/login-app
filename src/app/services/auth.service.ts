import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

    private getToken(): string {
        return localStorage.getItem('token');
    }

    logIn(credentials) {
        return this.http.post<any>('api/authentication', credentials, {observe: 'response'}).pipe(map(
            (response: HttpResponse<any>) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.body.token);
                    return true;
                } else {
                    return false;
                }
            }
        ));
    }

    logOut() {
        localStorage.removeItem('token');
    }

    isAdmin() {
        if (this.isAuthentified()) {
            return this.jwtHelper.decodeToken(this.getToken()).admin;
        }

        return false;
    }

    isAuthentified () {
        if (this.getToken() && ! this.jwtHelper.isTokenExpired(this.getToken())) {
            return true;
        } else {
            localStorage.removeItem('token');
            return false;
        }
    }

}
