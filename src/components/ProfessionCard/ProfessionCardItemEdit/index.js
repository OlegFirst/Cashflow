import ActionsTable from './ActionsTable';
import RealEstateTable from './RealEstateTable';
import BusinessTable from './BusinessTable';
import ArithmeticTable from './ArithmeticTable';
import BuyedDreamsTable from './BuyedDreamsTable';
import BuyedBusinessTable from './BuyedBusinessTable';
import BuyedCashTable from './BuyedCashTable';

import { professionCardTypes } from '../constants';

const ProfessionCardItemEdit = (props) => {	
	if (!props.currentData)	{
		return null;
	};
	
	const selectedCard = (status) => {		
		const cardComponentByStatus = {
			[professionCardTypes.ACTIONS]: () => <ActionsTable { ...props } />,
			[professionCardTypes.REAL_ESTATE]: () => <RealEstateTable { ...props } />,
			[professionCardTypes.BUSINESS]: () => <BusinessTable { ...props } />,
			[professionCardTypes.ARITHMETIC]: () => <ArithmeticTable { ...props } />,
			[professionCardTypes.BUYED_DREAMS]: () => <BuyedDreamsTable { ...props } />,
			[professionCardTypes.BUYED_BUSINESS]: () => <BuyedBusinessTable { ...props } />,
			[professionCardTypes.BUYED_CASH]: () => <BuyedCashTable { ...props } />
		};
		
		return cardComponentByStatus[status]
	};
	
	const Consumer = ({ ComponentType }) => <ComponentType />
	
	return (
		<Consumer ComponentType={selectedCard(props.currentData.type)} />
	)
};

export default ProfessionCardItemEdit;