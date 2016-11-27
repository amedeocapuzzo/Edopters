//window.onload = function () {
var findData = function(data) {
    //Questa funzione ritorna il valore dell'energia prodotta in
    //un particolare giorno dell'anno
    var giorno = data.getDate();
    var mese = data.getMonth();
    var result = 0;
    for (var i =0; i < datiPannelli.length; i++) {
        if ((datiPannelli[i][0].split("/")[0] == giorno) &&
            (datiPannelli[i][0].split("/")[1] == mese)) {
                result = datiPannelli[i][3];
                return result;
        }
    }
};


var consumiPointData = [];
var compensiPointData = [];

var createCompensiMensile = function(dataArray) {
 
    for (var i = 0; i < dataArray.length; i++) {
      var consumiMensile = 0;
        var compensiMensile = 0;
      
      consumiMensile += parseInt(dataArray[i].value);

      var dataSplit = dataArray[i].timePeriod.start.split("/");
      var giornoNuovo = new Date(parseInt(dataSplit[2].split(" ")[0]),
                                        parseInt(dataSplit[0]),
                                        parseInt(dataSplit[1]));
      
      //console.log(crediti);
      //var result = createCompensoDaily(findData(giornoNuovo));
      
      var result = createCompensoDaily(findData(giornoNuovo));
      compensiMensile = compensiMensile + result;
      consumiPointData.push({x: giornoNuovo,
                          y: parseInt(dataArray[i].value)});
    
      compensiPointData.push({x:giornoNuovo,
                              y: result});
    }
    return {compensi: parseInt(compensiMensile),consumi: parseInt(consumiMensile)};
  }

var drawChart =  function(data) {
    //console.log("asssdfs");
  //console.log("This is drawing data:", data);
  
  // Il fatto che aspettiamo i dati dalla rete prima di visualizzare i grafici previene la prima esecuzione di document.ready()
  // quindi dobbiamo provvedere noi a chiamarla esplicitamente. CHIEDERE A FILIP!!!
  
  main();
  //console.log(crediti);
  var dataArray = data.IntervalReading;

  
  var mensile = createCompensiMensile(dataArray);
  compensiMensile = mensile.compensi;
  consumiMensile = mensile.consumi;
  updateCompensi(compensiMensile);
  //console.log("compenso: "+compensiMensile+ " consumi "+consumiMensile);
  var compensiTorta = parseInt((compensiMensile / consumiMensile) * 100);

    
  var chart = new CanvasJS.Chart("torta_container",
  {
    title:{
      text: "",
      verticalAlign: 'top',
      horizontalAlign: 'left'
    },
                animationEnabled: true,
    data: [
    {        
      type: "doughnut",
      startAngle:20,
      toolTipContent: "{label}: {y} - <strong>#percent%</strong>",
      indexLabel: "",
      dataPoints: [
        {  y: 100 - compensiTorta, label: "Consumi", color: "#e74c3c",  },
        {  y: compensiTorta, label: "Compensi", color: "#2ecc71" }
      ]
    }
    ]
  });
  chart.render();

//************************************************************************************************************************************
var chart = new CanvasJS.Chart("linee_container",
    {      
      title:{
        text: ""
      },
      animationEnabled: true,
      axisY :{
        includeZero: false
      },
      toolTip: {
        shared: "true"
      },
      data: [
      {        
        type: "spline", 
        showInLegend: false,
        name: "Compensi",
        markerSize: 0, 
        color: "#2ecc71",       
        dataPoints: compensiPointData,
      },

      {        
        type: "spline", 
        showInLegend: false,
        name: "Consumi",
        markerSize: 0,    
        color: "#e74c3c",    
        dataPoints: consumiPointData,/*[
        {x: new Date(2013,4,1 ), y: 430576},
        {x: new Date(2013,4,2 ), y: 498157},      
        {x: new Date(2013,4,3 ), y: 415128},      
        {x: new Date(2013,4,4 ), y: 342031},      
        {x: new Date(2013,4,5 ), y: 320376},      
        {x: new Date(2013,4,6 ), y: 405322},      
        {x: new Date(2013,4,7 ), y: 433426},      
        {x: new Date(2013,4,8 ), y: 430876},      
        {x: new Date(2013,4,09 ), y: 372277},      
        {x: new Date(2013,4,10 ), y: 351863},      
        {x: new Date(2013,4,11 ), y: 281959},      
        {x: new Date(2013,4,12 ), y: 282666},      
        {x: new Date(2013,4,13 ), y: 353718},      
        {x: new Date(2013,4,14 ), y: 507833}    
        ]*/
      }      
      ]
    });

chart.render();

};

var updateClassifica = function() {
    // Funzione che ordina in modo crescente i dati della classifica
    // degli utenti 
}


var createCompensoDaily = function(result) {
    //console.log(result);
    var risultato = result*crediti/4 + Math.random()*100*crediti;
    return risultato;
};

var updateCompensi = function(value) {
    //console.log("Sto modificando");
    var stringValue = (value / 1000).toFixed(1);
    //$(".panel-success h4").css("color", "red");
    $(".panel-success h4").html("<h4>Compensi "+stringValue+" kWh");
};
var datiPannelli = [
  ["31/12/14",0,1000,756  ],
  ["31/12/14",1,980,1426  ],
  ["31/12/14",2,640,250  ],
  ["30/12/14",0,890,1361  ],
  ["30/12/14",1,870,1900  ],
  ["30/12/14",2,560,833  ],
  ["29/12/14",0,880,453  ],
  ["29/12/14",1,760,1426  ],
  ["29/12/14",2,360,154  ],
  ["28/12/14",0,0,453  ],
  ["28/12/14",1,0,1426  ],
  ["28/12/14",2,0,0  ],
  ["27/12/14",0,50,1211  ],
  ["27/12/14",1,60,1109  ],
  ["27/12/14",2,10,18  ],
  ["26/12/14",0,1280,1058  ],
  ["26/12/14",1,1250,633  ],
  ["26/12/14",2,830,206  ],
  ["25/12/14",0,1160,1361  ],
  ["25/12/14",1,1140,1269  ],
  ["25/12/14",2,730,199  ],
  ["24/12/14",0,910,757  ],
  ["24/12/14",1,890,1901  ],
  ["24/12/14",2,580,197  ],
  ["23/12/14",0,1270,1513  ],
  ["23/12/14",1,1250,2059  ],
  ["23/12/14",2,820,203  ],
  ["22/12/14",0,1400,1210  ],
  ["22/12/14",1,1380,793  ],
  ["22/12/14",2,890,308  ],
  ["21/12/14",0,1320,334  ],
  ["21/12/14",1,1290,634  ],
  ["21/12/14",2,840,213  ],
  ["20/12/14",0,1360,1060  ],
  ["20/12/14",1,1320,1584  ],
  ["20/12/14",2,860,202  ],
  ["19/12/14",0,1280,1059  ],
  ["19/12/14",1,1260,1267  ],
  ["19/12/14",2,820,208  ],
  ["18/12/14",0,1320,1814  ],
  ["18/12/14",1,1300,1584  ],
  ["18/12/14",2,850,227  ],
  ["17/12/14",0,960,1814  ],
  ["17/12/14",1,940,1268  ],
  ["17/12/14",2,610,197  ],
  ["16/12/14",0,140,1210  ],
  ["16/12/14",1,150,634  ],
  ["16/12/14",2,50,26  ],
  ["15/12/14",0,380,1965  ],
  ["15/12/14",1,370,1425  ],
  ["15/12/14",2,210,86  ],
  ["14/12/14",0,420,1814  ],
  ["14/12/14",1,420,794  ],
  ["14/12/14",2,250,152  ],
  ["13/12/14",0,590,1967  ],
  ["13/12/14",1,580,951  ],
  ["13/12/14",2,370,172  ],
  ["12/12/14",0,1110,1816  ],
  ["12/12/14",1,1090,2059  ],
  ["12/12/14",2,710,232  ],
  ["11/12/14",0,1370,1058  ],
  ["11/12/14",1,1350,1109  ],
  ["11/12/14",2,880,236  ],
  ["10/12/14",0,1150,1219  ],
  ["10/12/14",1,1110,1584  ],
  ["10/12/14",2,730,296  ],
  ["09/12/14",0,1500,908  ],
  ["09/12/14",1,1470,633  ],
  ["09/12/14",2,940,222  ],
  ["08/12/14",0,1410,1814  ],
  ["08/12/14",1,1380,794  ],
  ["08/12/14",2,880,221  ],
  ["07/12/14",0,660,1210  ],
  ["07/12/14",1,640,1110  ],
  ["07/12/14",2,400,119  ],
  ["06/12/14",0,820,1059  ],
  ["06/12/14",1,800,635  ],
  ["06/12/14",2,520,163  ],
  ["05/12/14",0,670,1060  ],
  ["05/12/14",1,640,634  ],
  ["05/12/14",2,400,257  ],
  ["04/12/14",0,270,907  ],
  ["04/12/14",1,270,319  ],
  ["04/12/14",2,120,48  ],
  ["03/12/14",0,940,908  ],
  ["03/12/14",1,890,326  ],
  ["03/12/14",2,570,175  ],
  ["02/12/14",0,720,1209  ],
  ["02/12/14",1,700,476  ],
  ["02/12/14",2,440,157  ],
  ["01/12/14",0,30,2116  ],
  ["01/12/14",1,40,1114  ],
  ["01/12/14",2,10,23  ],
  ["30/11/14",0,440,1060  ],
  ["30/11/14",1,420,793  ],
  ["30/11/14",2,250,132  ],
  ["29/11/14",0,1210,610  ],
  ["29/11/14",1,1180,352  ],
  ["29/11/14",2,760,228  ],
  ["28/11/14",0,140,1512  ],
  ["28/11/14",1,140,1584  ],
  ["28/11/14",2,60,75  ],
  ["27/11/14",0,270,1058  ],
  ["27/11/14",1,260,483  ],
  ["27/11/14",2,120,118  ],
  ["26/11/14",0,40,1059  ],
  ["26/11/14",1,50,793  ],
  ["26/11/14",2,0,0  ],
  ["25/11/14",0,1080,908  ],
  ["25/11/14",1,1050,792  ],
  ["25/11/14",2,670,226  ],
  ["24/11/14",0,1460,1210  ],
  ["24/11/14",1,1420,951  ],
  ["24/11/14",2,920,255  ],
  ["23/11/14",0,1860,757  ],
  ["23/11/14",1,1830,635  ],
  ["23/11/14",2,1180,264  ],
  ["22/11/14",0,1900,1210  ],
  ["22/11/14",1,1850,1267  ],
  ["22/11/14",2,1190,476  ],
  ["21/11/14",0,1630,605  ],
  ["21/11/14",1,1600,642  ],
  ["21/11/14",2,1030,253  ],
  ["20/11/14",0,1600,1361  ],
  ["20/11/14",1,1560,1742  ],
  ["20/11/14",2,1020,309  ],
  ["19/11/14",0,2110,1382  ],
  ["19/11/14",1,2070,1601  ],
  ["19/11/14",2,1330,278  ],
  ["18/11/14",0,1810,1361  ],
  ["18/11/14",1,1750,586  ],
  ["18/11/14",2,1110,368  ],
  ["17/11/14",0,480,908  ],
  ["17/11/14",1,470,476  ],
  ["17/11/14",2,270,119  ],
  ["16/11/14",0,1680,1210  ],
  ["16/11/14",1,1630,952  ],
  ["16/11/14",2,1040,309  ],
  ["15/11/14",0,50,1814  ],
  ["15/11/14",1,50,1267  ],
  ["15/11/14",2,0,19  ],
  ["14/11/14",0,1300,592  ],
  ["14/11/14",1,1260,569  ],
  ["14/11/14",2,800,342  ],
  ["13/11/14",0,2080,908  ],
  ["13/11/14",1,2010,635  ],
  ["13/11/14",2,1290,386  ],
  ["12/11/14",0,630,1664  ],
  ["12/11/14",1,610,319  ],
  ["12/11/14",2,370,183  ],
  ["11/11/14",0,540,1361  ],
  ["11/11/14",1,510,1584  ],
  ["11/11/14",2,310,177  ],
  ["10/11/14",0,120,1361  ],
  ["10/11/14",1,120,1109  ],
  ["10/11/14",2,40,61  ],
  ["09/11/14",0,1050,2268  ],
  ["09/11/14",1,1010,1267  ],
  ["09/11/14",2,630,337  ],
  ["08/11/14",0,1500,1512  ],
  ["08/11/14",1,1450,357  ],
  ["08/11/14",2,940,229  ],
  ["07/11/14",0,800,1059  ],
  ["07/11/14",1,760,479  ],
  ["07/11/14",2,480,170  ],
  ["06/11/14",0,150,1814  ],
  ["06/11/14",1,140,1267  ],
  ["06/11/14",2,60,55  ],
  ["05/11/14",0,10,1965  ],
  ["05/11/14",1,10,1427  ],
  ["05/11/14",2,0,0  ],
  ["04/11/14",0,310,1965  ],
  ["04/11/14",1,290,1267  ],
  ["04/11/14",2,160,148  ],
  ["03/11/14",0,1790,756  ],
  ["03/11/14",1,1740,793  ],
  ["03/11/14",2,1130,323  ],
  ["02/11/14",0,2800,1058  ],
  ["02/11/14",1,2740,950  ],
  ["02/11/14",2,1770,343  ],
  ["01/11/14",0,2820,1965  ],
  ["01/11/14",1,2760,950  ],
  ["01/11/14",2,1790,348  ],
  ["31/10/14",0,2940,908  ],
  ["31/10/14",1,2870,635  ],
  ["31/10/14",2,1850,350  ],
  ["30/10/14",0,3010,759  ],
  ["30/10/14",1,2940,635  ],
  ["30/10/14",2,1890,353  ],
  ["29/10/14",0,2910,908  ],
  ["29/10/14",1,2840,951  ],
  ["29/10/14",2,1810,350  ],
  ["28/10/14",0,3030,907  ],
  ["28/10/14",1,2960,792  ],
  ["28/10/14",2,1880,357  ],
  ["27/10/14",0,3210,908  ],
  ["27/10/14",1,3140,592  ],
  ["27/10/14",2,1990,373  ],
  ["26/10/14",0,2960,825  ],
  ["26/10/14",1,2930,950  ],
  ["26/10/14",2,1890,501  ],
  ["25/10/14",0,3140,853  ],
  ["25/10/14",1,3050,951  ],
  ["25/10/14",2,1960,514  ],
  ["24/10/14",0,3550,644  ],
  ["24/10/14",1,3440,1584  ],
  ["24/10/14",2,2180,394  ],
  ["23/10/14",0,3520,665  ],
  ["23/10/14",1,3440,649  ],
  ["23/10/14",2,2180,408  ],
  ["22/10/14",0,3740,909  ],
  ["22/10/14",1,3640,1109  ],
  ["22/10/14",2,2290,410  ],
  ["21/10/14",0,2410,484  ],
  ["21/10/14",1,2330,465  ],
  ["21/10/14",2,1490,292  ],
  ["20/10/14",0,2950,679  ],
  ["20/10/14",1,2880,663  ],
  ["20/10/14",2,1860,417  ],
  ["19/10/14",0,3630,907  ],
  ["19/10/14",1,3530,641  ],
  ["19/10/14",2,2240,406  ],
  ["18/10/14",0,3800,756  ],
  ["18/10/14",1,3710,656  ],
  ["18/10/14",2,2350,413  ],
  ["17/10/14",0,2840,778  ],
  ["17/10/14",1,2720,1109  ],
  ["17/10/14",2,1730,479  ],
  ["16/10/14",0,1850,907  ],
  ["16/10/14",1,1760,398  ],
  ["16/10/14",2,1140,269  ],
  ["15/10/14",0,2700,751  ],
  ["15/10/14",1,2600,726  ],
  ["15/10/14",2,1680,463  ],
  ["14/10/14",0,2770,769  ],
  ["14/10/14",1,2650,747  ],
  ["14/10/14",2,1700,478  ],
  ["13/10/14",0,220,1361  ],
  ["13/10/14",1,210,951  ],
  ["13/10/14",2,110,121  ],
  ["12/10/14",0,3170,786  ],
  ["12/10/14",1,3060,766  ],
  ["12/10/14",2,1920,480  ],
  ["11/10/14",0,1970,662  ],
  ["11/10/14",1,1880,620  ],
  ["11/10/14",2,1190,381  ],
  ["10/10/14",0,3030,1059  ],
  ["10/10/14",1,2920,756  ],
  ["10/10/14",2,1840,474  ],
  ["09/10/14",0,1810,756  ],
  ["09/10/14",1,1710,622  ],
  ["09/10/14",2,1100,388  ],
  ["08/10/14",0,1250,1059  ],
  ["08/10/14",1,1190,951  ],
  ["08/10/14",2,740,379  ],
  ["07/10/14",0,2210,805  ],
  ["07/10/14",1,2120,787  ],
  ["07/10/14",2,1350,492  ],
  ["06/10/14",0,4440,765  ],
  ["06/10/14",1,4300,746  ],
  ["06/10/14",2,2690,466  ],
  ["05/10/14",0,3810,1058  ],
  ["05/10/14",1,3690,746  ],
  ["05/10/14",2,2340,466  ],
  ["04/10/14",0,4450,931  ],
  ["04/10/14",1,4300,912  ],
  ["04/10/14",2,2710,567  ],
  ["03/10/14",0,3970,1361  ],
  ["03/10/14",1,3820,738  ],
  ["03/10/14",2,2380,461  ],
  ["02/10/14",0,4920,805  ],
  ["02/10/14",1,4790,786  ],
  ["02/10/14",2,3020,495  ],
  ["01/10/14",0,1580,908  ],
  ["01/10/14",1,1500,543  ],
  ["01/10/14",2,930,332  ],
  ["30/09/14",0,4060,770  ],
  ["30/09/14",1,3930,749  ],
  ["30/09/14",2,2460,465  ],
  ["29/09/14",0,4970,1210  ],
  ["29/09/14",1,4830,770  ],
  ["29/09/14",2,3030,480  ],
  ["28/09/14",0,4980,867  ],
  ["28/09/14",1,4830,847  ],
  ["28/09/14",2,3020,532  ],
  ["27/09/14",0,5270,827  ],
  ["27/09/14",1,5120,1584  ],
  ["27/09/14",2,3210,505  ],
  ["26/09/14",0,4150,940  ],
  ["26/09/14",1,4020,921  ],
  ["26/09/14",2,2570,574  ],
  ["25/09/14",0,4680,1060  ],
  ["25/09/14",1,4520,859  ],
  ["25/09/14",2,2830,535  ],
  ["24/09/14",0,4550,902  ],
  ["24/09/14",1,4380,885  ],
  ["24/09/14",2,2810,556  ],
  ["23/09/14",0,5780,1210  ],
  ["23/09/14",1,5600,950  ],
  ["23/09/14",2,3500,542  ],
  ["22/09/14",0,5310,884  ],
  ["22/09/14",1,5160,864  ],
  ["22/09/14",2,3240,543  ],
  ["21/09/14",0,5040,1360  ],
  ["21/09/14",1,4910,896  ],
  ["21/09/14",2,3110,554  ],
  ["20/09/14",0,2820,1002  ],
  ["20/09/14",1,2710,977  ],
  ["20/09/14",2,1740,606  ],
  ["19/09/14",0,3520,850  ],
  ["19/09/14",1,3380,1743  ],
  ["19/09/14",2,2180,540  ],
  ["18/09/14",0,3670,992  ],
  ["18/09/14",1,3540,969  ],
  ["18/09/14",2,2240,597  ],
  ["17/09/14",0,3300,986  ],
  ["17/09/14",1,3180,968  ],
  ["17/09/14",2,2010,599  ],
  ["16/09/14",0,5070,1512  ],
  ["16/09/14",1,4930,1153  ],
  ["16/09/14",2,3100,707  ],
  ["15/09/14",0,4920,1133  ],
  ["15/09/14",1,1640,968  ],
  ["15/09/14",2,3020,684  ],
  ["14/09/14",0,6410,925  ],
  ["14/09/14",1,0,0  ],
  ["14/09/14",2,3920,561  ],
  ["13/09/14",0,5490,1260  ],
  ["13/09/14",1,0,0  ],
  ["13/09/14",2,3360,761  ],
  ["12/09/14",0,6150,965  ],
  ["12/09/14",1,0,0  ],
  ["12/09/14",2,3770,593  ],
  ["11/09/14",0,4520,1254  ],
  ["11/09/14",1,0,0  ],
  ["11/09/14",2,2750,753  ],
  ["10/09/14",0,5690,949  ],
  ["10/09/14",1,0,0  ],
  ["10/09/14",2,3480,579  ],
  ["09/09/14",0,5330,1131  ],
  ["09/09/14",1,0,0  ],
  ["09/09/14",2,3290,679  ],
  ["08/09/14",0,6330,939  ],
  ["08/09/14",1,0,0  ],
  ["08/09/14",2,3850,573  ],
  ["07/09/14",0,6490,945  ],
  ["07/09/14",1,0,0  ],
  ["07/09/14",2,3930,576  ],
  ["06/09/14",0,5360,971  ],
  ["06/09/14",1,0,0  ],
  ["06/09/14",2,3270,588  ],
  ["05/09/14",0,3370,1059  ],
  ["05/09/14",1,0,0  ],
  ["05/09/14",2,2080,622  ],
  ["04/09/14",0,1480,1512  ],
  ["04/09/14",1,0,0  ],
  ["04/09/14",2,850,389  ],
  ["03/09/14",0,3490,1055  ],
  ["03/09/14",1,0,0  ],
  ["03/09/14",2,2100,657  ],
  ["02/09/14",0,6230,1106  ],
  ["02/09/14",1,0,0  ],
  ["02/09/14",2,3770,670  ],
  ["01/09/14",0,5690,1460  ],
  ["01/09/14",1,0,0  ],
  ["01/09/14",2,3410,874  ],
  ["31/08/14",0,4890,1194  ],
  ["31/08/14",1,0,0  ],
  ["31/08/14",2,3000,716  ],
  ["30/08/14",0,4040,945  ],
  ["30/08/14",1,0,0  ],
  ["30/08/14",2,2510,577  ],
  ["29/08/14",0,6950,1003  ],
  ["29/08/14",1,0,0  ],
  ["29/08/14",2,4240,609  ],
  ["28/08/14",0,6570,1123  ],
  ["28/08/14",1,0,0  ],
  ["28/08/14",2,3980,685  ],
  ["27/08/14",0,7460,1027  ],
  ["27/08/14",1,0,0  ],
  ["27/08/14",2,4550,626  ],
  ["26/08/14",0,4360,1321  ],
  ["26/08/14",1,0,0  ],
  ["26/08/14",2,2660,792  ],
  ["25/08/14",0,2750,902  ],
  ["25/08/14",1,0,0  ],
  ["25/08/14",2,1690,521  ],
  ["24/08/14",0,7330,1122  ],
  ["24/08/14",1,0,0  ],
  ["24/08/14",2,4480,690  ],
  ["23/08/14",0,2640,1512  ],
  ["23/08/14",1,0,0  ],
  ["23/08/14",2,1580,568  ],
  ["22/08/14",0,4780,1129  ],
  ["22/08/14",1,0,0  ],
  ["22/08/14",2,2930,668  ],
  ["21/08/14",0,7500,1123  ],
  ["21/08/14",1,0,0  ],
  ["21/08/14",2,4540,676  ],
  ["20/08/14",0,5190,2268  ],
  ["20/08/14",1,0,0  ],
  ["20/08/14",2,3160,718  ],
  ["19/08/14",0,1650,453  ],
  ["19/08/14",1,0,0  ],
  ["19/08/14",2,1020,244  ],
  ["18/08/14",0,3680,979  ],
  ["18/08/14",1,0,0  ],
  ["18/08/14",2,2270,598  ],
  ["17/08/14",0,8030,1066  ],
  ["17/08/14",1,0,0  ],
  ["17/08/14",2,4900,653  ],
  ["16/08/14",0,4210,1226  ],
  ["16/08/14",1,0,0  ],
  ["16/08/14",2,2560,728  ],
  ["15/08/14",0,3020,1814  ],
  ["15/08/14",1,0,0  ],
  ["15/08/14",2,1820,665  ],
  ["14/08/14",0,4280,1366  ],
  ["14/08/14",1,0,0  ],
  ["14/08/14",2,2620,808  ],
  ["13/08/14",0,2190,991  ],
  ["13/08/14",1,0,0  ],
  ["13/08/14",2,1320,614  ],
  ["12/08/14",0,6340,1165  ],
  ["12/08/14",1,0,0  ],
  ["12/08/14",2,3870,694  ],
  ["11/08/14",0,5930,1156  ],
  ["11/08/14",1,0,0  ],
  ["11/08/14",2,3680,699  ],
  ["10/08/14",0,7230,1131  ],
  ["10/08/14",1,0,0  ],
  ["10/08/14",2,4370,688  ],
  ["09/08/14",0,3200,824  ],
  ["09/08/14",1,0,0  ],
  ["09/08/14",2,1980,503  ],
  ["08/08/14",0,6770,1199  ],
  ["08/08/14",1,0,0  ],
  ["08/08/14",2,4150,724  ],
  ["07/08/14",0,5930,1199  ],
  ["07/08/14",1,0,0  ],
  ["07/08/14",2,3620,727  ],
  ["06/08/14",0,8220,1080  ],
  ["06/08/14",1,0,0  ],
  ["06/08/14",2,4980,645  ],
  ["05/08/14",0,7190,1240  ],
  ["05/08/14",1,0,0  ],
  ["05/08/14",2,4440,758  ],
  ["04/08/14",0,8530,1110  ],
  ["04/08/14",1,0,0  ],
  ["04/08/14",2,5190,676  ],
  ["03/08/14",0,4600,930  ],
  ["03/08/14",1,0,0  ],
  ["03/08/14",2,2810,577  ],
  ["02/08/14",0,6150,1341  ],
  ["02/08/14",1,0,0  ],
  ["02/08/14",2,3760,790  ],
  ["01/08/14",0,7220,1137  ],
  ["01/08/14",1,0,0  ],
  ["01/08/14",2,4380,698  ],
  ["31/07/14",0,5530,1181  ],
  ["31/07/14",1,5260,1131  ],
  ["31/07/14",2,3390,720  ],
  ["30/07/14",0,3720,911  ],
  ["30/07/14",1,3550,881  ],
  ["30/07/14",2,2250,549  ],
  ["29/07/14",0,3230,610  ],
  ["29/07/14",1,3090,595  ],
  ["29/07/14",2,1980,376  ],
  ["28/07/14",0,6210,1285  ],
  ["28/07/14",1,5960,1252  ],
  ["28/07/14",2,3790,781  ],
  ["27/07/14",0,5230,1330  ],
  ["27/07/14",1,5030,1295  ],
  ["27/07/14",2,3220,801  ],
  ["26/07/14",0,1610,769  ],
  ["26/07/14",1,1510,737  ],
  ["26/07/14",2,1000,473  ],
  ["25/07/14",0,7590,1362  ],
  ["25/07/14",1,7330,1224  ],
  ["25/07/14",2,4650,764  ],
  ["24/07/14",0,3290,747  ],
  ["24/07/14",1,3130,724  ],
  ["24/07/14",2,2020,459  ],
  ["23/07/14",0,7540,1331  ],
  ["23/07/14",1,7280,1296  ],
  ["23/07/14",2,4590,815  ],
  ["22/07/14",0,7570,1335  ],
  ["22/07/14",1,7310,1306  ],
  ["22/07/14",2,4680,815  ],
  ["21/07/14",0,980,1210  ],
  ["21/07/14",1,920,951  ],
  ["21/07/14",2,590,311  ],
  ["20/07/14",0,4850,1044  ],
  ["20/07/14",1,4660,998  ],
  ["20/07/14",2,2940,646  ],
  ["19/07/14",0,8930,1132  ],
  ["19/07/14",1,8590,1097  ],
  ["19/07/14",2,5410,689  ],
  ["18/07/14",0,9250,1121  ],
  ["18/07/14",1,8960,1093  ],
  ["18/07/14",2,5620,682  ],
  ["17/07/14",0,9330,1131  ],
  ["17/07/14",1,9010,1101  ],
  ["17/07/14",2,5640,690  ],
  ["16/07/14",0,9620,1663  ],
  ["16/07/14",1,9300,1092  ],
  ["16/07/14",2,5820,684  ],
  ["15/07/14",0,8750,1361  ],
  ["15/07/14",1,8480,1130  ],
  ["15/07/14",2,5330,712  ],
  ["14/07/14",0,7130,1188  ],
  ["14/07/14",1,6830,1138  ],
  ["14/07/14",2,4360,713  ],
  ["13/07/14",0,7840,1414  ],
  ["13/07/14",1,7580,1373  ],
  ["13/07/14",2,4840,857  ],
  ["12/07/14",0,7250,1278  ],
  ["12/07/14",1,7050,1246  ],
  ["12/07/14",2,4470,778  ],
  ["11/07/14",0,9690,1218  ],
  ["11/07/14",1,9380,1180  ],
  ["11/07/14",2,5900,744  ],
  ["10/07/14",0,8400,1248  ],
  ["10/07/14",1,8110,1225  ],
  ["10/07/14",2,5110,762  ],
  ["09/07/14",0,4790,1172  ],
  ["09/07/14",1,4580,1171  ],
  ["09/07/14",2,2930,738  ],
  ["08/07/14",0,2830,1209  ],
  ["08/07/14",1,2690,634  ],
  ["08/07/14",2,1760,408  ],
  ["07/07/14",0,7260,1218  ],
  ["07/07/14",1,7020,1183  ],
  ["07/07/14",2,4430,742  ],
  ["06/07/14",0,8640,1198  ],
  ["06/07/14",1,8320,1149  ],
  ["06/07/14",2,5210,713  ],
  ["05/07/14",0,8450,1148  ],
  ["05/07/14",1,8150,1110  ],
  ["05/07/14",2,5140,697  ],
  ["04/07/14",0,6100,1094  ],
  ["04/07/14",1,5900,1072  ],
  ["04/07/14",2,3800,672  ],
  ["03/07/14",0,9440,1361  ],
  ["03/07/14",1,9130,1121  ],
  ["03/07/14",2,5740,697  ],
  ["02/07/14",0,4120,1218  ],
  ["02/07/14",1,3940,1178  ],
  ["02/07/14",2,2540,739  ],
  ["01/07/14",0,6350,1462  ],
  ["01/07/14",1,6120,1430  ],
  ["01/07/14",2,3930,877  ],
  ["30/06/14",0,7970,1293  ],
  ["30/06/14",1,7710,1265  ],
  ["30/06/14",2,4890,799  ],
  ["29/06/14",0,3680,1031  ],
  ["29/06/14",1,3520,1005  ],
  ["29/06/14",2,2280,634  ],
  ["28/06/14",0,6240,1386  ],
  ["28/06/14",1,6000,1354  ],
  ["28/06/14",2,3800,836  ],
  ["27/06/14",0,6110,1389  ],
  ["27/06/14",1,5880,1335  ],
  ["27/06/14",2,3740,836  ],
  ["26/06/14",0,6260,1380  ],
  ["26/06/14",1,6060,1351  ],
  ["26/06/14",2,3840,837  ],
  ["25/06/14",0,5420,1531  ],
  ["25/06/14",1,5200,1504  ],
  ["25/06/14",2,3280,929  ],
  ["24/06/14",0,6900,1195  ],
  ["24/06/14",1,6640,1184  ],
  ["24/06/14",2,4260,739  ],
  ["23/06/14",0,7190,1185  ],
  ["23/06/14",1,7020,1165  ],
  ["23/06/14",2,4460,745  ],
  ["22/06/14",0,9090,1324  ],
  ["22/06/14",1,8770,1287  ],
  ["22/06/14",2,5500,796  ],
  ["21/06/14",0,10100,1286  ],
  ["21/06/14",1,9730,1248  ],
  ["21/06/14",2,6100,782  ],
  ["20/06/14",0,6190,1212  ],
  ["20/06/14",1,5920,1180  ],
  ["20/06/14",2,3810,734  ],
  ["19/06/14",0,9260,1267  ],
  ["19/06/14",1,8900,1238  ],
  ["19/06/14",2,5610,771  ],
  ["18/06/14",0,6440,1286  ],
  ["18/06/14",1,6170,1249  ],
  ["18/06/14",2,3940,774  ],
  ["17/06/14",0,8690,1416  ],
  ["17/06/14",1,8390,1373  ],
  ["17/06/14",2,5280,851  ],
  ["16/06/14",0,6640,1444  ],
  ["16/06/14",1,6360,1408  ],
  ["16/06/14",2,4050,866  ],
  ["15/06/14",0,4220,1222  ],
  ["15/06/14",1,4020,1177  ],
  ["15/06/14",2,2580,725  ],
  ["14/06/14",0,7130,1247  ],
  ["14/06/14",1,6860,1221  ],
  ["14/06/14",2,4380,758  ],
  ["13/06/14",0,7260,1439  ],
  ["13/06/14",1,6970,1400  ],
  ["13/06/14",2,4400,855  ],
  ["12/06/14",0,7750,1189  ],
  ["12/06/14",1,7450,1167  ],
  ["12/06/14",2,4730,728  ],
  ["11/06/14",0,9020,1118  ],
  ["11/06/14",1,8670,1080  ],
  ["11/06/14",2,5470,683  ],
  ["10/06/14",0,9040,1209  ],
  ["10/06/14",1,8730,1054  ],
  ["10/06/14",2,5440,663  ],
  ["09/06/14",0,7530,1083  ],
  ["09/06/14",1,7270,1044  ],
  ["09/06/14",2,4540,657  ],
  ["08/06/14",0,9280,1091  ],
  ["08/06/14",1,8980,1065  ],
  ["08/06/14",2,5620,665  ],
  ["07/06/14",0,9320,1111  ],
  ["07/06/14",1,9010,1085  ],
  ["07/06/14",2,5670,675  ],
  ["06/06/14",0,9280,1221  ],
  ["06/06/14",1,8990,1185  ],
  ["06/06/14",2,5680,742  ],
  ["05/06/14",0,9130,1293  ],
  ["05/06/14",1,8830,1265  ],
  ["05/06/14",2,5580,777  ],
  ["04/06/14",0,4640,1154  ],
  ["04/06/14",1,4450,1119  ],
  ["04/06/14",2,2880,701  ],
  ["03/06/14",0,6650,1346  ],
  ["03/06/14",1,6410,1310  ],
  ["03/06/14",2,4070,800  ],
  ["02/06/14",0,6310,1376  ],
  ["02/06/14",1,6030,1307  ],
  ["02/06/14",2,3840,814  ],
  ["01/06/14",0,6780,1241  ],
  ["01/06/14",1,6520,1214  ],
  ["01/06/14",2,4170,754  ],
  ["31/05/14",0,9680,1222  ],
  ["31/05/14",1,9370,1189  ],
  ["31/05/14",2,5890,743  ],
  ["30/05/14",0,5700,1305  ],
  ["30/05/14",1,5460,1259  ],
  ["30/05/14",2,3500,778  ],
  ["29/05/14",0,9280,1302  ],
  ["29/05/14",1,8990,1274  ],
  ["29/05/14",2,5670,789  ],
  ["28/05/14",0,7560,1363  ],
  ["28/05/14",1,7340,1317  ],
  ["28/05/14",2,4640,817  ],
  ["27/05/14",0,4690,1205  ],
  ["27/05/14",1,4480,1178  ],
  ["27/05/14",2,2880,739  ],
  ["26/05/14",0,2810,1512  ],
  ["26/05/14",1,2660,597  ],
  ["26/05/14",2,1730,377  ],
  ["25/05/14",0,8740,1512  ],
  ["25/05/14",1,8470,1233  ],
  ["25/05/14",2,5320,762  ],
  ["24/05/14",0,9480,1182  ],
  ["24/05/14",1,9190,1148  ],
  ["24/05/14",2,5760,721  ],
  ["23/05/14",0,3670,1348  ],
  ["23/05/14",1,3520,1323  ],
  ["23/05/14",2,2170,813  ],
  ["22/05/14",0,7560,1360  ],
  ["22/05/14",1,7280,1025  ],
  ["22/05/14",2,4600,639  ],
  ["21/05/14",0,8010,1271  ],
  ["21/05/14",1,7740,1225  ],
  ["21/05/14",2,4880,770  ],
  ["20/05/14",0,7350,1329  ],
  ["20/05/14",1,7120,1291  ],
  ["20/05/14",2,4500,797  ],
  ["19/05/14",0,5830,1291  ],
  ["19/05/14",1,5600,1250  ],
  ["19/05/14",2,3530,771  ],
  ["18/05/14",0,8030,1265  ],
  ["18/05/14",1,7790,1240  ],
  ["18/05/14",2,4900,775  ],
  ["17/05/14",0,8340,1355  ],
  ["17/05/14",1,8110,1340  ],
  ["17/05/14",2,5140,847  ],
  ["16/05/14",0,3430,1123  ],
  ["16/05/14",1,3310,1090  ],
  ["16/05/14",2,2130,681  ],
  ["15/05/14",0,8450,1232  ],
  ["15/05/14",1,8160,1201  ],
  ["15/05/14",2,5220,747  ],
  ["14/05/14",0,8490,1292  ],
  ["14/05/14",1,8210,1267  ],
  ["14/05/14",2,5180,786  ],
  ["13/05/14",0,7150,1294  ],
  ["13/05/14",1,6930,1267  ],
  ["13/05/14",2,4400,805  ],
  ["12/05/14",0,7540,1340  ],
  ["12/05/14",1,7290,1302  ],
  ["12/05/14",2,4640,797  ],
  ["11/05/14",0,3860,2419  ],
  ["11/05/14",1,3710,1425  ],
  ["11/05/14",2,2390,644  ],
  ["10/05/14",0,7240,1248  ],
  ["10/05/14",1,7030,1218  ],
  ["10/05/14",2,4510,755  ],
  ["09/05/14",0,8120,1114  ],
  ["09/05/14",1,7840,1086  ],
  ["09/05/14",2,5000,683  ],
  ["08/05/14",0,7800,1210  ],
  ["08/05/14",1,7570,1122  ],
  ["08/05/14",2,4820,701  ],
  ["07/05/14",0,1780,1058  ],
  ["07/05/14",1,1700,444  ],
  ["07/05/14",2,1090,291  ],
  ["06/05/14",0,6910,1181  ],
  ["06/05/14",1,6710,1149  ],
  ["06/05/14",2,4310,719  ],
  ["05/05/14",0,8410,1122  ],
  ["05/05/14",1,8130,1091  ],
  ["05/05/14",2,5140,685  ],
  ["04/05/14",0,8890,1131  ],
  ["04/05/14",1,8620,1109  ],
  ["04/05/14",2,5430,693  ],
  ["03/05/14",0,4580,1051  ],
  ["03/05/14",1,4410,1033  ],
  ["03/05/14",2,2820,650  ],
  ["02/05/14",0,1380,458  ],
  ["02/05/14",1,1300,350  ],
  ["02/05/14",2,840,232  ],
  ["01/05/14",0,5320,1231  ],
  ["01/05/14",1,5140,1209  ],
  ["01/05/14",2,3320,767  ],
  ["30/04/14",0,620,907  ],
  ["30/04/14",1,590,192  ],
  ["30/04/14",2,330,129  ],
  ["29/04/14",0,5440,1263  ],
  ["29/04/14",1,5230,1228  ],
  ["29/04/14",2,3390,767  ],
  ["28/04/14",0,1120,756  ],
  ["28/04/14",1,1060,792  ],
  ["28/04/14",2,690,188  ],
  ["27/04/14",0,990,1059  ],
  ["27/04/14",1,940,635  ],
  ["27/04/14",2,600,193  ],
  ["26/04/14",0,5490,1664  ],
  ["26/04/14",1,5330,1153  ],
  ["26/04/14",2,3340,715  ],
  ["25/04/14",0,7440,1031  ],
  ["25/04/14",1,7190,998  ],
  ["25/04/14",2,4560,625  ],
  ["24/04/14",0,7300,1212  ],
  ["24/04/14",1,7050,1148  ],
  ["24/04/14",2,4410,713  ],
  ["23/04/14",0,4890,1015  ],
  ["23/04/14",1,4720,972  ],
  ["23/04/14",2,3070,636  ],
  ["22/04/14",0,7210,1223  ],
  ["22/04/14",1,6990,1192  ],
  ["22/04/14",2,4420,739  ],
  ["21/04/14",0,940,1361  ],
  ["21/04/14",1,900,477  ],
  ["21/04/14",2,570,191  ],
  ["20/04/14",0,4400,1119  ],
  ["20/04/14",1,4250,1101  ],
  ["20/04/14",2,2740,689  ],
  ["19/04/14",0,2050,1058  ],
  ["19/04/14",1,1940,753  ],
  ["19/04/14",2,1250,463  ],
  ["18/04/14",0,3970,922  ],
  ["18/04/14",1,3840,884  ],
  ["18/04/14",2,2490,578  ],
  ["17/04/14",0,7420,1026  ],
  ["17/04/14",1,7170,1267  ],
  ["17/04/14",2,4540,624  ],
  ["16/04/14",0,7460,1035  ],
  ["16/04/14",1,7230,1109  ],
  ["16/04/14",2,4600,636  ],
  ["15/04/14",0,7360,1089  ],
  ["15/04/14",1,7110,1060  ],
  ["15/04/14",2,4500,669  ],
  ["14/04/14",0,6530,961  ],
  ["14/04/14",1,6320,938  ],
  ["14/04/14",2,4000,588  ],
  ["13/04/14",0,4390,1059  ],
  ["13/04/14",1,4220,1006  ],
  ["13/04/14",2,2690,628  ],
  ["12/04/14",0,4110,941  ],
  ["12/04/14",1,3920,1267  ],
  ["12/04/14",2,2560,586  ],
  ["11/04/14",0,6560,971  ],
  ["11/04/14",1,6330,945  ],
  ["11/04/14",2,4030,595  ],
  ["10/04/14",0,6870,1814  ],
  ["10/04/14",1,6670,1425  ],
  ["10/04/14",2,4240,600  ],
  ["09/04/14",0,6690,990  ],
  ["09/04/14",1,6500,966  ],
  ["09/04/14",2,4140,612  ],
  ["08/04/14",0,3920,953  ],
  ["08/04/14",1,3770,919  ],
  ["08/04/14",2,2450,566  ],
  ["07/04/14",0,6480,922  ],
  ["07/04/14",1,6270,893  ],
  ["07/04/14",2,3970,561  ],
  ["06/04/14",0,5510,958  ],
  ["06/04/14",1,5300,922  ],
  ["06/04/14",2,3390,572  ],
  ["05/04/14",0,2340,1210  ],
  ["05/04/14",1,2220,767  ],
  ["05/04/14",2,1460,487  ],
  ["04/04/14",0,3310,936  ],
  ["04/04/14",1,3180,877  ],
  ["04/04/14",2,2090,577  ],
  ["03/04/14",0,2200,756  ],
  ["03/04/14",1,2090,356  ],
  ["03/04/14",2,1350,229  ],
  ["02/04/14",0,5630,1003  ],
  ["02/04/14",1,5440,980  ],
  ["02/04/14",2,3490,617  ],
  ["01/04/14",0,5650,1060  ],
  ["01/04/14",1,5470,884  ],
  ["01/04/14",2,3500,561  ],
  ["31/03/14",0,6020,888  ],
  ["31/03/14",1,5810,867  ],
  ["31/03/14",2,3690,548  ],
  ["30/03/14",0,6120,1663  ],
  ["30/03/14",1,5940,951  ],
  ["30/03/14",2,3770,563  ],
  ["29/03/14",0,6250,925  ],
  ["29/03/14",1,6070,910  ],
  ["29/03/14",2,3850,573  ],
  ["28/03/14",0,6300,939  ],
  ["28/03/14",1,6110,918  ],
  ["28/03/14",2,3860,580  ],
  ["27/03/14",0,4020,1001  ],
  ["27/03/14",1,3870,970  ],
  ["27/03/14",2,2490,610  ],
  ["26/03/14",0,4640,1043  ],
  ["26/03/14",1,4470,1018  ],
  ["26/03/14",2,2860,637  ],
  ["25/03/14",0,4220,1095  ],
  ["25/03/14",1,4100,1061  ],
  ["25/03/14",2,2670,657  ],
  ["24/03/14",0,4190,1210  ],
  ["24/03/14",1,4070,951  ],
  ["24/03/14",2,2610,581  ],
  ["23/03/14",0,970,1512  ],
  ["23/03/14",1,930,1585  ],
  ["23/03/14",2,600,340  ],
  ["22/03/14",0,970,757  ],
  ["22/03/14",1,940,475  ],
  ["22/03/14",2,600,234  ],
  ["21/03/14",0,4480,820  ],
  ["21/03/14",1,4330,781  ],
  ["21/03/14",2,2820,503  ],
  ["20/03/14",0,5130,813  ],
  ["20/03/14",1,4970,792  ],
  ["20/03/14",2,3170,500  ],
  ["19/03/14",0,5380,871  ],
  ["19/03/14",1,5220,851  ],
  ["19/03/14",2,3330,542  ],
  ["18/03/14",0,4990,844  ],
  ["18/03/14",1,4870,950  ],
  ["18/03/14",2,3160,526  ],
  ["17/03/14",0,5580,863  ],
  ["17/03/14",1,5430,1584  ],
  ["17/03/14",2,3460,532  ],
  ["16/03/14",0,5480,850  ],
  ["16/03/14",1,5340,951  ],
  ["16/03/14",2,3420,524  ],
  ["15/03/14",0,4030,818  ],
  ["15/03/14",1,3910,792  ],
  ["15/03/14",2,2600,531  ],
  ["14/03/14",0,5050,1059  ],
  ["14/03/14",1,4910,951  ],
  ["14/03/14",2,3140,504  ],
  ["13/03/14",0,5080,907  ],
  ["13/03/14",1,4930,1267  ],
  ["13/03/14",2,3150,502  ],
  ["12/03/14",0,5140,824  ],
  ["12/03/14",1,5010,951  ],
  ["12/03/14",2,3200,512  ],
  ["11/03/14",0,4240,832  ],
  ["11/03/14",1,4110,812  ],
  ["11/03/14",2,2690,536  ],
  ["10/03/14",0,4370,908  ],
  ["10/03/14",1,4260,804  ],
  ["10/03/14",2,2730,513  ],
  ["09/03/14",0,5010,1058  ],
  ["09/03/14",1,4870,1267  ],
  ["09/03/14",2,3100,498  ],
  ["08/03/14",0,4990,927  ],
  ["08/03/14",1,4850,1109  ],
  ["08/03/14",2,3080,496  ],
  ["07/03/14",0,4910,805  ],
  ["07/03/14",1,4770,793  ],
  ["07/03/14",2,3040,496  ],
  ["06/03/14",0,4860,1362  ],
  ["06/03/14",1,4740,836  ],
  ["06/03/14",2,3010,528  ],
  ["05/03/14",0,3470,1362  ],
  ["05/03/14",1,3380,793  ],
  ["05/03/14",2,2210,509  ],
  ["04/03/14",0,2250,1060  ],
  ["04/03/14",1,2150,734  ],
  ["04/03/14",2,1410,462  ],
  ["03/03/14",0,1160,1209  ],
  ["03/03/14",1,1110,634  ],
  ["03/03/14",2,710,243  ],
  ["02/03/14",0,1720,1512  ],
  ["02/03/14",1,1650,660  ],
  ["02/03/14",2,1080,413  ],
  ["01/03/14",0,630,1210  ],
  ["01/03/14",1,610,477  ],
  ["01/03/14",2,380,166  ],
  ["28/02/14",0,2810,1029  ],
  ["28/02/14",1,2730,1008  ],
  ["28/02/14",2,1750,625  ],
  ["27/02/14",0,3010,1513  ],
  ["27/02/14",1,2910,836  ],
  ["27/02/14",2,1850,522  ],
  ["26/02/14",0,1440,907  ],
  ["26/02/14",1,1390,617  ],
  ["26/02/14",2,900,396  ],
  ["25/02/14",0,3890,756  ],
  ["25/02/14",1,3780,1109  ],
  ["25/02/14",2,2410,442  ],
  ["24/02/14",0,4140,1211  ],
  ["24/02/14",1,4030,1109  ],
  ["24/02/14",2,2560,447  ],
  ["23/02/14",0,4160,1209  ],
  ["23/02/14",1,4050,1900  ],
  ["23/02/14",2,2570,779  ],
  ["22/02/14",0,1930,1361  ],
  ["22/02/14",1,1860,809  ],
  ["22/02/14",2,1200,502  ],
  ["21/02/14",0,2920,908  ],
  ["21/02/14",1,2820,856  ],
  ["21/02/14",2,1800,529  ],
  ["20/02/14",0,1600,756  ],
  ["20/02/14",1,1520,528  ],
  ["20/02/14",2,970,336  ],
  ["19/02/14",0,250,1965  ],
  ["19/02/14",1,240,1269  ],
  ["19/02/14",2,120,92  ],
  ["18/02/14",0,2810,702  ],
  ["18/02/14",1,2710,656  ],
  ["18/02/14",2,1790,453  ],
  ["17/02/14",0,670,1211  ],
  ["17/02/14",1,640,1742  ],
  ["17/02/14",2,410,136  ],
  ["16/02/14",0,100,1361  ],
  ["16/02/14",1,100,636  ],
  ["16/02/14",2,40,54  ],
  ["15/02/14",0,960,2116  ],
  ["15/02/14",1,930,1902  ],
  ["15/02/14",2,610,143  ],
  ["14/02/14",0,3480,654  ],
  ["14/02/14",1,3390,1900  ],
  ["14/02/14",2,2170,408  ],
  ["13/02/14",0,1770,1058  ],
  ["13/02/14",1,1730,952  ],
  ["13/02/14",2,1140,344  ],
  ["12/02/14",0,3120,907  ],
  ["12/02/14",1,3040,1584  ],
  ["12/02/14",2,1960,596  ],
  ["11/02/14",0,2420,1512  ],
  ["11/02/14",1,2320,951  ],
  ["11/02/14",2,1500,436  ],
  ["10/02/14",0,110,1512  ],
  ["10/02/14",1,120,952  ],
  ["10/02/14",2,50,21  ],
  ["09/02/14",0,1490,1365  ],
  ["09/02/14",1,1430,1268  ],
  ["09/02/14",2,940,373  ],
  ["08/02/14",0,1390,1209  ],
  ["08/02/14",1,1340,1109  ],
  ["08/02/14",2,890,293  ],
  ["07/02/14",0,380,1360  ],
  ["07/02/14",1,380,1109  ],
  ["07/02/14",2,220,170  ],
  ["06/02/14",0,3020,908  ],
  ["06/02/14",1,2940,634  ],
  ["06/02/14",2,1890,364  ],
  ["05/02/14",0,1040,1514  ],
  ["05/02/14",1,990,634  ],
  ["05/02/14",2,660,228  ],
  ["04/02/14",0,220,1512  ],
  ["04/02/14",1,220,1267  ],
  ["04/02/14",2,110,56  ],
  ["03/02/14",0,620,1512  ],
  ["03/02/14",1,600,792  ],
  ["03/02/14",2,390,98  ],
  ["02/02/14",0,370,908  ],
  ["02/02/14",1,360,162  ],
  ["02/02/14",2,210,101  ],
  ["01/02/14",0,280,1360  ],
  ["01/02/14",1,340,1742  ],
  ["01/02/14",2,260,239  ],
  ["31/01/14",0,0,756  ],
  ["31/01/14",1,10,1900  ],
  ["31/01/14",2,0,0  ],
  ["30/01/14",0,120,1060  ],
  ["30/01/14",1,120,1110  ],
  ["30/01/14",2,50,22  ],
  ["29/01/14",0,1960,1061  ],
  ["29/01/14",1,1910,793  ],
  ["29/01/14",2,1240,343  ],
  ["28/01/14",0,1650,1059  ],
  ["28/01/14",1,1600,950  ],
  ["28/01/14",2,1030,329  ],
  ["27/01/14",0,1540,1058  ],
  ["27/01/14",1,1490,1425  ],
  ["27/01/14",2,980,397  ],
  ["26/01/14",0,2420,1058  ],
  ["26/01/14",1,2370,950  ],
  ["26/01/14",2,1540,316  ],
  ["25/01/14",0,2390,1058  ],
  ["25/01/14",1,2340,792  ],
  ["25/01/14",2,1520,318  ],
  ["24/01/14",0,980,909  ],
  ["24/01/14",1,960,1109  ],
  ["24/01/14",2,620,240  ],
  ["23/01/14",0,800,1209  ],
  ["23/01/14",1,780,476  ],
  ["23/01/14",2,500,184  ],
  ["22/01/14",0,1940,1512  ],
  ["22/01/14",1,1910,1109  ],
  ["22/01/14",2,1240,311  ],
  ["21/01/14",0,1770,498  ],
  ["21/01/14",1,1730,634  ],
  ["21/01/14",2,1140,306  ],
  ["20/01/14",0,1190,1213  ],
  ["20/01/14",1,1150,509  ],
  ["20/01/14",2,750,336  ],
  ["19/01/14",0,390,1664  ],
  ["19/01/14",1,390,1584  ],
  ["19/01/14",2,230,84  ],
  ["18/01/14",0,210,1361  ],
  ["18/01/14",1,200,1108  ],
  ["18/01/14",2,100,61  ],
  ["17/01/14",0,30,1362  ],
  ["17/01/14",1,40,1110  ],
  ["17/01/14",2,0,8  ],
  ["16/01/14",0,1120,756  ],
  ["16/01/14",1,1090,1109  ],
  ["16/01/14",2,710,245  ],
  ["15/01/14",0,2060,2116  ],
  ["15/01/14",1,2010,1108  ],
  ["15/01/14",2,1320,279  ],
  ["14/01/14",0,50,1814  ],
  ["14/01/14",1,50,1901  ],
  ["14/01/14",2,10,21  ],
  ["13/01/14",0,1420,1362  ],
  ["13/01/14",1,1410,1900  ],
  ["13/01/14",2,910,262  ],
  ["12/01/14",0,1840,606  ],
  ["12/01/14",1,1790,1267  ],
  ["12/01/14",2,1170,260  ],
  ["11/01/14",0,360,1210  ],
  ["11/01/14",1,360,794  ],
  ["11/01/14",2,200,92  ],
  ["10/01/14",0,1450,756  ],
  ["10/01/14",1,1400,795  ],
  ["10/01/14",2,900,363  ],
  ["09/01/14",0,1550,1512  ],
  ["09/01/14",1,1510,792  ],
  ["09/01/14",2,990,310  ],
  ["08/01/14",0,1490,907  ],
  ["08/01/14",1,1440,477  ],
  ["08/01/14",2,950,243  ],
  ["07/01/14",0,1220,1361  ],
  ["07/01/14",1,1190,1427  ],
  ["07/01/14",2,780,338  ],
  ["06/01/14",0,1680,1361  ],
  ["06/01/14",1,1630,1742  ],
  ["06/01/14",2,1050,287  ],
  ["05/01/14",0,50,1362  ],
  ["05/01/14",1,60,1109  ],
  ["05/01/14",2,10,50  ],
  ["04/01/14",0,10,1814  ],
  ["04/01/14",1,20,1269  ],
  ["04/01/14",2,10,15  ],
  ["03/01/14",0,650,1512  ],
  ["03/01/14",1,610,635  ],
  ["03/01/14",2,330,118  ],
  ["02/01/14",0,0,1210  ],
  ["02/01/14",1,0,1267  ],
  ["02/01/14",2,0,0  ],
  ["01/01/14",0,1490,1512  ],
  ["01/01/14",1,1460,792  ],
  ["01/01/14",2,950,241  ]
];