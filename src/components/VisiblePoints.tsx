import { useEffect } from 'react';
import { useVisiblePointsStore } from '../stores/visiblePoints';

const VisiblePoints = () => {
	const visiblePoints = useVisiblePointsStore((state) => state.visiblePoints);

	return (
		<div className='visible-points-panel p-4 border-t'>
			<h3 className='text-lg font-bold pb-4'>
				Visible Points: <span>{visiblePoints.length}</span>
			</h3>
			{visiblePoints.length > 0 ? (
				<ul
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
					}}
				>
					{visiblePoints.map((point, i) => (
						<li key={i} className='p-2 border-solid border'>
							<div className='properties mb-4'>
								<h4 className='font-bold'>Properties:</h4>
								{point.properties ? (
									Object.entries(point.properties).map(([key, value]) => (
										<p key={key}>
											{key}: {String(value)}
										</p>
									))
								) : (
									<p>No properties available</p>
								)}
							</div>
							{point.geometry.type === 'Point' ? (
								<>
									<h4 className='font-bold'>Coordinates:</h4>
									<div className='coordinates'>
										<p>Longitude: {point.geometry.coordinates[0]}</p>
										<p>Latitude: {point.geometry.coordinates[1]}</p>
									</div>
								</>
							) : (
								<p>Coordinates not available for this geometry type.</p>
							)}
						</li>
					))}
				</ul>
			) : (
				<p>No visible points.</p>
			)}
		</div>
	);
};

export default VisiblePoints;
