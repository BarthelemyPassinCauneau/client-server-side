
import Switch from '@material-ui/core/Switch';
import { RegMap } from './RegMap'
import { DepMap } from './DepMap'
import { useState } from 'react';


export const Map = ({ Dep, Reg, mode }) => {
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
      <DepMap Dep={Dep} mode={mode}></DepMap>
      <RegMap Reg={Reg} mode={mode}></RegMap>
    </article>

  );
}
