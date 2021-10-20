import { useState, useEffect } from 'react';
import { getScores } from 'api/scores.js';

export default function useScoreBoard(selectedBoard) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    (async () => {
      setScores(await getScores(selectedBoard));
    })();
  }, [selectedBoard])

  return {
    scores,
  }
}