import React from 'react'
import { USMap } from './USMap';

export class Map extends React.Component {
  render() {
  	let mapContents;
    const { mapType } = this.props;
	if (mapType === "USMap") {
		mapContents = <USMap />;
	}

    return (
		mapContents
    );
  }
}