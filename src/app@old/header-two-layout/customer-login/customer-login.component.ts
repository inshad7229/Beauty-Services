import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-customer-login',
    templateUrl: './customer-login.component.html',
    styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}
}
