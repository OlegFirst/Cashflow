import InputBlock from  '../InputBlock/InputBlock';

import { getObjectValue } from '../../../common/utils';
import './profession-card-rest.scss';

const ProfessionCardRest = (props) => {
	const { profession } = props;
	
	return (
		<div className='profession-card-rest'>
			<div className='profession-card-rest__row-1 .row-1'>
				<div className='row-1__grey-line' />
			
				<div className='row-1__left left'>
					<h5 className='left__title'>Активи</h5>
					
					<h5 className='left__sub-title'>Заощадження</h5>
					
					<div className='left__value'>$ {getObjectValue('assets.savings', profession)}</div>
				</div>
				
				<div className='row-1__right right'>
					<h4 className='right__title'>Пасиви в кредит</h4>
					
					<ul className='right__items'>
						<li className='right__item item'>
							<div className='item__title'>Іпотека</div>
							<div className='item__value'>
								<InputBlock value={getObjectValue('creditLiabilities.mortage', profession)} />
							</div>
						</li>
						
					<li className='right__item item'>
							<div className='item__title'>Позика на освіту</div>
							<div className='item__value'>
								<InputBlock value={getObjectValue('creditLiabilities.educationLoan', profession)} />
							</div>
						</li>
						
						<li className='right__item item'>
							<div className='item__title'>Кредит на автомобіль</div>
							<div className='item__value'>
								<InputBlock value={getObjectValue('creditLiabilities.carLoan', profession)} />
							</div>
						</li>
						
						<li className='right__item item'>
							<div className='item__title'>Кредитні картки</div>
							<div className='item__value'>
								<InputBlock value={getObjectValue('creditLiabilities.creditCards', profession)} />
							</div>
						</li>
						
						<li className='right__item item'>
							<div className='item__title'>Борг за роздрібні покупки</div>
							<div className='item__value'>
								<InputBlock value={getObjectValue('creditLiabilities.debtForRetailPurchases', profession)} />
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<div className='profession-card-rest__row-2 row-2'>
				<div className='row-2__blue-line' />
				
				<div className='row-2__title'>
					<h4>Витрати на одну дитину</h4>
					
					<p>(на початку гри у всіх гравців 0 дітей)</p>
				</div>
				
				<div className='row-2__value'>
					<InputBlock value={getObjectValue('childExpenses', profession)} />
				</div>
			</div>
		</div>
	)
};

export default ProfessionCardRest;