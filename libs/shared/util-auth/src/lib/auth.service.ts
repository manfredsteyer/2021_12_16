import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

    // Blackboard
    userName = '';

    // userName$ = new BehaviorSubject<string>('');

    login(userName: string, password: string): void {
        // Login for the honest ones!
        this.userName = userName;
    }

}