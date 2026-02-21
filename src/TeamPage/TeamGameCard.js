import React from 'react';
import './TeamGameCard.css';

const TeamGameCard = ({ home, away, time, comments, agg, result }) => {
  return (
    <div className="game-card">
      <div className="game-card-content">
        
        {/* --- LEFT SIDE: Teams --- */}
        <div className="game-card-teams">
          
          {/* Home Team Row */}
          <TeamRow team={home} />

          {/* Away Team Row */}
          <TeamRow team={away} />

        </div>

        {/* --- RIGHT SIDE: Time & Info --- */}
        <div className="game-card-info">
          {result && (
            <div className={`match-result ${result}`}>
              {result.charAt(0).toUpperCase() + result.slice(1)}
            </div>
          )}
          <div className="game-time-info">
            <div className="game-time">{time}</div>
           
          </div>

          {/* Aggregate Score (if exists) */}
          {agg && (
            <div className="game-agg">
              {agg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Component for a single team row
const TeamRow = ({ team }) => (
  <div className="team-row">
    {/* Logo */}
    <img className="team-logo" src={team.logo} alt={team.name} />
    
    {/* Info Stack - Score and Name */}
    <div className="team-info">
      {/* Score and Rank on same line */}
      <div className="team-stats">
        <span className="team-score">{team.score ?? '0'}</span>
        <span className="team-rank">{team.rank}</span>
      </div>
      
      {/* Team Name */}
      <div className="team-name">
        {team.name}
      </div>
    </div>
  </div>
);

export default TeamGameCard;