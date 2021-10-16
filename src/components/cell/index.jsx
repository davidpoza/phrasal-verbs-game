import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.module.css';

export default function Cell({ index, word, hidden, handleOnClick }) {
  return <div className={!word ? styles.solved : styles.root} onClick={() => {handleOnClick(index); }}>
    {!hidden && word}
  </div>
}

Cell.propTypes = {
  word: PropTypes.string,
  hidden: PropTypes.bool,
};
