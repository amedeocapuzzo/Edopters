<?php
    session_start(); 
    include "../DB/config.php";
    if(empty($_SESSION['user_id'])){ 
        header('location: ../');
    }
    ?>
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Energy</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Styles -->
    <link href="../css/bootstrap.css" rel="stylesheet">
    <link href="../css/mycss.css" rel="stylesheet">
    <link href="../css/bootstrap-responsive.css" rel="stylesheet">
    <link href="../css/owl.carousel.css" rel="stylesheet">
    <link href="../css/owl.theme.css" rel="stylesheet">

    <!-- Favicon -->
    <link rel="shortcut icon" href="image/favicon.png">

    <!-- JQuery -->
    <script type="text/javascript" src="../js/jquery.js"></script>

    <script type="text/javascript" src="../js/torta.js"></script>
    <script type="text/javascript" src="../js/canvasjs.js"></script>
    <script type="text/javascript" src="../js/owl.carousel.js"></script>
    
      <!--Endev-->
    <script src="http://www.endevjs.org/endev.full.js"></script>

    
    <!-- Delete selection -->
    <script>document.onselectstart = new Function("return false")</script>
    <script type="text/javascript">
        $(document).ready(main);
          var select_color = "<?php echo col . $_SESSION['user_id'][6];?>";
          var crediti = <?php echo $_SESSION['user_id'][7];?>;

          

          var updateColor = function(){
            var num = <?php echo $_SESSION['user_id'][6];?>;

            var array = ["#27ae60", "#2980b9", "#8e44ad", "#d35400", "#c0392b"];

            var nextColor = array[num];

            $(".sfondo").css("background", "-webkit-linear-gradient(" +nextColor+ ", transparent)");
            $(".sfondo").css("background", "-o-linear-gradient("+nextColor+", transparent)");
            $(".sfondo").css("background", "-moz-linear-gradient("+nextColor+", transparent)");
            $(".sfondo").css("background", "linear-gradient("+nextColor+", transparent)");

            $(".panel").css("border-color", nextColor);
            $(".panel .panel-heading").css("background-color", nextColor);
            $(".panel .panel-heading").css("color", "#fff");

            $(".list-group p.list-group-item").css("background-color", nextColor);
            $(".list-group p.list-group-item").css("border-color", nextColor);
            $(".list-group p.list-group-item").css("color", "#fff");

            $(".list-group a").css("color", "#000");
            $(".list-group h4").css("color", "#000");


            $("img.user").css("background-color", nextColor);



          }


            var main = function(){          updateColor();
            $('#lista_utenti a').click(function(){

              var chart = new CanvasJS.Chart("modal_torta_container",
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
                    {  y: parseInt($(this).attr("consum")), label: "Consumi", color: "#e74c3c",  },
                    {  y: parseInt($(this).attr("compens")), label: "Compensi", color: "#2ecc71" }
                  ]
                }
                ]
              });
              chart.render();


              $("#usermodal_title").text($(this).attr("title"));
              $("#usermodal_avatar").attr("src", "../images/" + $(this).attr("id"));

              $("#usermodal_compensi").text("Compensi: " + $(this).attr("compens"));
              $("#usermodal_consumi").text("Compensi: " + $(this).attr("consum"));


                $('#usermodal').modal('show');
            });


            $("#compare").click(function(){
                window.location.href = '../compare/';
            });

             $("#owl-demo").owlCarousel({
             
                  navigation : true, // Show next and prev buttons
                  slideSpeed : 300,
                  paginationSpeed : 400,
                  singleItem:true
             
                  // "singleItem:true" is a shortcut for:
                  // items : 1, 
                  // itemsDesktop : false,
                  // itemsDesktopSmall : false,
                  // itemsTablet: false,
                  // itemsMobile : false
             
              });

             $("#f1_card").click(function(){
                $('#settingsmodal').modal('show');
             });

             $('#settingsmodal div.color').hover(function(){
                $(this).css("-webkit-filter", "grayscale(0%)");
             });

             $('#settingsmodal div.color').mouseleave(function(){
                if($(this).attr('id') != select_color)
                  $(this).css("-webkit-filter", "grayscale(100%)");
             });

             $('#settingsmodal div.color').click(function(){
              select_color = $(this).attr('id');
                for(i = 0; i < 5; i++)
                  $("#col"+i).css("-webkit-filter", "grayscale(100%)");
                $(this).css("-webkit-filter", "grayscale(0%)");
                $("#settings_color").val($(this).attr('id'));
             });


          $("#<?php echo col . $_SESSION['user_id'][6];?>").css("-webkit-filter", "grayscale(0%)");
         };
</script>



<script type="text/javascript">

 

</script>


   
</head>
<body>
    <div class="sfondo"></div>
    

    <div class="container" ng-controller = "DrawCtrl"
         use = "https://raw.githubusercontent.com/filipkis/endev/master/examples/data-tables/civis-user.xml"
         data-from = "civis.user user" 
         data-where = "user.userID = '<?php echo $_SESSION['user_id'][0];?>' AND user.token = '<?php echo $_SESSION['user_id'][1];?>'"data-provider="yql">
        <div class="row rowcontainer">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="panel panel-default user">
                    <div class="panel-body user_body">
                        <center>
                            <div id="f1_container">
                                <div id="f1_card" class="shadow">
                                  <div class="front face">
                                    <img class="user" src="../images/<?php echo $_SESSION['user_id'][5];?>"/>
                                  </div>
                                  <div class="back face center">
                                    <img class="user" src="../images/settings.png"/>
                                  </div>
                                </div>
                                </div>
                            
                            <h2>Welcome <?php echo $_SESSION['user_id'][4];?>!</h2>
                        </center>

                        <div class="row" style="padding-left:15px; margin-top:-40px">
                            <div class="col-md-8">
                                <div class="panel torta" id="panel_torta">
                                    <div class="panel-heading">Status</div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div id="torta_container" class="grafico"></div>
                                                <h4 class="title">Ecco il Grafico dei tuoi consumi e compensi dell'ultimo mese</h4>
                                            </div>
                                            <div class="col-md-6"
                                                  use="https://raw.githubusercontent.com/filipkis/endev/master/examples/data-tables/civis.xml"
                                                  data-from = "civis.IntervalReading reading"
                                                  data-where = "reading.userID = user.userID AND reading.token = user.token AND reading.from = '01-Apr-13 00:00 AM' AND reading.to = '30-Apr-13 00:00 AM' AND reading.res = 'monthly'"
                                                data-provider = "yql">
                                                <div class="panel panel-success" style="width:100%">
                                                  <div class="panel-body">
                                                    <img class="arrow" src="../images/arrow-up.png"/><h4>Compensi: 0 kW</h4>
                                                  </div>
                                                </div>
                                                <div class="panel panel-danger" style="width:100%">
                                                  <div class="panel-body">
                                                    <img class="arrow" src="../images/arrow-down.png"/><h4>Consumi: {{reading.value / 1000}}kW</h4>
                                                  </div>
                                                </div>
                                                <div class="panel panel-warning" style="width:100%">
                                                  <div class="panel-body">
                                                    <img class="sun" src="../images/sun.png"/><h4>Produzione attuale: 2KW/h</h4>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel" id="panel_linee">
                                    <div class="panel-heading">I miei consumi</div>
                                  <div class="panel-body">
                                    <div id="linee_container" style="height: 300px; width: 100%;"
                                          use="https://raw.githubusercontent.com/filipkis/endev/master/examples/data-tables/civis.xml"
                                         data-from = "civis reading"
                                         data-where = "reading.userID = user.userID AND reading.token = user.token AND reading.from = '01-Apr-13 00:00 AM' AND reading.to = '30-Apr-13 00:00 AM' AND reading.res = 'daily'"
                                         data-provider = "yql" data-loaded = "draw(reading)"></div>
                                  </div>
                                </div>

                                    <!--<div id="classifica_container" style="height: 300px; width: 100%;"></div>-->
                                    <div class="list-group">
                                      <p href="#" class="list-group-item" style="margin-left:1px; margin-right:1px;">
                                        Classifica
                                      </p>
                                      <!--
                                        <button data-click = "order = 'consumed'">Consumed</button>
                                        <button data-click = "order = 'compensed'">Name</button>
                                      -->
                                      <div  id="lista_utenti">
                                           <a href="#" class="list-group-item utente" title={{user.name}} id={{user.avatar}} compens={{user.compensed}} consum={{user.consumed}}
                                              ng-repeat = "user in users | orderBy: order">
                                               <div use="https://raw.githubusercontent.com/filipkis/endev/master/examples/data-tables/civis.xml"
                                              data-from = "civis.IntervalReading reading" data-where = "reading.userID = user.id AND reading.token = user.token AND reading.from = '01-Apr-13 00:00 AM' AND reading.to = '30-Apr-13 00:00 AM' AND reading.res = 'monthly'" data-loaded = "extendUser(user,reading)" data-provider = "yql"></div>
                                               <div use="https://raw.githubusercontent.com/filipkis/endev/master/examples/data-tables/civis.xml"
                                              data-from = "civis.IntervalReading reading" data-where = "reading.userID = user.id AND reading.token = user.token AND reading.from = '01-Apr-13 00:00 AM' AND reading.to = '30-Apr-13 00:00 AM' AND reading.res = 'monthly'" data-loaded = "extendUser(user,reading)" data-provider = "yql"></div>
                                                <div class="row utente">
                                                    <div class="col-md-2">
                                                        <img class="utente" src="../images/{{user.avatar}}"/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <h4 style="margin-bottom:0">{{user.name}}</h4>
                                                    </div>
                                                    <div class="col-md-2 centerText">
                                                        <img class="arrow" src="../images/arrow-up.png"/>
                                                        <p class="kw">{{user.compensed}}</p>
                                                    </div>
                                                    <div class="col-md-2 centerText">
                                                        <img class="arrow" src="../images/arrow-down.png"/>
                                                        <p class="kw"> {{user.consumed}}</p>
                                                    </div>
                                             </div>
                                          </a>

                                      </div>
                                    </div>

                            </div>
                            <div class="col-md-4">
                                <div class="panel panel-default hint postit">
                                    <div class="panel-body">
                                        <img src="../images/exclamation.png"/>
                                        <div id="owl-demo" class="owl-carousel owl-theme">
 
                                          <div class="item">
                                            <h4>Nuova Sfida</h4>
                                            <p>L'estate scorsa hai consumato solo 200Kw Riuscirai a fare meglio quest'anno?</p>
                                          </div>
                                          <div class="item">
                                            <h4>Congratulazioni</h4>
                                            <p>Stai scalando la classifica.. complimenti!</p>
                                          </div>
                                          <div class="item">
                                            <h4>Informazioni</h4>
                                            <p>Hai già dato un'occhiata allo store? Ci sono tantissime novità!</p>
                                          </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <h4 class="centerText">Hai <?php echo $_SESSION['user_id'][7];?> crediti</h4>
                                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                                            <div class="btn-group" role="group" aria-label="...">
                                                <button type="button" class="btn btn-default mybtn" data-toggle="modal" data-target="#compramodal">More Credits</button>
                                            </div>
                                            <div class="btn-group" role="group" aria-label="...">
                                                <button type="button" class="btn btn-default mybtn" data-toggle="modal" data-target="#risparmiomodal">Risparmia</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div class="list-group">
                                      <p href="#" class="list-group-item" style="margin-left:1px; margin-right:1px;">
                                        Store
                                      </p>
                                       <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/1.jpg"/>
                                            <h4 style="margin-bottom:0">Lampadina</h4>
                                            <p>10 € - 1 credito</p>
                                      </a>
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/2.jpg"/>
                                            <h4 style="margin-bottom:0">Lampadina</h4>
                                            <p>10 € - 1 credito</p>
                                      </a> 
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/3.jpg"/>
                                            <h4 style="margin-bottom:0">Asciugacapelli</h4>
                                            <p>60 € - 6 crediti</p>
                                      </a> 
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/4.jpg"/>
                                            <h4 style="margin-bottom:0">Stufetta</h4>
                                            <p>20 € - 1 crediti</p>
                                      </a> 
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/5.jpg"/>
                                            <h4 style="margin-bottom:0">Set Lampadine</h4>
                                            <p>10 € - 1 crediti</p>
                                      </a> 
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/6.jpg"/>
                                            <h4 style="margin-bottom:0">Climatizzatore</h4>
                                            <p>100 € - 10 crediti</p>
                                      </a> 
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/7.jpg"/>
                                            <h4 style="margin-bottom:0">Fogli</h4>
                                            <p>10 € - 1 crediti</p>
                                      </a>
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/8.jpg"/>
                                            <h4 style="margin-bottom:0">Finestre</h4>
                                            <p>200 € - 20 crediti</p>
                                      </a>
                                      <a href="#" class="list-group-item">
                                            <img class="item" style="margin-top:13px" src="../images/store/9.jpg"/>
                                            <h4 style="margin-bottom:0">Bilancia solare</h4>
                                            <p>30 € - 3 crediti</p>
                                      </a>
                                      <p class="list-group-item centerText" style="margin-bottom:0; cursor:pointer">Mostra altro<p>
                                    </div>

                            </div>
                        </div>


                        
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>

    <div class="modal fade" id="usermodal" tabindex="-1" role="dialog" aria-labelledby="purchaseLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="usermodal_title">Kaley Cuoco</h4>
                </div>
                <div class="modal-body" style="height:450px">
                    <center>
                        <img class="user" id="usermodal_avatar" src="../images/kaley.jpg"/>
                    </center>
                    <div class="row">
                    </div>
                    <div class="row">
                    <div class="col-md-4">
                        <div id="modal_torta_container"></div>
                    </div>
                    <div class="col-md-2"></div>
                        <div class="col-md-6">
                            <br><br>
                            <div class="panel panel-success">
                              <div class="panel-body">
                                <img class="arrow" src="../images/arrow-up.png"/><h4 id="usermodal_compensi"></h4>
                              </div>
                            </div>
                            <div class="panel panel-danger">
                              <div class="panel-body">
                                <img class="arrow" src="../images/arrow-down.png"/><h4 id="usermodal_consumi"></h4>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="compare">Confronta</button>
                </div>
            </div>
        </div>
    </div>

   <form action="../DB/update.php" method="POST">
    <div class="modal fade" id="settingsmodal" tabindex="-1" role="dialog" aria-labelledby="purchaseLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="purchaseLabel">Settings</h4>
                </div>
                  <div class="modal-body" style="padding:40px;">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Name</label>
                          <input type="text" class="form-control" name="name" placeholder="Name" value="<?php echo $_SESSION['user_id'][4];?>">
                          <input type="hidden" class="form-control" name="color" id="settings_color" value="<?php echo 'col' . $_SESSION['user_id'][6];?>">
                      
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">Password</label>
                          <input type="password" class="form-control" name="password" placeholder="Password" value="<?php echo $_SESSION['user_id'][3];?>">
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">Confirm Password</label>
                          <input type="password" class="form-control" name="username" placeholder="Confirm password" value="<?php echo $_SESSION['user_id'][3];?>">
                      </div>
                       <div class="form-group">
                          
                          <div class="row">
                              <div class="col-md-6">
                                  <label class="color" for="exampleInputEmail1">Confirm Password</label>
                              </div>
                              <div class="col-md-1 color" id="col0" style=" height:0; margin:0 2px; background-color: #27ae60;  padding-bottom: calc(100%/12);
                              cursor: pointer; border-radius:50%; -webkit-filter: grayscale(100%);"></div>
                              <div class="col-md-1 color" id="col1" style=" height:0; margin:0 2px; background-color: #2980b9;  padding-bottom: calc(100%/12);
                              cursor: pointer; border-radius:50%; -webkit-filter: grayscale(100%);"></div>
                              <div class="col-md-1 color" id="col2" style=" height:0; margin:0 2px; background-color: #8e44ad;  padding-bottom: calc(100%/12);
                              cursor: pointer; border-radius:50%; -webkit-filter: grayscale(100%);"></div>
                              <div class="col-md-1 color" id="col3" style=" height:0; margin:0 2px; background-color: #d35400;  padding-bottom: calc(100%/12);
                              cursor: pointer; border-radius:50%; -webkit-filter: grayscale(100%);"></div>
                              <div class="col-md-1 color" id="col4" style=" height:0; margin:0 2px; background-color: #c0392b;  padding-bottom: calc(100%/12);
                              cursor: pointer; border-radius:50%; -webkit-filter: grayscale(100%);"></div>
                          </div>
                      </div>
                  </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" id="compare">Save</button>
                </div>
            </div>
        </div>
    </div>
    </form>


    <div class="modal fade" id="risparmiomodal" tabindex="-1" role="dialog" aria-labelledby="purchaseLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="usermodal_title">Acquista nuovi crediti</h4>
                </div>
                <div class="modal-body">
                  <h4>Hai scelto di risparmiare nella prossima bolletta. Il Risparimio è di 1€ ogni credito. Sicuro di voler continuare?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="compare">Annulla</button>
                    <button type="button" class="btn btn-success" data-dismiss="modal" id="compare">Risparmia</button>
                </div>
            </div>
        </div>
    </div>

   <form action="../DB/compra.php">
    <div class="modal fade" id="compramodal" tabindex="-1" role="dialog" aria-labelledby="purchaseLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="usermodal_title">Acquista nuovi crediti</h4>
                </div>
                <div class="modal-body">
                  <h4>Hai scelto di comprare dei nuovi crediti. Il costo previsto è di 10€.  Sicuro di volere acquistare altri pannelli solari? </h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger"  data-dismiss="modal" id="compare">Annulla</button>
                    <button type="submit" class="btn btn-success" id="compare">Acquista</button>
                </div>
            </div>
        </div>
    </div>
  </form>


    
     <script>
      endev.app.controller("DrawCtrl",function($scope, $q){
         var data = $q.defer();
         $scope.draw = function(reading) {
             drawChart(reading);
             data.resolve(reading);
             
         };
         $scope.text = "Hello world";
         $scope.extendUser = function(user,reading){
           console.log("User,reading:",user,reading)
           user.consumed = parseInt(reading.value);
           data.promise.then(function(value) {
               user.compensed = createCompensiMensile(value.IntervalReading).compensi;
           });
           
         }
         $scope.order = "-consumed";
         $scope.users = [
            <?php
            include "config.php";
            connetti_database();
            $result = mysql_query("SELECT * FROM user");
            for($i= 0; $i < mysql_num_rows($result); $i++){
                $user = mysql_fetch_array($result);
                echo "{ id: " . $user[0] . ", token: '" . $user[1] . "', name: '" . $user[4] . "', avatar: '" . $user[5] ."', crediti: " . $user[7] ."},";
            }

            ?>
        ];
      });
         
    </script>
    
    <!-- Loading the javaScript at the end of the page -->
    <script type="text/javascript" src="../js/bootstrap.js">alert("ok");</script>

</body>
</html>