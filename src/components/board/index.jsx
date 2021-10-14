import React from 'react';
import { PHRASAL_VERBS } from 'consts';
import { transposeObject } from 'utils';

export default function Board() {
  const words = {
    ...PHRASAL_VERBS,
    ...transposeObject(PHRASAL_VERBS)
  };
  console.log(words);
  function fillBoard(unsortedList = [], rows, cols) {

  }
  return (
    <div></div>
  );
}