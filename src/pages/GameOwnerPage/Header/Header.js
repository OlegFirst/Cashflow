import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import PerspectiveButton from '../../../_commonComponents/PerspectiveButton/PerspectiveButton';
import ExitButton from '../../../_commonComponents/ExitButton/ExitButton';

import './header.scss';

const Header = (props) => {
	const {
		user,
		game,
		isGameOwnerHide
	} = props;
	
	const navigate = useNavigate();
	
	return (
		<header className='game-owner-page-header'>
			<div className='game-owner-page-header__row-1 row-1'>
				<h4 className='row-1__name'>{user?.name},</h4>
				
				<h5 className='row-1__game-name ms-2'><b>Назва гри:</b> {game?.gameName},</h5>
				
				<h5 className='row-1__date ms-2'><b>Дата проведення гри:</b> {game?.date},</h5>
				
				<h5 className='row-1__time ms-2'><b>Час гри:</b> {game?.time}</h5>
			</div>
		
			<div className='game-owner-page-header__row-2'>
				<div className='ms-4 mt-1'>
					<Button
						variant='primary'
						className='mt-1'
						size='sm'
						onClick={() => navigate('/owner-page')}
					>
						Ігри
					</Button>
				</div>
			</div>
				
			<div className='game-owner-page-header__exit'>
				<ExitButton />
			</div>
			
			<div className='game-owner-page-header__collapse'>
				<PerspectiveButton onClick={props.onPerspectiveClick} />
				
				<Button
					variant='outline-warning'
					className='me-1'
					size='sm'
					active={isGameOwnerHide}
					onClick={props.onHide}
				>
					Hide
				</Button>
				
				<Button
					variant='outline-warning'
					size='sm'
					active={!isGameOwnerHide}
					onClick={props.onShow}
				>
					Show
				</Button>
			</div>
		</header>
	)
};

export default Header;