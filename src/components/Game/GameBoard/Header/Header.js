import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import PerspectiveButton from '../../../../_commonComponents/PerspectiveButton/PerspectiveButton';
import CardView from '../../../AgreementCard/CardView/CardView';

import './header.scss';

const Header = (props) => {
	const {
		userModel: {
			board: {
				diceValue
			},
			currentAgreementCard: {
				isPresent
			}
		},
		isGameInfoHide
	} = props;
	
	return (
		<header className='game-board-header'>
			<div className='game-owner-page-header__collapse'>
				<PerspectiveButton onClick={props.onPerspectiveClick} />
			
				<Button
					variant='outline-warning'
					className='me-1'
					size='sm'
					active={isGameInfoHide}
					onClick={props.onGameInfoHide}
				>
					Hide
				</Button>
				
				<Button
					variant='outline-warning'
					size='sm'
					active={!isGameInfoHide}
					onClick={props.onGameInfoShow}
				>
					Show
				</Button>
			</div>
			
			{diceValue && (
				<Alert variant='light' size='sm'>
					<b>Кубик: {diceValue}</b>
				</Alert>
			)}
			
			{isPresent && (
				<div className='game-board-header__agreement-card-wrapper'>
					<div className='game-board-header__agreement-card-inner'>
						<CardView isViewOnly={true} />
					</div>
				</div>
			)}
		</header>
	)
};

export default Header;