import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.module.css';

export default function Cell({ word, hidden }) {
  return <div className={styles.root}>
    {word}
  </div>
}

Cell.propTypes = {
  word: PropTypes.string,
  hidden: PropTypes.bool,
};
