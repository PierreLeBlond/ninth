import { describe, it, expect } from 'vitest';
import { prepare } from '$lib/game/prepare';
import { getAlignments } from '$lib/game/getAlignments';

describe('getAlignments', () => {
	it('should detect horizontal alignment', () => {
		const gameState = prepare();
		// Set up a horizontal alignment of Mercury in the first row
		gameState.board = ['Mercury', 'Mercury', 'Mercury', null, null, null, null, null, null];
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(1);
		expect(alignments[0]).toEqual([0, 1, 2]);
	});

	it('should detect vertical alignment', () => {
		const gameState = prepare();
		// Set up a vertical alignment of Venus in the first column
		gameState.board = ['Venus', null, null, 'Venus', null, null, 'Venus', null, null];
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(1);
		expect(alignments[0]).toEqual([0, 3, 6]);
	});

	it('should detect multiple alignments', () => {
		const gameState = prepare();
		// Set up both horizontal and vertical alignments
		gameState.board = [
			'Mercury',
			'Mercury',
			'Mercury',
			'Venus',
			'Venus',
			'Venus',
			null,
			null,
			null
		];
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(2);
		expect(alignments).toContainEqual([0, 1, 2]);
		expect(alignments).toContainEqual([3, 4, 5]);
	});

	it('should not detect incomplete alignments', () => {
		const gameState = prepare();
		// Set up incomplete alignments
		gameState.board = ['Mercury', 'Mercury', null, 'Venus', null, 'Venus', null, null, null];
		const alignments = getAlignments(gameState);
		expect(alignments).toHaveLength(0);
	});
});
