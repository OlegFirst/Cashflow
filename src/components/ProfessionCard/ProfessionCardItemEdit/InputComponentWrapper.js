import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';

// import { professionCardValidation } from '../../../common/utils';
import { userRoles } from '../../../common/constants';

const InputComponentWrapper = (props) => {
	const { 
		id, 
		name,
		value,
		isSelected,
		isEditable
	} = props;
	
	// console.log('id=', id)
		
	const [data, setData] = useState({ name, value });
	// const [errorMessage, setErrorMessage] = useState({ msg: '' });
	// const errorMessage = useRef('');
	
	const user = useSelector(state => state.info.user);
	
	// console.log(errorMessage.current)
	
	const onBlurHandler = () => {
		// const error = professionCardValidation(data);
		
		// console.log(error)
		
		// errorMessage.current = error;
		
		// console.log(errorMessage.current)
		
		// setErrorMessage(prevState => ({
			// ...prevState,
			// msg: 'ok'
		// }));
		
		// setErrorMessage(error);
		
		props.onBlur({ id, ...data });
	};
	
	// console.log(errorMessage.current)
	
	// useEffect(() => {
		// console.log(errorMessage)
	// }, [errorMessage])
	
	// useEffect(() => {
		// console.log('/', data)
		
		// const error = professionCardValidation(data);
		
		// console.log(error)
		
		// setErrorMessage(prevState => ({
			// ...prevState,
			// msg: 'ok'
		// }));
		
		// setErrorMessage(error);
		
	// }, [data])
	
	const onChangeHandler = e => {		
		const { name, value } = e.target;		
		setData(prevState => ({
			...prevState,
			value
		}));
	};
	
	return (
		<InputComponent
			name={name}
			defaultValue={value}
			onChange={onChangeHandler}
			onBlur={onBlurHandler}
			isSelected={isSelected}
			isDisabled={user.userRoleId !== userRoles['GAMER']}
			// errorMessage={errorMessage}
		/>
	)
};

export default InputComponentWrapper;