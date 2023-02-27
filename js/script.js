window.addEventListener("DOMContentLoaded", function () {
	//Tabs
	const tabContainer = document.querySelector(".tabcontainer");
	const tabItems = tabContainer.querySelectorAll(".tabheader__item");
	const tabContents = tabContainer.querySelectorAll(".tabcontent");
	const tabHeader = tabContainer.querySelector(".tabheader__items");

	(function initTabs() {
		if (tabItems.length !== tabContents.length) {
			console.log("Tabs not ready");
		} else {
			renderTabContent();
			tabHeader.addEventListener("click", tabClick);
		}
	})();

	function tabClick(e) {
		if (e.target && e.target.classList.contains("tabheader__item")) {
			tabItems.forEach((tab, i) => {
				if (tab === e.target) tabChoiced(i);
			});
		}
	};
	function tabChoiced(index) {
		tabItems.forEach((tabItem, i) => {
			i === index
				? tabItem.classList.add("tabheader__item_active")
				: tabItem.classList.remove("tabheader__item_active");
		});
		renderTabContent(index);
	};
	function renderTabContent() {
		tabItems.forEach((tabItem, index) => {
			if (tabItem.classList.contains("tabheader__item_active")) {
				tabContents[index].style.removeProperty("display");
				!tabContents[index].style.length && tabContents[index].removeAttribute("style");
			} else {
				tabContents[index].style.display = "none";
			}
		});
	};

	//Timer
	const promoEndTime = new Date('2023-03-01T22:12:50');

	function initTimer(endTime) {
		let diff = endTime - new Date();
		let interval;
		renderTime(diff < 0 ? 0 : diff);


		if (diff > 0) {
			interval = setInterval(() => {
				diff = endTime - new Date();
				renderTime(diff < 0 ? 0 : diff, interval);
			}, 1000);
		}
	}

	function renderTime(diff = 0, interval) {
		const days = document.getElementById('days');
		const hours = document.getElementById('hours');
		const minutes = document.getElementById('minutes');
		const seconds = document.getElementById('seconds');

		days.textContent = diff > 0 ? getFormatDate(Math.floor(new Date(diff) / (1000 * 60 * 60 * 24))) : "00";
		hours.textContent = diff > 0 ? getFormatDate(Math.floor(new Date(diff) / (1000 * 60 * 60) % 60)) : "00";
		minutes.textContent = diff > 0 ? getFormatDate(Math.floor(new Date(diff) / (1000 * 60) % 60)) : "00";
		seconds.textContent = diff > 0 ? getFormatDate(Math.floor(new Date(diff) / 1000 % 60)) : "00";
		diff < 1000 && clearInterval(interval);
		diff < 1000 && console.log("Акция закончена");
	}

	function getFormatDate(n) { return n < 10 ? "0" + n : n; }

	initTimer(promoEndTime);


	//Modal
	const modalWindow = document.querySelector(".modal"),
		modalDialog = document.querySelector(".modal__dialog"),
		modalButtons = document.querySelectorAll('[data-modal]');
	let _flgModalOpened = false;
	let openInTime = undefined;

	window.addEventListener("scroll", openModalWhenScrollInBottomPage);
	modalButtons.forEach(mb => mb.addEventListener("click", openModal));

	openInTime !== undefined && openModalByTime(openInTime);

	function openModal() {
		_flgModalOpened = true;
		document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
		document.body.style.overflowY = "hidden";
		modalWindow.style.display = "block";
		modalDialog.style.display = "block";
		modalWindow.addEventListener("click", handleDocClick);
		document.addEventListener("keydown", handleKey);
		let opacity = 0;
		const openTimer = setInterval(() => {
			opacity += 0.02;
			modalWindow.style.opacity = opacity;
			modalDialog.style.opacity = opacity;
			Number(modalWindow.style.opacity) === 1 && clearInterval(openTimer);
		}, 0);
	}

	function openModalByTime(time) {
		const m = setTimeout(() => {
			!_flgModalOpened && openModal();
			clearTimeout(m);
		}, time);
	};

	function closeModalWindow() {
		removeEventListener("click", openModal);
		removeEventListener("keydown", handleKey);
		let opacity = 1;
		const closeTimer = setInterval(() => {
			opacity -= 0.02;
			modalWindow.style.opacity = opacity;
			modalDialog.style.opacity = opacity;
			if (Number(modalWindow.style.opacity) < 0) {
				clearInterval(closeTimer);
				modalWindow.style.display = "none";
				modalDialog.style.opacity = 0;
				document.body.style.overflowY = "auto";
				document.body.style.paddingRight = 0;
			}
		}, 0);
	}

	function openModalWhenScrollInBottomPage() {
		let yOffset = window.pageYOffset,
			clientHeight = document.documentElement.clientHeight,
			scrollHeight = document.documentElement.scrollHeight;
		if (yOffset + clientHeight === scrollHeight) {
			openModal();
			removeEventListener("scroll", openModalWhenScrollInBottomPage);
		}
	}

	function handleKey(e) { e.key === "Escape" && closeModalWindow() }
	function handleDocClick(e) {
		if (e.target.classList.contains("modal") || e.target.classList.contains("modal__close")) {
			closeModalWindow(e);
		}
	}



	//Food menu
	class FoodMenu {
		constructor([img, alt], caption, desc, price, destSelector, ...classes) {
			this.img = img;
			this.alt = alt;
			this.caption = caption;
			this.desc = desc;
			this.price = price;
			this.destSelector = document.querySelector(destSelector);
			this.classes = classes.length ? classes : ['menu__item'];
		}

		render() {
			const menuItem = document.createElement("div");
			this.classes.forEach(isClass => menuItem.classList.add(isClass));
			menuItem.innerHTML = `
				<img src="${this.img}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.caption}</h3>
				<div class="menu__item-descr">${this.desc}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.destSelector.appendChild(menuItem);
		}
	}

	async function getResource(url) {
		const req = await fetch(url);
		if (req.ok) {
			return await req.json();
		} else {
			throw new Error(`${req.status} + " " + ${req.statusText} + "(" + ${req.url} + ")"`);
		}
	};

	getResource('http://localhost:3000/menu')
		.then(data => data.forEach(({ img, altimg, title, descr, price }) => {
			new FoodMenu([img, altimg], title, descr, price, '.menu__field .container').render()
		}));


	//Forms
	const forms = document.querySelectorAll("form");

	const message = {
		loading: "Loading...",
		success: "Thanks! We'll soon call you!",
		failure: "Something went wrong..."
	};

	forms.forEach(form => bindPostData(form));


	async function postData(url, data) {
		const req = await fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json; charset=utf-8" },
			body: data
		});
		if (req.ok) {
			return await req.json();
		} else {
			return new Error(`${req.status} + " " + ${req.statusText} + "(" + ${req.url} + ")"`);
		}
	};

	function bindPostData(form) {
		form.addEventListener('submit', function (e) {
			sendData(e, form, this);
		});
	};

	function sendData(e, form, parent) {
		e.preventDefault();

		const statusMessage = document.createElement("div");
		statusMessage.classList.add("status");
		statusMessage.textContent = message.loading;
		const img = document.createElement("img");
		img.src = "../img/form/spinner.svg";
		img.alt = message.loading;
		const frm = document.querySelector(".modal__content form");
		const tmp = frm.parentElement.innerHTML;
		frm.querySelector('button').insertAdjacentElement('afterbegin', img);

		const formData = new FormData(form);
		const obj = JSON.stringify(Object.fromEntries(formData.entries()));


		postData('http://localhost:3000/requests', obj)
			.then(() => {
				frm.querySelector('button img').remove();
				frm.innerHTML = `
				<div class="modal__close">&times;</div>
				<div class="modal__title">${message.success}</div>
			`;
			})
			.catch((data) => {
				console.log(data);
				frm.innerHTML = `
				<div class="modal__close">&times;</div>
				<div class="modal__title">${message.failure}</div>
			`;
			})
			.finally(() => {
				form.reset();
				setTimeout(() => {
					closeModalWindow();
					frm.parentElement.innerHTML = tmp;
				}, 2000);
			});

		parent.removeEventListener("submit", sendData);

	};


	// Slider
	class Slider {
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

	new Slider("offer__slider");


});

