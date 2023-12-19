import { initialBigPathCardState } from '../initialState';
import { ActionTypes } from '../actions/constants';

const bigPathCardReducer = (state = initialBigPathCardState, action) => {	
	switch (action.type) {
		case ActionTypes.SET_DREAM:
			return { 
				...state,
				info: { ...state.info, dream:	action.value }
			};
			
		case ActionTypes.SET_PROFESSION:
			return { 
				...state,
				profession: { ...state.profession, ...action.value }
			};
			
		case ActionTypes.CLEAR_BIG_PATH_CARD_STORAGE:
			return { ...state, ...initialBigPathCardState };
			
		default:
			return state;
	}
};

export default bigPathCardReducer;