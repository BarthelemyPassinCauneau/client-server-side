import { useState } from 'react';
import FranceD from '@svg-maps/france.departments';
import { getLocationId, getLocationName } from '../utils/utils';
import { SVGMap } from "react-svg-map";
import './Map.scss';
import { Legend } from './Legend';
import Slider from '@material-ui/core/Slider';

export const DepMap = ({ Dep, RegId, mode }) => {
  let data = Dep;
  let type = "dep";
  const year = 2020;
  const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
  const [pointedLocationData, setPointedLocationData] = useState(null);
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipsStyle] = useState({ display: 'none' });
  const [currentWeek, setCurrentWeek] = useState("2020-S21");
  const [currentDisplayedData, setCurrentDisplayedData] = useState([]);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(21);
  const [displayedDate, setDisplayedDate] = useState({day: 28, month: 8});

  const UpdateDisplayedData = () => {
    if (currentDisplayedData.length == 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].week == currentWeek) {
          currentDisplayedData.push(data[i]);
        }
      }
    }
  }

  const getDateOfWeek = (w, y) => {
    let d = (1 + (w - 1) * 7);
    return new Date(y, 0, d);
  }

  const valuetext = (value) => {
    if (currentWeekNumber != value) {
      setCurrentWeekNumber(value);
      setCurrentWeek("2020-S" + value);
      let date = getDateOfWeek(value, year);
      setDisplayedDate({day: date.getDate(), month: date.getMonth()});
      setCurrentDisplayedData([]);
    }
  }

  const handleLocationMouseOver = (event) => {
    const pointedLocation = getLocationName(event);
    for (let i = 0; i < currentDisplayedData.length; i++) {
      if (currentDisplayedData[i][type] == (type == "reg" ? RegId[0][getLocationId(event)] : getLocationId(event))) {
        setPointedLocationData(currentDisplayedData[i].P);
      }
    }
    setPointedLocation(pointedLocation);
  }

  const handleLocationMouseOut = () => {
    setPointedLocation(null);
    setTooltipsStyle({ display: 'none' });
  }

  const handleLocationMouseMove = (event) => {
    const tooltipStyle = {
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX - 100
    };
    setTooltipsStyle(tooltipStyle);
  }

  const getLocationClassName = (location, index) => {
    UpdateDisplayedData();
    for (let i = 0; i < currentDisplayedData.length; i++) {
      if (currentDisplayedData[i][type] == (type == "reg" ? RegId[0][location.id] : location.id)) {
        let ratio = currentDisplayedData[i].P / currentDisplayedData[i].pop;
        if (ratio <= 0.0003125) return `svg-map__location--heat-1`;
        else if (ratio <= 0.000625) return `svg-map__location--heat0`;
        else if (ratio <= 0.00125) return `svg-map__location--heat1`;
        else if (ratio <= 0.0025) return `svg-map__location--heat2`;
        else if (ratio <= 0.003125) return `svg-map__location--heat3`;
        else return `svg-map__location--heat4`;
      }
    }
  }

  return (
    <article className="examples__block">
        <div className="departements">
          <h2 className="examples__block__title">
            Taux de cas Covid par département
          </h2>
          <div className="examples__block__map examples__block__map--france">
          <Legend/>
            <SVGMap
              map={FranceD}
              locationClassName={getLocationClassName}
              onLocationMouseOver={handleLocationMouseOver}
              onLocationMouseOut={handleLocationMouseOut}
              onLocationMouseMove={handleLocationMouseMove} />
          </div>
        </div>
      <div className={`examples__block__map__tooltip ${mode ? "dark" : "light"}`} style={tooltipStyle}>
        <span>{pointedLocation}</span>
        <br></br>
        <span>{pointedLocationData}</span>
      </div>
      <div className="slider">
      <p>Semaine du {displayedDate.day} {monthNames[displayedDate.month]}</p>
        <Slider
          defaultValue={40}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={21}
          max={53}
        />
      </div>
    </article>
  );
}