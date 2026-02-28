import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Make sure this file exists in the same folder!
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('FC');
  const[subActiveTab, setSubActiveTab] = useState('All');
  const [games, setGames] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(1); // Index 1 = Friday (today)
  const [showLiveOnly, setShowLiveOnly] = useState(false); // Filter for live matches only

  // Fetch games when selected date changes
  useEffect(() => {
    // 1. CLEAR OLD GAMES INSTANTLY
    // This ensures the user sees a blank slate (or loading state) immediately
    setGames([]);

    // 2. CREATE AN ABORT CONTROLLER
    // This allows us to cancel this specific fetch request if the user clicks away
    const controller = new AbortController();
    const signal = controller.signal;

    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + selectedDateIndex);
    
    // Format as YYYY-MM-DD
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    fetch(`http://localhost:5000/api/games?date=${dateString}`, { signal }) // <--- PASS THE SIGNAL
      .then(res => res.json())
      .then(data => {
        // React will only run this if the request wasn't cancelled
        setGames(data);
      })
      .catch(err => {
        // Ignore the error if it was just us cancelling the request
        if (err.name !== 'AbortError') {
          console.error('Error fetching games:', err);
        }
      });

    // 3. CLEANUP FUNCTION
    // This runs automatically when 'selectedDateIndex' changes (user clicks a new day)
    return () => {
      controller.abort(); // Cancel the previous request!
    };
  }, [selectedDateIndex]);
  // Fallback hardcoded data for development
  const fallbackGames = [
    {
      id: 1,
      time: "2:00 PM",
      comments: 82,
      agg: "Agg 0-0",
      home: { score: '0', name: "Real eest", logo: "https://media.api-sports.io/football/teams/1.png", rank: "9th", pts: "15pt" },
      away: { score: '0', name: "test", logo: "https://media.api-sports.io/football/teams/2.png", rank: "24th", pts: "9pt" }
    },
    {
      id: 2,
      time: "11:45 AM",
      comments: 18,
      agg: "Agg 0-0",
      home: { score: '0', name: "t", logo: "https://media.api-sports.io/football/teams/1.png", rank: "13th", pts: "13pt" },
      away: { score: '0', name: "BALLLLL", logo: "https://media.api-sports.io/football/teams/2.png", rank: "20th", pts: "10pt" }
    }
  ];

  // Use fetched games or fallback to hardcoded data
  const displayGames = games.length > 0 ? games : fallbackGames;

  return (
    <div className="home-page">
      {/* 1. Sticky Header */}
      <div className="header-container">
        {/* Main Tabs (FC / TENNIS) */}
        <div className="main-tabs">
          <button className={`tab-btn ${activeTab === 'FC' ? 'active' : ''}`} onClick={() => setActiveTab('FC')}>FC</button>
          <button className={`tab-btn ${activeTab === 'Tennis' ? 'active' : ''}`} onClick={() => setActiveTab('Tennis')}>TENNIS</button>
        </div>

        {/* Sub Navigation */}
        <div className="sub-nav">
          <button className={`tab-btn ${subActiveTab === 'All' ? 'active' : ''}`} onClick={() => setSubActiveTab('All')}>All</button>
          <button className={`tab-btn ${subActiveTab === 'Premier League' ? 'active' : ''}`} onClick={() => setSubActiveTab('Premier League')}>PL</button>
          <button className={`tab-btn ${subActiveTab === 'UCL' ? 'active' : ''}`} onClick={() => setSubActiveTab('UCL')}>UCL</button>
          <button className={`tab-btn ${subActiveTab === 'La Liga' ? 'active' : ''}`} onClick={() => setSubActiveTab('La Liga')}>La Liga</button>
          <button className={`tab-btn ${subActiveTab === 'Serie A' ? 'active' : ''}`} onClick={() => setSubActiveTab('Serie A')}>Serie A</button>
          <button className={`tab-btn ${subActiveTab === 'Ligue 1' ? 'active' : ''}`} onClick={() => setSubActiveTab('Ligue 1')}>Ligue 1</button>
          <button className={`tab-btn ${subActiveTab === 'Bundesliga' ? 'active' : ''}`} onClick={() => setSubActiveTab('Bundesliga')}>Bundesliga</button>
          <button className={`tab-btn live-btn ${showLiveOnly ? 'active' : ''}`} onClick={() => setShowLiveOnly(!showLiveOnly)}>🔴 Live</button>
        </div>

        {/* Date Strip */}
        <div className="date-strip">
          {Array.from({ length: 30 }).map((_, i) => {
            // 1. Create a date object for "Today + i days"
            const dateObj = new Date();
            dateObj.setDate(dateObj.getDate() + i);

            // 2. Extract dynamic parts automatically
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // "Fri"
            const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' }); // "Feb"
            const dateNum = dateObj.getDate(); // 13

            return (
              <div 
                key={i} 
                className={`date-item ${selectedDateIndex === i ? 'active' : ''}`}
                onClick={() => setSelectedDateIndex(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Dynamic Month and Date */}
                <span className="date-top">{monthName} {dateNum}</span>
                
                {/* Dynamic Day Name */}
                <span className="date-bottom">{dayName}</span>
              </div>
            );
          })}
        </div>


      </div>

      {/* 2. Main Game Grid */}
      <div className="content-area">
        <div className="section-header">
          <h2 className="section-title">Games</h2>
          <div className="header-links">
            {subActiveTab === 'UCL' && (
              <Link to="/bracket">
                <span className="bracket-link">Bracket ▶</span>
              </Link>
            )}
            <Link to="/standings">
              <span className="standings-link">Standings ▶</span>
            </Link>
          </div>
        </div>

        <div className="games-grid">
          {games.length === 0 ? (
             <div style={{textAlign: 'center', padding: '20px', color: '#666'}}>No games scheduled</div>
          ) : (
             displayGames
              // 1. THIS FILTER IS MANDATORY
              .filter(game => {
                 if (subActiveTab === 'All') {
                   if (showLiveOnly) return game.status === 'live';
                   return true;
                 }
                 if (showLiveOnly) return game.league === subActiveTab && game.status === 'live';
                return game.league === subActiveTab;
              })
              .map((game) => (
                // 2. USE COMPOSITE KEY TO FIX "STUCK" RENDERING BUGS
                // Now that game.league exists, this key will be unique!
                <div key={`${game.league}-${game.id}`} className="game-card">
                  <div className="teams-column">
                    <TeamRow team={game.home} isWinner={game.status === 'finished' && game.home.score > game.away.score} isDraw={game.status === 'finished' && game.home.score === game.away.score} />
                    <TeamRow team={game.away} isWinner={game.status === 'finished' && game.away.score > game.home.score} isDraw={game.status === 'finished' && game.home.score === game.away.score} />
                  </div>

                  <div className="game-details">
                    <div className="time-box">
                      <span
                        className={`game-time ${game.status === 'live' && game.elapsed_time && game.elapsed_time !== 'FT' ? 'live' : ''}`}
                      >
                        {game.home.score === "" ? game.time : ((game.elapsed_time === null || game.elapsed_time === 'FT') ? 'Final' : `${game.elapsed_time}`)}
                      </span>
                      {/* <div className="comment-count">💬 {game.comments}</div> */}
                    </div>
                    {game.agg && <div className="aggregate-score">{game.agg}</div>}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

const TeamRow = ({ team, isWinner, isDraw }) => {
  const score = team.score;
  const showRankPts = score == null || score === 'NA'; // null/undefined or literal 'NA'

  return (
    <div className={`team-row ${isWinner ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>
      <img src={team.logo} alt={team.name} className="team-logo" />
      <div className="team-info">
        <div className="team-meta">
          {!showRankPts ? (
            <h1 className={`team-score ${isWinner ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>{score}</h1>
          ) : (
            <>
              <span className="dot">•</span>
              <span className="team-rank">{team.rank}</span>
              <span className="dot">•</span>
              <span>{team.pts}</span>
            </>
          )}
        </div>
        <div className={`team-name ${isWinner ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>{team.name}</div>
      </div>
    </div>
  );
};

export default HomePage;