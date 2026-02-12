import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from "./HomePage/HomePage";
import LeagueStandings from "./LeagueStandings/LeagueStandings";
function App() {
  return (
    <Router>
      <Routes>
        
          <Route path="/" element={<HomePage/>} />
          <Route path="/standings" element={<LeagueStandings/>} />
      </Routes>
    </Router>
  );
}

export default App;
