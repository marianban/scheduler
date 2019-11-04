(function ($) {
 "use strict";
	
	// slicknav
	$('ul#navigation').slicknav({
		prependTo:".responsive-menu-wrap"
	});
	
	/*------------- preloader js --------------*/
	$(window).on("load", function() { // makes sure the whole site is loaded
		$('.loader-container').fadeOut(); // will first fade out the loading animation
		$('.loader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(150).css({'overflow':'visible'})
	})

	
	/*----------------------------
	wow js active
	------------------------------ */
	new WOW().init();
   
	  // featured-product-active
	 $('.featured-product-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			600:{
				items:2
			},
			778:{
				items:3
			},
			1000:{
				items:4
			}
		}
	})
   
	  // blog-active
	 $('.blog-active').owlCarousel({
		smartSpeed:1000,
		margin:0,
		nav:true,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			450:{
				items:1
			},
			600:{
				items:2
			},
			778:{
				items:3
			},
			1000:{
				items:3
			}
		}
	})

	/*-- price range start --*/
	function collision($div1, $div2) {
		var x1 = $div1.offset().left;
		var w1 = 40;
		var r1 = x1 + w1;
		var x2 = $div2.offset().left;
		var w2 = 40;
		var r2 = x2 + w2;

		if (r1 < x2 || x1 > r2) return false;
		return true;
      
    }
    
	// slider call

	$('#slider').slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function(event, ui) {
			
			$('.ui-slider-handle:eq(0) .price-range-min').html('$' + ui.values[ 0 ]);
			$('.ui-slider-handle:eq(1) .price-range-max').html('$' + ui.values[ 1 ]);
			$('.price-range-both').html('<i>$' + ui.values[ 0 ] + ' - </i>$' + ui.values[ 1 ] );
			
			//
			
	    if ( ui.values[0] === ui.values[1] ) {
	      $('.price-range-both i').css('display', 'none');
	    } else {
	      $('.price-range-both i').css('display', 'inline');
	    }
	        
	        //
			
			if (collision($('.price-range-min'), $('.price-range-max')) === true) {
				$('.price-range-min, .price-range-max').css('opacity', '0');	
				$('.price-range-both').css('display', 'block');		
			} else {
				$('.price-range-min, .price-range-max').css('opacity', '1');	
				$('.price-range-both').css('display', 'none');		
			}
			
		}
	});

	$('.ui-slider-range').append('<span class="price-range-both value"><i>$' + $('#slider').slider('values', 0 ) + ' - </i>' + $('#slider').slider('values', 1 ) + '</span>');

	$('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">$' + $('#slider').slider('values', 0 ) + '</span>');

	$('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">$' + $('#slider').slider('values', 1 ) + '</span>');
	/*-- price range End --*/
	
	 // blog-active
	 $('.author-active').owlCarousel({
		smartSpeed:1000,
		margin:15,
		nav:true,
		loop:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:2
			},
			450:{
				items:3
			},
			600:{
				items:4
			},
			778:{
				items:5
			},
			1000:{
				items:6
			}
		}
	})
	
	/*--------------------------
	scrollUp
	---------------------------- */	
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	}); 	   
	
	// counter up
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	// product-details-active
	$('.product-details-active').owlCarousel({
        smartSpeed:1000,
        margin:0,
		loop:true,
        nav:false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        URLhashListener:true,
        startPosition: 'URLHash',
        responsive:{
            0:{
                items:1
            },
            450:{
                items:1
            },
            678:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
	
	// thamb-active
	$(".thamb-active").owlCarousel({
		loop: true,
		autoplay: false,
		items: 1,
		nav: true,
		autoplayHoverPause: true,
		animateOut: 'slideOutUp',
		animateIn: 'slideInUp',
		navText:['<i class="fa fa-angle-up"></i>','<i class="fa fa-angle-down"></i>'],
	});
 
})(jQuery); 