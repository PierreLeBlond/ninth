import { prepare } from './prepare';

export const getNearEndGame = () => {
	const gameState = prepare();
	gameState.discardedCards = gameState.remainingCards.slice(0, gameState.remainingCards.length - 2);
	gameState.remainingCards = gameState.remainingCards.slice(gameState.remainingCards.length - 2);
	return gameState;
};
