import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import EditGamer from './EditGamer/EditGamer';

import { editedGameModes } from '../../constants';
import './gamers.scss';

const Gamers = (props) => {
	const {
		gamerList		
	} = props;
	
	const [status, setStatus] =  useState({
		gamerListId: null,
		mode: null
	});
	
	const onEditHandler = gamerListId => {
		setStatus(prevState => ({
			...prevState,
			gamerListId,
			mode: editedGameModes.EDIT
		}));
	};
	
	const onSubmitHandler = componentData => {
		setStatus(prevState => ({
			...prevState,
			gamerListId: null,
			mode: null
		}));
		
		props.onSubmit(componentData);
	};
	
	const onSubmitNewGamerHandler = componentData => {
		setStatus(prevState => ({
			...prevState,
			gamerListId: null,
			mode: null
		}));
		
		props.onSubmitNewGamer(componentData);
	};
	
	const onRemoveHandler = gamerListId => {
		setStatus(prevState => ({
			...prevState,
			gamerListId: null,
			mode: null
		}));
		
		props.onRemove(gamerListId);
	};
	
	const onNewGamerHandler = () => {
		setStatus(prevState => ({
			...prevState,
			gamerListId: null,
			mode: editedGameModes.CREATE
		}));
	};
	
	const onCancelHandler = () => {
		setStatus(prevState => ({
			...prevState,
			gamerListId: null,
			mode: null
		}));
	};
	
	return (
		<div className='gamers'>
			{gamerList.length > 0 &&
				<ul>
					{gamerList.map(gamer => {
						const { gamerListId, name, login, password } = gamer;
						
						return (
							<li
								key={gamerListId}
								title='Click to edit'
							>
								<span 
									className='gamers__item'
									onClick={() => onEditHandler(gamerListId)}
								>
									{name}, {login}, {password}
								</span>
								
								{gamerListId === status.gamerListId && (
									<EditGamer
										status={status}
										gamerList={gamerList}
										onSubmit={onSubmitHandler}
										onRemove={onRemoveHandler}
										onCancel={onCancelHandler}
									/>
								)}
							</li>
						)
					})}
				</ul>
			}
			
			{gamerList.length === 0 && <h6>Гравців немає</h6>}
			
			{!status.mode && (
				<div className='mt-1'>
					<Button
						variant='outline-success'
						className='mt-1'
						size='sm'
						onClick={onNewGamerHandler}
					>
						Новий гравець
					</Button>
				</div>
			)}
			
			{status.mode === editedGameModes.CREATE && (
				<EditGamer
					status={status}
					gamerList={gamerList}
					onSubmit={onSubmitNewGamerHandler}
					onCancel={onCancelHandler}
				/>
			)}
		</div>
	)
};

export default Gamers;