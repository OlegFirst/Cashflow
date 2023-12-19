import './money.scss';

const moneySrcList = [
	'money-10.jpg', 'money-100.jpg', 'money-10000.jpg', 'money-1000000.jpg'
];

const Money = (props) => {	
	return (
		<ul 
			className='money'
			style={ props }
		>
			{moneySrcList.map((item, index) => {
				const src = 'images/money/' + item;
				const left = - index * 10 + 'px';
				const top = index * 10 + 'px';
				
				return (
					<li 
						className='money__item'
						style={{ left, top }}
						key={index}
					>
						<img
							className='money__img'
							src={src}
							alt='money'
						/>
					</li>
				)
			})}
		</ul>
	)
};

export default Money;