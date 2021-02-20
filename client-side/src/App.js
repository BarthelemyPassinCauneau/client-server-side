import './App.scss';

import { GraphColumn } from './components/GraphColumn.js';
import { Grid } from './components/Grid';
import { Map } from './components/Map'
import { DarkModeButton } from './components/DarkModeButton';

import { FetchFranceLiveGlobalData } from "./lib/FetchFranceLiveGlobalData";
import { FetchLocationUserDep } from "./lib/FetchLocationUserDep";
import { FetchServerMapData } from "./lib/FetchServerMapData";
import useLocalStorage from "./lib/useLocalStorage";

import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [mapData, setMapData] = useState([]);
  const [realtimeData, setRealtimeData] = useState([{key: ""}]);
  const [locationUserDep, setLocationUserDep] = useState(0);

  const [displayMode, setDisplayMode] = useLocalStorage('darkmode');

  useEffect(() => {
    FetchServerMapData.then(data => setMapData(data));
    FetchFranceLiveGlobalData.then(data => setRealtimeData(data));
    FetchLocationUserDep.then(dep => setLocationUserDep(dep));
  });

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
              <GraphColumn currentDep = {locationUserDep}/>
              <Grid data={realtimeData}/>
            </Route>
            <Route path="/map">
              <Map data = {mapData}/>
              <Grid data={realtimeData}/>
            </Route>
            <Route path="/">
              <Grid data={realtimeData}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
};

export default App;
