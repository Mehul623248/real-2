import React, { useEffect, useState } from 'react';
import './StandingsTable.css';

const API_BASE = 'http://localhost:5000';

const LEAGUE_COLORS = {
  '39': { // EPL
    champions: { range: [1, 4], color: '#10b981' },
    europa: { range: [5, 5], color: '#3b82f6' },
    // conference: { range: [6, 6], color: '#f59e0b' },
    relegation: { range: [18, 20], color: '#ef4444' },
  },
  '140': { // La Liga
    champions: { range: [1, 4], color: '#10b981' },
    europa: { range: [5, 5], color: '#3b82f6' },
    conference: { range: [6, 6], color: '#f59e0b' },
    relegation: { range: [18, 20], color: '#ef4444' },
  },
  '135': { // Serie A
    champions: { range: [1, 4], color: '#10b981' },
    europa: { range: [5, 5], color: '#3b82f6' },
    conference: { range: [6, 6], color: '#f59e0b' },
    relegation: { range: [18, 20], color: '#ef4444' },
  },
  // '61': { // Ligue 1
  //   champions: { range: [1, 3], color: '#10b981' },
  //   europa: { range: [4, 5], color: '#3b82f6' },
  //   conference: { range: [6, 6], color: '#f59e0b' },
  //   relegation: { range: [18, 20], color: '#ef4444' },
  // },
  // '21': { // Bundesliga
  //   champions: { range: [1, 3], color: '#10b981' },
  //   europa: { range: [4, 5], color: '#3b82f6' },
  //   conference: { range: [6, 6], color: '#f59e0b' },
  //   relegation: { range: [18, 20], color: '#ef4444' },
  // }
};

const getSidebarColor = (rank, leagueId) => {
  const rules = LEAGUE_COLORS[leagueId];
  if (!rules) return { borderLeft: '4px solid transparent' };
  
  for (const rule of Object.values(rules)) {
    if (rank >= rule.range[0] && rank <= rule.range[1]) {
      return { borderLeft: `4px solid ${rule.color}` };
    }
  }
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
              <td className="standingsTd standingsTdRank" style={{ ...getSidebarColor(row.rank, leagueId), paddingLeft: '0.75rem', fontWeight: 'bold' }}>{row.rank}</td>
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
              <td className="standingsTd">{row.goalsDiff || '0'}</td>
              <td className="standingsTd standingsTdPts">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;