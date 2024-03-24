import { executeRequestGetWrapper } from '../../services/utils';

export const gameOwnerPreparation = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=game-preparation&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const checkMakeNextTurn= (data, callbacks) => {		
	const request = {
		endPointURL: 'game',
		query: 'info=game-check-make-next-turn&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const makeNextTurn = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=game-make-next-turn&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const sendAgreementToGamer = (data, callbacks) => {		
	const request = {
		endPointURL: 'game',
		query: 'info=send-agreement-to-gamer&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const sendCommonAgreementToGamer = (data, callbacks) => {		
	const request = {
		endPointURL: 'game',
		query: 'info=send-common-agreement-to-gamer&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const removeAgreement = (data, callbacks) => {		
	const request = {
		endPointURL: 'game',
		query: 'info=game-remove-agreement-from-gamer&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const getMarket = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=game-get-market&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const getMoneyInTheWind = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=get-m-w&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const setCharityTurnsLeft = (data, callbacks) => {
	const request = {
		endPointURL: 'game',
		query: 'info=set-charity-turns-left&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

export const moveGamerToPath = (data, callbacks) => {		
	const request = {
		endPointURL: 'game',
		query: 'info=game-move-to-path&data=' + JSON.stringify(data)
	};
	
	executeRequestGetWrapper(request, callbacks);
};

// Mappers_(start)
export const checkMakeNextTurnMapper = data  => {
	return Number(data.is_gamer_turn_end) === 1;
};

export const makeNextTurnMapper = data => {	
	const { gamer_id_turn, gamer_turn_data } = data;
	
	return {
		gamerIdTurn: Number(gamer_id_turn),
		cash: Number(gamer_turn_data.cash),
		incomesRealEstate: Number(gamer_turn_data.incomes_real_estate),
		isSmallPath: Number(gamer_turn_data.is_small_path) === 1,
		charityTurnsLeft: gamer_turn_data.charity_turns_left
	};
};

export const gameOwnerPreparationMapper = data => {
	const { game_info, gamer_list, gamer_id_turn, gamer_turn_data } = data;
	
	return {
		gameId: Number(game_info.id),
		gameName: game_info.name,
		ownerId: Number(game_info.owner_id),		
		date: game_info.date,
		time: game_info.time,
		gamerList: gamer_list.map(item => ({ ...item, id: Number(item.id) })),
		gamerTurnData: {
			gamerIdTurn: Number(gamer_id_turn),
			cash: Number(gamer_turn_data.cash),
			incomesRealEstate: Number(gamer_turn_data.incomes_real_estate),
			isSmallPath: Number(gamer_turn_data.is_small_path) === 1,
			charityTurnsLeft: Number(gamer_turn_data.charity_turns_left)
		}
	};
};

export const sendedAgreementToGamerMapper = data => {
	const { cards_transfer } = data;
	
	return {
		id: Number(cards_transfer.id),
		cardId: Number(cards_transfer.card_id),
		type: cards_transfer.card_type
	}
};

export const getMarketMapper = data => {
	return Number(data.card_id);
};

export const getMoneyInTheWindMapper = data => {	
	return Number(data.card_id);
};
// Mappers_(end)