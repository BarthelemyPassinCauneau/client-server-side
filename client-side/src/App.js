import logo from './logo.svg';
import './App.css';
import { GraphColumn } from './components/GraphColumn.js';
import { GraphCurve } from './components/GraphCurve.js';
import { Grid } from './components/Grid.js';
import { Map } from './components/Map.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FetchFranceLiveGlobalData } from "./lib/FetchFranceLiveGlobalData";
import { FetchLocationUserDep } from "./lib/FetchLocationUserDep";
import { FetchServerMapData } from "./lib/FetchServerMapData";
import { Component, useEffect, useState } from 'react';

const App = () => {
  const [mapData, setMapData] = useState([]);
  const [realtimeData, setRealtimeData] = useState([{key: ""}]);
  const [locationUserDep, setLocationUserDep] = useState(0);

  useEffect(() => {
    FetchServerMapData.then(data => setMapData(data));
    FetchFranceLiveGlobalData.then(data => setRealtimeData(data));
    FetchLocationUserDep.then(dep => setLocationUserDep(dep));
  });


  return (
      <Router>
        <div className="App">
          <h1>
            Covid-19 Stats
          </h1>
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
