import React from 'react';
import * as styles from './styles.module.css';

export default function Example({ sentence }) {
  return <div className={styles.root}>
    {sentence}
  </div>
}