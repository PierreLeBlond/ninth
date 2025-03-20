import { describe, expect, it, suite, test } from 'vitest';
import { prepare } from '$lib/game/prepare';
import { expectValidGameState } from '../testHelpers';
import { pickCard } from '$lib/player/pickCard';

describe('pickCard', () => {
	it('should return a modified deep copy of the game state', () => {
		const gameState = prepare();
		const nextGameState = pickCard(gameState, 0);
		expect(nextGameState).not.equal(gameState);
	});

	it('should pick a card from the board', () => {
		const gameState = prepare();
		const pickedCard = gameState.board[0];

		const nextGameState = pickCard(gameState, 0);
		expectValidGameState(nextGameState);

		expect(nextGameState.board).toEqual([null, ...gameState.board.slice(1)]);
		expect(nextGameState.pickedCard).toEqual(pickedCard);
	});

	suite('should throw if the card index is out of bounds', () => {
		const gameState = prepare();
		test.each([-1, gameState.board.length])('when the card index is %d', (cardIndex) => {
			expect(() => pickCard(gameState, cardIndex)).toThrowError('Out of bounds index');
		});
	});

	it('should throw when no card is found at index', () => {
		const gameState = prepare();
		gameState.board[0] = null;
		expect(() => pickCard(gameState, 0)).toThrowError('No card on board');
	});

	it('should throw if a card is already picked', () => {
		const gameState = prepare();
		gameState.pickedCard = gameState.board[0];
		expect(() => pickCard(gameState, 0)).toThrowError('Player has already picked a card');
	});
});
