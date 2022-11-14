import React, { useState } from "react";
import Map from "./Map";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
// import uuidv4 from "uuid/v4";
import { v4 as uuidv4 } from "uuid";
import CustomMarker from "./CustomMarker";

var locations1 = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 }
];
var locations2 = [
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 }
];

export default function MapContainer() {
  const [map, setMap] = useState(null);
  const [locs, setLocs] = useState(locations1);
  const [toggle, setToggle] = useState(false);

  React.useEffect(() => {
    if (map) {
      // map.panTo(...)
      mapFitBounds();
    }
  }, [map]);

  function mapFitBounds() {
    // console.log("mapFitBounds:map> ", map);
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();
    locs.map(loc => {
      bounds.extend(new google.maps.LatLng(loc.lat, loc.lng));
    });

    map.fitBounds(bounds);
  }

  function removeMarker() {
    setLocs(locs => (toggle ? locations1 : locations2));
    setToggle(!toggle);
  }

  function removeSome() {
    let _locs = [...locs];
    const removeValFromIndex = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

    for (var i = removeValFromIndex.length - 1; i >= 0; i--)
      _locs.splice(removeValFromIndex[i], 1);

    setLocs(_locs);
  }

  return (
    <div>
      <Map setMap={setMap}>
        <MarkerClusterer>
          {clusterer =>
            locs.map(loc => (
              <CustomMarker
                key={uuidv4()}
                position={loc}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </Map>
      <button style={{ margin: 8 }} onClick={() => removeMarker()}>
        {locs.length !== 0 ? "Remove all markers" : "Add all markers"}
      </button>
      <button style={{ margin: 8 }} onClick={() => removeSome()}>
        {locs.length !== 0 ? "Remove some markers" : "Add some markers"}
      </button>
    </div>
  );
}
