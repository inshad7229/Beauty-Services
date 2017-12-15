import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $ :any;

declare var WOW;


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    saloon
    customer
    constructor() {}

    ngOnInit() {
    	  

          var sync1 = $("#sync1");
          var sync2 = $("#sync2");
          var sync1_copy = $("#sync1_copy");

          sync1.owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            navigation: false,
            pagination:false,
            afterAction : syncPosition,
            responsiveRefreshRate : 200,
             autoPlay : true,
             
          });

            sync1_copy.owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            navigation: false,
            pagination:false,
            afterAction : syncPosition,
            responsiveRefreshRate : 200,
            autoPlay : true,
          });

          sync2.owlCarousel({
            items :4,
            itemsDesktop      : [1199,4],
            itemsDesktopSmall     : [979,4],
            itemsTablet       : [768,4],
            itemsMobile       : [479,4],
            pagination:false,
            responsiveRefreshRate : 100,
            afterInit : function(el){
              el.find(".owl-item").eq(0).addClass("synced");
            }
          });

          function syncPosition(el){
            var current = this.currentItem;
            $("#sync2")
              .find(".owl-item")
              .removeClass("synced")
              .eq(current)
              .addClass("synced")
            if($("#sync2").data("owlCarousel") !== undefined){
              center(current)
            }

          }

          $("#sync2").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo",number);
          });


          $("#sync2").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1_copy.trigger("owl.goTo",number);
          });

          function center(number){
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;

            var num = number;
            var found = false;
            for(var i in sync2visible){
              if(num === sync2visible[i]){
                var found = true;
              }
            }

            if(found===false){
              if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
              }else{
                if(num - 1 === -1){
                  num = 0;
                }
                sync2.trigger("owl.goTo", num);
              }
            } else if(num === sync2visible[sync2visible.length-1]){
              sync2.trigger("owl.goTo", sync2visible[1])
            } else if(num === sync2visible[0]){
              sync2.trigger("owl.goTo", num-1)
            }
          }

        var owl = $(".owl-demo1");
         
        owl.owlCarousel({
	        items : 4, //10 items above 1000px browser width
	        itemsDesktop : [1000,3], //5 items between 1000px and 901px
	        itemsDesktopSmall : [900,3], // betweem 900px and 601px
	        itemsTablet: [600,2], //2 items between 600 and 0
	        itemsMobile : [480,1] // itemsMobile disabled - inherit from itemsTablet option
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

	    jQuery(document).ready(function($) {
            $('.count').counterUp({
                delay: 10,
                time: 1000
            });
        });

    }
}
