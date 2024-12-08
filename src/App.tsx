import React from 'react';
import ReactMapBoxGl from './components/ReactMapBoxGl';
import VisiblePoints from './components/VisiblePoints';

export const App: React.FC = () => {
	return (
		<div className='w-full h-screen'>
			<div className=' p-4'>
				<h1>Mapbox Technical Test</h1>
				<h4>By Arturo Cortijo Purizaca</h4>
			</div>
			<div>
				<ReactMapBoxGl />
				<VisiblePoints />
			</div>
		</div>
	);
};
