import { executeRequestGetWrapper } from '../../services/utils';

export const returnToSmallPath = (data, callbacks) => {
	const request = {
		endPointURL: 'gamer-return-to-small-path',
		query: 'info=&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};