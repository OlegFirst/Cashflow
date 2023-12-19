import { smallPath } from '../Board/small-path';

export const currentCardGamerTypes = {
	GAMER_ID_TURN: 'GAMER_ID_TURN',
	GAMER_ID_REDIRECT: 'GAMER_ID_REDIRECT',
	GAMER_ID_VIEW: 'GAMER_ID_VIEW'
};

export const fishkaStepProcess = {
	NOT_READY: 'NOT_READY',
	READY: 'READY',
	IN_PROGRESS: 'IN_PROGRESS',
	COMPLETED: 'COMPLETED'
};

export const pathOptions1 = {
	smallPath: {
		startId: 23,
		maxId: smallPath[smallPath.length - 1].id
	},
	// To do:
	bigPath: {
		startId: null,
		maxId: null
	}
};

export const useFishkaActionInitialState = {
	id: 0,
	stepLength: 0,
	isSelected: false,
	coordinates: { left:0, top: 0 },
	hoveredPathIdList: [{
		start: 0,
		end: 0
	}]
};

export const useTurnProgressInitialState = {
	startTurn: true,
	skipTurn: true,
	dice: false,
	endTurn: false
};