// price - ВАРТІСТЬ
// bail_income - ЗАКЛАДНА
// deposit - ЗАВДАТОК 
// passive_income - ПАСИВНИЙ ДОХІД
// codCP - КОД ЦП
// kotyruvannya - КОТИРУВАННЯ
// seil_pice - БЕЗ ДИВІДЕНТІВ ЦІНА ПРОДАЖУ,
// LAND_PLOT - земельна ділянка

export const smallAgreementTypes = {
	STARTUP: 'startup',
	ACTIONS: 'actions',
	FLAT: 'flat',
	LAND_PLOT: 'landPlot',
	COLLECTION: 'collection',
	EVENT: 'event',
	DEPOSIT_SERTIFICAT: 'depositSertificate'
};

export const smallAgreementList = [
	{
		id: 1,
		type: smallAgreementTypes.STARTUP,
		name: 'Стартап соціальна мережа',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$6000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$6000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: 'від -$200 до $600' }
		],
		caption: `Створіть нову соціальну мережу Unreal travel. Користувач може завантажити своє фото 
			в будь-який краєвид чи відео з усіх куточків планети. Спочатку ти зазнаєш збитків <b>$200</b>
			на місяць, близько року. Якщо протримаєшся чотири кола, ПД зростає до <b>$600</b> на місяць.`,
		subCaption: 'Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{		
		id: 2,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$30' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Зростання фінансових та торгових транзакцій призвело до зростання курсової вартості акцій компанії.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 3,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$10' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `Високі відсоткові ставки спричинили зниження курсової вартості акцій`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною',
		isSellAble: false
	},	
	{
		id: 4,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$125000' },
			{ title: 'ЗАКЛАДНА', caption: '$120000' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$100' }
		],
		caption: `В елітному районі. Сімейний лікар. Дитячий садок біля будинку.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 5,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '-' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'Дроблення 2:1' },
			{ title: null, caption: null }
		],
		caption: 'Зростання частки компанії на агроринку призвело до дроблення акцій.',
		subCaption: 'Кожен власник акцій AFC <b>подвоює їхню кількість</b> (загальна вартість не змінюється).',
		isSellAble: false
	},	
	{
		id: 6,
		type: smallAgreementTypes.LAND_PLOT,
		name: 'Продається земельна ділянка',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$5000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Продається 10 акрів землі далеко від мегаполісу. Гори, ліс, озеро. Відсутність інфраструктури.
			ROI 0%, у майбутньому можна продати.`,
		subCaption: 'Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 7,
		type: smallAgreementTypes.COLLECTION,
		name: 'Рідісні золоті монети',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$5000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `На ринку нумізматів ти знайшов рідкісні золоті монетию викарбувані Іспанським
			Королівський монетним двором Філіпа ІІ у 1576 році за ціною <b>$500</b> за штуку.`,
		subCaption: 'Прогнозують продаж через пару років за кожну монету до <b>$5000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 8,
		type: smallAgreementTypes.EVENT,
		name: 'Малий бізнес розширюється',
		info: [],
		caption: `Ти вийшов на міжнародний ринок, що збільшило прибуток на 23%.`,
		subCaption: 'Кожен хто має малі бізнеси, збільшує свій ПД на <b>$450</b> за кожен такий бізнес.',
		isSellAble: false
	},	
	{
		id: 9,
		type: smallAgreementTypes.DEPOSIT_SERTIFICAT,
		name: 'Депозитний сертифікат ДС',
		info: [
			{ title: 'КОД ЦП', caption: 'ДС' },
			{ title: 'КОТИРУВАННЯ', caption: '$5000' },
			{ title: 'ДИВІДЕНДИ', caption: '4.8%' },
			{ title: 'ДОХІД', caption: '$20' }
		],
		caption: `Провідний американський банк пропонує цей депозитний сертифікат екстренного випуску
			своїм клієнтам. Гарантований відсоток та викуп після будь-якого періоду володіння`,
		subCaption: 'Кожен може купувати та продавати будь-яку кількість у будь-який час до кінця гри.',
		isSellAble: false
	},
	{
		id: 10,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$65000' },
			{ title: 'ЗАКЛАДНА', caption: '$60000' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$160' }
		],
		caption: `Гарна трикімнатна квартира, що здається в оренду, несподівана відмова від прав власності.
			Лофт, у хорошому стані, з орендарями`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},	
	{
		id: 11,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$50000' },
			{ title: 'ЗАКЛАДНА', caption: '$46000' },
			{ title: 'ЗАВДАТОК', caption: '$4000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$200' }
		],
		caption: `Спальний район. З чудовим ремонтом. На сайтах продажу нерухомості просочилася інформація про те, що
			обіцяне забудовником покупцям квартир метро буде збудовано з 10 років.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},	
	{
		id: 12,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції Robotics Corporation RC',
		info: [
			{ title: 'КОД ЦП', caption: 'RC' },
			{ title: 'КОТИРУВАННЯ', caption: '$5' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: 'Висока інфляція спричинила падіння курсу акцій.',
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 13,
		type: smallAgreementTypes.STARTUP,
		name: 'Започаткуй малий бізнес',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$5000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Створи стартап Content Plan платформу для планування та публікації контенту в соціальних
			мережах. Використовуй нові маркетингові технології`,
		subCaption: 'Доходів спочатку немає, але і додаткових вкладень не потрібно. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},	
	{
		id: 14,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$30' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: `Проект збільшення вартості передплати з додатковими функціями для передплатників MSH
			посилило позиції компанії на ринку`,
		subCaption: 'Тільки ти можеш купити факції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 15,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$50000' },
			{ title: 'ЗАКЛАДНА', caption: '$50000' },
			{ title: 'ЗАВДАТОК', caption: '$0' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '-$100' }
		],
		caption: `Квартира в старому районі. Пропозиція від Фонду державного майна. Жодної пропозиції
			за тиждень. Спад на ринку нерухомості.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 16,
		type: smallAgreementTypes.ACTIONS,
		name: 'Привілейовані акції ACB',
		info: [
			{ title: 'КОД ЦП', caption: 'ACB' },
			{ title: 'КОТИРУВАННЯ', caption: '$1200' },
			{ title: 'ДИВІДЕНДИ', caption: '$10' },
			{ title: 'ДОХІД', caption: '$10' }
		],
		caption: `Привілейовані акції великих американських банків. Велика прибутковість за привілейованими акціями.
			Стабільний прибуток у неспокійні часи.`,
		subCaption: 'Кожен може купити чи продати. Будь-яка кількість цінних паперів зараз.',
		isSellAble: false
	},	
	{
		id: 17,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$30' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `Лідер сільськогосподарської галузі з вирощування зернових культур:
			кукурудза, соя, пшениця, жито.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 18,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$50' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `Доступ до інноваційного насіння та сільськогосподарських рішень призвели до збільшення
			продажів за рік на 12,7%.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 19,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$20' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: 'Зростання частки ринку медіахолдингу призвело до збільшення вартості акції компанії.',
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},	
	{
		id: 20,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 2-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$40000' },
			{ title: 'ЗАКЛАДНА', caption: '$35000' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$220' }
		],
		caption: `У робочому районі з розвиненою інфраструктурою. Вікна квартири виходять на
			завод із виробництва шлакоблоків.`,
		subCaption: 'Зможеш продати від <b>$45000</b> до <b>$65000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 21,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції Robotics Corporation RC',
		info: [
			{ title: 'КОД ЦП', caption: 'RC' },
			{ title: 'КОТИРУВАННЯ', caption: '$30' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption:  `Зниження відсоткових ставок пожвавило біржовий ринок.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 22,
		type: smallAgreementTypes.ACTIONS,
		name: 'Привілейовані акції ACB',
		info: [
			{ title: 'КОД ЦП', caption: 'ACB' },
			{ title: 'КОТИРУВАННЯ', caption: '$1200' },
			{ title: 'ДИВІДЕНДИ', caption: '$10' },
			{ title: 'ДОХІД', caption: '$10' }
		],
		caption: `Привілейовані акції великих американських банків. Велика прибутковість за привілейованими акціями.
			Стабільний прибуток у неспокійні часи.`,
		subCaption: 'Кожен може купити чи продати. Будь-яка кількість цінних паперів зараз.',
		isSellAble: false
	},
	{
		id: 23,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '-' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'КОНСОЛІДАЦІЯ 1:2' },
			{ title: null, caption: null }
		],
		caption: `Насіння гібридів соняшнику та кукурудзи 20% засіяних цього сезону не принесло врожаю. Усі акціонери
			втрачають половину своїх прав влансності.`,
		subCaption: 'Кожен власник акцій AFC <b>втрачає половину</b> (загальна вартість не змінюється).',
		isSellAble: false
	},
	{
		id: 24,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$8' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: `Модернізація обладнання пройшла непродуктивно і пішов відтік клієнтів.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 25,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '-' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ДРОБЛЕННЯ 2:1' },
			{ title: null, caption: null }
		],
		caption: `Світовий ринок e-Commerce збільшився на 27,9%. WMT приймає рішення щодо дробнення своїх вкцій.`,
		subCaption: 'Кожен власник акцій WMT <b>подвоює їх кількість</b> (загальна вартість не змінюється).',
		isSellAble: false
	},
	{
		id: 26,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 2-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$60000' },
			{ title: 'ЗАКЛАДНА', caption: '$55000' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '-$100' }
		],
		caption: `Квартира продається за студентською програмою без ремонту у старому будинку біля метро.`,
		subCaption: 'Зможеш продати від <b>$45000</b> до <b>$65000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 27,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$10' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: `Провал запуску нового телеканалу спричинив паління курсу акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 28,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$8' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Висока інфляція спричинила падіння курсу акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 29,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції Robotics Corporation RC',
		info: [
			{ title: 'КОД ЦП', caption: 'RC' },
			{ title: 'КОТИРУВАННЯ', caption: '$10' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Роботизовані технології не принесли зростання прибутку компанії.
			Падіння вартості акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 30,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 2-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$55000' },
			{ title: 'ЗАКЛАДНА', caption: '$50000' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$160' }
		],
		caption: `Квартира в старому будинку без ліфта. Продавці - пара, яка чекає на поповнення в сім'ї.`,
		subCaption: 'Зможеш продати від <b>$45000</b> до <b>$65000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 31,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції Robotics Corporation RC',
		info: [
			{ title: 'КОД ЦП', caption: 'RC' },
			{ title: 'КОТИРУВАННЯ', caption: '$20' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Заміна керівника. Новий Голова корпорації був провідним аналітиком. Чиказької фондової
			біржі 4 роки. Акціонери роблять на нього великі ставки.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 32,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 2-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$50000' },
			{ title: 'ЗАКЛАДНА', caption: '$45000' },
			{ title: 'ЗАВДАТОК', caption: '$5000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$100' }
		],
		caption: `Гарна двокімнатна квартира, продається за програмою Підтримка молодих сімей. Потрібен ремонт.
			Поганий район.`,
		subCaption: 'Зможеш продати від <b>$45000</b> до <b>$65000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 33,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 2-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$40000' },
			{ title: 'ЗАКЛАДНА', caption: '$36000' },
			{ title: 'ЗАВДАТОК', caption: '$4000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$140' }
		],
		caption: `Батьки продають квартиру, в якій жив їх син під час навчання у міському коледжі. В районі 
			є попит на житло, що здається.`,
		subCaption: 'Зможеш продати від <b>$45000</b> до <b>$65000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 34,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$35000' },
			{ title: 'ЗАКЛАДНА', caption: '$33000' },
			{ title: 'ЗАВДАТОК', caption: '$2000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$220' }
		],
		caption: `Актив із комерційної нерухомості переведення до житлового фонду.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 35,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$30' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: `Проект збільшення вартості пердплати з додатковими функціями для переплатників MSH посилило позиції 
			компанії на ринку.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 36,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$5' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: `Падіння рейтингів основного телеканалу холдингу. Потрібні системні інвестиції.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 37,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$50000' },
			{ title: 'ЗАКЛАДНА', caption: '$50000' },
			{ title: 'ЗАВДАТОК', caption: '$0' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$100' }
		],
		caption: `Власник не зміг сплатити кредит за квартиру. На новому власнику заборгованість із комунальних послуг 
			за 9 місяців. Квартира без ремонту.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{		
		id: 38,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$40' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `За прогнозами INFOline продаж непродовольчих товарів (e-commerce) збільшиться в 3 рази. 
			Біржовий бум!`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 39,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '-' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'КОНСОЛІДАЦІЯ 1:2' },
			{ title: null, caption: null }
		],
		caption: `Збитки у зв'язку з заволодінням інтелектуальною власністю правовласника. Акціонери втрачають половину прав власності.`,
		subCaption: 'Кожен, хто володіє акціями WMT <b>втрачає половину</b> (загальна вартість не змінюється).',
		isSellAble: false
	},
	{		
		id: 40,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$40' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `Добрий врожай. Міцна позиція на ринку.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 41,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$5' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Висока інфляція спричинила падіння курсу акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 42,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$10' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Віруси та шкідливі програми завдали шкоди репутації WMT і призвели до зниження 
			курсової вартості акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 43,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$5' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `Відсоткові ставки завдали удару по цінах на акції агрохолдингу, що спеціалізується на вирощуванні зернових культур.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 44,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$1' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `Сільськогосподарська катастрофа! Нечувана посуха призвела до втрати прогнозованого врожаю.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 45,
		type: smallAgreementTypes.STARTUP,
		name: 'Започаткуй малий бізнес',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$3000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$3000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Ти створив цех із пошиття одягу для тінейджерів. Термін окупності 1 рік. Надалі за ефективного управління тобою 
			бізнес приноситиме дохід.`,
		subCaption: 'Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 46,
		type: smallAgreementTypes.STARTUP,
		name: 'Перспективний блокчей-проект',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$1600' },
			{ title: 'РЕЄСТРАЦІЯ', caption: '$400' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' },
			{ title: null, caption: null }
		],
		caption: `Ти можеш стати засновником перспективного блокчейн-проекту із залученням капіталу на 
			новий криптопроект на Launchpad для подальшої розробки та запуску. Кожен із гравців може стати інвестором, 
			заплативши по <b>$300</b> його засновнику. Надалі можливий приріст капіталу.`,
		subCaption: 'Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 47,
		type: smallAgreementTypes.DEPOSIT_SERTIFICAT,
		name: 'Депозитний сертифікат ДС',
		info: [
			{ title: 'КОД ЦП', caption: 'ДС' },
			{ title: 'КОТИРУВАННЯ', caption: '$4000' },
			{ title: 'ДИВІДЕНДИ', caption: '6%' },
			{ title: 'ДОХІД', caption: '$20' }
		],
		caption: `Провідний американський банк пропонує цей депозитний сертифікат екстренного випуску
			своїм клієнтам. Гарантований відсоток та викуп після будь-якого періоду володіння.`,
		subCaption: 'Кожен може купувати та продавати будь-яку кількість у будь-який час до кінця гри.',
		isSellAble: false
	},
	{
		id: 48,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції Robotics Corporation RC',
		info: [
			{ title: 'КОД ЦП', caption: 'RC' },
			{ title: 'КОТИРУВАННЯ', caption: '$30' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Зниження відсоткових ставок пожвавило біржовий ринок, що призвело до зростання вартості акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 49,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$15' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Новий лідер компанії запровадив стратегічні інструменти щодо підвищення курсової вартості акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 50,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$20' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Зростання кількості онлайн-покупок принесло додатковий дохід від електронної торгівлі.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 51,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції MediaStar Holding MSH',
		info: [
			{ title: 'КОД ЦП', caption: 'MSH' },
			{ title: 'КОТИРУВАННЯ', caption: '$35' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $10 до $30' },
			{ title: null, caption: null }
		],
		caption: `Власний виробничий комплекс збільшив дохід компанії, що збільшило вартість акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{		
		id: 52,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$20' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: `За рахунок залучення дрібних землевласників відбулося розширення території та зростання цін на акції AFC.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},	
	{
		id: 53,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$50000' },
			{ title: 'ЗАКЛАДНА', caption: '$47000' },
			{ title: 'ЗАВДАТОК', caption: '$3000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$100' }
		],
		caption: `Власниця квартири їде терміново жити на інший континент. Розпродає майно за низькою ціною.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{
		id: 54,
		type: smallAgreementTypes.FLAT,
		name: 'Продається 3-кімнатна квартира',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$45000' },
			{ title: 'ЗАКЛАДНА', caption: '$43000' },
			{ title: 'ЗАВДАТОК', caption: '$2000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$250' }
		],
		caption: `Соціальна квартира, що звільнилася після багатодітної родини. Потрібен капітальний ремонт.`,
		subCaption: 'Зможеш продати від <b>$65000</b> до <b>$135000</b>. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{		
		id: 55,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$35' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Посилення ринку веде до зростання курсової вартості акцій.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},	
	{
		id: 56,
		type: smallAgreementTypes.EVENT,
		name: 'Аварія електромереж',
		info: [],
		caption: `Енергетики виявили розрив електромережі в котеджах на 2 (К-2) та 4 (К-4) сім'ї.`,
		subCaption: `Сплатіть $1000 за ремонт по кожному об'єкту.`,
		isSellAble: false
	},	
	{
		id: 57,
		type: smallAgreementTypes.LAND_PLOT,
		name: 'Продається земельна ділянка',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$20000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$20000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Продається 20 акрів вільної землі, одним шматком. У майбутньому можливий гарний прибуток 
			під час його продажу по частинам. ROI 0% можна продати.`,
		subCaption: 'Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},	
	{
		id: 58,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$15' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: 'Зниження інфляції підвищує курсову вартість акцій лідера авторинку.',
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 59,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції AgroFuture Company AFC',
		info: [
			{ title: 'КОД ЦП', caption: 'AFC' },
			{ title: 'КОТИРУВАННЯ', caption: '$8' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $40' },
			{ title: null, caption: null }
		],
		caption: 'Очікування інфляції спричинило зниження курсової вартості акцій на ринку.',
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 60,
		type: smallAgreementTypes.STARTUP,
		name: 'Бойфрент/подруга просить позичити гроші в борг',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$4000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$4000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Хоче відкрити авіаконсьєрж сервіс. Просить $4000 на бізнес. Обіцяє повернути <b>$8000</b>
			 з річного прибутку.`,
		subCaption: 'Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},
	{		
		id: 61,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції WebMarket Trading WMT',
		info: [
			{ title: 'КОД ЦП', caption: 'WMT' },
			{ title: 'КОТИРУВАННЯ', caption: '$1' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: `Паніка на біржі! Хакерські атаки призвели до рекордного падіння цін на акції WMT.`,
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 62,
		type: smallAgreementTypes.ACTIONS,
		name: 'Акції Robotics Corporation RC',
		info: [
			{ title: 'КОД ЦП', caption: 'RC' },
			{ title: 'КОТИРУВАННЯ', caption: '$40' },
			{ title: 'БЕЗ ДИВІДЕНТІВ (ROI 0%)', caption: 'ЦІНА ПРОДАЖУ: ВІД $5 до $30' },
			{ title: null, caption: null }
		],
		caption: 'Зростання фондових показників. Ціни досягли рекордного рівня.',
		subCaption: 'Тільки ти можеш купити акції за цією ціною. Кожен може продати акції за цією ціною.',
		isSellAble: false
	},
	{
		id: 63,
		type: smallAgreementTypes.EVENT,
		name: 'Малий бізнес розширюється',
		info: [],
		caption: `Твій бізнес отримав визнання на галузевій виставці в Ганновері за нову розробку, що 
			призвело до збільшення покупців продукції в країнах Європи та створення дистриб'юторської мережі.`,
		subCaption: 'Кожен хто має власні малі бізнеси, збільшує свій ПД на <b>$250</b> за кожен такий бізнес.',
		isSellAble: false
	},
	{
		id: 64,
		type: smallAgreementTypes.COLLECTION,
		name: 'Продається колекція картин',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$500' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$500' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Збанкрутілий онук знаменитого художника розпродає роботи, що дісталися йому у спадок. Ціна 
			<b>$500</b> за кожну картину. Можете придбати будь-яку кількість робіт.`,
		subCaption: 'ROI 0%, зможеш продати від <b>$1000</b> до <b>$30000</b> за кілька років. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},	
	{
		id: 65,
		type: smallAgreementTypes.COLLECTION,
		name: 'Золота інвестеційна монета',
		info: [
			{ title: 'ВАРТІСТЬ', caption: '$3000' },
			{ title: 'ЗАКЛАДНА', caption: '$0' },
			{ title: 'ЗАВДАТОК', caption: '$3000' },
			{ title: 'ПАСИВНИЙ ДОХІД', caption: '$0' }
		],
		caption: `Золоті інвестиційні монети США Білоголовий Орлан 10 шт. продаються анонімним нумізматом 
			нижче їх реальної вартості - <b>$300</b> за штуку.`,
		subCaption: 'Терплячий зможе продати дорожче. Використай шанс сам або продай іншому гравцю.',
		isSellAble: true
	},	
	{
		id: 66,
		type: smallAgreementTypes.EVENT,
		name: 'Збитки у власників малого бізнесу',
		info: [],
		caption: `Заощадив гроші. Бухгалтер компанії поєднував дві посади. Вів бухгалтерський та 
			фінансовий облік.`,
		subCaption: 'Фінансові втрати для всіх власників малого бізнесу <b>$700</b>.',
		isSellAble: false
	}
];