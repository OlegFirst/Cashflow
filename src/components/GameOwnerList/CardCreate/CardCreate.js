import { useState } from 'react';

import ModalComponent from '../../../_commonComponents/Modal/Modal';
import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';

import { 
	validateGameName,
	validateLogin,
	validatePassword,
	validateGameDate,
	namePreparation
} from '../../../common/utils';

const componentDataInitailState = {
	name: '',
	login: '',
	password: '',
	startingRentDate: '',
	endingRentDate: ''
};

const errorMessageListInitialState = {
	name: '',
	login: '',
	password: '',
	startingRentDate: '',
	endingRentDate: ''
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
		if (gameOwnerList.length > 0) {
			const isPresent = gameOwnerList.some(item => namePreparation(item.owner.name) === namePreparation(componentData.name));
			if (isPresent) {
				props.infoMessage('Власник з таким імям створений');
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
		
		const error4 = validateGameDate(componentData.startingRentDate);
		if (error4) {
			isValid = false;
		}
		setErrorMessageList(prevState => ({
			...prevState,
			startingRentDate: error4
		}));
		
		const error5 = validateGameDate(componentData.endingRentDate);
		if (error5) {
			isValid = false;
		}
		setErrorMessageList(prevState => ({
			...prevState,
			endingRentDate: error5
		}));
		
		if (isValid) {
			checkIfNameIsPresent();
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
				
				<br/>
				
				<InputComponent
					name={'startingRentDate'}
					placeholder={'Дата початку оренди'}
					onChange={onChangeHandler}
					errorMessage={errorMessageList['startingRentDate']}
				/>
				
				<br/>
				
				<InputComponent
					name={'endingRentDate'}
					placeholder={'Дата закінчення оренди'}
					onChange={onChangeHandler}
					errorMessage={errorMessageList['endingRentDate']}
				/>
			</ModalComponent>
		</div>
	)
};

export default CardCreate;