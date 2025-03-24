import type { GameState } from '$lib/types/GameState';

export const useHistory = ({ updateState }: { updateState: (state: GameState) => void }) => {
	let history = $state<GameState[]>([]);
	let currentState = $state(0);

	const addState = (state: GameState) => {
		history = history.slice(0, currentState);
		history.push(state);
		currentState++;
	};

	const previous = () => {
		if (currentState > 1) {
			currentState--;
			const previousState = history[currentState - 1];
			updateState(previousState);
		}
	};

	const next = () => {
		if (currentState < history.length) {
			currentState++;
			const nextState = history[currentState - 1];
			updateState(nextState);
		}
	};

	return {
		get currentState() {
			return currentState;
		},
		get count() {
			return history.length;
		},
		addState,
		previous,
		next
	};
};
