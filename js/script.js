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
	}

	function renderTabContent() {
		tabItems.forEach((tabItem, index) => {
			if (tabItem.classList.contains("tabheader__item_active")) {
				tabContents[index].style.removeProperty("display");
				!tabContents[index].style.length && tabContents[index].removeAttribute("style");
			} else {
				tabContents[index].style.display = "none";
			}
		});
	}
})

