//console.log("hola desde consulta servicio");
$("#btnConsultar").click(function () {
    Swal.showLoading()
    //console.log("Procesando consulta de servicio");
    //este if realiza una comparacion para que no halla campos vacios.
    if ($("#Referencia").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {    
            //se crearon variables para obtener los eventos del select
            //unir referencia con el servicio y poder seleccionar y mandar datos.
        var e = document.getElementById("sltSkuCodeServicio");
            var strUser = e.options[e.selectedIndex].text;
        var refePago = $("#Referencia").val();

            //inicia el proceso para recopilar los datos y hacer la peticion post 
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Consultar_Referencia',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        referencia: $("#Referencia").val(),
                        sku_Code: $("#sltSkuCodeServicio").val()                       
                    }),
                success: function (checkSkuResult) {                    
                    var jsonRetorno = (checkSkuResult);
                   // console.log(jsonRetorno);
                    //console.log(jsonRetorno["body"]["checkSkuResult"]["monto"]);
                    montos = (jsonRetorno["body"]["checkSkuResult"]["monto"]);
                    msj = (jsonRetorno["body"]["checkSkuResult"]["mensaje"]);
                    ///
                    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                        //console.log(JSON.stringify(data, null, 2));
                        //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                        document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                        document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                        document.getElementById("msj").innerHTML = "" + msj;


                    });
                   
                    //
                    //
                    Swal.fire({
                        title: 'Su consulta de servicio ' + strUser,                        
                        showConfirmButton: false,
                        html:
                            '<br/><br/>'+
                            '<h6 id="resRef"></h6> <br/>' +
                            '<h6 id="montoRef"></h6> <br/>' +
                            '<h6 id="msj"></h6> <br/>' +
                            '<br/><br/>'+
                            '<a href="http://www.recargacelulares.com.mx/Home/Servicios">'+
                            '<button id="ConRecar" class="btn btn-success">' +
                            'Ok' +
                            '</button>' +
                            '</a>'
                           
                    });
                },
                //esta parte tiene que cachar los errores.
                error: function (data) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                    //$('#divErrorText').text(jqXHR.responseText);
                    //$('#divError').show('fade');
                }
            });       

    }
});



//PagarServicio Megacable
//indicandole intrucciones al darle clic al boton.
$("#btnPagarMega").click(function () {   
    //este if realiza una comparacion para que no halla campos vacios.
    if ($("#Ref1").val() == "" || $("#Ref2").val() == "" || $("#MontoMega").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {
        //se crea un alerta para indicarle que no hay retroceso a menos que salga error.
        Swal.fire({
            title: 'Procesando con su pago MEGACABLE desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="PagoMega" class="btn btn-success">' +
                'Si, Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando Pago...</h6>'
        });
        //no se muestra el mensaje a menos que se de clic al boton PagoMega
        $("#Mensaje").hide();
        //evento al dar clic en el boton de la alerta antes mencionada.
        $("#PagoMega").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
          $("#PagoMega").hide();
            $("#EnviasSms").hide();
            $("#Mensaje").show();
            Swal.showLoading()     
       //inicia el proceso para recopilar los datos y hacer la peticion post 
        $.ajax({
            url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                    sku_Code: $("#sltSkuCodeMegacable").val(),
                        op_account: $("#Ref1").val(),
                        op_account2: $("#Ref2").val(),
                        monto: $("#MontoMega").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                }),
            success: function (checkTransactionResult) {
                //se creo una variable para indicarle posteriormente lo que traera
                var jsonRetorno = (checkTransactionResult);
                //se mandan a llamar solo las respuestas requeridas de la api
                msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);  
                var MensajeMegacable = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                localStorage.setItem("mnsMega", MensajeMegacable);
                // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                if (Error == 0) {
                    ///esta parte se manda la ip y la respuesta de los errores
                    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                        //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                        //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                        //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                        document.getElementById("msj").innerHTML = "" + msj;
                        document.getElementById("ipInfo").innerHTML = "Su direccion IP:" + data.ip;
                    });
                    //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                    Swal.fire({
                        title: 'Pago realizado con Exito.!',
                        type: 'success',
                        showConfirmButton: false,
                        html:
                            '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                            '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                            '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                            'Imprimir Ticket' +
                            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                            '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                            'SMS' +
                            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                            '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                            'Correo' +
                            '</button><br/>' +
                            '</ul>'
                    });
                    GuardarMovimientosMegacable();
                    ComisionMegacable();
                    $("#Imprimir").click(function () {
                        //console.log("Imprime Ticket");
                        //Para mostrar hora y fecha
                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/"
                            + (currentdate.getMonth() + 1) + "/"
                            + currentdate.getFullYear() + " @ "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds();
                        //empieza generar pdf
                        var doc = new jsPDF('p');

                        doc.text(20, 20, "Recargar Electronicas org");

                        var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                        var data = [
                            [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                        ];

                        doc.autoTable(columns, data,
                            { margin: { top: 25 } }
                        );

                        doc.save('Ticket.pdf');

                        //termina de generar pdf dentro de la funcion onclic

                        setTimeout(" window.location.href = 'Servicios'", 1600);
                    });//aqui termino

                    $("#EnviasSms").click(function () {
                        Swal.fire({
                            type: 'success',
                            title: 'Mensaje enviado',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        setTimeout(" window.location.href = 'Servicios'", 2500);
                    });//aqui termino

                    $("#Correo").click(function () {
                        Swal.fire({
                            type: 'success',
                            title: 'Correo enviado',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        setTimeout(" window.location.href = 'Servicios'", 2500);
                    });//aqui termino
                }
                //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                if (Error == 40) {
                    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {                      
                        document.getElementById("msj").innerHTML = "" + msj;
                        document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                    });
                    //alerta con mensaje de error indicandole
                    Swal.fire({
                        title: 'Por favor verifique lo siguiente',
                        type: 'warning',
                        showConfirmButton: false,
                        html:
                            '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                            '<br/><br/>' +
                            '<h6 id="msj"></h6> <br/>' +
                            '<br/><br/>' +
                            '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                            '<button id="ConRecar" class="btn btn-success">' +
                            'Ok' +
                            '</button>' +
                            '</a>'
                    });
                }        
                if (Error == 99) {
                    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                        document.getElementById("msj").innerHTML = "" + msj;
                        
                    });
                    //alerta con mensaje de error indicandole
                    Swal.fire({
                        title: 'Por favor verifique lo siguiente',
                        type: 'warning',
                        showConfirmButton: false,
                        html:
                            '<br/><br/>' +
                            '<h6 id="msj"></h6> <br/>' +
                            '<br/><br/>' +
                            '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                            '<button id="ConRecar" class="btn btn-success">' +
                            'Ok' +
                            '</button>' +
                            '</a>'
                    });
                }     

                if (Error == 1) {
                    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                        document.getElementById("msj").innerHTML = "" + msj;

                    });
                    //alerta con mensaje de error indicandole
                    Swal.fire({
                        title: 'Por favor verifique lo siguiente',
                        type: 'warning',
                        showConfirmButton: false,
                        html:
                            '<br/><br/>' +
                            '<h6 id="msj"></h6> <br/>' +
                            '<br/><br/>' +
                            '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                            '<button id="ConRecar" class="btn btn-success">' +
                            'Ok' +
                            '</button>' +
                            '</a>'
                    });
                }        
            },
            //muestra los errores en caso de no tener conexion en el ajax.
            error: function () {              
                Swal.fire({
                    type: 'warning',
                    title: 'Revice su conexion',
                    text: 'Revice su conexion'

                });
              }
          });
       });
    }
});
//termina el pago de megacable

//Pagarservicio Cfe
$("#btnPagoCfe").click(function () {

    //este if realiza una comparacion para que no halla campos vacios.
    if ($("#Ref3").val() == "" || $("#Ref4").val() == "" || $("#montoCfe").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {
        //se crea un alerta para indicarle que no hay retroceso a menos que salga error.
        Swal.fire({
            title: 'Procesando con su pago CFE desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="PagoCfe" class="btn btn-success">' +
                'Si, Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando Pago...</h6>'
        });
        //no se muestra el mensaje a menos que se de clic al boton PagoMega
        $("#Mensaje").hide();
        //evento al dar clic en el boton de la alerta antes mencionada.
        $("#PagoCfe").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#PagoCfe").hide();
            $("#EnviasSms").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //inicia el proceso para recopilar los datos y hacer la peticion post 
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeCfe").val(),
                        op_account: $("#Ref3").val(),
                        op_account2: $("#Ref4").val(),
                        monto: $("#montoCfe").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeCFE = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsCfe", MensajeCFE);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizada con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosCFE();
                        ComisionCfe();
                        $("#Imprimir").click(function () {
                         //   console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;

                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }        
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });
    }
});
//termina el pago de cfe

//Pagarservicio sky
$("#btnPagarSky").click(function () {

    //este if realiza una comparacion para que no halla campos vacios.
    if ($("#Ref5").val() == "" || $("#Ref6").val() == "" || $("#montoSky").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {
        //se crea un alerta para indicarle que no hay retroceso a menos que salga error.
        Swal.fire({
            title: 'Procesando con su pago SKY desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="PagoSky" class="btn btn-success">' +
                'Si, Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando Pago...</h6>'
        });
        //no se muestra el mensaje a menos que se de clic al boton PagoMega
        $("#Mensaje").hide();
        //evento al dar clic en el boton de la alerta antes mencionada.
        $("#PagoSky").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#PagoSky").hide();
            $("#EnviasSms").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //inicia el proceso para recopilar los datos y hacer la peticion post 
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeSky").val(),
                        op_account: $("#Ref5").val(),
                        op_account2: $("#Ref6").val(),
                        monto: $("#montoSky").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeSky = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsSky", MensajeSky);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosSky();
                        ComisionSky();
                        $("#Imprimir").click(function () {
                           // console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;

                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }        
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });
    }
});
//termina el pago de 

//Pagarservicio Izzi
$("#btnPagarIzzi").click(function () {

    //este if realiza una comparacion para que no halla campos vacios.
    if ($("#Ref7").val() == "" || $("#Ref8").val() == "" || $("#montoIzzi").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {
        //se crea un alerta para indicarle que no hay retroceso a menos que salga error.
        Swal.fire({
            title: 'Procesando con su pago IZZI desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="PagoIzzi" class="btn btn-success">' +
                'Si, Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando Pago...</h6>'
        });
        //no se muestra el mensaje a menos que se de clic al boton PagoMega
        $("#Mensaje").hide();
        //evento al dar clic en el boton de la alerta antes mencionada.
        $("#PagoIzzi").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#PagoIzzi").hide();
            $("#EnviasSms").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //inicia el proceso para recopilar los datos y hacer la peticion post 
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeIzzi").val(),
                        op_account: $("#Ref7").val(),
                        op_account2: $("#Ref8").val(),
                        monto: $("#montoIzzi").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeIzzi = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsIzzi", MensajeIzzi);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosIzzi();
                        ComisionIzzi();
                        $("#Imprimir").click(function () {
                           // console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;

                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }        
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });
    }
});
//termina el pago de Izzi

//Pagarservicio oriflame
$("#btnPagarOriflame").click(function () {

    //este if realiza una comparacion para que no halla campos vacios.
    if ($("#Ref9").val() == "" || $("#Ref10").val() == "" || $("#montoOriflame").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {
        //se crea un alerta para indicarle que no hay retroceso a menos que salga error.
        Swal.fire({
            title: 'Procesando con su pago ORIFLAME desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="PagoOriflame" class="btn btn-success">' +
                'Si, Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando Pago...</h6>'
        });
        //no se muestra el mensaje a menos que se de clic al boton PagoMega
        $("#Mensaje").hide();
        //evento al dar clic en el boton de la alerta antes mencionada.
        $("#PagoOriflame").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#PagoOriflame").hide();
            $("#EnviasSms").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //inicia el proceso para recopilar los datos y hacer la peticion post 
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: "DEMOQ0S1ORIFLA",
                        op_account: $("#Ref9").val(),
                        op_account2: $("#Ref10").val(),
                        monto: $("#montoOriflame").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeOriflame = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsOriflame", MensajeOriflame);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosOriflame();
                        ComisionOriflame();
                        $("#Imprimir").click(function () {
                           // console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;

                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }        
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });
    }
});
//termina el pago de Oriflame

//realizar pago servicio AVON
$("#btnPagarAvon").click(function () {

   // console.log("Procesando recarga");
    //empieza verificacion de pin
    if ($("#txtRefAvon1").val() == "" || $("#txtRefAvon2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {

        Swal.fire({
            title: 'Procesando con su pago AVON desea continuar?' + '</br>' + 'Al seleccionar "Si", no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="ConServicioAvon" class="btn btn-success">' +
                'Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando pago...</h6>'
        });
        $("#Mensaje").hide();
        //ANTES DE VERIFICAR EL PIN VERIFICA SI HAY UN EVENTO GUARDADO

        //AQUI TERMINA LA VERICACION POR HAY ALGUN DATO GUARDADO
        //empieza verficacion de pin
        //ValidarPinMovistar();
        //localStorage.setItem('Funcion', ValidarPin());
        //localStorage.getItem('Funcion');

        //termnina verificacion de pin

        $("#ConServicioAvon").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#ConServicioAvon ").hide();
            $("#CancelarPago").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //se crearon variables para obtener los eventos del select
            //unir SkuCode y Amount y poder seleccionar monto.

            //inicia el proceso para recopilar los datos y hacer la peticion post y almacenarlos
            //a la base de datos.
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeAvon").val(),
                        op_account: $("#txtRefAvon1").val(),
                        op_account2: $("#txtRefAvon2").val(),
                        monto: $("#txtMontoAvon").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeAvon = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsAvon", MensajeAvon);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizada con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosAvon();
                        ComisionAvon();
                        $("#Imprimir").click(function () {
                           // console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'La transaccion no se pudo completar',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });//ajax pago servicios
        });//function

    }
});
//Termina pago AVON


//realizar pago servicio INFONAVIT
$("#btnPagarInfonavit").click(function () {

   // console.log("Procesando recarga");
    //empieza verificacion de pin
    if ($("#txtRefInfonavit1").val() == "" || $("#txtRefInfonavit2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {

        Swal.fire({
            title: 'Procesando con su pago INFONAVIT desea continuar?' + '</br>' + 'Al seleccionar "Si", no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="ConServicioInfonavit" class="btn btn-success">' +
                'Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando pago...</h6>'
        });
        $("#Mensaje").hide();
        //ANTES DE VERIFICAR EL PIN VERIFICA SI HAY UN EVENTO GUARDADO

        //AQUI TERMINA LA VERICACION POR HAY ALGUN DATO GUARDADO
        //empieza verficacion de pin
        //ValidarPinMovistar();
        //localStorage.setItem('Funcion', ValidarPin());
        //localStorage.getItem('Funcion');

        //termnina verificacion de pin

        $("#ConServicioInfonavit").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#ConServicioInfonavit ").hide();
            $("#CancelarPago").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //se crearon variables para obtener los eventos del select
            //unir SkuCode y Amount y poder seleccionar monto.

            //inicia el proceso para recopilar los datos y hacer la peticion post y almacenarlos
            //a la base de datos.
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeInfonavit").val(),
                        op_account: $("#txtRefInfonavit1").val(),
                        op_account2: $("#txtRefInfonavit2").val(),
                        monto: $("#txtMontoInfonavit").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeInfonavit = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsInfonavit", MensajeInfonavit);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosInfonavit();
                        ComisionInfonavit();
                        $("#Imprimir").click(function () {
                          //  console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'La transaccion no se pudo completar',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }

                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });

    }
});
//Termina pago INFONAVIT

//realizar pago servicio telmex
$("#btnPagarTelmex").click(function () {

  //  console.log("Procesando recarga");
    //empieza verificacion de pin
    if ($("#txtRefTelmex1").val() == "" || $("#txtRefTelmex2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {

        Swal.fire({
            title: 'Procesando con su pago TELMEX desea continuar?' + '</br>' + 'Al seleccionar "Si", no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="ConServicioTelmex" class="btn btn-success">' +
                'Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando pago...</h6>'
        });
        $("#Mensaje").hide();
        //ANTES DE VERIFICAR EL PIN VERIFICA SI HAY UN EVENTO GUARDADO

        //AQUI TERMINA LA VERICACION POR HAY ALGUN DATO GUARDADO
        //empieza verficacion de pin
        //ValidarPinMovistar();
        //localStorage.setItem('Funcion', ValidarPin());
        //localStorage.getItem('Funcion');

        //termnina verificacion de pin

        $("#ConServicioTelmex").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#ConServicioTelmex").hide();
            $("#CancelarPago").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //se crearon variables para obtener los eventos del select
            //unir SkuCode y Amount y poder seleccionar monto.

            //inicia el proceso para recopilar los datos y hacer la peticion post y almacenarlos
            //a la base de datos.
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeTelmex").val(),
                        op_account: $("#txtRefTelmex1").val(),
                        op_account2: $("#txtRefTelmex2").val(),
                        monto: $("#txtMontoTelmex").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeTelmex = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsTelmex", MensajeTelmex);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosTelmex();
                        ComisionTelmex();
                        $("#Imprimir").click(function () {
                            //console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'La transaccion no se pudo completar',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });//ajax peticion
        });

    }
});
//Termina pago telmex


//realizar pago servicio dish
$("#btnPagarDish").click(function () {

   // console.log("Procesando recarga");
    //empieza verificacion de pin
    if ($("#txtRefDish1").val() == "" || $("#txtRefDish2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {

        Swal.fire({
            title: 'Procesando con su pago DISH desea continuar?' + '</br>' + 'Al seleccionar "Si", no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="ConServicioDish" class="btn btn-success">' +
                'Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando pago...</h6>'
        });
        $("#Mensaje").hide();
        //ANTES DE VERIFICAR EL PIN VERIFICA SI HAY UN EVENTO GUARDADO

        //AQUI TERMINA LA VERICACION POR HAY ALGUN DATO GUARDADO
        //empieza verficacion de pin
        //ValidarPinMovistar();
        //localStorage.setItem('Funcion', ValidarPin());
        //localStorage.getItem('Funcion');

        //termnina verificacion de pin

        $("#ConServicioDish").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#ConServicioDish").hide();
            $("#CancelarPago").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //se crearon variables para obtener los eventos del select
            //unir SkuCode y Amount y poder seleccionar monto.

            //inicia el proceso para recopilar los datos y hacer la peticion post y almacenarlos
            //a la base de datos.
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: $("#sltSkuCodeDish").val(),
                        op_account: $("#txtRefDish1").val(),
                        op_account2: $("#txtRefDish2").val(),
                        monto: $("#txtMontoDish").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeDish = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsDish", MensajeDish);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosDish();
                        ComisionDish();
                        $("#Imprimir").click(function () {
                           // console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'La transaccion no se pudo completar',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });

    }
});
//Termina pago dish


//realizar pago servicio ATT
$("#btnPagarATT").click(function () {

   // console.log("Procesando recarga");
    //empieza verificacion de pin
    if ($("#txtRefATT1").val() == "" || $("#txtRefATT2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    } else {

        Swal.fire({
            title: 'Procesando con su pago AT&T desea continuar?' + '</br>' + 'Al seleccionar "Si", no hay modo de revertir!!',
            type: 'warning',
            showConfirmButton: false,
            html:

                '<ul class="nav nav-tabs padding-0">' +
                '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<button id="ConServicioATT" class="btn btn-success">' +
                'Pagar' +
                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                '<a href="http://www.recargacelulares.com.mx/Home/Servicios"><button id="EnviasSms" class="btn btn-danger">' +
                'Cancelar' +
                '</button></a><br/>' +
                '</ul>' + '<h6 id="Mensaje">Espere procesando pago...</h6>'
        });
        $("#Mensaje").hide();
        //ANTES DE VERIFICAR EL PIN VERIFICA SI HAY UN EVENTO GUARDADO

        //AQUI TERMINA LA VERICACION POR HAY ALGUN DATO GUARDADO
        //empieza verficacion de pin
        //ValidarPinMovistar();
        //localStorage.setItem('Funcion', ValidarPin());
        //localStorage.getItem('Funcion');

        //termnina verificacion de pin

        $("#ConServicioATT").click(function () {
            Swal.fire({
                title: 'Espere procesando pago...',
                showConfirmButton: false,
            });
            $("#ConServicioATT").hide();
            $("#CancelarPago").hide();
            $("#Mensaje").show();
            Swal.showLoading()
            //se crearon variables para obtener los eventos del select
            //unir SkuCode y Amount y poder seleccionar monto.

            //inicia el proceso para recopilar los datos y hacer la peticion post y almacenarlos
            //a la base de datos.
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Pagaqui/Pago_Servicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        username: "recelectronicas",
                        password: "WRVqk1DM",
                        licence: "",
                        sku_Code: "017PQ0S10SEC0A",
                        op_account: $("#txtRefATT1").val(),
                        op_account2: $("#txtRefATT2").val(),
                        monto: $("#txtMontoATT").val(),
                        pv: "0",
                        Latitude: "0",
                        Longitude: "0"
                    }),
                success: function (checkTransactionResult) {
                    //se creo una variable para indicarle posteriormente lo que traera
                    var jsonRetorno = (checkTransactionResult);
                    //se mandan a llamar solo las respuestas requeridas de la api
                    msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                    Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                    var MensajeFATT = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                    localStorage.setItem("mnsFATT", MensajeFATT);
                    // creamos condicionales if para cada error segun sea el caso(Los errores son los rcode provenientes de la api).
                    if (Error == 0) {
                        ///esta parte se manda la ip y la respuesta de los errores
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            //console.log(JSON.stringify(data, null, 2));
                            //document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;
                            //document.getElementById("resRef").innerHTML = "Referencia:  " + refePago;
                            //document.getElementById("montoRef").innerHTML = "Adeudo: $ " + montos + " Mxn";
                            document.getElementById("msj").innerHTML = "" + msj;
                            document.getElementById("ipInfo").innerHTML = "Su direccion IP:  " + data.ip;

                        });
                        //se crea nuevamente una alerta para indicarle que todo salio con exito.                    
                        Swal.fire({
                            title: 'Pago realizado con Exito.!',
                            type: 'success',
                            showConfirmButton: false,
                            html:
                                '<span id="ipInfo"></span>' + ///AQUI SE IMPRIME EL IP
                                '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
                                'Imprimir Ticket' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' +
                                'SMS' +
                                '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' +
                                'Correo' +
                                '</button><br/>' +
                                '</ul>'
                        });
                        GuardarMovimientosFATT();
                        ComisionFATT();
                        $("#Imprimir").click(function () {
                          //  console.log("Imprime Ticket");
                            //Para mostrar hora y fecha
                            var currentdate = new Date();
                            var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth() + 1) + "/"
                                + currentdate.getFullYear() + " @ "
                                + currentdate.getHours() + ":"
                                + currentdate.getMinutes() + ":"
                                + currentdate.getSeconds();
                            //empieza generar pdf
                            var doc = new jsPDF('p');

                            doc.text(20, 20, "Recargar Electronicas org");

                            var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
                            var data = [
                                [1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
                            ];

                            doc.autoTable(columns, data,
                                { margin: { top: 25 } }
                            );

                            doc.save('Ticket.pdf');

                            //termina de generar pdf dentro de la funcion onclic

                            setTimeout(" window.location.href = 'Servicios'", 1600);
                        });//aqui termino

                        $("#EnviasSms").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Mensaje enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino

                        $("#Correo").click(function () {
                            Swal.fire({
                                type: 'success',
                                title: 'Correo enviado',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            setTimeout(" window.location.href = 'Servicios'", 2500);
                        });//aqui termino
                    }
                    //condicional indicandole lo que sucedera si se encuentra con el rcode 40
                    if (Error == 40) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 99) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'Por favor verifique lo siguiente',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                    if (Error == 1) {
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                            document.getElementById("msj").innerHTML = "" + msj;
                        });
                        //alerta con mensaje de error indicandole
                        Swal.fire({
                            title: 'La transaccion no se pudo completar',
                            type: 'warning',
                            showConfirmButton: false,
                            html:
                                '<br/><br/>' +
                                '<h6 id="msj"></h6> <br/>' +
                                '<br/><br/>' +
                                '<a href="http://www.recargacelulares.com.mx/Home/Servicios">' +
                                '<button id="ConRecar" class="btn btn-success">' +
                                'Ok' +
                                '</button>' +
                                '</a>'
                        });
                    }
                },
                //muestra los errores en caso de no tener conexion en el ajax.
                error: function () {
                    Swal.fire({
                        type: 'warning',
                        title: 'Revice su conexion',
                        text: 'Revice su conexion'

                    });
                }
            });
        });

    }
});
//Termina pago ATT