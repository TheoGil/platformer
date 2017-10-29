/*
 * The timer class make sure that the timing of our game
 * is rock solid independently of the device it's running on.
 * Basicaly: by calculating difference between now and last call 
 * to the update method, we call it again or not depending on desired framerate.
 * Preventing things from moving too fast on higher framerate devices.
 */
export default class Timer {
	constructor (deltaTime = 1/60) {
		let accumulatedTime= 0;
		let lastTime  = 0;

		this.updateProxy = (time) => {
			accumulatedTime += (time - lastTime) / 1000;
			
			while (accumulatedTime > deltaTime){
				this.update(deltaTime);
				accumulatedTime -=deltaTime;
			}

			lastTime = time;

			this.enqueue();
		}
	}

	enqueue (){
		requestAnimationFrame(this.updateProxy);
	}

	start () {
		this.enqueue();
	}
}