import { clearInfoStorage } from './actionCreatorsInfo';
import { clearUserModelStorage } from './actionCreatorsUserModel';
import { clearBigPathCardStorage } from './actionCreatorsBigPathCard';

export const singOutClearStorage  = dispatch => {
	return dispath => {
		dispatch(clearInfoStorage());
		dispatch(clearUserModelStorage());
		dispatch(clearBigPathCardStorage());
	}
};

export const ownerGameClearStorage  = dispatch => {
	return dispath => {
		dispatch(clearUserModelStorage());
	}
};