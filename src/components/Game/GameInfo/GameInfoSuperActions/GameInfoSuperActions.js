import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import GameInfoActions from './GameInfoActions/GameInfoActions';
import DiceBlock from './DiceBlock/DiceBlock';

import { bankruptMoneyFlow } from '../../../../common/constants';
import { useTurnProgress } from '../../utils';

const GameInfoSuperActions = (props) => {
	const {
		userModel: {
			board: {
				diceValue,
				diceCount,
				fishkaStepProcessValue
			},
			profession: {
				moneyFlow
			}
		},
		gameRequestQueryGeneral,
		callbacks,
		onInfoMessage
	} = props;
	
	const navigate = useNavigate();
	
	const { 
		turnProgress, isSkipTurnSpinnerShow,
		onStartTurn, onRollHandler, onSkipTurn, onEndTurn, onCheatButton
	} = useTurnProgress(
		gameRequestQueryGeneral, fishkaStepProcessValue, diceValue, callbacks, onInfoMessage
	);
	
	const onStartTurnHandler = () => {
		const moneyFlowLength = moneyFlow.length;				
		onStartTurn();
	};
	
	return (
		<>
			<div className='game-info-super-actions__start-turn'>
				<Button
					variant='success'
					className='mt-4 me-4'
					size='sm'
					disabled={!turnProgress.startTurn}
					onClick={onStartTurnHandler}
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
				<GameInfoActions onReadAgreement={props.onReadAgreement} />
			</div>
		</>
	)
};

export default GameInfoSuperActions;