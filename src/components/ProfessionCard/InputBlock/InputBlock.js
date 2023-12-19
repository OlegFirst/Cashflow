import './input-block.scss';

const InputBlock = (props) => {
	const {
		value,
		active,
		style = null
	} = props;
	
	return (
		<div 
			className={`input-block input-block_${active ? 'active' : 'not-active'}`}
			style={style}
			onClick={props.onClick}
		>
			$ {value}
		</div>
	)
};

export default InputBlock;