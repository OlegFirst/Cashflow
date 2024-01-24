import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header/Header';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';
import Info from '../../_commonComponents/Info/Info';

import { 
	executeRequestGet,
	ownerCreatedGamesResponseMapper
} from '../../services/utils';
import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { networkStatuses } from '../../services/constants';
import './game-owner-list-page.scss';

const GameOwnerListPage = () => {
	const [infoMessage, setInfoMessage] = useState('');
	
	const dispatch = useDispatch();
	const user = useSelector(state => state.info.user);
	const networkStatus = useSelector(state => state.info.networkStatus);
	
	const isSuperOwner = user && user.userRole === 'SUPER_OWNER';
	
	useEffect(() => {
		if (isSuperOwner) {
			getGameOwners();
		}
	}, []);
	
	if (!isSuperOwner) {
		return (
			<section>You dont have permissions</section>
		)
	}
	
	const getGameOwners = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
			
		const request = {
			endPointURL: 'super-owner',
			query: 'info=get-game-owners&user_id=' + user.id
		};
		
		executeRequestGet(request, ({ isSuccess, data }) => {
			console.log(data)
			
			if (isSuccess && data) {
				dispatch(setNetworkStatus(networkStatuses.SUCCESS));				
				// onst mappedData = ownerCreatedGamesResponseMapper(data);				
				// setOwnerGamesData(mappedData);
				// cb?.(mappedData);
				return;
			}
			
			if (!isSuccess) {
				dispatch(setNetworkStatus(networkStatuses.FAIL));
				setInfoMessage('Server error');
				return;
			}
			
			setInfoMessage('Користувач не розпізнаний');
			return;
		});
	};
	
	const onCreateNewGameOwnerHandler = () => {
		
	};
	
	const onInfoClose = () => setInfoMessage('');
	
	return (
		<section className='game-owner-list-page'>
			<Header 
				{ ...user }
				onCreateNewGameOwner={onCreateNewGameOwnerHandler}
			/>
			
			<button onClick={getGameOwners}>OK</button>
			
			<Info message={infoMessage} onClose={onInfoClose} />
			
			{networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
		</section>
	)
};

export default GameOwnerListPage;