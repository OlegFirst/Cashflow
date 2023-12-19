import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { cardTypes } from '../../../../../common/constants';
import './game-info-actions.scss';

const GameInfoActions = (props) => {	
	return (
		<div className='game-info-actions'>
			<h5>Взяти:</h5>
			
			<ButtonGroup size='sm'>
				<Button
					className='me-1'
					variant='light'
					onClick={() => props.onReadAgreement(cardTypes.SMALL_AGREEMENT)}
				>
					Мала Угода
				</Button>
				
				<Button
					variant='light'
					onClick={() => props.onReadAgreement(cardTypes.BIG_AGREEMENT)}
				>
					Велика Угода
				</Button>
			</ButtonGroup>
		</div>
	)
};

export default GameInfoActions;