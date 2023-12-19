import GameCard from './GameCard/GameCard';
import EditedGameCard from './EditedGameCard/EditedGameCard';

import './owner-games.scss';

const OwnerGames = (props) => {
	const { 
		gameList,
		status
	} = props;
		
	const onRemoveHandler = gameId => {		
		props.onGameRemove(gameId);
	};
	
	return (
		<div className='owner-games'>
			{gameList.length > 0 
				? 
					<ul className='owner-games__items'>
						{gameList.map(game => (
							<li key={game.gameId}>
								<GameCard
									{ ...game }
									onEdit={props.onEdit}
									onRemove={onRemoveHandler}
									onGameStart={props.onGameStart}
									onGameComplete={props.onGameComplete}
									onGameCancel={props.onGameCancel}
								/>
							</li>
						))}
					</ul>					
				: <h2>Немає ігор</h2>
			}
			
			<EditedGameCard
				status={status}
				gameList={gameList}
				onSubmit={props.onSubmit}
				onCancel={props.onCancel}
			/>
		</div>
	)
};

export default OwnerGames;