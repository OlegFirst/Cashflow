import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

import ModalComponent from '../../_commonComponents/Modal/Modal';
import Info from '../../_commonComponents/Info/Info';

import { 
	validateLogin,
	validatePassword
} from '../../common/utils';
import { userRoles } from '../../common/constants'
import { 
	setUser,
	setGame,
	setProtocol,
	setNetworkStatus
} from '../../storage/actions/actionCreatorsInfo';
import { 
	executeRequestGet, 
	authenticationResponseMapper
} from '../../services/utils';
import { networkStatuses } from '../../services/constants';
import {
	title,
	fieldNames
} from './constants';
import './authentication.scss';

const inputInitialState = { 
	login: '',
	password: ''
};

const Authentication = (props) => {
	const { isShow } = props;
	
	const [input, setInput] = useState(inputInitialState);	
	const [inputError, setInputError] = useState(inputInitialState);	
	const [infoMessage, setInfoMessage] = useState('');
	
	// Storage
	const dispatch = useDispatch();
	const networkStatus = useSelector(state => state.info.networkStatus);
	
	const protocol = useSelector(state => state.info.protocol);
		
	// Get input data
	const onFormControlChange = e => {
		const { name, value } = e.target;
		
		setInput(prevState => ({
			...prevState,
			[name]: value
		}));
	};
	
	// Submiting
	const onModalSubmit = () => {
		const loginError = validateLogin(input.login);
		const passwordError = validatePassword(input.password);
				
		setInputError(prevState => ({
			...prevState,
			['login']: validateLogin(input.login),
			['password']: validatePassword(input.password)
		}));
		
		if (loginError.length === 0 && passwordError.length === 0) {
			const request = {
				endPointURL: 'authentication',
				query: 'login=' + input.login + '&password=' + input.password
			};
			
			dispatch(setNetworkStatus(networkStatuses.PENDING));
			
			executeRequestGet(request, ({ isSuccess, data }) => {				
				if (isSuccess && data) {					
					dispatch(setNetworkStatus(networkStatuses.SUCCESS));
					
					const { userInfo, gameInfo, protocol } = authenticationResponseMapper(data);
					
					dispatch(setUser(userInfo));
					dispatch(setGame(gameInfo));
					
					props.onClose(userInfo.userRoleId);
					return;
				}
				
				if (!isSuccess) {
					dispatch(setNetworkStatus(networkStatuses.FAIL));
					setInfoMessage('Server error');
					return;
				}
				
				dispatch(setNetworkStatus(networkStatuses.SUCCESS));
				setInfoMessage('Користувач не розпізнаний');
			});
		}
	};
	
	// Info component closes
	const onInfoClose = () => setInfoMessage('');
	
	return (
		<section className='authentication'>
			<ModalComponent
				title={title}
				isShow={isShow}
				isPending={networkStatus === networkStatuses.PENDING}
				isCancelButtonHide={true}
				onSubmit={onModalSubmit}
				onClose={props.onClose}
			>
				<Form>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>{fieldNames.login}</Form.Label>
						<Form.Control
							type='text'
							name='login'
							onChange={onFormControlChange} 
						/>
						{inputError.login && (<span className='authentication__error'>{inputError.login}</span>)}
					</Form.Group>
					
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
						<Form.Label>{fieldNames.password}</Form.Label>
						<Form.Control
							type='password'
							name='password'
							onChange={onFormControlChange} 
						/>
						{inputError.password && (<span className='authentication__error'>{inputError.password}</span>)}
					</Form.Group>
				</Form>
			</ModalComponent>
			
			<Info message={infoMessage} onClose={onInfoClose} />
		</section>
	)
};

export default Authentication;