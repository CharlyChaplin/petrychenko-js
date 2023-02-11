/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

let personalMovieDB = {
	count: 0,
	movies: {},
	actors: {},
	genres: [],
	private: false,

	start: function () {
		do {
			numberOfFilms = prompt("How many films did you watch?");
		} while (numberOfFilms === null
													|| isNaN(parseInt(numberOfFilms))
													|| isNaN(parseFloat(numberOfFilms))
													|| numberOfFilms === ""
													|| isNaN(numberOfFilms));
		this.count = +(Math.round(numberOfFilms));
	},

	rememberMyFilms: function () {
		for (let i = 1; i <= 2; i++) {
			const answer = prompt("What one of films has been watched?"),
				rating = prompt("What an estimate do you have?");

			if (answer.length < 51 && answer !== "" && rating !== "" && answer !== null && rating !== null) {
				this.movies = { ...this.movies, ...({ [answer]: rating }) };
			} else {
				i--;
			}
		};
	},

	detectPersonLevel: function () {
		const value = this.count;
		if (value < 10) {
			console.log("Quite a little films has been watched.");
		} else if (value <= 30) {
			console.log("You're a classical movie watcher.");
		} else if (value > 30) {
			console.log("You're kinoman!");
		} else {
			console.log("Error occured.");
		}
	},

	writeYourGenres: function () {
		for (let i = 0; i <= 2; i++) {
			const answer = prompt(`You favorite genre at number ${i + 1}?`);

			if (answer === null || answer === "" || answer.length > 50) {
				i--;
			} else {
				this.genres.push(answer);
			};
		};
		this.genres.forEach((_, i, arr) => console.log(`Favorite genre #${i + 1} - it's ${arr[i]}`));
	},

	toggleVisibleMyDB: function () { this.private = !this.private },

	showMyDB: function () { if (this.private === false) console.log(this) }
};

personalMovieDB.start();

personalMovieDB.rememberMyFilms();

personalMovieDB.detectPersonLevel();

personalMovieDB.writeYourGenres();

personalMovieDB.showMyDB();

personalMovieDB.toggleVisibleMyDB();

personalMovieDB.showMyDB();
