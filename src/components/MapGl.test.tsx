import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import '../filterPoints.worker';
import '../../public/points.geojson';
import MapGl from './MapGl';

// Mock TextDecoder using Node.js utilities
const { TextDecoder } = require('util');
global.TextDecoder = TextDecoder;
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

jest.mock('../filterPoints.worker', () => 'mocked-worker-url');
jest.mock('../../public/points.geojson', () => 'mocked-geojson-url');

describe('MapGl Component', () => {
	test('renders the map and centers it on Paris', () => {
		render(<MapGl />);

		// Wait for map to load, and check if the map is centered on Paris
		const longitude = screen.getByText(/Longitude/);
		const latitude = screen.getByText(/Latitude/);
		const zoom = screen.getByText(/Zoom/);

		// Expect the coordinates to be close to Paris
		expect(longitude.textContent).toMatch(/Longitude: 2\.3484/);
		expect(latitude.textContent).toMatch(/Latitude: 48\.8535/);
		expect(zoom.textContent).toMatch(/Zoom: 10\.7/);
	});
});
