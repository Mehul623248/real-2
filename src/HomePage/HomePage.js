import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/games';

function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setGames(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load games');
        setGames([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-gray-400">Loading games...</div>;
  if (error) return <div className="p-4 text-red-400">Error: {error}</div>;
  if (!games.length) return <div className="p-4 text-gray-400">No games found.</div>;

  return (
    <div>
      {games.map((game) => (
        <GameCard
          key={game.id}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          time={game.time}
          comments={game.comments}
        />
      ))}
    </div>
  );
}

function GameCard({ homeTeam, awayTeam, time, comments }) {
  return (
    <div className="bg-[#121212] border-b border-gray-800 p-4 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1a]">
      <div className="space-y-3">
        <TeamRow logo={homeTeam.logo} rank={homeTeam.rank} pts={homeTeam.pts} name={homeTeam.name} />
        <TeamRow logo={awayTeam.logo} rank={awayTeam.rank} pts={awayTeam.pts} name={awayTeam.name} />
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-300">{time}</p>
        <div className="flex items-center justify-end text-gray-500 text-xs mt-1">
          <span className="mr-1">💬</span> {comments}
        </div>
      </div>
    </div>
  );
}

const TeamRow = ({ logo, rank, pts, name }) => (
  <div className="flex items-center space-x-3">
    <img
      src={logo || ''}
      alt={name}
      className="w-6 h-6 rounded-full object-cover bg-gray-700"
      onError={(e) => { e.target.src = ''; e.target.style.display = 'none'; }}
    />
    <div>
      <div className="flex items-center space-x-1">
        <span className="text-xs text-gray-400">{rank} • {pts}pt</span>
      </div>
      <p className="text-xs text-blue-400 font-medium">{name}</p>
    </div>
  </div>
);

export default HomePage;
