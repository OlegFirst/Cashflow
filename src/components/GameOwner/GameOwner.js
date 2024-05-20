import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

import GamerCards from './GamerCards/GamerCards';
import OwnerActions from './OwnerActions/OwnerActions';
import GameOwnerAgreementGard from './GameOwnerAgreementGard/GameOwnerAgreementCard';
import GameOwnerMarketCard from './GameOwnerMarketCard/GameOwnerMarketCard';
import GameOwnerMoneyInTheWindCard from './GameOwnerMWCard/GameOwnerMWCard';
import ConfirmModal from '../../_commonComponents/ConfirmModal/ConfirmModal';
import CalculationCardsSmallPath from '../CalculationCards/CalculationCardsSmallPath/CalculationCardsSmallPath';
import CalculationCardsBigPath from '../CalculationCards/CalculationCardsBigPath/CalculationCardsBigPath';

import { 
	createResponseCompleteMessage,
	checkCommonSmallAgreement
} from '../../common/utils';
import {
	confirmModalTypes,
	pathTypes,
	pathTypeStartCoordinates
} from '../../common/constants';
import { gamePagePreparationMapper } from '../../services/utils';
import { gamePagePreparation } from '../../components/Game/utils';
import { 
	setGamerTurnData,
	setGamerTurnPath
} from '../../storage/actions/actionCreatorsInfo';
import { 
	setCurrentAgreementCardIdType,
	setUserModel
} from '../../storage/actions/actionCreatorsUserModel';
import { setDream, setProfession } from '../../storage/actions/actionCreatorsBigPathCard';
import {
	sendAgreementToGamer,
	sendedAgreementToGamerMapper,
	removeAgreement,
	makeNextTurn,
	getMarket,
	getMoneyInTheWind,
	getMarketMapper,
	checkMakeNextTurn,
	moveGamerToPath,
	makeNextTurnMapper,
	setCharityTurnsLeft,
	checkMakeNextTurnMapper,
	getMoneyInTheWindMapper,
	sendCommonAgreementToGamer,
	setGamerBankrupt,
	gamerWaitingDataProps
} from './utils';
import './game-owner.scss';

const calculationCardsDataInitialState = {
	isSmallPath: null,
	isShow: false
};

const GameOwner = (props) => {
	const {
		info,
		userModel,
		gameRequestQueryGeneral,
		callbacks,
		onInfoMessage,
		waitingData
	} = props;
	
	const [isAgreementCardShow, setIsAgreementCardShow] = useState(false);
	const [marketCardData, setMarketCardData] = useState({
		id: 0,
		isShow: false
	});
	const [moneyInWindCardData, setMoneyInWindCardData] = useState({
		id: 0,
		isShow: false
	});
	const [charityActivatedTurnsLeft, setCharityActivatedTurnsLeft] = useState(null);
	const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
	const [isBankuptConfirmModalShow, setIsBankuptConfirmModalShow] = useState(false);
	const [isReturnToSmallPathConfirmModalShow, setIsReturnToSmallPathConfirmModalShow] = useState(false);
	const [calculationCardsData, setCalculationCardsData] = useState(calculationCardsDataInitialState);
	
	// Storage
	const dispatch = useDispatch();
	
	const sendCommonAgreement = cardId => {		
		sendCommonAgreementToGamer({
			...gameRequestQueryGeneral, gamerIdTurn: info.ownerData.gamerTurnData.gamerIdTurn, cardId
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
			}
		});
	};
	
	const onSendAgreementToGamerHandler = cardType => {
		sendAgreementToGamer({
			...gameRequestQueryGeneral, gamerIdTurn: info.ownerData.gamerTurnData.gamerIdTurn, type: cardType 
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				// Check if the Agreement has been already sent		
				if (data.hasOwnProperty('is_complete')) {
					if (Number(data.is_complete) === 0) {
						onInfoMessage(data.complete_message, true);
					} else {
						onInfoMessage('Wrong is_complete data');
					}					
					return;
				}
				
				const mappedResponse = sendedAgreementToGamerMapper(data);
				dispatch(setCurrentAgreementCardIdType(mappedResponse));
				
				setIsAgreementCardShow(true);
				
				if (checkCommonSmallAgreement(mappedResponse)) {
					sendCommonAgreement(mappedResponse.cardId);
				}
			}
		});
	};
	
	const onRemoveAgreementHandler = () => {
		removeAgreement({
			...gameRequestQueryGeneral, gamerIdTurn: info.ownerData.gamerTurnData.gamerIdTurn 
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const { message, isSuccess } = createResponseCompleteMessage(data);
				onInfoMessage(message, isSuccess);
			}
		});
	};
	
	const onGetMarketHandler = () => {		
		getMarket({
			...gameRequestQueryGeneral
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const id = getMarketMapper(data);	
				
				setMarketCardData(prevState => ({
					...prevState,
					id,
					isShow: true
				}));
			}
		});
	};
	
	const onGetMoneyInTheWindHandler = () => {		
		getMoneyInTheWind({
			...gameRequestQueryGeneral
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const id = getMoneyInTheWindMapper(data);
				
				setMoneyInWindCardData(prevState => ({
					...prevState,
					id,
					isShow: true
				}));
			}
		});
	};
	
	const onMarketClose = () => {
		setMarketCardData(prevState => ({
			...prevState,
			id: 0,
			isShow: false
		}));
	};
	
	const onMoneyInWindCardClose = () => {
		setMoneyInWindCardData(prevState => ({
			...prevState,
			id: 0,
			isShow: false
		}));
	};
	
	const onCharityHandler = () => {
		const isCurrentGamerOnSmallPath = info.ownerData.gamerTurnData.isSmallPath;
		
		const charityTurnsLeft = isCurrentGamerOnSmallPath ? 4 : 1;
		
		setCharityTurnsLeft({
			...gameRequestQueryGeneral, gamerIdTurn: info.ownerData.gamerTurnData.gamerIdTurn, charityTurnsLeft
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const { message, isSuccess } = createResponseCompleteMessage(data);
				onInfoMessage(message, isSuccess);
				
				setCharityActivatedTurnsLeft(charityTurnsLeft === 4 ? 3 : 'infinity');
			}
		});
	};
	
	// Next turn_(start)
	const nextTurnProceed = () => {		
		if (charityActivatedTurnsLeft) {
			setCharityActivatedTurnsLeft(null);
		}
		
		makeNextTurn({ ...gameRequestQueryGeneral }, {
			...callbacks,
			onSuccess: data => {				
				callbacks.onSuccess();				
				dispatch(setGamerTurnData(makeNextTurnMapper(data)));
			}
		});
	};
	
	const onNextTurn = () => {
		checkMakeNextTurn({ ...gameRequestQueryGeneral }, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const isGamerEndTurn = checkMakeNextTurnMapper(data);
				
				if (isGamerEndTurn) {
					nextTurnProceed();
					return;
				}
				
				setIsConfirmModalShow(true);
			}
		});
	};
	
	const onConfirmModalSubmit = () => {
		setIsConfirmModalShow(false);
		
		nextTurnProceed();
	};
	
	const onConfirmModalCancel = () => {
		setIsConfirmModalShow(false);
	};
	// Next turn_(end)
	
	// onMoveGamerToPathHandler_(start)
	const moveGamerToPathProceed = ({ willGamerMovedToSmallPath }) => {
		moveGamerToPath({ 
			...gameRequestQueryGeneral,
			gamerIdTurn: info.ownerData.gamerTurnData.gamerIdTurn,
			isSmallPath: willGamerMovedToSmallPath ? '1' : '0',
			coordinates: willGamerMovedToSmallPath ? pathTypeStartCoordinates.SMALL_PATH : pathTypeStartCoordinates.BIG_PATH
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const { message, isSuccess } = createResponseCompleteMessage(data);
				onInfoMessage(message, isSuccess);
				
				if (isSuccess) {
					setCharityActivatedTurnsLeft(null);					
					dispatch(setGamerTurnPath(willGamerMovedToSmallPath));
				}
			}
		});
	};
	
	const onMoveGamerToPathHandler = type => {		
		const isGamerOnSmallPath = info.ownerData.gamerTurnData.isSmallPath;
		const willGamerMovedToSmallPath = type === pathTypes.SMALL_PATH;
		
		// - Move from Big path to Small path
		if (!isGamerOnSmallPath && willGamerMovedToSmallPath) {
			setIsReturnToSmallPathConfirmModalShow(true);
			return;
		}
		
		// - Move from Small path to Big path
		if (isGamerOnSmallPath && !willGamerMovedToSmallPath) {
			moveGamerToPathProceed({ willGamerMovedToSmallPath: false });
			return;
		}
		
		onInfoMessage('Гравця вже перемістили на це коло', false);
	};
	
	const onReturnToSmallPathConfirmModalSubmit = () => {
		setIsReturnToSmallPathConfirmModalShow(false);
		
		moveGamerToPathProceed({ willGamerMovedToSmallPath: true });
	};
	
	const onReturnToSmallPathConfirmModalCancel = () => {
		setIsReturnToSmallPathConfirmModalShow(false);
	};
	// onMoveGamerToPathHandler_(end)
	
	// Bankrupt_(start)
	const onBankruptHandler = () => {
		setIsBankuptConfirmModalShow(true);
	};
	
	const onBankuptConfirmModalSubmit = () => {
		setIsBankuptConfirmModalShow(false);
		
		setGamerBankrupt({ 
			...gameRequestQueryGeneral,
			gamerIdTurn: info.ownerData.gamerTurnData.gamerIdTurn
			}, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				const { message, isSuccess } = createResponseCompleteMessage(data);
				onInfoMessage(message, isSuccess);
			}
		});
	};
	
	const onBankuptConfirmModalCancel = () => {
		setIsBankuptConfirmModalShow(false);
	};
	// Bankrupt_(end)
	
	const onShowCalculationCards = userId => {		
		gamePagePreparation({ userId, userRoleId: 3 }, { 
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				const { info, profession, bigPathCard } = gamePagePreparationMapper(data);
				
				dispatch(setUserModel({ info, profession }));
				
				const { selectedDream, buyedDreams, buyedBusiness, buyedCash } = bigPathCard;
				dispatch(setDream(selectedDream));
				dispatch(setProfession({ buyedDreams, buyedBusiness, buyedCash }));
				
				setCalculationCardsData({
					isSmallPath: info.isSmallPath,
					isShow: true
				});
			}
		});
	};
	
	if (waitingData.fishkaPositions.length === 0) {
		return (
			<div className='gamer-cards'>Завантаження...</div>
		)
	}
	
	const gamerId = info.ownerData.gamerTurnData.gamerIdTurn;
	
	return (
		<div className='game-owner'>
			<div className='game-owner__gamer-cards-wrapper'>
				<GamerCards 
					{ ...info.ownerData }
					waitingData={waitingData}
					onCalculationCards={onShowCalculationCards}
				/>
			</div>
			
			<div className='game-owner__actions-wrapper mt-4'>
				<OwnerActions
					gamerWaitingData={gamerWaitingDataProps(gamerId, waitingData)}
					onSendAgreementToGamer={onSendAgreementToGamerHandler}
					onRemoveAgreement={onRemoveAgreementHandler}
					onMarketClick={onGetMarketHandler}
					onGetMoneyInTheWind={onGetMoneyInTheWindHandler}
					onCharity={onCharityHandler}
					onMoveGamerToPath={onMoveGamerToPathHandler}
					onBankrupt={onBankruptHandler}
				/>
			</div>
			
			{isAgreementCardShow && (
				<GameOwnerAgreementGard
					currentAgreementCard={userModel.currentAgreementCard}
					onClose={() => setIsAgreementCardShow(false)}
				/>
			)}
			
			{marketCardData.isShow && (
				<GameOwnerMarketCard
					id={marketCardData.id}
					onClose={onMarketClose}
				/>
			)}
			
			{moneyInWindCardData.isShow && (
				<GameOwnerMoneyInTheWindCard
					id={moneyInWindCardData.id}
					onClose={onMoneyInWindCardClose}
				/>
			)}
			
			<div className='game-owner__control-panel mt-4'>
				<Button
					variant='primary'
					className='mt-1'
					onClick={onNextTurn}
				>
					Наступний  хід
				</Button>
			</div>
			
			<ConfirmModal
				title={'Некоректна поведінка'}
				message={'Гравець не завершив свій хід! Усе одно зробити наступний хід?'}
				type={confirmModalTypes.DANGER}
				isShow={isConfirmModalShow}
				onSubmit={onConfirmModalSubmit}
				onClose={onConfirmModalCancel}
			/>
			
			<ConfirmModal
				title={''}
				message={'Це призведе до банкрутства гравця! Усе одно продовжити?'}
				type={confirmModalTypes.DANGER}
				isShow={isBankuptConfirmModalShow}
				onSubmit={onBankuptConfirmModalSubmit}
				onClose={onBankuptConfirmModalCancel}
			/>
			
			<ConfirmModal
				title={''}
				message={'Усі дані гравця, крім готівки, буде видалено! Усе одно продовжити?'}
				type={confirmModalTypes.DANGER}
				isShow={isReturnToSmallPathConfirmModalShow}
				onSubmit={onReturnToSmallPathConfirmModalSubmit}
				onClose={onReturnToSmallPathConfirmModalCancel}
			/>
			
			{calculationCardsData.isShow && calculationCardsData.isSmallPath && (
				<CalculationCardsSmallPath 
					onCalculationCardsHide={() => setCalculationCardsData(calculationCardsDataInitialState)}
				/>
			)}
			
			{calculationCardsData.isShow && !calculationCardsData.isSmallPath && (
				<CalculationCardsBigPath
					onCalculationCardsHide={() => setCalculationCardsData(calculationCardsDataInitialState)}
				/>
			)}
		</div>
	)
};

export default GameOwner;