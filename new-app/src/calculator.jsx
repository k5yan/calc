import { useState, useEffect, useRef } from 'react';
import styles from './calculator.module.css';

const calculations = [`+`, `-`, `=`, `C`];

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
export const CalcMaker = () => {
	const [expression, setExpression] = useState(``);
	const [firstNumber, setFirstNumber] = useState(0);
	const [secondNumber, setSecondNumber] = useState(``);
	const [operator, setOperator] = useState(`default`);

	const screenRef = useRef(null);

	useEffect(() => {
		if (operator === 'equal') {
			setExpression((prevExpression) => prevExpression + firstNumber);
			screenRef.current.style.color = `red`;
		}
	}, [firstNumber, operator]);

	const inputCheck = (symbol, func) => {
		screenRef.current.style.color = `white`;
		if (
			!calculations.includes(symbol) ||
			(!(expression[expression.length - 1] === symbol) &&
				!calculations.includes(expression[expression.length - 1]))
		) {
			if (calculations.includes(symbol)) {
				if (func === `clear`) {
					setExpression(``);
					setFirstNumber(0);
					setSecondNumber(``);
					setOperator(`default`);
				} else {
					setExpression((prevExpression) => prevExpression + symbol);
					operationStart(operator);
					setOperator(func);
					setSecondNumber(``);
				}
			} else {
				if (operator !== `equal`) {
					setExpression((prevExpression) => prevExpression + symbol);
					//добавил строку выше, чтобы после 2+2=4 нельзя было вводить дальше цифры,
					//и не получалось 2+2=4823 и тд
					setSecondNumber((prev) => prev + symbol);
				}
			}
		}
		console.log(`---------------iC----------------`);
		console.log(`screenRef :`, screenRef);
		console.log(`firstNumber :`, firstNumber);
		console.log(`secondNumber :`, secondNumber);
		console.log(`operator :`, operator);
	};

	const operationStart = (funcToCalc) => {
		console.log(`---------------OS----------------`);
		console.log(`firstNumber :`, firstNumber);
		console.log(`secondNumber :`, secondNumber);
		console.log(`operator :`, operator);
		switch (funcToCalc) {
			case `plus`:
				setFirstNumber((prev) =>
					(parseInt(prev, 10) + parseInt(secondNumber, 10)).toString(),
				);
				break;
			case `minus`:
				setFirstNumber((prev) =>
					(parseInt(prev, 10) - parseInt(secondNumber, 10)).toString(),
				);
				break;
			case `equal`: //без этой строки, после = нельзя продолжить операцию -
				//secondNumber стерт, и его значение переходит к firstNumber
				break;
			default:
				setFirstNumber(secondNumber);
		}
	};

	return (
		<>
			<div className={styles.calcWindow}>
				<div id="screen" className={styles.calcScreenExpression} ref={screenRef}>
					{expression}
				</div>
				{buttonList.map(({ id, className, symbol, func }) => {
					return (
						<button
							key={id}
							className={styles[`${className}`]}
							onClick={() => inputCheck(symbol, func)}
						>
							{symbol}
						</button>
					);
				})}
			</div>
		</>
	);
};
