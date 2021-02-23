import './App.scss';

import { Home } from './components/Home';
import { DarkModeButton } from './components/DarkModeButton';

import { FetchFranceLiveGlobalData } from "./lib/FetchFranceLiveGlobalData";
import { FetchLocationUserDep } from "./lib/FetchLocationUserDep";
import { FetchServerMapDataDep, FetchServerMapDataReg, FetchRegsId } from "./lib/FetchServerMapData";
import useLocalStorage from "./lib/useLocalStorage";

import { Suspense, lazy, useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [mapDataDep, setMapDataDep] = useState([]);
  const [mapDataReg, setMapDataReg] = useState([]);
  const [mapRegId, setMapRegId] = useState([]);
  const [realtimeData, setRealtimeData] = useState([]);
  const [locationUserDep, setLocationUserDep] = useState(0);
  const [init, setInit] = useState(true);
  const [displayMode, setDisplayMode] = useLocalStorage('darkmode');

  useEffect(() => {
    FetchFranceLiveGlobalData.then(data => setRealtimeData(data));
    if (init && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDisplayMode(true);
      setInit(false);
    }
  });

  const Map = lazy(
    () => new Promise((resolve, reject) =>
    FetchServerMapDataDep.then(dataDep => {
      setMapDataDep(dataDep);
      FetchServerMapDataReg.then(dataReg => {
        setMapDataReg(dataReg);
        FetchRegsId.then(dataId => {
          setMapRegId(dataId);
          resolve(import('./components/Map'))
        });
      });
    })
    )
  )

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
            <Home />
          </Route>
          <Route path="/graph">
            <Suspense fallback={<div><p className="loadingText">Localisation en cours</p><div className="loader"></div></div>}>
              <CasesNumberGraph currentDep={locationUserDep} mode={displayMode} />
            </Suspense>
          </Route>
          <Route path="/map">
            <Suspense fallback={<div><p className="loadingText">Chargement des données de la carte</p><div className="loader"></div></div>}>
              <Map Dep={mapDataDep} Reg={mapDataReg} RegId={mapRegId} mode={displayMode} />
            </Suspense>
          </Route>
        </Switch>
        <Suspense fallback={<div className="loadGrid"><p className="loadingText">Accès aux données en direct en cours...</p><div className="loader"></div></div>}>
          <Grid data={realtimeData} mode={displayMode} />
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
