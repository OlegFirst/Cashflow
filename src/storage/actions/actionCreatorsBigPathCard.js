import { ActionTypes } from './constants';

export const setDream = valueObject => ({
	type: ActionTypes.SET_DREAM,
	value: valueObject
});

export const setProfession = valueObject => ({
	type: ActionTypes.SET_PROFESSION,
	value: valueObject
});

export const clearBigPathCardStorage = () => ({
	type: ActionTypes.CLEAR_BIG_PATH_CARD_STORAGE,
	value: null
});