import './one-column-list.scss';

const OneColumnList = (props) => {
	const {
		title,
		style
	} = props;
	
	return (					
		<li className='one-column-list'>
			<div 
					className='one-column-list__title'
					style={style}
					onClick={props.onClick} 
				>
					{title}
			</div>
		</li>
	)
};

export default OneColumnList;