import { getResource } from "../services";

export default function food() {
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

	getResource('http://localhost:3000/menu')
		.then(data => data.forEach(({ img, altimg, title, descr, price }) => {
			new FoodMenu([img, altimg], title, descr, price, '.menu__field .container').render()
		}));
}