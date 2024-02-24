import { Link } from 'react-router-dom';

import { networkIcons } from '../../common/constants';
import './network.scss';

const Network = () => {
  return (
    <ul className='network'>
			{networkIcons.map(({ id, title, src, url }) => {
				
				const srcPath = 'images/' + src;
				
				return (
					<li className='network__item' key={id}>
						<Link to={url} target='_blanck'>
							<img src={srcPath} width='32' height='32' alt={title}/>
						</Link>
					</li>
				)			
			})}
    </ul>
  );
}

export default Network;