$(document).ready(function() {
	function createHero(direction = 'right') {
		let container = $("<div>").addClass(['hero', 'hero-js']);
		let hero = $("<img>");

		if (direction == 'right') {
			hero.attr('src', "./img/hero_small_right.png");
		}

		if (direction == 'left') {
			hero.attr('src', "./img/hero_small_left.png");
		}

		container.append(hero)

		return container;
	}

	function generateWorld() {
		let block = $("<div>").addClass("block block-js"); 
		let field = $("<div>").addClass("field"); 
		let bid = 1;

		for (let i = 0; i < 11; i++) {
			for (let j = 0; j < 11; j++) {
				if (i % 2 === 0) {
					$('.game-js').append(field.clone().attr('bid', bid));
				}
				else {
					if (j % 2 === 0) {
						$('.game-js').append(field.clone().attr('bid', bid));
					}
					else {
						$('.game-js').append(block.clone().attr('bid', bid));
					}
				}

				bid++;
			}
		}
	}

	let hid = Math.floor(Math.random() * 51);

	function spawn() {
		if (!$('[bid=' + hid + ']').hasClass('block-js')) {
			$('[bid=' + hid + ']').append(createHero());
		}
		else {
			hid = Math.floor(Math.random() * 51);
			spawn()
		}
	}

	function move(nhid, direction = 'right') {
		if (!$('[bid=' + nhid + ']').hasClass('block-js')) {
			hid = nhid;

			$('.hero-js').remove();
			$('[bid=' + hid + ']').append(createHero(direction));
		}
	}

	// Control buttons
	$(document).keydown(function(e) {
		if (e.which == 37) {
			console.log('Left arrow')
			move(hid -1, 'left');
		}

		if (e.which == 38) {
			console.log('Up arrow')
			move(hid -11);
		}

		if (e.which == 39) {
			console.log('Right arrow')
			move(hid +1);
		}

		if (e.which == 40) {
			console.log('Down arrow')
			move(hid +11, 'left');
		}
	});

	// Spawn Button
	$('#random').click(function() {
		spawn();
	});

	// Create the World
	generateWorld();
});