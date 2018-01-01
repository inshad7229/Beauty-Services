import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('isLoggedin' ) && JSON.parse(localStorage['selectedServices'])!=null) {;
        	// if (JSON.parse(localStorage['selectedServices'])!=null) {
         //        return true;
         //    }else{
         //         this.router.navigate(['/header-one-layout/home-page']);
         //         return false;
         //    }
           return true
        }

       this.router.navigate(['/header-one-layout/home-page']);
       //this.router.navigate(['/payment-process/3']);
        return false;
    }
}
