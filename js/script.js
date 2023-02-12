/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener("DOMContentLoaded", function () {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	document.querySelector(".promo__adv").remove();
	document.querySelector('.promo__content').style.width = "100%";
	document.querySelector(".promo__genre").textContent = "ДРАМА";
	document.querySelector(".promo__bg").style.backgroundImage = "url('../img/bg.jpg')";

	const input = document.querySelector(".adding__input");
	input.addEventListener("keypress", handleKey);
	const sendBtn = document.querySelector(".add button");
	sendBtn.addEventListener("click", handleClick);
	const form = document.querySelector(".add");
	const chk = form.querySelector("[type='checkbox']");
	const span_chk = form.querySelector(".yes");
	const list = document.querySelector(".promo__interactive-list");

	span_chk.addEventListener("click", handleSpanChk);

	function handleSpanChk() { chk.checked = !chk.checked };

	render();

	function deleteListItem(i) {
		list.children[i].removeEventListener("click", deleteListItem);
		movieDB.movies = movieDB.movies.filter((_, index) => index !== i);
		render();
	};
	function handleKey(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			if (e.target.value.toString().length) addItem(String(input.value));
		}
	};
	function handleClick(e) {
		e.preventDefault();
		if (input.value.toString().length) addItem(String(input.value));
	};
	function addItem(text) {
		movieDB.movies = [...movieDB.movies, text];
		chk.checked ? console.log("Adding favorite film") : '';
		form.reset();
		render();
	};
	function getCaption(txt) {
		return txt.length < 21 ? txt : txt.substr(0, 21).concat("...");
	}
	function render() {
		list.innerHTML = '';
		movieDB.movies.sort().forEach((item, index) => {
			const listItem = document.createElement("li");
			listItem.classList.add("promo__interactive-item");
			listItem.textContent = `${index + 1}.) ${getCaption(item)}`;
			const delBtn = document.createElement("div");
			delBtn.classList.add("delete");
			delBtn.addEventListener("click", () => deleteListItem(index));
			listItem.appendChild(delBtn);
			list.appendChild(listItem);
		});
	};
})

