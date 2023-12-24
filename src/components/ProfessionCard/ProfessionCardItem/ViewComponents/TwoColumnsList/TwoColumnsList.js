import InputBlock from  '../../../InputBlock/InputBlock';

import './two-columns-list.scss';

const TwoColumnsList = (props) => {
	const {
		title,
		style
	} = props;
	
	return (					
		<li className='two-columns-list'>
			<div 
					className='two-columns-list__title'
					style={style}
				>
					{title}
				</div>
				
				<div className='two-columns-list__value'>
					<InputBlock 
						{ ...props }
						onClick={props.onClick} 
					/>
			</div>
		</li>
	)
};

export default TwoColumnsList;