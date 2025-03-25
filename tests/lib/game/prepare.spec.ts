import { describe, expect, it } from 'vitest';
import { prepare } from '$lib/game/prepare';
import { expectValidGameState } from '../testHelpers';
import { BOARD_SIZE, CARDS_TYPES, NUMBER_OF_CARDS_OF_EACH_TYPE } from '$lib/config';

describe('prepare', () => {
	it('should return a valid GameState', () => {
		const gameState = prepare();
		expectValidGameState(gameState);
	});

	it('should put all cards in the remainingCards array', () => {
		const gameState = prepare();
		expect(gameState.remainingCards).toHaveLength(
			NUMBER_OF_CARDS_OF_EACH_TYPE * CARDS_TYPES.length - BOARD_SIZE
		);
	});

	it('should return a shuffled GameState', () => {
		const gameState = prepare();
		const anotherGameState = prepare();
		expect(anotherGameState).not.toEqual(gameState);
	});
});
