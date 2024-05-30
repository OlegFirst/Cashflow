import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import CurrentGamerActions from './CurrentGamerActions/CurrentGamerActions';
import NotCurrentGamerActions from './NotCurrentGamerActions/NotCurrentGamerActions';

import { currentCardGamerTypes } from '../../Game/constants';
import './card-view.scss';

const CardView = (props) => {
	const {
		data = null,
		isViewOnly,
		isSelling
	} = props;
	
	const userModelData = useSelector(state => state.userModel.currentAgreementCard);
	
	const currentAgreementCard = data ?? userModelData;
	
	if (!currentAgreementCard.content) {
		return null;
	}
	
	const { 
		content: {
			cardTypeName,
			name,
			info,
			caption,
			subCaption,
			isSellAble
		},
		gamerType,
		isCardRedirected
	} = currentAgreementCard;
	
	return (
		<section className='card-view'>
			<Card>
				<Card.Body>
					<Card.Title>
						<div className='card-view__title'>
							<span className='card-view__card-type-name'>{cardTypeName}</span>
							{name}
						</div>
					</Card.Title>
					
					<div className='card-view__content'>
						{info.length > 0 && (
							<ul className='card-view__items'>
								{info.map(({ title, caption }, index) => {
									return (
										<li className='card-view__item item' key={index}>
											<p className='item__title'>{title}</p>										
											<p className='item__caption'>{caption}</p>
										</li>
									);
								})}
							</ul>
						)}
						
						<p className='card-view__caption' dangerouslySetInnerHTML={{__html: caption }} />
						
						<p className='card-view__sub-caption' dangerouslySetInnerHTML={{__html: subCaption }} />
					</div>
					
					{!isViewOnly && (
						<div className='card-view__footer mt-4'>
							<div className='card-view__action-buttons'>
								{gamerType === currentCardGamerTypes.GAMER_ID_TURN
									? <CurrentGamerActions 
											isSellAble={isSellAble}
											isCardRedirected={isCardRedirected}
											isSelling={isSelling}
											onSell={props.onSell}
											onGet={props.onGet}
											onCancel={props.onCancel}
											onTimeIsUp={props.onTimeIsUp}
										/>
									: <div className='card-view__action-buttons-center'> 
											<NotCurrentGamerActions
												isSellAble={isSellAble}
												onBuy={props.onBuy}
											/>
										</div>
								}
							</div>
						</div>
					)}
				</Card.Body>
			</Card>
		</section>
	)
};

export default CardView;