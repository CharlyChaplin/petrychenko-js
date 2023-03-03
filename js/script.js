import {Modal, calcRender, food, formRender, PromoTimer, Slider, Tabs } from "./modules";


window.addEventListener("DOMContentLoaded", function () {
	new Modal('.modal', 'data-modal');

	new Tabs('.tabcontainer');

	new PromoTimer('.promotion');

	food();

	formRender('form');

	new Slider("offer__slider");

	calcRender();

});

