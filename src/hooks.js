import { useState, useEffect } from 'react';
import { APP_ID } from 'consts';

export function usePrompt() {
  const [username, setUsername] = useState('anonymous');
  useEffect(() => {
    let readValue;
    const prevLStorage = JSON.parse(localStorage.getItem(APP_ID)) || {};
    if (!prevLStorage.username) {
      readValue = window.prompt('Please enter your name');
    }

    if (readValue) {
      setUsername(readValue);
      localStorage.setItem(APP_ID, JSON.stringify({ username: readValue }));
    } else {
      setUsername(prevLStorage.username);
    }
  }, []);

  return username;
}