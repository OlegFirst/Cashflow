import { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import RemoveButton from '../../../_commonComponents/RemoveButton/RemoveButton';
import InputComponentWrapper from './InputComponentWrapper';

import { 
	getObjectValue,
	BuyedDreamsTable as BuyedDreamsTableClass,
} from '../../../common/utils';
import { updateActionsTableItems } from '../utils';
import { itemStatuses } from '../constants';
import './index.scss';

const BuyedDreamsTable = (props) => {
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
			...BuyedDreamsTableClass.preparation(newId)[0],
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
		<div className='arithmetic-table'>
			<Table bordered hover size='sm'>
				<thead>
					<tr>
						<th>Мрії</th>
						<th>Вартість</th>
						<th />
					</tr>
				</thead>
				
				<tbody>
					{valueList.map((item, index) => {
						const { id, name, price, status } = item;
						
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
								
								<td className='arithmetic-table__row-item'>
									<InputComponentWrapper 
										id={id}
										name={'price'}
										value={price}
										onBlur={onBlurHandler}
									/>
								</td>
									
								<td>
									<div className='arithmetic-table__remove-button'>
										<RemoveButton onClick={() => onRemove(id)} />
									</div>
								</td>
							</tr>
						)
					})}
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

export default BuyedDreamsTable;