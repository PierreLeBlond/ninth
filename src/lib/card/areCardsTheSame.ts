import type { Card } from '$lib/types/Card';

export const areCardsTheSame = (cards: Card[]) => {
	const firstCard = cards[0];
	if (firstCard === null) {
		return false;
	}

	return cards.every((card) => card !== null && card.type === firstCard.type);
};
