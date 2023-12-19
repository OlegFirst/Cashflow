import { fishkaStepProcess } from '../components/Game/constants';

export const initialInfoReducerState = {
	user: null,
	ownerData: null,
	game: {
		name: null,
		gameId: null,
		gameOwnerName: null,
		time: null,
		date: null,
		// isGameBegun: null,
		gamerList: []
	},
	protocol: null,
	networkStatus: null
};

export const initialModelReducerState = {
	info: null,
	profession: null,
	board: {
		smallPathStyled: [],
		bigPathStyled: [],
		diceValue: 0,
		diceCount: 1,
		fishkaStepProcessValue: fishkaStepProcess.NOT_READY
	},
	currentAgreementCard: {
		id: null,
		cardId: null,
		type: null,
		content: null,
		isPresent: false,
		gamerType: null,
		isCardRedirected: false
	}
};

export const initialBigPathCardState = {
	info: {
		dream: {
			bigPathId: null,
			title: null,
			price: null
		}
	},
	profession: {
		buyedDreams: [],
		buyedBusiness: [],
		buyedCash: []
	}
};