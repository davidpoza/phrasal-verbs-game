import * as TYPES from 'actionsTypes';


export function createBoardAction(dispatch) {
  dispatch({ type: TYPES.FILL_BOARD });
}

export function removeCardAction(dispatch, index) {
  dispatch({ type: TYPES.REMOVE_CARD, index: index });
}

export function hideAllAction(dispatch) {
  dispatch({ type: TYPES.HIDE_ALL_CARDS });
}

export function showCardAction(dispatch, state, index) {
  if (state.numExposedCards < 2) {
    dispatch({ type: TYPES.SHOW_CARD, index });
  }
}

export function changeBoardAction(dispatch, board) {
  dispatch({ type: TYPES.CHANGE_BOARD, board });
}

export function setCounterAction(dispatch, value) {
  dispatch({ type: TYPES.SET_COUNTER, value });
}

export function setLastWordAction(dispatch, value) {
  dispatch({ type: TYPES.SET_LAST_WORD, value });
}