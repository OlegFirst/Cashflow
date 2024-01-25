// Mappers_(start)
export const getGameOwnersMapper = data => {
	return data.map(({ owner, games }) => ({
		owner: {
			id: Number(owner.id),
			name: owner.name,
			login: owner.login,
			password: owner.password
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