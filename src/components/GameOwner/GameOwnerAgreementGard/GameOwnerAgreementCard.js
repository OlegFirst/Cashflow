import ModalComponent from '../../../_commonComponents/Modal/Modal';
import AgreementCard from '../../../components/AgreementCard/AgreementCard';

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
			onClose={props.onClose}
		>
			<AgreementCard 
				{ ...currentAgreementCard }
				isViewOnly={true}
			/>
		</ModalComponent>
	)
};

export default GameOwnerAgreementCard;