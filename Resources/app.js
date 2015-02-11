// Don't forget to set your appid and requested permissions, else the login button
// won't be effective.
var response;
var separadorImg="";
var osname = Ti.Platform.osname;
if (osname === 'iphone' || osname === 'ipad') {
		separadorImg='';
	}
	else if (osname === 'mobileweb'){
		separadorImg='';
	}
	else {
		separadorImg='/';
}	
var currentLat=0.0;
var currentLon=0.0;
	
if (osname === 'iphone' || osname === 'ipad') {
	Ti.Geolocation.purpose = "Recieve User Location";
	// get current location
	Titanium.Geolocation.getCurrentPosition( function(e) {
				    if (!e.success) {
			        alert('Could not retrieve location');
			        return;
			    }
			    //here are users coordinatesf¡
			    currentLon = e.coords.longitude;
			    currentLat = e.coords.latitude;	
			    
			    
////////////se envian las coordenadas para comparar las distancias en los trucks////////////////////////

var xhr=Titanium.Network.createHTTPClient();    
xhr.onerror = function(e){ 
 Ti.API.error('Bad Sever =>'+e.error);
};

xhr.open("POST","http://s544443713.onlinehome.mx/AppTrucks/app/distancia.php");
xhr.setRequestHeader("content-type", "application/json");
var param={ "lat":currentLat,"lon":currentLon};
 
Ti.API.info('Params'+JSON.stringify(param));
xhr.send(JSON.stringify(param));
 
xhr.onload = function(){
 Ti.API.info('RAW ='+this.responseText);
 if(this.status == '200'){
    Ti.API.info('got my response, http status code ' + this.status);
    if(this.readyState == 4){
      response=JSON.parse(this.responseText);
      Ti.API.info('Response = '+response);
    }else{
      alert('HTTP Ready State != 4');
    }           
 }else{
    alert('HTTp Error Response Status Code = '+this.status);
    Ti.API.error("Error =>"+this.response);
 }              
};


/////////////////////////////////////////////////////////////////////////		    
		    		
	});
} 

var win = Ti.UI.createWindow({backgroundImage:separadorImg+'ui/img/android/logo.png', fullscreen: true});
	
	


////////////////////////////////////// --- SE OBTIENE LA VERSIÓN DEL PAQUETE DE TRUCKS --- //////////////////////

function retrieveData(callback){
	versionJSONFiles=1;
    var httpClient = Titanium.Network.createHTTPClient({ 
               onload: function() {
                //We'll call this reply instead of JSON
                var reply = JSON.parse(this.responseText);
                callback(reply);         
            },
            onerror : function(e) {
            	if (osname === 'iphone') {
				var index = require ('ui/common/Welcome');						
			}
				if (osname === 'ipad') {
				var index = require ('ui/common/Welcome');						
			}
				new index().open(); 
     		},timeout : 1000 
     });            
        
    Ti.API.info('Buscando fecha de version de los trucks en general  a actualizar:');
	var fileVersionLocal3 = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"version.json");  
	fileVersionLocal3.setRemoteBackup=false;
		
	var paramFecha="";
	if (fileVersionLocal3.exists()){  
		fileTmp = JSON.parse(fileVersionLocal3.read().text);
		paramFecha=fileTmp.version;
		Ti.API.info('Ultima fecha de actualización:' + paramFecha); 
	}
	else{
		Ti.API.info('Se busca por primera vez');
		paramFecha= "2014-10-01 13:00:0";			     	
	}

	Ti.API.info("Se envía http://s544443713.onlinehome.mx/AppTrucks/app/getUpdates.php?d="+paramFecha);
		
	httpClient.open("GET", "http://s544443713.onlinehome.mx/AppTrucks/app/getUpdates.php?d="+paramFecha);
    httpClient.send();
    
}

retrieveData(function(returnVar){
	//If we get a null or undefined response, we'll just take an empty array
	var links = returnVar || [];
	var versionFromServer = returnVar.version;
	var dataVersionLocal = 0;
	var numTrucksPorActualizar = returnVar.numTrucks;
	var nuevaImagen = returnVar.nuevaImagen;
	var listaTrucks = returnVar.trucks;
		
	//alert(links);
	var fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"version.json");	
	fileVersionLocal.setRemoteBackup=false;
	if (fileVersionLocal.exists()){
		dataVersion = JSON.parse(fileVersionLocal.read().text);
		Ti.API.info('Fecha de Versión Actual desde APD' + dataVersion.version);
	}
	else{
		fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),"version.json");	
		fileVersionLocal.setRemoteBackup=false;
		dataVersion = JSON.parse(fileVersionLocal.read().text);
		Ti.API.info('Fecha de Versión Actual desde RD' + dataVersion.version);	
	}
	Ti.API.info(numTrucksPorActualizar+"?<"+versionFromServer);
	/////////////// Si hay actualización se procede a actualizar la bd de Trucks ////////////////////////
	if (numTrucksPorActualizar>0 || nuevaImagen >0){
		Ti.API.info("!Hay nuevos datos disponibles!");
		Ti.API.info('Trucks nuevos:' + listaTrucks);
		var fileMainTrucks = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'trucks.json');	
		fileMainTrucks.setRemoteBackup=false;
		fileMainTrucks.deleteFile();
		fileMainTrucks.write("{\"trucks\":"+JSON.stringify(listaTrucks)+"}");
		Ti.API.info("!Creando archivos individuales de los trucks!"+numTrucksPorActualizar);
		for (k=0;k<numTrucksPorActualizar;k++){
			var truck = listaTrucks[k];
			var fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),listaTrucks[k].idTruck+".json");
			fileVersionLocal.setRemoteBackup=false;
			if (fileVersionLocal.exists()){
					fileVersionLocal.deleteFile(); 
	   		}
	   		fileVersionLocal.write("{\"datos\":"+JSON.stringify(truck)+"}");  
			Ti.API.info('Actualizo archivo:' + listaTrucks[k].idTruck+".json");
		}
			
		//////////// Se actualizan las imágenes de la bd de Trucks /////////////////////////////////	
	    var httpClientIndiv = Titanium.Network.createHTTPClient({
			onload: function() {         	
					var f = Ti.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/",'imagenesTrucks.zip');
					f.setRemoteBackup=false;						
					f.write(this.responseData);    
					if (osname === 'iphone' || osname === 'ipad'){
						 var f = Ti.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/",'imagenesTrucks.zip');
						 f.setRemoteBackup=false;
						 var zipFile = require('de.marcelpociot.zip');						 
						 zipFile.unzip({
								// TiFile object containing the zip file to open
								file: 		f,
								// Directory to extract the files to
								target: 	Ti.Filesystem.applicationDataDirectory+"../Library/Caches/",
								// OverWrite existing files? default: TRUE
								overwrite:	true,
								// Success callback
								success: function(e){
								// Returns unzipped files:
								Ti.API.info('OK UNZIP' + e + f.nativePath);
								f.setRemoteBackup=false;
								f.deleteFile();
								if (f.exists()){
									Ti.API.info("No se borrò el archivo");					
									}
								},
								// error callback
								error: function(e){
									Ti.API.info('ERROR ZIP' + e);	
								},
								progress:function(e)
									{
									Ti.API.info('OK ZIP' + e);	
								}
							});
	  				 }
					else{
						//var Compression = require('ti.compression');	
						//var result = Compression.unzip(Ti.Filesystem.getApplicationDataDirectory(), 'imagenesTrucks.zip', true);				
						alert("Imposible reconocer el dispositivo");
						Ti.API.info("Unzip imgs:"+result);      
					}					
					//Actualizando versión
					var fileVersion = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'version.json');			
					fileVersion.setRemoteBackup=false;	
					fileVersion.write("{\"version\":\""+returnVar.version+"\"}");  	
					Ti.API.info("Se actualizó la bd de Trucks. Se actualizaron las Imágenes! Bienvenido");
					if (osname === 'iphone') {
						var index = require ('ui/common/Welcome');						
						new index().open();
					}
					if (osname === 'ipad') {
						var welcome = require ('ui/common/Welcome');						
						new welcome().open();
					}	
					 
				  },
				  onerror : function(e) {
				  			//alert("Surgió un error al intentar actualizar la base de datos, vuelva a abrir la App");
						//Ti.API.info("Surgió un error al intentar actualizar la base de datos");
						if (osname === 'iphone') {
				var welcome = require ('ui/common/Welcome');						
			}
				if (osname === 'ipad') {
				var welcome = require ('ui/common/Welcome');						
			}	
						new welcome().open(); 
						},
				  timeout : 100000 
			}); 
			Ti.API.info("Se busca el zip con las imágenes:");
			 Ti.API.info('Buscando fecha de version de los trucks en general  a actualizar:');
			var fileVersionLocal3 = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"version.json");  
			fileVersionLocal3.setRemoteBackup=false;
		 	   var paramFecha="";
		    if (fileVersionLocal3.exists()){  
				fileTmp = JSON.parse(fileVersionLocal3.read().text);
			paramFecha=fileTmp.version;
			Ti.API.info('Ultima fecha de actualización:' + paramFecha); 
			}else{
				Ti.API.info('Se busca por primera vez');
				paramFecha= "2014-10-01 13:00:0";			     	
			}
			//httpClientIndiv.open("GET", "http://s544443713.onlinehome.mx/AppTrucks/app/imagenesTrucks.zip");
			httpClientIndiv.open("GET", "http://s544443713.onlinehome.mx/AppTrucks/app/getZipTest.php?d="+paramFecha);
			httpClientIndiv.send();	
			////////////////////////////////////////////////////////
		}
		else{
			if (osname === 'iphone') {
				var welcome = require ('ui/common/Welcome');						
			}
			if (osname === 'ipad') {
				var welcome = require ('ui/common/Welcome');						
			}
			new welcome().open(); 
			//alert("No se actualizará");
		}
});




////////////////////////////////////// --- SECCIÓN FACEBOOK ---//////////////////////////////////////////////////
//var fb = require('facebook');
/*fb.appid = '901121093249961';
Ti.API.info('facebook logedin?' + fb.loggedIn);
if (!fb.loggedIn) {
	fb.permissions = ['publish_stream'];
	fb.addEventListener('login', function(e) {
    	if (e.success) {
        	alert('Bienvenido');
			var fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),"version.json");	
				if (fileVersionLocal.exists()){
					dataVersion = JSON.parse(fileVersionLocal.read().text);
					Ti.API.info('Versión Actual desde APD' + dataVersion.version);
				}else{
					fileVersionLocal = Titanium.Filesystem.getFile(Titanium.Filesystem.getResourcesDirectory(),"version.json");	
					dataVersion = JSON.parse(fileVersionLocal.read().text);
					Ti.API.info('Versión Actual desde RD' + dataVersion.version);	
				}
        		//Set links to an empty array
				var index = require ('ui/common/Index');	
					new index().open();   								
		}		   
	});
			
	fb.addEventListener('logout', function(e) {
		alert('Logged out');
	});
    
// Add the button.  Note that it doesn't need a click event listener.
	win.add(fb.createLoginButton({
    top : '550px',
    style : fb.BUTTON_STYLE_WIDE
}));
  alert('BienvenidoINICIO');
win.open();	    
}  
else{
	alert("Bienvenido") ;
//	var currentLat=0.9;
	//var currentLon=0.0;
	
	

} */
