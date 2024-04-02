import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import OwnerGames from '../../components/OwnerGames/OwnerGames';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';
import Info from '../../_commonComponents/Info/Info';

import { setNetworkStatus, clearInfoStorage } from '../../storage/actions/actionCreatorsInfo';
import { ownerGameClearStorage, singOutClearStorage } from '../../storage/actions/actionCreatorsCommon';
import { networkStatuses } from '../../services/constants';
import { executeRequestGet, ownerCreatedGamesResponseMapper } from '../../services/utils';
import { getRemovedGamers } from '../../components/OwnerGames/utils';
import { editedGameModes, gameProcessingModes } from '../../components/OwnerGames/constants';
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
	const getCreatedGames = (cb) => {
		if (!user) {
			return;
		}
		
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
				cb?.(mappedData);
				return;
			}
			
			if (!isSuccess) {
				dispatch(setNetworkStatus(networkStatuses.FAIL));
				setInfoMessage('Server error');
				return;
			}
			
			setInfoMessage('Користувач не розпізнаний');
			return;
		});
	};
	
	useEffect(() => {
		getCreatedGames();
	}, []);
	
	console.log(1, user);
	
	// Page refereshing handler
	useEffect(() => {
		if (!user) {
			singOutClearStorage(dispatch)();		
			navigate('/');
		}
	}, [user]);
	
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
	
	// Create new Game Owner
	const onGameOwnerListHandler = () => {
		navigate('/game-owner-list-page');
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
	
	// Submit creating or editing the game_(start)	
	const createNewGame = componentData => {		
		getCreatedGames(createdGames => {
			if (createdGames.some(game => game.name === componentData.game.name)) {
				setInfoMessage('Ця назва гри присутня');
				return;
			}
			
			if (componentData.gamerList.length === 0) {
				setInfoMessage('Немає гравців');
				return;
			}
			
			if (componentData.gamerList.length <= 1) {
				setInfoMessage('Має бути принаймні двоє гравців');
				return;
			}
			
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
		});
	};
	
	const onSubmitHandler = componentData => {
		if (editedGameCardStatus.mode === editedGameModes.CREATE) {
			createNewGame(componentData);
			return;
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
	// Submit creating or editing the game_(end)
	
	// Remove the game
	const onGameRemove = gameId => {
		ownerGameClearStorage(dispatch)();
				
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
	
	return (
		<section className='owner-page'>
			<Header 
				{ ...user }
				onCreateNewInstance={onCreateNewInstanceHandler}
				onGameOwnerList={onGameOwnerListHandler}
			/>
			
			<OwnerGames 
				gameList={ownerGamesData}
				status={editedGameCardStatus}
				onEdit={onEditHandler}
				onCancel={onCancelHandler}
				onSubmit={onSubmitHandler}
				
				onGameStart={onGameStart}
				onGameComplete={onGameComplete}
				onGameCancel={onGameCancel}
				onGameRemove={onGameRemove}
			/>
			
			<Info message={infoMessage} onClose={onInfoClose} />
			
			{networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
		</section>
	)
};

export default OwnerPage;