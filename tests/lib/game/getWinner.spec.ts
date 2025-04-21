import { getWinner } from '$lib/game/getWinner';
import { prepare } from '$lib/game/prepare';
import { describe, expect, it } from 'vitest';

describe('getWinner', () => {
	it('should return no winner for a just prepared game', () => {
		const gameState = prepare();
		expect(getWinner(gameState)).toBe(null);
	});

	it('should return no winner if players have the same score', () => {
		const gameState = prepare();
		gameState.players[0].wonCards = [
			{ type: 'Me', index: 0 },
			{ type: 'V', index: 1 },
			{ type: 'E', index: 2 }
		];
		gameState.players[1].wonCards = [
			{ type: 'Ma', index: 0 },
			{ type: 'J', index: 1 },
			{ type: 'Sa', index: 2 }
		];
		expect(getWinner(gameState)).toBe(null);
	});

	it('should return the winner if one player has a better score than the others', () => {
		const gameState = prepare();
		gameState.players[0].wonCards = [
			{ type: 'Me', index: 0 },
			{ type: 'V', index: 1 },
			{ type: 'E', index: 2 }
		];
		gameState.players[1].wonCards = [
			{ type: 'Ma', index: 0 },
			{ type: 'J', index: 1 }
		];
		expect(getWinner(gameState)).toBe(0);
	});
});
