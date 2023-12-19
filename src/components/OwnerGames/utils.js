import { 
	editedGameModes,
	editedGameInitailState,
	editedGamerInitailState
} from './constants';

const getGameData = (gameId, gameList) => gameList.find(game => game.gameId === gameId);

const getGamerData = (gamerListId, gamerList) => gamerList.find(gamer => gamer.gamerListId === gamerListId);

export const editedGamePreparation = (mode, gameId, gameList) => {
	if (!mode || mode === editedGameModes.CREATE) {
		return editedGameInitailState;
	}
	
	const gameData = getGameData(gameId, gameList);
		
	const gamerData = gameData.gamers.map((gamer, index) => ({ ...gamer, gamerListId: index + 1 }));
	
	return {
		...editedGameInitailState,
		game: {
			gameId,
			name: gameData.name,
			date: gameData.date,
			time: gameData.time
		},
		gamerList: [ ...gamerData ]
	};
};

export const editedGamerPreparation = (mode, gamerListId, gamerList) => {	
	if (!mode || mode === editedGameModes.CREATE) {
		return editedGamerInitailState;
	}
	
	const gamerData = getGamerData(gamerListId, gamerList);
	
	return {
		...editedGamerInitailState,
		gamerListId: gamerListId,
		id: gamerData.id,
		name: gamerData.name,
		login: gamerData.login,
		password: gamerData.password
	}
};

export const getNewGamerListId = componentData => {	
	const { gamerList } = componentData;
	
	if (gamerList.length === 0) {
		return 1;
	}
		
	let gamerListIdMax = gamerList[0].gamerListId;
	
	for (let i = 0; i < gamerList.length; i++) {
		if (gamerList[i].gamerListId > gamerListIdMax) {
			gamerListIdMax = gamerList[i].gamerListId;
		}
	}
	
	return gamerListIdMax + 1;
};

export const getRemovedGamers = (componentData, gameList) => {
	const { game: { gameId }, gamerList } = componentData;
	
	const componentDataCreatedGamerList = gamerList.filter(gamer => gamer.id);
	const createdGamerList = getGameData(gameId, gameList).gamers;
	
	const removedGamerList = createdGamerList.reduce((acc, createdGamer) => {
		const matchedGamer = componentDataCreatedGamerList.find(componentDataCreatedGamer => (
			componentDataCreatedGamer.id === createdGamer.id
		));
		
		if (!matchedGamer) {
			return acc.concat(createdGamer);
		}
		
		return acc;
	}, []);
	
	return removedGamerList;
};