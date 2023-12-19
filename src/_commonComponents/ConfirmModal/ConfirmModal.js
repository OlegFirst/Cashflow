import Alert from 'react-bootstrap/Alert';

import ModalComponent from '../Modal/Modal';

import { confirmModalTypes } from '../../common/constants';

const ConfirmModal = (props) => {
	const {
		title,
		message,
		type,
		isShow
	} = props;
	
	return (
		<ModalComponent
			title={title}
			isShow={isShow}
			onSubmit={props.onSubmit}
			onClose={props.onClose}
		>
			{type === confirmModalTypes.INFO && (
				<>
					{message}
				</>
			)}
		
			{type === confirmModalTypes.DANGER && (
				<Alert variant='danger'>
					{message}
				</Alert>
			)}
		</ModalComponent>
	)
};

export default ConfirmModal;