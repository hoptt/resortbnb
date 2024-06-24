import React from "react";
import { MapLoading } from "../Loader";
import SelectedRoom from "./SelectedRoom";
import Map from ".";
type Props = {
  lat: number;
  lng: number;
};
export default function SearchMap({ lat, lng }: Props) {
  return (
    <>
      <Map fallback={<MapLoading className="h-screen" />} lat={lat} lng={lng} />
      <SelectedRoom />
    </>
  );
}
