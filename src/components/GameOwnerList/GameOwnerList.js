import Card from './Card/Card';
import CardCreate from './CardCreate/CardCreate';

import './game-owner-list.scss';

const GameOwnerList = (props) => {
	const { 
		gameOwnerList,
		isCardCreate
	} = props;
		
	return (
		<div className='game-owner-list'>
			{gameOwnerList.length > 0 
				? 
					<ul className='game-owner-list__items'>
						{gameOwnerList.map(gameOwner => (
							<li key={gameOwner.owner.id}>
								<Card
									{ ...gameOwner }
									onRemove={props.onRemove}
								/>
							</li>
						))}
					</ul>					
				: 
					<h2>Власників гри немає</h2>
			}
			
			{isCardCreate && (
				<CardCreate
					gameOwnerList={gameOwnerList}
					onSubmit={props.onCreateSubmit}
					onCancel={props.onCreateCancel}
					infoMessage={props.infoMessage}
				/>
			)}
		</div>
	)
};

export default GameOwnerList;