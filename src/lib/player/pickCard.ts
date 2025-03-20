import { AgainstTheRulesError, MissingCardError } from '$lib/errors';
import type { GameState } from '$lib/types/GameState';

export const pickCard = (gameState: GameState, cardIndex: number): GameState => {
	if (gameState.pickedCard) {
		throw new AgainstTheRulesError(gameState, 'Player has already picked a card');
	}

	if (cardIndex < 0 || cardIndex >= gameState.board.length) {
		throw new MissingCardError(cardIndex, gameState, 'Out of bounds index');
	}

	const nextGameState = structuredClone(gameState);
	const card = nextGameState.board[cardIndex];
	if (!card) {
		throw new MissingCardError(cardIndex, gameState, 'No card on board');
	}

	nextGameState.board[cardIndex] = null;
	nextGameState.pickedCard = card;
	return nextGameState;
};
