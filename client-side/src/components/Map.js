
import Switch from '@material-ui/core/Switch';
import { RegMap } from './RegMap'
import { DepMap } from './DepMap'
import { useState } from 'react';


const Map = ({ Dep, Reg, RegId, mode }) => {
  const [check, setCheck] = useState(false);

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

  const handleChange = () => {

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
      <DepMap Dep={Dep} RegId={RegId} mode={mode} ></DepMap>
      <RegMap Reg={Reg} RegId={RegId} mode={mode}></RegMap>
    </article>

  );
}

export default Map;