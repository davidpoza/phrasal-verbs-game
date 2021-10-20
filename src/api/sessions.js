import { API_URL, APP_ID } from 'consts.js';

export async function getSession(username) {
  const res = await fetch(`${API_URL}/sessions?appId=${APP_ID}&username=${username}`);
  return await res.json();
}

export async function createSession(username, gameId) {
  await fetch(`${API_URL}/sessions`, {
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