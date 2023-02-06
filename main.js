/* Задание на урок:

1) Создать переменную numberOfFilms и в неё поместить ответ от пользователя на вопрос:
'Сколько фильмов вы уже посмотрели?'

2) Создать объект personalMovieDB и в него поместить такие свойства:
	- count - сюда передается ответ на первый вопрос
	- movies - в это свойство поместить пустой объект
	- actors - тоже поместить пустой объект
	- genres - сюда поместить пустой массив
	- privat - в это свойство поместить boolean(логическое) значение false

3) Задайте пользователю по два раза вопросы:
	- 'Один из последних просмотренных фильмов?'
	- 'На сколько оцените его?'
Ответы стоит поместить в отдельные переменные
Записать ответы в объект movies в формате: 
	movies: {
		'logan': '8.1'
	}

Проверить, чтобы все работало без ошибок в консоли */

'use strict';

let numberOfFilms = prompt("How many films did you watch?");

let personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	private: false
}

for (let i = 1; i <= 2; i++) {
	let answer = prompt("What one of films has been watched?");
	let rating = prompt("What an estimate do you have?");

	personalMovieDB.movies = { ...personalMovieDB.movies, ...({ [answer]: rating }) }

};
console.log(personalMovieDB);
Object.defineProperty(personalMovieDB, 'count', {writable: false});
console.log(personalMovieDB);
try {
	personalMovieDB.count = 34;
} catch (err) {
	console.log(err.message)
}
