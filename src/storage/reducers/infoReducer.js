import { initialInfoReducerState } from '../initialState';
import { ActionTypes } from '../actions/constants';

const infoReducer = (state = initialInfoReducerState, action) => {	
	switch (action.type) {
		case ActionTypes.SET_USER:
			return { ...state, user: action.value };
			
		case ActionTypes.SET_GAME:		
			return { ...state, game: action.value };
			
		// case ActionTypes.SET_PROTOCOL:
			// return { ...state, protocol: action.value };
			
		case ActionTypes.SET_NETWORK_STATUS:
			return { ...state, networkStatus: action.value };
			
		case ActionTypes.SET_OWNER_DATA:
			return { ...state, ownerData: action.value };
			
		case ActionTypes.SET_GAMER_TURN_DATA:
			return { 
				...state, 
				ownerData: {
					...state.ownerData, 
					gamerTurnData: { 
						...state.ownerData.gamerTurnData,
						...action.value
					}
				} 
			};
		
		case ActionTypes.SET_GAMER_TURN_PATH:
			return { 
				...state, 
				ownerData: {
					...state.ownerData, 
					gamerTurnData: { 
						...state.ownerData.gamerTurnData,
						isSmallPath: action.value
					}
				} 
			};
			
		case ActionTypes.CLEAR_INFO_STORAGE:
			return { ...state, ...initialInfoReducerState };
			
		default:
			return state;
	}
};

export default infoReducer;