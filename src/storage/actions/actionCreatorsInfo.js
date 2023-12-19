import { ActionTypes } from './constants';

export const setUser = valueObject => ({
	type: ActionTypes.SET_USER,
	value: valueObject
});

export const setGame = valueObject => ({
	type: ActionTypes.SET_GAME,
	value: valueObject
});

// TO DO: remove later
export const setProtocol = valueArray => ({
	type: ActionTypes.SET_PROTOCOL,
	value: valueArray
});

export const setNetworkStatus = value => ({
	type: ActionTypes.SET_NETWORK_STATUS,
	value
});

export const clearInfoStorage = () => ({
	type: ActionTypes.CLEAR_INFO_STORAGE,
	value: null
});

export const setOwnerData = valueObject => ({
	type: ActionTypes.SET_OWNER_DATA,
	value: valueObject
});

export const setGamerTurnData = valueObj => ({
	type: ActionTypes.SET_GAMER_TURN_DATA,
	value: valueObj
});

export const setGamerTurnPath = value => ({
	type: ActionTypes.SET_GAMER_TURN_PATH,
	value
});