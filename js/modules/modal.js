import { fetchData } from "../services";

export class Modal {
	constructor(container, dataName) {
		this.container = document.querySelector(container);
		this.modalDialog = this.container.querySelector(`${container}__dialog`);
		this.modalButtons = document.querySelectorAll(`[${dataName}]`);

		this._flgModalOpened = false;

		this._initModal();
	}

	_initModal = () => {
		window.addEventListener("scroll", this._openModalWhenScrollInBottomPage);
		this.modalButtons.forEach(mb => mb.addEventListener("click", this._openModal));

		this._initOpenInTime();
	}
	_initOpenInTime = () => {
		fetchData('openInTime')
			.then(data => data.forEach(({ timeopen }) => {
				timeopen && this._openModalByTime(timeopen);
			}));
	}
	_openModal = () => {
		this._flgModalOpened = true;
		document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
		document.body.style.overflowY = "hidden";
		this.container.style.display = "block";
		this.modalDialog.style.display = "block";
		this.container.addEventListener("click", this._handleDocClick);
		document.addEventListener("keydown", this._handleKey);
		let opacity = 0;
		const openTimer = setInterval(() => {
			opacity += 0.02;
			this.container.style.opacity = opacity;
			this.modalDialog.style.opacity = opacity;
			Number(this.container.style.opacity) === 1 && clearInterval(openTimer);
		}, 0);
	};
	_openModalByTime = time => {
		const m = setTimeout(() => {
			!this._flgModalOpened && this._openModal();
			clearTimeout(m);
		}, time);
	};
	_closeModalWindow = () => {
		removeEventListener("click", this._openModal);
		removeEventListener("keydown", this._handleKey);
		let opacity = 1;
		const closeTimer = setInterval(() => {
			opacity -= 0.02;
			this.container.style.opacity = opacity;
			this.modalDialog.style.opacity = opacity;
			if (Number(this.container.style.opacity) < 0) {
				clearInterval(closeTimer);
				this.container.style.display = "none";
				this.modalDialog.style.opacity = 0;
				document.body.style.overflowY = "auto";
				document.body.style.paddingRight = 0;
			}
		}, 0);
	};
	_openModalWhenScrollInBottomPage = () => {
		let yOffset = window.pageYOffset,
			clientHeight = document.documentElement.clientHeight,
			scrollHeight = document.documentElement.scrollHeight;
		if (yOffset + clientHeight === scrollHeight) {
			this._openModal();
			removeEventListener("scroll", this._openModalWhenScrollInBottomPage);
		}
	};
	_handleKey = e => { e.key === "Escape" && this._closeModalWindow() };
	_handleDocClick = e => {
		if (e.target.classList.contains(this.container.className) || e.target.classList.contains(`${this.container.className}__close`)) {
			this._closeModalWindow();
		}
	}
}