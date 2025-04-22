import type { GameState } from '$lib/types/GameState';
import { useHistory } from '$lib/hooks/useHistory.svelte';
import { useGameSocket } from '$lib/hooks/ws/useGameSocket.svelte';
import { env } from '$env/dynamic/public';
import { isOver } from '$lib/game/isOver';
import { getInitialGameState } from '$lib/game/getInitialGameState';
import { saveGameState } from '$lib/game/saveGameState';

export const useGameStateManager = (params: { roomId: string }) => {
	const initialGameState = getInitialGameState(params.roomId);
	let gameState = $state(initialGameState);

	let gameOver = $state(false);

	// History management. Not send to other clients. Another client emit will reset the history though.
	const updateGameStateFromHistory = (updatedGameState: GameState) => {
		updateGameStateCore(updatedGameState);
	};
	const history = useHistory({
		updateState: updateGameStateFromHistory
	});
	history.addState($state.snapshot(initialGameState));
	const addToHistory = (updatedGameState: GameState) => {
		history.addState($state.snapshot(updatedGameState));
	};

	// Communicate between clients
	const updateGameStateFromWs = (updatedGameState: GameState) => {
		updateGameStateCore(updatedGameState);
		addToHistory(updatedGameState);
	};
	const { emitGameState, disconnect } = useGameSocket({
		wsDomain: env.PUBLIC_WS_URL,
		roomId: params.roomId,
		get gameState() {
			return gameState;
		},
		onGameState: updateGameStateFromWs
	});

	// Will always happen
	const updateGameStateCore = (updatedGameState: GameState) => {
		gameState = updatedGameState;
		gameOver = isOver(gameState);
		saveGameState(params.roomId, gameState);
	};

	// Update from in game player actions
	const updateGameState = (updatedGameState: GameState) => {
		updateGameStateCore(updatedGameState);
		addToHistory(updatedGameState);
		emitGameState(updatedGameState);
	};

	return {
		get gameState() {
			return gameState;
		},
		get gameOver() {
			return gameOver;
		},
		updateGameState,
		destroy: () => {
			disconnect();
		}
	};
};
