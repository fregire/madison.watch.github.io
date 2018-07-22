(function(){
	var slider = document.querySelector(".tabs__links");
	var sliderWrapper = document.querySelector(".tabs__slider-wrapper");
	var links = document.querySelectorAll(".tabs__link");
	var contentTabs = document.querySelectorAll(".tabs__content");
	var btnNext = document.querySelector(".tabs__arrow--next");
	var btnPrev = document.querySelector(".tabs__arrow--prev");
	var MAX_TRANSLATE_X = -((links.length - 4) * 300);
	var oldX = 0;
	var shiftCoords = 0;
	var MOUSE_SENSITY = 5;
	var currentSlide = 0;

	var clearClass = function(elems, elemClass){
		for(var i = 0; i < elems.length; i++) {
			elems[i].classList.remove(elemClass);
		}
	}
	var splitToDigits = function(number) {
	  var digits = [];
	  while(number) {
	    digits.push(number % 10);
	    number = Math.floor(number/10);
	  }
	  return digits;
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

		if(shiftCoords >= 0){
			shiftCoords = 0;
		}


		slider.style.transform = "translate(" + shiftCoords + "px, 0)";
	}
	var onSliderMouseenter = function(e){	
		this.addEventListener("mousemove", onSliderMousemove);


		this.addEventListener("mouseleave", function(){
			document.removeEventListener("mousemove", onSliderMousemove);
		});
	}

	var isHidden = function(elem, way){
		if(way === 'prev'){
			var diffCoords =  slideCoordX - viewZoneCoordX;
		} else if(way === 'next'){
			var diffCoords = viewZoneCoordX - slideCoordX;
		}
		if(diffCoords < 0){
			return true;
		} else {
			return false;
		}
	}

	var moveToSlide = function(slide, way){
		if((shiftCoords === 0) && (way === 'right')){
			shiftCoords -= 300;
		} else if((shiftCoords === 0) && (way === 'left')){
			shiftCoords += 300;
		} else if(way === 'next'){
			hiddenWidth = slideCoordX - viewZoneCoordX;
			shiftCoords -= hiddenWidth;
		} else if(way === 'prev'){
			hiddenWidth = viewZoneCoordX - slideCoordX;
			
			shiftCoords += hiddenWidth;
		}
		anime({
				targets: slider,
				translateX: shiftCoords
		});
	}

	sliderWrapper.addEventListener("mouseenter", onSliderMouseenter);

	for(var i = 0; i < links.length; i++){
		links[i].addEventListener("click", function(){
			var category = this.getAttribute("data-cat");
			currentSlide = parseInt(this.getAttribute("data-index"));


			clearClass(links, 'tabs__link--active');	
			clearClass(contentTabs, 'tabs__content--active');	

			this.classList.add("tabs__link--active");
			document.querySelector(".tabs__content[data-cat='" + category + "']").classList.add("tabs__content--active");
			// sliderWrapper.removeEventListener("mousemove", onSliderMousemove);

			// setTimeout(function(){
			// 	sliderWrapper.addEventListener("mousemove", onSliderMousemove);
			// }, 1000);
		});
	}
})();