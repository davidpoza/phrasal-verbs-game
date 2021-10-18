import { useEffect, useCallback, useReducer }from 'react';
import { initialState, reducer }  from 'reducer';
import { usePrompt } from 'hooks';
import {
  createBoardAction,
  showCardAction,
  hideAllAction,
  removeCardAction,
  changeBoardAction,
  setCounterAction,
  setLastWordAction,
  setUsernameAction,
  toggleScoreBoardAction,
} from 'actions';
import { sleep, getExposedCards } from 'utils';


const cardFlipAudio = new Audio(`${process.env.PUBLIC_URL}/audios/card-flip.wav`);
const successAudio = new Audio(`${process.env.PUBLIC_URL}/audios/success.wav`);

export function useBoard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const username = usePrompt();

  useEffect(() => {
    createBoardAction(dispatch);
    setUsernameAction(dispatch, username);
  }, []);

  const handleOnClick = useCallback((index) => {
    if (state?.board[index]?.word) {
      if (state?.numExposedCards < 2) {
        cardFlipAudio.currentTime = 0;
        cardFlipAudio.play();
      }
      setLastWordAction(dispatch, state?.board[index]?.word);
      showCardAction(dispatch, state, index);
    }
  }, [state]);

  const handleChangeBoard = useCallback((event) => {
    changeBoardAction(dispatch, event.target.value);
    setCounterAction(dispatch, 0);
  }, [state]);

  const handleToggleScoreBoard = useCallback(() => {
    toggleScoreBoardAction(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounterAction(dispatch, state.counter + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.counter])

  useEffect(() => {
    if (state?.numExposedCards === 2) {
      if (state?.lastWord) setLastWordAction(dispatch, '');
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
    handleOnClick,
    handleChangeBoard,
    handleToggleScoreBoard
  };
}