import { useEffect, useState } from 'react';

import {
	errors,
	commonSmallAgreementIdList,
	cardTypes,
	professionCardInputNames
} from './constants';

const cutSpaces = str => typeof str === 'string' ? str.trim() : '';

// Validations_(start)
export const validateGameName = data => {	
	const dataLength = cutSpaces(data).length;
	return dataLength >= 1 && dataLength <= 12 ? '' : errors.GAME_NAME
};

export const validateGameDate = data => {	
	const dataLength = cutSpaces(data).length;
	return dataLength >= 1 && dataLength <= 12 ? '' : errors.DATE
};

export const validateGameTime = data => {	
	const dataLength = cutSpaces(data).length;
	return dataLength >= 1 && dataLength <= 12 ? '' : errors.TIME
};

export const validateName = data => {	
	const dataLength = cutSpaces(data).length;
	return dataLength >= 3 && dataLength <= 12 ? '' : errors.NAME
};

export const validateLogin = data => {
	const dataLength = cutSpaces(data).length;
	return dataLength >= 3 && dataLength <= 12 ? '' : errors.LOGIN
};

export const validatePassword = data => {
	const dataLength = cutSpaces(data).length;
	return dataLength >= 3 && dataLength <= 12 ? '' : errors.PASSWORD
};

export const validateNumberField = data => {
	const pattern = /^[0-9]*$/;
	const dataLength = cutSpaces(data.toString()).length;
	
	return pattern.test(data) && data >= 0 && dataLength >= 1 && dataLength <=12 ? '' : errors.NUMBER_FIELD
};

export const validateStringField = data => {
	const dataLength = cutSpaces(data).length;
	return dataLength >= 1 && dataLength <= 12 ? '' : errors.STRING_FIELD
};

export const useProfessionCardValidation = () => {	
	const [errorMessageList, setErrorMessageList] = useState([]);
	const [isValid, setIsValid] = useState(false);
	
	const updateErrorMessageList = (inputName, errorMessage) => {
		setErrorMessageList(prevState => ({
			...prevState,
			[inputName]: errorMessage
		}));
	};
	
	const proceed = data => {
		// console.clear()
		
		switch (data.name) {
			case professionCardInputNames.NAME:
				updateErrorMessageList(professionCardInputNames.NAME, validateStringField(data.value));
				break;
				
			case professionCardInputNames.COUNT:
				updateErrorMessageList(professionCardInputNames.COUNT, validateNumberField(data.value));
				break;
				
			case professionCardInputNames.PRICE:
				updateErrorMessageList(professionCardInputNames.PRICE, validateNumberField(data.value));
				break;
			
			case professionCardInputNames.COST:
				updateErrorMessageList(professionCardInputNames.COST, validateNumberField(data.value));
				break;
				
			case professionCardInputNames.INCOME:
				updateErrorMessageList(professionCardInputNames.INCOME, validateNumberField(data.value));
				break;
				
			default:
				console.log('Bad input name');
		}
	};
	
	useEffect(() => {
		let isErrorMessagePresent = false;
		
		Object.entries(errorMessageList).forEach(item => {
			const [ key, value ] = item;
			
			if (value) {
				isErrorMessagePresent = true;
			}
		});
		
		setIsValid(!isErrorMessagePresent);
	}, [errorMessageList]);
	
	return { errorMessageList, isValid, proceed };
};
// Validations_(end)

export const findEnumVariable = (enumObj, variableValue) => {
	const result = Object.entries(enumObj).find(([ key, value ]) => value === variableValue);
	
	return result ? result[0] : null;
};

export const isObjectEmpty = obj => Object.keys(obj).length === 0;

export const parseKeyStringOfObject = (objKey = '') => objKey.split('.');

export const getObjectValue = (objKey, obj) => {
	const keyList = parseKeyStringOfObject(objKey);
	
	switch (keyList.length) {
		case 1:
			return obj[keyList[0]];
		case 2:
			return obj[keyList[0]][keyList[1]];
		case 3:
			return obj[keyList[0]][keyList[1]][keyList[2]];
		default:
			return undefined;
	}
};

export const getLastId = itemList => itemList[itemList.length - 1].id;

export const createResponseCompleteMessage = data => {	
	if (data.hasOwnProperty('is_complete')) {
		if (Number(data.is_complete) === 1) {
			return { 
				message: data.complete_message,
				isSuccess: true
			};
		} else {
			return {
				message: data.complete_message,
				isSuccess: false
			}
		}
	}
	
	return {
		message: 'Cant find is_complete data',
		isSuccess: false
	}
};

// Profession_(start)
//
// price - cina
// cost - vartist
//
export class ActionsTable {	
	static preparation(id = 1) {
		return [{
			id,
			name: '',
			count: 0,
			price: 0,
			cost: 0,
			income: 0
		}];
	}
};

export class RealEstateTable {	
	static preparation(id = 1) {
		return [{
			id,
			name: '',
			deposit: 0,
			price: 0,
			bail: 0,
			income: 0
		}];
	}
};

export class BusinessTable {	
	static preparation(id = 1) {
		return [{
			id,
			name: '',
			deposit: 0,
			price: 0,
			bail: 0,
			income: 0
		}];
	}
};

export class ArifmeticTable {
	static preparation(id = 1, result = 0) {
		return [{ 
			id,
			value: 0,
			result
		}];
	}
};

export class BuyedDreamsTable {
	static preparation(id = 1, result = 0) {
		return [{ 
			id,
			name: '',
			price: 0
		}];
	}
};

export class BuyedBusinessTable {
	static preparation(id = 1, result = 0) {
		return [{ 
			id,
			name: '',
			passiveIncomes: 0,
			moneyFlow: 0
		}];
	}
};
// Profession_(end)

export const checkCommonSmallAgreement = card => {
	const { cardId, type } = card;
	
	if (type === cardTypes.SMALL_AGREEMENT) {
		return commonSmallAgreementIdList.some(id => id === cardId);
	}
	
	return false;
};