(function(){
	var slider = document.querySelector(".js-category .category__items");
	var sliderWrapper = document.querySelector(".js-category .category__inner");
	var links = document.querySelectorAll(".js-category .category__item");
	var contentTabs = document.querySelectorAll(".tabs__content");
	var btnNext = document.querySelector(".tabs__arrow--next");
	var btnPrev = document.querySelector(".tabs__arrow--prev");
	var MAX_TRANSLATE_X = -((links.length - 4) * 300);
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

	//sliderWrapper.addEventListener("mouseenter", onSliderMouseenter);

	for(var i = 0; i < links.length; i++){
		links[i].addEventListener("click", function(){
			var category = this.getAttribute("data-cat");


			clearClass(links, 'tabs__link--active');	
			clearClass(contentTabs, 'tabs__content--active');	

			this.classList.add("tabs__link--active");
			document.querySelector(".tabs__content[data-cat='" + category + "']").classList.add("tabs__content--active");
		});
	}
})();