import React, { useEffect, useState } from 'react';
import './StandingsTable.css';

const API_BASE = 'http://localhost:5000';

const getSidebarColor = (rank) => {
  // Top 4 teams: Champions League spots
  if (rank >= 1 && rank <= 4) return { borderLeft: '4px solid #10b981' };
  
  // 5th team: Secondary qualification spot
  if (rank === 5) return { borderLeft: '4px solid #3b82f6' }; // blue for Europa League
  
  // 6th team: Tertiary qualification spot
  if (rank === 6) return { borderLeft: '4px solid #f59e0b' }; // yellow for Conference League

  // Relegation zone
  if (rank >= 18) return { borderLeft: '4px solid #ef4444' };
  
  return { borderLeft: '4px solid transparent' };
};

const StandingsTable = ({ leagueId }) => {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (leagueId == null) return;
    setError(null);
    fetch(`${API_BASE}/api/standings/soccer/${leagueId}`)
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok && Array.isArray(data)) {
          setStandings(data);
          setError(null);
        } else {
          setStandings([]);
          setError(data?.error || 'Failed to load standings');
        }
      })
      .catch(() => {
        setStandings([]);
        setError('Failed to load standings');
      });
  }, [leagueId]);

  const rows = Array.isArray(standings) ? standings : [];

  return (
    <div className="standingsTableWrap">
      {error && <p className="standingsError">{error}</p>}
      <table className="standingsTable">
        <thead className="standingsThead">
          <tr>
            <th className="standingsTh">POS</th>
            <th className="standingsTh">TEAM</th>
            <th className="standingsTh">GP</th>
            <th className="standingsTh">W</th>
            <th className="standingsTh">D</th>
            <th className="standingsTh">L</th>
            <th className="standingsTh">F</th>
            <th className="standingsTh">A</th>
            <th className="standingsTh">GD</th>
            <th className="standingsTh">P</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.team.id} className={`standingsRow `}>
              <td className="standingsTd standingsTdRank" style={{ ...getSidebarColor(row.rank), paddingLeft: '0.75rem', fontWeight: 'bold' }}>{row.rank}</td>
              <td className="standingsTd standingsTdTeam">
                <img src={row.team.logo} className="standingsTeamLogo" alt="" />
                {row.team.name}
              </td>
              <td className="standingsTd">{row.all?.played || '-'}</td>
              <td className="standingsTd">{row.all?.win || '-'}</td>
              <td className="standingsTd">{row.all?.draw || '-'}</td>
              <td className="standingsTd">{row.all?.lose || '-'}</td>
              <td className="standingsTd">{row.all?.goals?.for || '-'}</td>
              <td className="standingsTd">{row.all?.goals?.against || '-'}</td>
              <td className="standingsTd">{row.goalsDiff || '-'}</td>
              <td className="standingsTd standingsTdPts">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;