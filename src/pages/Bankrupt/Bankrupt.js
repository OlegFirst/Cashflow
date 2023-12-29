// import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './bankrupt-page.scss';

const Bankrupt = () => {
	return (
		<section className='bankrupt-page'>
			<h1 className='bankrupt-page__title'>Ви банкрут</h1>
			
			<Button
				variant='success'
				className='mt-4'
				size='sm'
				// onClick={}
			>
				Спробуйте знову
			</Button>
			
			<img
				className='bankrupt-page__bg-image'
				src={'images/bankrupt.jpg'}
				alt='bankrupt'
			/>
		</section>
	)
};

export default Bankrupt;