import { fetchData } from '../services/';

export default class PromoTimer {
	constructor(container) {
		this.container = document.querySelector(container);
		this.days = this.container.querySelector('.days');
		this.hours = this.container.querySelector('.hours');
		this.minutes = this.container.querySelector('.minutes');
		this.seconds = this.container.querySelector('.seconds');
		this.finishPromo = this.container.querySelector('.promotion__text strong');
		this._init();
	};

	_init() {
		fetchData('promotime')
			.then(data => {
				data.forEach(({ enddata }) => this._initTimer(new Date(enddata)))
			});
	};

	_initTimer(endTime) {
		let diff = endTime - new Date();
		this._renderTime(diff < 0 ? 0 : diff);

		if (diff > 0) {
			const interval = setInterval(() => {
				diff = endTime - new Date();
				this._renderTime(diff < 0 ? 0 : diff, interval);
			}, 1000);
		};

		this._getFinishDate(endTime);
	};

	_getFinishDate = finishTime => {
		const date = new Date(finishTime);
		let options = {
			month: "long",
			day: "numeric",
		};
		const finishDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
		this.finishPromo.textContent = `${finishDate} в 00:00`;
	}

	_renderTime(diff = 0, interval) {
		this.days.textContent = diff > 0 ? this._getFormatDate(Math.floor(new Date(diff) / (1000 * 60 * 60 * 24))) : "00";
		this.hours.textContent = diff > 0 ? this._getFormatDate(Math.floor(new Date(diff) / (1000 * 60 * 60) % 60)) : "00";
		this.minutes.textContent = diff > 0 ? this._getFormatDate(Math.floor(new Date(diff) / (1000 * 60) % 60)) : "00";
		this.seconds.textContent = diff > 0 ? this._getFormatDate(Math.floor(new Date(diff) / 1000 % 60)) : "00";
		diff < 1000 && clearInterval(interval);
		diff < 1000 && console.log("Акция закончена");
	};

	_getFormatDate = n => n < 10 ? "0" + n : n;
}
