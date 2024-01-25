import { useState } from 'react';

import ModalComponent from '../../../_commonComponents/Modal/Modal';
import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';

import { 
	validateGameName,
	validateLogin,
	validatePassword
} from '../../../common/utils';

const componentDataInitailState = {
	name: '',
	login: '',
	password: ''
};

const errorMessageListInitialState = {
	name: '',
	login: '',
	password: ''
};

const CardCreate = (props) => {
	const { gameOwnerList = [] } = props
	
	const [componentData, setComponentData] = useState(componentDataInitailState);
	const [errorMessageList, setErrorMessageList] = useState(errorMessageListInitialState);
	
	const onChangeHandler = e => {
		const { name, value } = e.target;
		
		setComponentData(prevState => ({
			...prevState,
			[name]: value
		}));
	};
	
	const checkIfNameIsPresent = () => {
		// console.log(gameOwnerList)
		
		// console.log(componentData)
		
		if (gameOwnerList.length > 0) {
			const isPresent = gameOwnerList.some(item => item.owner.name === componentData.name);
			if (isPresent) {
				console.log('Present')
				return;
			}
		}
		
		// Submitting
		props.onSubmit(componentData);
	};
	
	const onSubmit = () => {
		// Validation
		let isValid = true;
		
		const error1 = validateGameName(componentData.name);
		if (error1) {
			isValid = false;
		}
		setErrorMessageList(prevState => ({
			...prevState,
			name: error1
		}));
		
		const error2 = validateLogin(componentData.login);
		if (error2) {
			isValid = false;
		}
		setErrorMessageList(prevState => ({
			...prevState,
			login: error2
		}));
		
		const error3 = validatePassword(componentData.password);
		if (error3) {
			isValid = false;
		}
		setErrorMessageList(prevState => ({
			...prevState,
			password: error3
		}));
		
		if (isValid) {
			checkIfNameIsPresent()
		}
	};
	
	return (
		<div className='card-create'>
			<ModalComponent
				title={'Створити нового власника гри'}
				isShow={true}
				onClose={props.onCancel}
				onSubmit={onSubmit}
			>
				<InputComponent
					name={'name'}
					placeholder={'Ім`я'}
					onChange={onChangeHandler}
					errorMessage={errorMessageList['name']}
				/>
				
				<br/>
				
				<InputComponent
					name={'login'}
					placeholder={'Логін'}
					onChange={onChangeHandler}
					errorMessage={errorMessageList['login']}
				/>
				
				<br/>
				
				<InputComponent
					name={'password'}
					placeholder={'Пароль'}
					onChange={onChangeHandler}
					errorMessage={errorMessageList['password']}
				/>
			</ModalComponent>
		</div>
	)
};

export default CardCreate;