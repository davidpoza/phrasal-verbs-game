import { API_URL, APP_ID } from 'consts.js';

export function getSession() {

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