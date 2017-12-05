import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $
declare var WOW
@Component({
    selector: 'app-searched-saloon',
    templateUrl: './searched-saloon.component.html',
    styleUrls: ['./searched-saloon.component.scss']
})
export class SearchedSaloonComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {

				$(window).scroll(function() {
			        if ($(this).scrollTop() > 1){  
			            $('header').addClass("sticky");
			        }
			        else{
			            $('header').removeClass("sticky");
			        }
			    });
			var wow = new WOW(
			        {
			            animateClass: 'animated',
			            offset:       100,
			            callback:     function(box) {
			                console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
			            }
			        }
			    );
			    wow.init();
			$(window).load(function() {
			        $(".datetimepicker1");
			    });
			$('.datetimepicker1').datetimepicker({
			        //lang:'ch',
			         //yearOffset:200,       
			        timepicker:false,
			        format:'d-m-Y',
			        formatDate:'d-m-Y',
			        value:'Enter Date',
			        step:10,
			        minDate:'+1d',
			        scrollMonth:false,
			        scrollTime:false,
			        scrollInput:true,
			    });
			var mySlider = $("#rane-slide").slider({
			        'tooltip':'hide'
			    });
			    // Cal l a method on the slider
			    mySlider.on('change',function(){
			        var value = mySlider.slider('getValue');
			        $('.min-range').html('<b>$'+value[0]+'</b>');
			        $('.max-range').html('<b>$'+value[1]+'</b>');
			    });
		}
}
