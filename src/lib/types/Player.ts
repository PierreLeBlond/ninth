import type { CardName } from '$lib/config';

export type Player = {
	hand: CardName[];
	wonCards: CardName[];
};
