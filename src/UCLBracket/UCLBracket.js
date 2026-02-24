import React from 'react';
import './UCLBracket.css';

// 1. Restructured Data: A binary tree instead of a flat array
const bracketTree = {
  round: 'Final',
  id: 15, team1: 'Real Madrid', score1: null, team2: 'Bayern Munich', score2: null,
  
  // Left side of the bracket feeds into Team 1 (Real Madrid)
  leftTree: {
    round: 'Semi-Finals',
    id: 13, team1: 'Real Madrid', score1: null, team2: 'Manchester City', score2: null,
    children: [
      {
        round: 'Quarter-Finals',
        id: 9, team1: 'Real Madrid', score1: null, team2: 'Juventus', score2: null,
        children: [
          { round: 'Round of 16', id: 1, team1: 'Real Madrid', score1: 2, team2: 'Benfica', score2: 1 },
          { round: 'Round of 16', id: 2, team1: 'Liverpool', score1: 3, team2: 'Inter Milan', score2: 2 }
        ]
      },
      {
        round: 'Quarter-Finals',
        id: 10, team1: 'Liverpool', score1: null, team2: 'Manchester City', score2: null,
        children: [
          { round: 'Round of 16', id: 3, team1: 'Manchester City', score1: 4, team2: 'PSG', score2: 1 },
          { round: 'Round of 16', id: 4, team1: 'Bayern Munich', score1: 2, team2: 'Barcelona', score2: 2 }
        ]
      }
    ]
  },

  // Right side of the bracket feeds into Team 2 (Bayern Munich)
  rightTree: {
    round: 'Semi-Finals',
    id: 14, team1: 'Bayern Munich', score1: null, team2: 'Roma', score2: null,
    children: [
      {
        round: 'Quarter-Finals',
        id: 11, team1: 'Bayern Munich', score1: null, team2: 'Chelsea', score2: null,
        children: [
          { round: 'Round of 16', id: 5, team1: 'Chelsea', score1: 1, team2: 'Dortmund', score2: 0 },
          { round: 'Round of 16', id: 6, team1: 'Ajax', score1: 2, team2: 'Roma', score2: 3 }
        ]
      },
      {
        round: 'Quarter-Finals',
        id: 12, team1: 'Roma', score1: null, team2: 'Leipzig', score2: null,
        children: [
          { round: 'Round of 16', id: 7, team1: 'Porto', score1: 1, team2: 'Lyon', score2: 2 },
          { round: 'Round of 16', id: 8, team1: 'Atletico Madrid', score1: 0, team2: 'Leipzig', score2: 1 }
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
              <span className="team-name">{match.team1}</span>
              {match.score1 !== null && <span className="score">{match.score1}</span>}
            </div>
            <div className="vs">vs</div>
            <div className="team">
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