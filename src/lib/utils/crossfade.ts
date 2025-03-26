import { quadIn, quadOut } from 'svelte/easing';
import { type CrossfadeParams, type TransitionConfig } from 'svelte/transition';

function assign<T, S>(tar: T, src: S): T & S {
	// @ts-ignore
	for (const k in src) tar[k] = src[k];
	return tar as T & S;
}

const linear = (t: number) => t;

/**
 * The `crossfade` function creates a pair of [transitions](https://svelte.dev/docs/svelte/transition) called `send` and `receive`. When an element is 'sent', it looks for a corresponding element being 'received', and generates a transition that transforms the element to its counterpart's position and fades it out. When an element is 'received', the reverse happens. If there is no counterpart, the `fallback` transition is used.
 *
 * @returns {[(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig, (node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig]}
 */
export function moveCard({
	fallback,
	...defaults
}: CrossfadeParams & {
	fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig;
}): [
	(node: Element, params: CrossfadeParams & { key: any }) => () => TransitionConfig,
	(node: Element, params: CrossfadeParams & { key: any }) => () => TransitionConfig
] {
	const to_receive: Map<any, Element> = new Map();
	const to_send: Map<any, Element> = new Map();

	const introEasing = quadOut;
	const outroEasing = quadIn;
	const introDuration = 0.1;
	const pauseDuration = 0.2;

	const introduce = (
		from_node: Element,
		node: Element,
		params: CrossfadeParams
	): TransitionConfig => {
		const {
			delay = 0,
			duration = (d: number) => Math.sqrt(d) * 30,
			easing = linear
		} = assign(assign({}, defaults), params);
		const from = from_node.getBoundingClientRect();
		const to = node.getBoundingClientRect();
		const dx = from.left - to.left;
		const dy = from.top - to.top;
		const dw = from.width / to.width;
		const dh = from.height / to.height;
		const d = Math.sqrt(dx * dx + dy * dy);
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;
		const opacity = +style.opacity;
		const totalDuration = typeof duration === 'function' ? duration(d) : duration;
		return {
			delay,
			duration: totalDuration,
			easing,
			css: (t: number, u: number) => {
				const translateFactor =
					1.0 -
					(t < introDuration + pauseDuration
						? 0.0
						: outroEasing((t - introDuration) / (1.0 - introDuration)));
				const scaleFactor =
					t < introDuration + pauseDuration
						? outroEasing(Math.min(t / introDuration, 1.0))
						: introEasing((1.0 - t) / (1.0 - introDuration));
				const opacityFactor = t < introDuration ? outroEasing(t / introDuration) : 1.0;
				return `
					z-index: 11;
			   opacity: ${opacityFactor * opacity};
			   transform-origin: top left;
			   transform: ${transform} translate(${translateFactor * dx}px,${translateFactor * dy}px) scale(${1.0 + scaleFactor * 0.5}, ${1.0 + scaleFactor * 0.5});
		   `;
			}
		};
	};

	const outro = (from_node: Element, node: Element, params: CrossfadeParams): TransitionConfig => {
		const {
			delay = 0,
			duration = (d: number) => Math.sqrt(d) * 30,
			easing = linear
		} = assign(assign({}, defaults), params);
		const from = from_node.getBoundingClientRect();
		const to = node.getBoundingClientRect();
		const dx = from.left - to.left;
		const dy = from.top - to.top;
		const dw = from.width / to.width;
		const dh = from.height / to.height;
		const d = Math.sqrt(dx * dx + dy * dy);
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;
		const opacity = +style.opacity;
		const totalDuration = typeof duration === 'function' ? duration(d) : duration;
		return {
			delay,
			duration: totalDuration,
			easing,
			css: (t: number, u: number) => {
				const scaleFactor =
					u < introDuration
						? outroEasing(u / introDuration)
						: introEasing((1.0 - u) / (1.0 - introDuration));
				const opacityFactor = u < introDuration ? 1.0 : 0.0;
				return `
					z-index: 10;
			   opacity: ${opacityFactor * opacity};
			   transform-origin: top left;
			   transform: ${transform} scale(${1.0 + scaleFactor * 0.5}, ${1.0 + scaleFactor * 0.5});
		   `;
			}
		};
	};

	function transition(
		items: Map<any, Element>,
		counterparts: Map<any, Element>,
		intro: boolean
	): (node: any, params: CrossfadeParams & { key: any }) => () => TransitionConfig {
		// @ts-expect-error TODO improve typings (are the public types wrong?)
		return (node, params) => {
			items.set(params.key, node);
			return () => {
				if (counterparts.has(params.key)) {
					const other_node = counterparts.get(params.key) as Element;
					counterparts.delete(params.key);
					return intro ? introduce(other_node, node, params) : outro(other_node, node, params);
				}
				// if the node is disappearing altogether
				// (i.e. wasn't claimed by the other list)
				// then we need to supply an outro
				items.delete(params.key);
				return fallback && fallback(node, params, intro);
			};
		};
	}

	return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}

export const crossfade = moveCard({});
