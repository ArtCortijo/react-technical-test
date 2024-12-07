import { create } from 'zustand';
import type { Feature } from 'geojson';

type VisiblePointsState = {
	visiblePoints: Feature[];
	setVisiblePoints: (visieblePoints: Feature[]) => void;
};

export const useVisiblePointsStore = create<VisiblePointsState>((set) => ({
	visiblePoints: [],
	setVisiblePoints: (points) => set({ visiblePoints: points }),
}));
