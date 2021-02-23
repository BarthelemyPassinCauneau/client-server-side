import './App.scss';

import { Map } from './components/Map';
import { Home } from './components/Home';
import { DarkModeButton } from './components/DarkModeButton';

import { FetchFranceLiveGlobalData } from "./lib/FetchFranceLiveGlobalData";
import { FetchLocationUserDep } from "./lib/FetchLocationUserDep";
import { FetchServerMapDataDep, FetchServerMapDataReg } from "./lib/FetchServerMapData";
import useLocalStorage from "./lib/useLocalStorage";

import { Suspense, lazy, useState, useCallback, useEffect } from 'react';
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

  const Grid = lazy(
    () => new Promise((resolve, reject) =>
      FetchFranceLiveGlobalData.then(data => {
        setRealtimeData(data);
        resolve(import("./components/Grid"));
      })
    )
  );

  const CasesNumberGraph = lazy(
    () => new Promise((resolve, reject) =>
      FetchLocationUserDep.then(dep => {
        setLocationUserDep(dep);
        resolve(import("./components/CasesNumberGraph"));
      })
    )
  );

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
            <Route exact path="/">
              <Home/>
            </Route>
            <Suspense fallback={<div><p className="loadingText">Localisation en cours</p><div className="loader"></div></div>}>
              <Route path="/graph">
                <CasesNumberGraph currentDep = {locationUserDep} mode={displayMode}/>
              </Route>
            </Suspense>
            <Route path="/map">
              <Map Dep = {mapDataDep} Reg = {mapDataReg} mode = {displayMode} />
            </Route>
          </Switch>
          <Suspense fallback={<div className="loadGrid"><p className="loadingText">Accès aux données en direct en cours...</p><div className="loader"></div></div>}>
            <Grid data={realtimeData} mode={displayMode}/>
          </Suspense>
        </div>
      </Router>
    );
};

export default App;
