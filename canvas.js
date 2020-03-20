// El timer se encarga de la sincronización entre drawWorld y updateWorld
var WorldTimer = false
var WorldSpeed = 30 // valor inicial, en frames por segundo

function increaseSpeed ()
{
	// Si game timer no está creado todavía, no hacemos nada
	if (!WorldTimer) return
	
	// Creamos un timer con un FPS de +5 con respecto al anterior timer
	// Podríamos simplemente actualizar el anterior pero... nah...
	if (WorldSpeed < 100) WorldSpeed += 5
	var old = WorldTimer
	var current = newGameTimer(WorldSpeed)
	current.tick = old.tick
	current.draw = old.draw
	old.quit = true
	WorldTimer = current
	
	// No me acuerdo si innerHTML anda en IE
	VelActualP.innerHTML = "Velocidad actual " + WorldSpeed + " cuadros por segundo"
	if (WorldSpeed == 30) VelActualP.innerHTML += " (base)"
	if (WorldSpeed == 100) VelActualP.innerHTML += " (máximo)"
	
	WorldTimer.run()
}

function drawWorld(a)
{
	if(a==""||a==undefined){a=lienzo}
	var context=a.getContext("2d")
	context.fillStyle="000"
	context.fillRect(0, 0, Camera.width, Camera.height)
	for (var i=0;i<SpriteList.length;i++)
	{
		var spr=SpriteList[i]
		context.drawImage(spr.img,spr.position.x,spr.position.y)
	}
}

function deleteWorld()
{
	SpriteList="";Camera=""
	WorldTimer.quit = true // Sin esto se sigue ejecutando aunque después lo pongamos a null
	WorldTimer = null
	WorldSpeed = 30
}

function createWorld(a)
{
	SpriteList=[]
	Camera = {
		position:{x:0,y:0},
		width:a.width,height: a.height
	}
	initGame()
	
}

function updateWorld()
{
	for (var i = 0; i < SpriteList.length; ++i)
	{
		SpriteList[i].nextStep(1/30)
		if (SpriteList[i].track.length == 0) SpriteList[i].track.push({x: Math.random() * (Camera.width - 32), y: Math.random() * (Camera.height - 32), z: 0})
	}
	
	//drawWorld() Esto ya no debe ir más aquí
}

function newSprite()
{
	var spr = {
		position: {
			x: 0,
			y: 0,
			z: 0
		},
		width: 0,
		height: 0,
		img: false,
		speed: 60, // pixeles por segundo
		track: Array(),
		nextStep: function (tpf /*tpf es tiempo desde el cuadro anterior en segundos, time [since] previous frame*/) 
		{
			// requiere las funciones del archivo vector.js para funcionar correctamente
			if (this.track.lenght == 0) return
			
			// next_move es la posición objetivo menos la posición actual normalizado para que sea un vector de longitud 1
			if (this.track[0] == undefined) return
			var track = this.track[0]
			var next_move = v_norm(v_sub([track.x, track.y, track.z], [this.position.x, this.position.y, this.position.z]))
			next_move = v_scalar_mul(next_move, this.speed * tpf) // ajustado según velocidad del sprite y tiempo desde el cuadro anterior
			this.position.x += next_move[0]
			this.position.y += next_move[1]
			this.position.z += next_move[2]
			
			if (v_eq([this.position.x, this.position.y, this.position.z], [this.track[0].x, this.track[0].y, this.track[0].z], this.speed * tpf))
			{
				this.position = this.track[0]
				this.track.splice(0, 1)
			}
		}
	};
	
	return spr;
}

function initGame()
{
	var spr = newSprite()
	
	spr.img = new Image()
	try{spr.img.src = "https://dl.dropboxusercontent.com/u/3906848/Proyecto%20matiz/sprite.png"}catch(e){spr.img.src="sprite.png"}
	
	spr.width = 32
	spr.height = 32
	spr.track.push({x: 300 - 32, y: 300 - 32, z: 0})
	spr.track.push({x: 300 - 32, y: 0, z: 0})
	spr.track.push({x: 0, y: 0, z: 0})
	SpriteList.push(spr)
	
	var colores_disponibles = Array()
	colores_disponibles.push("sprite_red.png")
	colores_disponibles.push("sprite_green.png")
	for (var c in colores_disponibles)
		for (var i = 0; i < 3; ++i)
		{
			var spr = newSprite()
			spr.img = new Image()
			spr.img.src = colores_disponibles[c]
			spr.width = 32
			spr.height = 32
			SpriteList.push(spr)
		}
	
	VelActualP.innerHTML = "Velocidad actual " + WorldSpeed + " cuadros por segundo"
	if (WorldSpeed == 30) VelActualP.innerHTML += " (base)"
	WorldTimer = newGameTimer(WorldSpeed)
	WorldTimer.tick = updateWorld
	WorldTimer.draw = drawWorld
	WorldTimer.run()
}
window.onload = initGame
