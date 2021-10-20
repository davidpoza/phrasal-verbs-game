import React from 'react';
import Cell from 'components/cell';
import Selector from 'components/selector/index.jsx';
import Counter from 'components/counter/index.jsx';
import Example from 'components/example/index.jsx';
import ScoreBoard from 'components/scoreBoard';
import { CARD_STATE, EXAMPLE_SENTENCES } from 'consts';
import * as styles from './styles.module.css';
import { useBoard } from './hook';
import ScoreButton from 'components/scoreButton';

export default function Board() {
  const { state, handleOnClick, handleChangeBoard, handleToggleScoreBoard } = useBoard();

  return (
    <div>
      { state.showScoreBoard && <ScoreBoard handleToggleScoreBoard={handleToggleScoreBoard} selectedBoard={state.selectedBoard} /> }
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
      <Example sentence={EXAMPLE_SENTENCES[state?.lastWord]} />
      <Counter counter={state.counter} />
      <ScoreButton handleToggleScoreBoard={handleToggleScoreBoard} />
    </div>
  );
}