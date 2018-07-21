(function(){
	var slider = document.querySelector(".tabs__links");
	var sliderWrapper = document.querySelector(".tabs__slider-wrapper");
	var oldX = 0;
	var shiftCoords = 0;
	var isLeft;



	sliderWrapper.addEventListener("mouseenter", function(e){
		var onSliderMousemove = function(e){
			var rightBorder = slider.getBoundingClientRect().right;

			if(e.clientX > oldX){
				shiftCoords -= 10;
			} else {
				shiftCoords += 10;
			}

			oldX = e.clientX;

			if(shiftCoords < -300){
				shiftCoords = -300;
			}

			if(shiftCoords < -300){
				shiftCoords = -300;
			}

			if(shiftCoords = 0){
				shiftCoords = 0;
			}


			slider.style.transform = "translate(" + shiftCoords + "px, 0)";
		}

		document.addEventListener("mousemove", onSliderMousemove);


		this.addEventListener("mouseleave", function(){
			document.removeEventListener("mousemove", onSliderMousemove);
		})
	});
})();