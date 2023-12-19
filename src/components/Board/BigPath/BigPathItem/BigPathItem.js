import './big-path-item.scss';

const BigPathItem = (props) => {
	const {
		id,
		title,
		price,
		imageSrc,
		style,
		isGame
	} = props;
	
	const src = imageSrc ? 'images/big-path/' + imageSrc : null;
	
	const onClickHandler = () => {
		props.onClick({ isSmallPath: false, id });
	};
	
	const commonContent = (
		<>
			{/*<span className='big-path-item__id'>{id}</span>*/}
		
			<p className='big-path-item__title'>{title}</p>
				
			<p className='big-path-item__price'>{price}</p>
			
			{src && (
				<img 
					className='big-path-item__bg-picture'
					src={src}
					alt='backgrount-picture'
				/>
			)}
		</>
	);
	
	const content = isGame
		? <li 
				className='big-path-item'
				style={style}
				onClick={onClickHandler}
			>
				{commonContent}
			</li>
		: <li 
				className='big-path-item'
				style={style}
			>
				{commonContent}
			</li>
	
	return (
		<>{content}</>
	)
};

export default BigPathItem;