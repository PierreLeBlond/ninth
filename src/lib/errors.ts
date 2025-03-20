import type { GameState } from './types/GameState';

export class AgainstTheRulesError extends Error {
	constructor(
		public readonly gameState: GameState,
		public readonly rule: string
	) {
		const message = `Against the rules: ${rule}. Game state: ${JSON.stringify(gameState)}`;
		super(message);
		this.name = 'AgainstTheRulesError';
	}
}

export class ExistingCardError extends Error {
	constructor(
		public readonly index: number,
		public readonly gameState: GameState,
		public readonly message: string
	) {
		const fullMessage = `${message}. At index: ${index}. Game state: ${JSON.stringify(gameState)}`;
		super(fullMessage);
		this.name = 'ExistingCardError';
	}
}

export class MissingCardError extends Error {
	constructor(
		public readonly index: number,
		public readonly gameState: GameState,
		public readonly message: string
	) {
		const fullMessage = `${message}. At index: ${index}. Game state: ${JSON.stringify(gameState)}`;
		super(fullMessage);
		this.name = 'MissingCardError';
	}
}
