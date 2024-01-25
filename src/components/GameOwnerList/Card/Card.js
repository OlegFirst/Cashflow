import CloseButton from 'react-bootstrap/CloseButton';

import { itemObjects } from '../constants';
import './card.scss';

const Card = (props) => {
	const {
		owner,
		games
	} = props;
	
	const onOwnerRemove = () => {
		props.onRemove({
			itemObject: itemObjects.OWNER,
			id: owner.id,
			name: owner.name
		});
	};
	
	return (
		<div className='card'>
			<div className='card__remove-button'>
				<CloseButton onClick={onOwnerRemove} />
			</div>
		
			<div className='card__owner'>
				<h4><b>Ім'я:</b> {owner.name}</h4>
				<p><b>Логін:</b> {owner.login}</p>
				<p><b>Пароль:</b> {owner.password}</p>
			</div>
			
			{games.length > 0 
				? 
					<ul className='card__games'>
						{games.map(game => {
							const { id, name, date, time, isGameBegun } = game;
							
							const onGameRemove = () => {
								props.onRemove({
									itemObject: itemObjects.GAME,
									id,
									name
								});
							};
							
							return (
								<li className='card__game' key={id}>
									<div className='card__remove-button'>
										<CloseButton onClick={onGameRemove} />
									</div>
								
									<p className='card__game-property'><b>Назва:</b> {name}</p>
									<p className='card__game-property'><b>Дата проведення:</b> {date}</p>
									<p className='card__game-property'><b>Час проведення:</b> {time}</p>
									<p className='card__game-property'>
										<b>Гра почалась?:</b> {isGameBegun ? 'Так' : 'Нi'}
									</p>
								</li>
							)
						})}
					</ul>
				: 
					<h6>Ігор немає</h6>
			}
		</div>
	)
};

export default Card;