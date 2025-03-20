import { prepare } from '$lib/game/prepare';
import { pickAlignment } from '$lib/player/pickAlignment';
import { describe, it, expect } from 'vitest';

const getGameState = () => {
	const gameState = prepare();
	gameState.pickedCard = gameState.board[0];
	gameState.board = [
		'Mercury',
		'Mercury',
		'Mercury',
		'Mars',
		'Jupiter',
		'Saturn',
		'Uranus',
		'Neptune',
		'Neptune'
	];
	return gameState;
};

describe('pickAlignment', () => {
	it('should throw if the player has not picked a card yet', () => {
		const gameState = prepare();
		expect(() => pickAlignment(gameState, [0, 1, 2])).toThrowError(
			'Player has not picked a card yet'
		);
	});

	it('should throw if the alignment contains out of bounds indexes', () => {
		const gameState = getGameState();
		expect(() => pickAlignment(gameState, [-1, 1, 2])).toThrowError('Out of bounds indexes');
	});

	it('should throw if the alignment is not valid', () => {
		const gameState = getGameState();
		expect(() => pickAlignment(gameState, [1, 2, 3])).toThrowError('Invalid alignment');
	});

	it('should remove the alignment from the board', () => {
		const gameState = getGameState();
		const newGameState = pickAlignment(gameState, [0, 1, 2]);
		expect(newGameState.board).toEqual([
			null,
			null,
			null,
			'Mars',
			'Jupiter',
			'Saturn',
			'Uranus',
			'Neptune',
			'Neptune'
		]);
	});

	it('should put alignment in players won cards', () => {
		const gameState = getGameState();
		const newGameState = pickAlignment(gameState, [0, 1, 2]);
		expect(newGameState.players[newGameState.currentPlayer].wonCards).toEqual([
			'Mercury',
			'Mercury',
			'Mercury'
		]);
	});
});
