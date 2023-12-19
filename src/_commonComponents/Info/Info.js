import Alert from 'react-bootstrap/Alert';

import './info.scss';

const Info = (props) => {	
	const { isSuccess, message	} = props;
	
	if (message === '') {
		return null;
	}
	
	setTimeout(() => {
		props.onClose();
	}, 4000);
	
	return (
		<div className='info'>
			{isSuccess
				? (
					<Alert variant='success'>
						{message}
					</Alert>
				) : (
					<Alert variant='danger'>
						{message}
					</Alert>
					
				)
			}
		</div>
	)
};

export default Info;