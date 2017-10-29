export default class Spritesheet {
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
	define (name, srcX, srcY, width, height) {
		const buffer = document.createElement('canvas');
		buffer.width = this.tileWidth;
		buffer.height = this.tileHeight;
		buffer
			.getContext('2d')
			.drawImage(
				this.image,
				srcX,
				srcY,
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
	 * Wrapper for define method.
	 * Use this to define 1*1 tiles
	 */
	defineTile (name, x, y) {
		this.define(name, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
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

	/*
	 * Wrapper for the draw method.
	 * Use this to render 1*1 tiles
	 */
	drawTile(name, context, x, y) {
		this.draw(name, context, x * this.tileWidth, y * this.tileHeight);
	}
}