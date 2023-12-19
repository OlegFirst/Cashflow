// import { operators } from '../../common/constants';
// import { professionCardKeysInfo } from '../../components/ProfessionCard/constants';
// import { 
	// modelValues,
	// modelErrorMessagesInitialState
// } from './constants';

// export const selectModel = (userModel, id) => {	
	// switch (id) {
		// case 2:
			// // Passive income field
			// return {
				// [modelValues.PREVIOUS_VALUE]: userModel.general.passive_income,
				// [modelValues.OPERATOR]: operators.PLUS,
				// [modelValues.CURRENT_VALUE]: 0,
				// [modelValues.RESULT_VALUE]: 0
			// }
			
		// case 4:
			// // Children field
			// return {
				// [modelValues.PREVIOUS_VALUE]: userModel.general.child_expenses * userModel.general.count_of_children,
				// [modelValues.OPERATOR]: operators.PLUS,
				// [modelValues.CURRENT_VALUE]: 0,
				// [modelValues.RESULT_VALUE]: 0
			// }
			
		// default:
			// return {
				// [modelValues.PREVIOUS_VALUE]: 0,
				// [modelValues.OPERATOR]: operators.PLUS,
				// [modelValues.CURRENT_VALUE]: 0,
				// [modelValues.RESULT_VALUE]: 0
			// }
	// };
// };

// export const validateModel = ({ operationResult, model, id, userModel }) => {
	// let result = { ...modelErrorMessagesInitialState };
	// const errorMessage = 'Неправильне значення';
	
	// switch (id) {
		// case 4:
			// // Children field
			// if (+model[modelValues.CURRENT_VALUE] !== +userModel.general.child_expenses) {
				// result[modelValues.CURRENT_VALUE] = errorMessage;
			// }
			// if (+model[modelValues.RESULT_VALUE] !== operationResult) {
				// result[modelValues.RESULT_VALUE] = errorMessage;
			// }
			// break;
			
		// default:
			// result[modelValues.CURRENT_VALUE] = errorMessage;
			// result[modelValues.RESULT_VALUE] = errorMessage;
	// };
	
	// return result;
// };

// export const updateItemOfTwoColumnsTable = (newItemData, data) => {
	// const { id, name, value } = newItemData;
	
	// return data.map(item => 
		// item.id === id 
		// ? {
				// ...item,
				// [name]: value
			// }
		// : item
	// );
// };