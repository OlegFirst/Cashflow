import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import GameInfoActions from './GameInfoActions/GameInfoActions';
import DiceBlock from './DiceBlock/DiceBlock';

import { useTurnProgress } from '../../utils';

const GameInfoSuperActions = (props) => {
	const {
		userModel: {
			board: {
				diceValue,
				diceCount,
				fishkaStepProcessValue
			}
		},
		gameRequestQueryGeneral,
		callbacks,
		onInfoMessage
	} = props;
	
	const { 
		turnProgress, isSkipTurnSpinnerShow,
		onStartTurn, onRollHandler, onSkipTurn, onEndTurn
	} = useTurnProgress(
		gameRequestQueryGeneral, fishkaStepProcessValue, diceValue, callbacks, onInfoMessage
	);
	
	return (
		<>
			<div className='game-info-super-actions__start-turn'>
				<Button
					variant='success'
					className='mt-4 me-4'
					size='sm'
					disabled={!turnProgress.startTurn}
					onClick={onStartTurn}
				>
					Почати хід
				</Button>
				
				<Button
					variant='danger'
					className='mt-4'
					size='sm'
					disabled={!turnProgress.skipTurn}
					onClick={onSkipTurn}
				>
				{isSkipTurnSpinnerShow && (
					<Spinner
						className='me-2'
						as='span'
						size='sm'
						role='status'
						aria-hidden='true'
					/>
				)}					
					Пропустити хід
				</Button>
			</div>
			
			<button onClick={() => onRollHandler(4)}>M</button>
			
			<DiceBlock
				isDisable={!turnProgress.dice}
				diceCount={diceCount}
				diceValue={diceValue}
				onRoll={onRollHandler}
			/>
			
			<Button
				variant='primary'
				className='mt-2'
				onClick={props.onCalculationCardsShow}
			>
				Pозрахункові картки
			</Button>
			
			<div className='game-info__gamer-action-wrapper mt-4'>
				<GameInfoActions
					gameRequestQueryGeneral={gameRequestQueryGeneral}
					callbacks={callbacks}
					onReadAgreement={props.onReadAgreement}
				/>
			</div>
		</>
	)
};

export default GameInfoSuperActions;