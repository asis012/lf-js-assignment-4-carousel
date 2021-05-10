function Slider(sliderOptions) {
	//initialize the slider
	const init = sliderOptions => {
		// merge default slider values with user defined values
		this.sliderOptions = DEFAULT_SLIDER_CONFIGURATION;
		for (var attrname in sliderOptions) {
			this.sliderOptions[attrname] = sliderOptions[attrname];
		}

		// get required information from DOM
		this.slider = document.querySelector(this.sliderOptions.sliderSelector);
		if (!this.slider) return;

		this.sliderList = this.slider.firstElementChild;
		this.sliderImages = this.sliderList.querySelectorAll('img');
		this.imagesCount = this.sliderImages.length;
		this.imageSize = this.sliderImages[0].clientWidth;
		this.currentSlide = 0;
		this.transitionTime = this.sliderOptions.transitionTime;

		this.addSliderControls();
		this.addSliderDots();
		this.autoplay();
	};

	//Add slider controls
	this.addSliderControls = () => {
		const prevArrow = document.createElement('a');
		prevArrow.setAttribute('href', '#');
		prevArrow.classList.add('slider-controller', 'slider-prev');
		prevArrow.addEventListener('click', e => {
			e.preventDefault();
			clearInterval(this.autoplayInterval);
			if (this.currentSlide > 0) this.setSlideTo(this.currentSlide - 1);
			else this.setSlideTo(this.imagesCount - 1);
			this.autoplay();
		});
		this.slider.appendChild(prevArrow);

		const nextArrow = document.createElement('a');
		nextArrow.setAttribute('href', '#');
		nextArrow.classList.add('slider-controller', 'slider-next');
		nextArrow.addEventListener('click', e => {
			e.preventDefault();
			clearInterval(this.autoplayInterval);
			if (this.currentSlide < this.imagesCount - 1) this.setSlideTo(this.currentSlide + 1);
			else this.setSlideTo(0);
			this.autoplay();
		});
		this.slider.appendChild(nextArrow);
	};

	// change slide to specified one
	this.setSlideTo = slideNumber => {
		const goLeft = this.currentSlide < slideNumber ? false : true;

		this.oldSlidePosition = -this.imageSize * this.currentSlide;
		this.sliderDotsList.children[this.currentSlide].classList.remove('active');

		this.currentSlide = slideNumber;
		this.newSliderPosition = -this.imageSize * this.currentSlide;
		this.sliderDotsList.children[this.currentSlide].classList.add('active');

		this.currentSliderPosition = this.oldSlidePosition;

		if (goLeft) window.requestAnimationFrame(this.animateRight);
		else window.requestAnimationFrame(this.animateLeft);
	};

	//animate to the left
	this.animateLeft = timestamp => {
		const speed = (Math.abs(this.newSliderPosition - this.oldSlidePosition) / this.transitionTime) * 5;
		this.currentSliderPosition -= speed;
		this.sliderList.style.transform = 'translateX(' + this.currentSliderPosition + 'px)';
		if (this.currentSliderPosition > this.newSliderPosition + speed) {
			window.requestAnimationFrame(this.animateLeft);
		} else {
			this.currentSliderPosition = this.newSliderPosition;
			this.sliderList.style.transform = 'translateX(' + this.currentSliderPosition + 'px)';
		}
	};

	// animate to the right
	this.animateRight = timestamp => {
		const speed = (Math.abs(this.newSliderPosition - this.oldSlidePosition) / this.transitionTime) * 5;
		this.currentSliderPosition += speed;
		this.sliderList.style.transform = 'translateX(' + this.currentSliderPosition + 'px)';
		if (this.currentSliderPosition < this.newSliderPosition - speed) {
			window.requestAnimationFrame(this.animateRight);
		} else {
			this.currentSliderPosition = this.newSliderPosition;
			this.sliderList.style.transform = 'translateX(' + this.currentSliderPosition + 'px)';
		}
	};

	//Add slider Dots
	this.addSliderDots = () => {
		this.sliderDotsList = document.createElement('ul');
		this.sliderDotsList.classList.add('slider-dots');

		for (let i = 0; i < this.imagesCount; i++) {
			const listItem = document.createElement('li');
			if (i === 0) listItem.classList.add('active');

			const sliderDot = document.createElement('a');
			sliderDot.setAttribute('href', '#');
			sliderDot.classList.add('slider-dot');
			sliderDot.addEventListener('click', e => {
				e.preventDefault();
				this.setSlideTo(i);
			});

			listItem.appendChild(sliderDot);
			this.sliderDotsList.appendChild(listItem);
		}

		this.slider.appendChild(this.sliderDotsList);
	};

	this.autoplay = () => {
		this.autoplayInterval = setInterval(() => {
			if (this.currentSlide < this.imagesCount - 1) this.setSlideTo(this.currentSlide + 1);
			else this.setSlideTo(0);
		}, this.sliderOptions.holdTime);
	};

	init(sliderOptions);
}
