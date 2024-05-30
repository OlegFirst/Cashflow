import Button from 'react-bootstrap/Button';

const ResizeBlock = (props) => {
	const { isSmallSize } = props;
	
	return (
		<>
			{isSmallSize
				? (
					<Button
						variant='outline-secondary'
						size='sm'
						onClick={() => props.onClick(false)}
					>
						[]
					</Button>
				)
				: (
				<Button
					variant='outline-secondary'
					size='sm'
					onClick={() => props.onClick(true)}
				>
					_
				</Button>
				)
			}
		</>
	);
}

export default ResizeBlock;