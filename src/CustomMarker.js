import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";

export default function CustomMarker(props) {
  const { position, clusterer } = props;

  return <Marker position={position} clusterer={clusterer} />;
}
