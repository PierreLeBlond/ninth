import type { Card } from '$lib/types/Card';

export type Player = {
	hand: Card[];
	wonCards: Card[];
};
