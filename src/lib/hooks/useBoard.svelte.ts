import { getAlignments } from '$lib/game/getAlignments';
import type { GameState } from '$lib/types/GameState';

export const useBoard = (params: {
	gameState: GameState;
	currentPlayer: {
		hasPickedACard: boolean;
		hasDrawnACard: boolean;
	};
}) => {
	let canPick = $derived(!params.currentPlayer.hasPickedACard);
	let canAlignment = $derived(params.currentPlayer.hasPickedACard);
	let canPut = $derived(params.currentPlayer.hasPickedACard && params.currentPlayer.hasDrawnACard);

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
