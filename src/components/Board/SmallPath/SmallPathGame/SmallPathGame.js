import { useSelector } from 'react-redux';

import SmallPathItem from '../SmallPathItem/SmallPathItem';
import Fishka from '../../../../_commonComponents/Fishka/Fishka';

import { fishkaStepProcess } from '../../../Game/constants';

import {
	matchPathItemIsHovered
} from '../../utils';
import './small-path-game.scss';

const SmallPathGame = (props) => {	
	const userModel = useSelector(state => state.userModel);
	
	return (
		<div className='small-path-game'>		
			<ul className='small-path-game__items'>
				{userModel.board.smallPathStyled.map(item => {
					const { id } = item;
					// const isHovered =
						// fishkaOptions.isSelected && matchPathItemIsHovered(id, fishkaOptions.hoveredPathIdList);
						
					return (
						<SmallPathItem 
							key={id}
							{ ...item }
							isGame={true}
							// isHovered={isHovered}
							onClick={props.onClick}
							// onMouseOver={props.onMouseOver}
						/>
					)
				})}
			</ul>
			
			{userModel.info.isSmallPath && (
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

export default SmallPathGame;