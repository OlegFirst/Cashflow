import Card from 'react-bootstrap/Card';

import { moneyInTheWindCardList } from './money-in-the-wind-card-list';
import './money-in-the-wind-card.scss';

const MoneyInTheWindCard = ({ id }) => {
	const item = moneyInTheWindCardList.find(item => item.id === id);
	
	const { 
		name,
		info,
		caption
	} = item;
	
	return (
		<section className='money-in-the-wind-card'>
			<Card>
				<Card.Body>
					<Card.Title>
						<div className='money-in-the-wind-card__title'>
							{name}
						</div>
					</Card.Title>
					
					<div className='money-in-the-wind-card__content content'>
						<p 
							className='content__info'
							dangerouslySetInnerHTML={{__html: info }} 
						/>
					
						<p
							className='content__caption'
							dangerouslySetInnerHTML={{__html: caption }} 
						/>
					</div>
				</Card.Body>
			</Card>
		</section>
	)
};

export default MoneyInTheWindCard;