import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
    selector: 'app-header-four',
    templateUrl: './header-four.component.html',
    styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent implements OnInit {
    constructor(public router: Router,) {}

    ngOnInit() {}
}
