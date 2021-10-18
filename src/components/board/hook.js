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
  setEndGameAction,
  setNumExposedCardsAction,
} from 'actions';
import { sleep, getExposedCards, isEndGame } from 'utils.js';
import { createSession } from 'api/sessions.js';
import { createScore } from 'api/scores.js';


const cardFlipAudio = new Audio(`${process.env.PUBLIC_URL}/audios/card-flip.wav`);
const successAudio = new Audio(`${process.env.PUBLIC_URL}/audios/success.wav`);

export function useBoard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const username = usePrompt();

  useEffect(() => {
    createBoardAction(dispatch);
    setUsernameAction(dispatch, username);
  }, [username]);

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
  }, [dispatch]);

  const handleToggleScoreBoard = useCallback(() => {
    toggleScoreBoardAction(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounterAction(dispatch, state.counter + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.counter])


  // create a new game session
  useEffect(() => {
    if (state.username && state.gameId) {
      console.log('starting session....');
      (async () => {
        try {
          await createSession(state.username, state.gameId);
        } catch(error) {
          console.log('error during session creation', error);
        }
      })();
    }
  }, [state.gameId, state.username]);

  // check is a cards pair are a success. if so we removen them from board
  useEffect(() => {
    if (state?.numExposedCards === 2) {
      setNumExposedCardsAction(dispatch, 0);
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

  // check if board is completed to set endGame flag
  useEffect(() => {
    if (isEndGame(state.board) && state.counter !== 0 && !state.endGame) {
      console.log("FIN DE JUEGO")
      setEndGameAction(dispatch);
    }
  }, [state.board, state.counter])

  // creates a new game when current one ends
  useEffect(() => {
    if(state.endGame) {
      createBoardAction(dispatch);
      (async () => {
        try {
          await createScore(state.username, state.gameId);
          await createSession(state.username, state.gameId);
        } catch(error) {
          console.log('error during session creation', error);
        }
      })()
    }
  }, [state.endGame, state.username, state.gameId])

console.log(state)
  return {
    state,
    handleOnClick,
    handleChangeBoard,
    handleToggleScoreBoard
  };
}