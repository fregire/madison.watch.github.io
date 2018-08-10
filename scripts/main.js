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
						slidesToShow: 1
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
	});


	// Табы 
	var $catItems = $(".category__item");

	$($catItems).on("click", function(){
		var category = $(this).attr("data-cat");
		$('.items__item').addClass("items__item--hidden");
		$('.items__item').removeClass("items__item--active");
		$('.items__item[data-cat="' + category + '"]').addClass("items__item--active");
	});

	// Показ соцсетей и мессенджеров
	$(".social__link").on("click", function(e){
		e.preventDefault();
		$id = $(this).attr("data-id");
		$(".social-tabs__text").text("Мы в");
		$(".social-tabs__item").removeClass("social-tabs__item--active");
		$(".social-tabs__item[data-id='" + $id + "']").addClass("social-tabs__item--active");
	});


	// Слайдер похожих работ
	// var slider = document.querySelector(".slider");
	// var sliderWrapper = document.querySelector(".slider__wrapper");
	// var sliderItems = document.querySelectorAll(".slider .items__item");
	// var ITEM_MARGIN = 15;
	// var MIN_TRANSLATE_X = 0;
	// var MAX_TRANSLATE_X = -(sliderItems[sliderItems.length - 1].getBoundingClientRect().right - 
	// 							sliderWrapper.offsetWidth - 
	// 							sliderWrapper.getBoundingClientRect().left + ITEM_MARGIN)
	// var shiftCoords = 0;
	// var oldX = 0;

	// var onSliderMousemove = function(e){
	// 		var diffX = e.clientX - oldX;
			
	// 		if(diffX > 10){
	// 			shiftCoords -= 18;
	// 		} else if(diffX > 0){
	// 			shiftCoords -= 5;
	// 		} else if(diffX < -10){
	// 			shiftCoords += 18
	// 		} else if(diffX < 0){
	// 			shiftCoords += 5;
	// 		}

	// 		if(shiftCoords >= MIN_TRANSLATE_X){
	// 			shiftCoords = MIN_TRANSLATE_X;
	// 		}
	// 		if(shiftCoords <= MAX_TRANSLATE_X){
	// 			shiftCoords = MAX_TRANSLATE_X;
	// 		}

	// 		sliderWrapper.style.transform = "translate(" + shiftCoords + "px, 0)";

	// 		oldX = e.clientX;
	// }
	// slider.addEventListener("mouseenter", function() {
	// 	this.addEventListener("mousemove", onSliderMousemove);

	// 	this.addEventListener("mouseleave", function(){
	// 		this.removeEventListener("mousemove", onSliderMousemove);
	// 	})
	// });

	// $(".similar__works").slick({
	// 	slidesToShow: 4,
	// 	slidesToScroll: 1,
	// 	infinite: false,
	// 	nextArrow: "<button class='slider-arrow slider-arrow--next similar__arrow similar__arrow--next' aria-label='Следующий слайд'></button>",
	// 	prevArrow: "<button class='slider-arrow slider-arrow--prev similar__arrow similar__arrow--prev' aria-label='Предыдущий слайд'></button>",

	// });

	var slider = document.querySelector(".slider__wrapper");
	var works = document.querySelector(".slider .items");
	var sliderWrapper = document.querySelector(".slider__wrapper");
	var sliderItems = document.querySelectorAll(".slider .items__item");
	var nextArrow = document.querySelector(".similar__arrow--next");
	var prevArrow = document.querySelector(".similar__arrow--prev");
	var ITEM_MARGIN = 15;
	var MAX_TRANSLATE_X = 0;
	var MIN_TRANSLATE_X = slider.getBoundingClientRect().right - sliderItems[sliderItems.length - 1].getBoundingClientRect().right - ITEM_MARGIN;
	var oldX = 0;
	var shiftCoords = 0;
	var itemWidth = sliderItems[0].offsetWidth + ITEM_MARGIN;

	var onSliderMousemove = function(e){
		var diffX = e.clientX - oldX;

		if(diffX > 10){
			shiftCoords -= 27;
		} else if(diffX > 0){
			shiftCoords -= 5;
		} else if(diffX < -10){
			shiftCoords += 27;
		} else if(diffX < 0){
			shiftCoords += 5;
		}

		if(shiftCoords >= MAX_TRANSLATE_X){
			shiftCoords = 0;
		} 
		if(shiftCoords <= MIN_TRANSLATE_X){
			shiftCoords = MIN_TRANSLATE_X;
		} 

		works.style.transform = "translateX(" + shiftCoords + "px)";

		oldX = e.clientX;

	}

	slider.addEventListener("mouseenter", function(e){
		this.addEventListener("mousemove", onSliderMousemove);

		this.addEventListener("mouseleave", function(){
			this.removeEventListener("mousemove", onSliderMousemove);
		});
	});
	var isHidden = false;
	var MIN_HIDDEN_TRANSLATE = (sliderItems[0].offsetWidth + 30) * 4;
	var firstHiddenElem;
	// Часть, которая может быть не спрятана у первого спрятанного элемента
	var firstHiddenElemVisiblePart;
	var firstHiddenElemLeftCoord = 0;
	var counterOfHiddenElems = 0;

	var isHiddenInRightPart = function(elem){
		if(elem.getBoundingClientRect().right > sliderWrapper.getBoundingClientRect().right - 15){
			return true;
		}
		return false;
	}


	nextArrow.addEventListener("click", function(){
		for(var i = 0; i < sliderItems.length; i++){
			if(isHidden){
				continue;
			} else {
				if(isHiddenInRightPart(sliderItems[i])){
					isHidden = true;
					firstHiddenElemVisiblePart = sliderItems[i].getBoundingClientRect().right  - sliderWrapper.getBoundingClientRect().right + 15;	
					shiftCoords = shiftCoords - firstHiddenElemVisiblePart;
					anime({
					  targets: works,
					  translateX: {
					  	value: shiftCoords,
					  	duration: 500
					  },
					  easing: 'easeInOutQuart'

					});
				}				
			}

		}
		isHidden = false;
	});

	var isHiddenInLeftPart = function(elem, elemPrev){
		if((elem.getBoundingClientRect().left < sliderWrapper.getBoundingClientRect().left + 15 
			&& elem.getBoundingClientRect().right > sliderWrapper.getBoundingClientRect().left + 15)){
			return true;
		} else if(elem.getBoundingClientRect().left > sliderWrapper.getBoundingClientRect().left){
			return true;
		}
		return false;
	}

	prevArrow.addEventListener("click", function(){
		for(var i = 0; i < sliderItems.length; i++){
			if(isHidden){

			} else {
				if(isHiddenInLeftPart(sliderItems[i])){

					isHidden = true;
					firstHiddenElemVisiblePart = sliderWrapper.getBoundingClientRect().left + 15 - sliderItems[i].getBoundingClientRect().left;	
					if(firstHiddenElemVisiblePart === 0){
						firstHiddenElemVisiblePart = 300;
					}
					shiftCoords = shiftCoords + firstHiddenElemVisiblePart;
					if(shiftCoords >= 0){
						shiftCoords = 0;
					}


					anime({
					  targets: works,
					  translateX: {
						  	value: shiftCoords,
						  	duration: 500
						},
					  easing: 'easeInOutQuart'
					});
				}				
			}
	
		}
		isHidden = false;
	});
	
});