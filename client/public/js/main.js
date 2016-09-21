(function() {
    
    $('a[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	  if (target.length) {
	    $('html, body').animate({
	      scrollTop: target.offset().top
	    }, 1000);
	    return false;
	  }
	}
	});
  
    $(".goto-art-btn").click(function(){
        $(".about-princi-container").removeClass("spotlight").addClass("left");
        $(".about-art-container").addClass("spotlight");
    })
    $(".goto-dev-btn").click(function(){
        $(".about-princi-container").removeClass("spotlight").addClass("right");
        $(".about-dev-container").addClass("spotlight");
    })
    $(".inner .entypo-cancel").click(function(){
        $(".about-dev-container").removeClass("spotlight");
        $(".about-art-container").removeClass("spotlight");
        $(".about-princi-container").removeClass("left right").addClass("spotlight");
    });
    
}).call(this);
