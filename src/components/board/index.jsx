import React, { useState, useEffect, useCallback, useReducer } from 'react';

import { createBoardAction, showCardAction, hideAllAction, removeCardAction } from 'actions';
import Cell from 'components/cell';
import { initialState, reducer }  from 'reducer';
import { sleep, getExposedCards } from 'utils';
import * as styles from './styles.module.css';

const cardFlipAudio = new Audio(`${process.env.PUBLIC_URL}/audios/card-flip.wav`);
const successAudio = new Audio(`${process.env.PUBLIC_URL}/audios/success.wav`);

export default function Board() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnClick = useCallback((index) => {
    if (state?.board[index]?.word) {
      if (state?.numExposedCards < 2) {
        cardFlipAudio.currentTime = 0;
        cardFlipAudio.play();
      }
      showCardAction(dispatch, state, index);
    }
  }, [state]);

  useEffect(() => {
    createBoardAction(dispatch);
  }, []);

  useEffect(() => {
    if (state?.numExposedCards === 2) {
      const exposedCards = getExposedCards(state.board);
      const indexCardA = state?.board.indexOf(exposedCards[0]);
      const indexCardB = state?.board.indexOf(exposedCards[1]);
      if (state?.board[indexCardA]?.word === state.words[state?.board[indexCardB]?.word]) {
        sleep(1000)
          .then(() => {
            successAudio.currentTime = 1;
            successAudio.play();
            removeCardAction(dispatch, indexCardA);
            removeCardAction(dispatch, indexCardB);
          })
      } else {
        sleep(1000)
          .then(() => {
            hideAllAction(dispatch);
          });
      }
    }
  }, [state]);
console.log(state.board)
  return (
    <div className={styles.root}>
      {
        state?.board?.map((item, i) => <Cell index={i} word={item.word} hidden={item.hidden} handleOnClick={handleOnClick} />)
      }
    </div>
  );
}