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
	document.onreadystatechange = function(){
		if(!window.contador_listo){
			window.contador_listo = 0
		}else{
			callback()
		}
		++window.contador_listo
	}
}
iniciar(init)

