import { useEffect, useState } from 'react';
import './styles.css';

interface Props {
  options: [string, string][];
}

export const Autocomplete = ({ options }: Props) => {
  const [showList, setShowList] = useState(false);

  const clickHandler = (value: string, key: string) => {
    const userFacingInput = document.getElementById(
      'departingFrom-copy'
    ) as HTMLInputElement;
    const hiddenInput = document.getElementById(
      'departingFrom'
    ) as HTMLInputElement;
    const searchForm = document.getElementById('searchForm') as HTMLFormElement;

    userFacingInput.value = value;
    hiddenInput.value = key;
    searchForm?.submit();

    setShowList(false);
  };

  useEffect(() => {
    if (options.length > 0) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [options]);

  return (
    <div className={`autocomplete-list ${!showList ? 'hide' : ''}`}>
      {options.map((item: string[], i: number) => {
        const key = item[0];
        const value = item[1];
        return (
          <span
            className='autocomplete-list--item'
            key={i}
            onClick={() => clickHandler(value, key)}
          >
            {value}
          </span>
        );
      })}
    </div>
  );
};
