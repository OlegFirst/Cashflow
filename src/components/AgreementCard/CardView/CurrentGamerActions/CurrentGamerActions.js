import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ProgressBarComponent from '../../../../_commonComponents/ProgressBar/ProgressBar';

const CurrentGamerActions = (props) => {
	const {
		isSellAble,
		isCardRedirected,
		isSelling
	} = props;
		
	const [isCradSelling, setIsCradSelling] = useState(false);
	
	const isProgressBarComponentHide = isCardRedirected || isCradSelling;
	
	const onSell = () => {
		setIsCradSelling(true);
		props.onSell();
	};
		
	return (
		<>
			{isSellAble && (
				<Button
					className='me-1'
					variant='outline-primary'
					disabled={isCardRedirected}
					onClick={onSell}
				>
					Продати картку
				</Button>
			)}
			
			<Button
				variant='success'
				className='me-4'
				disabled={isCardRedirected}
				onClick={props.onGet}
			>
				Придбати картку 
			</Button>
			
			<Button
				variant='outline-secondary'
				onClick={props.onCancel}
			>
				Cancel
			</Button>
			
			{!isProgressBarComponentHide && (
				<div className='mt-4'>
					<ProgressBarComponent 
						maxTime={40}
						timeIsUp={props.onTimeIsUp}
					/>
				</div>
			)}
		</>
	)
};

export default CurrentGamerActions;