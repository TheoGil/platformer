import {loadLevel} from './loaders.js';
import {loadCharactersSprites, loadBackgroundSprites} from './sprites.js';
import Compositor from './Compositor.js';
import {createBackgroundLayer} from './layers.js';


function createSpriteLayer (sprite, pos) {
	return function drawSpriteLayer(context) {
		for (var i = 0; i < 20; i++) {
			sprite.draw('idle', context, pos.x + i * 16, pos.y);
		}
	}
}

const canvas = document.getElementById('scene');
const context = canvas.getContext('2d');

Promise.all([
	loadCharactersSprites(),
	loadBackgroundSprites(),
	loadLevel('1.1')
]).then(([characterSprites, backgroundSprites, level]) => {
	const comp = new Compositor();

	const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites, context);
	comp.layers.push(backgroundLayer);

	const pos = {
		x: 0,
		y: 0
	}

	const spriteLayer = createSpriteLayer(characterSprites, pos);
	comp.layers.push(spriteLayer);

	function update () {
		comp.draw(context);
		
		pos.y += 2;
		pos.x += 2;
		requestAnimationFrame(update);
	}
	update();
});