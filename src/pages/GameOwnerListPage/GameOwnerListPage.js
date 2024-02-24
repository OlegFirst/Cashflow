import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header/Header';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';
import Info from '../../_commonComponents/Info/Info';
import ConfirmModal from '../../_commonComponents/ConfirmModal/ConfirmModal';

import GameOwnerList from '../../components/GameOwnerList/GameOwnerList';

import { confirmModalTypes } from '../../common/constants';
import {
	executeRequestGet,
	ownerCreatedGamesResponseMapper
} from '../../services/utils';
import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { networkStatuses } from '../../services/constants';
import { getGameOwnersMapper } from '../../components/GameOwnerList/utils';
import { itemObjects } from '../../components/GameOwnerList/constants';
import './game-owner-list-page.scss';

const confirmDataInitailState = {
	data: null,
	title: '',
	message: '',
	type: confirmModalTypes.DANGER,
	isShow: false
};

const GameOwnerListPage = () => {
	const [gameOwnerList, setGameOwnerList] = useState([]);
	const [isCardCreate, setIsCardCreate] = useState(false);
	const [infoMessage, setInfoMessage] = useState('');
	const [confirmData, setConfirmData] = useState(confirmDataInitailState);
	
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
	
	const onPending = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
	}
	
	const onSuccess = () => {
		dispatch(setNetworkStatus(networkStatuses.SUCCESS));
	};
	
	const onFail = data => {		
		dispatch(setNetworkStatus(networkStatuses.FAIL));		
		setInfoMessage('Server error. ' + data.response.data.errorMesage);
		console.log(data);
	};
	
	const executeRequestGetWrapper = (request, { onSuccess, onPending, onFail }) => {
		onPending();
		
		executeRequestGet(request, ({ isSuccess, data }) => {
			if (isSuccess && data) {
				onSuccess();
				getGameOwners();
			}
			
			if (!isSuccess) {
				onFail(data);
			}
		});
	};
	
	const callbacks = {
		onSuccess, onPending, onFail
	};
	
	const getGameOwners = () => {		
		dispatch(setNetworkStatus(networkStatuses.PENDING));
			
		const request = {
			endPointURL: 'super-owner',
			query: 'info=get-game-owners&user_id=' + user.id
		};
		
		executeRequestGet(request, ({ isSuccess, data }) => {			
			if (isSuccess && data) {
				dispatch(setNetworkStatus(networkStatuses.SUCCESS));			
				const mappedData = getGameOwnersMapper(data);				
				setGameOwnerList(mappedData);
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
		
	const onRemoveHandler = ({ itemObject, id, name }) => {
		setConfirmData(prevState => ({
			...prevState,
			data: {
				itemObject,
				id
			},
			title: `Ви впевнені, що хочете видалити ${itemObject === itemObjects.OWNER ? 'власникa гри?' : 'гру?'}`,
			message: name,
			isShow: true
		}));
	};
	
	const onConfirmModalCancel = () => {
		setConfirmData(prevState => ({
			...prevState,
			...confirmDataInitailState
		}));
	};
	
	const onConfirmModalSubmit = () => {
		let request = null;
		
		if (confirmData.data.itemObject === itemObjects.OWNER) {
			request = {
				endPointURL: 'super-owner',
				query: 'info=remove-game-owner&owner_id=' + confirmData.data.id
			};
		} else {
			request = {
				endPointURL: 'super-owner',
				query: 'info=remove-game&game_id=' + confirmData.data.id
			};
		}
		
		executeRequestGetWrapper(request, callbacks);
		onConfirmModalCancel();
	};
	
	const onCreateNewGameOwnerHandler = () => {
		setIsCardCreate(true);
	};
	
	const onCreateCancelHandler = () => {
		setIsCardCreate(false);
	};
	
	const onCreateSubmitHandler = data => {		
		const request = {
			endPointURL: 'super-owner',
			query: 'info=create-new-game-owner&data=' + JSON.stringify(data)
		}
			
		executeRequestGetWrapper(request, {
			onSuccess: () => {
				onSuccess();
				getGameOwners();
			},
			onPending, onFail
		});
		
		onCreateCancelHandler();
	};
	
	const onInfoClose = () => setInfoMessage('');
	
	return (
		<section className='game-owner-list-page'>
			<Header 
				{ ...user }
				onCreateNewGameOwner={onCreateNewGameOwnerHandler}
			/>
			
			<GameOwnerList 
				gameOwnerList={gameOwnerList}
				onRemove={onRemoveHandler}
				
				isCardCreate={isCardCreate}
				onCreateSubmit={onCreateSubmitHandler}
				onCreateCancel={onCreateCancelHandler}
				
				infoMessage={data => setInfoMessage(data)}
			/>
			
			<Info message={infoMessage} onClose={onInfoClose} />
			
			{networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
			
			<ConfirmModal 
				{...confirmData}
				onSubmit={onConfirmModalSubmit}
				onClose={onConfirmModalCancel}
			/>
		</section>
	)
};

export default GameOwnerListPage;