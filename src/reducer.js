import * as TYPES from 'actionsTypes';
import { PHRASAL_VERBS } from 'consts';
import { createBoard, transposeObject } from 'utils';

export const initialState = {
  words: {
    ...PHRASAL_VERBS,
    ...transposeObject(PHRASAL_VERBS)
  },
  numExposedCards: 0,
  board: [],
};

export function reducer(state, action) {
  const newBoard = [ ...state.board ];
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
    default:
      return state;
  }
}