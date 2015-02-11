function Perfil(idTruck){
//alert(idTruck);	
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

var IMG_BASE2 = Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/";

var fileMainTrucks = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'trucks.json');
var lugarTruck="";
var direccionTruck="";
var fileLatLon = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),idTruck+'.json');
Ti.API.info('Se busca el archivo:'+idTruck+".json");
		var data = [];
		var folderImg="";
		if (fileLatLon.exists()){
			folderImg=Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/";
			data = JSON.parse(fileLatLon.read().text);
			Ti.API.info('Se obtienen datos de AD' +data.datos.latitud);
			Ti.API.info('Se obtienen datos de AD' +data.datos.longitude);
			Ti.API.info('Se obtienen datos de AD' +data.datos.lugar);
			direccionTruck=data.datos.direccion;
			lugarTruck=	data.datos.lugar;
		}
		else{
			folderImg=Titanium.Filesystem.getResourcesDirectory()+'/ui/img/android/';
			fileLatLon = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),'1.json');	
			if (fileLatLon.exists()){
				data = JSON.parse(fileLatLon.read().text);
				Ti.API.info('Se obtienen datos de RD' +data.datos.latitud);
				Ti.API.info('Se obtienen datos de RD' +data.datos.longitude);			
			}
			else{
				Ti.API.info('No se pudieron obtener los datos');
			}
		}
		var latitudeOrig=data.datos.latitud;
		var longitudeOrig=data.datos.longitude;
	
var imageAvatars = new Array(30);
var imgName="1";
var nombreTruckTS="S/N";
var infoTruck="S/I";
var faceLabelTxt="";
var twitterLabelTxt="";
var tipoTruckTS="S/N";

if (fileMainTrucks.exists()){
	var data = JSON.parse(fileMainTrucks.read().text);
	//for (var i=0; i<data.trucks.length; i++){
	//}
	//alert(data.trucks[0].nombre);
	imgName=idTruck-1;
	infoTruck=data.trucks[idTruck-1].info;
	nombreTruckTS=data.trucks[idTruck-1].nombre;
	tipoTruckTS=data.trucks[idTruck-1].tipo;
	faceLabelTxt=data.trucks[idTruck-1].facebook;
	twitterLabelTxt=data.trucks[idTruck-1].twitter;
}	
Ti.UI.setBackgroundColor('#fff');

var win = Ti.UI.createWindow({
  backgroundColor: 'transparent',
  exitOnClose: false,
  fullscreen: false,
  modal: true,
  navBarHidden: true,
  title: 'Perfil',
  statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
  height: '100%',
});


var vistaPrincipal = Ti.UI.createView({
	width: '100%',	
	height: '120%',	
	backgroundColor: 'transparent'
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
	
	
	
	/*self.add(btnInicio);*/
	
	win.add(tituloCentrado);


var espacioFotoPrincipal = Ti.UI.createImageView({
	//image: '/ui/img/android/espacios/'+idTruck+'.jpg',
	image: IMG_BASE2+idTruck+'l.jpg',
	top: '7%',
	width: '80%',
	height: '30%',
	opacity: 1
});

var etiquetaNombreTruck = Ti.UI.createView({
	
	backgroundColor: '#231f20',
	/*image: */
	top: '31%',
	width: '80%',
	height: '6%',
	opacity: '0.7'	,
	textAlign:'center',
	tintColor:'white',
	color:'white',
	zIndex: 9999	
	
});


var logoTruck = Ti.UI.createImageView({
	image: IMG_BASE2+idTruck+'.jpg',	
//	image: IMG_BASE2'/ui/img/HUERTO/logo-local.png',
	top: '28%',
	left: '10%',
	width: '28%',
	height: '18%',
	zIndex: 9999,	
	opacity: 1
});


var nombreTruck = Ti.UI.createLabel({	
	top: '32%',
	left: '44%',
	width: '36%',
	backgroundColor: 'transparent',
    textAlign:'center',
	tintColor:'white',
	color:'white',
	zIndex: 9999,	
	text: nombreTruckTS,
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});



var imagenHorario = Ti.UI.createImageView({	
	image: '/ui/img/HUERTO/reloj.png',
	top: '42%',
	left: '43%',
	width: '3%',
	height: '2%',
	zIndex: 9999,	
	opacity: 1
});


var etiquetaHorario = Ti.UI.createLabel({	
	top: '42%',
	left: '48%',
	width: '30%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	color:'white',
	zIndex: 9999,	
	text: '8am - 9pm',
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var imagenTipo = Ti.UI.createImageView({	
	image: '/ui/img/HUERTO/asiatica.png',
	top: '37%',
	left: '42%',
	width: '5%',
	height: '2%',
	zIndex: 9999,	
	opacity: 1
});


var etiquetaTipo = Ti.UI.createLabel({	
	top: '37%',
	left: '48%',
	width: '30%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	color:'white',
	zIndex: 9999,	
	text: tipoTruckTS,
	//text: 'Asiática',
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});




var Map = require('ti.map');

folderImg=Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/";
			
var anotacionPerfil = Map.createAnnotation({
    latitude: latitudeOrig,
    longitude: longitudeOrig, 
    title:"",
    subtitle: '',
    image:folderImg+idTruck+"s.png",
    myid:1 
});


var miniMapa = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region : {latitude:latitudeOrig, longitude:longitudeOrig,latitudeDelta:0.1, longitudeDelta:0.1},            
    animate:true,
    regionFit:true,
    userLocation:true,
    height: '15%',
    top: '47%',
    width: '80%',  
    annotations:[anotacionPerfil],   
    opacity: 1 ,
    zIndex: 9999  
	});

var etiquetaDireccion = Ti.UI.createView({
	backgroundImage: '/ui/img/HUERTO/barra-gris.png',
	top: '63%',
	width: '80%',
	height: '8%',
	opacity: '1',
	textAlign:'center',
	tintColor:'white',
	zIndex: 9999	
});

var referenciaDireccion = Ti.UI.createLabel({	
	top: '63%',
	left: '20%',
	width: '70%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
	color:'white',
	color:'white',
	zIndex: 9999,
	//'Huerto Roma Verde'	
	text: lugarTruck,
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var direccionDireccion = Ti.UI.createLabel({	
	top: '67%',
	left: '20%',
	width: '70%',
	backgroundColor: 'transparent',
    textAlign:'letf',
	tintColor:'white',
		color:'white',

	zIndex: 9999,	
	// 'Xalapa S/N, 06760 Cuauhtémoc',
	text:direccionTruck,
	font:{
		
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});



var etiquetaDescripcion = Ti.UI.createLabel({	
    textAlign:'justify',
	tintColor:'white',
		color:'white',

	zIndex: 9999,	
	text:infoTruck, 
	/*'Food Truck que funciona con energía solar. Los Platillos que ofrecemos se basan en la transformación del ramen oriental pensado para el paladar mexicano.',
	*/
	font:{
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var scroll = Ti.UI.createScrollView({
	top: '72%',
	borderColor:'#6b696a',
    borderWidth:1,
	width: '80%',
	height: '20%'
});

	scroll.add(etiquetaDescripcion);


	var imagenTwitter = Ti.UI.createImageView({
	image: '/ui/img/HUERTO/tw-logo.png',
	width: '50px',
	left: '50%',
	height: '50px',
	zIndex: 9999,	
	opacity: 1
});

var imagenFacebook = Ti.UI.createImageView({
	image: '/ui/img/HUERTO/fb-logo.png',
	width: '50px',
	left: '0%',
	height: '50px',
	zIndex: 9999,	
	opacity: 1
});


var labelFacebook = Ti.UI.createLabel({	
	left: '50px',
	width: '40%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
		color:'white',

	zIndex: 9999,	
	text: faceLabelTxt,
	font:{
		fontSize: '10%',
        fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var labelTwitter = Ti.UI.createLabel({	
	left: '61%',
	width: '40%',
	backgroundColor: 'transparent',
    textAlign:'left',
	tintColor:'white',
		color:'white',

	zIndex: 9999,	
	text: '@'+twitterLabelTxt,
	font:{
		    fontSize: '10%',
            fontFamily: os({
            iphone:'Avenir LT Std', 
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
    }
});

var panelRedes = Ti.UI.createView({	
	width: '80%',
	height: '60px',
	bottom: 0,
	zIndex: 9999,	
	backgroundColor: 'transparent'
});


panelRedes.add(imagenFacebook);
panelRedes.add(labelFacebook);
panelRedes.add(imagenTwitter);
panelRedes.add(labelTwitter);



 win.add(vistaPrincipal);

 win.add(espacioFotoPrincipal);
 win.add(etiquetaNombreTruck);
 win.add(nombreTruck);
 win.add(logoTruck);
 win.add(imagenHorario);
 win.add(etiquetaHorario);
 win.add(imagenTipo);
 win.add(etiquetaTipo);
 win.add(miniMapa);
 win.add(etiquetaDireccion);
 win.add(referenciaDireccion);
 win.add(direccionDireccion);
 win.add(scroll);
 win.add(panelRedes);

 return win;
}
module.exports = Perfil;

/*var etiquetaEstacion = Ti.UI.createView({
	backgroundImage: '/ui/img/HUERTO/barra-menu.png',
	top: 0,
	left:0,
	width: '100%',
	height: '6%',
	opacity: 1	,
	textAlign:'center',
    tintColor:'white',
	opacity: 1,	
	zIndex: 9999	
});*/