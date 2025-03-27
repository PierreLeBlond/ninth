import { getAlignments } from '$lib/game/getAlignments';
import type { GameState } from '$lib/types/GameState';

export const useBoard = (params: {
	gameState: GameState;
	activePlayer: {
		hasPickedACard: boolean;
		hasDrawnACard: boolean;
	};
}) => {
	let canPick = $derived(!params.activePlayer.hasPickedACard);
	let canAlignment = $derived(params.activePlayer.hasPickedACard);
	let canPut = $derived(params.activePlayer.hasPickedACard && params.activePlayer.hasDrawnACard);

	let alignments = $derived.by(() => {
		if (!canAlignment) {
			return [];
		}
		return getAlignments(params.gameState);
	});

	return {
		get alignments() {
			return alignments;
		},
		get canPick() {
			return canPick;
		},
		get canPut() {
			return canPut;
		},
		get board() {
			return params.gameState.board;
		}
	};
};
