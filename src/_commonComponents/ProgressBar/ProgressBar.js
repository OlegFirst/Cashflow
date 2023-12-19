import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

//
// maxTime in seconds
//

let myInterval = null;

const ProgressBarComponent = (props) => {
	const { maxTime = 1 } = props;
	const [value, setValue] = useState(100);	
	const valueStep = 100 / maxTime;
	
	useEffect(() => {
		myInterval = setInterval(() => {
			setValue(prevState => (
				prevState - valueStep
			));
		}, 4000);
		
		return () => clearInterval(myInterval);
	}, []);
	
	useEffect(() => {
		if (value <= 0) {
			clearInterval(myInterval);
			props.timeIsUp();
		}
	}, [value]);
	
	return (
		<ProgressBar variant='warning' now={value} />
	)
};

export default ProgressBarComponent;