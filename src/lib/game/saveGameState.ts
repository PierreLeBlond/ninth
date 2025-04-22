import type { GameState } from '$lib/types/GameState';

export const saveGameState = (roomId: string, gameState: GameState) => {
	localStorage.setItem(`gameState-${roomId}`, JSON.stringify(gameState));
};
