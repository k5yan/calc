import { buttonList } from './calculator';
import styles from './calculator.module.css';

export const InterfaceMaker = () => {
	return (
		<>
			<div className={styles.calcWindow}>
				{buttonList.map(({ id, className, symbol }) => {
					return (
						<div key={id} className={styles[`${className}`]}>
							{symbol}
						</div>
					);
				})}
			</div>
		</>
	);
};
