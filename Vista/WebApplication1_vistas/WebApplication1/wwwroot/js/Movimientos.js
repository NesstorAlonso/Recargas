$(document).ready(function () {
    mtdObtenerTodosMovimientos();
    mtdLlenarVerDetalles();
    $("#busqTipo").hide();
});

///Funcion que permite obtener las coordenadas de latitud y logintud
var options = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(success, error, options);

function success(position) {
    var coordenadas = position.coords;
    localStorage.setItem("Latitud", coordenadas.latitude);
    localStorage.setItem("Longitud", coordenadas.longitude);
};

function error(error) {
};
////
///Funcion para obtener la direccion Ip
/////
$.getJSON("https://api.ipify.org/?format=json", function (e) {  
    localStorage.setItem("ipDir", e.ip);
});
////////////
///////////
//////Funcion para llenar la tabla de mis movimientos.
///
function mtdObtenerTodosMovimientos(e) {
   var strIdUsuMov = localStorage.getItem("idPadre");
   
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'Movimientos/ObtenerMovimientos?strIdUsuario=' + strIdUsuMov,
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            //console.log(data);
            $(".Mov").remove();
            for (var i in data) {
                //Modificacion de la fecha para mostrar nombres de los meses en lugar de numero
                var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                var fechaMovimientos = new Date(data[i].dtmFechaHora);
                var hora = data[i].dtmFechaHora.substring(11, 19);
                var FechaM = fechaMovimientos.getDate() + "/" + meses[fechaMovimientos.getMonth()] + "/" + fechaMovimientos.getFullYear();
                var FechaM1 = FechaM + ' ' + hora;
                //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                var FechaFinalMovi = formatDateMovimientos(FechaM1);
                //MOdificacion para el formato de monto en pesos.
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
                $("#tbMovimientos").append(

                    '<tr class="Mov" value=' + data[i].intIdMovimiento + '>' +

                    '<td data-id="3">' + FechaFinalMovi + '</td> ' +
                    '<td data-id="2">' + data[i].nombre + '</td >' +
                    '<td data-id="3">' + data[i].strReferencia + '</td> ' +         
                    '<td data-id="3">' + data[i].strTelefono + '</td> ' +     
                    '<td data-id="3">' +'$'+ MontoFinal + '</td> ' +         
                    '<td data-id="3">' + data[i].strTipo + '</td> ' +         
                    '<td data-id="3">' + data[i].strMensaje + '</td> ' +
                    '<td data-id="7">' +
                    '<button id="' + data[i].intIdMovimiento + '" onClick="mtdVerDetalles(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Ver Detalles"><i class="zmdi zmdi-collection-text"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</tr> '
                );
            }
            $("#tbMovimientos").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}

//Funcion que realiza el envio de los detalles en una vista nueva.
function mtdVerDetalles(e) {
    data = e.id
    localStorage.setItem("IdVerDetalles", data);
    window.location.href = 'https://www.recargacelulares.com.mx/Home/VerDetalles';
}
function mtdLlenarVerDetalles() {
    var intidMov = localStorage.getItem("IdVerDetalles");
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Movimientos/ObtenerMovimientosPorId?intIdMovimiento=' + intidMov,
        datatype: 'json',
        success: function (response) {
            //Modificacion de la fecha para mostrar nombres de los meses en lugar de numero
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var fechaMovimientos = new Date(response[0].dtmFechaHora);
            var hora = response[0].dtmFechaHora.substring(11, 19);
            var FechaM = fechaMovimientos.getDate() + "/" + meses[fechaMovimientos.getMonth()] + "/" + fechaMovimientos.getFullYear();
            var FechaM1 = FechaM + ' ' + hora;
            //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
            var FechaFinalMovi = formatDateMovimientos(FechaM1);
            //MOdificacion para el formato de monto en pesos.
            var Monto = parseFloat(response[0].dcmMonto).toFixed(2);
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
            //console.log(response);
            $("#NomDetalles").text(response[0].nombre);
            $("#LatitudDetalles").text(response[0].strLatitud);
            $("#LongitudDetalles").text(response[0].strLongitud);
            $("#DipDetalles").text(response[0].strDireccionIP);
            $("#FechaHoraDetalles").text(FechaFinalMovi);
            $("#RFDetalles").text(response[0].strReferencia);
            $("#TelDetalles").text(response[0].strTelefono);
            $("#SkuDetalles").text(response[0].strSKU);
            $("#MontoDetalles").text(MontoFinal);
            $("#TipoDetalles").text(response[0].strTipo);
            $("#tbODetalles").text(response[0].strTbOrigen);
            $("#FolDetalles").text(response[0].strMensaje);
        },
        error: function () {
        }
    });
}



//////////////////////////////////////////////////////////////////////////
//Funcion que realiza el guardado de Guardar movimientos y reducir el monto al usuario
//al realizar una recarga,servicio y pines.
//////////////////////////////////////////////////////////////

///////////////////////////////////
//Tiepo aire
///////////////////////////////////

///Recarga Telcel
function GuardarMovimientosTATelcel(){
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n0").val() == "" || $("#n1").val() == "") {
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
           setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
           // setTimeout("window.location.href = 'https://localhost:44338/Home/TiempoAire'", 1500);

        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(
                        {
                            strIdUsuario: localStorage.getItem('idPadre'),
                            strLatitud: localStorage.getItem("Latitud"),
                            strLongitud: localStorage.getItem("Longitud"),
                            strDireccionIP: localStorage.getItem("ipDir"),
                            dtmFechaHora: fechaYHoraMovimientos,
                            strReferencia: "Null",
                            strTelefono: $("#n0").val(),
                            strSKU: $("#sltSkuCode").val(),
                            strNombre: "ManlioDiaz",
                            dcmMonto: localStorage.getItem('RMontoTelcel'),
                            strTipo: "TiempoAire Telcel",
                            strTbOrigen: "tbSkuTelcel",
                            strMensaje: localStorage.getItem("MsjMovimiento")

                        }),
                success: function (data) {
                   // console.log("Registro Guardado");
                        obtenerMontoActual();
                        RecargaMActual();
                    },
                error: function (jqXHR) {
                    //console.log("Error al guardar registro");
                    }
                });
        }
    }
}
/////////paquetes Telcel
function GuardarMovimientosPaquetesTelcel() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n50").val() == "" || $("#n51").val() == "") {
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
            
           // setTimeout("window.location.href = 'https://localhost:44338/Home/TiempoAire'", 1500);
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n50").val(),
                        strSKU: $("#sltSkuCodePaquetes").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('RMontoPaquetes'),
                        strTipo: "PaqueteTelcel",
                        strTbOrigen: "tbSkuTelcel",
                        strMensaje: localStorage.getItem("MensajeMovimientoPa")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
//////////internet Telcel
function GuardarMovimientosInternetTelcel() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n52").val() == "" || $("#n53").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
           // setTimeout("window.location.href = 'https://localhost:44338/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n52").val(),
                        strSKU: $("#sltSkuCodeInternet").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoInterT'),
                        strTipo: "Internet Telcel",
                        strTbOrigen: "tbSkuTelcel",
                        strMensaje: localStorage.getItem("MensajeMovimientoIn")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
//////////////////////
/////////////////////Movistar

function GuardarMovimientosTAMovistar() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n2").val() == "" || $("#n3").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n2").val(),
                        strSKU: $("#sltSkuCodeMovistar").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoTAMovi'),
                        strTipo: "TiempoAire Movistar",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeMovimientoTAMovi")

                    }),
                success: function (data) {
                    //console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
/////////Internet Movi
function GuardarMovimientosInternetMovistar() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#In1").val() == "" || $("#In2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n52").val(),
                        strSKU: $("#sltSkuCodeMovistar2").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoInMovi'),
                        strTipo: "Internet Movistar",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeInterMovi")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

//////////Pauqetes Movistar
function GuardarMovimientosPaquetesMovistar() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#Pq1").val() == "" || $("#Pq2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#Pq1").val(),
                        strSKU: $("#sltSkuCodeMovistar3").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoPaMovi'),
                        strTipo: "Paquetes Movistar",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MesnajeMoviPa")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

////////Unefon
function GuardarMovimientosTAUnefon() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n4").val() == "" || $("#n5").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n4").val(),
                        strSKU: $("#sltSkuCodeUnefon").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoTAUnefon'),
                        strTipo: "Recarga Unefon",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeMovimientoTAUnefon")

                    }),
                success: function (data) {
                    //console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
/////////////////FlasMobile
function GuardarMovimientosTAFlashMobile() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#fm1").val() == "" || $("#fm2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#fm1").val(),
                        strSKU: $("#sltSkuCodeFlash").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoFLasMobile'),
                        strTipo: "Recarga FlashMobile",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeMovFLas")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
/////////////////ATT
function GuardarMovimientosATT() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n6").val() == "" || $("#n7").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n6").val(),
                        strSKU: $("#sltSkuCodeAtt").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoATT'),
                        strTipo: "Recarga ATT",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeATT")

                    }),
                success: function (data) {
                  //  console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

/////////////////OUI
function GuardarMovimientosOUI() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#o1").val() == "" || $("#o2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#o1").val(),
                        strSKU: $("#sltSkuCodeOui").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoOUI'),
                        strTipo: "Recarga OUI",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeOUi")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

/////////////////Tuenti
function GuardarMovimientosTuenti() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n11").val() == "" || $("#n12").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n11").val(),
                        strSKU: $("#sltSkuCodeTuenti").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoTuenti'),
                        strTipo: "Recarga Tuenti",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeTuenti")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

/////////////////Virgin
function GuardarMovimientosVirgin() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n8").val() == "" || $("#n9").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n8").val(),
                        strSKU: $("#sltSkuCodeVirgin").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoVirgin'),
                        strTipo: "Recarga Virgin",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MesnajeVirgin")

                    }),
                success: function (data) {
                  //  console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

/////////////////MazTiempo
function GuardarMovimientosMazTiempo() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n13").val() == "" || $("#n14").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n13").val(),
                        strSKU: $("#sltSkuCodeMazTiempo").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoMazTiempo'),
                        strTipo: "Recarga MazTiempo",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MensajeMazTi")

                    }),
                success: function (data) {
                  //  console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
/////////////////Cierto
function GuardarMovimientosCierto() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#c1").val() == "" || $("#c2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#c1").val(),
                        strSKU: $("#sltSkuCodeCierto").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoCierto'),
                        strTipo: "Recarga Cierto",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("msnCierto")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

/////////////////Simpati
function GuardarMovimientosSimpati() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#s1").val() == "" || $("#s2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#s1").val(),
                        strSKU: $("#sltSkuCodeSimpa").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoSimpati'),
                        strTipo: "Recarga Simpati",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MnsSimpati")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
/////////////////Weex
function GuardarMovimientosWeex() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#n15").val() == "" || $("#n16").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: "Null",
                        strTelefono: $("#n15").val(),
                        strSKU: $("#sltSkuCodeWeex").val(),
                        strNombre: "ManlioDiaz",
                        dcmMonto: localStorage.getItem('MontoWeex'),
                        strTipo: "Recarga Weex",
                        strTbOrigen: "tbSkuRecargaqui",
                        strMensaje: localStorage.getItem("MnsWeex")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
//////////////////////
//Servicios
/////////////////

////Megacable
function GuardarMovimientosMegacable() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#Ref1").val() == "" || $("#Ref2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#Ref1").val(),
                        strTelefono: "Null" ,
                        strSKU: $("#sltSkuCodeMegacable").val(),
                        strNombre: "Null",
                        dcmMonto: $("#MontoMega").val(),
                        strTipo: "Servicio Megacable",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsMega")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
////CFE
function GuardarMovimientosCFE() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#Ref3").val() == "" || $("#Ref4").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#Ref3").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeCfe").val(),
                        strNombre: "Null",
                        dcmMonto: $("#montoCfe").val(),
                        strTipo: "Servicio CFE",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsCfe")

                    }),
                success: function (data) {
                    //console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
////Sky
function GuardarMovimientosSky() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#Ref5").val() == "" || $("#Ref6").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#Ref5").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeSky").val(),
                        strNombre: "Null",
                        dcmMonto: $("#montoSky").val(),
                        strTipo: "Servicio Sky",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsSky")

                    }),
                success: function (data) {
                 //   console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

////Izzi
function GuardarMovimientosIzzi() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#Ref7").val() == "" || $("#Ref8").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#Ref7").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeIzzi").val(),
                        strNombre: "Null",
                        dcmMonto: $("#montoIzzi").val(),
                        strTipo: "Servicio Izzi",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsIzzi")

                    }),
                success: function (data) {
                  //  console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
////Oriflame
function GuardarMovimientosOriflame() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#Ref9").val() == "" || $("#Ref10").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#Ref9").val(),
                        strTelefono: "Null",
                        strSKU: "DEMOQ0S1ORIFLA",
                        strNombre: "Null",
                        dcmMonto: $("#montoOriflame").val(),
                        strTipo: "Servicio Oriflame",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsOriflame")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                  //  console.log("Error al guardar registro");
                }
            });
        }
    }
}

////Avon
function GuardarMovimientosAvon() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#txtRefAvon1").val() == "" || $("#txtRefAvon2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefAvon1").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeAvon").val(),
                        strNombre: "Null",
                        dcmMonto: $("#txtMontoAvon").val(),
                        strTipo: "Servicio Avon",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsAvon")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

////Infonavit
function GuardarMovimientosInfonavit() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#txtRefInfonavit1").val() == "" || $("#txtRefInfonavit2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefInfonavit2").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeInfonavit").val(),
                        strNombre: "Null",
                        dcmMonto: $("#txtMontoInfonavit").val(),
                        strTipo: "Servicio Infonavit",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsInfonavit")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

////Telmex
function GuardarMovimientosTelmex() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#txtRefTelmex1").val() == "" || $("#txtRefTelmex2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefTelmex1").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeTelmex").val(),
                        strNombre: "Null",
                        dcmMonto: $("#txtMontoTelmex").val(),
                        strTipo: "Servicio Telmex",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsTelmex")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                    //console.log("Error al guardar registro");
                }
            });
        }
    }
}

////Dish
function GuardarMovimientosDish() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#txtRefDish1").val() == "" || $("#txtRefDish2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefDish1").val(),
                        strTelefono: "Null",
                        strSKU: $("#sltSkuCodeDish").val(),
                        strNombre: "Null",
                        dcmMonto: $("#txtMontoDish").val(),
                        strTipo: "Servicio Dish",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsDish")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}
////Factura ATT
function GuardarMovimientosFATT() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;

    if ($("#txtRefATT1").val() == "" || $("#txtRefATT2").val() == "") {
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
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdMovimientosRecargasServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        strLatitud: localStorage.getItem("Latitud"),
                        strLongitud: localStorage.getItem("Longitud"),
                        strDireccionIP: localStorage.getItem("ipDir"),
                        dtmFechaHora: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefATT1").val(),
                        strTelefono: "Null",
                        strSKU: "017PQ0S10SEC0A",
                        strNombre: "Null",
                        dcmMonto: $("#txtMontoATT").val(),
                        strTipo: "Servicio FacturaAT&T",
                        strTbOrigen: "tbSkusPagaqui",
                        strMensaje: localStorage.getItem("mnsFATT")

                    }),
                success: function (data) {
                   // console.log("Registro Guardado");
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                   // console.log("Error al guardar registro");
                }
            });
        }
    }
}

//////////////////////////////
//Filtro de busquedas
//////////////////////////////
//Esto realiza una activacion mediante el combo de select, para aplicar el tipo que se requiere
//
$(document.body).on('change', "#slcTipo", function (e) {
    var optVal = $("#slcTipo option:selected").val();
    if (optVal == 'User' && optVal == 'Refe' && optVal == 'Tel' && optVal == 'Tipo') {
        $("#busqTipo").show();
    } else if (optVal == '') {
        $("#busqTipo").hide();
    } else { $("#busqTipo").show(); }
});


//Realiza el filtro de busqueda por tipo
var busquedaTipo = document.getElementById('busqTipo');
var tableMov = document.getElementById("tbMovimientos").tBodies[0];

buscaTablaMov = function () {
    textoTipo = busquedaTipo.value.toLowerCase();
    var r = 0;
    while (row = tableMov.rows[r++]) {
        if (row.innerText.toLowerCase().indexOf(textoTipo) !== -1)
            row.style.display = null;
        else
            row.style.display = 'none';
    }
}
//Evento que realiza la busqueda en el input
busquedaTipo.addEventListener('keyup', buscaTablaMov);

//////////////////////////
//FILTRO DE BUSQUEDA POR MES
//
$(document.body).on('change', "#slcMes", function (e) {
    var optVal = $("#slcMes option:selected").val();
    $.ajax({
        type: "GET",
        url: rutaServidor + 'Movimientos/ObtenerMovimientosPorMes?Mes=' + optVal + '&Año=2020',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            $(".Mov").remove();
            for (var i in data) {
                //Modificacion de la fecha para mostrar nombres de los meses en lugar de numero
                var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                var fechaMovimientos = new Date(data[i].dtmFechaHora);
                var hora = data[i].dtmFechaHora.substring(11, 19);
                var FechaM = fechaMovimientos.getDate() + "/" + meses[fechaMovimientos.getMonth()] + "/" + fechaMovimientos.getFullYear();
                var FechaM1 = FechaM + ' ' + hora;
                //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                var FechaFinalMovi = formatDateMovimientos(FechaM1);
                //MOdificacion para el formato de monto en pesos.
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
                $("#tbMovimientos").append(
                    '<tr class="Mov" value=' + data[i].intIdMovimiento + '>' +
                    '<td data-id="3">' + FechaFinalMovi + '</td> ' +
                    '<td data-id="2">' + data[i].nombre + '</td >' +
                    '<td data-id="4">' + data[i].strReferencia + '</td> ' +
                    '<td data-id="5">' + data[i].strTelefono + '</td> ' +
                    '<td data-id="6">' + '$' + MontoFinal + '</td> ' +
                    '<td data-id="7">' + data[i].strTipo + '</td> ' +
                    '<td data-id="8">' + data[i].strMensaje + '</td> ' +
                    '<td data-id="5">' +
                    '<button id="' + data[i].intIdMovimiento + '" onClick="mtdVerDetalles(this)" class="button button-small edit" title ="Ver detalles"><i class="zmdi zmdi-collection-text"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</tr> '
                );
            }
            $("#tbMovimientos").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
});
//////////////////////////////////
//Filtro de busqueda por dia actual y de ayer.
$(document.body).on('change', "#slcdia", function (e) {
    var optVal = $("#slcdia option:selected").val();
    if (optVal == 'Hoy') {
        var FechaActual = new Date();
        var diaActualHoy = FechaActual.getDate();
        var mesHoy = FechaActual.getMonth() + 1;
        var anioHoy = FechaActual.getFullYear();
        $.ajax({
            type: "GET",
            url: rutaServidor + 'Movimientos/ObtenerMovimientosPorDia?Dia=' + diaActualHoy + '&Mes=' + mesHoy + '&Año=' + anioHoy,
            datatype: "Json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            success: function (data) {
                $(".Mov").remove();
                for (var i in data) {
                    //Modificacion de la fecha para mostrar nombres de los meses en lugar de numero
                    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                    var fechaMovimientos = new Date(data[i].dtmFechaHora);
                    var hora = data[i].dtmFechaHora.substring(11, 19);
                    var FechaM = fechaMovimientos.getDate() + "/" + meses[fechaMovimientos.getMonth()] + "/" + fechaMovimientos.getFullYear();
                    var FechaM1 = FechaM + ' ' + hora;
                    //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                    var FechaFinalMovi = formatDateMovimientos(FechaM1);
                    //MOdificacion para el formato de monto en pesos.
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
                    $("#tbMovimientos").append(

                        '<tr class="Mov" value=' + data[i].intIdMovimiento + '>' +
                        '<td data-id="3">' + FechaFinalMovi + '</td> ' +
                        '<td data-id="2">' + data[i].nombre + '</td >' +
                        '<td data-id="4">' + data[i].strReferencia + '</td> ' +
                        '<td data-id="5">' + data[i].strTelefono + '</td> ' +
                        '<td data-id="6">' + '$' + MontoFinal + '</td> ' +
                        '<td data-id="7">' + data[i].strTipo + '</td> ' +
                        '<td data-id="8">' + data[i].strMensaje + '</td> ' +
                        '<td data-id="5">' +
                        '<button id="' + data[i].intIdMovimiento + '" onClick="mtdVerDetalles(this)" class="button button-small edit" title ="Ver detalles"><i class="zmdi zmdi-collection-text"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '</tr> '
                    );
                }
                $("#tbMovimientos").selectpicker("refresh");
            },
            error: function (x) {
            },
        });

    } else {
        var FechaActual = new Date();
        var diaAnterior = FechaActual.getDate() - 1;
        var mesA = FechaActual.getMonth() + 1;
        var anioA = FechaActual.getFullYear();
        $.ajax({
            type: "GET",
            url: rutaServidor + 'Movimientos/ObtenerMovimientosPorDia?Dia=' + diaAnterior + '&Mes=' + mesA + '&Año=' + anioA,
            datatype: "Json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            success: function (data) {
              //  console.log(data);
                $(".Mov").remove();
                for (var i in data) {
                    //Modificacion de la fecha para mostrar nombres de los meses en lugar de numero
                    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                    var fechaMovimientos = new Date(data[i].dtmFechaHora);
                    var hora = data[i].dtmFechaHora.substring(11, 19);
                    var FechaM = fechaMovimientos.getDate() + "/" + meses[fechaMovimientos.getMonth()] + "/" + fechaMovimientos.getFullYear();
                    var FechaM1 = FechaM + ' ' + hora;
                    //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                    var FechaFinalMovi = formatDateMovimientos(FechaM1);
                    //MOdificacion para el formato de monto en pesos.
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
                    $("#tbMovimientos").append(

                        '<tr class="Mov" value=' + data[i].intIdMovimiento + '>' +
                        '<td data-id="3">' + FechaFinalMovi + '</td> ' +
                        '<td data-id="2">' + data[i].nombre + '</td >' +
                        '<td data-id="4">' + data[i].strReferencia + '</td> ' +
                        '<td data-id="5">' + data[i].strTelefono + '</td> ' +
                        '<td data-id="6">' + '$' + MontoFinal + '</td> ' +
                        '<td data-id="7">' + data[i].strTipo + '</td> ' +
                        '<td data-id="8">' + data[i].strMensaje + '</td> ' +
                        '<td data-id="5">' +
                        '<button id="' + data[i].intIdMovimiento + '" onClick="mtdVerDetalles(this)" class="button button-small edit" title ="Ver detalles"><i class="zmdi zmdi-collection-text"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '</tr> '
                    );
                }
                $("#tbMovimientos").selectpicker("refresh");
            },
            error: function (x) {
            },
        });
    }
});