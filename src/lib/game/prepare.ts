import type { GameState } from '$lib/types/GameState';
import { NUMBER_OF_CARDS_OF_EACH_TYPE, CARDS_NAMES, BOARD_SIZE } from '$lib/config';
import { shuffleCards } from '$lib/card/shuffleCards';

export function prepare(): GameState {
	const allCards = CARDS_NAMES.flatMap((cardName) =>
		Array.from({ length: NUMBER_OF_CARDS_OF_EACH_TYPE }, () => cardName)
	);

	const shuffledCards = shuffleCards(allCards);

	const board = shuffledCards.slice(0, BOARD_SIZE);
	const remainingCards = shuffledCards.slice(BOARD_SIZE);

	return {
		currentPlayer: 0,
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
