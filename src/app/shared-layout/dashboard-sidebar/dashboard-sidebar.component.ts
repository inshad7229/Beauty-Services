import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
    selector: 'app-dashboard-sidebar',
    templateUrl: './dashboard-sidebar.component.html',
    styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
    constructor() {}

    ngOnInit() {
    	  var url = window.location;
    $('.page-sidebar-menu a').filter(function() {
        return this.href == url;
    }).parent('li').addClass('active');
    }
}
