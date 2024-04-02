import TwoColumnsList from './ViewComponents/TwoColumnsList/TwoColumnsList';
import TwoColumns from './ViewComponents/TwoColumns/TwoColumns';
import OneColumnList from './ViewComponents/OneColumnList/OneColumnList';

import {
	getTotal,
	createSelectedItemStyle
} from '../utils';
import { professionCardItemTypes } from '../constants';

const ProfessionCardItem = (props) => {
	const {
		title,
		profession,
		objKey,
		type = null,
		cardItemType,
		active,
		toastMessage = null
	} = props;
	
	const total = getTotal(objKey, type, profession);		
	const style = createSelectedItemStyle(objKey);	
	const renderProps = {
		title,
		value: total,
		style,
		active,
		toastMessage
	};
	
	const onClickHandler = () => {
		if (active) {
			props.onClick({ 
				title,
				objKey,
				total,
				type
			});
		}
	};
	
	const selectedCardItem = (type) => {		
		const cardComponentByStatus = {
			[professionCardItemTypes.TWO_COLUMNS_LIST]: 
				() => <TwoColumnsList { ...renderProps } onClick={onClickHandler} />,
				
			[professionCardItemTypes.TWO_COLUMNS]: 
				() => <TwoColumns { ...renderProps } onClick={onClickHandler} />,
				
			[professionCardItemTypes.ONE_COLUMN_LIST]: 
				() => <OneColumnList { ...renderProps } onClick={onClickHandler} />,
		};
		
		return cardComponentByStatus[type]
	};
	
	const Consumer = ({ ComponentType }) => <ComponentType />
	
	return (
		<Consumer ComponentType={selectedCardItem(cardItemType)} />
	)
};

export default ProfessionCardItem;