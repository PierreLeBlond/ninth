import { describe, it, expect } from 'vitest';
import { endTurn } from '$lib/player/endTurn';
import { prepare } from '$lib/game/prepare';
import { expectValidGameState } from '../testHelpers';

describe('endTurn', () => {
	it('should end turn', () => {
		const gameState = prepare();
		const nextGameState = endTurn(gameState);
		expectValidGameState(nextGameState);
	});

	it('should put picked card on hand', () => {
		const gameState = prepare();
		gameState.pickedCard = gameState.board[0];
		const nextGameState = endTurn(gameState);
		expect(
			nextGameState.players[0].hand.find((card) => card.index === gameState.pickedCard?.index)
		).not.toBeNull();
		expect(nextGameState.pickedCard).toBeNull();
	});

	it('should switch to the next player', () => {
		const gameState = prepare();
		const currentPlayer = gameState.activePlayer;
		const numberOfPlayers = gameState.players.length;

		const nextGameState = endTurn(gameState);

		expect(nextGameState.activePlayer).toBe((currentPlayer + 1) % numberOfPlayers);
	});

	it('should fill empty places on the board with the remaining cards', () => {
		const gameState = prepare();
		gameState.board[0] = null;
		gameState.board[1] = null;
		gameState.remainingCards = [
			{ type: 'Mercury', index: 0 },
			{ type: 'Venus', index: 1 }
		];
		const nextGameState = endTurn(gameState);
		expect(nextGameState.board[0]).toEqual({ type: 'Mercury', index: 0 });
		expect(nextGameState.board[1]).toEqual({ type: 'Venus', index: 1 });
		expect(nextGameState.remainingCards).toHaveLength(0);
	});
});
