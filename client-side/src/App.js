import logo from './logo.svg';
import './App.css';
import {GraphColumn} from './GraphColumn.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>
            Coucou
          </p>
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
            </Route>
          </Switch>

        </header>
      </div>
    </Router>
  );
}

export default App;
