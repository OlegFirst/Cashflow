import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import InputComponent from '../../../../../_commonComponents/InputComponent/InputComponent';

import { editedGamerPreparation } from '../../../utils';
import { 
	editedGamerInitailState,
	editedGameModes
} from '../../../constants';
import './edit-gamer.scss';

const EditGamer = (props) => {
	const {
		status: {
			mode,
			gamerListId
		},
		gamerList		
	} = props;
	
	const [componentData, setComponentData] = useState(editedGamerInitailState);
	
	const onChangeHandler = e => {
		const { name, value } = e.target;
		
		setComponentData(prevState => ({
			...prevState,
			[name]: value
		}));
	};
	
	const onSubmitHandler = () => props.onSubmit(componentData);
	
	const onRemoveHandler = () => {
		props.onRemove(gamerListId);
	};
	
	useEffect(() => {		
		setComponentData(editedGamerPreparation(mode, gamerListId, gamerList));
	}, [mode, gamerListId]);
	
	return (
		<div className='edit-gamer'>
			<Alert variant='success'>		
				<InputComponent
					name={'name'}
					defaultValue={componentData.name}
					placeholder={'Ім`я'}
					onChange={onChangeHandler}
				/>
				
				<InputComponent
					name={'login'}
					defaultValue={componentData.login}
					placeholder={'Логін'}
					onChange={onChangeHandler}
				/>
				
				<InputComponent
					name={'password'}
					defaultValue={componentData.password}
					placeholder={'Пароль'}
					onChange={onChangeHandler}
				/>
				
				<Button
					variant='light'
					className='mt-3'
					size='sm'
					onClick={props.onCancel}
				>
					Cancel
				</Button>
				
				<Button
					variant='light'
					className='mt-3 mx-3'
					size='sm'
					onClick={onSubmitHandler}
				>
					OK
				</Button>
				
				{mode === editedGameModes.EDIT && (
					<div className='edit-gamer__remove-button'>
						<CloseButton onClick={onRemoveHandler} />
					</div>
				)}
			</Alert>
		</div>
	)
};

export default EditGamer;