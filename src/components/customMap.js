import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Modal from "./modal";
import { GoogleMap } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

const THE_SIGHTINGS = gql`
  query {
    sightings(query: { isApproved: true }, sortBy: SEENDATE_DESC) {
      _id
      description
      witness
      submitDate
      location {
        lat
        lng
      }
    }
  }
`;

const containerStyle = {
    width: '100%',
    height: '70vh'
};

const center = {
    lat: 41.0082, lng: 28.9784
};




function CustomMap(props) {

    const { loading, error, data } = useQuery(THE_SIGHTINGS);
    if (loading) console.log("fetching gql data");
    if (error) console.log(error);

    const [showModal, setShowModal] = useState(false);
    const [markerData, setMarkerData] = useState({});

    function toggleModal(props) {
        setMarkerData(props);
        setShowModal(true);
    }

    const onLoad = marker => {
        console.log('marker: ', marker)
    }

    return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
                options={{
                    styles: [
                        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                        { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] },
                        { elementType: 'labels.text.fill', stylers: [{ color: '#38B2AB' }] },
                        {
                            featureType: 'administrative.locality',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#38B2AB' }]
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'geometry',
                            stylers: [{ color: '#263c3f' }]
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#6b9a76' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [{ color: '#38414e' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#212a37' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#9ca5b3' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [{ color: '#746855' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#1f2835' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#f3d19c' }]
                        },
                        {
                            featureType: 'transit',
                            elementType: 'geometry',
                            stylers: [{ color: '#2f3948' }]
                        },
                        {
                            featureType: 'transit.station',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{ color: '#1A212C' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#515c6d' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#2D3848' }]
                        }
                    ]
                }}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {data ? ( data.sightings.map((sight) => (
                    <Marker
                        onLoad={onLoad}
                        position={sight.location}
                        key={sight._id}
                        onClick={(e) => toggleModal(sight)}
                    />
                        ))
                    ) : (console.log("markers loading"))}
                <></>
                {showModal ? <Modal data={markerData} toggle={setShowModal} /> : <></>}
            </GoogleMap>
    )
}

export default React.memo(CustomMap)