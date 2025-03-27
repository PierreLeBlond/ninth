import { MissingCardError, ExistingCardError, AgainstTheRulesError } from '$lib/errors';
import type { GameState } from '$lib/types/GameState';

export const putCard = (gameState: GameState, boardIndex: number, handIndex: number) => {
	if (gameState.pickedCard === null) {
		throw new AgainstTheRulesError(gameState, 'Player has not picked a card yet');
	}

	if (boardIndex < 0 || boardIndex >= gameState.board.length) {
		throw new MissingCardError(boardIndex, gameState, 'Out of bounds index');
	}

	if (gameState.board[boardIndex] !== null) {
		throw new ExistingCardError(boardIndex, gameState, 'Card already on board');
	}

	const nextGameState = structuredClone(gameState);

	const card = nextGameState.players[nextGameState.activePlayer].hand[handIndex];
	nextGameState.players[nextGameState.activePlayer].hand.splice(handIndex, 1);
	if (!card) {
		throw new MissingCardError(handIndex, gameState, 'No card on hand');
	}

	nextGameState.board[boardIndex] = card;
	return nextGameState;
};
