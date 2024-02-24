import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import ExitButton from '../../../_commonComponents/ExitButton/ExitButton';

import './header.scss';

const Header = (props) => {
	const {
		name,
		userRole
	} = props;
	
	const navigate = useNavigate();
	
	const onGoBack = () => {
		navigate('/owner-page');
	}
	
	return (
		<header className='header'>
			<div className='header__top'>
				<h4>{name}</h4>,
				
				<h4 className='mx-3'>{userRole}</h4>
				
				<div className='header__exit'>
					<Button
					variant='outline-light'
					className='me-4 mt-1'
					size='sm'
					onClick={onGoBack}
				>
					Назад
				</Button>
				
					<ExitButton />
				</div>
			</div>
			
			<div className='header__bottom'>
				<Button
					variant='light'
					className='mt-1'
					size='sm'
					onClick={props.onCreateNewGameOwner}
				>
					Створити нового власника гри
				</Button>
			</div>
		</header>
	)
};

export default Header;