import { expect } from 'vitest';
import type { GameState } from '$lib/types/GameState';
import { NUMBER_OF_CARDS_OF_EACH_TYPE, CARDS_TYPES, BOARD_SIZE } from '$lib/config';

export function expectValidGameState(gameState: GameState) {
	// Check basic structure
	expect(gameState).toBeDefined();
	expect(gameState).toHaveProperty('activePlayer');
	expect(gameState).toHaveProperty('players');
	expect(gameState).toHaveProperty('board');
	expect(gameState).toHaveProperty('remainingCards');
	expect(gameState).toHaveProperty('discardedCards');
	expect(gameState).toHaveProperty('pickedCard');

	// Check types
	expect(typeof gameState.activePlayer).toBe('number');
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

	// Check that the board has the correct number of cards
	expect(gameState.board).toHaveLength(BOARD_SIZE);

	// Check that the whole set of cards is valid
	const allCards = [
		...gameState.board,
		...gameState.remainingCards,
		...gameState.discardedCards,
		...gameState.players.flatMap((p) => [...p.hand, ...p.wonCards]),
		gameState.pickedCard
	].filter((card) => card !== null);

	const numberOfCards = allCards.length;

	// Check that total number of cards is correct
	expect(numberOfCards).toBe(NUMBER_OF_CARDS_OF_EACH_TYPE * CARDS_TYPES.length);

	// Check that each card type has the correct number of cards
	CARDS_TYPES.forEach((cardType) => {
		const numberOfCardsOfThisType = allCards.filter((card) => card.type === cardType).length;
		expect(numberOfCardsOfThisType).toBe(NUMBER_OF_CARDS_OF_EACH_TYPE);
	});

	// Each card is uniquely indexed
	Array.from({ length: numberOfCards }, (_, index) => index).forEach((index) => {
		expect(allCards.find((card) => card.index === index) ?? null).not.toBeNull();
	});
}
