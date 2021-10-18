import * as TYPES from 'actionsTypes';
import { PHRASAL_VERBS } from 'consts';
import { createBoard, transposeObject, randomString } from 'utils';

const initialBoard = 'education';
export const initialState = {
  words: {
    ...PHRASAL_VERBS[initialBoard],
    ...transposeObject(PHRASAL_VERBS[initialBoard])
  },
  numExposedCards: 0,
  board: [],
  selectedBoard: initialBoard,
  counter: 0,
  lastWord: '',
  username: 'anonymous',
  showScoreBoard: false,
  gameId: '',
  endGame: false,
};

export function reducer(state, action) {
  const newBoard = [ ...state.board ];
  let newWords = [];
  switch(action.type) {
    case TYPES.START_GAME:
      return ({ ...state, board: createBoard(state.words), gameId: randomString(), endGame: false, lastWord: '', counter: 0, numExposedCards: 0  });
    case TYPES.HIDE_ALL_CARDS:
      return ({ ...state, numExposedCards: 0, board: state?.board?.map((c) => ({ ...c, hidden: true })) });
    case TYPES.SHOW_CARD:
      const inc = newBoard[action.index].hidden ? 1 : 0;
      newBoard[action.index] = {
        ...newBoard[action.index],
        hidden: false,
      };
      return ({ ...state, board: newBoard, numExposedCards: state.numExposedCards + inc });
    case TYPES.REMOVE_CARD:
      newBoard[action.index].word = '';
      newBoard[action.index].hidden = true;
      return ({ ...state, board: newBoard });
    case TYPES.CHANGE_BOARD:
      newWords = {
        ...PHRASAL_VERBS[action.board],
        ...transposeObject(PHRASAL_VERBS[action.board])
      };
      return ({ ...state, board: createBoard(newWords), words: newWords, selectedBoard: action.board });
    case TYPES.SET_COUNTER:
      return ({ ...state, counter: action.value });
    case TYPES.SET_LAST_WORD:
      return ({ ...state, lastWord: action.value });
    case TYPES.SET_USERNAME:
      return ({ ...state, username: action.value });
    case TYPES.TOGGLE_SCORE_BOARD:
      return ({ ...state, showScoreBoard: !state.showScoreBoard });
    case TYPES.SET_END_GAME:
      return ({ ...state, endGame: true });
    case TYPES.SET_NUM_EXPOSED_CARDS:
      return ({ ...state, numExposedCards: action.value });
    default:
      return state;
  }
}