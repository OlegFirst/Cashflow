import { useSelector } from 'react-redux';

import './interactive-gamer-list.scss';

const InteractiveGamerList = (props) => {
	const { title } = props;
	
	const user = useSelector(state => state.info.user);
	const gameInfo = useSelector(state => state.info.game);
	
	const userId = user.id;
	const gameId = gameInfo.gameId;
	const gamerList = gameInfo.gamerList;
	
	return (
		<div className='interactive-gamer-list'>
			<h5>{title}</h5>
		
			<ul className='interactive-gamer-list__items'>
				{gamerList.map(gamer => (
					gamer.id === userId
						? null
						: <li 
								className='interactive-gamer-list__item'
								style={{ backgroundColor: gamer.color }}
								key={gamer.id}
								onClick={() => props.onClick(gamer.id)}
							>
								{gamer.name}
							</li>
				))}
			</ul>
		</div>
	)
};

export default InteractiveGamerList;