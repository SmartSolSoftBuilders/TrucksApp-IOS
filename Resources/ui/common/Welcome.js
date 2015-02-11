function Welcome(){
	var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;	

var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;


var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
    var def = map.def||null; //default function or value
    if (map[osname]) {
        if (typeof map[osname] == 'function') { return map[osname](); }
        else { return map[osname]; }
    }
    else {
        if (typeof def == 'function') { return def(); }
        else { return def; }
    }
};

	
Ti.UI.setBackgroundColor('#fff');

var win = Ti.UI.createWindow({
  backgroundColor: 'white',
  exitOnClose: false,
  fullscreen: false,
  modal: true,
  navBarHidden: true,
  title: 'Radar Food Truck',
  statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
  opacity: 1,
  width:  '100%',
  height: '100%'
});

var IMG_BASE2 = Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/";

var tituloCentrado = Titanium.UI.createView({
		
		backgroundImage: separadorImg+'ui/img/android/barra-menu.jpg',
		top: '0px',
		height: '3%',
		widht: '100%',
		zIndex: 9999,
	});


var fondoPrincipal = Ti.UI.createView({
	width: '100%',	
	height: '100%',	
	backgroundImage: '/ui/img/SALUDO/bg.png',
});

var imagenPrincipal = Ti.UI.createImageView({
	top: '5%',
	image: IMG_BASE2+'principal.png',
	width: '80%',
	height: '85%',
});


var imagenBanderin = Ti.UI.createImageView({	
	image: '/ui/img/SALUDO/banderin.png',
	top: '3%',
	left: '-25%',
	height: '7%',
	zIndex: 9999
});


imagenPrincipal.addEventListener('click',function (e){
	
		Ti.API.info('Click en el botòn entrar');	
		   var index = require ('ui/common/IndexIOS');	
			new index().open(); 
			win.close();
	});  
	
var imagenFlecha = Ti.UI.createImageView({	
	image: '/ui/img/SALUDO/flecha2.png',
	bottom: '3%',
	
	height: '6%',
	zIndex: 9999
});


imagenFlecha.addEventListener('click',function (e){
	
		Ti.API.info('Click en el botòn entrar');	
		   var index = require ('ui/common/IndexIOS');	
			new index().open(); 
			win.close();
	});  

 win.add(tituloCentrado);
 
 win.add(fondoPrincipal);
  win.add(imagenBanderin);
 win.add(imagenPrincipal);

 win.add(imagenFlecha);

 return win;

	}module.exports = Welcome;