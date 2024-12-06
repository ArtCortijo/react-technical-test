/// <reference lib="webworker" />

// Declare the worker's global scope
declare const self: DedicatedWorkerGlobalScope;

const workerFunction = function () {
	self.onmessage = (event: MessageEvent) => {
		const points = event.data;
		console.log('Worker received data:', points);
		if (!points || !Array.isArray(points.features)) {
			postMessage(null);
			return;
		}

		// Filter points where latitude > 48.8534
		const filteredPoints = {
			...points,
			features: points.features.filter(
				(feature: any) => feature.geometry.coordinates[1] > 48.8534
			),
		};

		postMessage(filteredPoints);
	};
};

// Stringify the worker function
const codeToString = workerFunction.toString();
// Extract the code block
const mainCode = codeToString.substring(
	codeToString.indexOf('{') + 1,
	codeToString.lastIndexOf('}')
);
// Create a Blob with the extracted code
const blob = new Blob([mainCode], { type: 'application/javascript' });
// Generate a URL for the Blob
const filter_points_worker_script = URL.createObjectURL(blob);

export default filter_points_worker_script;
