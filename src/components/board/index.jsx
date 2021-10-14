import React, { useState, useEffect, useCallback } from 'react';
import { PHRASAL_VERBS } from 'consts';
import { transposeObject, shuffle } from 'utils';

const words = {
  ...PHRASAL_VERBS,
  ...transposeObject(PHRASAL_VERBS)
};

export default function Board() {
  const [board, setBoard] = useState();

  const createBoard = useCallback((rows, cols) => {
    let board = [];
    const wordList = [];
    Object.keys(words).forEach((w) => {
      wordList.push(w);
    });
    shuffle(wordList);
    for (let i = 0; i < rows; i++ ) {
      board[i] = [];
      for (let j = 0; j < cols; j++ ) {
        console.log(i,j)
        board[i][j] = {
          word: wordList[i*cols + j],
          hidden: true,
        };
      }
    }
    return board;
  }, []);

  useEffect(() => {
    setBoard(createBoard(2, 2));
  }, [createBoard]);

  return (
    <div>

    </div>
  );
}