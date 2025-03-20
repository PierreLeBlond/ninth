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
		gameState.players[0].wonCards = ['Mercury', 'Venus', 'Earth'];
		gameState.players[1].wonCards = ['Mars', 'Jupiter', 'Saturn'];
		expect(getWinner(gameState)).toBe(null);
	});

	it('should return the winner if one player has a better score than the others', () => {
		const gameState = prepare();
		gameState.players[0].wonCards = ['Mercury', 'Venus', 'Earth'];
		gameState.players[1].wonCards = ['Mars', 'Jupiter'];
		expect(getWinner(gameState)).toBe(gameState.players[0]);
	});
});
