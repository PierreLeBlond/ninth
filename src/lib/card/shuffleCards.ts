import type { Card } from '$lib/types/Card';

export const shuffleCards = (cards: Card[]): Card[] => {
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}

	return cards;
};
