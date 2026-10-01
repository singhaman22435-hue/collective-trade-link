import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numberValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const nonNumberStr = value.replace(/[0-9]/g, ''); // in case suffix is passed within value directly, but we'll use props ideally

  useEffect(() => {
    let start = 0;
    const end = numberValue;
    if (start === end || !inView) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numberValue, duration, inView]);

  return (
    <span ref={ref}>
      {count}
      {suffix || nonNumberStr}
    </span>
  );
};

export default AnimatedCounter;
