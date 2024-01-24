import Button from 'react-bootstrap/Button';

import ExitButton from '../../../_commonComponents/ExitButton/ExitButton';

import './header.scss';

const Header = (props) => {
	const {
		name,
		userRole
	} = props;
	
	return (
		<header className='header'>
			<div className='header__top'>
				<h4>{name}</h4>,
				
				<h4 className='mx-3'>{userRole}</h4>
				
				<div className='header__exit'>
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