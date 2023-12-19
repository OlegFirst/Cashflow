export const editedGameModes = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
};

export const gameProcessingModes = {
	START: 1,
	COMPLETE: 2,
	CANCEL: 0
};

export const editedGameInitailState = {
	game: {
		gameId: null,
		name: '',
		date: null,
		time: null
	},
	gamerList: []
};

export const editedGamerInitailState = {
	gamerListId: 0,
	id: null,
	name: '',
	login: '',
	password: '',
	userRoleId: 3
};