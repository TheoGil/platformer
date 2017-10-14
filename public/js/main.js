function loadimage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load',() => {
            resolve(image);
        });
        image.src = url;
    });
}

class Spritesheet {
	constructor (image, tileWidth, tileHeight) {
		this.image = image;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tiles = new Map();
	}

	/*
	 * Create a new canvas and draw specified tile on it.
	 * This canvas will be used as a buffer to avoid pulling
	 * tile from sprisheet every time we have to draw it 
	 */
	define (name, srcX, srcY) {
		const buffer = document.createElement('canvas');
		buffer.width = this.tileWidth;
		buffer.height = this.tileHeight;
		buffer
			.getContext('2d')
			.drawImage(
				this.image,
				srcY * this.tileWidth,
				srcX * this.tileHeight,
				this.tileWidth,
				this.tileHeight,
				0,
				0,
				this.tileWidth,
				this.tileHeight
			);
		this.tiles.set(name, buffer);
	}

	/*
	 * Pull "name" tile from buffer and draw it
	 * in "context" at given position
	 */
	draw (name, context, x, y) {
		if (!this.tiles.has(name)) {
			console.warn('Tried to draw undefined tile: '+name);
		} else {
			const buffer = this.tiles.get(name);
			context.drawImage(buffer, x, y);
		}
	}
}

const canvas = document.getElementById('scene');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

loadimage('/img/tiles.png')
	.then(image => {
		const sprites = new Spritesheet(image, 16, 16);
		sprites.define('ground', 0, 0);
		sprites.draw('ground', context, 100, 100);
	});