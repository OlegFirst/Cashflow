import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { executeRequestGetWrapper } from '../../services/utils';
import { 
	pathTypeStartCoordinates,
	pathOptions
} from '../../common/constants';
import { 
	setDiceValue,
	setDiceCount,
	setFishkaStepProcessValue,
	setFishkaPosition,
	setFishka
} from '../../storage/actions/actionCreatorsUserModel';
import { setDream } from '../../storage/actions/actionCreatorsBigPathCard';
import {
	currentCardGamerTypes,
	pathOptions1, // To DO: change to pathOptions
	fishkaStepProcess,
	useFishkaActionInitialState,
	useTurnProgressInitialState
} from './constants';

export const gamePagePreparation = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=game-preparation&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const gameStartTurn = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=gamer-start-turn&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const gameEndTurn = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=gamer-end-turn&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const getAgreement = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=gamer-get-agreement&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const removeAgreement = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=gamer-remove-agreement&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const sellAgreement = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=gamer-sell-agreement&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const buyAgreement = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=gamer-buy-agreement&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const setServerFishkaPosition = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=set-fishka-position&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const getServerDream = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=get-dream&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const setServerDream = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=set-dream&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const getFishkaCoordinates = (pathId, userModel) => {
	const { 
		board: { 
			smallPathStyled,
			bigPathStyled
		}, 
		info: {
			isSmallPath 
		}
	} = userModel;
	
	// If gamer starts path big or small
	if (pathId === 0) {
		if (isSmallPath) {
			return pathTypeStartCoordinates.SMALL_PATH;
		}
		
		return pathTypeStartCoordinates.BIG_PATH;
	}
	
	const path = isSmallPath ? smallPathStyled : bigPathStyled;
	
	const pathItem = path.find(item => item.id === pathId);
	
	return { left: pathItem.style.left, top: pathItem.style.top	};
};

const createHoveredPathIdList = (fishkaId, pathId, userModel) => {
	const { board: { smallPathStyled, bigPathStyled }, info: { isSmallPath } } = userModel;	
	const currentPathOptions = isSmallPath ? pathOptions1['smallPath'] : pathOptions1['bigPath'];
	let hoveredPathIdList = [];
	
	if (fishkaId === 0) {
		if (pathId >= currentPathOptions.startId && pathId <= currentPathOptions.maxId) {
			hoveredPathIdList.push({
				start: currentPathOptions.startId,
				end: pathId
			});
		} else {
			hoveredPathIdList.push({
				start: currentPathOptions.startId,
				end: currentPathOptions.maxId
			});
			hoveredPathIdList.push({
				start: 1,
				end: pathId
			});
		}
	} else {
		if (pathId >= fishkaId) {
			hoveredPathIdList.push({
				start: fishkaId,
				end: pathId
			});
		} else {
			hoveredPathIdList.push({
				start: fishkaId,
				end: currentPathOptions.maxId
			});
			hoveredPathIdList.push({
				start: 1,
				end: pathId
			});
		}
	}
	
	return hoveredPathIdList;
};

const calculateNextPathPositionId = data => {
	const { isSmallPath, pathPositionId, stepLength } = data;
	
	const currentPathOptions = isSmallPath ? pathOptions.SMALL_PATH : pathOptions.BIG_PATH;
	const currentPathPositionId = pathPositionId === 0 ? currentPathOptions.startId : pathPositionId;
	const currentStepLength = pathPositionId === 0 ? stepLength - 1 : stepLength;
	
	let nextPathPositionId = currentPathPositionId + currentStepLength;
	if (nextPathPositionId > currentPathOptions.maxId) {
		nextPathPositionId -= currentPathOptions.maxId;
	}
	
	return nextPathPositionId;
};

export const useFishkaOptions = (gameRequestQueryGeneral, userModel, isDreamCreatorShow, callbacks, onInfoMessage) => {
	const {
		info: {
			color,
			pathPositionId,
			isSmallPath, 
			coordinates
		},
		board: {
			diceValue,
			fishkaStepProcessValue
		}
	} = userModel;
	
	const [fishkaOptions, setFishkaOptions] = useState(useFishkaActionInitialState);
	const [isBankrupt, setIsBankrupt] = useState(false);
	const [isReturnToSmallPath, setIsReturnToSmallPath] = useState(false);
	
	const dispatch = useDispatch();
	
	useEffect(() => {
		setFishkaOptions(prevState => ({
			...prevState,
			id: pathPositionId,
			color,
			coordinates		
		}));
	}, []);
	
	// After user droped dice
	useEffect(() => {	
		if (fishkaStepProcessValue === fishkaStepProcess.READY) {
			setFishkaOptions(prevState => ({
				...prevState,
				stepLength: diceValue,
				isSelected: true,
			}));
			
			dispatch(setFishkaStepProcessValue(fishkaStepProcess.IN_PROGRESS));
		}
	}, [fishkaStepProcessValue]);
	
	const onFishkaClickHandler = () => {		
		if (diceValue) {
			const currentIsSelected = !fishkaOptions.isSelected;
			
			setFishkaOptions(prevState => ({
				...prevState,
				isSelected: currentIsSelected
			}));
			
			dispatch(setFishka({ isSelected: currentIsSelected }));
			return;
		}
		
		onInfoMessage('Неможливо');
	};
	
	// TO DO: fix
	const onPathHover = id => {		
		if (fishkaOptions.isSelected && fishkaStepProcessValue === fishkaStepProcess.IN_PROGRESS) {
			setFishkaOptions(prevState => ({
				...prevState,
				hoveredPathIdList: createHoveredPathIdList(fishkaOptions.id, id, userModel)
			}));
		}
	};
	
	const onPathClick = data => {		
		// Select Dream on the Big Path
		if (isDreamCreatorShow) {
			if (data.isSmallPath) {
				return;
			}
			
			const { id, title, price } = userModel.board.bigPathStyled.find(item => item.id === data.id);
			
			dispatch(setDream({
				bigPathId: id,
				title,
				price
			}));
			
			return;
		}
		
		// Game turn event
		if (fishkaOptions.isSelected) {			
			const nextPathPositionId = calculateNextPathPositionId({
				isSmallPath,
				pathPositionId: fishkaOptions.id,
				stepLength: fishkaOptions.stepLength
			});
			
			// Make step
			if (nextPathPositionId === data.id) {
				const coordinates = getFishkaCoordinates(data.id, userModel);
				
				setFishkaOptions(prevState => ({
					...prevState,
					id: nextPathPositionId,
					stepLength: 0,
					isSelected: false,
					coordinates,
					hoveredPathIdList: [{
						start: 0,
						end: 0
					}]
				}));
				
				dispatch(setDiceValue(null));
				dispatch(setFishkaStepProcessValue(fishkaStepProcess.COMPLETED));
				dispatch(setFishka({
					pathPositionId: nextPathPositionId,
					coordinates,
					isSelected: false
				}));
		
				// Save fishka position
				const fishkaPosition = {
					pathPositionId: nextPathPositionId,
					coordinates: coordinates,
					isSmallPath: isSmallPath
				};
				
				setServerFishkaPosition({ ...gameRequestQueryGeneral, ...fishkaPosition }, {
					...callbacks,
					onSuccess: () => {
						callbacks.onSuccess();
					}
				});
			}
		}
	};
	
	const waitingDataUpdate = (data) => {		
		// - If Gamer is moved to the other Path then correct fishka data
		const isGamerMovedToTheOtherPath = data.pathPositionId === 0 && isSmallPath !== data.isSmallPath;
		
		if (isGamerMovedToTheOtherPath) {
			const currentData = {
				isSmallPath: data.isSmallPath,
				id: data.pathPositionId,
				coordinates: data.coordinates
			};
			
			dispatch(setFishka(currentData));		
			
			setFishkaOptions(prevState => ({
				...prevState, ...currentData
			}));
			
			// - Gamer is returned to the Small Path
			if (data.isSmallPath) {
				setIsReturnToSmallPath(true);
			}
		}
		
		// - If Gamer is bunkrupted
		setIsBankrupt(data.isBankrupt);
	};
	
	return {
		isReturnToSmallPath, isBankrupt,
		onFishkaClickHandler, onPathHover, onPathClick, waitingDataUpdate
	};
};

export const useCommonEventsWaitingData = () => {	
	const [markedCard, setMarkedCard] = useState({
		id: null,
		isShow: false
	});
	
	const setEvents = (commonEvents) => {
		setMarkedCard(prevState => ({
			...prevState,
			id: commonEvents.marketId
		}));
	};
	
	const updateEvents = (commonEvents) => {
		if (commonEvents.marketId !== -1 && markedCard.id !== commonEvents.marketId) {
			// Show marked card
			setMarkedCard(prevState => ({
				...prevState,
				id: commonEvents.marketId,
				isShow: true
			}));
		}
	};
	
	const waitingCommonEventsUpdate = (commonEvents) => {		
		if (markedCard.id === null) {
			// Gamer has already started or returned to play the game
			setEvents(commonEvents);
			return;
		}
		
		updateEvents(commonEvents);
	};
	
	const onMarkedCardClose = () => {
		// Gamer is playing the game
		setMarkedCard(prevState => ({
			...prevState,
			isShow: false
		}));
	};
	
	return {
		markedCard,
		waitingCommonEventsUpdate, onMarkedCardClose
	};
};

export const useTurnProgress = (gameRequestQueryGeneral, fishkaStepProcessValue, diceValue, callbacks, userId, commonEvents) => {
	const [turnProgress, setTurnProgress] = useState(useTurnProgressInitialState);
	const [isErrorStartTurn, setIsErrorStartTurn] = useState(false);
	const [isSkipTurnSpinnerShow, setSkipTurnSpinnerShow] = useState(false);
	const [timeStamp, setTimeStamp] = useState(null);
	
	const turnDiceValue = useRef(0);
	
	const dispatch = useDispatch();
	const currentAgreementCard = useSelector(state => state.userModel.currentAgreementCard);
	
	// Start or End turn according to Game Owner event
	useEffect(() => {
		if (userId === commonEvents.gamerIdTurn) {
			onStartTurn();
			return;
		}
		
		onEndTurn();
	}, [userId, commonEvents.gamerIdTurn, commonEvents.timeStamp, currentAgreementCard.id]);
	
	const onStartTurn = () => {
		if (!turnProgress.startTurn) {
			return;
		}
		
		if (currentAgreementCard.id) {
			setIsErrorStartTurn(true);
			return;
		}
		
		setIsErrorStartTurn(false);
		
		gameStartTurn({ ...gameRequestQueryGeneral }, {
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
				
				turnDiceValue.current = 0;
				dispatch(setDiceValue(0));
				dispatch(setDiceCount(Number(data.dice_count)));
						
				setTurnProgress(prevState => ({
					...prevState,
					startTurn: false,
					skipTurn: true,
					dice: true
				}));
		}});
	};
	
	const onRollHandler = value => {
		setTurnProgress(prevState => ({
			...prevState,
			skipTurn: false
		}));
		
		turnDiceValue.current += value;
		
		dispatch(setDiceValue(turnDiceValue.current));
		dispatch(setFishkaStepProcessValue(fishkaStepProcess.READY));
	};
	
	const onSkipTurn = () => {
		setTurnProgress(prevState => ({
			...prevState,
			startTurn: false,
			skipTurn: false,
			dice: false
		}));
		
		gameEndTurn({ ...gameRequestQueryGeneral }, { 
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
		}});
		
		setSkipTurnSpinnerShow(true);
		
		setTimeout(() => {
			setSkipTurnSpinnerShow(false);
			onEndTurn();
		}, [3000]);
	};
	
	const onEndTurn = () => {
		// N. B. This event occurs after Gamer moved the fishka
		
		if (isErrorStartTurn) {
			setIsErrorStartTurn(false);
		}
		
		if (
			turnProgress.startTurn &&
			!turnProgress.skipTurn &&
			!turnProgress.dice && 
			!turnProgress.endTurn
		) {
			return;
		}
		
		setTurnProgress(prevState => ({
			...prevState,
			startTurn: true,
			skipTurn: false,
			dice: false,
			endTurn: false
		}));
		
		turnDiceValue.current = 0;
		dispatch(setDiceValue(0));
		dispatch(setFishkaStepProcessValue(fishkaStepProcess.NOT_READY));
		
		gameEndTurn({ ...gameRequestQueryGeneral }, { 
			...callbacks,
			onSuccess: data => {
				callbacks.onSuccess();
		}});
	};
	
	useEffect(() => {
		setTurnProgress(useTurnProgressInitialState);
		
		turnDiceValue.current = 0;
		dispatch(setDiceValue(0));
		dispatch(setFishkaStepProcessValue(fishkaStepProcess.NOT_READY));
	}, [])
	
	// Fishka end of making step handler
	useEffect(() => {
		if (fishkaStepProcessValue === fishkaStepProcess.COMPLETED) {
			setTurnProgress(prevState => ({
				...prevState,
				dice: false,
				endTurn: true
			}));
			
			dispatch(setFishkaStepProcessValue(fishkaStepProcess.NOT_READY));
		}
		
		if (fishkaStepProcessValue === fishkaStepProcess.NOT_READY) {
			onEndTurn();
		}
	}, [fishkaStepProcessValue])
	
	return { 
		turnProgress, isSkipTurnSpinnerShow, isErrorStartTurn,
		onRollHandler, onSkipTurn, onEndTurn
	};
};

export const parseAgreement = (data, userId, type) => {	
	let currentCardGamerType = null;
	
	switch (userId) {
		case data.gamerIdTurn:
			currentCardGamerType = currentCardGamerTypes.GAMER_ID_TURN
			break;
			
		case data.gamerIdRedirect:
			currentCardGamerType = currentCardGamerTypes.GAMER_ID_REDIRECT
			break;
			
		default:
			currentCardGamerType = currentCardGamerTypes.GAMER_ID_VIEW
	}

	return {
		id: data.id,
		cardId: data.cardId,
		type,
		gamerType: currentCardGamerType,
		isCardRedirected: data.gamerIdRedirect > 0
	};
};