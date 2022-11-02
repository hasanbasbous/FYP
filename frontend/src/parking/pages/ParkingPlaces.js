import React, { useEffect, useState } from 'react';

import ParkingList from '../components/ParkingList';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

const ParkingPlaces = () => {
	// const DUMMY_PARKING = [
	//   {
	//     id: 'p1',
	//     name: 'Frem Parking',
	//     location: 'Byblos',
	//     image:
	//       'https://lirp.cdn-website.com/md/unsplash/dms3rep/multi/opt/photo-1506521781263-d8422e82f27a-1920w.jpg',
	//     places: 3
	//   },

	//   {
	//     id: 'p2',
	//     name: 'AKSOB Parking',
	//     location: 'Beirut',
	//     image:
	//       'https://lirp.cdn-website.com/md/unsplash/dms3rep/multi/opt/photo-1506521781263-d8422e82f27a-1920w.jpg',
	//     places: 7
	//   },

	//   {
	//     id: 'p3',
	//     name: 'Underground Parking',
	//     location: 'Byblos',
	//     image:
	//       'https://lirp.cdn-website.com/md/unsplash/dms3rep/multi/opt/photo-1506521781263-d8422e82f27a-1920w.jpg',
	//     places: 3
	//   },

	//   {
	//     id: 'p4',
	//     name: 'Science Parking',
	//     location: 'Byblos',
	//     image:
	//       'https://lirp.cdn-website.com/md/unsplash/dms3rep/multi/opt/photo-1506521781263-d8422e82f27a-1920w.jpg',
	//     places: 12
	//   },
	// ];

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [loadedParkings, setLoadedParkings] = useState();

	useEffect(() => {
		const sendRequst = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('http://localhost:5000/api/parking');

				const responseData = await response.json();
				console.log(responseData);
				if (!response.ok) {
					throw new Error(responseData.message);
				}

				setLoadedParkings(responseData.parkings);
			} catch (err) {
				setError(err.message);
			}
			setIsLoading(false);
		};
		sendRequst();
	}, []);

	const errorHandler = () => {
		setError(null);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={errorHandler} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedParkings && <ParkingList items={loadedParkings} />}
		</React.Fragment>
	);
};

export default ParkingPlaces;
