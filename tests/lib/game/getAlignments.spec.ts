import { describe, it, expect } from 'vitest';
import { prepare } from '$lib/game/prepare';
import { getAlignments } from '$lib/game/getAlignments';
import type { Card } from '$lib/types/Card';

const horizontalAlignmentBoard = [
	{ type: 'Me', index: 0 },
	{ type: 'Me', index: 1 },
	{ type: 'Me', index: 2 },
	null,
	null,
	null,
	null,
	null
] satisfies (Card | null)[];

const verticalAlignmentBoard = [
	{ type: 'Me', index: 0 },
	null,
	null,
	{ type: 'Me', index: 1 },
	null,
	null,
	{ type: 'Me', index: 2 },
	null,
	null
] satisfies (Card | null)[];

const doubleAlignmentBoard = [
	{ type: 'Me', index: 0 },
	{ type: 'Me', index: 1 },
	{ type: 'Me', index: 2 },
	{ type: 'V', index: 3 },
	{ type: 'V', index: 4 },
	{ type: 'V', index: 5 },
	null,
	null,
	null
] satisfies (Card | null)[];

const incompleteAlignmentBoard = [
	{ type: 'Me', index: 0 },
	{ type: 'Me', index: 1 },
	null,
	{ type: 'Ma', index: 2 },
	null,
	{ type: 'Ma', index: 4 },
	null,
	null,
	null
] satisfies (Card | null)[];

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
