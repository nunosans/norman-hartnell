$(document).ready(function() {

	// Prepare landing page image and slideshow entrance
	$('#welcome-image').fadeTo(0, 0);
	$('#slideshow > img').fadeTo(0, 0);

	// Resize elements when the browser window is resized
	$(window).resize(function() {
		resizeWelcome();
		resizeSlideshow();
		resizeHeaderImages();
		resizeAccordingToSibling();
	});

	// Global Variables for the auto-scroller
	var y = $(window).scrollTop();
	
	var scrollSpeed = 500; //ms
	
	// Menu links that will animate the body
	var nav_links = [$('#nav-history'),
					 $('#nav-couture-and-wedding'),
					 $('#nav-menswear'),
					 $('#nav-homeware'),
					 $('#nav-footer')];
	
	// Sections the menu links should scroll to			 
	var sections = [$('#history'),
					$('#couture-and-wedding'),
					$('#menswear'),
					$('#homeware'),
					$('#contact')];

	// Apply localScroll to the nav
	$('#nav').localScroll({
		lock: true,
		target:'body'
	});

	// Make title scroll to top
	$('h1').click(function() {
		$.scrollTo('0px', 500);
	});

	// Figure out the content being displayed on the viewport
	function getLocation() {
	    
	    var offset = 0;
	    
	    if (y < sections[0].position().top - offset) {
		    ySection = 0;
		    return ySection;
	    }
	    for (section in sections) {
		    if (y >= sections[section].position().top - offset && y < sections[section].position().top + sections[section].height() - offset) {
			    ySection = sections.indexOf(sections[section]) + 1;
			    return ySection;
		    }
	    }
	    if (y >= sections[sections.length-1].position().top - offset + sections[sections.length-1].height() - offset) {
		    ySection = 7;
		    return ySection;
	    }
    };
	
	// Arrows up & down navigation
    $(document).keydown(function(event) {
	    var ySection = getLocation();
	    if (event.keyCode == '38') {
		    event.preventDefault();
		    if (ySection == 0 || ySection == 1) {
			    if (y > 0) {
			    	$.scrollTo('0px', scrollSpeed);
			    } else {return;}
		    } else {
			    var scrollPosition = sections[ySection-2].position().top;
			    $.scrollTo(scrollPosition, scrollSpeed);
		    }
	    } else if (event.keyCode == '40') {
		    event.preventDefault();
		    if (ySection == 6 || ySection == 7) {return;}
		    var scrollPosition = sections[ySection].position().top;
		    $.scrollTo(scrollPosition, scrollSpeed);
	    }
	});

	$(window).scroll(function () {
		
		y = $(window).scrollTop();
		documentHeight = $('html').height();
		windowHeight = $(window).height();
		
		// Make nav items higlight when visible
		var offset = 10;
		var padding = 100;
		
		var item1 = $("#history").position().top;
		var item2 = $("#couture-and-wedding").position().top;
		var item3 = $("#menswear").position().top;
		var item4 = $("#homeware").position().top;
		var item5 = $("#footer").position().top;
	
		if (y >= item1 - offset && y <= item1 + $("#history").height() - offset + padding) {
			$("#nav-history").addClass("active");
		} else {
			$("#nav-history").removeClass("active");
		}
	
		if (y >= item2 - offset && y <= item2 + $("#couture-and-wedding").height() - offset + padding) {
			$("#nav-couture-and-wedding").addClass("active");
		} else {
			$("#nav-couture-and-wedding").removeClass("active");
		}
	
		if (y >= item3 - offset && y <= item3 + $("#menswear").height() - offset + padding) {
			$("#nav-menswear").addClass("active");
		} else {
			$("#nav-menswear").removeClass("active");
		}
	  
		if (y >= item4 - offset && y <= item4 + $("#homeware").height() - offset + padding) {
			$("#nav-homeware").addClass("active");
		} else {
			$("#nav-homeware").removeClass("active");
		}
	  
		// Move header to the bottom when at the end of the page
		if (y >= documentHeight - (windowHeight) - offset) {
			$("#header").css("top", ($(window).height() - $("#header").height() - 245 + "px"));
			$("#header").addClass("bottom");
			$("#nav-footer").addClass("active");
			$("#nav-homeware").removeClass("active");
		} else {
			$("#header").css("top", "0");
			$("#header").removeClass("bottom");
			$("#nav-footer").removeClass("active");
		};

		function removeTooltip(){
			$("#tooltip").stop(true, false).fadeOut("fast");	
		};
		removeTooltip();
	});

	function resizeWelcome() {

		// Define variables
		var image = $('#welcome-image');				// Specify the cover image
		var container = $('#welcome-image-container');	// Specify the image container
		var ratio = 0.5625;								// Specify the image ratio
		var browserwidth = $(window).width();			// Get browser width
		var browserheight = $(window).height();			// Get browser height

		// Resize the container to fill the screen
		container.width(browserwidth);
		container.height(browserheight);
		container.css('overflow', 'hidden');

		//Resize the image to fill the container
		if ((browserheight / browserwidth) > ratio){
			image.height(browserheight - ratio + 1);
			image.width(browserheight / ratio + 1);
		} else {
			image.width(browserwidth - ratio + 1);
			image.height(browserwidth * ratio + 1); 
		}

		image.css('position', 'relative');
		image.css('left', (browserwidth - image.width()) / 2);
		image.css('top', (browserheight - image.height()) / 2);

	};
	resizeWelcome();

	function resizeSlideshow() {
	
		// Define variables
		var images = $('#slideshow img');					// Specify the cover images
		var container = $('#slideshow');					// Specify the images container
		var ratio = 1.262;									// Specify the images ratio
		var containerWidth = ($(window).width() * 0.597);	// Calculate the container width
		var containerHeight = (containerWidth * ratio);		// Calculate the container height

		// Resize the container to fill the screen
		container.width(containerWidth);
		container.height(containerHeight);
	
		container.css('position', 'relative');
		container.css('overflow', 'hidden');
	
	};
	resizeSlideshow();

	function resizeHeaderImages() {
	
		// Define variables
		var container = $('.header-image');
		var containerHeight = ($(window).height() - 140);
		var images = $('.header-image img');
		

		// Resize the container
		container.height(containerHeight);
		
		container.css('position', 'relative');
		container.css('overflow', 'hidden');

		// Resize the images to fit within the container
		images.height(containerHeight);
		images.css('width', 'auto');

		$('.header-image img.fill').each(function() {
			if ($(this).width() >= container.width()) {
				$(this).css({"position":"absolute","right":"0"})
			} else {
				$(this).css({"position":"static"})
			}

		});
	
	};
	resizeHeaderImages();

	function resizeAccordingToSibling() {

		var offset = 8;

		$('div.txt p:last-child').css('padding-bottom', '0');

		$('.auto-height.before').each(function() {
			$(this).height($(this).prev('div').innerHeight() - offset);
			$(this).width('auto');
		});

		$('.auto-height.after').each(function() {
			$(this).height($(this).next('div').innerHeight() - offset);
			$(this).width('auto');
		});

		$('.auto-height.before-extra').each(function() {
			$(this).height($(this).prev('div').innerHeight() * 1.5);
			$(this).width('auto');
		});

		$('.auto-height.after-extra').each(function() {
			$(this).height($(this).next('div').innerHeight() * 1.5);
			$(this).width('auto');
		});
	};
	resizeAccordingToSibling();
	
	// Call functions
	creditImages();
	tooltip();
	animateEmbroideries();

});

$(window).load(function() {

	// Fade the landing page image in
	$('#welcome-image').fadeTo(1200, 1);
	// Fade the slideshow in // Move it up on the z-index to be above the other slides
	$('#slideshow > img:first').fadeTo(1200, 1).css("z-index", "10");

	// Resize According to Sibling
	$(function() {

		var offset = 8;

		$('div.txt p:last-child').css('padding-bottom', '0');

		$('.auto-height.before').each(function() {
			$(this).height($(this).prev('div').innerHeight() - offset);
			$(this).width('auto');
		});

		$('.auto-height.after').each(function() {
			$(this).height($(this).next('div').innerHeight() - offset);
			$(this).width('auto');
		});

		$('.auto-height.before-extra').each(function() {
			$(this).height($(this).prev('div').innerHeight() * 1.5);
			$(this).width('auto');
		});

		$('.auto-height.after-extra').each(function() {
			$(this).height($(this).next('div').innerHeight() * 1.5);
			$(this).width('auto');
		});
	});

});

function slideSwitch() {
    var $active = $('#slideshow img.active');

    if ( $active.length == 0 ) $active = $('#slideshow img:first');

    var $next =  $active.next().length ? $active.next() : $('#slideshow img:first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 1200, function() {
		$active.removeClass('active last-active');
	});
};

$(function() {
    setInterval( "slideSwitch()", 12000 );
});


function creditImages() {
	
	$("img.index").each(function(){
		var $this = $(this);
		var id = "credit" + ($("img.index").index($(this)) + 1);
		$this.attr("id", id);
	});

	$("#credits a").each(function(){
		var $this = $(this);
		var target = "#credit" + $(this).html();
		$this.click(function() {
			$.scrollTo(target, 500);
		});
	});
};


function tooltip(){
	
	// Remove the title attribute and store its contents as 'savedTitle'
	$('img.index[title]').each( function() {
		var $this = $(this);
		$this.data('savedTitle',$this.attr('title'));
		$this.removeAttr('title');
	});

	// Define the x and y tooltip offset from the cursor
	yOffset = 20;
	xOffset = 50;

	$("img.index").hover(function(e){
		// Use the data stored from the title attribute as the tooltip content
		var $this = $(this);
		var title = $(this).data('savedTitle');
		var imageNumber = $("img.index").index($(this)) + 1;
		// Create an element to become the tooltip
		$("body").append("<p id='tooltip'>" + "<span>" + imageNumber + "</span>" + '“' + title + '”' + "</p>");
		// Specify the position of the tooltip and enter transition
		$("#tooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px")
			.fadeIn("fast");	
	},
	function(){
		// Hide the tooltip on mouse out	
		$("#tooltip").remove();	
	});
	// Move tooltip as mouse moves
	$("img.index").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px")
			.fadeIn("fast");
	});			
};



// Animation for Embroideries, as I think it works best
function animateEmbroideries() {
	$('#embroidery-01').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-01.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-10.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-05.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-08.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-06.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-09.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-02').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-02.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-07.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-09.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-03.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-01.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-10.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-03').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-03-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-11-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-10-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-12-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-07-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-12-m.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-04').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-04-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-08-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-12-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-05-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-03-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-07-l.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-05').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-05-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-01-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-07-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-11-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-10-m.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-06-m.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-06').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-06.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-04.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-02.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-01.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-05.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-03.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-07').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-07.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-05.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-03.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-09.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-12.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-04.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-08').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-08.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-12.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-06.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-04.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-02.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-11.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-09').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-09.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-02.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-01.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-06.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-11.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-08.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-10').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-10-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-09-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-11-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-10-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-04-l.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-02-l.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-11').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-11.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-06.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-08.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-02.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-09.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-01.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);

	$('#embroidery-12').crossSlide({
	  fade: 1
	}, [
		{src: '/images/couture-and-wedding-embroidery-12.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-03.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-04.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-07.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-08.jpg', from: '100% 0%', to: '0% 100%', time: 4},
		{src: '/images/couture-and-wedding-embroidery-05.jpg', from: '100% 0%', to: '0% 100%', time: 4}
	]);
};








