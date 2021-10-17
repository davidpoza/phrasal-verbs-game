import React from 'react';
import Cell from 'components/cell';
import Selector from 'components/selector/index.jsx';
import Counter from 'components/counter/index.jsx';
import { CARD_STATE } from 'consts';
import * as styles from './styles.module.css';
import { useBoard } from './hook';

export default function Board() {
  const { state, handleOnClick, handleChangeBoard } = useBoard();

  return (
    <div>
      <Selector handleChangeBoard={handleChangeBoard} />
      <div className={styles.root}>
        {
          state?.board?.map((item, i) => {
            let state = CARD_STATE.FACE_DOWN;
            if (!item.hidden) state = CARD_STATE.FACE_UP;
            else if (!item.word) state = CARD_STATE.SOLVED;

            return <Cell
              key={`card${i}`}
              index={i}
              word={item.word}
              state={state}
              handleOnClick={handleOnClick}
            />
          })
        }
      </div>
      <Counter counter={state.counter} />
    </div>
  );
}