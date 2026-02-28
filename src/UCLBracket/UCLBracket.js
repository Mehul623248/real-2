import React from 'react';
import './UCLBracket.css';
import team_logos from './teamLogos'; // Object mapping team names to logo URLs
// 1. Restructured Data: A binary tree instead of a flat array
const bracketTree = {
  round: 'Final',
  id: 15, team1: 'SemiFinal-1', score1: null, team2: 'SemiFinal-2', score2: null,
  
  // Left side of the bracket feeds into Team 1 (Real Madrid)
  leftTree: {
    round: 'Semi-Finals',
    id: 13, team1: 'QuarterFinal-1', score1: null, team2: 'QuarterFinal-2', score2: null,
    children: [
      {
        round: 'Quarter-Finals',
        id: 9, team1: 'Rd16-1', score1: null, team2: 'Rd16-2', score2: null,
        children: [
          { round: 'Round of 16', id: 1, team1: 'PSG', logo1: team_logos['PSG'], team2: 'Chelsea', logo2: team_logos['Chelsea'] },
          { round: 'Round of 16', id: 2, team1: 'Galatasaray', logo1: team_logos['Galatasaray'], team2: 'Liverpool', logo2: team_logos['Liverpool'], score2: null }
        ]
      },
      {
        round: 'Quarter-Finals',
        id: 10, team1: 'Rd16-3', score1: null, team2: 'Rd16-4', score2: null,
        children: [
          { round: 'Round of 16', id: 3, team1: 'Real Madrid', logo1: team_logos['Real Madrid'], team2: 'Manchester City', logo2: team_logos['Manchester City'], score2: null },
          { round: 'Round of 16', id: 4, team1: 'Atalanta', logo1: team_logos['Atalanta'], team2: 'Bayern Munich', logo2: team_logos['Bayern Munich'], score2: null }
        ]
      }
    ]
  },

  // Right side of the bracket feeds into Team 2 (Bayern Munich)
  rightTree: {
    round: 'Semi-Finals',
    id: 14, team1: 'QuarterFinal-3', score1: null, team2: 'QuarterFinal-4', score2: null,
    children: [
      {
        round: 'Quarter-Finals',
        id: 11, team1: 'Rd16-5', team2: 'Rd16-6', score2: null,
        children: [
          { round: 'Round of 16', id: 5, team1: 'Newcastle United', logo1: team_logos['Newcastle United'], score1: null, team2: 'Barcelona', logo2: team_logos['Barcelona'], score2: null },
          { round: 'Round of 16', id: 6, team1: 'Atletico Madrid', logo1: team_logos['Atletico Madrid'], score1: null, team2: 'Tottenham', logo2: team_logos['Tottenham'], score2: null }
        ]
      },
      {
        round: 'Quarter-Finals',
        id: 12, team1: 'Rd16-7', team2: 'Rd16-8', score2: null,
        children: [
          { round: 'Round of 16', id: 7, team1: 'Bodo/Glimt', logo1: team_logos['Bodo/Glimt'], score1: null, team2: 'Sporting CP', logo2: team_logos['Sporting CP'], score2: null },
          { round: 'Round of 16', id: 8, team1: 'Bayer Leverkusen', logo1: team_logos['Bayer Leverkusen'], score1: null, team2: 'Arsenal', logo2: team_logos['Arsenal'], score2: null }
        ]
      }
    ]
  }
};

// 2. Recursive Component for the tree logic
const MatchNode = ({ match, side }) => {
  if (!match) return null;

  return (
    <div className={`match-node-wrapper ${side}`}>
      {/* Render previous rounds (children) if they exist */}
      {match.children && (
        <div className="feeders">
          <MatchNode match={match.children[0]} side={side} />
          <MatchNode match={match.children[1]} side={side} />
        </div>
      )}

      {/* The connecting horizontal line */}
      {match.children && <div className="connector-line"></div>}

      {/* Your exact existing match-box layout */}
      <div className="match-box-container">
        <div className="match-box">
          <div className="team-matchup">
            <div className="team">
              {match.logo1 && <img src={match.logo1} alt={match.team1} className="ucl-team-logo" />}
              <span className="team-name">{match.team1}</span>
              {match.score1 !== null && <span className="score">{match.score1}</span>}
            </div>
            <div className="vs">vs</div>
            <div className="team">
              {match.logo2 && <img src={match.logo2} alt={match.team2} className="ucl-team-logo" />}
              <span className="team-name">{match.team2}</span>
              {match.score2 !== null && <span className="score">{match.score2}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Main Container
const UCLBracket = () => {
  return (
    <div className="ucl-bracket-container">
      <h1>UEFA Champions League Bracket</h1>
      
      <div className="bracket-tree-wrapper">
        {/* Render Left Tree */}
        <MatchNode match={bracketTree.leftTree} side="left" />
        
        {/* Render Final in the Middle */}
        <div className="final-match-container">
          <div className="connector-line left-final-connector"></div>
          
          <div className="match-box-container final-box">
            <h2 className="stage-title text-yellow-500 text-center mb-2">Final</h2>
            <div className="match-box border-yellow-500">
              <div className="team-matchup">
                <div className="team">
                  <span className="team-name">{bracketTree.team1}</span>
                  {bracketTree.score1 !== null && <span className="score">{bracketTree.score1}</span>}
                </div>
                <div className="vs">vs</div>
                <div className="team">
                  <span className="team-name">{bracketTree.team2}</span>
                  {bracketTree.score2 !== null && <span className="score">{bracketTree.score2}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="connector-line right-final-connector"></div>
        </div>

        {/* Render Right Tree */}
        <MatchNode match={bracketTree.rightTree} side="right" />
      </div>
    </div>
  );
};

export default UCLBracket;