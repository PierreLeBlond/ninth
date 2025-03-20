import type { GameState } from '$lib/types/GameState';

export const isOver = (gameState: GameState) => {
	return gameState.remainingCards.length === 0;
};
