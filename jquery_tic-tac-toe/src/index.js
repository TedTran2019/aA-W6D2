const View = require('./ttt-view.js');
const Game = require('./game.js');

  $(() => {
    const g = new Game();
    const ttt = $('.ttt');
    const view = new View(g, ttt);
  });
