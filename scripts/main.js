$(document).ready(function(){
	$(".main-slider__list").slick({		
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		dots: true,
		speed: 1000,
		arrows: false
	});

	$(".about__content .content__text").click(function(){
		$(this).toggleClass("content__text--expanded");
	})
});