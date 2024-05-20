import GamerCard from './GamerCard/GamerCard';

import { gamerWaitingDataProps } from '../utils';
import './gamer-cards.scss';

const GamerCards = (props) => {
	const {
		gamerList,
		gamerTurnData,
		waitingData
	} = props;
	
	return (
		<div className='gamer-cards'>
			<ul className='gamer-cards__items'>
				{gamerList.map(item => {					
					const gamerWaitingData = gamerWaitingDataProps(item.id, waitingData);
					
					return (
						<GamerCard
							key={item.id}
							item={item}
							gamerTurnData={item.id === gamerTurnData.gamerIdTurn ? gamerTurnData : null}
							gamerWaitingData={gamerWaitingData}
							onCalculationCards={props.onCalculationCards}
						/>
					)
				})}
			</ul>
		</div>
	)
};

export default GamerCards;