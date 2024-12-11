import { Feature, Geometry, GeoJsonProperties } from 'geojson';

type VisiblePointsListProps = {
	points: Feature<Geometry, GeoJsonProperties>[];
	highLightedPointId: number | null;
	onPointClick: (pointId: number) => void;
};

const VisiblePointsList = ({
	points,
	highLightedPointId,
	onPointClick,
}: VisiblePointsListProps) => {
	return (
		<ul
			aria-label='visible-points-list'
			className='visible-points-list'
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
			}}
		>
			{points.map((point) => {
				return (
					<li key={point.id} className='p-2 border-solid border'>
						<div className='properties mb-4'>
							<h4 className='font-bold'>Properties:</h4>
							{point.properties ? (
								Object.entries(point.properties).map(([key, value]) => {
									if (key === 'name') {
										return (
											<button
												data-testid={`point-btn-${point.id}`}
												className={`ease-in-out duration-300 border-b hover:border-b-red-500 hover:text-red-500 ${
													point.id === highLightedPointId
														? 'border-b-red-500 text-red-500'
														: 'border-b-gray-300 text-gray-300'
												}`}
												key={key}
												onClick={() => {
													onPointClick(Number(point.id));
												}}
											>
												Name: {String(value)}
											</button>
										);
									}
									return (
										<p key={key}>
											<span style={{ textTransform: 'capitalize' }}>{key}</span>
											: {String(value)}
										</p>
									);
								})
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
				);
			})}
		</ul>
	);
};

export default VisiblePointsList;
