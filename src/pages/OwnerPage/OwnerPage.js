import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import OwnerGames from '../../components/OwnerGames/OwnerGames';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';
import Info from '../../_commonComponents/Info/Info';

import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { ownerGameClearStorage } from '../../storage/actions/actionCreatorsCommon';
import { networkStatuses } from '../../services/constants';
import { 
	executeRequestGet,
	ownerCreatedGamesResponseMapper
} from '../../services/utils';
import { getRemovedGamers } from '../../components/OwnerGames/utils';
import { 
	editedGameModes,
	gameProcessingModes
} from '../../components/OwnerGames/constants';
import './owner-page.scss';

const OwnerPage = () => {
	const [ownerGamesData, setOwnerGamesData] = useState([]);
	const [editedGameCardStatus, setEditedGameCardStatus] = useState({
		mode: null,
		gameId: null
	});
	const [infoMessage, setInfoMessage] = useState('');
	const isGameStarted = useRef(false);
	
	// Storage
	const dispatch = useDispatch();
	const user = useSelector(state => state.info.user);
	const networkStatus = useSelector(state => state.info.networkStatus);	
	
	const navigate = useNavigate();
	
	// Get created game list
	const getCreatedGames = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
			
		const request = {
			endPointURL: 'super-owner',
			query: 'info=get-games&user_id=' + user.id
		};
		
		executeRequestGet(request, ({ isSuccess, data }) => {
			if (isSuccess && data) {
				dispatch(setNetworkStatus(networkStatuses.SUCCESS));				
				const mappedData = ownerCreatedGamesResponseMapper(data);				
				setOwnerGamesData(mappedData);
				return;
			}
			
			if (!isSuccess) {
				dispatch(setNetworkStatus(networkStatuses.FAIL));
				setInfoMessage('Server error');
				return;
			}
			
			setInfoMessage('Користувач не розпізнаний');
		});
	};
	
	
	const onPending = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
	}
	
	const onSuccess = () => {
		dispatch(setNetworkStatus(networkStatuses.SUCCESS));
		setEditedGameCardStatus(prevState => ({
			...prevState,
			mode: null,
			gameId: null
		}));

		if (isGameStarted.current) {
			isGameStarted.current = false;
			navigate('/game-owner-page');
			return;
		}
			
		getCreatedGames();
	};
	
	const onFail = data => {
		dispatch(setNetworkStatus(networkStatuses.FAIL));		
		setInfoMessage('Server error');
		console.log(data);
		setEditedGameCardStatus(prevState => ({
			...prevState,
			mode: null,
			gameId: null
		}));
	};
	
	const executeRequestGetWrapper = (request, { onSuccess, onPending, onFail }) => {
		onPending();
		
		executeRequestGet(request, ({ isSuccess, data }) => {
			if (isSuccess && data) {
				onSuccess();
			}
			
			if (!isSuccess) {
				onFail(data);
			}
		});
	};
	
	// Create new game
	const onCreateNewInstanceHandler = () => {
		setEditedGameCardStatus(prevState => ({
			...prevState,
			mode: editedGameModes.CREATE,
			gameId: null
		}));
	};
	
	// Edit game
	const onEditHandler = gameId => {
		setEditedGameCardStatus(prevState => ({
			...prevState,
			mode: editedGameModes.EDIT,
			gameId: gameId
		}));
	};
	
	// Cancel creating or editing the game
	const onCancelHandler = () => {
		setEditedGameCardStatus(prevState => ({
			...prevState,
			mode: null,
			gameId: null
		}));
	};
	
	const callbacks = {
		onSuccess, onPending, onFail
	};
	
	// Submit creating or editing the game
	const onSubmitHandler = componentData => {		
		if (editedGameCardStatus.mode === editedGameModes.CREATE) {		
			const sendingData = {
				user_id: user.id,
				game: componentData.game,
				gamerList: componentData.gamerList
			};
			
			const request = {
				endPointURL: 'super-owner',
				query: 'info=create-new-game&data=' + JSON.stringify(sendingData)
			}
			
			executeRequestGetWrapper(request, callbacks);
		}
		
		if (editedGameCardStatus.mode === editedGameModes.EDIT) {
			const sendingData = {
				user_id: user.id,
				game: componentData.game,
				gamerList: componentData.gamerList,
				removedGamerList: getRemovedGamers(componentData, ownerGamesData)
			};
			
			const request = {
				endPointURL: 'super-owner',
				query: 'info=edit-game&data=' + JSON.stringify(sendingData)
			}
			
			executeRequestGetWrapper(request, callbacks);
		}
	};
	
	// Remove the game
	const onGameRemoveHandler = gameId => {
		ownerGameClearStorage(dispatch);
				
		const request = {
			endPointURL: 'super-owner',
			query: 'info=remove-game&game_id=' + gameId
		};
		
		executeRequestGetWrapper(request, callbacks);
	};
	
	// Game processing_(start)
	const gameProcessing = (gameId, mode) => {
		const sendingData = {
			game_id: gameId,
			user_id: user.id,
			mode
		};
		
		const request = {
			endPointURL: 'super-owner',
			query: 'info=processing-game&data=' + JSON.stringify(sendingData)
		};
		
		executeRequestGetWrapper(request, callbacks);
	};
	
	const onGameStart = gameId => {
		isGameStarted.current = true;
		gameProcessing(gameId, gameProcessingModes.START);
	};
	
	const onGameComplete = gameId => {
		gameProcessing(gameId, gameProcessingModes.COMPLETE);
	};
	
	const onGameCancel = gameId => {
		gameProcessing(gameId, gameProcessingModes.CANCEL);
	};
	// Game processing_(end)
	
	const onInfoClose = () => setInfoMessage('');
	
	useEffect(() => {
		getCreatedGames();
	}, []);
	
	return (
		<section className='owner-page'>
			<Header 
				{ ...user }
				onCreateNewInstance={onCreateNewInstanceHandler}
			/>
			
			<OwnerGames 
				gameList={ownerGamesData}
				status={editedGameCardStatus}
				onEdit={onEditHandler}
				onCancel={onCancelHandler}
				onGameRemove={onGameRemoveHandler}
				onSubmit={onSubmitHandler}
				
				onGameStart={onGameStart}
				onGameComplete={onGameComplete}
				onGameCancel={onGameCancel}
			/>
			
			<Info message={infoMessage} onClose={onInfoClose} />
			
			{networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
		</section>
	)
};

export default OwnerPage;