import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TeamGameCard from '../TeamPage/TeamGameCard';
import './TeamPage.css';

const TeamPage = () => {
  const { id } = useParams(); // Get ID from URL
  const { state } = useLocation();
  const teamData = state?.team;
  const [matchesData, setMatchesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/teams/${id}`)
        .then(res => res.json())
        .then(data => {
          setMatchesData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching team data:', err);
          setError('Failed to load matches');
          setLoading(false);
        });
    }
  }, [id]);

  if (!teamData) {
    return <div>Loading team data...</div>;
  }

  // Format match data for GameCard
  const formatMatchForGameCard = (match, currentTeam) => {
    const homeScore = match.home_score || 'TBD';
    const awayScore = match.away_score || 'TBD';
    const currentTeamName = currentTeam?.team?.name;
    
    // Determine result from current team's perspective
    let result = null;
    if (homeScore !== 'TBD' && awayScore !== 'TBD') {
      if (currentTeamName === match.home_team?.name) {
        if (homeScore > awayScore) result = 'win';
        else if (homeScore < awayScore) result = 'loss';
        else result = 'draw';
      } else if (currentTeamName === match.away_team?.name) {
        if (awayScore > homeScore) result = 'win';
        else if (awayScore < homeScore) result = 'loss';
        else result = 'draw';
      }
    }
    
    return {
      home: {
        name: match.home_team?.name || 'Unknown',
        score: homeScore,
        logo: match.home_team?.logo
      },
      away: {
        name: match.away_team?.name || 'Unknown',
        score: awayScore,
        logo: match.away_team?.logo
      },
      time: match.time || match.date_display || '-',
      comments: 0,
      agg: match.competition?.name || match.outcome || '',
      result: result
    };
  };

  return (
    <div className="team-page-container">
      <div className="team-header">
        <h1 className="team-title">{teamData.team.name}</h1>
        <img src={teamData.team.logo} alt={`${teamData.team.name} Logo`} className="team-logo" />
        <p className="team-info-text">Rank: {teamData.rank}</p>
        <p className="team-info-text">Points: {teamData.points}</p>
       
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <h2 className="section-title">Next Matches</h2>
      <div className="matches-grid">
        {loading ? (
          <p className="loading-text">Loading matches...</p>
        ) : matchesData?.next_matches && matchesData.next_matches.length > 0 ? (
          matchesData.next_matches.map((match, idx) => (
            <div key={match.match_id || idx}>
              <TeamGameCard {...formatMatchForGameCard(match, teamData)} />
            </div>
          ))
        ) : (
          <p className="no-matches-text">No upcoming matches</p>
        )}
      </div>

      <h2 className="section-title">Past Matches</h2>
      <div className="matches-grid">
        {loading ? (
          <p className="loading-text">Loading matches...</p>
        ) : matchesData?.past_matches && matchesData.past_matches.length > 0 ? (
          matchesData.past_matches.map((match, idx) => (
            <div key={match.match_id || idx}>
              <TeamGameCard {...formatMatchForGameCard(match, teamData)} />
            </div>
          ))
        ) : (
          <p className="no-matches-text">No past matches</p>
        )}
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="go-back-btn"
      >
        Go Back
      </button>
    </div>
  );
};

export default TeamPage;