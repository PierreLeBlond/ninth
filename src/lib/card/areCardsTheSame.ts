import type { CardName } from '$lib/config';

export const areCardsTheSame = (cards: CardName[]) => {
	const firstCard = cards[0];
	if (firstCard === null) {
		return false;
	}

	return cards.every((card) => card === firstCard);
};
