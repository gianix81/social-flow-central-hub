
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HubContenuti = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the new EmailViewer component
    navigate('/contenuti', { replace: true });
  }, [navigate]);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reindirizzamento...</h1>
      <p className="text-gray-600 mt-2">Reindirizzamento alla visualizzazione email...</p>
    </div>
  );
};

export default HubContenuti;
