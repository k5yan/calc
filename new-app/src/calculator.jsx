import { useState } from 'react';
import styles from './calculator.module.css';

const calculations = [`+`, `-`, `C`, `=`];

const buttonList = [
	// все элементы калькулятора в массиве
	{
		id: 'one',
		className: 'calcButtonNumber',
		symbol: '1',
		func: `default`,
	},
	{
		id: 'two',
		className: 'calcButtonNumber',
		symbol: '2',
		func: `default`,
	},
	{
		id: 'three',
		className: 'calcButtonNumber',
		symbol: '3',
		func: `default`,
	},
	{
		id: 'clear',
		className: 'calcButtonSymbol',
		symbol: 'C',
		func: `clear`,
	},
	{
		id: 'four',
		className: 'calcButtonNumber',
		symbol: '4',
		func: `default`,
	},
	{
		id: 'five',
		className: 'calcButtonNumber',
		symbol: '5',
		func: `default`,
	},
	{
		id: 'six',
		className: 'calcButtonNumber',
		symbol: '6',
		func: `default`,
	},
	{
		id: 'minus',
		className: 'calcButtonSymbol',
		symbol: '-',
		func: `minus`,
	},
	{
		id: 'seven',
		className: 'calcButtonNumber',
		symbol: '7',
		func: `default`,
	},
	{
		id: 'eight',
		className: 'calcButtonNumber',
		symbol: '8',
		func: `default`,
	},
	{
		id: 'nine',
		className: 'calcButtonNumber',
		symbol: '9',
		func: `default`,
	},
	{
		id: 'plus',
		className: 'calcButtonSymbol',
		symbol: '+',
		func: `plus`,
	},
	{
		id: 'zero',
		className: 'calcButtonNumber',
		symbol: '0',
		func: `default`,
	},
	{
		id: 'styleElement',
		className: 'forCoolStyle',
		symbol: '',
		func: `default`,
	},
	{
		id: 'equal',
		className: 'calcButtonSymbol',
		symbol: '=',
		func: `equal`,
	},
];

let expressionResult = 0; //результат выражения здесь
let secondNumber = ``; //второе число
let writingChanger = false; // true for write in expressionResult(leftNumber);
let opCounter = 0; //счетчик операций, нужен чтобы вовремя начать считать
let operationType = `default`; //параметр, содержащий тип операции

const changerOption = {
	false: (symbol, expression) => {
		expressionResult = parseInt(expression + symbol);
	},
	true: (symbol) => {
		secondNumber += symbol;
	},
};

export const CalcMaker = () => {
	const [expression, setExpression] = useState(` `); //выражение на экране калькулятора

	const types = {
		// сборник функций для кнопок меню
		plus: (leftNumber, rightNumber) => {
			return leftNumber + rightNumber;
		},
		minus: (leftNumber, rightNumber) => {
			return leftNumber - rightNumber;
		},
		equal: () => {
			setExpression(expression + `=` + expressionResult.toString());
		},
		clear: () => {
			window.location.reload(); // я надеюсь так можно было
		},
	};

	const checkAndWrite = (symbol, func) => {
		//проверка какой символ введен, цифра или нет
		if (
			!calculations.includes(symbol) ||
			(!(expression[expression.length - 1] === symbol) &&
				!calculations.includes(expression[expression.length - 1]))
		) {
			if (!calculations.includes(symbol)) {
				if (operationType !== `equal`) {
					changerOption[writingChanger](symbol, expression);
					setExpression(expression + symbol);
				}
			} else {
				document.querySelector(`#screen`).style.color = `white`;
				if (func !== `equal`) {
					if (!writingChanger) {
						writingChanger = !writingChanger;
					}
					operationType = func;
				}
				opCounter++;
				setExpression(expression + symbol);
			}
		} else {
			setExpression(expression.replace(expression[expression.length - 1], symbol));
			operationType = func;
		}
		console.log(symbol);
		console.log(`expression = `, expression);
		console.log(`expressionResult = `, expressionResult);
		console.log(`secondNumber = `, secondNumber);
		console.log(`operationType = `, operationType);
		console.log(`writingChanger = `, writingChanger);
		console.log(`changeCounter = `, opCounter);
		console.log(`-----------------------------------------------`);
	};

	const setСalculations = (symbol, func) => {
		//главная функция
		checkAndWrite(symbol, func);
		if (opCounter > 1) {
			expressionResult = types[operationType](
				expressionResult,
				parseInt(secondNumber),
			);
			opCounter--;
			secondNumber = ``;
		}
		if (func === `equal`) {
			opCounter = 0;
			operationType = `equal`;
			types.equal();
			document.querySelector(`#screen`).style.color = `red`;
		}
		if (func === `clear`) {
			types.clear();
		}
	};

	return (
		<>
			<div className={styles.calcWindow}>
				<div id="screen" className={styles.calcScreenExpression}>
					{expression}
				</div>
				{buttonList.map(({ id, className, symbol, func }) => {
					return (
						<button
							key={id}
							className={styles[`${className}`]}
							onClick={() => setСalculations(symbol, func)}
						>
							{symbol}
						</button>
					);
				})}
			</div>
		</>
	);
};
