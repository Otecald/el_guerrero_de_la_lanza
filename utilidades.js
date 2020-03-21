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
window.onload = init

