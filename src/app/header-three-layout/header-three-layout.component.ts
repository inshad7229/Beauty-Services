import { Component, OnInit } from '@angular/core';
import {AppProvider} from '../providers/app.provider'

@Component({
    selector: 'app-header-three-layout',
    templateUrl: './header-three-layout.component.html',
    styleUrls: ['./header-three-layout.component.scss']
})
export class HeaderThreeLayoutComponent implements OnInit {
    constructor(private appProvider:AppProvider) {}

    ngOnInit() {}
}
