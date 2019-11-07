class View {
	constructor(game, $el) {
		this.game = game;
		this.hanoi = $el;
		this.setupTowers();
		this.clickTower();
	}

	setupTowers() {
		for (let i = 0; i < 3; i++) {
			const ul = $('<ul>').addClass(`tower${i} tower`).data('nbr', i);
			this.hanoi.append(ul);
		}
		$('.tower').addClass('hover-tower');
	/*
		for (let i = 1; i < 4; i++) {
			let width = 60 * i;
			let li = $('<li>').css('width', `${width}`);
			$('.tower0').append(li);
		}
	*/
	}

	render(won) {
		$('li').remove();
		this.game.towers.forEach((tower, index) => {
			tower.forEach(disc => {
				let li = $('<li>').css('width', `${disc * 60}`);
				$(`.tower${index}`).prepend(li);
			});
		});
		if (won) {
			$('li').css('background-color', 'green');
		}
	}

	clickTower() {
		let startIdx;
		let endIdx;
		$('.hanoi').on('click', '.tower', event => {
			$('li').addClass('winner');
			let tower = $(event.currentTarget);
			if (Number.isInteger(startIdx)) {
				endIdx = tower.data('nbr');

				const playMove = () => {
					if (!this.game.move(startIdx, endIdx)) {
						alert('Invalid move!');
					}
					startIdx = null;
					endIdx = null;
					$('.tower').removeClass('chosen');

					if (this.game.isWon()) {
						alert("Good work, you're awesome!");
						$('.tower').removeClass('hover-tower');
						$('.hanoi').off();
						this.render(true);
					} else {
						this.render(false);
					}
				};

				playMove();
			} else {
				startIdx = tower.data('nbr');
				tower.toggleClass('chosen');
			}
		});
		this.render();
	}
}

module.exports = View;
