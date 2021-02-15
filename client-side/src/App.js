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
    this.state = { back: "", realtimedata: [{key: ""}], zero6 : [{key: 0}]};
  }
  //
  callServer() {
    fetch("http://localhost:8080")
      .then(res => res.text())
      .then(res => this.setState({ back: res }));
  }

  callServer06() {
    fetch("http://localhost:8080/covid_data/heb/dep?week=2020-S24&dep=06")
    .then(res => res.json())
    .then(res => this.setState({ zero6: res}));
  }   

  callRealTimeData() {
    fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
      .then(res => res.json())
      .then(res => this.setState({ realtimedata: res.FranceGlobalLiveData}));
  }

  componentWillMount() {
    this.callServer();
    this.callServer06();
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
              <GraphColumn input={this.state.zero6}></GraphColumn>
              <GraphCurve></GraphCurve>
              <Grid data={this.state.realtimedata}></Grid>
            </Route>
            <Route path="/map">
              <Map></Map>
            </Route>
          </Switch>
          <RealTimeData data={this.state.realtimedata}></RealTimeData>
        </div>
      </Router>
    );
  }
}

export default App;
