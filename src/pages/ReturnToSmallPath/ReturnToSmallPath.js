import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Info from '../../_commonComponents/Info/Info';
import SpinnerButton from '../../_commonComponents/SpinnerButton/SpinnerButton';

import { singOutClearStorage } from '../../storage/actions/actionCreatorsCommon';
import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { networkStatuses } from '../../services/constants';
import { returnToSmallPath } from './utils';
import './return-to-small-path.scss';

const ReturnToSmallPath = () => {
	const [infoMessage, setInfoMessage] = useState({
		isSuccess: false,
		message: ''
	});
	
	const dispatch = useDispatch();
	const info = useSelector(state => state.info);
	
	const navigate = useNavigate();
	
	if (!info.user) {
		singOutClearStorage(dispatch)();
		navigate('/');
		return;
	}
		
	const gameRequestQueryGeneral = {
		userId: info.user.id,
		userRoleId: info.user.userRoleId,
		gameId: info.game.gameId
	};
	
	const onPending = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
	};
	
	const onSuccess = () => {
		dispatch(setNetworkStatus(networkStatuses.SUCCESS));
	};
		
	const onFail = data => {
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess: false,
			message: 'Server error'
		}));
		console.log(data);
	};
	
	const callbacks = {
		onSuccess, 
		onPending, 
		onFail
	};
	
	const onSubmit = () => {
		returnToSmallPath({ ...gameRequestQueryGeneral }, { 
			...callbacks,
			onSuccess: data => {
				onSuccess();
				
				navigate('/game');
			}
		});
	};
	
	const onInfoClose = () => {
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess: false,
			message: ''
		}));
	};
	
	
	
	return (
		<section className='return-to-small-path'>
			<h1 className='return-to-small-path__title'>Ви повертаєтесь до Малого кола...</h1>
			<h2 className='return-to-small-path__title mb-4'>Ви збережете свої гроші, але у вас буде нова професія</h2>
			
			<SpinnerButton
				variant='success'
				text='Продовжити'
				// isPending={false}
				isPending={info.networkStatus === networkStatuses.PENDING}
				onClick={onSubmit}
			/>
			
			<Info 
				isSuccess={infoMessage.isSuccess}
				message={infoMessage.message}
				onClose={onInfoClose} 
			/>
			
			<img
				className='return-to-small-path__bg-image'
				src={'images/big-path-bg-1.jpg'}
				alt='ReturnToSmallPath'
			/>
		</section>
	)
};

export default ReturnToSmallPath;