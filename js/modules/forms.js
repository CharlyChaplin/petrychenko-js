export default function formRender() {
	//Forms
	const forms = document.querySelectorAll("form");

	const message = {
		loading: "Loading...",
		success: "Thanks! We'll soon call you!",
		failure: "Something went wrong..."
	};

	forms.forEach(form => bindPostData(form));


	async function postData(url, data) {
		const req = await fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json; charset=utf-8" },
			body: data
		});
		if (req.ok) {
			return await req.json();
		} else {
			return new Error(`${req.status} + " " + ${req.statusText} + "(" + ${req.url} + ")"`);
		}
	};

	function bindPostData(form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			sendData(e, form, this);
		});
	};

	function sendData(e, form, parent) {
		e.preventDefault();

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


		postData('http://localhost:3000/requests', obj)
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
					closeModalWindow();
					frm.parentElement.innerHTML = tmp;
				}, 2000);
			});

		parent.removeEventListener("submit", sendData);

	};
}