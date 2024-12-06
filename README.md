
# React Technical Test (Mapbox, Web Workers, TypeScript)

Welcome to this technical test! You will be building an interactive map application with Mapbox, web workers, and TypeScript.

## Instructions

1. **Initialize the project**:
   - Add Mapbox to your project using `mapbox-gl` or `react-map-gl`.

2. **Display the map**:
   - Configure a map centered on Paris.
   - Add a layer of points using the provided GeoJSON file (`points.geojson`) in data folder.

3. **Interaction**:
   - Add a button "Afficher les points visibles".
   - On button click, use `queryRenderedFeatures` to list the visible points in a panel below the map.

4. **Web Workers**:
   - Use a web worker to filter points where the latitude is greater than `48.8534` before adding them to the map.

## File provided
- `points.geojson`: Contains the GeoJSON data for the points to display.

## Requirements
- Clean, structured code.
- Must use TypeScript.
- The app must work as described.

## Bonus Points
- Highlight points on the map when clicking their name in the list.
- Add unit tests for key functions.

Good luck!
