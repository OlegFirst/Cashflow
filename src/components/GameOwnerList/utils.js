// Mappers_(start)
export const getGameOwnersMapper = data => {	
	return data.map(({ owner, game_rent, games }) => ({
		owner: {
			id: Number(owner.id),
			name: owner.name,
			login: owner.login,
			password: owner.password,
			startingRentDate: game_rent.starting_rent_date,
			endingRentDate: game_rent.ending_rent_date
		},
		games: games.map(game => ({
			id: Number(game.id),
			name: game.name,
			date: game.date,
			time: game.time,
			isGameBegun: Number(game.is_game_begun) === 1
		}))
	}));
};
// Mappers_(end)