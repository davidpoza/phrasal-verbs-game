import React from 'react';
import * as styles from './styles.module.css';

export default function ScoreButton({ handleToggleScoreBoard }) {
  return <img
    onClick={handleToggleScoreBoard}
    title="See scoreboard"
    src={`${process.env.PUBLIC_URL}/cup.png`}
    alt="See scoreboard"
    className={styles.root} />
}