import { useEffect, useState } from 'react';
import axios from 'axios';

import { hostURL, params } from './constants';
import { findEnumVariable } from '../common/utils';
import { userRoles } from '../common/constants';

const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		'Content-Type': 'application/json'
	}
};

// Method GET
export const requestGet = (path, readed) => {
  axios.get(path, config, params)
  .then(response => readed({				
		isSuccess: true,        
		data: response.data
	 })
  )
  .catch(error => readed({
			isSuccess: false,
			data: error
		})
  );
};

// Method PUT
export const requestPut = (path, config, readed) => {	
	axios.get(path, params)
		.then(response => readed({
			isSuccess: true,
			data: response.data
		}))
		.catch(error => readed({
			isSuccess: false,
			data: error
		}))
};

// Mapping_(start)
export const authenticationResponseMapper = data => {
	const { user_info, protocol } = data;	
	const userRoleId = Number(user_info.user_role_id);
					
	let resultObj = {
		userInfo: {
			id: Number(user_info.id),
			name: user_info.name,
			userRoleId,
			userRole: findEnumVariable(userRoles, userRoleId)
		},
		gameInfo: null,
		protocol
	};
	
	if (userRoleId === 3) {
		const { game_info, game_owner_name, gamer_list } = data;
		
		resultObj = {
			...resultObj,
			gameInfo: {
				gameId: Number(game_info.id),
				name: game_info.name,
				gameOwnerName: game_owner_name,
				date: game_info.date,
				time: game_info.time,
				isGameBegun: Number(game_info.is_game_begun) > 0,
				gamerList: gamer_list.map(item => ({
					id: Number(item.id),
					name: item.name,
					color: item.color
				}))
			}
		};
	}
	
	return resultObj;
};

const gamersMapper = gamers => {	
	if (!gamers) {
		return [];
	}

	return gamers.reduce((gamer, { id, name, login, password, user_role_id }) => (
		gamer.concat({
			id: Number(id),
			name,
			login,
			password,
			userRoleId: Number(user_role_id)
		})
	), []);
};

export const getDreamMapper = (data) => {	
	const { user_model_dream } = data;
	const id = Number(user_model_dream.big_path_position_id);
	
	return {
		bigPathId: id === -1 ? null : id,
		price: user_model_dream.price,
		title: user_model_dream.title
	};
};

export const ownerCreatedGamesResponseMapper = (data = []) => (
	data.reduce((acc, { date, game_id, gamers, name, time, is_game_begun }) => (
		acc.concat({
			date,
			gameId: Number(game_id),
			gamers: gamersMapper(gamers),
			name,
			time,
			isGameBegun: Number(is_game_begun)
		})
	), [])
);

export const gamePagePreparationMapper = data => {
	return {
		info: {
			color: data.user_model.color,
			isSmallPath: Number(data.user_model.is_small_path) === 1,
			pathPositionId: Number(data.user_model.path_position_id),
			coordinates: {
				left: data.user_model.path_position_left,
				top: data.user_model.path_position_top
			}
		},
		profession: {
			info: {
				professionId: Number(data.user_model.id),
				professionName: data.user_model.profession_name
			},
			incomes: {
				salary: Number(data.user_model_incomes_const.salary),
				actions: data.user_model_actions.map(item => ({
					id: Number(item.id),
					name: item.name,
					count: Number(item.count),
					price: Number(item.price),
					cost: Number(item.cost),
					income: Number(item.income)
				})),
				realEstate: data.user_model_real_estate.map(item => ({
					id: Number(item.id),
					name: item.name,
					deposit: Number(item.deposit),
					price: Number(item.price),
					bail: Number(item.bail),
					income: Number(item.income)
				})),
				business: data.user_model_business.map(item => ({
					id: Number(item.id),
					name: item.name,
					deposit: Number(item.deposit),
					price: Number(item.price),
					bail: Number(item.bail),
					income: Number(item.income)
				})),
				passiveIncome: arithmeticMapper(data.user_model_arithmetic.incomes_passive_incomes),
				totalIncomes: arithmeticMapper(data.user_model_arithmetic.incomes_total_incomes)
			},
			expenses: {
				taxes: Number(data.user_model_expenses_const.taxes),
				percentagesExpensesOfMortage: Number(data.user_model_expenses_const.percentagesExpensesOfMortage),
				expensesByEducationPosition: Number(data.user_model_expenses_const.expensesByEducationPosition),
				carExpenses: Number(data.user_model_expenses_const.expensesByEducationPosition),
				creditCardsExpenses: Number(data.user_model_expenses_const.creditCardsExpenses),
				retailPurchasesExpenses: Number(data.user_model_expenses_const.retailPurchasesExpenses),
				otherExpenses: Number(data.user_model_expenses_const.otherExpenses),
				childrenExpenses: arithmeticMapper(data.user_model_arithmetic.expenses_children_expenses),
				totalExpenses: arithmeticMapper(data.user_model_arithmetic.expenses_total_expenses)
			},
			moneyFlow: arithmeticMapper(data.user_model_arithmetic.money_flow),
			cash: arithmeticMapper(data.user_model_arithmetic.cash),
			assets: {
				savings: Number(data.user_model_assets_const.savings)
			},
			creditLiabilities: {
				mortage: Number(data.user_model_credit_liabilities_const.mortage),
				educationLoan: Number(data.user_model_credit_liabilities_const.educationLoan),
				carLoan: Number(data.user_model_credit_liabilities_const.carLoan),
				creditCards: Number(data.user_model_credit_liabilities_const.creditCards),
				debtForRetailPurchases: Number(data.user_model_credit_liabilities_const.debtForRetailPurchases)
			},
			childExpenses: Number(data.user_model_child_expenses_const.value),
			total: {
				incomes: {
					actions: Number(data.user_model_total.incomes_actions),
					realEstate: Number(data.user_model_total.incomes_real_estate),
					business: Number(data.user_model_total.incomes_business)
				}
			}
		},
		bigPathCard: {
			buyedDreams: data.user_model_big_path_card.user_model_buyed_dreams.map(item => ({
				id: Number(item.id),
				name: item.name,
				price: Number(item.price)
			})),
			buyedBusiness: data.user_model_big_path_card.user_model_buyed_business.map(item => ({
				id: Number(item.id),
				name: item.name,
				passiveIncomes: Number(item.passive_incomes),
				moneyFlow: Number(item.money_flow)
			})),
			buyedCash: arithmeticMapper(data.user_model_big_path_card.user_model_buyed_cash),
		}
	}
	
	function arithmeticMapper(property) {
		return property.map(item => ({
			id: Number(item.id),
			value: Number(item.value),
			result: Number(item.result)
		}));
	}
};

export const professionCardChangeObjKeyMapper = (objKey) => {	
	let result = {
		property: null,
		sub_property: null
	};
	
	console.log('~', objKey)
	
	switch (objKey) {
		// Small path_(start)
		case 'incomes.passiveIncome':
			result.property = 'incomes';
			result.sub_property = 'passive_incomes';
			break;
			
		case 'incomes.totalIncomes':
			result.property = 'incomes';
			result.sub_property = 'total_incomes';
			break;
			
		case 'expenses.childrenExpenses':
			result.property = 'expenses';
			result.sub_property = 'children_expenses';
			break;
			
		case 'expenses.totalExpenses':
			result.property = 'expenses';
			result.sub_property = 'total_expenses';
			break;
			
		case 'moneyFlow':
			result.property = 'money_flow';
			result.sub_property = '-1';
			break;
			
		case 'cash':
			result.property = 'cash';
			result.sub_property = '-1';
			break;
		// Small path_(end)
		
		// Big path_(start)
		case 'buyedDreams':
			result.property = 'buyed_dreams';
			result.sub_property = '-1';
			break;
		// Big path_(end)
			
		default:
			result.property = null;
	}
	
	return result;
};

export const getAgreementMapper = data => {
	const { cards_transfer } = data;
	return {
		id: Number(cards_transfer.id),
		cardId: Number(cards_transfer.card_id),
		gamerIdRedirect: Number(cards_transfer.gamer_id_redirect),
		gamerIdTurn: Number(cards_transfer.gamer_id_turn)
	}
};
// Mapping_(end)

// Request creator
export const executeRequestGet = (request, callBack) => {	
	const { 
		endPointURL,
		query = null
	} = request;
	
	const endPoint = hostURL + '/' + endPointURL;
	const queryPresentData = query ? '/?' + query : '';
	
	requestGet(endPoint + queryPresentData, ({ isSuccess, data }) => {		
		if (isSuccess && data) {
			callBack({ isSuccess: true, data });
			return;
		} 
		
		callBack({ isSuccess: false, data: 'Server error: ', data });
	});
};

export const executeRequestGetWrapper = (request, { onSuccess, onPending, onFail }) => {
	onPending();
	
	executeRequestGet(request, ({ isSuccess, data }) => {
		if (isSuccess && data) {
			onSuccess(data);
		}
		
		if (!isSuccess) {
			onFail(data);
		}
	});
};

// const options = {
	// method: 'GET',
	// mode: 'no-cors',
	// headers: {
		// "Access-Control-Allow-Origin": "*",
		// 'Content-Type': 'text/html; charset=UTF-8'
	// }
// };

// POST doesnt work