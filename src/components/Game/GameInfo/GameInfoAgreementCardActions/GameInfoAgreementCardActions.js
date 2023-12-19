import { useState } from 'react';

import ModalComponent from '../../../../_commonComponents/Modal/Modal';
import AgreementCard from '../../../../components/AgreementCard/AgreementCard';
import InteractiveGamerList from '../../../../_commonComponents/InteractiveGamerList/InteractiveGamerList';

import { 
	setCurrentAgreementCardIsPresent,
	clearCurrentAgreementCard
} from '../../../../storage/actions/actionCreatorsUserModel';
import { sellAgreement } from '../../utils';

const GameInfoAgreementCardActions = (props) => {
	const { 
		currentAgreementCard
	} = props;
	
	const [isSelling, setIsSelling] = useState(false);
	
	// Let sell the current card to other Gamer
	const onSellHandler = () => {
		setIsSelling(true);
	};
	
	// Sell card to other Gamer
	const onInteractiveGamerListClick = gamerIdRedirect => {
		setIsSelling(false);
		props.onSell(gamerIdRedirect);
	};
	
	const onTimeIsUpHandler = () => {		
		if (!isSelling) {
			props.onCancel();
		}
	};
	
	return (
		<div className='game-info-agreement'>
			<ModalComponent
				title={''}
				isCancelButtonHide={true} 
				isSubmitButtonHide={true}
				isShow={true}
				onClose={props.onCancel}
			>
				<AgreementCard 
					{ ...currentAgreementCard }
					isSelling={isSelling}
					onGet={props.onGet}
					onSell={onSellHandler}
					onBuy={props.onBuy}
					onCancel={props.onCancel}
					onTimeIsUp={onTimeIsUpHandler}
				/>
				
				<div className='mt-4'>
					{isSelling && (
						<InteractiveGamerList 
							title='Кому продати:'
							onClick={onInteractiveGamerListClick}
						/>
					)}
				</div>
			</ModalComponent>
		</div>
	)
};

export default GameInfoAgreementCardActions;