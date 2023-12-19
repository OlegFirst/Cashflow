import Button from 'react-bootstrap/Button';

const PerspectiveButton = (props) => (
	<Button
		className='me-4'
		variant='light'
		onClick={props.onClick}
	>
		Perspective
	</Button>
);

export default PerspectiveButton;