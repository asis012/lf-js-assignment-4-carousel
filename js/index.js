window.addEventListener('load', () => {
	new Slider({
		sliderSelector: '.image-carousel',
		transitionTime: 300,
		holdTime: 6000,
	});
	new Slider({
		sliderSelector: '.image-carousel-1',
		transitionTime: 200,
		holdTime: 5000,
	});
	new Slider({
		sliderSelector: '.image-carousel-2',
		transitionTime: 50,
		holdTime: 4000,
	});
	new Slider({
		sliderSelector: '.image-carousel-3',
		transitionTime: 100,
		holdTime: 3000,
	});
});
