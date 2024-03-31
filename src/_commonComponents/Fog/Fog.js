import './fog.scss';

const Fog = ({ zIndex = 0 }) => (
	<div className='fog' style={{ zIndex: zIndex }} />
);

export default Fog;