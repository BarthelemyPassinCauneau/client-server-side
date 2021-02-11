import logo from './logo.svg';
import './App.css';
import { GraphColumn } from './components/GraphColumn.js';
import { GraphCurve } from './components/GraphCurve.js';
import { Map } from './components/Map.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Component } from 'react';
import RealTimeData from './components/RealTimeData';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { back: "", realtimedata: "" };
  }

  callServer() {
    fetch("http://localhost:8080")
      .then(res => res.text())
      .then(res => this.setState({ back: res }));
  }

  callRealTimeData() {
    fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
      .then(res => res.text())
      .then(res => this.setState({ realtimedata: res }));
  }

  componentWillMount() {
    this.callServer();
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
              <GraphColumn pInput1={1} pInput2={2}></GraphColumn>
              <GraphCurve></GraphCurve>
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
