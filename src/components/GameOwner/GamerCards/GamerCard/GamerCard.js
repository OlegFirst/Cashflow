import Button from 'react-bootstrap/Button';

import './gamer-card.scss';

const GamerCard = (props) => {
	const {
		item: {
			id,
			name,
			color,
		},
		gamerTurnData,
		charityActivatedTurnsLeft
	} = props;
	
	console.log('//', gamerTurnData)
	
	return (
		<li 
			className='gamer-card'
			style={{
				backgroundColor: color,
				borderColor: gamerTurnData ? 'lightgreen' : 'inherit'
			}}
		>
			<h2 className='gamer-card__name'>{name}</h2>
			
			{gamerTurnData && (
				<>
					<p className='mb-0'><b>Кеш :</b> $ {gamerTurnData.cash}</p>
					
					<p className='mb-0'><b>Пасивний дохід:</b> $ {gamerTurnData.incomesRealEstate}</p>
					
					<p className='gamer-card__path mb-0'>
						{gamerTurnData.isSmallPath
							? <b>Мале коло</b>
							: <b>Велике коло</b>
						}
					</p>
					
					<p className='mb-0'>
						<b>Благодійність, залишилось ходів: </b> 
						{charityActivatedTurnsLeft ?? gamerTurnData.charityTurnsLeft}
					</p>
					
					<Button
						variant='success'
						className='mt-4'
						size='sm'
						onClick={() => props.onCalculationCards(id)}
					>
						Розрахункові картки
					</Button>
				</>
			)}
		</li>
	)
};

export default GamerCard;