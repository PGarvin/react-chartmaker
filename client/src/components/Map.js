import React from "react";
import { USMap } from "./USMap";
import { MassachusettsMap } from "./MassachusettsMap";





export class Map extends React.Component {

  render() {
    const { mapType } = this.props;

    let mapContents;
    let desiredMap = mapType
      .split(" ")
      .join("")
      .toLowerCase();

    if (desiredMap === "usmap") {
      mapContents = <USMap />;
    }

    if (desiredMap === "massachusettsmap") {
      mapContents = <MassachusettsMap />;
    }

    if (desiredMap === "nomap") {
      mapContents = <div></div>;
    }

    return mapContents;
  }
}
