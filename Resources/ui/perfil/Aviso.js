function Aviso(id){
	var imagenAviso="";
	var separadorImg="";
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;
	if (osname === 'iphone' || osname === 'ipad') {
		separadorImg='';
	}
	else if (osname === 'mobileweb'){
		separadorImg='';
	}
	else {
		separadorImg='/';
	}
	if (id==2)
		imagenAviso=separadorImg+'ui/img/android/aviso_Con_antojo.jpg';
	if (id==3)
		imagenAviso=separadorImg+'ui/img/android/aviso_Estaciones.jpg';
	if (id==4)
		imagenAviso=separadorImg+'ui/img/android/aviso_magazine.jpg';
	if (id==5)
		imagenAviso=separadorImg+'ui/img/android/aviso_promociones.jpg';
	//alert(imagenAviso)
	var win = Titanium.UI.createWindow({
  		exitOnClose: false,
  		theme: "Theme.NoActionBar",
  		fullscreen: false,
  		modal: true,
  		backgroundColor:'#fff',
  		navBarHidden: true,
  		statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
  		title: 'Aviso'
	});
	var imagen= Titanium.UI.createImageView({
		image:imagenAviso,
		height:'90%',
		bottom:0
	});
	
	var ventana = Titanium.UI.createView({
		top: '0px',
		height: '100%',
		widht: '100%',
		zIndex: 9999,
	});
	
	var tituloCentrado = Titanium.UI.createView({
		
		backgroundImage: separadorImg+'ui/img/android/barra-menuP.png',
		top: '0px',
		height: '10%',
		widht: '100%',
		zIndex: 9999,
	});
	tituloCentrado.addEventListener( 'click', function() {
    	win.close();	
	});
	
	var tituloCentradoInterna = Titanium.UI.createView({
		
		backgroundColor: '#67b5bf',
		top: '35%',
		height: '75%',
		widht: '100%',
		
	});

	
	var derecha = Titanium.UI.createView({
		height: '100%',
		widht:'100%',
		left: 0
	});

	
	
	var titulo = Titanium.UI.createImageView({
	    image: 	separadorImg+'ui/img/android/tituloP.png',
   
	
	});

	derecha.add(titulo);

	tituloCentradoInterna.add(derecha);
	
	tituloCentrado.add(tituloCentradoInterna);
	
	
	ventana.add(tituloCentrado);
	ventana.add(imagen);
	win.add(ventana);
	return win;
}
module.exports = Aviso;
