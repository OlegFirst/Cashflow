import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GameBoard from '../../components/Game/GameBoard/GameBoard';
import GameInfo from '../../components/Game/GameInfo/GameInfo';
import Info from '../../_commonComponents/Info/Info';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';

import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { 
	setDream,
	setProfession
} from '../../storage/actions/actionCreatorsBigPathCard';
import { 
	setUserModel,
	setSmallPathStyled,
	setBigPathStyled
} from '../../storage/actions/actionCreatorsUserModel';
import { fishkaStepProcess } from '../../components/Game/constants';
import { networkStatuses } from '../../services/constants';
import { 
	gamePagePreparationMapper,
	getDreamMapper
} from '../../services/utils';
import { 
	createSmallPathItemList,
	createBigPathItemList
} from '../../components/Board/utils';
import { 
	gamePagePreparation,
	getServerDream
} from '../../components/Game/utils';
import './game-page.scss';

const GamePage = () => {
	const [infoMessage, setInfoMessage] = useState({
		isSuccess: false,
		message: ''
	});
	const [isGameInfoHide, setIsGameInfoHide] = useState(false);
	const [isCreateConnection, setIsCreateConnection] = useState(false);
	
	// Storage
	const dispatch = useDispatch();
	const info = useSelector(state => state.info);
	const userModel = useSelector(state => state.userModel);
	const bigPathCard = useSelector(state => state.bigPathCard);
	
	const { networkStatus } = info;
	
	const navigate = useNavigate();
	
	const onPending = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
	};
	
	const onSuccess = () => {
		dispatch(setNetworkStatus(networkStatuses.SUCCESS));
	};
		
	const onFail = data => {
		dispatch(setNetworkStatus(networkStatuses.FAIL));
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess: false,
			message: 'Server error'
		}));
		console.log(data);
	};
	
	const callbacks = {
		onSuccess, onPending, onFail
	};
	
	const getUserModel = () => {		
		gamePagePreparation({ userId: info.user.id, userRoleId: info.user.userRoleId }, { 
			...callbacks,
			onSuccess: data => {				
				const { info, profession, bigPathCard } = gamePagePreparationMapper(data);
				
				dispatch(setUserModel({ info, profession }));
				dispatch(setProfession(bigPathCard));
				onSuccess();
			}
		});
	};
	
	useEffect(() => {
		if (!info.user) {
			navigate('/');
			return;
		}
		
		getUserModel();		
		dispatch(setSmallPathStyled(createSmallPathItemList()));
		dispatch(setBigPathStyled(createBigPathItemList()));
		
		getServerDream({ userId: info.user.id, userRoleId: info.user.userRoleId }, { 
			...callbacks,
			onSuccess: data => {				
				dispatch(setDream(getDreamMapper(data)));
				onSuccess();
			}
		});
	}, []);
	
	if (!info.user || !info.game.gameId || !userModel.profession) {
		return <SpinnerComponent />;
	}
	
	const gameRequestQueryGeneral = {
		userId: info.user.id,
		userRoleId: info.user.userRoleId,
		gameId: info.game.gameId
	};
	
	const onInfoMessageHandler = (message, isSuccess = false) => {
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess,
			message
		}));
	};
	
	const onInfoClose = () => {
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess: false,
			message: ''
		}));
	};
	
	const createConnectionHandler = (isCalculationCardsShow) => {
		if (isCalculationCardsShow) {
			setIsCreateConnection(false);
			return;
		}
		
		setIsCreateConnection(userModel.board.fishkaStepProcessValue === fishkaStepProcess.NOT_READY);
	};
	
	return (
		<section className='game-page'>
			<main className='game-page__main'>
				<div className={`game-page__board-wrapper ${isGameInfoHide ? 'game-page__board-wrapper_wide' : ''}`}>
					<GameBoard
						info={info}
						userModel={userModel}
						bigPathCard={bigPathCard}
						gameRequestQueryGeneral={gameRequestQueryGeneral}
						isGameInfoHide={isGameInfoHide}
						onGameInfoHide={() => setIsGameInfoHide(true)}
						onGameInfoShow={() => setIsGameInfoHide(false)}
						isCreateConnection={isCreateConnection}
						callbacks={callbacks}
						onInfoMessage={onInfoMessageHandler}						
						onGetModel={() => getUserModel()}
					/>
				</div>
				
				<div className={`game-page__info-wrapper ${isGameInfoHide ? 'game-page__info-wrapper_hide' : ''}`}>
					<GameInfo 
						info={info}
						userModel={userModel}
						gameRequestQueryGeneral={gameRequestQueryGeneral}
						callbacks={callbacks}
						onInfoMessage={onInfoMessageHandler}
						getUserModel={getUserModel}
						createConnection={createConnectionHandler}
					/>
				</div>
			</main>
			
			<Info isSuccess={infoMessage.isSuccess} message={infoMessage.message} onClose={onInfoClose} />
		
			{networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
		</section>
	)
};

export default GamePage;