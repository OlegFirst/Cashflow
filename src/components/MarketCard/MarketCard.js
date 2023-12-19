import Card from 'react-bootstrap/Card';

import { marketCardList } from './market-card-list';
import './market-card.scss';

const MarketCard = ({ id }) => {
	const marketItem = marketCardList.find(item => item.id === id);
	
	const { 
		name,
		info,
		caption,
		subCaption
	} = marketItem;
	
	return (
		<section className='market-card'>
			<Card>
				<Card.Body>
					<Card.Title>
						<div className='market-card__title'>
							{name}
						</div>
					</Card.Title>
					
					<div className='market-card__content content'>
						<p 
							className='content__info'
							dangerouslySetInnerHTML={{__html: info }} 
						/>
					
						<p
							className='content__caption'
							dangerouslySetInnerHTML={{__html: caption }} 
						/>
						
						<p
							className='content__sub-caption mt-4'
							dangerouslySetInnerHTML={{__html: subCaption }}
						/>
					</div>
				</Card.Body>
			</Card>
		</section>
	)
};

export default MarketCard;