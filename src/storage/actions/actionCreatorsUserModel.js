import { ActionTypes } from './constants';

export const setUserModel = valueObject => ({
	type: ActionTypes.SET_USER_MODEL,
	value: valueObject
});

export const setSmallPathStyled = valueArray => ({
	type: ActionTypes.SET_SMALL_PATH,
	value: valueArray
});

export const setBigPathStyled = valueArray => ({
	type: ActionTypes.SET_BIG_PATH,
	value: valueArray
});

export const clearUserModelStorage = () => ({
	type: ActionTypes.CLEAR_USER_MODEL_STORAGE,
	value: null
});

export const setDiceValue = value => ({
	type: ActionTypes.SET_DICE_VALUE,
	value
});

export const setDiceCount = value => ({
	type: ActionTypes.SET_DICE_COUNT,
	value
});

export const setCommonEvents = valueObject => ({
	type: ActionTypes.SET_COMMON_EVENTS,
	value: valueObject
});

// Fishka_(start)
export const setFishkaStepProcessValue = value => ({
	type: ActionTypes.SET_FISHKA_STEP_PROCESS_VALUE,
	value
});

export const setFishkaPosition = valueObject => ({
	type: ActionTypes.SET_FISHKA_POSITION,
	value: valueObject
});

export const setFishka = valueObject => ({
	type: ActionTypes.SET_FISHKA,
	value: valueObject
});
// Fishka_(end)

// AgreementCard_(start)
export const setCurrentAgreementCardIdType = valueObject => ({
	type: ActionTypes.SET_CURRENT_AGREEMENT_CARD_ID_TYPE,
	value: valueObject
});

export const setCurrentAgreementCardContent = valueObject => ({
	type: ActionTypes.SET_CURRENT_AGREEMENT_CARD_CONTENT,
	value: valueObject
});

export const setCurrentAgreementCardIsPresent = value => ({
	type: ActionTypes.SET_CURRENT_AGREEMENT_CARD_IS_PRESENT,
	value
});

export const clearCurrentAgreementCard = () => ({
	type: ActionTypes.CLEAR_CURRENT_AGREEMENT_CARD,
	value: null
});
// AgreementCard_(end)