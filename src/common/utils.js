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
	const pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;	
	return pattern.test(data) ? '' : errors.DATE
};

export const validateGameTime = data => {	
	const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;	
	return pattern.test(data) ? '' : errors.TIME
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

const validate = (name, value) => {
	switch (name) {
		case professionCardInputNames.NAME:
			return validateStringField(value);
			
		case professionCardInputNames.COUNT:
			return validateNumberField(value);
			
		case professionCardInputNames.PRICE:
			return validateNumberField(value);
		
		case professionCardInputNames.COST:
			return validateNumberField(value);
			
		case professionCardInputNames.INCOME:
			return validateNumberField(value);
			
		case professionCardInputNames.TOTAL:
			return validateNumberField(value);
			
		case professionCardInputNames.DEPOSIT:
			return validateNumberField(value);
			
		case professionCardInputNames.BAIL:
			return validateNumberField(value);
			
		default:
			console.log('Bad input name');
			return '';
	};
};

export const professionCardValidation = ({ type, newValueList }) => {
	// Loop throught all rows
	const errorMessageList = newValueList.reduce((acc, items) => {		
		// Loop throught all columns of the current row
		const rowMessageList = Object.entries(items).reduce((acc, item) => {
			const [ key, value ] = item;
			
			if (key === 'id') {
				return { ...acc, id: value };
			}
			
			if (key === 'status') {
				return acc;
			}
			
			const errorMessage = validate(key, value);			
			return { 
				...acc,
				data: { ...acc.data,
					[key]: errorMessage 
				}
			}
		}, { id: null, data: [] });
		
		return acc.concat(rowMessageList);
	}, []);
	
	return errorMessageList;
};

export const professionCardTotalValidation = value => {
	return validate(professionCardInputNames.TOTAL, value);
};

export const checkProfessionCardValid = (errorMessageList, errorTotalMessage) => {	
	let isValid = true;
	
	if (errorMessageList.length > 0) {
		for (let i = 0; i < errorMessageList.length; i++) {
			const data = errorMessageList[i].data;			
			
			Object.entries(data).forEach(item => {
				const [ _, value ] = item;
				
				if (value) {
					isValid = false;
				}
			});
		}
	}
	
	if (errorTotalMessage) {
		isValid = false;
	}
	
	return isValid;
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