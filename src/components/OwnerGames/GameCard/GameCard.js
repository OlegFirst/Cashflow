import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import Footer from './Footer/Footer';

import './game-card.scss';

const GameCard = (props) => {
	const {
		name,
		date,
		time,
		gameId,
		isGameBegun,
		gamers
	} = props;
	
	const onEditHandler = () => props.onEdit(gameId);
	
	const onRemoveHandler = () => props.onRemove(gameId);
	
	const onGameStartHandler = () => props.onGameStart(gameId);
	
	const onGameCompleteHandler = () => props.onGameComplete(gameId);
	
	const onGameCancelHandler = () => props.onGameCancel(gameId);
	
	return (
		<div className='game-card'>
			<div className='game-card__remove-button'>
				<CloseButton onClick={onRemoveHandler} />
			</div>
		
			<h5>Назва гри: {name}</h5>
			
			<div className='game-card__sub-title'>
				<p><b>Дата проведення:</b> {date}</p>
			
				<p className='mx-4'><b>Час проведення:</b> {time}</p>
			</div>
			
			<h5>Геймери:</h5>
			
			{gamers.length > 0 
				? 
					<ul className='game-card__gamers'>
						{gamers.map((gamer, index) => {
							const { name, login, password } = gamer;
							
							return (
								<li className='game-card__gamer' key={index}>
									<p className='game-card__gamer-property'><b>Ім'я:</b> {name}</p>
									<p className='game-card__gamer-property'><b>Логін:</b> {login}</p>
									<p className='game-card__gamer-property'><b>Пароль:</b> {password}</p>
								</li>
							)
						})}
					</ul>
				: 
					<h6>Гравців немає</h6>
			}
			
			<Footer
				isGameBegun={isGameBegun}
				onEdit={onEditHandler}
				onGameStart={onGameStartHandler}
				onGameComplete={onGameCompleteHandler}
				onGameCancel={onGameCancelHandler}
			/>
		</div>
	)
};

export default GameCard;