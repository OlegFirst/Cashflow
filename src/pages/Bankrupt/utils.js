import { executeRequestGetWrapper } from '../../services/utils';

export const gameBankrupt = (data, callbacks) => {
	const request = {
		endPointURL: 'gamer-bankrupt',
		query: 'info=&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};