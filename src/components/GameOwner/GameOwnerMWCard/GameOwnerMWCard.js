import { useState } from 'react';

import ModalComponent from '../../../_commonComponents/Modal/Modal';
import MoneyInTheWindCard from '../../MoneyInTheWindCard/MoneyInTheWindCard';

const GameOwnerMoneyInTheWindCard = (props) => {
	const { id } = props;
	
	return (
		<ModalComponent
			title={'Гроші на вітер'}
			isCancelButtonHide={true}
			isSubmitButtonHide={true}
			isShow={true}
			onClose={props.onClose}
		>
			<MoneyInTheWindCard id={id} />
		</ModalComponent>
	)
};

export default GameOwnerMoneyInTheWindCard;