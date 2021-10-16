import React from 'react';
import useCounter from './hook';
import * as styles from './styles.module.css';

export default function Counter() {
  const { counter } = useCounter();
  return <div className={styles.root}>
    {counter}
    </div>
}