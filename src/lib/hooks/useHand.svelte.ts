import type { GameState } from '$lib/types/GameState';

export const useHand = (params: { gameState: GameState; player: number }) => {
	let drawnCardIndex: number | null = $state(null);

	let hand = $derived(
		params.gameState.players[params.player].hand.filter((_, index) => index !== drawnCardIndex)
	);

	const drawCard = (index: number) => {
		drawnCardIndex = index;
	};

	const undrawCard = () => {
		drawnCardIndex = null;
	};

	return {
		get drawnCardIndex() {
			return drawnCardIndex;
		},
		get hand() {
			return hand;
		},
		drawCard,
		undrawCard
	};
};
