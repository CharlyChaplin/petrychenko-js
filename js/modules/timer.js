import { getResource } from '../services/';

export default function promoTimer() {
	//Timer
	getResource('http://localhost:3000/promotime')
		.then(data => {
			data.forEach(({ enddata }) => initTimer(new Date(enddata)))
		});

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
}
