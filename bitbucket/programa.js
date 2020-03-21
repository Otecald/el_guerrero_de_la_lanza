function descargar(url,es_json,callback){
	var tipo = es_json?"json":"text"
	return fetch(url).then(x=>x[tipo]()).then(callback)
}
function descargar_bitbucket(usuario,proyecto,ruta,callback){
	var url_api = "https://api.bitbucket.org/2.0/repositories/"
	var url = url_api+usuario+"/"+proyecto+"/src/"
	return descargar(url,true,x=>{
		var regex = new RegExp("/"+ruta+"$","")
		var url_archivo = (x.values
			.map(x=>x.links.self.href)
			.filter(x=>x.match(regex))[0]
		)
		return callback(url_archivo)
	})
}
function procesar_texto(texto,url){
	var regex = new RegExp("https://dl.dropboxusercontent.com/u/3906848/Proyecto%20matiz/","g")
	var regex_2 = new RegExp("(img.src = )([\"\']?)(.*)([\"\']?)","g")
	return (texto
		.replace(regex,"")
		.replace(regex_2,'$1'+'"' + url + '" + '+'$2$3$4')
	)
}
function descargar_scripts(lista,callback){
	var existentes = (
		Array.from(
			new Set(
				Array.from(document.querySelectorAll("script"))
			)
		)
		.concat()
	)
	var descargas = lista.map(x=>{
		descargar( x, false, y=>callback(y,x) )
	})
	var locales = existentes.filter(x=>!x.src).map(x=>{
		var texto = x.innerHTML
		callback(texto)
	})
	return locales
}
function insertar_html(url){
	return descargar(url,false,x=>{
		var url_proyecto_bitbucket = url.split("/").slice(0,-1).concat("").join("/")
		var scripts = x.match(/src=".+"/g).map(x=>url_proyecto_bitbucket+x.split("=")[1].slice(1,-1))
		var texto_modificado = (x
			.replace(/(href)(\s*=)(\s*["']?)(\S+)/g,'$1$2$3'+url_proyecto_bitbucket+'$4')
			.replace(/<script.*>.*<\/script>\s*/g,"")
		)
		document.querySelector("html").innerHTML=texto_modificado
		function modificar_e_insertar_script(x,ruta){
			var script = document.createElement("script")
			script.innerHTML = procesar_texto(x,url_proyecto_bitbucket)
			if(ruta){
				script.setAttribute("href",ruta)
			}
			document.head.appendChild(script)
		}
		var descargas = descargar_scripts(scripts,modificar_e_insertar_script)
	})
}
function descargar_el_guerrero_de_la_lanza_desde_bitbucket(){
	return descargar_bitbucket("ArtEze","el_guerrero_de_la_lanza","index.html",insertar_html)
}
window.onload = descargar_el_guerrero_de_la_lanza_desde_bitbucket

