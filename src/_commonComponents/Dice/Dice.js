import Dice from 'react-dice-roll';

import './dice.scss'

const DiceComponent = props => {
	const { isDisabled } = props;
	
	return (
		<div className='dice-component'>
			<div className='dice-component__inner'>
				<Dice 
					defaultValue={1}
					cheatValue={1}
					onRoll={props.onRoll}
					disabled={isDisabled}
				/>
			</div>
		</div>
	)
};

export default DiceComponent;