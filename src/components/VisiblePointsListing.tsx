import { useVisiblePointsStore } from '../stores/visiblePointsStore';
import VisiblePointsList from './VisiblePointsList';

type VisiblePointsProps = {
	handleVisiblePoints: () => void;
};

const VisiblePointsListing = ({ handleVisiblePoints }: VisiblePointsProps) => {
	const visiblePoints = useVisiblePointsStore((state) => state.visiblePoints);
	const highLightedPointId = useVisiblePointsStore(
		(state) => state.highLightedPointId
	);
	const setHighLightedPointId = useVisiblePointsStore(
		(state) => state.setHighLightedPointId
	);

	const handlePointClick = (id: number) => {
		setHighLightedPointId(id);
	};

	return (
		<div className='visible-points-panel p-4 border-t'>
			<button
				className='show-visible-points p-2 bg-slate-950 bg-opacity-80 rounded-md'
				onClick={handleVisiblePoints}
			>
				Show visible points
			</button>
			<h3 className='text-lg font-bold pt-4 pb-4'>
				Visible Points: <span>{visiblePoints.length}</span>
			</h3>
			{visiblePoints.length > 0 ? (
				<VisiblePointsList
					points={visiblePoints}
					highLightedPointId={highLightedPointId}
					onPointClick={handlePointClick}
				/>
			) : (
				<p>No visible points info</p>
			)}
		</div>
	);
};

export default VisiblePointsListing;
