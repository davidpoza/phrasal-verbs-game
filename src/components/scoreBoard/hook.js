import { useState, useEffect } from 'react';
import { API_URL, APP_ID } from 'consts.js';

export default function useScoreBoard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/scores/${APP_ID}`);
      setScores(await response.json());
    })();
  }, [])

  return {
    scores,
  }
}