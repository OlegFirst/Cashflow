import { 
	parseKeyStringOfObject,
	getObjectValue
} from '../../common/utils';
import {
	executeRequestGetWrapper,
	professionCardChangeObjKeyMapper
} from '../../services/utils';
import {
	professionCardTypes,
	professionCardItemTypes,
	itemStatuses
} from './constants';

const setUpdatedStatus = ({ status }) => ( 
	status === itemStatuses.DEFAULT	? itemStatuses.UPDATED : status
);

export const updateActionsTableItems = (newValue, valueList) => {	
	const { id, name, value } = newValue;
	
	return valueList.map(item => item.id === id 
		? {
				...item,
				[name]: value,
				status: setUpdatedStatus(item)
			}
		: item
	);
};

export const updateTwoColumnsTableItems = (newItemData, data) => {
	const { id, name, value } = newItemData;
	
	return data.map(item => item.id === id 
		? {
				...item,
				[name]: value,
				status: setUpdatedStatus(item)
			}
		: item
	);
};

export const createSelectedItemStyle = objKey => {
	const objKeyList = parseKeyStringOfObject(objKey);
	
	switch (objKeyList[0]) {
		case 'incomes':
			return objKeyList[1] === 'totalIncomes'
				? { color: 'white', backgroundColor: 'brown' }
				: null;
				
		case 'expenses':
			return objKeyList[1] === 'totalExpenses'
				? { color: 'white', backgroundColor: 'blue' }
				: null;
				
		case 'moneyFlow':
			return { color: 'white', backgroundColor: 'green' };
			
		case 'cash':
			return { color: 'white', backgroundColor: 'green' };
			
		default:
			return null;
	}
};

export const getTotal = (objKey, type, profession) => {	
	if (!type) {
		return getObjectValue(objKey, profession);
	}
	
	if (
		type === professionCardTypes.ACTIONS ||
		type === professionCardTypes.REAL_ESTATE ||
		type === professionCardTypes.BUSINESS
	) {
		return getObjectValue('total.' + objKey, profession);
	}
	
	if (
		type === professionCardTypes.ARITHMETIC ||
		type === professionCardTypes.BUYED_CASH
	) {
		const property = getObjectValue(objKey, profession);
		return property.length > 0 ?  property[property.length - 1]['result'] : 0;
	}
	
	return null;
};

// business card item changes_(start)
export const checkIsValueListEmpty = valueList => {
	const removedValuesLength = valueList.filter(item => item.status === itemStatuses.REMOVED).length;
	
	return valueList.length === removedValuesLength;
};

const executeRequestInsert = ({ generalData, data }, callbacks) => {
	const type = generalData.type;
	
	let queryObj = {
		userId: generalData.userId,
		userRoleId: generalData.userRoleId,
		gameId: generalData.gameId,		
		type,
		data: {
			valueList: data.valueList
		}
	};
	
	if (type === professionCardTypes.ARITHMETIC) {
		queryObj = {
			...queryObj,
			objKey: professionCardChangeObjKeyMapper(generalData.objKey)
		};
	}
	
	const request = {
		endPointURL: 'game',
		query: 'info=user_model-insert&data=' + JSON.stringify(queryObj)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

const executeRequestUpdate = ({ generalData, data }, callbacks) => {
	const queryObj = {
		userId: generalData.userId,
		userRoleId: generalData.userRoleId,
		gameId: generalData.gameId,
		type: generalData.type,
		data: { ...data }
	};
	
	const request = {
		endPointURL: 'game',
		query: 'info=user_model-update&data=' + JSON.stringify(queryObj)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

const executeRequestRemove = ({ generalData, data }, callbacks) => {
	const queryObj = {
		userId: generalData.userId,
		userRoleId: generalData.userRoleId,
		gameId: generalData.gameId,
		type: generalData.type,
		data: {
			valueList: data.valueList
		}
	};
	
	const request = {
		endPointURL: 'game',
		query: 'info=user_model-remove&data=' + JSON.stringify(queryObj)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const changeProfessionCardItem = ({ generalData, data }, callbacks) => {
	const { valueList } = data;
		
	const upadatedValueList = 
		valueList
		.filter(item => item.status === itemStatuses.UPDATED)
		.map(item => {
			const { status, ...newItem } = item;			
			return newItem;
		});
	
	const removedValueList = valueList
		.filter(item => item.status === itemStatuses.REMOVED)
		.map(item => {
			const { status, ...newItem } = item;			
			return newItem;
		});
	
	const insertedValueList = valueList
		.filter(item => item.status === itemStatuses.INSERTED)
		.map(item => {
			const { id, status, ...newItem } = item;			
			return newItem;
		});
	
	if (insertedValueList.length > 0) {
		executeRequestInsert({ generalData, data: { ...data, valueList: insertedValueList } }, callbacks);
	}
	
	if (
		upadatedValueList.length > 0 ||
		generalData.isTotalUpdated && generalData.type != professionCardTypes.ARITHMETIC
	) {
		executeRequestUpdate({ generalData, data: { ...data, valueList: upadatedValueList } }, callbacks);
	}
	
	if (removedValueList.length > 0) {
		executeRequestRemove({ generalData, data: { ...data, valueList: removedValueList } }, callbacks);
	}
};

export const getErrorMessage = (key, rowMessageList) => {
	if (!rowMessageList) {
		return '';
	}
	
	return rowMessageList[key];
};
// business card item changes_(end)