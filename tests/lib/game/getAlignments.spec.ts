import { describe, it, expect } from 'vitest';
import { prepare } from '$lib/game/prepare';
import { getAlignments } from '$lib/game/getAlignments';

const horizontalAlignmentBoard = [
	{ type: 'Mercury', index: 0 },
	{ type: 'Mercury', index: 1 },
	{ type: 'Mercury', index: 2 },
	null,
	null,
	null,
	null,
	null
];

const verticalAlignmentBoard = [
	{ type: 'Mercury', index: 0 },
	null,
	null,
	{ type: 'Mercury', index: 1 },
	null,
	null,
	{ type: 'Mercury', index: 2 },
	null,
	null
];

const doubleAlignmentBoard = [
	{ type: 'Mercury', index: 0 },
	{ type: 'Mercury', index: 1 },
	{ type: 'Mercury', index: 2 },
	{ type: 'Venus', index: 3 },
	{ type: 'Venus', index: 4 },
	{ type: 'Venus', index: 5 },
	null,
	null,
	null
];

const incompleteAlignmentBoard = [
	{ type: 'Mercury', index: 0 },
	{ type: 'Mercury', index: 1 },
	null,
	{ type: 'Mars', index: 2 },
	null,
	{ type: 'Mars', index: 4 },
	null,
	null,
	null
];

describe('getAlignments', () => {
	it('should detect horizontal alignment', () => {
		const gameState = prepare();
		// Set up a horizontal alignment of Mercury in the first row
		gameState.board = horizontalAlignmentBoard;
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(1);
		expect(alignments[0]).toEqual([0, 1, 2]);
	});

	it('should detect vertical alignment', () => {
		const gameState = prepare();
		// Set up a vertical alignment of Venus in the first column
		gameState.board = verticalAlignmentBoard;
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(1);
		expect(alignments[0]).toEqual([0, 3, 6]);
	});

	it('should detect multiple alignments', () => {
		const gameState = prepare();
		// Set up both horizontal and vertical alignments
		gameState.board = doubleAlignmentBoard;
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(2);
		expect(alignments).toContainEqual([0, 1, 2]);
		expect(alignments).toContainEqual([3, 4, 5]);
	});

	it('should not detect incomplete alignments', () => {
		const gameState = prepare();
		// Set up incomplete alignments
		gameState.board = incompleteAlignmentBoard;
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(0);
	});
});
