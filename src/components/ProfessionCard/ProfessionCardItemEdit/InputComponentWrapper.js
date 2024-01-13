import { useState } from 'react';
import { useSelector } from 'react-redux';

import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';

import { useProfessionCardValidation } from '../../../common/utils';
import { userRoles } from '../../../common/constants';

const InputComponentWrapper = (props) => {
	const { 
		id, 
		name,
		value,
		isSelected,
		isEditable
	} = props;
	
	const [data, setData] = useState({ name, value });
	const { errorMessageList, isValid, validationProceed } = useProfessionCardValidation();
	
	const user = useSelector(state => state.info.user);
	
	const onBlurHandler = () => {
		validationProceed(data);
		
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