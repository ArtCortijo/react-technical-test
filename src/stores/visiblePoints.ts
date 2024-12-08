import { create } from 'zustand';
import type { Feature } from 'geojson';

type VisiblePointsState = {
	visiblePoints: Feature[];
	setVisiblePoints: (visieblePoints: Feature[]) => void;

	// Bonus : Highlight clicked point
	hightLightPointId: string | null;
	setHightLightedPointId: (id: string | null) => void;
};

export const useVisiblePointsStore = create<VisiblePointsState>((set) => ({
	visiblePoints: [],
	setVisiblePoints: (points) => set({ visiblePoints: points }),

	// Bonus : Highlight clicked point
	hightLightPointId: null,
	setHightLightedPointId: (id) => set({ hightLightPointId: id }),
}));
