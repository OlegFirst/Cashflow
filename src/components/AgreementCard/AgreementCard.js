import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import CardView from './CardView/CardView';

import { cardTypes } from '../../common/constants';
import { setCurrentAgreementCardContent } from '../../storage/actions/actionCreatorsUserModel';
import { smallAgreementList } from './small-agreement';
import { bigAgreementList } from './big-agreement';

// Card preparation
const AgreementCard = (props) => {
	const { 
		cardId,
		type,
		isViewOnly = false,
		isSelling
	} = props;
	
	// Storage
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (cardId) {
			const cardTypeName = type === cardTypes.SMALL_AGREEMENT ? 'Мала угода' : 'Велика угода';
			const agreementList = type === cardTypes.SMALL_AGREEMENT ? smallAgreementList : bigAgreementList
			const agreementItem = agreementList.find(item => item.id === cardId);
	
			dispatch(setCurrentAgreementCardContent({ ...agreementItem, cardTypeName }));
		}
	}, [cardId]);
	
	return (
		<div className='agreement-card'>
			<CardView
				isViewOnly={isViewOnly}
				isSelling={isSelling}
				onGet={props.onGet}
				onSell={props.onSell}
				onBuy={props.onBuy}
				onCancel={props.onCancel}
				onTimeIsUp={props.onTimeIsUp}
			/>
		</div>
	)
};

export default AgreementCard;