import type { GameState } from '$lib/types/GameState';
import type { Player } from '$lib/types/Player';

export const getWinner = (gameState: GameState) => {
	const winner = gameState.players.reduce((winner: Player | null, player) => {
		if (winner === null) {
			return player.wonCards.length > 0 ? player : null;
		}

		if (player.wonCards.length === winner.wonCards.length) {
			return null;
		}

		return player.wonCards.length > winner.wonCards.length ? player : winner;
	}, null);

	return winner ? gameState.players.indexOf(winner) : null;
};
