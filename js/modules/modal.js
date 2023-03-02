export default function modalWindow() {
	//Modal
	const modalWindow = document.querySelector(".modal"),
		modalDialog = document.querySelector(".modal__dialog"),
		modalButtons = document.querySelectorAll('[data-modal]');
	let _flgModalOpened = false;
	let openInTime = undefined;

	window.addEventListener("scroll", openModalWhenScrollInBottomPage);
	modalButtons.forEach(mb => mb.addEventListener("click", openModal));

	openInTime !== undefined && openModalByTime(openInTime);

	function openModal() {
		_flgModalOpened = true;
		document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
		document.body.style.overflowY = "hidden";
		modalWindow.style.display = "block";
		modalDialog.style.display = "block";
		modalWindow.addEventListener("click", handleDocClick);
		document.addEventListener("keydown", handleKey);
		let opacity = 0;
		const openTimer = setInterval(() => {
			opacity += 0.02;
			modalWindow.style.opacity = opacity;
			modalDialog.style.opacity = opacity;
			Number(modalWindow.style.opacity) === 1 && clearInterval(openTimer);
		}, 0);
	}

	function openModalByTime(time) {
		const m = setTimeout(() => {
			!_flgModalOpened && openModal();
			clearTimeout(m);
		}, time);
	};

	function closeModalWindow() {
		removeEventListener("click", openModal);
		removeEventListener("keydown", handleKey);
		let opacity = 1;
		const closeTimer = setInterval(() => {
			opacity -= 0.02;
			modalWindow.style.opacity = opacity;
			modalDialog.style.opacity = opacity;
			if (Number(modalWindow.style.opacity) < 0) {
				clearInterval(closeTimer);
				modalWindow.style.display = "none";
				modalDialog.style.opacity = 0;
				document.body.style.overflowY = "auto";
				document.body.style.paddingRight = 0;
			}
		}, 0);
	}

	function openModalWhenScrollInBottomPage() {
		let yOffset = window.pageYOffset,
			clientHeight = document.documentElement.clientHeight,
			scrollHeight = document.documentElement.scrollHeight;
		if (yOffset + clientHeight === scrollHeight) {
			openModal();
			removeEventListener("scroll", openModalWhenScrollInBottomPage);
		}
	}

	function handleKey(e) { e.key === "Escape" && closeModalWindow() }
	function handleDocClick(e) {
		if (e.target.classList.contains("modal") || e.target.classList.contains("modal__close")) {
			closeModalWindow(e);
		}
	}
}