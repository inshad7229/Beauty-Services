import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
    	    // let data = localStorage['user'];
        	// this.userService.user.admin=JSON.parse(data);
        	
            return true;
        }

       // this.router.navigate(['/header-two-layout/login']);
       //this.router.navigate(['/payment-process/3']);
        return true;
    }
}
