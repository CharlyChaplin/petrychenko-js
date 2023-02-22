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

	new FoodMenu(
		["img/tabs/vegy.jpg", "vegy"],
		'Меню “Фитнес”',
		'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		229,
		'.menu__field .container').render();
	new FoodMenu(
		["img/tabs/elite.jpg", "elite"],
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		550,
		'.menu__field .container').render();
	new FoodMenu(
		["img/tabs/post.jpg", "post"],
		'Меню “Постное”',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		430,
		'.menu__field .container').render();



	//Forms
	const forms = document.querySelectorAll("form");

	const message = {
		loading: "Loading...",
		success: "Thanks! We'll soon call you!",
		failure: "Something went wrong..."
	};

	forms.forEach(form => postData(form));

	function postData(form) {
		form.addEventListener('submit', function (e) {
			sendForm(e, form, this);
		});
	}

	function sendForm(e, form, parent) {
		e.preventDefault();

		const statusMessage = document.createElement("div");
		statusMessage.classList.add("status");
		statusMessage.textContent = message.loading;
		const img = document.createElement("img");
		img.src = "../img/form/spinner.svg";
		img.alt = message.loading;
		const frm = document.querySelector(".modal__content form");
		frm.querySelector('button').insertAdjacentElement('afterbegin', img);


		const request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		request.setRequestHeader("Content-type", "application/json");
		const formData = new FormData(form);

		const obj = {};

		formData.forEach((val, key) => obj[key] = val);
		request.send(JSON.stringify(obj));

		request.addEventListener('load', () => {
			frm.querySelector('button img').remove();
			const tmp = frm.parentElement.innerHTML;

			if (request.status === 200) {
				console.log(request.response);
				frm.innerHTML = `
					<div class="modal__close">&times;</div>
					<div class="modal__title">${message.success}</div>
				`;
				form.reset();
				setTimeout(() => {
					closeModalWindow();
					frm.parentElement.innerHTML = tmp;
				}, 2000);
			} else {
				console.log(request.response);
				frm.innerHTML = `
					<div class="modal__close">&times;</div>
					<div class="modal__title">${message.failure}</div>
				`;
				setTimeout(() => {
					closeModalWindow();
					frm.parentElement.innerHTML = tmp;
				}, 2000);
			}
		});

		parent.removeEventListener("submit", sendForm);
	}



});