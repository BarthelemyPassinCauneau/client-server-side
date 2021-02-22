import './App.scss';

import { CasesNumberGraph } from './components/CasesNumberGraph.js';
import { Grid } from './components/Grid';
import { Map } from './components/Map'
import { DarkModeButton } from './components/DarkModeButton';

import { FetchFranceLiveGlobalData } from "./lib/FetchFranceLiveGlobalData";
import { FetchLocationUserDep } from "./lib/FetchLocationUserDep";
import { FetchServerMapDataDep, FetchServerMapDataReg } from "./lib/FetchServerMapData";
import useLocalStorage from "./lib/useLocalStorage";

import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [mapDataDep, setMapDataDep] = useState([]);
  const [mapDataReg, setMapDataReg] = useState([]);
  const [realtimeData, setRealtimeData] = useState([]);
  const [locationUserDep, setLocationUserDep] = useState(0);

  const [displayMode, setDisplayMode] = useLocalStorage('darkmode');
  useEffect(() => {
    FetchFranceLiveGlobalData.then(data => setRealtimeData(data));
  });
  FetchServerMapDataDep.then(data => setMapDataDep(data));
  FetchServerMapDataReg.then(data => setMapDataReg(data));
  FetchLocationUserDep.then(dep => setLocationUserDep(dep));

  const handleChangeMode = useCallback(
		(e) => {
			const modeValue = !!e.target.checked;
			setDisplayMode(modeValue);
		},
		[setDisplayMode],
  );
  
  return (
      <Router>
        <div className={`App ${displayMode ? 'dark' : 'light'}`}>
          <h1>
            Covid-19 Stats
          </h1>
          <DarkModeButton
						onChange={handleChangeMode}
						mode={displayMode}
					/>
          <Link to="/">
            <button type="button">
              Home
            </button>
          </Link>
          <Link to="/graph">
            <button type="button">
              Graph
            </button>
          </Link>
          <Link to="/map">
            <button type="button">
              Map
            </button>
          </Link>

          <Switch>
            <Route path="/graph">
              <CasesNumberGraph currentDep = {locationUserDep} mode={displayMode}/>
            </Route>
            <Route path="/map">
              <Map Dep = {mapDataDep} Reg = {mapDataReg} mode = {displayMode} />
            </Route>
          </Switch>
          <Grid data={realtimeData} mode={displayMode}/>
        </div>
      </Router>
    );
};

export default App;
