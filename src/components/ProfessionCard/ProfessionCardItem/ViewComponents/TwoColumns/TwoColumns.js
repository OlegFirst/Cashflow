import InputBlock from  '../../../InputBlock/InputBlock';

const TwoColumns = (props) => (
	<InputBlock 
		{ ...props }
		onClick={props.onClick} 
	/>
)

export default TwoColumns;