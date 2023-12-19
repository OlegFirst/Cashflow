import { useState } from 'react';

import ModalComponent from '../../../_commonComponents/Modal/Modal';
import MarketCard from '../../MarketCard/MarketCard';

const GameOwnerMarketCard = (props) => {
	const { id } = props;
	
	return (
		<ModalComponent
			title={'Ринок'}
			isCancelButtonHide={true}
			isSubmitButtonHide={true}
			isShow={true}
			onClose={props.onClose}
		>
			<MarketCard id={id} />
		</ModalComponent>
	)
};

export default GameOwnerMarketCard;