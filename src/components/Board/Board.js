import { useEffect } from 'react';

import BigPath from './BigPath/BigPath';
import SmallPath from './SmallPath/SmallPath';
import Money from '../../_commonComponents/Money/Money';
import CommonSmallAgreementCards from '../CommonSmallAgreementCards/CommonSmallAgreementCards';

import { userRoles } from '../../common/constants';
import { useWaitingConnection } from './utils';
import './board.scss';

const Board = (props) => {
	const {
		gameRequestQueryGeneral,
		isCreateConnection,
		isPerspective
	} = props;
	
	const waitingData =	useWaitingConnection({
		data: gameRequestQueryGeneral,
		isCreateConnection: isCreateConnection
	});
	
	const isGame = gameRequestQueryGeneral.userRoleId === userRoles.GAMER;
	
	// If Gamer is moved to the other Path then correct fishka data
	useEffect(() => {
		if (isGame) {
			// Gamer
			props.waitingDataUpdate(
				waitingData.fishkaPositions.find(item => item.gamerId === gameRequestQueryGeneral.userId),
				waitingData.commonEvents
			);
			return;
		}
		
		// Game Owner
		props.waitingDataUpdate(waitingData);
	}, [waitingData]);
	
	return (
		<section className='board'>		
			<div className={`board__inner ${isPerspective ? 'board__inner_perspective' : ''}`}>
				<BigPath 
					{ ...props }
					isGame={isGame}
					waitingData={waitingData}
				/>
				
				<SmallPath 
					{ ...props }
					isGame={isGame}
					waitingData={waitingData}
				/>
				
				<div className='board__common-cards-wrapper'>
					<CommonSmallAgreementCards idList={waitingData.commonSmallAgreementIdList} />
				</div>
				
				<img
					className='board__card-logo big-bg'
					src='images/card-big-bg.jpg'
					alt='card-picture'
				/>
				
				<img
					className='board__card-logo small-bg'
					src='images/card-small-bg.jpg'
					alt='card-picture'
				/>
				
				<img
					className='board__card-logo money-for-wind'
					src='images/money-for-wind.png'
					alt='card-picture'
				/>
				
				<img
					className='board__card-logo card-market'
					src='images/card-market.png'
					alt='card-picture'
				/>
				
				<img
					className='board__bg-image'
					src='images/bg_test.jpg'
					alt='bg-picture'
				/>
				
				<Money left='210px' top='170px' />
				
				<Money left='210px' top='1540px' />
				
				<Money left='1570px' top='1540px' />
				
				<Money left='1570px' top='170px' />
				
				<img
					className='board__shtrih-cod'
					src='images/shtrih-cod.jpg'
					alt='shtrih-cod'
				/>
			</div>
		</section>
	)
};

export default Board;