import { Component, useState } from 'react';
import FranceR from '@svg-maps/france.regions';
import { getLocationId, getLocationName } from '../utils/utils';
import { SVGMap } from "react-svg-map";
import './Map.scss'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});


export const RegMap = ({ Reg, RegId, mode }) => {
  const classes = useStyles();

  const [pointedLocationData, setPointedLocationData] = useState(null);
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipsStyle] = useState({ display: 'none' })
  const [currentWeek, setCurrentWeek] = useState("2020-S21");
  const [currentDisplayedData, setCurrentDisplayedData] = useState([]);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(21)
  let data = Reg;
  let type = "reg"



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

  if (RegId) {

    const UpdateDisplayedData = () => {
      if (currentDisplayedData.length == 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].week == currentWeek) {
            currentDisplayedData.push(data[i]);
          }
        }

      }
    }

    const valuetext = (value) => {
      if (currentWeekNumber != value) {
        setCurrentWeekNumber(value)
        setCurrentWeek("2020-S" + value)
        setCurrentDisplayedData([])
      }
    }

    const handleLocationMouseOver = (event) => {
      const pointedLocation = getLocationName(event);
      for (let i = 0; i < currentDisplayedData.length; i++) {
        if (currentDisplayedData[i][type] == (type == "reg" ? RegId[0][getLocationId(event)] : getLocationId(event))) {
          setPointedLocationData(currentDisplayedData[i].P)
        }
      }
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
      UpdateDisplayedData();
      for (let i = 0; i < currentDisplayedData.length; i++) {
        if (currentDisplayedData[i][type] == (type == "reg" ? RegId[0][location.id] : location.id)) {
          let ratio = currentDisplayedData[i].P / currentDisplayedData[i].pop;
          if (ratio <= 0.000625) return `svg-map__location--heat0`;
          else if (ratio <= 0.00125) return `svg-map__location--heat1`;
          else if (ratio <= 0.0025) return `svg-map__location--heat2`;
          else return `svg-map__location--heat3`;
        }
      }
    }


    return (
      <article className="examples__block">
        <div className="regions">
          <h2 className="examples__block__title">
            Nombre de cas Covid par région
          </h2>
          <div className="examples__block__map examples__block__map--france">
            <SVGMap
              map={FranceR}
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
          <Slider
            defaultValue={21}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={21}
            max={52}
          />
        </div>
      </article>

    );
  }
  return (<div></div>)
}