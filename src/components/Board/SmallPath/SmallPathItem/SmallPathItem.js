import './small-path-item.scss';

const SmallPathItem = (props) => {
	const {
		id,
		title,
		subTitle,
		style,
		isHovered,
		isGame
	} = props;
	
	const currentStyle = (id === 16 || id === 24)
		? { ...style, fontSize: '0.8rem' }
		: style;
	
	const onClickHandler = () => {
		props.onClick({ isSmallPath: true, id });
	};
	
	// const onMouseOverHandler = () => {
		// props.onMouseOver(id);
	// };
	
	const commonContent = (
		<>
			<h4 
				className='small-path-item__title'
				style={{
					fontSize: ( id === 24 ? '1rem' : 'inherit' ),
					marginBottom: ( id === 24 ? '0' : 'inherit' )					
				}} 
			>
				{title}
			</h4>
			
			{subTitle && <p className='small-path-item__sub-title'>{subTitle}</p>}
		</>
	);
	
	const content = isGame
		? <li 
				className='small-path-item'
				// className={`small-path-item ${isHovered ? 'small-path-item_hovered' : '' }`}
				style={currentStyle}
				onClick={onClickHandler}
				// onMouseOver={onMouseOverHandler}
			>
				{commonContent}
			</li>
		: <li 
				className='small-path-item'
				style={currentStyle}
			>
				{commonContent}
			</li>
	
	return (
		<>{content}</>
	)
};

export default SmallPathItem;