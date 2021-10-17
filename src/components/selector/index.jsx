import React from 'react';
import { BOARDS_LIST } from 'consts';
import * as styles from './styles.module.css';

export default function BoardSelector({ handleChangeBoard }) {
  return <div className={styles.wrapper}>
    <select className={styles.root} onChange={handleChangeBoard}>
      {
        Object.keys(BOARDS_LIST).map((key) => {
          return <option key={`option_${key}`} value={key}>{BOARDS_LIST[key]}</option>
        })
      }
    </select>
  </div>
}