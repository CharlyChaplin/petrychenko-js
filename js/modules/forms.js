import { fetchData } from "../services";
import { Modal } from "./modal";

export default function formRender(formSelector) {
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: "Loading...",
		success: "Thanks! We'll soon call you!",
		failure: "Something went wrong..."
	};

	forms.forEach(form => bindPostData(form));


	function bindPostData(form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			sendData(e, form, this);
		});
	};

	function sendData(e, form, parent) {

		const statusMessage = document.createElement("div");
		statusMessage.classList.add("status");
		statusMessage.textContent = message.loading;
		const img = document.createElement("img");
		img.setAttribute("src", "../img/form/spinner.svg");
		img.setAttribute("alt", message.loading);
		img.src = "../img/form/spinner.svg";
		img.alt = message.loading;
		const frm = document.querySelector(".modal__content form");
		const tmp = frm.parentElement.innerHTML;
		frm.querySelector('button').insertAdjacentElement('afterbegin', img);

		const formData = new FormData(form);
		const obj = JSON.stringify(Object.fromEntries(formData.entries()));

		fetchData('requests', "post", obj)
			.then(() => {
				frm.querySelector('button img').remove();
				frm.innerHTML = `
				<div class="modal__close">&times;</div>
				<div class="modal__title">${message.success}</div>
			`;
			})
			.catch((data) => {
				console.log(data);
				frm.innerHTML = `
				<div class="modal__close">&times;</div>
				<div class="modal__title">${message.failure}</div>
			`;
			})
			.finally(() => {
				form.reset();
				setTimeout(() => {
					new Modal('.modal', 'data-modal')._closeModalWindow();
					setTimeout(() => {
						frm.parentElement.innerHTML = tmp;
					}, 200);

				}, 2000);
			});

		parent.removeEventListener("submit", sendData);

	};
}