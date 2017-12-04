import { Component, OnInit } from '@angular/core';
declare var $
declare var jQuery
declare var Metronic
declare var Layout
declare var Demo
declare var Tasks
@Component({
    selector: 'app-customer-profile',
    templateUrl: './customer-profile.component.html',
    styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    	 $(document).ready(function() {
	            $('.multiselect').multiselect();
			        });
		$("#row2").hide();
				  	$(document).ready(function(){
					    $("#show1").click(function(){
					        $("#row1").hide(600);
					        $("#row2").show(600);
					    });
					});
		 $("#row6").hide();
				  $(document).ready(function(){
				    $("#show3").click(function(){
				        $("#row5").hide(500);
				        $("#row6").show(500);
				    });
				  });
		jQuery(document).ready(function() {    
		   Metronic.init(); // init metronic core componets
		   Layout.init(); // init layout
		   Demo.init(); // init demo features 
		   /*Index.init(); // init index page*/
		   Tasks.initDashboardWidget(); // init tash dashboard widget  
		});
    }
}
