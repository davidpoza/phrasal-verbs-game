import React from 'react';
import { formatSeconds } from 'utils';
import * as styles from './styles.module.css';

export default function Counter({ counter }) {
  return <div className={styles.root}>
    { formatSeconds(counter) }
    </div>
}