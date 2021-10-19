import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.module.css';
import { CARD_STATE } from 'consts';

/**
 *
 * @param {*} param0
 * @returns
 */
export default function Cell({ index, word, state = CARD_STATE.FACE_DOWN, handleOnClick }) {
  let className = styles.facedown;
  if (state === CARD_STATE.FACE_UP) {
    className = styles.faceup;
  } else if (state === CARD_STATE.SOLVED) {
    className = styles.solved;
  }
  return <div className={className} onClick={() => {handleOnClick(index); }}>
    <div className={styles.text}>{state === CARD_STATE.FACE_UP && word}</div>
  </div>
}

Cell.propTypes = {
  word: PropTypes.string,
  hidden: PropTypes.bool,
};
