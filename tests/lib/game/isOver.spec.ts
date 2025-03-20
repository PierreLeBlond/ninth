import { isOver } from '$lib/game/isOver';
import { prepare } from '$lib/game/prepare';
import { describe, expect, it } from 'vitest';

describe('isOver', () => {
	it('should return false if the game has just been prepared', () => {
		const gameState = prepare();
		expect(isOver(gameState)).toBe(false);
	});

	it('should return true if the game is over', () => {
		const gameState = prepare();
		gameState.remainingCards = [];
		expect(isOver(gameState)).toBe(true);
	});
});
