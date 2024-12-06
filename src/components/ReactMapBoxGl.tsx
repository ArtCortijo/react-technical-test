import { useEffect, useState, useRef } from 'react';
import filter_points_worker_script from '../filterPoints.worker';
import Map, { NavigationControl, MapRef, Source, Layer } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';
import type { Feature, FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';

// https://docs.mapbox.com/help/getting-started/geocoding/#geocoding-demo
// Task 2 - Configure a map centered on Paris.
const INITIAL_CENTER: [number, number] = [2.348392, 48.853495];
const INITIAL_ZOOM: number = 9;
const MAPBOX_TOKEN = process.env.REACT_APP_MAP_TOKEN;

interface GeoJSONFeatureProperties {
	[key: string]: any; // Adjust based on your GeoJSON properties structure
}

const ReactMapBoxGl = () => {
	const [pointsData, setPointsData] = useState<FeatureCollection | null>(null);
	const [visiblePoints, setVisiblePoints] = useState<
		GeoJSONFeatureProperties[]
	>([]);
	const mapRef = useRef<MapRef>(null);

	// Configure a map centered on Paris
	const [viewport, setViewport] = useState({
		longitude: INITIAL_CENTER[0],
		latitude: INITIAL_CENTER[1],
		zoom: INITIAL_ZOOM,
	});

	const handleResetCenter = () => {
		if (mapRef.current) {
			mapRef.current.flyTo({
				center: INITIAL_CENTER,
				zoom: INITIAL_ZOOM,
				duration: 1000,
			});
		}
	};

	// Task 3 - On button click, use queryRenderedFeatures to list the visible points in a panel below the map.
	const handleVisiblePoints = () => {
		if (mapRef.current) {
			const features = mapRef.current.queryRenderedFeatures({
				// Layer id
				layers: ['point'],
			}) as Feature[];

			const visiblePointsArray = features
				.map((feature) => feature.properties)
				.filter(Boolean) as GeoJSONFeatureProperties[];

			setVisiblePoints(visiblePointsArray);
		}
	};

	// Task 2 - Add a layer of points using the provided GeoJSON file (points.geojson) in data folder.
	useEffect(() => {
		fetch('/points.geojson')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			// Without using Web Worker's filter
			// .then((response) => {
			// 	setPointsData(response);
			// })
			.then((data) => {
				// 4 - Web Workers:
				const worker = new Worker(filter_points_worker_script);
				// Send the raw data to the worker
				worker.postMessage(data);
				// Listen for the filtered data from the worker
				worker.onmessage = (event) => {
					setPointsData(event.data);
					worker.terminate();
				};
			})
			.catch((error) => {
				console.error('Error fetching points.geojson:', error);
			});
	}, []);

	const layerStyle: LayerProps = {
		id: 'point',
		type: 'circle',
		source: 'test-points-data',
		paint: {
			'circle-radius': 10,
			'circle-color': '#007cbf',
		},
	};

	return (
		<>
			<div className='relative'>
				<div className='p-4 flex gap-3'>
					{/* Coordinates and zoom info */}
					<div className='sidebar p-2 bg-slate-950 bg-opacity-80 rounded-md'>
						Longitude: {viewport.longitude.toFixed(4)} | Latitude:{' '}
						{viewport.latitude.toFixed(4)} | Zoom: {viewport.zoom.toFixed(2)}
					</div>
					<button
						className='reset-button p-2 bg-slate-950 bg-opacity-80 rounded-md'
						onClick={handleResetCenter}
					>
						Réinitialiser
					</button>
					<button
						className='reset-button p-2 bg-slate-950 bg-opacity-80 rounded-md'
						onClick={handleVisiblePoints}
					>
						Afficher les points visibles
					</button>
				</div>

				{/* Task 1 - Add Mapbox to your project using mapbox-gl or react-map-gl. */}
				<Map
					ref={mapRef}
					initialViewState={viewport}
					onMove={(evt) => {
						const { viewState } = evt;
						setViewport({
							longitude: viewState.longitude,
							latitude: viewState.latitude,
							zoom: viewState.zoom,
						});
					}}
					style={{ width: '100vw', height: '50vh' }}
					// https://docs.mapbox.com/api/maps/styles/
					mapStyle='mapbox://styles/mapbox/streets-v11'
					mapboxAccessToken={MAPBOX_TOKEN}
				>
					<Source id='test-points-data' type='geojson' data={pointsData}>
						<Layer {...layerStyle} />
					</Source>
					<NavigationControl position='top-right' />
				</Map>

				{/* Points listing */}
				<div className='visible-points-panel p-4 border-t'>
					<h3 className='text-lg font-bold pb-4'>
						Visible Points: <span>{visiblePoints.length}</span>
					</h3>
					{visiblePoints.length > 0 ? (
						<ul
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
							}}
						>
							{visiblePoints.map((point, i) => (
								<li key={i} className='p-2 border-solid border'>
									{Object.entries(point).map(([key, value]) => (
										<div key={key}>
											<strong>{key}:</strong> {value}
										</div>
									))}
								</li>
							))}
						</ul>
					) : (
						<p>No visible points.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default ReactMapBoxGl;
