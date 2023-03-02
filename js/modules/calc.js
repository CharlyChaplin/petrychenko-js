export default function calcRender() {
	// Calculator
	const calculator = document.querySelector('.calculating__field');

	initCalculator(getLocalstorageData(), 'calculating__choose-item_active');

	function getLocalstorageData() {
		return JSON.parse(localStorage.getItem("calc")) || {
			woman: true,
			man: false,
			height: '',
			weight: '',
			age: '',
			low: false,
			small: true,
			medium: false,
			high: false
		};
	}

	function initCalculator(items, activeClass) {
		// считываем начальные данные с объекта и обновляем HTML
		Object.entries(items).forEach(i => {
			const tmpElem = document.getElementById(`${i[0]}`);
			(i[1] && !tmpElem.type) ? tmpElem.classList.add(activeClass) : tmpElem.classList.remove(activeClass);
			if (tmpElem.type === 'text') tmpElem.value = i[1];
		});

		resultShow(items);	// отображение после первичной инициализации


		calculator.addEventListener('click', e => {
			const t = e.target;
			if ((t.id === Object.keys(items).find(i => i === t.id)) && (t.nodeName !== "INPUT")) {
				// обрабатываем событие для div GENDER
				if (t.parentElement.id === "gender") {
					calculator.querySelectorAll(`#${t.parentElement.getAttribute('id')} div`)
						.forEach(i => {
							if (t === i) {
								t.classList.add(activeClass); //внешнее изменение
								items[i.id] = true;	//внутреннее изменение
								localStorage.setItem("calc", JSON.stringify(items));
							} else {
								i.classList.remove(activeClass); //внешнее изменение
								items[i.id] = false;	//внутреннее изменение
								localStorage.setItem("calc", JSON.stringify(items));
							}
						});
					resultShow(items);	// отображение после каждого клика
					// обрабатываем событие для div АКТИВНОСТЬ
				} else {
					calculator.querySelectorAll('.calculating__choose_big div')
						.forEach(i => {
							if (t === i) {
								t.classList.add(activeClass); //внешнее изменение
								items[i.id] = true;	//внутреннее изменение
								localStorage.setItem("calc", JSON.stringify(items));
							} else {
								i.classList.remove(activeClass); //внешнее изменение
								items[i.id] = false;	//внутреннее изменение
								localStorage.setItem("calc", JSON.stringify(items));
							}
						});
				}
				resultShow(items);	// отображение после каждого клика
			};
		});
		// обрабатываем событие на ввод данных в INPUT
		calculator.addEventListener('input', e => {
			const t = e.target;
			let val = t.value;
			if ((t.id === Object.keys(items).find(i => i === t.id)) && (t.nodeName === "INPUT")) {
				items[e.target.id] = val;
				localStorage.setItem("calc", JSON.stringify(items));
			}
			resultShow(items);	// отображение после каждого ввода
		});
		calculator.addEventListener('keypress', e => {
			(isNaN(e.key) || e.code === 'Space') && e.preventDefault();
		});

	};
	// добавляем кнопку очистки формы рядом с результатом
	(function clearForm() {
		const clearBtn = document.createElement('div');
		clearBtn.classList.add("calculating__clear");
		clearBtn.innerText = "Очистить форму";
		clearBtn.addEventListener('click', () => {
			let initVars = {
				woman: true,
				man: false,
				height: '',
				weight: '',
				age: '',
				low: false,
				small: true,
				medium: false,
				high: false
			};
			if (confirm('Очистить?')) {
				localStorage.clear();
				initCalculator(initVars, 'calculating__choose-item_active');
			}
		})
		calculator.querySelector('.calculating__total').insertAdjacentElement('beforeend', clearBtn);
	})();

	function resultShow({ woman, man, height, weight, age, low, small, medium, high }) {
		const resultField = document.querySelector('.calculating__result span');
		let result = 0;
		if (!height || !weight || !age) {
			result = 0;
			resultField.textContent = "___";
			return;
		}
		const rate = low ? 1.2 : small ? 1.375 : medium ? 1.55 : high ? 1.725 : 0;
		result = woman
			? (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * rate
			: (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * rate;

		resultField.textContent = Math.floor(result);
	}
}