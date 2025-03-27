import { areCardsTheSame } from '$lib/card/areCardsTheSame';
import { AgainstTheRulesError, MissingCardError } from '$lib/errors';
import type { GameState } from '$lib/types/GameState';

export const pickAlignment = (gameState: GameState, alignment: number[]) => {
	if (!gameState.pickedCard) {
		throw new AgainstTheRulesError(gameState, 'Player has not picked a card yet');
	}

	if (alignment.some((index) => index < 0 || index >= gameState.board.length)) {
		throw new MissingCardError(-1, gameState, 'Out of bounds indexes');
	}

	const cards = alignment.map((index) => gameState.board[index]);

	if (!areCardsTheSame(cards)) {
		throw new AgainstTheRulesError(gameState, 'Invalid alignment');
	}

	const nextGameState = structuredClone(gameState);

	alignment.forEach((index) => {
		nextGameState.players[nextGameState.activePlayer].wonCards.push(nextGameState.board[index]);
		nextGameState.board[index] = null;
	});

	return nextGameState;
};
