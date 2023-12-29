import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Header from './Header/Header';
import GameInfoSuperActions from './GameInfoSuperActions/GameInfoSuperActions';
import TableInfo from '../../CalculationCards/TableInfo/TableInfo';
import GameInfoAgreementCardActions from './GameInfoAgreementCardActions/GameInfoAgreementCardActions';
import CalculationCardsSmallPath 
	from '../../CalculationCards/CalculationCardsSmallPath/CalculationCardsSmallPath';
import CalculationCardsBigPath
	from '../../CalculationCards/CalculationCardsBigPath/CalculationCardsBigPath';

import { checkCommonSmallAgreement } from '../../../common/utils';
import { getAgreementMapper } from '../../../services/utils';
import { 
	setCurrentAgreementCardIdType,
	setCurrentAgreementCardIsPresent,
	clearCurrentAgreementCard
} from '../../../storage/actions/actionCreatorsUserModel';
import {
	getAgreement,
	parseAgreement,
	removeAgreement,
	sellAgreement,
	buyAgreement
} from '../utils';
import { 
	agreementCardDataInitialState,
	currentCardGamerTypes
} from '../constants';
import './game-info.scss';

const GameInfo = (props) => {
	const {
		info: {
			user
		},
		userModel,
		gameRequestQueryGeneral,
		callbacks,
		onInfoMessage
	} = props;
	
	const [isAgreementCardShow, setIsAgreementCardShow] = useState(false);
	const [isCalculationCardsShow, setIsCalculationCardsShow] = useState(false);

	const dispatch = useDispatch();
	
	// Agreement_(start)
	const agreementCardRemove = agreementCardRemove => {
		// - Clear and remove agreement. Remove if the agreement card wasn`t sold
		removeAgreement({ ...gameRequestQueryGeneral, id: userModel.currentAgreementCard.id }, {
			...callbacks,
			onSuccess: data => {
				if (agreementCardRemove) {
					dispatch(clearCurrentAgreementCard());
				}
				
				callbacks.onSuccess();
			}
		});
	};
	
	const onReadAgreementHandler = type => {
		if (userModel.currentAgreementCard.isPresent) {
			onInfoMessage('Картка придбана', true);
			return;
		}
		
		getAgreement({ ...gameRequestQueryGeneral, type }, {
			...callbacks,
			onSuccess: data => {				
				callbacks.onSuccess();
				
				const parsedData = parseAgreement(getAgreementMapper(data), gameRequestQueryGeneral.userId, type);
				
				if (checkCommonSmallAgreement(parsedData)) {
					return;
				}
				
				dispatch(setCurrentAgreementCardIdType(parsedData));
				setIsAgreementCardShow(true);
			}
		});
	};
	
	const onAgreementCardGetHandler = () => {		
		dispatch(setCurrentAgreementCardIsPresent(true));
		agreementCardRemove(false);
		setIsAgreementCardShow(false);
	};
	
	const onAgreementCardCancelHandler = () => {
		if (userModel.currentAgreementCard.gamerType === currentCardGamerTypes.GAMER_ID_TURN) {
			onAgreementCardRemoveHandler();
			return;
		}
		
		setIsAgreementCardShow(false);
	};
	
	const onAgreementCardRemoveHandler = () => {		
		setIsAgreementCardShow(false);
		agreementCardRemove(true);
	};
	
	const onAgreementCardSellHandler = gamerIdRedirect => {
		sellAgreement({
			...gameRequestQueryGeneral, id: userModel.currentAgreementCard.id, gamerIdRedirect 
			}, { 
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				setIsAgreementCardShow(false);
				onInfoMessage(data.complete_message, true);
				
				dispatch(clearCurrentAgreementCard());
			}
		});
	};
	
	const onAgreementCardBuyHandler = () => {
		buyAgreement({ ...gameRequestQueryGeneral, id: userModel.currentAgreementCard.id }, { 
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				if (data.is_complete) {
					onInfoMessage(data.complete_message, true);
					onAgreementCardGetHandler();
					return;
				}
				
				onInfoMessage(data.complete_message);
			}
		});
	};
	
	const onAgreementCardClearHandler = () => {
		dispatch(clearCurrentAgreementCard());
	};
	// Agreement_(end)
	
	return (
		<section className='game-info'>
			<Header
				name={user.name}
				professionName={userModel.profession.info.professionName}
			/>
			
			<div className='game-info__inner'>
				<GameInfoSuperActions
					{ ...props }
					onReadAgreement={onReadAgreementHandler}
					onCalculationCardsShow={() => setIsCalculationCardsShow(true)}
				/>
				
				<TableInfo userModel={props?.userModel} />
			</div>
			
			{isAgreementCardShow && (
				<GameInfoAgreementCardActions
					currentAgreementCard={userModel.currentAgreementCard}
					gameRequestQueryGeneral={gameRequestQueryGeneral}
					callbacks={callbacks}
					onGet={onAgreementCardGetHandler}
					onCancel={onAgreementCardCancelHandler}
					onRemove={onAgreementCardRemoveHandler}
					onClose={() => setIsAgreementCardShow(false)}
					onSell={onAgreementCardSellHandler}
					onBuy={onAgreementCardBuyHandler}
				/>
			)}
			
			{isCalculationCardsShow && userModel.info.isSmallPath && (
				<CalculationCardsSmallPath
					onCalculationCardsHide={() => setIsCalculationCardsShow(false)}
					getUserModel={props.getUserModel}
					onAgreementCardRemove={onAgreementCardClearHandler}
				/>
			)}
			
			{isCalculationCardsShow && !userModel.info.isSmallPath && (
				<CalculationCardsBigPath
					onCalculationCardsHide={() => setIsCalculationCardsShow(false)}
					getUserModel={props.getUserModel}
					onAgreementCardRemove={onAgreementCardClearHandler}
				/>
			)}
		</section>
	)
};

export default GameInfo;