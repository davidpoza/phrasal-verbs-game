import { useState, useEffect, useCallback, useReducer }from 'react';
import { initialState, reducer }  from 'reducer';
import { createBoardAction, showCardAction, hideAllAction, removeCardAction } from 'actions';
import { sleep, getExposedCards } from 'utils';


const cardFlipAudio = new Audio(`${process.env.PUBLIC_URL}/audios/card-flip.wav`);
const successAudio = new Audio(`${process.env.PUBLIC_URL}/audios/success.wav`);

export function useBoard() {

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    createBoardAction(dispatch);
  }, []);

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

  return {
    state,
    handleOnClick
  };
}