import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import GameInfoActions from './GameInfoActions/GameInfoActions';
import DiceBlock from './DiceBlock/DiceBlock';

import { bankruptMoneyFlow } from '../../../../common/constants';
import { useTurnProgress } from '../../utils';

const GameInfoSuperActions = (props) => {
	const {
		info: {
			user
		},
		userModel: {
			info,
			board: {
				diceValue,
				diceCount,
				fishkaStepProcessValue
			},
			profession: {
				moneyFlow
			},
			commonEvents
		},
		gameRequestQueryGeneral,
		callbacks
	} = props;
	
	const navigate = useNavigate();
	
	const currentAgreementCardId = props.userModel.currentAgreementCard.id;
	
	const { 
		turnProgress, isSkipTurnSpinnerShow, isErrorStartTurn,
		onRollHandler, onSkipTurn, onEndTurn, onCheatButton
	} = useTurnProgress(
		gameRequestQueryGeneral, fishkaStepProcessValue, diceValue, callbacks,
		user.id, commonEvents
	);
	
	return (
		<>
			<div className='game-info-super-actions__start-turn'>
				{!turnProgress.startTurn && (
					<Alert className='text-center' variant='success'>Bаш хід</Alert>
				)}
				
				{isErrorStartTurn && (
					<Alert className='text-center' variant='danger'>Bаш хід. Карточка Угода не опрацьована</Alert>
				)}
				
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