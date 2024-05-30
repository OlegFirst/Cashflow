import { initialModelReducerState } from '../initialState';
import { ActionTypes } from '../actions/constants';

const modelReducer = (state = initialModelReducerState, action) => {	
	switch (action.type) {
		case ActionTypes.SET_USER_MODEL:
			return { ...state, ...action.value };
		
		// Path_(start)
		case ActionTypes.SET_SMALL_PATH:
			return {
				...state,
				board: { ...state.board, smallPathStyled: action.value }
			};
			
		case ActionTypes.SET_BIG_PATH:
			return {
				...state,
				board: { ...state.board, bigPathStyled: action.value }
			};
		// Path_(end)
		
		// Dice_(start)
		case ActionTypes.SET_DICE_VALUE:
			return {
				...state,
				board: { ...state.board, diceValue: action.value }
			};
			
		case ActionTypes.SET_DICE_COUNT:
			return {
				...state,
				board: { ...state.board, diceCount: action.value }
			};
		// Dice_(end)
			
		case ActionTypes.SET_SMALL_PATH:
			return {
				...state,
				board: { ...state.board, smallPathStyled: action.value }
			};
		
		// Fishka_(start)
		case ActionTypes.SET_FISHKA_STEP_PROCESS_VALUE:
			return { 
				...state,
				board: { ...state.board, fishkaStepProcessValue: action.value }
			};
			
		case ActionTypes.SET_FISHKA_POSITION:		
			return { 
				...state,
				info: { 
					...state.info,
					isSmallPath: action.value.isSmallPath,
					pathPositionId: action.value.pathPositionId
				}
			};
		
		case ActionTypes.SET_FISHKA:		
			return { 
				...state,
				info: { ...state.info, ...action.value }
			};			
		// Fishka_(end)
		
		case ActionTypes.SET_COMMON_EVENTS:
			return {
				...state,
				commonEvents: { ...state.commonEvents, ...action.value }
			};
		
		// AgreementCard_(start)
		case ActionTypes.SET_CURRENT_AGREEMENT_CARD_ID_TYPE:		
			return { 
				...state,
				currentAgreementCard: { ...state.currentAgreementCard, ...action.value }
			};
			
		case ActionTypes.SET_CURRENT_AGREEMENT_CARD_CONTENT:		
			return { 
				...state,
				currentAgreementCard: {
					...state.currentAgreementCard,
					content: { ...state.currentAgreementCard.content, ...action.value }
				}
			};
		
		case ActionTypes.SET_CURRENT_AGREEMENT_CARD_IS_PRESENT:
			return { 
				...state,
				currentAgreementCard: {
					...state.currentAgreementCard,
					isPresent: action.value
				}
			};
			
		case ActionTypes.CLEAR_CURRENT_AGREEMENT_CARD:		
			return { 
				...state,
				currentAgreementCard: { 
					...state.currentAgreementCard, 
					...initialModelReducerState.currentAgreementCard
				}
			};
		// AgreementCard_(end)
		
		case ActionTypes.CLEAR_USER_MODEL_STORAGE:
			return { ...state, ...initialModelReducerState };
			
		default:
			return state;
	}
};

export default modelReducer;