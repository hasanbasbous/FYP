import React from 'react';

// import MapPotholes from '../../shared/UIElements/MapPotholes';
// import MapCrash from '../../shared/UIElements/MapCrash';

import './DistractionItem.css';

const DistractionItem = (props) => {
	return (
		<div className="grid-item">
			<tr>
				<td>Distracted: </td>
				<td>{props.distracted}</td>
			</tr>
			<tr>
				<td>Drowsy: </td>
				<td>{props.drowsy}</td>
			</tr>
			<tr>
				<td>Lat: </td>
				<td>{props.location.lat}</td>
			</tr>
			<tr>
				<td>Lng: </td>
				<td>{props.location.lng} </td>
			</tr>
		</div>
	);
};

export default DistractionItem;
