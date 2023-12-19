import { useState } from 'react';

import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';

const InputComponentWrapper = (props) => {
	const { 
		id, 
		name,
		value,
		isSelected
	} = props;
	
	const [data, setData] = useState({ name, value });
	
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
			// errorMessage={inputError[modelValues.CURRENT_VALUE]}
		/>
	)
};

export default InputComponentWrapper;