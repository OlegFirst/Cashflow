import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Authentication from '../../components/Authentication/Authentication';
import Network from '../../_commonComponents/Network/Network';

import { 
	userRoles,
	phone,
	eMail
} from '../../common/constants';
import {
	title,
	subTitle,
	startButton
} from './constants';
import './introduction.scss';

const Introduction = () => {
	const [isAuthenticationShow, setIsAuthenticationShow] = useState(false);
	
	const navigate = useNavigate();
	
	const onStartButtonClick = () => {
		// TO DO:
		// If user has already registered
		
		// If user hasn`t registered yet
		setIsAuthenticationShow(true);
	};
	
	const onAuthenticationClose = userRoleId => {		
		setIsAuthenticationShow(false);
		
		switch (userRoleId) {
			case userRoles.SUPER_OWNER:
				navigate('/owner-page');
				break;				
			case userRoles.OWNER:
				navigate('/owner-page');
				break;
			case userRoles.GAMER:
				navigate('/rules-page');
				break;
			default:
				console.log('Bad user role');
		}
	};

  return (
    <section className='introduction'>
			<div className='introduction__cover' />
			
			<div className='introduction__content'>
				<h1 className='introduction__title'>{title}</h1>
				
				<h2 className='introduction__sub-title mt-4'>{subTitle}</h2>
				
				<div className='introduction__bottom bottom'>
					<Button
						className='introduction__start-button'
						variant='success'
						onClick={onStartButtonClick}
					>
						{startButton}
					</Button>
					
					<div className='bottom__right right'>
						<h4>З питань партнерства гри на платформі звертайтеся</h4>
						
						<div className='right__network'>
							<Network />
						</div>
						
						<p><b>{phone}</b> Чечотенко Оксана</p>
						
						<p><b>{eMail}</b></p>
					</div>
				</div>
			</div>
			
			<img 
				className='introduction__bg-picture'
				src='images/introduction-1.jpg'
				alt='game'
			/>
			
			<Authentication
				isShow={isAuthenticationShow}
				onClose={onAuthenticationClose} 
			/>			
    </section>
  );
}

export default Introduction;