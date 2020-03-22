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
function iniciar(callback,mostrar_error){
	var iniciado = false
	var intervalo = setInterval(function(){
		try{
			callback()
			iniciado = true
		}catch(e){
			if(mostrar_error){
				console.log(e)
			}		
		}
		if(iniciado){
			clearInterval(intervalo)
		}
	})
	return intervalo
}
iniciar(init)

