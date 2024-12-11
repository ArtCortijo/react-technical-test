import { create } from 'zustand';
import type { Feature, Geometry, GeoJsonProperties } from 'geojson';

type VisiblePointsState = {
	visiblePoints: Feature<Geometry, GeoJsonProperties>[];
	setVisiblePoints: (
		visiblePoints: Feature<Geometry, GeoJsonProperties>[]
	) => void;

	// Bonus : Highlight clicked point
	highLightedPointId: number | null;
	setHighLightedPointId: (id: number | null) => void;
};

export const useVisiblePointsStore = create<VisiblePointsState>((set) => ({
	visiblePoints: [],
	setVisiblePoints: (points) => set({ visiblePoints: points }),

	// Bonus : Highlight clicked point
	highLightedPointId: null,
	setHighLightedPointId: (id) => set({ highLightedPointId: id }),
}));
