import React from 'react';

import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <Game randomNumCount={6} />
    );
  }
}

export default App;