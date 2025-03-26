import type { Card } from './Card';
import type { Player } from './Player';

export type GameState = {
	currentPlayer: number;
	players: Player[];
	board: (Card | null)[];
	remainingCards: Card[];
	discardedCards: Card[];
	pickedCard: Card | null;
};
