import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import ProfessionCard from '../../ProfessionCard/ProfessionCard';
import CardView from '../../AgreementCard/CardView/CardView';
import CalculationCards from '../CalculationCards';

import './calculation-cards-small-path.scss';

const CalculationCardsSmallPath = (props) => {
	// Storage
	const currentAgreementCard = useSelector(state => state.userModel.currentAgreementCard);
	
	return (
		<CalculationCards 
			bgImage={'images/small-path-bg.jpg'}
			onCalculationCardsHide={props.onCalculationCardsHide}
		>
			<section className='calculation-cards-small-path'>
				<div className='calculation-cards-small-path__working-field'>
				
				{currentAgreementCard.isPresent && (
					<>
						<CardView isViewOnly={true} />
						
						<Button
							variant='primary'
							className='m-4'
							size='sm'
							onClick={props.onAgreementCardRemove}
						>
							Очистити
						</Button>
					</>
				)}
				</div>				
			
				<div className='calculation-cards-small-path__profession-card-wrapper'>			
					<ProfessionCard
						isSmallPath={true}
						getUserModel={props.getUserModel} 
					/>
				</div>
			</section>
		</CalculationCards>
	)
};

export default CalculationCardsSmallPath;