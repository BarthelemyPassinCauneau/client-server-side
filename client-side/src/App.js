import logo from './logo.svg';
import './App.css';
import {GraphColumn} from './components/GraphColumn.js';
import {GraphCurve} from './components/GraphCurve.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <p>
            Best App
          </p>
        </header>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/graph">Graph</Link>
            </li>
          </ul>
          
          <Switch>
            <Route path="/graph">
                <GraphColumn></GraphColumn>
                <GraphCurve></GraphCurve>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
