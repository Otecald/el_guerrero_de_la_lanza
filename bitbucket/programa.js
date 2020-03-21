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
			var y = url.split("/").slice(0,-1).concat("").join("/")
			var z = x.replace(/(href|src)(\s*=)(\s*["']?)(\S+)/g,'$1$2$3'+y+'$4')
			document.querySelector("html").innerHTML=z
		})
	)
}
function descargar_el_guerrero_de_la_lanza_desde_bitbucket(){
	return descargar_bitbucket("ArtEze","el_guerrero_de_la_lanza","index.html",insertar_html)
}
window.onload = descargar_el_guerrero_de_la_lanza_desde_bitbucket

