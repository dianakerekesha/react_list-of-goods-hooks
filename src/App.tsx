import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortCase {
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}
interface SortOptions {
  sortCase: SortCase;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortCase, isReversed }: SortOptions,
): string[] {
  const preparedGoods = [...goods];

  if (sortCase === SortCase.Alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortCase === SortCase.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortCase, setSortCase] = useState<SortCase>(SortCase.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortCase,
    isReversed,
  });

  const sortByAlphabet = () => setSortCase(SortCase.Alphabet);
  const sortByLength = () => setSortCase(SortCase.Length);
  const toggleReverse = () => setIsReversed(prev => !prev);

  const reset = () => {
    setSortCase(SortCase.None);
    setIsReversed(false);
  };

  const isInitialOrder = sortCase === SortCase.None && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortCase === SortCase.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortCase === SortCase.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button onClick={reset} type="button" className="button is-danger">
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
