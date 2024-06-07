import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import Board from '../../Board/Board';
import DreamCreator from '../DreamCreator/DreamCreator';
import ModalComponent from '../../../_commonComponents/Modal/Modal';
import MarketCard from '../../MarketCard/MarketCard';

import { setCommonEvents } from '../../../storage/actions/actionCreatorsUserModel';
import { 
	getPathItemCoordinates,
	setServerFishkaPosition,
	setFishkaPosition,
	useFishkaOptions,
	useCommonEventsWaitingData,
	setServerDream
} from '../utils';
import { pathTypes } from '../constants';

const GameBoard = (props) => {
	const {
		info,
		userModel,
		bigPathCard,
		gameRequestQueryGeneral,
		isGameInfoHide,
		isCreateConnection,
		callbacks,
		onInfoMessage
	} = props;
	
	const [isDreamCreatorShow, setIsDreamCreatorShow] = useState(false);
	
	const {
		isReturnToSmallPath, isBankrupt,
		onFishkaClickHandler, onPathHover, onPathClick, waitingDataUpdate
	} = useFishkaOptions(
		gameRequestQueryGeneral,
		userModel,
		isDreamCreatorShow,
		callbacks,
		onInfoMessage
	);
	
	const {
		markedCard,
		waitingCommonEventsUpdate, onMarkedCardClose
	} = useCommonEventsWaitingData();
	
	const [isPerspective, setIsPerspective] = useState(false);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const onDreamCreatorClick = data => {
		if (!data.bigPathId) {
			return;
		}
		
		setIsDreamCreatorShow(false);
		
		setServerDream({ ...gameRequestQueryGeneral, ...data }, {
			...callbacks,
			onSuccess: () => {
				callbacks.onSuccess();
			}
		});
	};
	
	const waitingDataUpdateHandler = (data, commonEvents) => {
		if (data) {
			waitingDataUpdate(data);
		}
		
		if (commonEvents) {
			waitingCommonEventsUpdate(commonEvents);
			dispatch(setCommonEvents(commonEvents));
		}
	};
	
	useEffect(() => {
		if (!bigPathCard.info.dream.bigPathId) {
			setIsDreamCreatorShow(true);
		}
	}, [bigPathCard.info.dream.bigPathId]);
	
	if (isReturnToSmallPath) {
		navigate('/return-small-path');
		return;
	}
	
	if (isBankrupt) {
		navigate('/bankrupt-page');
		return;
	}
	
	return (
		<section className='game-board'>
			<Header
				userModel={userModel}
				isGameInfoHide={isGameInfoHide}
				onGameInfoHide={props.onGameInfoHide}
				onGameInfoShow={props.onGameInfoShow}
				onPerspectiveClick={() => setIsPerspective(!isPerspective)}				
				onGetModel={props.onGetModel}
			/>
		
			<Board
				gameRequestQueryGeneral={gameRequestQueryGeneral}
				isCreateConnection={isCreateConnection}
				isPerspective={isPerspective}
				onClick={onPathClick}
				onFishkaClick={onFishkaClickHandler}
				waitingDataUpdate={waitingDataUpdateHandler}				
			/>
			
			{isDreamCreatorShow && (
				<DreamCreator
					{ ...bigPathCard.info.dream }
					onClick={onDreamCreatorClick}
				/>
			)}
			
			<ModalComponent
				title={'Ринок'}
				isCancelButtonHide={true}
				isSubmitButtonHide={true}
				isShow={markedCard.isShow}
				onClose={onMarkedCardClose}
			>
				<MarketCard id={markedCard.id} />
			</ModalComponent>
		</section>
	)
};

export default GameBoard;