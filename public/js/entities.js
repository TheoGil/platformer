import Entity from './entity.js';
import {loadCharactersSprites} from './sprites.js';

export function createMario () {
	return loadCharactersSprites()
	.then(sprite => {
		const mario = new Entity();

		mario.draw = function drawMario(context){
			sprite.draw('idle', context, this.pos.x, this.pos.y);
		}

		mario.update = function updateMario(deltaTime){
			this.pos.y += this.vel.y * deltaTime;
			this.pos.x += this.vel.x * deltaTime;
		}

		return mario;
	});
}