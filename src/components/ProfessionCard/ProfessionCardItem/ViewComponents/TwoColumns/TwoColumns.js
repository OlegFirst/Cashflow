import InputBlock from  '../../../InputBlock/InputBlock';

const TwoColumns = (props) => {
	return (
		<InputBlock 
			{ ...props }
			onClick={props.onClick}
		/>
	)
};

export default TwoColumns;