
import Switch from '@material-ui/core/Switch';
import { RegMap } from './RegMap'
import { DepMap } from './DepMap'
import { useState } from 'react';


const Map = ({ Dep, Reg, RegId, mode }) => {
  var check
  var regionMap = false
  const [mapType, setMapType] = useState(false)

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
  const mapSwitch = () => {
    if(mapType){
      console.log("yata")
      return(<RegMap Reg={Reg} RegId={RegId} mode={mode}></RegMap>)
    }else if(!mapType){
      console.log("hello")
      return(<DepMap style={{ display: (regionMap ? 'block' : 'none')}} Dep={Dep} RegId={RegId} mode={mode} ></DepMap>)
    }
  }
  const handleChange = (event) => {
    setMapType(!mapType)
  }
  return (
    <article className="examples__block">
      <span>Departements</span>
      <Switch
        checked={check}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <span>Régions</span>
      {mapSwitch()}
    </article>
  );
}

export default Map;