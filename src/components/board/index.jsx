import React, { useState, useEffect, useCallback } from 'react';
import { PHRASAL_VERBS } from 'consts';
import { transposeObject, shuffle } from 'utils';
import Cell from 'components/cell';
import * as styles from './styles.module.css';

const words = {
  ...PHRASAL_VERBS,
  ...transposeObject(PHRASAL_VERBS)
};

export default function Board() {
  const [size, setSize] = useState({
    rows: 2,
    cols: 2,
  });
  const [board, setBoard] = useState();

  const createBoard = useCallback(() => {
    let board = [];
    const wordList = [];
    Object.keys(words).forEach((w) => {
      wordList.push(w);
    });
    shuffle(wordList);
    return wordList.map((w) => {
      return {
        word: w,
        hidden: false,
      };
    })
  }, []);

  useEffect(() => {
    setBoard(createBoard(2, 2));
  }, [createBoard]);

  return (
    <div className={styles.root}>
      {
        board?.map((item, i) => <Cell word={item.word} hidden={item.hidden} />)
      }
    </div>
  );
}