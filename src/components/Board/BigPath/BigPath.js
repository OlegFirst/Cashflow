import BigPathGame from './BigPathGame/BigPathGame';
import BigPathGameOwner from './BigPathGameOwner/BigPathGameOwner';
import FishkaView from '../FishkaView/FishkaView';

import { pathTypes } from '../../../common/constants';
import './big-path.scss';

const BigPath = (props) => {
	const {
		gameRequestQueryGeneral: {
			userId
		},
		isGame,
		waitingData
	} = props;
	
	return (
		<div className='big-path'>
			{isGame
				? <BigPathGame { ...props } />
				
				: <BigPathGameOwner { ...props } />
			}
			
			<FishkaView
				userId={userId}
				isGame={isGame}
				pathType={pathTypes.BIG_PATH}
				waitingData={waitingData}
			/>
			
			<img
				className='big-path__start-image'
				src={'images/arrow.png'}
				alt='start-image'
			/>
		</div>
	)
};

export default BigPath;