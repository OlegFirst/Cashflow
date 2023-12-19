import { useSelector } from 'react-redux';

import ProfessionCard from '../../ProfessionCard/ProfessionCard';
import CalculationCards from '../CalculationCards';

import './calculation-cards-big-path.scss';

const CalculationCardsBigPath = (props) => {
	const bigPathCard = useSelector(state => state.bigPathCard);
	
	return (
		<CalculationCards 
			bgImage={'images/big-path-bg-3.jpg'}
			onCalculationCardsHide={props.onCalculationCardsHide}
		>
			<section className='calculation-cards-big-path'>
				<div className='calculation-cards-big-path__info'>
					<h1>Мрія: {bigPathCard.info.dream.title}</h1>
					
					<h2>Вартість мрії: {bigPathCard.info.dream.price}</h2>
				</div>
				
				<div className='calculation-cards-big-path__big-path-card-wrapper'>			
					<ProfessionCard />
				</div>
			</section>
		</CalculationCards>
	)
};

export default CalculationCardsBigPath;