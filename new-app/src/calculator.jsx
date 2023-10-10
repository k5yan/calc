import { useState } from 'react';
import styles from './calculator.module.css';

const calculations = [`+`, `-`, `C`, `=`];

const buttonList = [
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
		id: 'close',
		className: 'calcButtonSymbol',
		symbol: 'C',
		func: `default`,
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

let numberIds = [0, 0];
let expressionResult = 0;
let operationNumber = 0;
let lastParameter = `default`;
export const CalcMaker = () => {
	const [expression, setExpression] = useState(``);

	const checkAndWrite = (symbol) => {
		if (
			!calculations.includes(symbol) ||
			(!(expression[expression.length - 1] === symbol) &&
				!calculations.includes(expression[expression.length - 1]))
		) {
			setExpression(expression + symbol);
		} else {
			setExpression(expression.replace(expression[expression.length - 1], symbol));
		}
	};

	const resultCalc = (parameter) => {
		switch (parameter) {
			case `plus`:
				numberIds[0] = numberIds[1];
				numberIds[1] = expression.length;
				operationNumber = parseInt(
					expression.substring(numberIds[0], numberIds[1]),
				);
				expressionResult += operationNumber;
				console.log(expressionResult);
				console.log(numberIds);
				break;
			case `minus`:
				numberIds[0] = numberIds[1];
				numberIds[1] = expression.length;
				operationNumber = parseInt(
					expression.substring(numberIds[0], numberIds[1]),
				);
				expressionResult -= operationNumber;
				console.log(expressionResult);
				console.log(numberIds);
				break;
			case `equal`:
				resultCalc(lastParameter);
				setExpression(expression + expressionResult);
				break;
			default:
				console.log(`number`);
		}
	};

	async function setСalculations(symbol, parameter) {
		await checkAndWrite(symbol);
		if (parameter === `plus` || parameter === `minus`) {
			lastParameter = parameter;
		}
		operationNumber = parseInt(expression.substring(numberIds[0], numberIds[1]));
		//resultCalc(parameter);
	}

	return (
		<>
			<div className={styles.calcWindow}>
				<div className={styles.calcScreenExpression}>{expression}</div>
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
