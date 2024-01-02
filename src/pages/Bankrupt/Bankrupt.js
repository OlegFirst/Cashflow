import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Info from '../../_commonComponents/Info/Info';
import SpinnerComponent from '../../_commonComponents/Spinner/Spinner';

import { setNetworkStatus } from '../../storage/actions/actionCreatorsInfo';
import { networkStatuses } from '../../services/constants';
import { gameBankrupt } from './utils';
import './bankrupt-page.scss';

const Bankrupt = () => {
	const [infoMessage, setInfoMessage] = useState({
		isSuccess: false,
		message: ''
	});
	const [isGameInfoHide, setIsGameInfoHide] = useState(false);
	
	const dispatch = useDispatch();
	const info = useSelector(state => state.info);
	const userModel = useSelector(state => state.userModel);
	const bigPathCard = useSelector(state => state.bigPathCard);
	
	const { networkStatus } = info;
	
	const navigate = useNavigate();
	
	console.clear()
	console.log(info)
	console.log(userModel)
	console.log(bigPathCard)
	
	const onPending = () => {
		dispatch(setNetworkStatus(networkStatuses.PENDING));
	};
	
	const onSuccess = () => {
		dispatch(setNetworkStatus(networkStatuses.SUCCESS));
	};
		
	const onFail = data => {
		dispatch(setNetworkStatus(networkStatuses.FAIL));
		setInfoMessage(prevState => ({
			...prevState,
			isSuccess: false,
			message: 'Server error'
		}));
		console.log(data);
	};
	
	const callbacks = {
		onSuccess, onPending, onFail
	};
	
	const onClickHandler = () => {
		gameBankrupt({ userId: info.user.id, userRoleId: info.user.userRoleId }, { 
			...callbacks,
			onSuccess: data => {
				onSuccess();
				
				console.log(data)
				
				return;
				
				// const { info, profession, bigPathCard } = gamePagePreparationMapper(data);
				
				// dispatch(setUserModel({ info, profession }));
				// dispatch(setProfession(bigPathCard));
				// onSuccess();
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
		<section className='bankrupt-page'>
			<h1 className='bankrupt-page__title'>Ви банкрут</h1>
			
			<Button
				variant='success'
				className='mt-4'
				size='sm'
				onClick={onClickHandler}
			>
				Спробуйте знову
			</Button>
			
			<Info isSuccess={infoMessage.isSuccess} message={infoMessage.message} onClose={onInfoClose} />
		
			{networkStatus === networkStatuses.PENDING && <SpinnerComponent />}
			
			<img
				className='bankrupt-page__bg-image'
				src={'images/bankrupt.jpg'}
				alt='bankrupt'
			/>
		</section>
	)
};

export default Bankrupt;