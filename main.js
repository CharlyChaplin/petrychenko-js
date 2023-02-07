/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство private. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

let numberOfFilms = 0;

let personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	private: false
};


function start() {
	do {
		numberOfFilms = prompt("How many films did you watch?");
	} while (numberOfFilms === null || numberOfFilms === "" || isNaN(numberOfFilms));
	personalMovieDB["count"] = numberOfFilms;
}

start();

function rememberMyFilms() {
	for (let i = 1; i <= 2; i++) {
		const answer = prompt("What one of films has been watched?"),
			rating = prompt("What an estimate do you have?");

		if (answer.length < 51 && answer !== "" && rating !== "" && answer !== null && rating !== null) {
			personalMovieDB.movies = { ...personalMovieDB.movies, ...({ [answer]: rating }) }
		} else {
			i--;
		}
	};
}

rememberMyFilms();

function detectPersonLevel() {
	const value = +personalMovieDB.count;
	if (value < 10) {
		console.log("Quite a little films has been watched.");
	} else if (value <= 30) {
		console.log("You're a classical movie watcher.");
	} else if (value > 30) {
		console.log("You're kinoman!");
	} else {
		console.log("Error occured.");
	}
}

detectPersonLevel();

function writeYourGenres() {
	for (let i = 0; i <= 2; i++) {
		personalMovieDB.genres[i] = prompt(`You favorite genre at number ${i + 1}?`);
	}
}

writeYourGenres();

function showMyDB(hidden) {
	if (!hidden) console.log(personalMovieDB);
}

showMyDB(personalMovieDB.private);
