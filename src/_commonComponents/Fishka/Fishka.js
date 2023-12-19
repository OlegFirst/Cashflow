import './fishka.scss';

const coloredImageList = {
	green: 'images/fishka-green.png',
	red: 'images/fishka-red.png',
	grey: 'images/fishka-grey.png',
	brown: 'images/fishka-brown.png',
	yellow: 'images/fishka-yellow.png',
	blue: 'images/fishka-blue.png',
	white: 'images/fishka-white.png',
	aqua: 'images/fishka-aqua.png',
	bisque: 'images/fishka-bisque.png',
	coral: 'images/fishka-coral.png'
};

const Fishka = (props) => {
	const {
		color,
		coordinates: {
			left,
			top
		},
		isSelected = false,
		translateX = 10
	} = props;
	
	return (
		<div 
			className={`fishka ${isSelected ? 'fishka_selected' : ''}`}
			style={{
				left: left,
				top: top
			}}
		>
			<img
				className='fishka__img'
				style={{
					position: 'relative',
					left: translateX + 'px'
				}}
				src={coloredImageList[color]}
				alt='start-image'
				onClick={props.onClick}
			/>
		</div>
	)
};

export default Fishka;