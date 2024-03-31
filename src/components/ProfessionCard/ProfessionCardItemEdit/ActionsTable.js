import { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import RemoveButton from '../../../_commonComponents/RemoveButton/RemoveButton';
import InputComponentWrapper from './InputComponentWrapper';

import {
	getObjectValue,
	ActionsTable as ActionsTableClass,
	professionCardTotalValidation
} from '../../../common/utils';
import { professionCardInputNames } from '../../../common/constants';
import { 
	updateActionsTableItems, 
	getErrorMessage
} from '../utils';
import { itemStatuses } from '../constants';
import './index.scss';


const ActionsTable = (props) => {
	const { 
		currentData: {
			valueList,
			total
		},
		errorMessageList,
		errorTotalMessage,
		newItemId,
		isUpdated
	} = props;
	
	// onBlur
	const onBlurHandler = newValue => {
		const data = updateActionsTableItems(newValue, valueList);
		
		props.onUpdate({
			type: 'ACTION_TABLE',
			newValueList: data,
			newItemId
		});
	};
	
	// onBlurTotal
	const onBlurTotalHandler = newTotal => {
		props.onTotalUpdate(newTotal);
	};
	
	// onInsert
	const onInsertNewRow = () => {
		const newId = 'new_' + newItemId;
		
		const newValueListItem = {
			...ActionsTableClass.preparation(newId)[0],
			status: itemStatuses.INSERTED
		};
		
		props.onUpdate({
			type: 'ACTION_TABLE',
			newValueList: [ ...valueList, newValueListItem ],
			newItemId: newItemId + 1
		});
	};
	
	// onRemove
	const onRemove = id => {
		props.onRemove(id);
	};
		
	return (
		<div className='actions-table'>
			<Table bordered hover size='sm'>
				<thead>
					<tr>
						<th>Назва</th>
						<th>Кількість</th>
						<th>Ціна</th>
						<th>Вартість</th>
						<th>Дохід</th>
						<th />
					</tr>
				</thead>
				
				<tbody>
					{valueList.map((item, index) => {
						const { id, name, count, price, cost, income, status } = item;
						
						if (status === itemStatuses.REMOVED) {
							return null;
						}
						
						const rowMessageList = errorMessageList.find(item => item.id === id)?.data;
						
						return (
							<tr key={id}>
								<td>
									<InputComponentWrapper
										id={id}
										name={professionCardInputNames.NAME}
										value={name}
										onBlur={onBlurHandler}
										errorMessage={getErrorMessage(professionCardInputNames.NAME, rowMessageList)}
									/>
								</td>
							
								<td>
									<InputComponentWrapper
										id={id}
										name={professionCardInputNames.COUNT}
										value={count}
										onBlur={onBlurHandler}
										errorMessage={getErrorMessage(professionCardInputNames.COUNT, rowMessageList)}
									/>
								</td>
								
								<td>
									<InputComponentWrapper
										id={id}
										name={professionCardInputNames.PRICE}
										value={price}
										onBlur={onBlurHandler}
										errorMessage={getErrorMessage(professionCardInputNames.PRICE, rowMessageList)}
									/>
								</td>
								
								<td>
									<InputComponentWrapper
										id={id}
										name={professionCardInputNames.COST}
										value={cost}
										onBlur={onBlurHandler}
										errorMessage={getErrorMessage(professionCardInputNames.COST, rowMessageList)}
									/>
								</td>
								
								<td className='two-columns-table__row-item'>
									<InputComponentWrapper 
										id={id}
										name={professionCardInputNames.INCOME}
										value={income}
										onBlur={onBlurHandler}
										errorMessage={getErrorMessage(professionCardInputNames.INCOME, rowMessageList)}
									/>
								</td>
									
								<td>
									<div className='two-columns-table__remove-button'>
										<RemoveButton onClick={() => onRemove(id)} />
									</div>
								</td>
							</tr>
						)
					})}
					
					{valueList.length > 0 && (
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td className='actions-table__total-title'>Разом: </td>
							<td className='actions-table__total'>
								<InputComponentWrapper 
									id={0}
									name={professionCardInputNames.TOTAL}
									value={total}
									onBlur={onBlurTotalHandler}
									errorMessage={errorTotalMessage}
									isSelected={true}
								/>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			
			<Button
				variant='outline-secondary'
				size='sm'
				onClick={onInsertNewRow}
			>
				Новий рядок
			</Button>
		</div>
	)
};

export default ActionsTable;