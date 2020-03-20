function descargar_bitbucket(usuario,proyecto,ruta,callback){
	var url_api = "https://api.bitbucket.org/2.0/repositories/"
	return (fetch(url_api+usuario+"/"+proyecto+"/src/")
		.then(x=>x.json())
		.then(x=>{
			var regex=new RegExp("/"+ruta+"$","")
			var url = (x.values
				.map(x=>x.links.self.href)
				.filter(x=>x.match(regex))[0]
			)
			return callback(url)
		})
	)
}
function insertar_html(url){
	var descarga = (fetch(url)
		.then(x=>x.text())
		.then(x=>{
			document.querySelector("html").innerHTML=x
		})
	)
}
function descargar_el_guerrero_de_la_lanza_desde_bitbucket(){
	descargar_bitbucket("ArtEze","proyecto_matiz","index.html",insertar_html)
}
document.onload = descargar_el_guerrero_de_la_lanza_desde_bitbucket
