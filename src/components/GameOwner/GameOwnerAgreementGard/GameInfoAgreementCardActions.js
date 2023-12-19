import { useState } from 'react';

import ModalComponent from '../../../../_commonComponents/Modal/Modal';
import AgreementCard from '../../../../components/AgreementCard/AgreementCard';

// import { 
	// setCurrentAgreementCardIsPresent,
	// clearCurrentAgreementCard
// } from '../../../../storage/actions/actionCreatorsUserModel';
// import { sellAgreement } from '../../utils';

const GameOwnerAgreementCard = (props) => {
	const { 
		currentAgreementCard
	} = props;
	
	return (
		<ModalComponent
			title={''}
			isCancelButtonHide={true} 
			isSubmitButtonHide={true}
			isShow={true}
			// onClose={props.onCancel}
		>
		{/* <AgreementCard 
				{ ...currentAgreementCard }
				onGet={props.onGet}
				onSell={onSellHandler}
				onBuy={props.onBuy}
				onCancel={props.onCancel}
				onTimeIsUp={onTimeIsUpHandler}
		/> */}
		</ModalComponent>
	)
};

export default GameOwnerAgreementCard;