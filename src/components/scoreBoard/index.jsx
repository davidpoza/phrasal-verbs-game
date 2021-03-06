import React from 'react';
import useScoreBoard from './hook';
import * as styles from './styles.module.css';

export default function ScoreBoard({ handleToggleScoreBoard, selectedBoard }) {
  const { scores } = useScoreBoard(selectedBoard);
  return <div className={styles.root}>
    <div className={styles.content}>
      <h2>Ranking for "{selectedBoard}" level</h2>
      { scores.length === 0 && <div>loading...</div>}
      <ul className={styles.list}>
        {
          scores?.map((score, i) => {
            return <li key={i} className={styles.item}>
              <div>{score.user}</div>
              <strong>{score.score} seg.</strong>
            </li>
          })
        }
      </ul>
      <button className={styles.button} onClick={handleToggleScoreBoard}>Close</button>
    </div>
  </div>;
}