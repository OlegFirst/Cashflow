import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerButton = (props) => {
	const {
		variant = 'primary',
		text,
		isPending
	} = props;
	
	return (
		<Button
			variant={variant}
			disabled={isPending}
			onClick={props.onClick}
		>
			{isPending && (
				<Spinner
					className='me-2'
					as='span'
					size='sm'
					role='status'
					aria-hidden='true'
				/>
			)}
			
			{text}
		</Button>
	)
};

export default SpinnerButton;