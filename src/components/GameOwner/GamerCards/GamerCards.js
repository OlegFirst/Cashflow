import GamerCard from './GamerCard/GamerCard';

import './gamer-cards.scss';

const GamerCards = (props) => {
	const {
		gamerList,
		gamerTurnData,
		charityActivatedTurnsLeft
	} = props;
	
	return (
		<div className='gamer-cards'>
			<ul className='gamer-cards__items'>
				{gamerList.map(item => {
					return (
						<GamerCard
							key={item.id}
							item={item}
							gamerTurnData={item.id === gamerTurnData.gamerIdTurn ? gamerTurnData : null}
							charityActivatedTurnsLeft={charityActivatedTurnsLeft}
						/>
					)
				})}
			</ul>
		</div>
	)
};

export default GamerCards;