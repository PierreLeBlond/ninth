export const useInfo = (params: { player: { isActive: boolean; hasPickedACard: boolean } }) => {
	let info = $derived.by(() => {
		if (!params.player.isActive) {
			return `Waiting other player...`;
		}

		if (!params.player.hasPickedACard) {
			return 'Pick a card';
		}

		return 'Put a card or end turn';
	});

	return {
		info() {
			return info;
		}
	};
};
