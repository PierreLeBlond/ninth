export const NUMBER_OF_CARDS_OF_EACH_TYPE = 9;
export const CARDS_NAMES = [
	'Mercury',
	'Venus',
	'Earth',
	'Mars',
	'Jupiter',
	'Saturn',
	'Uranus',
	'Neptune',
	'Ninth'
] as const;

export const BOARD_WIDTH = 3;
export const BOARD_HEIGHT = 3;
export const BOARD_SIZE = BOARD_WIDTH * BOARD_HEIGHT;

export const NUMBER_OF_PLAYERS = 2;

export type CardName = (typeof CARDS_NAMES)[number] | null;
