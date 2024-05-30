import Button from 'react-bootstrap/Button';

import { videoList } from './constants';
import './rules.scss';

const Rules = () => {	
	return (
		<div className='rules'>
			<h1 className='rules__title'>Правила</h1>
		
			<ul className='rules__items'>
				{videoList.map(({ id, title, src }) => (
					<li key={id} className='rules__item'>
							<video className='rules__item-video' controls>
								<source src={src} type='video/mp4' />
								<source src={src} type='video/ogg' />
								
								Your browser does not support the video tag
							</video>
							
							<h4 className='rules__item-title'>{title}</h4>
					</li>
				))}				
			</ul>
		</div>
	);
}

export default Rules;