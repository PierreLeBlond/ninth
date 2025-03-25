import { describe, expect, it, suite, test } from 'vitest';
import { prepare } from '$lib/game/prepare';
import { putCard } from '$lib/player/putCard';
import { expectValidGameState } from '../testHelpers';

const getGameState = () => {
	const gameState = prepare();
	gameState.pickedCard = gameState.board[0];
	gameState.board[0] = null;
	gameState.players[0].hand = gameState.remainingCards.slice(0, 2);
	gameState.remainingCards = gameState.remainingCards.slice(2);
	return gameState;
};

describe('putCard', () => {
	it("should throw if the player hasn't picked a card yet", () => {
		const gameState = prepare();
		expect(() => putCard(gameState, 0, 0)).toThrowError('Player has not picked a card yet');
	});

	suite('should throw if the card index is out of the board', () => {
		const gameState = getGameState();
		test.each([-1, gameState.board.length])('when the card index is %d', (cardIndex) => {
			expect(() => putCard(gameState, cardIndex, 0)).toThrowError('Out of bounds index');
		});
	});

	it('should throw if a card is already on the board', () => {
		const gameState = getGameState();
		expect(() => putCard(gameState, 1, 0)).toThrowError('Card already on board');
	});

	it('should throw if the card is not on player hand', () => {
		const gameState = getGameState();
		expect(() => putCard(gameState, 0, 3)).toThrowError('No card on hand');
	});

	it('should put the card on the board', () => {
		const gameState = getGameState();
		const nextGameState = putCard(gameState, 0, 0);
		expectValidGameState(nextGameState);

		expect(nextGameState.board[0].index).toBe(gameState.players[0].hand[0].index);
	});

	it('should return a modified deep copy of the game state', () => {
		const gameState = getGameState();
		const nextGameState = putCard(gameState, 0, 0);
		expect(nextGameState).not.equal(gameState);
	});
});
