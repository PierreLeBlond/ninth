import type { GameState } from '$lib/types/GameState';
import { prepare } from './prepare';

export const getInitialGameState = (roomId: string): GameState => {
	const localSerializedGameState = localStorage.getItem(`gameState-${roomId}`);
	if (localSerializedGameState) {
		return JSON.parse(localSerializedGameState);
	}

	const initialGameState = prepare();
	localStorage.setItem(`gameState-${roomId}`, JSON.stringify(initialGameState));

	return initialGameState;
};
