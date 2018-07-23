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
	var windowHeight = screen.height;
	var projectPosition = '';

	window.addEventListener("scroll", function(){
		for(var i = 0; i < projects.length; i++){
			var bottomBorder = projects[i].getBoundingClientRect().bottom;
			var topBorder = projects[i].getBoundingClientRect().top;

			if(bottomBorder < 60){
				projectPosition = 'before';
			} else if(topBorder > windowHeight - 100){
				projectPosition = 'after';
			} else {
				projectPosition = '';
			}

			if(projectPosition === 'after'){
				projects[i].classList.add("projects__item--out-of-range-after");
			} else if(projectPosition === 'before'){
				projects[i].classList.add("projects__item--out-of-range-before");
			} else {
				projects[i].classList.remove("projects__item--out-of-range-after", "projects__item--out-of-range-before");
			}
		}
	});


	
});