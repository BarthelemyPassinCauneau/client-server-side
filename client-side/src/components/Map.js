import Switch from '@material-ui/core/Switch';
import { RegMap } from './RegMap';
import { DepMap } from './DepMap';
import { useState } from 'react';


const Map = ({ Dep, Reg, RegId, mode }) => {
  const [mapType, setMapType] = useState(false);

  const handleChange = (event) => {
    setMapType(!mapType);
  }

  return (
    <article className="examples__block">
      <span>Départements</span>
      <Switch
        checked={mapType}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <span>Régions</span>
      {mapType ? <RegMap Reg={Reg} RegId={RegId} mode={mode}/> : <DepMap Dep={Dep} RegId={RegId} mode={mode}/>}
    </article>
  );
}

export default Map;