 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function(jquery) {

	"use strict";

	jquery(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		jquery('.js-fullheight').css('height', jquery(window).height());
		jquery(window).resize(function(){
			jquery('.js-fullheight').css('height', jquery(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if(jquery('#ftco-loader').length > 0) {
				jquery('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   jquery.Scrollax();

	var carousel = function() {
		jquery('.carousel-cause').owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding:0,
			nav: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1,
					stagePadding: 0
				},
				600:{
					items: 2,
					stagePadding: 50
				},
				1000:{
					items: 3,
					stagePadding: 100
				}
			}
		});

	};
	carousel();

	jquery('nav .dropdown').hover(function(){
		var jquerythis = jquery(this);
		// 	 timer;
		// clearTimeout(timer);
		jquerythis.addClass('show');
		jquerythis.find('> a').attr('aria-expanded', true);
		// jquerythis.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		jquerythis.find('.dropdown-menu').addClass('show');
	}, function(){
		var jquerythis = jquery(this);
			// timer;
		// timer = setTimeout(function(){
			jquerythis.removeClass('show');
			jquerythis.find('> a').attr('aria-expanded', false);
			// jquerythis.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			jquerythis.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	jquery('#dropdown04').on('show.bs.dropdown', function () {
	  ////console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		jquery(window).scroll(function(){
			var jqueryw = jquery(this),
					st = jqueryw.scrollTop(),
					navbar = jquery('.ftco_navbar'),
					sd = jquery('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var counter = function() {
		
		jquery('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !jquery(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = jquery.animateNumber.numberStepFactories.separator(',')
				jquery('.number').each(function(){
					var jquerythis = jquery(this),
						num = jquerythis.data('number');
						////console.log(num);
					jquerythis.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		jquery('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !jquery(this.element).hasClass('ftco-animated') ) {
				
				i++;

				jquery(this.element).addClass('item-animate');
				setTimeout(function(){

					jquery('body .ftco-animate.item-animate').each(function(k){
						var el = jquery(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		jquery(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = jquery('.navbar-toggler');
		 	jquery('html, body').animate({
		    scrollTop: jquery(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		jquery('body').on('activate.bs.scrollspy', function () {
		  ////console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	jquery('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  jquery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  jquery('#appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	jquery('#appointment_time').timepicker();




})(jQuery);

