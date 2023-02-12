/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

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

//const input = document.querySelector(".adding__input");
//input.addEventListener("keypress", handleKey);
//const sendBtn = document.querySelector(".add button");
//sendBtn.addEventListener("click", handleClick);
const list = document.querySelector(".promo__interactive-list");

render();

//function deleteListItem(i) {
//	list.children[i].remove();
//	movieDB.movies = movieDB.movies.filter((_, index) => index !== i);
//	render();
//};
//function handleKey(e) {
//	if (e.key === "Enter") {
//		if (e.target.value.toString().length > 0) {
//			e.preventDefault();
//			addItem(String(input.value));
//			e.target.value = "";
//		} else {
//			e.preventDefault();
//			console.log("Empty input");
//		}
//	}
//};
//function handleClick(e) {
//	e.preventDefault();
//	if (input.value.toString().length > 0) {
//		addItem(String(input.value));
//		input.value = "";
//	} else {
//		console.log("Empty input");
//	}
//};
//function addItem(text) {
//	movieDB.movies = [...movieDB.movies, text];
//	render();
//};

function render() {
	list.innerHTML = '';
	movieDB.movies.sort().forEach((item, index) => {
		const listItem = document.createElement("li");
		listItem.classList.add("promo__interactive-item");
		listItem.textContent = `${index + 1}.) ${item}`;
		const delBtn = document.createElement("div");
		delBtn.classList.add("delete");
		//delBtn.addEventListener("click", () => deleteListItem(index));
		listItem.appendChild(delBtn);
		list.appendChild(listItem);
	});
};