import type { CardName } from '$lib/config';
import type { Player } from './Player';

export type GameState = {
	currentPlayer: number;
	players: [Player, Player];
	board: CardName[];
	remainingCards: CardName[];
	discardedCards: CardName[];
	pickedCard: CardName | null;
};
