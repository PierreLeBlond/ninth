import type { GameState } from '$lib/types/GameState';

export function endTurn(gameState: GameState): GameState {
	const nextGameState = structuredClone(gameState);

	nextGameState.players[nextGameState.currentPlayer].hand.push(nextGameState.pickedCard);

	nextGameState.currentPlayer = (nextGameState.currentPlayer + 1) % nextGameState.players.length;

	nextGameState.board = nextGameState.board.map(
		(card) => card ?? (nextGameState.remainingCards.shift() || null)
	);

	return nextGameState;
}
