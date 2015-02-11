function FavoritosIos(){
Ti.UI.setBackgroundColor('#000');

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


var win = Ti.UI.createWindow({
  backgroundColor: 'transparent',
  exitOnClose: false,
  fullscreen: false,
  modal: true,
  title: 'TRUCKS',
  statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
  navBarHidden: true
  
});
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;


var vistaPrincipal = Ti.UI.createView({
	width: '100%',	
	height: '100%',	
	backgroundColor: 'transparent',

});
	
win.add(vistaPrincipal);


	
var tituloCentrado = Titanium.UI.createView({
		
		backgroundImage: separadorImg+'ui/img/android/barra-menu.jpg',
		top: '0px',
		height: '15%',
		widht: '100%',
		zIndex: 9999,
	});
	tituloCentrado.addEventListener( 'click', function() {
    	win.close();	
	});
	
	var tituloCentradoInterna = Titanium.UI.createView({
		
		backgroundColor: '#e64f46',
		top: '20%',
		height: '80%',
		widht: '100%',
		
	});

	
	var derecha = Titanium.UI.createView({
		height: '100%',
		widht:'100%',
		left: 0
	});

	
	
	var titulo = Titanium.UI.createImageView({
	    image: 	separadorImg+'ui/img/android/titulo.png',
   
	
	});

	derecha.add(titulo);

	tituloCentradoInterna.add(derecha);
	
	tituloCentrado.add(tituloCentradoInterna);
	
	
	win.add(tituloCentrado);
	
	
	
	
	
	
// generate random number, used to make each row appear distinct for this example
function randomInt(max){
  return Math.floor(Math.random() * max) + 1;
}

var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
var IMG_BASE2 = Titanium.Filesystem.getApplicationDataDirectory()+"../Library/Caches/";

var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

var tableData = [];

var fileMainTrucks = Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'trucks.json');	
var imageAvatars = new Array(30);
if (fileMainTrucks.exists()){
	var data = JSON.parse(fileMainTrucks.read().text);
	for (var i=0; i<data.trucks.length; i++){
	//alert(data.trucks.length);
	//alert("i:"+i+"->"+data.trucks[i].nombre);
  	var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'transparent',
    rowIndex:i, // custom property, useful for determining the row during events
    index:data.trucks[i].idTruck,
    height:80
  	});
 
  	imageAvatars[i] = Ti.UI.createImageView({
   	 image: IMG_BASE2 + data.trucks[i].idTruck+'.jpg',
   	 left:10, top:5,
     width:50, height:50,id_:data.trucks[i].idTruck
 	 });
	
 	 row.add(imageAvatars[i]);
  
 	 var labelUserName = Ti.UI.createLabel({
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    text:data.trucks[i].nombre,
    color: '#098596',
    left:70, top: 6,
    width:200, height: 30,
	font:{
		fontSize: '25%',
		fontWeight: 'bold',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }	    
    
  });
  row.add(labelUserName);
  
  var labelDetails = Ti.UI.createLabel({
    color:'#222',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+2, fontWeight:'normal'},
    text:'Comida de Tipo: ' + data.trucks[i].tipo,
    //text:'Comida de Tipo: ' + randomInt(1000) + '.',
    left:70, top:44,
    width:360,
    color: 'white',
    font:{
		fontSize: '15%',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }	 
  });
  row.add(labelDetails);
  
  /*var imageCalendar = Ti.UI.createImageView({
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    left:70, bottom: 2,
    width:32, height: 32
  });
  row.add(imageCalendar);
    */
  tableData.push(row);
  }

	
}
else{
	for (var i=1; i<=1; i++){
  	var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'transparent',
    rowIndex:i, // custom property, useful for determining the row during events
    height:80
  	});
 
  	var imageAvatar = Ti.UI.createImageView({
    image: IMG_BASE + 'custom_tableview/user.png',
    left:10, top:5,
    width:50, height:50
 	 });
 	 row.add(imageAvatar);
  
 	 var labelUserName = Ti.UI.createLabel({
    color:'#576996',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    text:'Name',
    color: '#67b5bf',
    left:70, top: 6,
    width:200, height: 30,
	font:{
		fontSize: '25%',
		fontWeight: 'bold',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }	    
    
  });
  row.add(labelUserName);
  
  var labelDetails = Ti.UI.createLabel({
    color:'#222',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+2, fontWeight:'normal'},
    text:'Comida de Tipo: ' + randomInt(1000) + '.',
    left:70, top:44,
    width:360,
    color: 'white',
    font:{
		fontSize: '15%',
        fontFamily: os({
            iphone:'Avenir LT Std',
            ipad: 'Avenir LT Std',
            ipod: 'Avenir LT Std',
            android:'AvenirLTStd-Medium'
        })
        }	 
  });
  row.add(labelDetails);
  
  /*var imageCalendar = Ti.UI.createImageView({
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    left:70, bottom: 2,
    width:32, height: 32
  });
  row.add(imageCalendar);
    */
  tableData.push(row);
  }
}
var tableView = Ti.UI.createTableView({
  backgroundColor:'transparent',
  data:tableData,
  top: '15%'
});
  tableView.addEventListener('click', function(evt) {	
 	 		//alert();
 	 		//alert(evt.source._id);	 	 		
 	 				Ti.API.info('Click en el botòn Temporal'+evt.rowIndex);	
		Ti.API.info('Click en el botòn Temporal'+evt.row.index);	

   		 	var perfil = require ('ui/perfil/PerfilIos');
			new perfil(''+evt.row.index).open();       
	});

win.add(tableView);
return win;
//win.open();	
	//self.add(btn1);
	//return self;
}
module.exports = FavoritosIos;