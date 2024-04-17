import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { executeRequestGet } from '../../services/utils';
import {
	bigPathItemSize,
	smallPathItemSize,
	fishkaCoordinates
} from './constants';
import { bigPath } from './big-path';
import { smallPath } from './small-path';

export const createBigPathItemList = () => {
	const { width, height } = bigPathItemSize;
	let itemList = [];
	let left = - width;
	let top = 0;
		
	for (let i = 1; i <= bigPath.length; i++) {
		const { id, title, price, color, backgroundColor, src } = bigPath[i - 1];
		
		if (i <= 12) {
			left += width;
		}
		
		if (i > 12 && i <= 25) {
			top += height;
		}
		
		if (i > 25 && i <= 36) {
			left -= width;
		}
		
		if (i > 36) {
			left = 0;
			top -= height;
		}
		
		itemList.push({
			id,
			title,
			price,
			imageSrc: src,
			style: {
				color,
				backgroundColor,
				width: width + 'px',
				height: height + 'px',
				left: left + 'px',
				top: top + 'px'
			}
		});
	}
	
	return itemList;
};

export const matchPathItemIsHovered = (pathId, hoveredPathIdList) => {
	return hoveredPathIdList.some(({ start, end }) => pathId >= start && pathId <= end);
};

export const createSmallPathItemList = () => {
	const { width, height } = smallPathItemSize;
	let itemList = [];
	let left = - width;
	let top = 0;

	for (let i = 0; i < smallPath.length; i++) {		
		const { id, type, title, subTitle = null, color, backgroundColor } = smallPath[i];
		
		if (i <= 5) {
			left+= width;
		}
		
		if (i > 5 && i <= 12) {
			top += height;
		}
		
		if (i >12 && i <= 17) {
			left -= width;
		}
		
		if (i > 17) {
			left = 0;
			top -= height;
		}
		
		itemList.push({
			id,
			title,
			subTitle,
			style: {
				color,
				backgroundColor,
				width: width + 'px',
				height: height + 'px',
				left: left + 'px',
				top: top + 'px'
			}
		});
	}

	return itemList;
};

// Common maping_(start)
const waitingConnectionMapper = ({ fishka_positions, is_game_begun, common_small_agreement_id_list}) => {	
	return {
		fishkaPositions: fishka_positions.map(item => ({
			gamerId: Number(item.gamer_id),
			isSmallPath: Number(item.is_small_path) === 1,
			pathPositionId: Number(item.path_position_id),
			color: item.color,
			coordinates: {
				left: item.path_position_left,
				top: item.path_position_top
			},
			isBankrupt: Number(item.is_bankrupt) === 1
		})),
		isGameBegun: Number(is_game_begun) === 1,
		commonSmallAgreementIdList: common_small_agreement_id_list.map(item => Number(item))
	};
};
// Common maping_(end)

export const useWaitingConnection = ({ data, isCreateConnection }) => {
	let timeout = null;
	const delay = 10000;
	const request = { 
		endPointURL: 'game',
		query: 'info=waiting-connection&data=' + JSON.stringify(data)
	};
	
	const [response, setResponse] = useState({
		fishkaPositions: [],
		isGameBegun: null,
		commonSmallAgreementIdList: []
	});
	const [isResponseReceived, setIsResponseReceived] = useState(true);
	
	const update = () => {
		console.log('run update');
		
		executeRequestGet(request, ({ isSuccess, data }) => {		
			if (isSuccess && data) {
				setResponse(waitingConnectionMapper(data));
				setIsResponseReceived(!isResponseReceived);
			}
		});
	};
	
	useEffect(() => {		
		if (isCreateConnection) {
			timeout = setTimeout(update, delay);
		}
	}, [isCreateConnection, isResponseReceived]);
	
	useEffect(() => {
		return () => timeout && clearTimeout(timeout);
	}, []);
	
	useEffect(() => {
		if (!isCreateConnection) {			
			clearTimeout(timeout);
			return;
		}
		
		return () => timeout && clearTimeout(timeout);
	}, [isCreateConnection]);
	
	return response;
};