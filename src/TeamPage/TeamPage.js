import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TeamPage = () => {
  const { id } = useParams(); // Get ID from URL
  const { state } = useLocation();
  const teamData = state?.team;
  const navigate = useNavigate();

  if (!teamData) {
    return <div>Loading team data...</div>;
  }

  return (
    <div>
      <h1>{teamData.name}</h1>
      <img src={teamData.logo} alt={`${teamData.name} Logo`} />
      <p>Rank: {teamData.rank}</p>
      <p>Points: {teamData.points}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default TeamPage;