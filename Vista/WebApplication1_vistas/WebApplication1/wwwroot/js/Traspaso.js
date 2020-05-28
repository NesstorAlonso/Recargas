//llena la tabla de saldo
function mtdLlenarTablaSaldo() {
    $("#tbSaldo td").remove();
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'TraspasoSaldo/mtdObtenerTodasTransferencias',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            //console.log(data);
            //$(".sistemas").remove();
            for (var i in data) {

                var fecha = data[i].dtmFecha.substring(0, 10);
                var hora = data[i].dtmFecha.substring(11, 19);
                //invierte la fecha para obtener en este formato DD/MM/AAA
                var ObtFecha = fecha.split('-');
                ObtFecha.reverse();
                var FechaCorrecta = ObtFecha.join('-');  
                //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                var FechaCorrecta1 = FechaCorrecta + ' ' + hora;
                var FechaFinal = formatDate(FechaCorrecta1);
                //
                //Modificacion para el formato de monto en pesos.
                var Monto = parseFloat(data[i].dcmMonto).toFixed(2);
                function addComas(nStr) {
                    nStr += '';
                    x = nStr.split('.');
                    x1 = x[0];
                    x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
                }
                var MontoFinal = addComas(Monto);
                //
                $("#tbSaldo").append(

                    '<tr value=' + data[i].intIdSaldo + '>' +
                    //'<td id="">' + data[i].intIdSaldo + '</td> ' +
                    '<td class="align-center" data-id="2">' + FechaFinal + '</td >' +
                    '<td class="align-center" data-id="3">' + data[i].nombre + '</td >' +
                    '<td class="align-center moneyTracSaldoTb" data-id="4">' + '$' + MontoFinal + '</td> ' +
                    // '<td data-id="6">' +
                    //'<button id="' + data[i].intIdSaldo + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-sort-amount-desc"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    //'<td data-id="7">' +
                    //'<button id="' + data[i].intIdSaldo + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-card"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    //'<td data-id="8">' +
                    //'<button id="' + data[i].intIdSaldo + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-balance"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    //'<td data-id="9">' +
                    //'<button id="' + data[i].intIdSaldo + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</tr> '
                );

            }
            $("#tbSaldo").selectpicker("refresh");
        },
        error: function (x) {
           // console.log(x);
        },
    });
}

function mtdObtenerSaldoPorId1() {
    //console.log("EntroSaldo");
    $("#tbSaldo td").remove();
    var IdUsuario = localStorage.getItem('idPadre');
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'TraspasoSaldo/mtdTodosTraspasos',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            //console.log(data);
            $(".sistemas").remove();
            for (var i in data) {

                var fecha = data[i].dtmFecha.substring(0, 10);
                var hora = data[i].dtmFecha.substring(11, 19);
                //invierte la fecha para obtener en este formato DD/MM/AAA
                var ObtFecha = fecha.split('-');
                ObtFecha.reverse();
                var FechaCorrecta = ObtFecha.join('-');

                //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                var FechaCorrecta1 = FechaCorrecta + ' ' + hora;
                var FechaFinal = formatDate(FechaCorrecta1);
                //
                //Modificacion para el formato de monto en pesos.
                var Monto = parseFloat(data[i].dcmMonto).toFixed(2);
                function addComas(nStr) {
                    nStr += '';
                    x = nStr.split('.');
                    x1 = x[0];
                    x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
                }
                var MontoFinal = addComas(Monto);
                //

                $("#tbSaldo").append(

                    '<tr value=' + data[i].intIdSaldo + '>' +
                    '<td class="align-center" data-id="2">' + FechaFinal + '</td >' +
                    '<td class="align-center" data-id="2">' + data[i].nombre + '</td >' +
                    '<td class="align-center moneyTracSaldoTb" data-id="6">' + '$' + MontoFinal + '</td> ' +
                    '</tr> '
                );
            }
            $("#tbSaldo").selectpicker("refresh");
        },
        error: function (x) {
            // console.log(x);
        },
    });
}

function mtdObtenerTraspadoPorMes() {
   // console.log("EntroSaldo");
    var IdUsuario = localStorage.getItem('idPadre');
    //console.log(IdUsuario);
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'TraspasoSaldo/mtdObtenerTraspadoPorMes',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $("#tbSaldo td").remove();
            $(".sistemas").remove();
            for (var i in data) {

                var fecha = data[i].dtmFecha.substring(0, 10);
                var hora = data[i].dtmFecha.substring(11, 19);

                $("#tbSaldo").append(

                    '<tr value=' + data[i].intIdSaldo + '>' +
                    '<td data-id="2">' + fecha + ' ' + hora + '</td >' +
                    '<td data-id="2">' + data[i].userName + '</td >' +
                    '<td data-id="6">' + '$' + + data[i].dcmMonto + '.00' + '</td> ' +
                    '<td data-id="3">' + '$' + + data[i].dcmMontoActual + '.00' + '</td> ' +
                    '</tr> '
                );
            }
            $("#tbSaldo").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}

//const formatter = new Intl.NumberFormat('en-US', {
//    style: 'currency',
//    currency: 'USD',
//    minimumFractionDigits: 0
//})


//Llenar select de TrasferenciaSaldo
function mtdLlenarOptionSaldoTraspaso() {
    var HijosSelec = localStorage.getItem('idPadre');
   // console.log("llego");
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'TraspasoSaldo/ObtenerSaldoCliente?Id=' + HijosSelec + '&strEstatus=A',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
          //  console.log(data);
            $(".SeleccionSaldo").remove();
            for (var i in data) {

                $('#SeleccionSaldoslt').append("<option class='SeleccionSaldo' value='" + data[i].id + "'>" + data[i].userName + "</option>");
            }

            $("#SeleccionSaldoslt").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}

//botones de la vista traspaso
$("#btnTraspaso").click(function () {
    $("#buscaSaldo").hide();
    mtdObtenerSaldoPorId1();
    //formatMoney();
});
//
//
$("#btnHistorial").click(function () {
    $("#buscaSaldo").show();
    mtdLlenarTablaSaldo();
    //formatMoney();

});


$('#btnEnviarTraspasaSaldo').click(function () {
    var hoy = new Date();

    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();

    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    var fechaYHora = fecha1 + ' ' + hora;

    if ($("#SeleccionSaldoslt").val() == "" || $("#dcmMonto").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TraSaldo'", 1500);
        } else {
            //ValidarFondosSaldo();
            //se crea un alerta para indicarle que no hay retroceso a menos que salga error.
            Swal.fire({
                title: 'Transfiriendo saldo a' + ' ' + $("#SeleccionSaldoslt option:selected").text() + ' ' + '¿desea continuar?',
                type: 'warning',
                showConfirmButton: false,
                html:

                    '<ul class="nav nav-tabs padding-0">' +
                    '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                    '<button id="Transferir" class="btn btn-success">' +
                    'Continuar' +
                    '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                    '<a href="https://www.recargacelulares.com.mx/Home/TraSaldo"><button id="EnviasSms" class="btn btn-danger">' +
                    'Cancelar' +
                    '</button></a><br/>'
            });
            $("#Transferir").click(function () {
                $.ajax({
                    url: 'https://apirecargas.recargacelulares.com.mx/api/TraspasoSaldo/mtdTransacTransferirSaldo',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(
                        {
                            Id: localStorage.getItem('idPadre'),
                            dcmMonto: $("#dcmMonto").val(),
                            strIdCliente: $("#SeleccionSaldoslt option:selected").val(),
                            dtmFecha: fechaYHora,
                            strIdUsuarioLog: localStorage.getItem('idPadre'),
                            intIdUsuarioOrigen: localStorage.getItem('idPadre'),
                            bitStatus: "true"

                        }),
                    success: function (data) {
                        localStorage.setItem("MontoTraspasoCo", $("#dcmMonto").val());
                        Swal.fire({
                            title: 'Transferencia Exitosa.!',
                            type: 'success',
                            showConfirmButton: false
                        });
                        obtenerMontoActual();
                        RecargaMActual();
                        GuardarMovimientoTraspasoAbono();
                        setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TraSaldo'", 1500);
                    },
                    // imprime los errores puede ser desde bootstrap o de sweetalert
                    error: function (jqXHR) {
                        Swal.fire({
                            type: 'warning',
                            title: 'Error al transferir ',
                            text: 'Porfavor intente mas tarde o contacte al administrador'

                        });
                        //$('#divErrorText').text(jqXHR.responseText);
                        //$('#divError').show('fade');
                    }
                });
            });
        }
    }
});

//Funcion para realizar la busqueda por fecha y pintar una tabla conforme se valla pidiendo
$('#FBFecha').click(function () {
    if ($("#dtmFechaI").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Fecha Inicial vacia',
            text: 'Porfavor ingrese una fecha'
        });
    }
    else {
        if ($("#dtmFechaF").val() == "") {
            Swal.fire({
                type: 'error',
                title: 'Fecha Final vacia',
                text: 'Porfavor ingrese una fecha'
            });
        } else {

            $("#tbSaldo td").remove();
            var fila = 1;
            fila++;
            $.ajax({
                type: "GET",
                url: rutaServidor + 'TraspasoSaldo/FiltroBusquedaFecha?FechaInicio=' + $("#dtmFechaI").val() + '&FechaFin=' + $("#dtmFechaF").val(),
                datatype: "Json",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
                },
                success: function (data) {
                    //console.log(data);
                    //$(".sistemas").remove();
                    for (var i in data) {

                        var fecha = data[i].dtmFecha.substring(0, 10);
                        var hora = data[i].dtmFecha.substring(11, 19);

                        //invierte la fecha para obtener en este formato DD/MM/AAA
                        var ObtFecha = fecha.split('-');
                        ObtFecha.reverse();
                        var FechaCorrecta = ObtFecha.join('-');
                        //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                        var FechaCorrecta1 = FechaCorrecta + ' ' + hora;
                        var FechaFinal = formatDate(FechaCorrecta1);
                //
                        //Modificacion para el formato de monto en pesos.
                        var Monto = parseFloat(data[i].dcmMonto).toFixed(2);
                        function addComas(nStr) {
                            nStr += '';
                            x = nStr.split('.');
                            x1 = x[0];
                            x2 = x.length > 1 ? '.' + x[1] : '';
                            var rgx = /(\d+)(\d{3})/;
                            while (rgx.test(x1)) {
                                x1 = x1.replace(rgx, '$1' + ',' + '$2');
                            }
                            return x1 + x2;
                        }
                        var MontoFinal = addComas(Monto);
                //

                        $("#tbSaldo").append(

                            '<tr value=' + data[i].intIdSaldo + '>' +
                            '<td class="align-center" data-id="2">' + FechaFinal + '</td >' +
                            '<td class="align-center" data-id="3">' + data[i].nombre + '</td >' +
                            '<td class="align-center moneyTracSaldoTb" data-id="4">' + '$' + MontoFinal + '</td> ' +
                            '</tr> '
                        );

                    }
                    $("#tbSaldo").selectpicker("refresh");
                    mtdLimpiarCamposFecha();
                },
                error: function (x) {
                   // console.log(x);
                },
            });
        }
    }
});

//Funcion que limpia los campos datetime de fechas de filtro busqueda.
function mtdLimpiarCamposFecha() {
    $("#dtmFechaI").val("");
    $("#dtmFechaF").val("");
}

//Funcion que realiza la conversion de la hora de 24hrs a 12 horas con formato de PM y AM
function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh; if (h >= 12) { h = hh - 12; dd = "PM"; }
    if (h == 0) { h = 12; } m = m < 10 ? "0" + m : m; s = s < 10 ? "0" + s : s;
    /* if you want 2 digit hours: h = h<10?"0"+h:h; */
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    var replacement = h + ":" + m; /* if you want to add seconds replacement += ":"+s; */ replacement += " " +
        dd; return date.replace(pattern, replacement);
}
function formatDateMovimientos(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh; if (h >= 12) { h = hh - 12; dd = "PM"; }
    if (h == 0) { h = 12; } m = m < 10 ? "0" + m : m; s = s < 10 ? "0" + s : s;
    /* if you want 2 digit hours: h = h<10?"0"+h:h; */
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    var replacement = h + ":" + m; /* if you want to add seconds replacement += ":"+s; */ replacement += " " +
        dd; return date.replace(pattern, replacement);
}
//---------------------------------------------------
//Depositos de  abonos
//---------------------------------------------------
$('#GObservaciones').click(function () {
    var hoy = new Date();

    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;

    Swal.fire({
        title: '¿Aceptar el abono?',
        type: 'warning',
        showConfirmButton: false,
        html:

            '<ul class="nav nav-tabs padding-0">' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&emsp;&emsp;&emsp;' +
            '<button id="AAbono" class="btn btn-success">' +
            'Si' +
            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&emsp;&emsp;' +
            '<a href="https://www.recargacelulares.com.mx/Home/TraSaldo"><button id="EnviasSms" class="btn btn-danger">' +
            'No' +
            '</button></a><br/>'
    });
    $("#AAbono").click(function () {
        $.ajax({
            url: 'https://apirecargas.recargacelulares.com.mx/api/TraspasoSaldo/mtdTransacTransferirAbono',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    Id: localStorage.getItem('UNameCliente'),
                    intIdAvisoPago: localStorage.getItem('idEditarEstatusAvisoP'), 
                    dcmMonto: $("#DepositoMonto").val(),
                    strIdCliente: localStorage.getItem('UNameCliente'),
                    dtmFecha: fechaYHora,
                    strIdUsuarioLog: localStorage.getItem('idPadre'),
                    intIdUsuarioOrigen: localStorage.getItem('idPadre'),
                    bitStatus: "true"

                }),
            success: function (data) {
                localStorage.setItem("MontoDAbonoC", $("#DepositoMonto").val());
                Swal.fire({
                    title: 'Abono Exitoso!',
                    type: 'success',
                    showConfirmButton: false
                });      
                GuardarAbonoCliente();
                GStatus();
            },
            // imprime los errores puede ser desde bootstrap o de sweetalert
            error: function (jqXHR) {
                Swal.fire({
                    type: 'warning',
                    title: 'Error al abonar ',
                    text: 'Porfavor intente mas tarde o contacte al administrador'

                });
                //$('#divErrorText').text(jqXHR.responseText);
                //$('#divError').show('fade');
            }
        });
    });
});

//Funcion donde se manda el rechazo del abono
$('#GObservacionesRechazo').click(function () {
    var hoy = new Date();

    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;

    Swal.fire({
        title: '¿Rechazar el abono?',
        type: 'warning',
        showConfirmButton: false,
        html:

            '<ul class="nav nav-tabs padding-0">' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&emsp;&emsp;&emsp;' +
            '<button id="AAbonoRechazo" class="btn btn-success">' +
            'Si' +
            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&emsp;&emsp;' +
            '<a href="https://www.recargacelulares.com.mx/Home/TraSaldo"><button id="EnviasSms" class="btn btn-danger">' +
            'No' +
            '</button></a><br/>'
    });
    $("#AAbonoRechazo").click(function () {
        $.ajax({
            url: 'https://apirecargas.recargacelulares.com.mx/api/TraspasoSaldo/mtdTransacTransferirAbonoRechazado',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    Id: localStorage.getItem('UNameCliente'),
                    intIdAvisoPago: localStorage.getItem('idEditarEstatusAvisoP'),
                    dcmMonto: $("#DepositoMonto").val(),
                    strIdCliente: localStorage.getItem('UNameCliente'),
                    dtmFecha: fechaYHora,
                    strIdUsuarioLog: localStorage.getItem('idPadre'),
                    intIdUsuarioOrigen: localStorage.getItem('idPadre'),
                    bitStatus: "true"

                }),
            success: function (data) {
                Swal.fire({
                    title: 'Rechazado!',
                    type: 'success',
                    showConfirmButton: false
                });
                GStatus();
            },
            // imprime los errores puede ser desde bootstrap o de sweetalert
            error: function (jqXHR) {
                Swal.fire({
                    type: 'warning',
                    title: 'Error al rechazar el abono ',
                    text: 'Porfavor intente mas tarde o contacte al administrador'

                });
                //$('#divErrorText').text(jqXHR.responseText);
                //$('#divError').show('fade');
            }
        });
    });
});
