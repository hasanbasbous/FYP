const HttpError = require('../models/http-error');
const Parking = require('../models/parking');

// const DUMMY_PARKING = [
// 	{
// 		id: 'p1',
// 		description: 'FREM parking',
// 		location: {
// 			lat: 34.1150660586732,
// 			lng: 35.6754096946864,
// 		},
// 		capacity: 100,
// 		img_path:
// 			'https://www.lau.edu.lb/news-events/images/facilities-2015-01-big.jpg',
// 	},
// ];

const getParkingById = (req, res, next) => {
	// pid is parking lot id number the user clicks on
	const parkingId = req.params.pid; // {pid: 'p1'}
	const parking = DUMMY_PARKING.find((p) => {
		return p.id === parkingId;
	});
	if (!parking) {
		return next(new HttpError('Parking not found', 404));
	}
	res.json({ parking }); // {parking} <-> {parking: parking}
};

const getParkings = async (req, res, next) => {
	// if (!DUMMY_PARKING) {
	// 	return next(new HttpError('No registered parkings', 404));
	// }
	// res.json({ parking: DUMMY_PARKING });
	let parkings;
	try {
		parkings = await Parking.find({});
	} catch (err) {
		const error = new HttpError(
			'Fetching parkings failed, please try again later.',
			500
		);
		return next(error);
	}
	res.json({
		parkings: parkings.map((parking) => parking.toObject({ getters: true })),
	});
};

exports.getParkingById = getParkingById;
exports.getParkings = getParkings;
