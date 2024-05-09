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
		gamerWaitingData,
		charityActivatedTurnsLeft
	} = props;
	
	let charityTurnsLeft = 0;
	if (gamerTurnData?.charityTurnsLeft) {
		charityTurnsLeft = gamerTurnData?.isSmallPath ? gamerTurnData.charityTurnsLeft : 'Infinity'
	}
	
	const { isBankrupt } = gamerWaitingData;
	
	return (
		<li 
			className={`gamer-card ${gamerTurnData ? 'active' : ''}`}
			style={{
				backgroundColor: color
			}}
		>
			<div className='gamer-card__inner'>
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
							{charityTurnsLeft}
						</p>
						
						{isBankrupt ? (
							<p className='gamer-card__bankrupt-value-present mb-0'>
								<b>Ситуація банкрутства</b>
							</p>
						) : ''}
						
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
			</div>
		</li>
	)
};

export default GamerCard;