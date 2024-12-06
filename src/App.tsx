import React from 'react';
import ReactMapBoxGl from './components/ReactMapBoxGl';
import VisiblePoints from './components/VisiblePoints';

export const App: React.FC = () => {
	return (
		<div
			// style={{
			// 	width: '100vw',
			// 	height: '100%',
			// 	display: 'flex',
			// }}
			className='w-full h-screen'
		>
			<div
				// style={{
				// 	width: '50vw',
				// 	height: '100vh',
				// }}
				className=' p-4'
			>
				<h1>Mapbox Technical Test</h1>
				<h4>By Arturo Cortijo Purizaca</h4>
				{/* <VisiblePoints /> */}
			</div>
			<div
				// style={{
				// 	width: '50vw',
				// 	height: '100vh',
				// }}
				className=''
			>
				<ReactMapBoxGl />
			</div>
		</div>
	);
};
