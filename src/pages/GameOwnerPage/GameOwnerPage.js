import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import GameOwner from '../../components/GameOwner/GameOwner';
import Info from '../../_commonComponents/Info/Info';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';
import Board from '../../components/Board/Board';

import {
	setNetworkStatus,
	setOwnerData
} from '../../storage/actions/actionCreatorsInfo';
import { 
	setSmallPathStyled,
	setBigPathStyled
} from '../../storage/actions/actionCreatorsUserModel';
import { networkStatuses } from '../../services/constants';
import { 
	createSmallPathItemList,
	createBigPathItemList
} from '../../components/Board/utils';
import { 
	gameOwnerPreparation,
	gameOwnerPreparationMapper
} from '../../components/GameOwner/utils';
import './index.scss';

const GameOwnerPage = () => {
	const [infoMessage, setInfoMessage] = useState({
		isSuccess: false,
		message: ''
	});
	const [isGameOwnerHide, setIsGameOwnerHide] = useState(false);
	const [isPerspective, setIsPerspective] = useState(false);
	
	const [isOk, setIsOk] = useState(false);
	// console.log('isCreateConnection= ',isOk)
	
	// Storage
	const dispatch = useDispatch();
	const info = useSelector(state => state.info);
	const userModel = useSelector(state => state.userModel);
	
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
	
	const onInfoClose = () => {
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess: false,
			message: ''
		}));
	};
	
	const onInfoMessageHandler = (message, isSuccess = false) => {		
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess,
			message
		}));
	};
	
	useEffect(() => {		
		if (!info.user?.id) {
			navigate('/');
			return;
		}
		
		gameOwnerPreparation({ userId: info.user.id, userRoleId: info.user.userRoleId }, { 
			...callbacks,
			onSuccess: data => {				
				const mappedResponse = gameOwnerPreparationMapper(data);
				
				dispatch(setOwnerData(mappedResponse));
				dispatch(setSmallPathStyled(createSmallPathItemList()));
				dispatch(setBigPathStyled(createBigPathItemList()));
				onSuccess();
			}
		});
	}, []);
	
	if (!info.ownerData) {
		return null;
	}
	
	const gameRequestQueryGeneral = {
		userId: info.user.id,
		userRoleId: info.user.userRoleId,
		gameId: info.ownerData.gameId
	};
	
	return (
		<section className='game-owner-page'>
			<main className='game-owner-page__main main'>
				<Header
					user={info.user}
					game={info.ownerData}
					isGameOwnerHide={isGameOwnerHide}
					onHide={() => setIsGameOwnerHide(true)}
					onShow={() => setIsGameOwnerHide(false)}
					onPerspectiveClick={() => setIsPerspective(!isPerspective)}
					
					onClick={() => setIsOk(!isOk)}
				/>
			
				<div className={`main__content ${isGameOwnerHide ? 'main__content_hide' : ''}`}>
					<GameOwner
						info={info}
						userModel={userModel}
						gameRequestQueryGeneral={gameRequestQueryGeneral}
						callbacks={callbacks}
						onInfoMessage={onInfoMessageHandler}
					/>
				</div>
			</main>
			
			<div className='game-owner-page__board'>
				<Board
					gameRequestQueryGeneral={gameRequestQueryGeneral}
					isCreateConnection={true}
					isPerspective={isPerspective}
					
					isOk={isOk}
				/>
			</div>
			
			<Info isSuccess={infoMessage.isSuccess} message={infoMessage.message} onClose={onInfoClose} />
		
			{info.networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
		</section>
	)
};

export default GameOwnerPage;