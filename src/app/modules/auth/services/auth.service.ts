import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    autenticationState = new BehaviorSubject(false);

    constructor(
        public http: HttpClient
    ) { }

    login(formData: { email: string, password: string }) {
        return new Promise((resolve, reject) => {
            const response = this.http.post("auth/login", formData);

            response.subscribe((data: any) => {
                this.saveSession(data.data);
                this.authenticate();
                resolve(data);
            }, (err) => { reject(err); });
        });
    }

    isAuthenticated() {
        return this.autenticationState.value;
    }

    authenticate() {
        this.autenticationState.next(true);
    }

    unauthenticate() {
        this.autenticationState.next(false);
    }

    saveSession(sessionData: any) {
        localStorage.setItem("sessionData", JSON.stringify(sessionData));
        return true;
    }

    loadSession() {
        const session: string | null = localStorage.getItem("sessionData");
        const sessionData = (session) ? JSON.parse(session) : null;
        return sessionData;
    }

    removeSession() {
        localStorage.removeItem("sessionData");
        return true;
    }

    logout() {
        this.removeSession();
        this.unauthenticate();
    }
}
