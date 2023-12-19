import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { gameProcessingModes } from '../../constants';
import './footer.scss';

const Footer = (props) => {
	const { isGameBegun } = props;
	
	const navigate = useNavigate();
	
	const onGameStart = () => {
		props.onGameStart();
	};
	
	const onGameComplete = () => {
		props.onGameComplete();
	};
	
	const onGameProcessCancel = () => {
		props.onGameCancel();
	}
	
	return (
		<footer className='footer mt-3'>			
			{isGameBegun === gameProcessingModes.CANCEL && (
				<Button
					variant='success'
					size='sm'
					onClick={onGameStart}
				>
					Почати гру
				</Button>
			)}
			
			{isGameBegun === gameProcessingModes.START && (
				<>
					<Button
						variant='primary'
						className='mx-2'
						size='sm'
						onClick={() => navigate('/game-owner-page')}
					>
						Перейти до гри
					</Button>
					
					<Button
						variant='danger'
						size='sm'
						onClick={onGameComplete}
					>
						Завершити гру
					</Button>
				</>
			)}
				
			{isGameBegun != gameProcessingModes.COMPLETE && (
				<Button
					variant='outline-success'
					className='mx-2'
					size='sm'
					disabled={isGameBegun === gameProcessingModes.CANCEL}
					onClick={onGameProcessCancel}
				>
					Cancel
				</Button>
			)}
				
			{isGameBegun != gameProcessingModes.COMPLETE && (
				<div className='footer__edit'>
					<Button
						variant='light'
						className='mx-2'
						size='sm'
						disabled={isGameBegun != gameProcessingModes.CANCEL}
						onClick={props.onEdit}
					>
						Редагувати
					</Button>
				</div>
			)}
			
			{isGameBegun === gameProcessingModes.COMPLETE && (
				<Alert variant='primary' align='center' className='w-100'>
					Гра завершена
				</Alert>
			)}
		</footer>
	)
};

export default Footer;