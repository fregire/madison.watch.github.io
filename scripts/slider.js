(function(){
	var slider = document.querySelector(".tabs__links");
	var sliderWrapper = document.querySelector(".tabs__slider-wrapper");
	var links = document.querySelectorAll(".tabs__link");
	var oldX = 0;
	var shiftCoords = 0;
	var MOUSE_SENSITY = 5;

	var clearClass = function(elems, elemClass){
		for(var i = 0; i < elems.length; i++) {
			elems[i].classList.remove(elemClass);
		}
	}
	var onSliderMousemove = function(e){
		var diffX = e.clientX - oldX;

		console.log(diffX);
		if(diffX > 10){
			shiftCoords -= 10;
		} else if(diffX > 0){
			shiftCoords -= 5;
		} else if(diffX < -10){
			shiftCoords += 10
		} else if(diffX < 0){
			shiftCoords += 5;
		}

		oldX = e.clientX;

		if(shiftCoords < -300){
			shiftCoords = -300;
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
	sliderWrapper.addEventListener("mouseenter", onSliderMouseenter);

	for(var i = 0; i < links.length; i++){
		links[i].addEventListener("click", function(){
			clearClass(links, 'tabs__link--active');	
			this.classList.add("tabs__link--active");
			sliderWrapper.removeEventListener("mousemove", onSliderMousemove);

			setTimeout(function(){
				sliderWrapper.addEventListener("mousemove", onSliderMousemove);
			}, 2000);
		});
	}
})();