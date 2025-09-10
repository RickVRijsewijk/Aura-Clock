
import { useState, useEffect } from 'react';

export const useTime = (refreshCycle = 1000) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, refreshCycle);

    return () => clearInterval(intervalId);
  }, [refreshCycle]);

  return time;
};
