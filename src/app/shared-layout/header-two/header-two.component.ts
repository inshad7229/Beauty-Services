import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-header-two',
    templateUrl: './header-two.component.html',
    styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {
    constructor(public router: Router,private translate: TranslateService) {}

    ngOnInit() {}
}
