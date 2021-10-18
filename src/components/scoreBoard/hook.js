import { useState, useEffect } from 'react';
import { getScores } from 'api/scores.js';

export default function useScoreBoard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    (async () => {
      setScores(await getScores());
    })();
  }, [])

  return {
    scores,
  }
}