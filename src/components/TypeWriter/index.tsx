import { useState, useEffect } from 'react';
import './styles.css';

interface Props {
  departureStation: string;
}

const TypeWriter = ({ departureStation }: Props) => {
  const [text, setText] = useState('');
  const elipsis = ' is in...';

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(elipsis.slice(0, text.length + 1));
      if (text === elipsis) {
        sleep(1000).then(() => {
          setText('');
        });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <h1>
      The next tram from{' '}
      <span className='text-gradient station-name'>{departureStation}</span>
      {text || elipsis}
    </h1>
  );
};

export default TypeWriter;
