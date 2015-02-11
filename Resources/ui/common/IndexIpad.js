function IndexIOS(){
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
	
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
	Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
	Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
	Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
	if(Ti.Platform.osname === 'android'){
	  Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
	  Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
	  Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
	}
	var self = Titanium.UI.createWindow({
		//backgroundImage:separadorImg+'ui/img/android/lineas-bg.png',
		exitOnClose: true,
		layout :'vertical',
		//height:pHeight+"px",
		//width:pWidth+"px",
		height:'100%',
		width:"100%",
		
		title: 'Inicio',
		navBarHidden: true		
	});
	
//		Ti.API.info('Click en el botòn Salir');	
//		Ti.API.info('Click en el botòn Salir');	
	
	// generate random number, used to make each row appear distinct for this example
	function randomInt(max){
	  return Math.floor(Math.random() * max) + 1;
	}

	var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
	//var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

	var btn1= Titanium.UI.createButton({		
		backgroundImage:separadorImg+'ui/img/android/barra-menu.jpg',
		top:'10px',
		left:'0px',
		height:'130px',
		width:pWidth+"px"
	});
	
	var tituloCentrado = Titanium.UI.createView({
		
		backgroundImage: separadorImg+'ui/img/android/barra-menu.jpg',
		top: '0px',
		height: '110px',
		widht: pWidth+"px",
		zIndex: 9999,
		layout:'composite'
		
	});
	
	var tituloCentradoInterna = Titanium.UI.createView({
		left:20,
		backgroundColor: 'transparent',
		height: '90px',
		widht: '80%',
		zIndex: 9999
		
	});
	
	var camion = Titanium.UI.createImageView({
		
		image: 	separadorImg+'ui/img/android/camion.png',
		
		left: '10%',
		
		width: '12%',
		
		height: '100%',
		
		zIndex: 9999
		
	
	});
	
	
	var titulo = Titanium.UI.createImageView({
	
	
	    image: 	separadorImg+'ui/img/android/titulo.png',
	    
	    
	    
	    left: '24%',
	    
	    width: '65%',
		
		height: '80%',
	    
	    zIndex: 9999
	    
	    
	
	});
	
	tituloCentradoInterna.add(camion);
	tituloCentradoInterna.add(titulo);
	
	tituloCentrado.add(tituloCentradoInterna);
	
	
	/*btn1.addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Salir');	
		self.close();
		var activity = Titanium.Android.currentActivity;
			activity.finish();
			self.activity.finish();
	});*/

var menuTitulo = ['radar','trucks','eventos','estaciones','promociones','con-antojo-de','magazine'] ;
var icons = ['icon1','icon2','icon3','icon4','icon5','icon6','icon6'] ;

var menuData = [];
var row = new Array(7);
for (var i=1; i<=7; i++){
  	row[i-1] = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    backgroundImage:separadorImg+'ui/img/android/lineas-bg.png',
	rowIndex:i, // custom property, useful for determining the row during events
    height:60
  });
  
  var imageAvatar1 = Ti.UI.createImageView({
    image: separadorImg+'ui/img/android/bullet.png',
    left:-10, top:5,
    height:50,width:50   
  });
  row[i-1].add(imageAvatar1);
    
  var imageAvatar = Ti.UI.createImageView({
    image: separadorImg+'ui/img/android/'+menuTitulo[i-1]+'.png',
    left:270,
     top:5,
     height:40
  });
  row[i-1].add(imageAvatar);

 var imageAvatar2 = Ti.UI.createImageView({
    image: separadorImg+'ui/img/android/'+icons[i-1]+'.png',
     right: 25,
      top:5,
     height:40,
     width: 40
  });
  row[i-1].add(imageAvatar2);
  
  
  
  //row[i-1].add(labelUserName);
  
 if (i==1){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Mapa');	
		
		//////////// Se buscan las últimas posiciones de los Trucks de la BD /////////////////////////////////	
	var httpClientIndiv = Titanium.Network.createHTTPClient({
		onload: function() {					  	
			Ti.API.info("Se actualizó la bd de Posiciones de los Trucks."); 
			//f.write(this.responseData);
			var reply = JSON.parse(this.responseText);
			var links = this.reply || [];
			var numTrucks= reply.numtrucks;
			var listaTrucks = reply.trucks;
			var fechaConsultada= reply.version;
			Ti.API.info("Se actualizó la bd de Posiciones de los Trucks."+listaTrucks[0]+"Se consultó desde el dispositivo en:"+fechaConsultada); 	

			for (i=0; i<numTrucks;i++){
				var truck = listaTrucks[i];
				var fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),listaTrucks[i].idTruck+".json");
				fileVersionLocal.setRemoteBackup=false;
				if (fileVersionLocal.exists()){
						fileVersionLocal.deleteFile(); 
	    		}
	    		fileVersionLocal.write("{\"datos\":"+JSON.stringify(truck)+"}");  
				Ti.API.info('Actualizo archivo de Truck desde APD:' + truck);	
			}		
			var fileVersionLocal2 = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"fechaAct.json");  
			fileVersionLocal2.setRemoteBackup=false;
		    fileVersionLocal2.write("{\"fechaActualizacion\":\""+fechaConsultada+"\"}");
		    Ti.API.info('Actualizo la fecha de actualización:' + fechaConsultada); 
		    
		    var fileVersionLocal4 = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"numtrucks.json");  
		    fileVersionLocal4.setRemoteBackup=false;
		    
	    	fileVersionLocal4.write("{\"trucks\":"+numTrucks+"}");
		    Ti.API.info('Actualizo el num de Trucks:' + numTrucks); 
		    

	    	var mapaAndroid = require ('ui/mapa/MapaIOS');	
			new mapaAndroid().open(); 	 
			},
			onerror : function(e) {
			 			//alert("Surgió un error al intentar actualizar la base de datos, vuelva a abrir la App");
						//Ti.API.info("Surgió un error al intentar actualizar la base de datos");
						var mapaAndroid = require ('ui/mapa/MapaIOS');	
						new mapaAndroid().open(); 	
					},
			timeout : 4000 
		});
		Ti.API.info('Buscando fecha a actualizar:');
		var fileVersionLocal3 = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"fechaAct.json");  
		fileVersionLocal3.setRemoteBackup=false;
	    var paramFecha="";
	    if (fileVersionLocal3.exists()){  
			fileTmp = JSON.parse(fileVersionLocal3.read().text);
			paramFecha=fileTmp.fechaActualizacion;
			Ti.API.info('Ultima fecha de actualización:' + paramFecha); 
		}else{
				Ti.API.info('Se busca por primera vez');
				paramFecha= "2014-10-01 13:00:0";			     	
		}
		httpClientIndiv.open("GET", "http://s544443713.onlinehome.mx/AppTrucks/app/getTrucksPositions.php?d="+paramFecha);
		httpClientIndiv.send();
		//////////////////////////////////////////////		
		});
  }
  if (i==2){
	  row[i-1].addEventListener('click',function (e){
		  var favoritosAndroid = require ('ui/favoritos/FavoritosIos');	
			new favoritosAndroid().open(); 	
		});  
  }
  if (i==3){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Eventos');	
		   var favoritosAndroid = require ('ui/eventos/EventosAndroid');	
			new favoritosAndroid().open(); 	
		});  
  }
    if (i==4){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn estaciones');	
		   var aviso = require ('ui/perfil/Aviso');	
			new aviso(3).open(); 	
		});  
  }
   if (i==5){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn promociones');	
		   var aviso = require ('ui/perfil/Aviso');	
			new aviso(5).open(); 	
		});  
  }
   if (i==6){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn antojo de');	
		   var aviso = require ('ui/perfil/Aviso');	
			new aviso(2).open(); 	
		});  
  }
     if (i==7){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn magazine');	
		   var aviso = require ('ui/perfil/Aviso');	
			new aviso(4).open(); 	
		});  
  }
  /*  if (i==4){
	  row[i-1].addEventListener('click',function (e){
	  	var fb = require('facebook');
	  	fb.appid = '901121093249961';
		Ti.API.info('facebook logedin?' + fb.loggedIn);
		fb.logout();
		Ti.API.info('Click en el botòn LGFacebook');	
		alert("Se cerró la sesión FB");
		});  
  }  
 if (i==4){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Temporal');	
		   var perfil = require ('ui/perfil/Perfil');	
			new perfil(1).open(); 	
		});  
  }*/
  
 /* if (i==5){
	  row[i-1].addEventListener('click',function (e){
		Ti.API.info('Click en el botòn Temporal');	
		   var perfil = require ('ui/bienvenida/Bienvenida');	
			new perfil().open(); 	
		});  
  }*/  
  

  menuData.push(row[i-1]);
}
	var menu = Ti.UI.createTableView({
	  data: menuData,
	  zIndex: 10
	});
	
	
	//self.add(btn1);
	
	self.add(tituloCentrado);
	 
	var imgAvt = Ti.UI.createImageView({
	    backgroundImage:separadorImg+'ui/img/android/lineas-bg.png',
    	image: separadorImg+'ui/img/android/contenido.png',
   		 left:0, top:0,
   		 width:'100%',
    	 height:80
 	 });
	self.add(imgAvt);
	
	
	
	self.add(menu);	
	//alert("OKs"+self)
	
	
	
	return self;
}
module.exports = IndexIOS;