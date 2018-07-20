var innerSlider = document.querySelector(".tabs__links");
var slider = document.querySelector(".tabs__slider");
var sliderItems = document.querySelectorAll(".tabs__link");
var ITEM_MARGIN = 70;
var shiftCoords;

var clearClasses = function(elems, elemClass){
	for(var i = 0; i < elems.length; i++){
		elems[i].classList.remove(elemClass);
	}
}

for(var i = 0; i < sliderItems.length; i++){
	sliderItems[i].addEventListener("click", function(){
		var id = parseInt(this.getAttribute("data-id"));

		var elemWidth = this.offsetWidth + ITEM_MARGIN;

		var coordX = dots[id].getBoundingClientRect().x;
		var elemCoordX = this.getBoundingClientRect().x;


		clearClasses(dots, "slider__dot--active");
		clearClasses(sliderItems, "slider__item--active");
		dots[id].classList.add("slider__dot--active");
		this.classList.add("slider__item--active");

		if(shiftCoords){
			shiftCoords = shiftCoords + (coordX - elemCoordX - elemWidth / 1.9);
		} else {
			shiftCoords = coordX - elemCoordX - (elemWidth / 1.9);
		}

		innerSlider.style.transform = 'translate(' + shiftCoords + "px, 0)";
		innerSlider.removeEventListener("mousemove", onSliderMouseMove);

		setTimeout(function(){
			innerSlider.addEventListener("mousemove", onSliderMouseMove);
		}, 1500);
	});
	sliderItems[i].addEventListener("mouseenter", function(){
		var id = parseInt(this.getAttribute("data-id"));
		if(sliderItems[id + 1]){
			sliderItems[id + 1].classList.add("slider__item--bord");
		}
		if(sliderItems[id - 1]){
			sliderItems[id - 1].classList.add("slider__item--bord");
		}
		

		this.addEventListener("mouseleave", function(){
			if(sliderItems[id + 1]){
				sliderItems[id + 1].classList.remove("slider__item--bord");
			}
			if(sliderItems[id - 1]){
				sliderItems[id - 1].classList.remove("slider__item--bord");
			}
			
		})
	})
}

var oldX = 0, oldY = 0;

function onSliderMouseMove(e){
	if(e.target.classList.contains("slider__item")){
		var dotId = parseInt(e.target.getAttribute("data-id"));
		clearClasses(dots, 'slider__dot--mouse');
		dots[dotId].classList.add("slider__dot--mouse");
	}
  if(!shiftCoords){
		shiftCoords = 0;
  }
  var directionX = 0, directionY = 0, diffX = 0, diffY = 0;
  if (e.pageX < oldX) {
      directionX = "left"
      diffX = oldX - e.pageX;
      shiftCoords += 10;
  } else if (e.pageX > oldX) {
      directionX = "right"
      diffX = e.pageX - oldX;
      shiftCoords -= 10;
  }

  if(shiftCoords >= 0){
  	shiftCoords = 0;
  }
  if(shiftCoords <= -600){
  	shiftCoords = -600;
  }

  oldX = e.pageX;
  oldY = e.pageY;
  innerSlider.style.transform = 'translate(' + shiftCoords  + "px, 0)";

}

innerSlider.addEventListener('mousemove', onSliderMouseMove);
		


slider.addEventListener("click", function(e){
	if(e.target.classList.contains("slider__dot")){
		var id = parseInt(e.target.getAttribute("data-id"));
		var elemWidth = sliderItems[id].offsetWidth + ITEM_MARGIN;

		var coordX = e.target.getBoundingClientRect().x;
		var elemCoordX = sliderItems[id].getBoundingClientRect().x;

		clearClasses(dots, "slider__dot--active");
		clearClasses(sliderItems, "slider__item--active");
		e.target.classList.add("slider__dot--active");
		sliderItems[id].classList.add("slider__item--active");

		if(shiftCoords){
			shiftCoords = shiftCoords + (coordX - elemCoordX - elemWidth / 2.8);
		} else {
			shiftCoords = coordX - elemCoordX - elemWidth / 2.8;
		}

		innerSlider.style.transform = 'translate(' + shiftCoords  + "px, 0)";
	}
});
