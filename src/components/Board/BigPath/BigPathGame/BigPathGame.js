import { useSelector } from 'react-redux';

import BigPathItem from '../BigPathItem/BigPathItem';
import Fishka from '../../../../_commonComponents/Fishka/Fishka';

import { fishkaStepProcess } from '../../../Game/constants';
import './big-path-game.scss';

const BigPathGameOwner = (props) => {	
	const userModel = useSelector(state => state.userModel);
	
	return (
		<div className='big-path-game'>
			<ul className='big-path-game__items'>
				{userModel.board.bigPathStyled.map(item => {
					return (
						<BigPathItem 
							key={item.id}
							{ ...item }
							isGame={true}
							onClick={props.onClick}
						/>
					)
				})}
			</ul>
			
			{!userModel.info.isSmallPath && (
				<Fishka
					color={userModel.info.color}
					coordinates={userModel.info.coordinates}
					isSelected={userModel.board.fishkaStepProcessValue === fishkaStepProcess.IN_PROGRESS}
					onClick={props.onFishkaClick}
				/>
			)}
		</div>
	)
};

export default BigPathGameOwner;