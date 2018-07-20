$(document).ready(function(){
	$(".main-slider__list").slick({		
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		dots: true,
		speed: 1000,
		arrows: true,
		nextArrow: "<button class='slider-arrow slider-arrow--next main-slider__arrow main-slider__arrow--next' aria-label='Следующий слайд'></button>",
		prevArrow: "<button class='slider-arrow slider-arrow--prev main-slider__arrow main-slider__arrow--prev' aria-label='Предыдущий слайд'></button>"
	});

	$(".about__content .content__text").click(function(){
		$(this).toggleClass("content__text--expanded");
	});

	// var isVisibleTop = function(elem){
	// 	var coords = elem.getBoundingClientRect();
	// 	var windowHeight = document.documentElement.clientHeight;

	// 	var topVisible = coords.top > 400 && coords.top < windowHeight;

	// 	return topVisible;
	// }

	// var example = document.querySelector(".projects__item");

	// window.addEventListener("scroll", function(){
	// 	if(isVisible(example)){
	// 		alert("yes");
	// 	}
	// });
});