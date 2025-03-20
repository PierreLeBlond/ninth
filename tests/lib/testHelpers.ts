import { expect } from 'vitest';
import type { GameState } from '$lib/types/GameState';
import { NUMBER_OF_CARDS_OF_EACH_TYPE, CARDS_NAMES, BOARD_SIZE } from '$lib/config';

export function expectValidGameState(gameState: GameState) {
	// Check basic structure
	expect(gameState).toBeDefined();
	expect(gameState).toHaveProperty('currentPlayer');
	expect(gameState).toHaveProperty('players');
	expect(gameState).toHaveProperty('board');
	expect(gameState).toHaveProperty('remainingCards');
	expect(gameState).toHaveProperty('discardedCards');
	expect(gameState).toHaveProperty('pickedCard');

	// Check types
	expect(typeof gameState.currentPlayer).toBe('number');
	expect(Array.isArray(gameState.players)).toBe(true);
	expect(Array.isArray(gameState.board)).toBe(true);
	expect(Array.isArray(gameState.remainingCards)).toBe(true);
	expect(Array.isArray(gameState.discardedCards)).toBe(true);

	// Check players structure
	expect(gameState.players).toHaveLength(2);
	gameState.players.forEach((player) => {
		expect(player).toHaveProperty('hand');
		expect(player).toHaveProperty('wonCards');
		expect(Array.isArray(player.hand)).toBe(true);
		expect(Array.isArray(player.wonCards)).toBe(true);
	});

	// Check that the board has the correct number of valid cards
	expect(gameState.board).toHaveLength(BOARD_SIZE);
	gameState.board.forEach((card) => {
		expect([...CARDS_NAMES, null]).toContain(card);
	});

	// Check that the whole set of cards is valid
	const allCards = [
		...gameState.board,
		...gameState.remainingCards,
		...gameState.discardedCards,
		...gameState.players.flatMap((p) => [...p.hand, ...p.wonCards]),
		gameState.pickedCard
	];

	const numberOfCards = allCards.filter((card) => card !== null).length;

	// Check that total number of cards is correct
	expect(numberOfCards).toBe(NUMBER_OF_CARDS_OF_EACH_TYPE * CARDS_NAMES.length);

	// Check that each card type has the correct number of cards
	CARDS_NAMES.forEach((cardName) => {
		const numberOfCardsOfThisType = allCards.filter((card) => card === cardName).length;
		expect(numberOfCardsOfThisType).toBe(NUMBER_OF_CARDS_OF_EACH_TYPE);
	});
}
