/* Задание на урок:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами*/

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
	const answer = prompt("What one of films has been watched?"),
			rating = prompt("What an estimate do you have?");
	
	if (answer.length < 51 && answer !== "" && rating !== "" && answer !== null && rating !== null) {
		personalMovieDB.movies = { ...personalMovieDB.movies, ...({ [answer]: rating }) }
	} else {
		i--;
	}
};

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

console.log(personalMovieDB);