import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Fog from '../../_commonComponents/Fog/Fog';

import { useWaitingConnection } from '../../components/Board/utils';
import './game-waiting.scss';

const GameWaiting = () => {
	const user = useSelector(state => state.info.user);
	const game = useSelector(state => state.info.game);
	
	const navigate = useNavigate();
	
	const gameRequestQueryGeneral = user
		? {
				userId: user.id,
				userRoleId: user.userRoleId,
				gameId: game.gameId
			}
		:
			{
				userId: null,
				userRoleId: null,
				gameId: null
			};
	
	const waitingData =	useWaitingConnection({
		data: gameRequestQueryGeneral,
		isCreateConnection: user ? true : false
	});
	
	if (waitingData?.isGameBegun) {
		navigate('/game');
	}
	
	useEffect(() => {
		if (!user || !game) {
			navigate('/');
		}
	}, []);
	
	return (
		<section className='game-waiting'>
			<main className='game-waiting__content'>
				<Alert variant='success'>
					<h1 className='text-center'>Вітаємо у грі, {user?.name}</h1>
					
					<h4 className='text-left'>Час та дата проведення гри: {game?.time}, {game?.date} </h4>
					<h4 className='text-left'>Ведучий: {game?.gameOwnerName}</h4>
					
					{game?.isGameBegun 
						?
							<div className='game-waiting__connecting-process'>						
								<h5 className='game-waiting__connection-text'>Під’єднання</h5>
								
								<Spinner animation='grow' variant='green' size='sm' />
								<Spinner animation='grow' variant='green' size='sm' />
								<Spinner animation='grow' variant='green' size='sm' />
								<Spinner animation='grow' variant='green' size='sm' />
							</div>
						:
							<div className='game-waiting__connecting-process'>						
								<h5 className='game-waiting__connection-text'>Гра ще не почалась</h5>
							</div>
					}
				</Alert>
			</main>
		
			<img 
				className='game-waiting__bg-picture'
				src='images/game-waiting.png'
				alt='backgrount-picture'
			/>
			
			<Fog />
		</section>
	)
};

export default GameWaiting;


// #81A960 - green
