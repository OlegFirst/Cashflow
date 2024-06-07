import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Rules from '../../components/Rules/Rules';

import './rules-page.scss';

const RulesPage = () => {
	const navigate = useNavigate();
	
	const onClick = () => {
		navigate('/game-waiting');
	};
	
	return (
		<section className='rules-page'>
			<Button
				className='rules-page__start-button w-100 mb-4'
				variant='success'
				onClick={onClick}
			>
				Почати
			</Button>
		
			<Rules />
		</section>
	);
}

export default RulesPage;