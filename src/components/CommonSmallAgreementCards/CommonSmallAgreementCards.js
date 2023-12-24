import AgreementCard from '../AgreementCard/AgreementCard';

import { cardTypes } from '../../common/constants';
import './common-small-agreement-cards.scss';

const CommonSmallAgreementCards = ({ idList }) => {
	if (idList.length === 0) {
		return null;
	}
	
	return (
		<section className='common-small-agreement-cards'>
			<ul className='common-small-agreement-cards__items'>
				{idList.map(cardId => (
					<li 
						className='common-small-agreement-cards__item'
						key={cardId}
					>
						<AgreementCard 
							cardId={cardId}
							isCommonSmallAgreementCards={true}
						/>
					</li>
				))}
			</ul>
		</section>
	)
};

export default CommonSmallAgreementCards;