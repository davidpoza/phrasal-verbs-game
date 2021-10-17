import * as TYPES from 'actionsTypes';
import { PHRASAL_VERBS } from 'consts';
import { createBoard, transposeObject } from 'utils';

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
};

export function reducer(state, action) {
  const newBoard = [ ...state.board ];
  let newWords = [];
  switch(action.type) {
    case TYPES.FILL_BOARD:
      return ({ ...state, board: createBoard(state.words) });
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
    default:
      return state;
  }
}