import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ModalComponent from '../../../../../_commonComponents/Modal/Modal';
import InputBlock from  '../../../InputBlock/InputBlock';

import './two-columns-list.scss';

const TwoColumnsList = (props) => {
	const {
		title,
		style,
		toastMessage
	} = props;
	
	const [isShow, setIsShow] = useState(false);
	
	const onModalClose = () => setIsShow(false);
	
	return (					
		<li className='two-columns-list'>
			<div 
					className='two-columns-list__title'
					style={style}
				>			
				{title}
				
				{toastMessage && <Button onClick={() => setIsShow(true)} variant='outline-secondary' size='sm'>i</Button>}
			</div>
				
			<div className='two-columns-list__value'>
				<InputBlock 
					{ ...props }
					onClick={props.onClick} 
				/>
			</div>
			
			<ModalComponent
				title={''}
				isProgressBarShow={false}
				isShow={isShow}
				onSubmit={onModalClose}
				onClose={onModalClose}
			>
				{toastMessage}
			</ModalComponent>
		</li>
	)
};

export default TwoColumnsList;