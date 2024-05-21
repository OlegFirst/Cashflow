import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import Board from '../../Board/Board';
import DreamCreator from '../DreamCreator/DreamCreator';
import ModalComponent from '../../../_commonComponents/Modal/Modal';
import MarketCard from '../../MarketCard/MarketCard';

import { 
	getPathItemCoordinates,
	setServerFishkaPosition,
	setFishkaPosition,
	useFishkaOptions,
	setServerDream
} from '../utils';
import { 
	pathTypes,
	fishkaStepProcess
} from '../constants';

const GameBoard = (props) => {
	const {
		info,
		userModel,
		bigPathCard,
		gameRequestQueryGeneral,
		isGameInfoHide,
		callbacks,
		onInfoMessage
	} = props;
	
	const [isDreamCreatorShow, setIsDreamCreatorShow] = useState(false);
	const { 
		isReturnToSmallPath, isBankrupt, markedCard, onFishkaClickHandler, onPathHover, onPathClick, waitingDataUpdateHandler, onMarkedCardClose
	} = useFishkaOptions(
		gameRequestQueryGeneral, userModel, isDreamCreatorShow, callbacks, onInfoMessage
	);
	const [isPerspective, setIsPerspective] = useState(false);
	
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
				isCreateConnection={userModel.board.fishkaStepProcessValue === fishkaStepProcess.NOT_READY}
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