import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';

import { userRoles } from '../../../common/constants';

const InputComponentWrapper = (props) => {
	const { 
		id, 
		name,
		value,
		isSelected,
		isEditable,
		errorMessage = ''
	} = props;
	
	console.log('////', errorMessage)
	
	const [data, setData] = useState({ name, value });
	
	const user = useSelector(state => state.info.user);
	
	const onBlurHandler = () => {		
		props.onBlur({ id, ...data });
	};
	
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