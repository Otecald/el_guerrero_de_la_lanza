/*
Copyright (2012-2013) JH <jhasoft64@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

function GameTimer () {}
GameTimer.prototype.currentTime = 0; // milliseconds
GameTimer.prototype.t = 0; // milliseconds
GameTimer.prototype.dt = 1000/60; // milliseconds
GameTimer.prototype.accumulator = 0; // milliseconds
GameTimer.prototype.milliseconds = 0; // when this is equal or greater than 1000 updates currentFPS and fires an onsecond event
GameTimer.prototype.currentFPS = 0; // last second FPS mark
GameTimer.prototype.frameCounter = 0; // increases 1 per call to tick
GameTimer.prototype.onsecond = null;
GameTimer.prototype.tick = null; // one game tick
GameTimer.prototype.draw = null; // draw graphics
GameTimer.prototype.quit = false;

GameTimer.prototype.run = function () {
	var newTime = new Date().getTime();
	var frameTime = newTime - this.currentTime;
	this.milliseconds += frameTime;
	if (frameTime > 250) frameTime = 250;
	this.currentTime = newTime;
	
	this.accumulator += frameTime;
	
	while (this.accumulator >= this.dt) {
		this.tick();
		this.frameCounter++;
		this.t += this.dt;
		this.accumulator -= this.dt;
	}
	
	// It will lag if your computer cannot stand the game.
	// This is on purpose, calls to onsecond won't be exactly one second delayed.
	if (this.milliseconds >= 1000) {
		this.currentFPS = this.frameCounter;
		this.frameCounter = 0;
		this.milliseconds = this.milliseconds - Math.floor(this.milliseconds / 1000) * 1000;
		if (this.onsecond != null) this.onsecond(this);
	}

	this.draw();

	var self = this;
	if (!this.quit) requestAnimFrame(function () {self.run();});
	//if (!quit) setTimeout(function () {self.run();});
}

function newGameTimer (desiredFrameRate) {
	var timer = new GameTimer();
	timer.dt = 1000/desiredFrameRate;
	timer.currentTime = new Date().getTime();
	return timer;
}

if (requestAnimFrame == undefined) {
	throw "GameTimer: requestAnimFrame is not defined!";
}
