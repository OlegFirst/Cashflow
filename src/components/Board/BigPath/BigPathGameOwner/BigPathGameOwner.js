import { useSelector } from 'react-redux';

import BigPathItem from '../BigPathItem/BigPathItem';

import './big-path-game-owner.scss';

const BigPathGame = (props) => {
	const userModel = useSelector(state => state.userModel);
	
	return (
		<div className='big-path-game-owner'>
			<ul className='big-path-game-owner__items'>
				{userModel.board.bigPathStyled.map(item => {
					return (
						<BigPathItem 
							key={item.id}
							{ ...item }
						/>
					)
				})}
			</ul>
		</div>
	)
};

export default BigPathGame;