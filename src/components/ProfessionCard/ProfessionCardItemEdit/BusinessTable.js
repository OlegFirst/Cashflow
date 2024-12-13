import { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import RemoveButton from '../../../_commonComponents/RemoveButton/RemoveButton';
import InputComponentWrapper from './InputComponentWrapper';

import { 
	getObjectValue,
	BusinessTable as BusinessTableClass
} from '../../../common/utils';
import { updateActionsTableItems } from '../utils';
import { itemStatuses } from '../constants';
import './index.scss';

const BusinessTable = (props) => {
	const { 
		currentData: {
			valueList,
			total
		},
		newItemId
	} = props;
	
	// onBlur
	const onBlurHandler = newValue => {		
		const data = updateActionsTableItems(newValue, valueList);
		
		props.onUpdate({
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
			...BusinessTableClass.preparation(newId)[0],
			status: itemStatuses.INSERTED
		};
		
		props.onUpdate({
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
						<th>Завдаток</th>
						<th>Вартість</th>
						<th>Застава</th>
						<th>Дохід</th>
					</tr>
				</thead>
				
				<tbody>
					{valueList.map((item, index) => {
						const { id, name, deposit, price, bail, income, status } = item;
						
						if (status === itemStatuses.REMOVED) {
							return null;
						}
						
						return (
							<tr key={id}>
								<td>
									<InputComponentWrapper
										id={id}
										name={'name'}
										value={name}
										onBlur={onBlurHandler}
									/>
								</td>
							
								<td>
									<InputComponentWrapper
										id={id}
										name={'deposit'}
										value={deposit}
										onBlur={onBlurHandler}
									/>
								</td>
								
								<td>
									<InputComponentWrapper
										id={id}
										name={'price'}
										value={price}
										onBlur={onBlurHandler}
									/>
								</td>
								
								<td>
									<InputComponentWrapper
										id={id}
										name={'bail'}
										value={bail}
										onBlur={onBlurHandler}
									/>
								</td>
								
								<td className='two-columns-table__row-item'>
									<InputComponentWrapper 
										id={id}
										name={'income'}
										value={income}
										onBlur={onBlurHandler}
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
									name={'total'}
									value={total}
									onBlur={onBlurTotalHandler}
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

export default BusinessTable;