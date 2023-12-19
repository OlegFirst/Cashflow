import { useState, useEffect } from 'react';

import ModalComponent from '../../../_commonComponents/Modal/Modal';
import InputComponent from '../../../_commonComponents/InputComponent/InputComponent';
import Gamers from './Gamers/Gamers';

import { 
	editedGamePreparation,
	getNewGamerListId
} from '../utils';
import { 
	editedGameModes,
	editedGameInitailState
} from '../constants';;

// to do:
// - validation

const EditedGameCard = (props) => {
	const {
		status: {
			mode,
			gameId
		},
		gameList
	} = props;
	
	const [componentData, setComponentData] = useState(editedGameInitailState);	
	
	// Change Game data_(start)
	const onChangeHandler = e => {
		const { name, value } = e.target;
		
		setComponentData(prevState => ({
			...prevState,
			game: {
				...prevState.game,
				[name]: value
			}
		}));
	};
	
	const onSubmitGameHandler = () => {
		props.onSubmit(componentData);
	};
	// Change Game data_(end)
	
	// Change Gamer data_(start)
	const onSubmitGamerHandler = currentGamer => {
		setComponentData(prevState => ({
			...prevState,
			gamerList: prevState.gamerList.map(gamer => gamer.gamerListId !== currentGamer.gamerListId ? gamer : currentGamer)
		}));
	};
	
	const onRemoveGamerHandler = currentGamerListId => {
		setComponentData(prevState => ({
			...prevState,
			gamerList: prevState.gamerList.filter(gamer => gamer.gamerListId !== currentGamerListId)
		}));
	};
	
	const onSubmitNewGamerHandler = currentGamer => {
		const currentGamerListId = getNewGamerListId(componentData);
		
		setComponentData(prevState => ({
			...prevState,
			gamerList: [ ...prevState.gamerList, { ...currentGamer, gamerListId: currentGamerListId } ]
		}));
	};
	// Change Gamer data_(end)
	
	useEffect(() => {		
		setComponentData(editedGamePreparation(mode, gameId, gameList));
	}, [mode, gameId]);
	
	return (
		<div className='edited-game-card'>
			<ModalComponent
				title={mode === editedGameModes.CREATE ? 'Створити нову гру' : 'Редагувати гру'}
				isShow={mode}
				onClose={props.onCancel}
				onSubmit={onSubmitGameHandler}
			>				
				<InputComponent
					name={'name'}
					defaultValue={componentData.game.name}
					placeholder={'Назва гри'}
					onChange={onChangeHandler}
				/>
			
				<div className='mt-1'>
					<InputComponent
						name={'date'}
						defaultValue={componentData.game.date}
						placeholder={'Дата проведення'}
						onChange={onChangeHandler}
					/>
				</div>
				
				<div className='mt-1'>
					<InputComponent
						name={'time'}
						defaultValue={componentData.game.time}
						placeholder={'Час проведення'}
						onChange={onChangeHandler}
					/>
				</div>
				
				<div className='mt-1'>
					<Gamers
						gamerList={componentData.gamerList}
						onRemove={onRemoveGamerHandler}
						onSubmitNewGamer={onSubmitNewGamerHandler}
						onSubmit={onSubmitGamerHandler}
					/>
				</div>
			</ModalComponent>
		</div>
	)
};

export default EditedGameCard;