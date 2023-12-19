import { useSelector } from 'react-redux';

import SmallPathItem from '../SmallPathItem/SmallPathItem';

import './small-path-game-owner.scss';

const SmallPathGameOwner = (props) => {
	const userModel = useSelector(state => state.userModel);
	
	return (
		<div className='small-path-game-owner'>			
			<ul className='small-path-game-owner__items'>
				{userModel.board.smallPathStyled.map(item => {
					return (
						<SmallPathItem 
							key={item.id}
							{ ...item }
							isGame={false}
						/>
					)
				})}
			</ul>
		</div>
	)
};

export default SmallPathGameOwner;