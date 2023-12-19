import CloseButton from 'react-bootstrap/CloseButton';

import './remove-button.scss';

const RemoveButton = (props) => {
	
	return (
		<div 
			className='remove-button'
			onClick={props.onClick}
		>
			<div className='remove-button__inner'>
				<CloseButton />
			</div>
		</div>
	)
};

export default RemoveButton;