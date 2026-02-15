import React from 'react';

const GameCard = ({ home, away, time, comments, agg }) => {
  return (
    <div className="bg-[#121212] rounded-xl p-4 border border-white/5 shadow-sm active:bg-[#1a1a1a] transition-colors cursor-pointer">
      <div className="flex justify-between items-start">
        
        {/* --- LEFT SIDE: Teams --- */}
        <div className="flex-1 space-y-4"> {/* Increased space-y for that 'gap' look */}
          
          {/* Home Team Row */}
          <TeamRow team={home} />

          {/* Away Team Row */}
          <TeamRow team={away} />

        </div>

        {/* --- RIGHT SIDE: Time & Info --- */}
        <div className="flex flex-col items-end justify-between h-full pl-4 min-w-[80px]">
          <div className="text-right">
            <div className="text-white font-bold text-sm tracking-wide">{time}</div>
            <div className="flex items-center justify-end gap-1 mt-1 text-gray-500">
              <span className="text-[10px]">💬</span>
              <span className="text-xs font-medium">{comments}</span>
            </div>
          </div>

          {/* Aggregate Score (if exists) */}
          {agg && (
            <div className="mt-4 text-blue-400 text-xs font-bold tracking-tight">
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
  <div className="flex items-center">
    {/* Logo
    <img 
      src={team.logo} 
      alt={team.name} 
      className="w-8 h-8 object-contain mr-3" 
    /> */}
    
    {/* Info Stack */}
    <div className="flex flex-col leading-tight">
      {/* Top Line: Rank & Points */}
      <div className="flex items-center text-gray-400 text-[11px] font-medium mb-0.5">
        <span className="text-white font-semibold mr-2">{team.score ?? '0'}</span>
        <span className="text-gray-200">{team.rank}</span>
        <span className="mx-1.5 opacity-50">•</span>
        <span>{team.pts}</span>
      </div>
      
      {/* Bottom Line: Name */}
      <div className="text-[15px] font-bold text-blue-400 truncate max-w-[140px]">
        {team.name}
      </div>
    </div>
  </div>
);

export default GameCard;