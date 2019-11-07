class View {
  constructor(game, $el) {
    this.game = game;
    this.ttt = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.ttt.on('click', '.row li', (event) => {
      this.makeMove($(event.currentTarget));
      this._gameOver();
    });
  }

  makeMove($square) {
    let pos = $square.data('pos');
    try {
      let mark = this.game.currentPlayer;
      this.game.playMove(pos);
      $square.text(mark);
      $square.css('background-color', 'white');
    }
    catch (err) {
      alert('Invalid move!');
    }
  }

  setupBoard() {
    for (let i = 0; i < 3; i++) {
      this.ttt.append($('<ul>').addClass('row'));
    }
    $('.row').each(function (y, row) {
      for (let x = 0; x < 3; x++) {
        $(row).append($('<li>').addClass('hover').data('pos', [x, y]));
      }
    });
  }

  _gameOver() {
    if (this.game.isOver()) {
      this.ttt.off();
      $('.row li').removeClass('hover');
      let winner = this.game.winner();
      let text = $('<span>')

      $('.row li').css('color', 'red');
      $(`.row li:contains(${winner})`)
      .css('color', 'white')
      .css('background-color', 'green');

      if (winner) {
        text.text(`You win, ${winner}!`);
      } else {
        text.text("It's a draw!");
      }
      $('body').append(text);
    }
  }
}

module.exports = View;
