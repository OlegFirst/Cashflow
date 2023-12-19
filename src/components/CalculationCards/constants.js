export const calculationCardType = {
	GENERAL: 'general',
	SIMPLE: 'simple',
	ACTIONS: 'actions',
	BUSINESS: 'business'
};

// export const modelValues = {
	// PREVIOUS_VALUE: 'previousValue',
	// OPERATOR: 'operator',
	// CURRENT_VALUE: 'currentValue',
	// RESULT_VALUE: 'resultValue'
// };

export const calculationCardList = [
	{
		id: 1,
		type: calculationCardType.GENERAL,
		title: 'Особисті дані'
	},
	{
		id: 2,
		type: calculationCardType.SIMPLE,
		title: 'Пасивний дохід'
	},
	{
		id: 3,
		type: calculationCardType.SIMPLE,
		title: 'Діти'
	},
	{
		id: 4,
		type: calculationCardType.SIMPLE,
		title: 'Загальний дохід'
	},	
	{
		id: 5,
		type: calculationCardType.SIMPLE,
		title: 'Загальнi витрати'
	},
	{
		id: 6,
		type: calculationCardType.SIMPLE,
		title: 'Грошовий потік'
	},
	{
		id: 7,
		type: calculationCardType.SIMPLE,
		title: 'Кеш'
	},
	{
		id: 8,
		type: calculationCardType.SIMPLE,
		title: 'Кредити'
	},
	{
		id: 9,
		type: calculationCardType.SIMPLE,
		title: 'Активи. Акції'
	},
	{
		id: 10,
		type: calculationCardType.SIMPLE,
		title: 'Активи. Нерухомість'
	},
	{
		id: 11,
		type: calculationCardType.SIMPLE,
		title: 'Активи. Бізнес'
	}
];

// export const modelErrorMessagesInitialState = {
	// [modelValues.CURRENT_VALUE]: '',
	// [modelValues.RESULT_VALUE]: ''
// };