import type { GameState } from '$lib/types/GameState';
import { NUMBER_OF_CARDS_OF_EACH_TYPE, CARDS_TYPES, BOARD_SIZE } from '$lib/config';
import { shuffleCards } from '$lib/card/shuffleCards';

export function prepare(): GameState {
	const allCards = CARDS_TYPES.flatMap((cardType, typeIndex) =>
		Array.from({ length: NUMBER_OF_CARDS_OF_EACH_TYPE }, (_, index) => ({
			type: cardType,
			index: typeIndex * NUMBER_OF_CARDS_OF_EACH_TYPE + index
		}))
	);

	const shuffledCards = shuffleCards(allCards);

	const board = shuffledCards.slice(0, BOARD_SIZE);
	const remainingCards = shuffledCards.slice(BOARD_SIZE);

	return {
		activePlayer: 0,
		players: [
			{ hand: [], wonCards: [] },
			{ hand: [], wonCards: [] }
		],
		board,
		remainingCards,
		discardedCards: [],
		pickedCard: null
	};
}
