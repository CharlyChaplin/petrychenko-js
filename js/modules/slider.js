export default class Slider {
	constructor(container) {
		this.slider = document.querySelector(`.${container}`);
		this.currentSlideShow = this.slider.querySelector('#current');
		this.totalSlideShow = this.slider.querySelector('#total');
		this.prevBtn = this.slider.querySelector('.offer__slider-prev');
		this.nextBtn = this.slider.querySelector('.offer__slider-next');
		this.sliderWrapper = this.slider.querySelector(".offer__slider-wrapper");
		this.sliderFrames = this.slider.querySelectorAll('.offer__slide');
		this.slidesField = this.slider.querySelector('.offer__slider-inner');
		this.totalSlides = this.sliderFrames.length;
		this.width = parseInt(window.getComputedStyle(this.sliderWrapper).width);
		this.currentSlide = 0;
		this.offset = 0;

		this._initSlider();
	}

	_initSlider() {
		this.slidesField.style.width = 100 * this.totalSlides + '%';
		this.slidesField.style.display = "flex";
		this.slidesField.style.transition = "transform 0.3s ease 0s";

		this.sliderWrapper.style.overflow = "hidden";
		this.sliderFrames.forEach(slide => slide.style.width = this.width);

		this._addBullets();

		this.currentSlideShow.textContent = this._Format(this.currentSlide + 1);
		this.totalSlideShow.textContent = this._Format(this.totalSlides);
		this.prevBtn.addEventListener('click', this._prevMove);
		this.nextBtn.addEventListener('click', this._nextMove);

		this._sliderRender();
	}

	_addBullets() {
		this.sliderWrapper.style.position = "relative";

		const bulletsContainer = document.createElement('div');
		bulletsContainer.classList.add("carousel-indicators");
		bulletsContainer.style.cssText = `
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 15;
				display: flex;
				justify-content: center;
				margin-right: 15%;
				margin-left: 15%;
				list-style: none;
			`;
		for (let i = 0; i < this.totalSlides; i++) {
			const dotElem = document.createElement('div');
			dotElem.classList.add('dot');
			dotElem.dataset.posIndex = i;
			dotElem.style.cssText = `
					box-sizing: content-box;
					flex: 0 1 auto;
					width: 30px;
					height: 6px;
					margin-right: 3px;
					margin-left: 3px;
					cursor: pointer;
					background-color: #fff;
					background-clip: padding-box;
					border-top: 10px solid transparent;
					border-bottom: 10px solid transparent;
					opacity: .5;
					transition: opacity .6s ease;
				`;
			i === 0 ? dotElem.style.opacity = 1 : null;
			dotElem.addEventListener('click', this._dotsRender);
			bulletsContainer.appendChild(dotElem);
		}

		this.sliderWrapper.insertAdjacentElement('beforeend', bulletsContainer);
	}

	_dotsRender = e => {
		const dots = this.slider.querySelectorAll('.carousel-indicators .dot');
		dots.forEach(dot => dot.style.opacity = .5);

		if (e) this.currentSlide = +e.target.dataset.posIndex;

		dots[this.currentSlide].style.opacity = 1;

		this.offset = this.width * this.currentSlide;
		this.slidesField.style.transform = `translateX(-${this.offset}px)`;
		this._sliderRender();
	}

	_Format = val => val < 10 ? `0${val}` : val

	_prevMove = () => {
		if (--this.currentSlide < 0) this.currentSlide = this.totalSlides - 1;

		if (this.offset <= 0) {
			this.offset = this.width * (this.totalSlides - 1);
		} else {
			this.offset -= this.width;
		}

		this.slidesField.style.transform = `translateX(-${this.offset}px)`;

		this._dotsRender();
		this._sliderRender();
	}

	_nextMove = () => {
		if (++this.currentSlide > this.totalSlides - 1) this.currentSlide = 0;

		if (this.offset === this.width * (this.totalSlides - 1)) {
			this.offset = 0;
		} else {
			this.offset += this.width;
		}
		this.slidesField.style.transform = `translateX(-${this.offset}px)`;

		this._dotsRender();
		this._sliderRender();
	}

	_sliderRender = () => {
		this.sliderFrames.forEach(item => item.classList.remove("offer__slide_active"));
		this.sliderFrames.item(this.currentSlide).classList.add("offer__slide_active");
		this.currentSlideShow.textContent = this._Format(this.currentSlide + 1);
	}
}
