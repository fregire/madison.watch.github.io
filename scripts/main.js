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

	var windowHeight = document.documentElement.clientHeight;

	var isVisibleFromTop = function(elem){
		var coords = elem.getBoundingClientRect();
		
		var topVisible = coords.top < 700 && coords.top < windowHeight;

		return topVisible;
	}

	var isVisibleFromBottom = function(elem){
		var coords = elem.getBoundingClientRect();

		var bottomVisible = coords.bottom < 20  && coords.bottom < windowHeight;

		return bottomVisible;
	}

	var projects = document.querySelectorAll(".projects__item");
	var scrollCoords = 0;

	window.addEventListener("scroll", function(){
		var vectorLength = document.documentElement.scrollTop - scrollCoords;
		scrollCoords = document.documentElement.scrollTop;

		if(vectorLength > 0){
			for(var i = 0; i < projects.length; i++){
				if(isVisibleFromTop(projects[i])){
					projects[i].classList.remove("projects__item--out-of-range", "projects__item--out-of-range-from-bottom");
				} else {
					projects[i].classList.remove("projects__item--out-of-range", "projects__item--out-of-range-from-bottom");
					projects[i].classList.add("projects__item--out-of-range");
				}
			}
		} else {
			for(var i = 0; i < projects.length; i++){
				if(isVisibleFromBottom(projects[i])){
					projects[i].classList.remove("projects__item--out-of-range-from-bottom", "projects__item--out-of-range");
				} else {
					projects[i].classList.remove("projects__item--out-of-range", "projects__item--out-of-range-from-bottom");
					projects[i].classList.add("projects__item--out-of-range-from-bottom");
				}
			}
		}
	});
});