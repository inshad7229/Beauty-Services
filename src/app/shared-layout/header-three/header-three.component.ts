import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
    selector: 'app-header-three',
    templateUrl: './header-three.component.html',
    styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {
    constructor(public router: Router,) {}

    ngOnInit() {}
}
