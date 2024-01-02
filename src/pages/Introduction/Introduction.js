import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Authentication from '../../components/Authentication/Authentication';

import { userRoles } from '../../common/constants';
import {
	title,
	subTitle,
	startButton,
	footer
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
				navigate('/game-waiting');
				break;
			default:
				console.log('Bad user role');
		}
	};

  return (
    <section className='introduction'>
			<Container className='container-fluid p-0' fluid>
				<div className='introduction__content'>
					<h1 className='text-center'>{title}</h1>
					
					<h2 className='text-center'>{subTitle}</h2>
					
					<Button
						className='introduction__start-button'
						variant='success'
						onClick={onStartButtonClick}
					>
						{startButton}
					</Button>
				</div>
			
				<img 
					className='introduction__bg-picture'
					src='images/introduction-1.jpg'
					alt='backgrount-picture'
				/>
				
				<Authentication
					isShow={isAuthenticationShow}
					onClose={onAuthenticationClose} 
				/>
			</Container>
    </section>
  );
}

export default Introduction;