window.addEventListener("DOMContentLoaded", function () {
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




	const promoEndTime = new Date('2023-02-14T22:12:50');

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


});

