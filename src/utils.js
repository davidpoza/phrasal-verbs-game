export function transposeObject(obj) {
  const transposed = {};
  Object.keys(obj).forEach((k) => {
    transposed[obj[k]] = k;
  });
  return transposed;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function createBoard(words) {
  const wordList = [];
  Object.keys(words).forEach((w) => {
    wordList.push(w);
  });
  shuffle(wordList);
  return wordList.map((w) => {
    return {
      word: w,
      hidden: true,
    };
  });
}

export function getExposedCards(board) {
  return board?.filter((c) => !c.hidden);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatSeconds(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}