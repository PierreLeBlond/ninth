import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently.
 * This utility uses clsx for conditional classes and tailwind-merge for proper class merging.
 *
 * @param inputs - Class names to combine and merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
