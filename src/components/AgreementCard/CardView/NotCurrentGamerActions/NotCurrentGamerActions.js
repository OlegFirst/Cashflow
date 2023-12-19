import Button from 'react-bootstrap/Button';

const NotCurrentGamerActions = (props) => {
	const {
		isSellAble
	} = props;
	
	if (!isSellAble) {
		return null;
	}
	
	return (
		<Button
			variant='success'
			className='me-4'
			onClick={props.onBuy}
		>
			Придбати картку 
		</Button>
	)
};

export default NotCurrentGamerActions;