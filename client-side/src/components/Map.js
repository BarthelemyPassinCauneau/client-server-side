import { Component, useState } from 'react';
import France from '@svg-maps/france.departments';
import { getLocationName } from '../utils/utils';
import { SVGMap } from "react-svg-map";
import './Map.scss'

export const Map = ({data}) => {
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipsStyle] = useState({ display: 'none' })
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     pointedLocation: null,
  //     tooltipStyle: {
  //       display: 'none'
  //     }
  //   };
  //   this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
  //   this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
  //   this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
  // }

  const handleLocationMouseOver = (event) => {
    const pointedLocation = getLocationName(event);
    setPointedLocation(pointedLocation)
  }

  const handleLocationMouseOut = () => {
    setPointedLocation(null)
    setTooltipsStyle({ display: 'none' })
  }

  const handleLocationMouseMove = (event) => {
    const tooltipStyle = {
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX - 100
    };
    setTooltipsStyle(tooltipStyle)
  }

  const getLocationClassName = (location, index) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].dep == location.id) {
        if (data[i].pop <= "250000") {
          return `svg-map__location--heat0`;
        } else if (data[i].pop <= "500000") {
          return `svg-map__location--heat1`;
        } else if (data[i].pop <= "750000") {
          return `svg-map__location--heat2`;
        } else {
          return `svg-map__location--heat3`;
        }
      }
    }
  }

  if (data.length > 1) {
    return (
      <article className="examples__block">
        <h2 className="examples__block__title">
          Nombre de cas Covid par département
				</h2>
        <div className="examples__block__map examples__block__map--france">
          <SVGMap
            map={France}
            locationClassName={getLocationClassName}
            onLocationMouseOver={handleLocationMouseOver}
            onLocationMouseOut={handleLocationMouseOut}
            onLocationMouseMove={handleLocationMouseMove} />
          <div className="examples__block__map__tooltip" style={tooltipStyle}>
            {pointedLocation}
          </div>
        </div>
      </article>
    );
  }
  return (<div></div>)
}