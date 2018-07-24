(function(){
	var slider = document.querySelector(".js-slider  .category__items");
	var sliderWrapper = document.querySelector(".js-slider .category__inner");
	var catItems = document.querySelectorAll(".js-tabs .category__item");
	var contentTabs = document.querySelectorAll(".tabs__content");
	var btnNext = document.querySelector(".tabs__arrow--next");
	var btnPrev = document.querySelector(".tabs__arrow--prev");
	var ITEM_WIDTH = catItems[0].offsetWidth;
	var VISIBLE_SLIDES = 5;
	var MAX_TRANSLATE_X = -((catItems.length - VISIBLE_SLIDES) * ITEM_WIDTH);
	var MIN_TRANSLATE_X = 0;
	var oldX = 0;
	var shiftCoords = 0;

	var clearClass = function(elems, elemClass){
		for(var i = 0; i < elems.length; i++) {
			elems[i].classList.remove(elemClass);
		}
	}

	var onSliderMousemove = function(e){
		var diffX = e.clientX - oldX;

		if(diffX > 10){
			shiftCoords -= 18;
		} else if(diffX > 0){
			shiftCoords -= 5;
		} else if(diffX < -10){
			shiftCoords += 18
		} else if(diffX < 0){
			shiftCoords += 5;
		}

		oldX = e.clientX;

		if(shiftCoords < MAX_TRANSLATE_X){
			shiftCoords = MAX_TRANSLATE_X;
		}

		if(shiftCoords >= MIN_TRANSLATE_X){
			shiftCoords = MIN_TRANSLATE_X;
		}


		slider.style.transform = "translate(" + shiftCoords + "px, 0)";
	}
	var onSliderMouseenter = function(e){	
		this.addEventListener("mousemove", onSliderMousemove);


		this.addEventListener("mouseleave", function(){
			document.removeEventListener("mousemove", onSliderMousemove);
		});
	}
	
	if(sliderWrapper){
		sliderWrapper.addEventListener("mouseenter", onSliderMouseenter);
	}
	
	for(var i = 0; i < catItems.length; i++){
		catItems[i].addEventListener("click", function(){
			var category = this.getAttribute("data-cat");


			clearClass(catItems, 'tabs__link--active');	
			clearClass(contentTabs, 'tabs__content--active');	

			this.classList.add("tabs__link--active");
			document.querySelector(".tabs__content[data-cat='" + category + "']").classList.add("tabs__content--active");
		});
	}
})();