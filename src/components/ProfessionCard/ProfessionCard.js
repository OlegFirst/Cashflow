import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalComponent from '../../_commonComponents/Modal/Modal';

import ProfessionCardItem from './ProfessionCardItem/ProfessionCardItem';
import InputBlock from  './InputBlock/InputBlock';
import ProfessionCardRest from './ProfessionCardRest/ProfessionCardRest';
import ProfessionCardItemEdit from './ProfessionCardItemEdit';

import { 
	parseKeyStringOfObject,
	getObjectValue
} from '../../common/utils';
import { userRoles } from '../../common/constants';
import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { networkStatuses } from '../../services/constants';
import { 
	changeProfessionCardItem,
	checkIsValueListEmpty
} from './utils';
import { 
	professionCardTypes,
	professionCardItemTypes,
	itemStatuses
} from './constants';
import './profession-card.scss';

const itemEditDataInitialState = {
	objKey: null,
	data: null,
	isTotalUpdated: false,
	newItemId: 1,
	isShow: false
};

const ProfessionCard = (props) => {
	// Storage
	const dispatch = useDispatch();
	const user = useSelector(state => state.info.user);
	const gameInfo = useSelector(state => state.info.game);
	const userModel = useSelector(state => state.userModel);
	const bigPathCard = useSelector(state => state.bigPathCard);
	
	const isSmallPath = userModel.info.isSmallPath;
	const profession = isSmallPath ? userModel.profession : bigPathCard.profession;
		
	const [itemEditData, setItemEditData] = useState(itemEditDataInitialState);
	
	const isDisabled = user.userRole !== userRoles['GAMER'];
	
	// Start editing ProfessionCard Item
	const onItemClick = data => {
		const valueList = getObjectValue(data.objKey, profession);
		
		setItemEditData(prevState => ({
			...prevState,
			objKey: data.objKey,
			data: {
				...data,
				valueList: valueList.map(item => ({ ...item, status: itemStatuses.DEFAULT })),
				total: data.total 
			},
			isShow: true
		}));
	};
	
	// Update	
	const onUpdate = ({ newValueList, newItemId }) => {		
		setItemEditData(prevState => ({
			...prevState,
			data: { ...prevState.data, valueList: newValueList },
			newItemId
		}));
	};
	
	// Remove
	const onRemove = id => {
		if (isDisabled) {
			return;
		}
		
		setItemEditData(prevState => ({
			...prevState,
			data: { 
				...prevState.data, 
				valueList: prevState.data.valueList.reduce((acc, item) => {
					if (item.id != id) {
						return acc.concat(item);
					}
					
					if (item.status === itemStatuses.INSERTED) {
						return acc;
					}
					
					return acc.concat({
						...item,
						status: itemStatuses.REMOVED
					})
				}, [])
			}
		}));
	};
	
	// Total value Update
	const onTotalUpdate = newTotal => {
		if (isDisabled) {
			return;
		}
		
		setItemEditData(prevState => ({
			...prevState,
			data: { ...prevState.data, total: newTotal.value },
			isTotalUpdated: true
		}));
	};
	
	const onPending = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
	};
	
	const onSuccess = () => {
		dispatch(setNetworkStatus(networkStatuses.SUCCESS));
	};
	
	const onFail = data => {
		dispatch(setNetworkStatus(networkStatuses.FAIL));
	};
	
	const callbacks = {
		onSuccess, onPending, onFail
	};
	
	// Submit
	const onModalSubmit = () => {
		if (isDisabled) {
			setItemEditData(prevState => itemEditDataInitialState);
			return;
		}
		
		const generalData = {
			userId: user.id,
			userRoleId: user.userRoleId,
			gameId: gameInfo.gameId,
			type: itemEditData.data.type,
			objKey: itemEditData.objKey,
			isTotalUpdated: itemEditData.isTotalUpdated
		};
		
		const data = {
			total: itemEditData.data.total,
			valueList: itemEditData.data.valueList
		};
		
		changeProfessionCardItem({ generalData, data }, { 
			...callbacks,
			onSuccess: data => {				
				props.getUserModel();
				onSuccess();
			}
		});
				
		setItemEditData(prevState => itemEditDataInitialState);
	};
	
	const onModalClose = () => {
		setItemEditData(prevState => itemEditDataInitialState);
	};
	
	useEffect(() => {		
		if (!itemEditData.data) {
			return;
		}
		
		if (checkIsValueListEmpty(itemEditData.data?.valueList)) {
			setItemEditData(prevState => ({
				...prevState,
				data: { ...prevState.data, total: 0 },
				isTotalUpdated: true
			}));
		}
	}, [itemEditData.data?.valueList]);
	
	return (
		<div className='profession-card'>
			<h3 className='profession-card__title'>{userModel.profession.info.professionName}</h3>
			
			{userModel.info.isSmallPath && (
				<>
					<div className='profession-card__incomes incomes'>
						<h4 className='incomes__title'>Доходи</h4>
						
						<ul className='incomes__items'>
							<ProfessionCardItem 
								title='Зарплата'
								profession={profession}
								objKey='incomes.salary'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>
							
							<ProfessionCardItem 
								title='Акції'
								profession={profession}
								objKey='incomes.actions'
								type={professionCardTypes.ACTIONS}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem 
								title='Нерухомість'
								profession={profession}
								objKey='incomes.realEstate'
								type={professionCardTypes.REAL_ESTATE}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem 
								title='Бізнеси'
								profession={profession}
								objKey='incomes.business'
								type={professionCardTypes.BUSINESS}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem
								title='Пасивний дохід'
								profession={profession}
								objKey='incomes.passiveIncome'
								type={professionCardTypes.ARITHMETIC}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem 
								title='Сукупні доходи'
								profession={profession}
								objKey='incomes.totalIncomes'
								type={professionCardTypes.ARITHMETIC}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
						</ul>					
						</div>
					
					<div className='profession-card__expenses expenses'>
						<h4 className='expenses__title'>Витрати</h4>
						
						<ul className='expenses__items'>
							<ProfessionCardItem 
								title='Податки'
								profession={profession}
								objKey='expenses.taxes'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>
							
							<ProfessionCardItem 
								title='Виплата відсотків по іпотеці'
								profession={profession}
								objKey='expenses.percentagesExpensesOfMortage'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>

							<ProfessionCardItem 
								title='Виплати по позиції на освіту'
								profession={profession}
								objKey='expenses.expensesByEducationPosition'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>

							<ProfessionCardItem 
								title='Виплати на автомобіль'
								profession={profession}
								objKey='expenses.carExpenses'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>

							<ProfessionCardItem 
								title='Витрати по кредитних картках'
								profession={profession}
								objKey='expenses.creditCardsExpenses'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>

							<ProfessionCardItem 
								title='Оплата за роздрібні покупки'
								profession={profession}
								objKey='expenses.retailPurchasesExpenses'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>

							<ProfessionCardItem 
								title='Інші витрати'
								profession={profession}
								objKey='expenses.otherExpenses'
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
							/>
							
							<ProfessionCardItem 
								title='Витрати на дітей'
								profession={profession}
								objKey='expenses.childrenExpenses'
								type={professionCardTypes.ARITHMETIC}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem 
								title='Загальні витрати'
								profession={profession}
								objKey='expenses.totalExpenses'
								type={professionCardTypes.ARITHMETIC}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
						</ul>
					</div>
					
					<div className='profession-card__moneyFlow moneyFlow'>
						<h4 className='moneyFlow__title'>Грошовий потік</h4>
						
						<ProfessionCardItem
							profession={profession}
							objKey='moneyFlow'
							type={professionCardTypes.ARITHMETIC}
							cardItemType={professionCardItemTypes.TWO_COLUMNS}
							active={true}
							onClick={onItemClick}
						 />
					</div>
						
					<div className='profession-card__moneyFlow moneyFlow mt-3'>
						<h4 className='moneyFlow__title'>Кеш</h4>
						
						<ProfessionCardItem
							profession={profession}
							objKey='cash'
							type={professionCardTypes.ARITHMETIC}
							cardItemType={professionCardItemTypes.TWO_COLUMNS}
							active={true}
							onClick={onItemClick}
						 />
					</div>
					
					<ProfessionCardRest 
						{...props}
						profession={profession}
					/>
				</>
			)}
			
			{!userModel.info.isSmallPath && (
				<>
					<div className='profession-card__big-path-card big-path-card'>
						<div className='big-path-card__title'/>
					
						<ul className='big-path-card__items'>
							<ProfessionCardItem 
								title='МРІЇ'
								profession={profession}
								objKey='buyedDreams'
								type={professionCardTypes.BUYED_DREAMS}
								cardItemType={professionCardItemTypes.ONE_COLUMN_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem 
								title='БІЗНЕС TA ГРОШОВИЙ ПОТІК'
								profession={profession}
								objKey='buyedBusiness'
								type={professionCardTypes.BUYED_BUSINESS}
								cardItemType={professionCardItemTypes.ONE_COLUMN_LIST}
								active={true}
								onClick={onItemClick}
							/>
							
							<ProfessionCardItem 
								title='Кеш'
								profession={profession}
								objKey='buyedCash'
								type={professionCardTypes.BUYED_CASH}
								cardItemType={professionCardItemTypes.TWO_COLUMNS_LIST}
								active={true}
								onClick={onItemClick}
							/>
						</ul>
					</div>
				</>
			)}
			
			<ModalComponent
				title={itemEditData.data?.title}
				isProgressBarShow={false}
				isShow={itemEditData.isShow}
				onSubmit={onModalSubmit}
				onClose={onModalClose}
			>
				<ProfessionCardItemEdit 
					currentData={itemEditData.data}
					newItemId={itemEditData.newItemId}
					onUpdate={onUpdate}
					onTotalUpdate={onTotalUpdate}
					onRemove={onRemove}
				/>
			</ModalComponent>
		</div>
	)
};

export default ProfessionCard;