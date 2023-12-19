import { createStore, combineReducers } from 'redux';

import infoReducer from './reducers/infoReducer';
import modelReducer from './reducers/modelReducer';
import bigPathCardReducer from './reducers/bigPathCardReducer';

const reducers = combineReducers({
	info: infoReducer,
	userModel: modelReducer,
	bigPathCard: bigPathCardReducer
});

const store = createStore(reducers);

export default store;