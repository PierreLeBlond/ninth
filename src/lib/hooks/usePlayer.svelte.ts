import type { GameState } from '$lib/types/GameState';
import { useHand } from './useHand.svelte';

export const usePlayer = (params: {
	gameState: GameState;
	player: number;
	controllablePlayers: number[];
}) => {
	const hand = useHand({
		get gameState() {
			return params.gameState;
		},
		player: params.player
	});

	let pickedCard = $derived(
		params.gameState.activePlayer === params.player ? params.gameState.pickedCard : null
	);

	let hasPickedACard = $derived(pickedCard !== null);

	let hasDrawnACard = $derived(hand.drawnCardIndex !== null);

	let drawnCard = $derived(
		hand.drawnCardIndex !== null
			? params.gameState.players[params.player].hand[hand.drawnCardIndex]
			: null
	);

	let isActive = $derived(params.gameState.activePlayer === params.player);

	return {
		get pickedCard() {
			return pickedCard;
		},
		get hasPickedACard() {
			return hasPickedACard;
		},
		get drawCard() {
			return hand.drawCard;
		},
		get hasDrawnACard() {
			return hasDrawnACard;
		},
		get drawnCard() {
			return drawnCard;
		},
		get undrawCard() {
			return hand.undrawCard;
		},
		get hand() {
			return hand.hand;
		},
		get drawnCardIndex() {
			return hand.drawnCardIndex;
		},
		get isActive() {
			return isActive;
		},
		get wonCards() {
			return params.gameState.players[params.player].wonCards;
		},
		get isControllable() {
			return params.controllablePlayers.includes(params.player);
		}
	};
};
