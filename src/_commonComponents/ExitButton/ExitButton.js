import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { singOutClearStorage } from '../../storage/actions/actionCreatorsCommon';

const ExitButton = () => {	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const onSignOut = () => {
		singOutClearStorage(dispatch)();
		
		navigate('/');
	};
	
	return (
		<Button
			variant='outline-light'
			className='mt-1'
			size='sm'
			onClick={onSignOut}
		>
			Вихід
		</Button>
	)
};

export default ExitButton;