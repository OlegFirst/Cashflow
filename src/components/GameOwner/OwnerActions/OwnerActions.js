import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {
	pathTypes,
	cardTypes
} from '../../../common/constants';
import './owner-actions.scss';

const OwnerActions = (props) => {
	const { isBankrupt } = props.gamerWaitingData;
	
	return (
		<div className='actions'>
			<h5>Видати :</h5>
			
			<ButtonGroup size='sm'>
				<Button
					className='me-1'
					variant='secondary'
					onClick={() => props.onSendAgreementToGamer(cardTypes.SMALL_AGREEMENT)}
				>
					Мала Угода
				</Button>
				
				<Button
					className='me-1'
					variant='secondary'
					onClick={() => props.onSendAgreementToGamer(cardTypes.BIG_AGREEMENT)}
				>
					Велика Угода
				</Button>
				
				<Button
					variant='outline-danger'
					onClick={props.onRemoveAgreement}
				>
					Видалити видану Угоду
				</Button>
			</ButtonGroup>
			
			<Button
				className='ms-4'
				variant='secondary'
				size='sm'
				onClick={props.onMarketClick}
			>
				Ринок
			</Button>
			
			<Button
				className='ms-4'
				variant='secondary'
				size='sm'
				onClick={props.onGetMoneyInTheWind}
			>
				Гроші на вітер
			</Button>
			
			<h5 className='mt-4'>Дії :</h5>
				<Button
					variant='secondary'
					size='sm'
					onClick={props.onCharity}
				>
					Благодійність
				</Button>
				
				<Button
					className='ms-4'
					variant='secondary'
					size='sm'
					onClick={() => props.onMoveGamerToPath(pathTypes.BIG_PATH)}
				>
					Перехід на Велике Коло
				</Button>
				
				<Button
					className='ms-4'
					variant='secondary'
					size='sm'
					onClick={() => props.onMoveGamerToPath(pathTypes.SMALL_PATH)}
				>
					Перехід на Мале Коло
				</Button>
				
				<Button
					className='ms-4'
					variant='danger'
					size='sm'
					onClick={props.onBankrupt}
					disabled={isBankrupt}
				>
					Банкрут
				</Button>
		</div>
	)
};

export default OwnerActions;