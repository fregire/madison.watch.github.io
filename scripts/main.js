$(document).ready(function(){
	$(".main-slider__list").slick({		
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		dots: true,
		speed: 1000,
		arrows: true,
		nextArrow: "<button class='slider-arrow slider-arrow--next main-slider__arrow main-slider__arrow--next' aria-label='Следующий слайд'></button>",
		prevArrow: "<button class='slider-arrow slider-arrow--prev main-slider__arrow main-slider__arrow--prev' aria-label='Предыдущий слайд'></button>",
		responsive: [
					    {
					      breakpoint: 690,
					      settings: {
					      	arrows: false,
					      	fade: true,
					      }
					    }
					  ]
	});

	var sliderActivated;
	if($(window).width() < 1150){
		$(".js-tabs .category__items").slick({
			slidesToShow: 3,
			arrows: true,
			nextArrow: "<button class='slider-arrow slider-arrow--next main-slider__arrow main-slider__arrow--next' aria-label='Следующий слайд'></button>",
			prevArrow: "<button class='slider-arrow slider-arrow--prev main-slider__arrow main-slider__arrow--prev' aria-label='Предыдущий слайд'></button>",
			responsive: [
				{
					breakpoint: 650,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						centerMode: true
					}
				}
			]

		});	

	} 

	$(".about__content .content__text").click(function(){
		$(this).toggleClass("content__text--expanded");
	});

	var projects = document.querySelectorAll(".projects__item");
	var windowHeight = screen.height;

	var headerHeight = document.querySelector(".page-header").offsetHeight;
	var windowWidth = screen.width;

	var projectPosition = '';

	if(windowWidth > 900){
		window.addEventListener("scroll", function(){
			for(var i = 0; i < projects.length; i++){
				var bottomBorder = projects[i].getBoundingClientRect().bottom;
				var topBorder = projects[i].getBoundingClientRect().top;

				if(bottomBorder < headerHeight){
					projectPosition = 'before';
				} else if(topBorder > windowHeight){
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
	}


	$(".page-nav__phone-toggler").click(function(){
		$('.page-header .page-nav__list').toggleClass('page-nav__list--opened');
	});

	$(document).click(function(e){
		var pageNav = $(".page-nav");
		if(!pageNav.is(e.target) && pageNav.has(e.target).length === 0){
			$('.page-header .page-nav__list').removeClass('page-nav__list--opened');
		}
	})


	
});