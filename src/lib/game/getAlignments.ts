import type { GameState } from '$lib/types/GameState';
import { BOARD_HEIGHT, BOARD_WIDTH } from '$lib/config';
import { areCardsTheSame } from '$lib/card/areCardsTheSame';

type Alignment = number[];

export const getAlignments = (gameState: Readonly<GameState>): Alignment[] => {
	const alignments: Alignment[] = [];

	// Check horizontal alignments
	for (let row = 0; row < BOARD_HEIGHT; row++) {
		const startIndex = row * BOARD_WIDTH;
		const rowCards = gameState.board.slice(startIndex, startIndex + BOARD_WIDTH);

		if (areCardsTheSame(rowCards)) {
			alignments.push(rowCards.map((_, index) => startIndex + index));
		}
	}

	// Check vertical alignments
	for (let col = 0; col < BOARD_WIDTH; col++) {
		const columnCards = gameState.board.filter((_, index) => index % BOARD_WIDTH === col);

		if (areCardsTheSame(columnCards)) {
			alignments.push(columnCards.map((_, index) => index * BOARD_WIDTH + col));
		}
	}

	return alignments;
};
