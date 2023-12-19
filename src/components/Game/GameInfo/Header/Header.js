import ExitButton from '../../../../_commonComponents/ExitButton/ExitButton';

import './header.scss';

const Header = (props) => {
	const {
		name,
		professionName
	} = props;
	
	return (
		<header className='game-info-header'>
			<h4>{name}</h4>
			
			<h5><i>{professionName}</i></h5>
			
			<div className='game-info-header__exit'>
				<ExitButton />
			</div>
		</header>
	)
};

export default Header;