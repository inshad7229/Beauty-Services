import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-customer-signup',
    templateUrl: './customer-signup.component.html',
    styleUrls: ['./customer-signup.component.scss']
})
export class CustomerSignupComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}
}
