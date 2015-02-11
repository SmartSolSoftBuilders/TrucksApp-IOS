function EventosAndroid(){
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
  modal:true,
  fullscreen: false,
  backgroundColor: '#transparent',
  title: 'EVENTOS',
  navBarHidden: true,
  statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
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
	
	win.add(tituloCentrado);
	
	
	
// generate random number, used to make each row appear distinct for this example
function randomInt(max){
  return Math.floor(Math.random() * max) + 1;
}

var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

var tableData = [];

for (var i=1; i<=1; i++){
  var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'transparent',
    rowIndex:i, // custom property, useful for determining the row during events
    height:'18%',
    width:'100%',
  });
  
  
  var labelUserName = Ti.UI.createLabel({
    color:'#098596',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+2, fontWeight:'bold'},
    text:'#FoodtrucksEnelHuerto 6: ¡Los mejores #Foodtrucks en un sólo lugar!',
    textAlign:'justify',
    left:'5%', top: 6,
    height:'50%',
    width:'90%',
	font:{
		fontSize: '15%',
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
    color:'#ccc',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+2, fontWeight:'normal'},
    text:'Huerto Roma Verde ' + randomInt(1000) + '.',
    left:'5%', 
    top:'50%',
     height:'25%',
    width:'100%',
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
  
  var calendario = Ti.UI.createImageView({
    left:0, bottom: 2,
     height:'25%',
    width:'100%', 
  });
  row.add(calendario);
  
  var imageCalendar = Ti.UI.createImageView({
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    left:0,
     
    width:'20%',
  });
  calendario.add(imageCalendar);
  
  var labelDate = Ti.UI.createLabel({
    color:'#ddd',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
    text:'26 de septiembre - 28 de septiembre',
    left:'20%', bottom:10,
    width:'80%', 
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
  calendario.add(labelDate);
  
  tableData.push(row);
}

var tableView = Ti.UI.createTableView({
  backgroundColor:'transparent',
  data:tableData,
  top:'10%'
});

win.add(tableView);
return win;
//win.open();	
	//self.add(btn1);
	//return self;
}
module.exports = EventosAndroid;