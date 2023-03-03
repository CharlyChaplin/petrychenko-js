export default class Tabs {
	constructor(container) {
		this.container = document.querySelector(container);
		this.tabItems = this.container.querySelectorAll('.tabheader__item');
		this.tabContents = this.container.querySelectorAll('.tabcontent');
		this.tabHeader = this.container.querySelector('.tabheader__items');
		
		this._initTabs();
	}

	_initTabs =() => {
		if (this.tabItems.length !== this.tabContents.length) {
			console.log("Tabs not ready");
		} else {
			this._renderTabContent();
			this.tabHeader.addEventListener("click", this._tabClick);
		}
	};
	_tabClick = e => {
		if (e.target && e.target.classList.contains("tabheader__item")) {
			this.tabItems.forEach((tab, i) => {
				if (tab === e.target) this._tabChoiced(i);
			});
		}
	};
	_tabChoiced = index => {
		this.tabItems.forEach((tabItem, i) => {
			i === index
				? tabItem.classList.add("tabheader__item_active")
				: tabItem.classList.remove("tabheader__item_active");
		});
		this._renderTabContent(index);
	};
	_renderTabContent = () => {
		this.tabItems.forEach((tabItem, index) => {
			if (tabItem.classList.contains("tabheader__item_active")) {
				this.tabContents[index].style.removeProperty("display");
				!this.tabContents[index].style.length && this.tabContents[index].removeAttribute("style");
			} else {
				this.tabContents[index].style.display = "none";
			}
		});
	}
}