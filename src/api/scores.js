import { API_URL, APP_ID } from 'consts.js';


export async function getScores() {
  const response = await fetch(`${API_URL}/scores/${APP_ID}`);
  return await response.json();
}

export async function createScore(username, gameId) {
  await fetch(`${API_URL}/scores`, {
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