const TotalChangedComponent = ({ total, isUpdated }) => {
	if (!isUpdated) {
		return total;
	}
	
	return 'Значення змінено';
};

export default TotalChangedComponent;