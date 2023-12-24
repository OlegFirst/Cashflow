import Form from 'react-bootstrap/Form';

import './input-component.scss';

const InputComponent = (props) => {
	const { 
		name,
		defaultValue,
		placeholder = '',
		isSelected,
		errorMessage,
		isDisabled = false
	} = props;
	
	const onFocus = event => {
		event.target.select();
	};
	
	return (
		<div 
			className='input-component'
			style={{ border: isSelected ? '1px solid green' : null }}
		>
			<Form>
				<Form.Control
					type='text'
					name={name}
					defaultValue={defaultValue}
					placeholder={placeholder}
					size={'sm'}
					onChange={props.onChange}
					onFocus={onFocus}
					onBlur={props.onBlur}
					disabled={isDisabled}
					
					// isInvalid={true}
					// isValid={true}
				/>
				
				{errorMessage && (<span className='input-component__error'>{errorMessage}</span>)}
			</Form>
		</div>
	)
};

export default InputComponent;