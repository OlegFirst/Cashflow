import { 
	errors,
	commonSmallAgreementIdList,
	cardTypes
} from './constants';

const cutSpacesFromString = str => str.trim();

// Validations_(start)
export const validateLogin = data => {
	return '';
	
	const dataLength = cutSpacesFromString(data).length;
	return dataLength >=4 && dataLength <= 12 ? '' : errors.LOGIN
};

export const validatePassword = data => {
	return '';
	
	const dataLength = cutSpacesFromString(data).length;
	return dataLength >=4 && dataLength <= 12 ? '' : errors.PASSWORD
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
// Profession_(end)

export const checkCommonSmallAgreement = card => {
	const { cardId, type } = card;
	
	if (type === cardTypes.SMALL_AGREEMENT) {
		return commonSmallAgreementIdList.some(id => id === cardId);
	}
	
	return false;
};