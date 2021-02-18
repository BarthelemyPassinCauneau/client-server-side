import logo from './logo.svg';
import './App.css';
import { GraphColumn } from './components/GraphColumn.js';
import { GraphCurve } from './components/GraphCurve.js';
import { Grid } from './components/Grid.js';
import { Map } from './components/Map.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { mapData: [], realtimedata: [{key: ""}], currentDep : 0};
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

  GetLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      fetch("https://api-adresse.data.gouv.fr/reverse/?lat=" + position.coords.latitude + '&lon=' + position.coords.longitude)
        .then(location => location.json())
        .then(location => this.setState({ currentDep: parseInt(location.features[0].properties.context.split(",")[0])}));
    });
  }

  componentWillMount() {
    this.GetDataForMap();
    this.callRealTimeData();
    this.GetLocation();
  }

  render() {
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
              <GraphColumn currentDep = {this.state.currentDep}/>
              <GraphCurve currentDep = {this.state.currentDep}/>
              <Grid data={this.state.realtimedata}/>
            </Route>
            <Route path="/map">
              <Map data = {this.state.mapData}/>
              <Grid data={this.state.realtimedata}/>
            </Route>
            <Route path="/">
              <Grid data={this.state.realtimedata}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
