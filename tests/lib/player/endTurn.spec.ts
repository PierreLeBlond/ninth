import { describe, it, expect } from 'vitest';
import { endTurn } from '$lib/player/endTurn';
import { prepare } from '$lib/game/prepare';

describe('endTurn', () => {
	it('should put picked card on hand', () => {
		const gameState = prepare();
		gameState.pickedCard = gameState.board[0];
		const nextGameState = endTurn(gameState);
		expect(nextGameState.players[0].hand).toContain(gameState.pickedCard);
	});

	it('should switch to the next player', () => {
		const gameState = prepare();
		const currentPlayer = gameState.currentPlayer;
		const numberOfPlayers = gameState.players.length;

		const nextGameState = endTurn(gameState);

		expect(nextGameState.currentPlayer).toBe((currentPlayer + 1) % numberOfPlayers);
	});

	it('should fill empty places on the board with the remaining cards', () => {
		const gameState = prepare();
		gameState.board[0] = null;
		gameState.board[1] = null;
		gameState.remainingCards = ['Mercury', 'Venus'];
		const nextGameState = endTurn(gameState);
		expect(nextGameState.board[0]).toBe('Mercury');
		expect(nextGameState.board[1]).toBe('Venus');
		expect(nextGameState.remainingCards).toHaveLength(0);
	});
});
