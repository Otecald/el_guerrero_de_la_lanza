function dibujar(){
	holamundo(lienzo,[color.value,bckgrnd.value,lienzo.width,texto.value])
}
function fC(){
	return document.getElementsByTagName("canvas")[0]
}
function init()
{
	// WorldTimer = null
	SpriteList = Array();
	Camera = {
		position: {
			x: 0,
			y: 0
		},
		width: fC().width,
		height: fC().height
	}
	createWorld(fC())
}
function iniciar(callback){
	if(!window.contador_listo){
		window.contador_listo = 0
	}
	if(!window.iniciado){
		window.iniciado = false
	}
	function función(callback){
		callback()
		window.iniciado = true
	}
	document.onreadystatechange = function(){
		if( window.contador_listo && !window.iniciado ){
			función(callback)
		}
		++window.contador_listo
	}
	var intentar_iniciar = setInterval(function(){
		if(!window.iniciado){
			función(callback)
			clearInterval(intentar_iniciar)
		}
		++window.contador_listo
	},5000)
}
iniciar(init)

