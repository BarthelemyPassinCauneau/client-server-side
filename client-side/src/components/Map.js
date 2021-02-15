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
    data.map(d => {
      if (d.week == "2020-S21" && d.cl_age90 == 0) {
        if (d.dep == location.id) {
          console.log(d.pop)
          if (d.pop <= "250000") {
            console.log(0)
            return `svg-map__location--heat0`;
          } else if (d.pop <= "500000") {
            console.log(1)
            return `svg-map__location--heat1`;
          } else if (d.pop <= "750000") {
            console.log(2)
            return `svg-map__location--heat2`;
          } else if (d.pop > "750000") {
            console.log(3)
            return `svg-map__location--heat3`;
          }
        }
      }
    });
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