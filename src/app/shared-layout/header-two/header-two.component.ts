import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header-two',
    templateUrl: './header-two.component.html',
    styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {
    constructor(public router: Router,) {}

    ngOnInit() {}
}
