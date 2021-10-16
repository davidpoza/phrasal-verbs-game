import Board from 'components/board/index.jsx';
import Counter from 'components/counter/index.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Phrasal Verbs memory matching game</h1>
      <Board />
      <Counter />
    </div>
  );
}

export default App;
