import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import './modal.scss';

//
//  onHide - callback fired when close button is clicked
//	onExited - callback fired after the Modal finishes transition out
//

const ModalComponent = (props) => {
	const {
		title,
		children,
		isShow,
		isPending = false,
		isProgressBarShow = false,
		isCancelButtonHide = false,
		isSubmitButtonHide = false
	} = props;
	
	return (
		<div className='modal-component'>
			<Modal 
				show={isShow}
				onHide={props.onClose}
				onExited={props.onExited}
			>
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						{children}
					</Modal.Body>
					
					<Modal.Footer>					
						{!isCancelButtonHide && (
							<Button 
								variant='outline-primary'
								onClick={props.onClose}
							>
								Cancel
							</Button>
						)}
						
						{!isSubmitButtonHide && (
							<Button
								variant='primary'
								disabled={isPending}
								onClick={props.onSubmit}
							>
								{isPending && (
									<Spinner
										className='me-2'
										as='span'
										size='sm'
										role='status'
										aria-hidden='true'
									/>
								)}
								
								OK
							</Button>
						)}
					</Modal.Footer>
				</Modal.Dialog>
			</Modal>
		</div>
	)
};

export default ModalComponent;