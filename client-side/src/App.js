import logo from './logo.svg';
import './App.css';
import { GraphColumn } from './components/GraphColumn.js';
import { GraphCurve } from './components/GraphCurve.js';
import { Grid } from './components/Grid.js';
import { Map } from './components/Map.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Component } from 'react';
import RealTimeData from './components/RealTimeData';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { mapData: [], realtimedata: [{key: ""}]};
  }

  GetDataForMap() {
    fetch("http://localhost:8080/covid_data/heb/dep?cl_age90=0")
      .then(res => res.json())
      .then(res => this.setState({ mapData: res }));
  }

  callRealTimeData() {
    fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
      .then(res => res.json())
      .then(res => this.setState({ realtimedata: res.FranceGlobalLiveData}));
  }

  componentWillMount() {
    this.GetDataForMap();
    this.callRealTimeData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>
            Best app !
          </h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/graph">Graph</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/graph">
              <GraphColumn></GraphColumn>
              <GraphCurve></GraphCurve>
              <Grid data={this.state.realtimedata}></Grid>
            </Route>
            <Route path="/map">
              <Map data = {this.state.mapData}></Map>
            </Route>
          </Switch>
          <RealTimeData data={this.state.realtimedata}></RealTimeData>
        </div>
      </Router>
    );
  }
}

export default App;
