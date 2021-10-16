import { useState, useEffect } from 'react';
import { formatSeconds } from 'utils';

export default function useCounter() {
  const [counter, setCounter] = useState(0); // seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter])

  return {
    counter: formatSeconds(counter),
  }
}