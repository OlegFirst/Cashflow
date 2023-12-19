import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

import { getTotal } from '../../ProfessionCard/utils';
import { professionCardTypes } from '../../ProfessionCard/constants';
import { calculationCardList } from '../constants';

const TableInfo = props => {
	const {
		userModel: {
			profession
		}
	} = props;
	
	return (
		<Table className='mt-4 bg-success' bordered hover size='sm'>
			<thead>
				<tr>
					<th className='bg-danger text-white'>Назва</th>
					<th className='bg-danger text-white'>Значення</th>
				</tr>
			</thead>
			<tbody>
				<tr className='bg-warning'>
					<td className='bg-warning text-white'>{calculationCardList[1].title}</td>
					<td className='bg-warning text-white'>{getTotal('incomes.passiveIncome', professionCardTypes.ARITHMETIC, profession)}</td>
				</tr>
				
				<tr>
					<td className='bg-warning text-white'>{calculationCardList[2].title}</td>
					<td className='bg-warning text-white'>{getTotal('expenses.childrenExpenses', professionCardTypes.ARITHMETIC, profession)}</td>
				</tr>
				
				<tr>
					<td className='bg-warning text-white'>{calculationCardList[4].title}</td>
					<td className='bg-warning text-white'>{getTotal('expenses.totalExpenses', professionCardTypes.ARITHMETIC, profession)}</td>
				</tr>
				
				<tr>
					<td className='bg-warning text-white'>{calculationCardList[5].title}</td>
					<td className='bg-warning text-white'>{getTotal('moneyFlow', professionCardTypes.ARITHMETIC, profession)}</td>
				</tr>
				
				<tr>
					<td className='bg-warning text-white'>{calculationCardList[6].title}</td>
					<td className='bg-warning text-white'>{getTotal('cash', professionCardTypes.ARITHMETIC, profession)}</td>
				</tr>
				
				<tr>
					<td className='bg-warning text-white'>{calculationCardList[7].title}</td>
					<td className='bg-warning text-white'>{getTotal('expenses.creditCardsExpenses', professionCardTypes.ARITHMETIC, profession)}</td>
				</tr>
			</tbody>
		</Table>
	)
};

export default TableInfo;