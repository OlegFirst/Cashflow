import { useEffect, useState } from 'react';

import DiceComponent from '../../../../../_commonComponents/Dice/Dice';

import './dice-block.scss';

const diceDataInitialState = () => {
	return Array(3).fill(0);
};

const DiceBlock = (props) => {
	const {
		isDisable,
		diceCount,
		diceValue
	} = props;
	
	const [diceData, setDiceData] = useState(diceDataInitialState);
	
	const rollHandler = (id, value) => {
		setDiceData(prevState => prevState.map((item, index) => index === id ? value : item ));
		
		props.onRoll(value);
	};
	
	const onRollHandler1 = value => {
		rollHandler(0, value);
	};
	
	const onRollHandler2 = value => {
		rollHandler(1, value);
	};
	
	const onRollHandler3 = value => {
		rollHandler(2, value);
	};
	
	useEffect(() => {
		if (diceValue === 0 || diceValue === null) {
			setDiceData(prevState => prevState.map(item => 0));
		}
	}, [diceValue]);
	
	return (
		<ul className='dice-block'>
			{diceCount > 0 && (
				<li
					className='dice-block__item'
					className={`dice-block__item ${diceData[0] > 0 ? 'dice-block__item_selected' : '' }`}
				>
					<DiceComponent 
						onRoll={onRollHandler1}
						isDisabled={diceData[0] > 0 || isDisable}
					/>
				</li>
			)}
			
			{diceCount > 1 && (
				<li
					className='dice-block__item'
					className={`dice-block__item ${diceData[1] > 0 ? 'dice-block__item_selected' : '' }`}
				>
					<DiceComponent 
						onRoll={onRollHandler2}
						isDisabled={diceData[1] > 0 || isDisable}
					/>
				</li>
			)}
			
			{diceCount > 2 && (
				<li
					className='dice-block__item'
					className={`dice-block__item ${diceData[2] > 0 ? 'dice-block__item_selected' : '' }`}
				>
					<DiceComponent 
						onRoll={onRollHandler3}
						isDisabled={diceData[2] > 0 || isDisable}
					/>
				</li>
			)}
		</ul>
	)
};

export default DiceBlock;