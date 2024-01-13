export const userRoles = {
	SUPER_OWNER: 1,
	OWNER: 2,
	GAMER: 3
};

export const cardTypes = {
	SMALL_AGREEMENT: 'small_agreement',
	BIG_AGREEMENT: 'big_agreement'
};

export const commonSmallAgreementIdList = [9, 47];

export const professionCardInputNames = {
	NAME: 'name',
	COUNT: 'count',
	PRICE: 'price',
	COST: 'cost', 
	INCOME: 'income'	
};

export const errors = {
	GAME_NAME: 'Помилка. Довжина 1...12 символів',
	DATE: 'Помилка',
	TIME: 'Помилка',
	NAME: 'Помилка. Довжина 3...12 символів',
	LOGIN: 'Помилка. Довжина 3...12 символів',
	PASSWORD: 'Помилка. Довжина 3...12 символів',
	NUMBER_FIELD: 'Помилка. Має бути число. Довжина 1...12 символів',
	STRING_FIELD: 'Помилка. Довжина 1...12 символів'
};

export const operators = {
	PLUS: 'plus',
	MINUS: 'minus'
};

export const confirmModalTypes = {
	INFO: 'INFO',
	DANGER: 'DANGER'
};

export const pathTypes = {
	SMALL_PATH: 'SMALL_PATH',
	BIG_PATH: 'BIG_PATH'
};

export const pathTypeStartCoordinates = {
	SMALL_PATH: {
		left: '-130px',
		top: '725px' 
	},
	BIG_PATH: {
		left: '1582px',
		top: '1680px'
	}
};

export const pathOptions = {
	SMALL_PATH: {
		startId: 20,
		maxId: 24
	},
	BIG_PATH: {
		startId: 27,
		maxId: 48
	}
};

export const fishkaTranslateX = 10;

export const bankruptMoneyFlow = 300;