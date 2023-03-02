import { calcRender, food, formRender, modalWindow, promoTimer, sliderRender, tabs } from "./modules";


window.addEventListener("DOMContentLoaded", function () {
	
	tabs();
	
	promoTimer();
	
	modalWindow();

	food();

	formRender();

	sliderRender();

	calcRender();
	
});

