import Fishka from '../../../_commonComponents/Fishka/Fishka';

import { fishkaTranslateX, pathTypes } from '../../../common/constants';
import './fishka-view.scss';

// Show all fishkas except Gamer fishka

const FishkaView = (props) => {
	const {
		userId,
		isGame,
		pathType,
		waitingData
	} = props;
	
	return (
		<ul className='fishka-view'>
			{waitingData.fishkaPositions.map((item, index) => {
				const { color, gamerId, isSmallPath, coordinates } = item;
				
				const isGamerFishka = isGame && userId === gamerId;
				const isPathMatched = 
					isSmallPath && pathType === pathTypes.SMALL_PATH ||
					!isSmallPath && pathType === pathTypes.BIG_PATH;
				
				if (isGamerFishka || !isPathMatched) {
					return null;
				}
				
				return (
					<li 
						key={gamerId}
						className='fishka-view__item'
					>
						<Fishka 
							color={color}
							coordinates={coordinates}
							translateX={fishkaTranslateX * (index + 1)}
						/>
					</li>
				)
			})}
		</ul>
	)
};

export default FishkaView;