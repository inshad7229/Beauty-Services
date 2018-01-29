import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-create-new-password',
    templateUrl: './create-new-password.component.html',
    styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}
}
