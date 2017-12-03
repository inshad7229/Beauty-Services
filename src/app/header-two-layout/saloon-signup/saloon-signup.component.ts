import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-saloon-signup',
    templateUrl: './saloon-signup.component.html',
    styleUrls: ['./saloon-signup.component.scss']
})
export class SaloonSignupComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}
}
