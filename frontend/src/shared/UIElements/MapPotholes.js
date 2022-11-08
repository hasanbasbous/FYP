import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import './Map.css';

const potholes = [
    {
        id: 1,
        name: 'Roudy Abou Zeid',
        date:'21/10/2022',
        position: { lat: 41.881832, lng: -87.623177 }
    },
    {
        id: 2,
        name: 'Hasan Basbous',
        date:'12/12/2021',
        position: { lat: 39.739235, lng: -104.99025 }
    },
    {
        id: 3,
        name: 'Antoine Doumit',
        date:'01/13/2022',
        position: { lat: 34.052235, lng: -118.243683 }
    },
    {
        id: 4,
        name: 'Antoine Doumit',
        date:'01/13/2022',
        position: { lat: 40.712776, lng: -74.005974 }
    }
    ];
    const MapPotholes=()=> {
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        //if the marker we are clicking is already clicked nothing happens
        //if the marker id is not the same, make the marker as active
        if (marker === activeMarker) {
        return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const google = window.google;
        const bounds = new google.maps.LatLngBounds();
        potholes.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "27rem" }}
    > 

      {potholes.map(({ id, name,position,date }) => (
        //populating the map witg the marker in the line above
        //when we click on marker change the state which allows to open info winfow
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>Reporter: {name}
              <div>Date reported: {date}</div>
              <div>location: {position.lat +','+ position.lng}</div>
              </div>

            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default MapPotholes;
