import type { GameState } from '$lib/types/GameState';

export function endTurn(gameState: GameState): GameState {
	const nextGameState = structuredClone(gameState);

	nextGameState.players[nextGameState.activePlayer].hand.push(nextGameState.pickedCard);
	nextGameState.pickedCard = null;

	nextGameState.activePlayer = (nextGameState.activePlayer + 1) % nextGameState.players.length;

	nextGameState.board = nextGameState.board.map(
		(card) => card ?? (nextGameState.remainingCards.shift() || null)
	);

	return nextGameState;
}
