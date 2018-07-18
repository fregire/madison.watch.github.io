var innerSlider = document.querySelector(".slider__inner");
var slider = document.querySelector(".slider");
var dotsContainer = document.querySelector(".slider__dots");
var sliderItems = document.querySelectorAll(".slider__item");
var dots = document.querySelectorAll(".slider__dot");
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
			shiftCoords = shiftCoords + (coordX - elemCoordX - elemWidth / 2);
		} else {
			shiftCoords = coordX - elemCoordX - (elemWidth / 2);
		}

		innerSlider.style.transform = 'translate(' + shiftCoords + "px, 0)";
	});
	sliderItems[i].addEventListener("mouseenter", function(){
		var id = parseInt(this.getAttribute("data-id"));
		sliderItems[id + 1].classList.add("slider__item--bord");
		sliderItems[id - 1].classList.add("slider__item--bord");

		this.addEventListener("mouseleave", function(){
			sliderItems[id + 1].classList.remove("slider__item--bord");
			sliderItems[id - 1].classList.remove("slider__item--bord");
		})
	})
}

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

innerSlider.addEventListener("mouseenter", function(e){
	var startCoordsX = e.clientX;

	var moveSlider = function(e){
		var newCoords = e.clientX;
		if(!shiftCoords){
			shiftCoords = 0;
		}

		if(newCoords > startCoordsX){
			shiftCoords = shiftCoords - 10;
		} else {
			shiftCoords = shiftCoords + 10;
		}	
		if(shiftCoords >= 200){
			shiftCoords = 200;
		}
		if(shiftCoords <= -500){
			shiftCoords = -500;
		}
		innerSlider.style.transform = 'translate(' + shiftCoords  + "px, 0)";
	}
	document.addEventListener("mousemove", moveSlider);
	this.addEventListener("mouseleave", function(){
		document.removeEventListener("mousemove", moveSlider);
	})
})

