import Spinner from 'react-bootstrap/Spinner';

import Fog from '../Fog/Fog';

import './spinner.scss';

const SpinnerComponent = () => {
	return (
		<div className='spinner'>
			<Fog />
			
			<div className='spinner__inner'>
				<Spinner variant='light' />
			</div>
		</div>
	)
};

export default SpinnerComponent;