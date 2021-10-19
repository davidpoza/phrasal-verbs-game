import syncFetch from 'sync-fetch';
import { API_URL, APP_ID } from 'consts.js';

export async function getScores() {
  const response = await fetch(`${API_URL}/scores/${APP_ID}`);
  return await response.json();
}

export function createScore(username, gameId) {
  syncFetch(`${API_URL}/scores`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      appId: APP_ID,
      username: username,
      gameId: gameId,
    }),
  })
}