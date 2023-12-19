import SmallPathGame from './SmallPathGame/SmallPathGame';
import SmallPathGameOwner from './SmallPathGameOwner/SmallPathGameOwner';
import FishkaView from '../FishkaView/FishkaView';

import { pathTypes } from '../../../common/constants';
import './small-path.scss';

const SmallPath = (props) => {
	const {
		gameRequestQueryGeneral: {
			userId
		},
		isGame,
		waitingData
	} = props;
	
	return (
		<div className='small-path'>
			{isGame
				? <SmallPathGame { ...props } />
			
				: <SmallPathGameOwner { ...props } />
			}
			
			<FishkaView
				userId={userId}
				isGame={isGame}
				pathType={pathTypes.SMALL_PATH}
				waitingData={waitingData}
			/>
			
			<img
				className='small-path__start-image'
				src={'images/arrow.png'}
				alt='start-image'
			/>
			
			<div className='small-path__logo-wrapper'>
				<img
					className='small-path__logo'
					src={'images/logo.png'}
					alt='logo-image'
				/>
			</div>
		</div>
	)
};

export default SmallPath;