import MapGl from './components/MapGl';

export const App = () => {
	return (
		<div className='w-full h-screen'>
			<div className=' p-4'>
				<h1>Mapbox Technical Test</h1>
				<h4>By Arturo Cortijo Purizaca</h4>
			</div>
			<div>
				<MapGl />
			</div>
		</div>
	);
};
