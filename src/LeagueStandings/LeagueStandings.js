import React, { useState, useEffect } from 'react';
import StandingsTable from './StandingsTable';
import './LeaugeStandings.css';

const API_BASE = 'http://localhost:5000';

const RealAppFrontend = () => {
  const [activeLeague, setActiveLeague] = useState({ id: 39, type: 'soccer', name: 'EPL' });

  useEffect(() => {
    fetch(`${API_BASE}/api/warm-up`).catch(() => {});
  }, []);

  const leagues = [
    { id: 39, type: 'soccer', name: 'Premier League' },
    { id: 140, type: 'soccer', name: 'La Liga' },
    { id: 135, type: 'soccer', name: 'Serie A' },
    { id: 61, type: 'soccer', name: 'Ligue 1' },
    {id: 21, type:'soccer', name:'Bundesliga'},
    { id: 2, type: 'soccer', name: 'UCL' },
    {id: 78, type:'soccer', name:'EFL Championship'},
  ];

  return (
    <div className="leagueStandingsPage">
      <div className="leagueScroller noScrollbar">
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => setActiveLeague(league)}
            className={`leagueTab ${activeLeague.id === league.id ? 'leagueTabActive' : 'leagueTabInactive'}`}
          >
            {league.name}
          </button>
        ))}
      </div>
      <div className="leagueContent">
        <h2 className="leagueTitle">{activeLeague.name} Standings</h2>
        <StandingsTable leagueId={activeLeague.id} type={activeLeague.type} />
      </div>
    </div>
  );
};

export default RealAppFrontend;