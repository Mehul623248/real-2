import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from "./HomePage/HomePage";
import LeagueStandings from "./LeagueStandings/LeagueStandings";
import TeamPage from './TeamPage/TeamPage';
function App() {
  return (
    <Router>
      <Routes>
        
          <Route path="/" element={<HomePage/>} />
          <Route path="/standings" element={<LeagueStandings/>} />
          <Route path="/team/:id" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
