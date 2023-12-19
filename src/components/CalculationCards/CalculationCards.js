import { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import './calculation-cards.scss';

const CalculationCards = (props) => {
	const { bgImage } = props;
	
	const [isComponentStartHide, setIsComponentStartHide] = useState(false);
		
	const onAnimationEndHander = () => {
		if (isComponentStartHide) {
			props.onCalculationCardsHide();
		}
	};
	
	const onCalculationCardsHide = () => setIsComponentStartHide(true);
	
	return (
		<div
			className='calculation-cards'
			style={{
				animationName: isComponentStartHide ? 'fade-out' : 'fade-in'
			}}
			onAnimationEnd={onAnimationEndHander}
		>
			<div className='calculation-cards__cancel-button'>
				<CloseButton onClick={onCalculationCardsHide} />
			</div>
			
			{ props.children }
			
			<img
				className='calculation-cards__bg-picture'
				src={bgImage}
				alt='bg-picture'
			/>
		</div>
	)
};

export default CalculationCards;