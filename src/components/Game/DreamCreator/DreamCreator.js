import Button from 'react-bootstrap/Button';

import './dream-creator.scss';

const DreamCreator = (props) => {
	const {
		bigPathId,
		title,
		price
	} = props;
	
	const onClick = () => {
		props.onClick({ bigPathId, title, price });
	};
	
	return (
		<section className='dream-creator'>
			<h4 className='mt-4 dream-creator__title'>Виберіть свою Мрію</h4>
			
			<h5 className='mt-4 dream-creator__dream-title'>{title}</h5>
			
			<h5 className='mt-4 dream-creator__dream-price'>{price}</h5>
		
			<Button
				variant='success'
				className='mt-4 mb-4'
				size='sm'
				onClick={onClick}
			>
				OK
			</Button>
		
			<img
				className='dream-creator__bg-image'
				src={'images/big-path-bg.jpg'}
				alt='bg-picture'
			/>
		</section>
	)
};

export default DreamCreator;