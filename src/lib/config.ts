export const NUMBER_OF_CARDS_OF_EACH_TYPE = 9;
export const CARDS_TYPES = ['Me', 'V', 'E', 'Ma', 'J', 'Sa', 'U', 'Ne', '9'] as const;

export const BOARD_WIDTH = 3;
export const BOARD_HEIGHT = 3;
export const BOARD_SIZE = BOARD_WIDTH * BOARD_HEIGHT;

export const NUMBER_OF_PLAYERS = 2;

export type CardType = (typeof CARDS_TYPES)[number] | null;
