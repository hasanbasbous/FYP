import React, { useState } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import './Map.css';

// const crash = [
// 	{
// 		id: 1,
// 		name: 'Roudy Abou Zeid',
// 		intensity: '3.8g',
// 		date: '10/21/2022',
// 		position: { lat: 41.881832, lng: -87.623177 },
// 	},
// 	{
// 		id: 2,
// 		name: 'Hasan Basbous',
// 		intensity: '3.3g',
// 		date: '12/12/2021',
// 		position: { lat: 39.739235, lng: -104.99025 },
// 	},
// 	{
// 		id: 3,
// 		name: 'Antoine Doumit',
// 		intensity: '4.2g',
// 		date: '01/13/2022',
// 		position: { lat: 34.052235, lng: -118.243683 },
// 	},
// 	{
// 		id: 4,
// 		name: 'Antoine Doumit',
// 		intensity: '4.2g',
// 		date: '01/13/2022',
// 		position: { lat: 40.712776, lng: -74.005974 },
// 	},
// ];

const MapCrash = (props) => {
	const crash = props.crash;
	// console.log(crash[0].date.substring(5, 7));
	const [activeMarker, setActiveMarker] = useState(null);
	const [initialCrash, setInitialCrash] = useState(crash);

	const handleActiveMarker = (marker) => {
		//if the marker we are clicking is already clicked nothing happens
		//if the marker id is not the same, make the marker as active
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

	//filter state

	const January = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '01');
		setInitialCrash(crashFiltered);
	};
	const February = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '02');

		setInitialCrash(crashFiltered);
	};

	const March = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '03');

		setInitialCrash(crashFiltered);
	};

	const April = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '04');

		setInitialCrash(crashFiltered);
	};

	const May = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '05');

		setInitialCrash(crashFiltered);
	};

	const June = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '06');

		setInitialCrash(crashFiltered);
	};

	const July = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '07');

		setInitialCrash(crashFiltered);
	};

	const August = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '08');

		setInitialCrash(crashFiltered);
	};

	const September = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '09');

		setInitialCrash(crashFiltered);
	};

	const October = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '10');

		setInitialCrash(crashFiltered);
	};

	const November = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '11');

		setInitialCrash(crashFiltered);
	};

	const December = () => {
		const crashFiltered = crash.filter((e) => e.date.substring(5, 7) === '12');

		setInitialCrash(crashFiltered);
	};

	// 👇️ reset to initial state
	const resetState = () => {
		setInitialCrash(crash);
	};

	const myFunction = () => {
		var x = document.getElementById('mySelect').value;

		x === 'January' && January();
		x === 'February' && February();
		x === 'March' && March();
		x === 'April' && April();
		x === 'May' && May();
		x === 'June' && June();
		x === 'July' && July();
		x === 'August' && August();
		x === 'September' && September();
		x === 'October' && October();
		x === 'November' && November();
		x === 'December' && December();
		x === 'reset' && resetState();
	};

	const handleOnLoad = (map) => {
		const google = window.google;
		const bounds = new google.maps.LatLngBounds();
		initialCrash.forEach(({ location }) => bounds.extend(location));
		map.fitBounds(bounds);
	};

	return (
		<React.Fragment>
			<GoogleMap
				onLoad={handleOnLoad}
				onClick={() => setActiveMarker(null)}
				mapContainerStyle={{ width: '100%', height: '27rem' }}
			>
				{initialCrash.map(({ id, driver_name, location, intensity, date }) => (
					//populating the map witg the marker in the line above
					//when we click on marker change the state which allows to open info winfow
					<Marker
						key={id}
						position={location}
						onClick={() => handleActiveMarker(id)}
					>
						{activeMarker === id ? (
							<InfoWindow onCloseClick={() => setActiveMarker(null)}>
								<div>
									<div>Driver: {driver_name}</div>
									<div>Intensity: {intensity}g</div>
									<div>Date: {date}</div>
								</div>
							</InfoWindow>
						) : null}
					</Marker>
				))}
			</GoogleMap>
			<select id="mySelect" onChange={myFunction}>
				<option value="reset">reset</option>
				<option value="January">January</option>
				<option value="February">February</option>
				<option value="March">March</option>
				<option value="April">April</option>
				<option value="May">May</option>
				<option value="June">June</option>
				<option value="July">July</option>
				<option value="August">August</option>
				<option value="September">September</option>
				<option value="October">October</option>
				<option value="November">November</option>
				<option value="December">December</option>
			</select>
		</React.Fragment>
	);
};

export default MapCrash;
