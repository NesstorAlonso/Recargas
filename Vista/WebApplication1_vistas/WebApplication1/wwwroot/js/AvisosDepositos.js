$(document).ready(function () {
    mtdLlenarTablaDepositosPendientes();
    EnviarDatosMostrarEstatus();
    $("#buscaNombreinfoCuenta").show();
});
//Funcion que permite el llenado de la tabla de depositos,

function mtdLlenarTablaDepositos(e) {
    $("#tbDepositos td").remove();
    var IdUsuario = localStorage.getItem('idPadre');
    //console.log(IdUsuario);
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'AvisosDepositos/mtdObtenerDepositos',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
           // console.log(data);
            $(".sistemas").remove();
            for (var i in data) {
                var fechaAvisoD = data[i].dtmFechaHoraDep.substring(0, 10);
                var horaAvisoD = data[i].dtmFechaHoraDep.substring(11, 19);
                //invierte la fecha para obtener en este formato DD/MM/AAA
                var ObtFechaAvisoD = fechaAvisoD.split('-');
                ObtFechaAvisoD.reverse();
                var FormatoCorrecto = ObtFechaAvisoD.join('-');

                //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                var FechaHora = FormatoCorrecto + ' ' + horaAvisoD;
                var FechaFinal = formatDate(FechaHora);
                //
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

                $("#tbDepositos").append(

                    '<tr class="sistemas" value=' + data[i].intIdAvisoPago + '>' +
                    '<td data-id="2">' + FechaFinal + '</td >' +
                    '<td data-id="2">' + data[i].nombre + '</td >' +
                    '<td data-id="5"">' + '$' + MontoFinal + '</td> ' +
                    '<td data-id="3">' + data[i].strBancoDep + '</td> ' +
                    '<td data-id="4">' +
                    '<button id=" ' + data[i].intIdAvisoPago + '" onClick="MostrarStatus(this)" /*data-toggle="modal" data-target="#defaultModalStatus"*/ class="btn btn-default btn-round BotonCorrec1" title ="Verificar">Verificar<i class="zmdi zmdi"></i></button>' +
                    '&nbsp&nbsp&nbsp' + '</td >' +
                    '</td >' +
                    //'<td data-id="8">' +
                    ////aqui se puede agregar otro boton
                    //'<td data-id="9">' +                    
                    //'<td data-id="10">' +                   
                    '</tr> '
                );
              
            }
            $("#tbDepositos").selectpicker("refresh");
        },
        error: function (x) {
            // console.log(x);
        },
    });
}

//Esta funcion realiza un llenado de solo los depositos de abono pendientes.
function mtdLlenarTablaDepositosPendientes(e) {
    $("#tbDepositos td").remove();
    //console.log(IdUsuario);
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'AvisosDepositos/mtdObtenerAbonosPendientes?bitStatus=' + 'False',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
           // console.log(data);
            $(".sistemas1").remove();
            for (var i in data) {
                var fechaAvisoD = data[i].dtmFechaHoraDep.substring(0, 10);
                var horaAvisoD = data[i].dtmFechaHoraDep.substring(11, 19);
                //invierte la fecha para obtener en este formato DD/MM/AAA
                var ObtFechaAvisoD = fechaAvisoD.split('-');
                ObtFechaAvisoD.reverse();
                var FormatoCorrecto = ObtFechaAvisoD.join('-');

                //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                var FechaHora = FormatoCorrecto + ' ' + horaAvisoD;
                var FechaFinal = formatDate(FechaHora);
                //
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

                $("#tbDepositos").append(

                    '<tr class="sistemas1" value=' + data[i].intIdAvisoPago + '>' +
                    '<td data-id="2">' + FechaFinal + '</td >' +
                    '<td data-id="2">' + data[i].nombre + '</td >' +
                    '<td data-id="6">' + '$' + MontoFinal + '</td> ' +
                    '<td data-id="3">' + data[i].strBancoDep + '</td> ' +
                    '<td data-id="4">' +
                    '<button id="' + data[i].intIdAvisoPago + '" onClick="MostrarStatus(this)" /*data-toggle="modal" data-target="#defaultModalStatus" */class="btn btn-default btn-round" title ="Verificar">Pendiente<i class="zmdi zmdi"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</td >' +
                    //'<td data-id="8">' +
                    ////aqui se puede agregar otro boton
                    //'<td data-id="9">' +                    
                    //'<td data-id="10">' +                   
                    '</tr> '
                );

            }
            $("#tbDepositos").selectpicker("refresh");
        },
        error: function (x) {
            // console.log(x);
        },
    });
}


//metodo que realiza la funcion de carga la imagen para despues mandarla con ajax en body
$("#inputFileToLoad").change(function () {
    let input = document.getElementById('inputFileToLoad');
    let sizeFile;
    let file;
    let archivotemp;
    let nombreArchivo;
    if (!input.files[0]) {
        if (resGuardar = "Editar") {} else {
            nomArchivo = "Sin registro";
            extArchivo = "";
        }
    } else {
        file = input.files[0];
        sizeFile = file.size;
        if (parseFloat((((sizeFile) / 1024) / 1024)).toFixed(2) <= 2.00) {
            var reader = new FileReader();
            reader.readAsDataURL(file);//convierte a base64
            
            nombreArchivo = file.name;
            localStorage.setItem('nombreArchiv', file.name);
           // $("#nomArch").val(nombreArchivo);

            nomArchivo = nombreArchivo.substr(0, nombreArchivo.lastIndexOf('.'));
            extArchivo = "." + nombreArchivo.substr((nombreArchivo.lastIndexOf('.') + 1)).toLowerCase();
            localStorage.setItem('nomArchiv', nombreArchivo.substr(0, nombreArchivo.lastIndexOf('.')));
            localStorage.setItem('extArchiv', "." + nombreArchivo.substr((nombreArchivo.lastIndexOf('.') + 1)).toLowerCase());

            //console.log('nombreArchivo: ', nombreArchivo);
           // console.log('nomArchivo: ', nomArchivo);
            //console.log('extArchivo: ', extArchivo);
           // console.log(localStorage.getItem('nombreArchiv'));
           // console.log(localStorage.getItem('nomArchiv'));
          //  console.log(localStorage.getItem('extArchiv'));



            reader.onload = function () {
                archivotemp = reader.result;
                archivo = archivotemp.substr(archivotemp.indexOf(',') + 1);//
                localStorage.setItem('archiv', archivotemp.substr(archivotemp.indexOf(',') + 1));
                //console.log('Base64 del archivo: ', archivo);
               // console.log(localStorage.getItem('archiv'));
                reader.onerror = function () {
                   // console.log('resultado', reader.error);
                };
            };

        } else {
            Swal.fire({
                type: 'error',
                title: 'Error ',
                html: "El tamaño del archivo es mayor de 2MB<br> Ingrese un archivo de menor tamaño."
            });
        }
    }
});
// 
/////////////////////////////////////////////////////////
$("#btnSolicitarAbono").click(function () {
    var IdClienteD = localStorage.getItem('userName');
    var data = {
        //strNombreArch: localStorage.getItem('nombreArchiv'),
        strReferencia: $("#ReferenciaPago").val(),
        dtmFechaHoraDep: $("#dtmFHDepo").val(),
        strBancoDep: $("#slcBanco option:selected").val(),
        bitStatus: false,
        dcmMonto: $("#MontoPago").val(),
        strObservaciones: 'Ninguno',
        bitPagoValido: false,
        strCliente: IdClienteD,
        dtmFechaHoraCap: $("#dtmFHCap").val(),
        dtmFechaHoraValidacion: '2020-01-01 00:00:00',
        strIdUsuarioValidacion: 'Ninguno',
        imgComprobante: localStorage.getItem('archiv'),//cadena base64
        strNomArchivo: localStorage.getItem('nomArchiv'),
        strExtension: localStorage.getItem('extArchiv')
    };
    //console.log(data);
    parametros = {
        method: 'POST', // or 'PUT'
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(rutaServidor + 'AvisosDepositos/mtdInsertar', parametros).then(function (avDep) {
        if (avDep.status == 200) {
            Swal.fire({
                type: 'success',
                mode: 'cors',
                title: 'Datos agregados correctamente',
                text: 'La respuesta fue agregada correctamente'
            });
            setTimeout(" window.location.href = 'AvisoPagos'", 2000);
           // console.log(avDep);
        }
    });
});

//Funcion para obtener el status del abono, esto funciona cuando se presiona el boton de verificar
function MostrarStatus(e) {
    data = e.id;
    localStorage.setItem("idEditarEstatusAvisoP", data);
    window.location.href = 'https://www.recargacelulares.com.mx/Home/EstatusAvisosDepositos';
    // console.log(localStorage.getItem("idEditarEstatusAvisoP"));
    //$("#strObservaciones").hide();
    //$("#dvObse").hide();
    //data = e.id;
    //localStorage.setItem('idIm', data);
    //let link; //variable que almacena el dataURL
    //// console.log('hola');
    //$.ajax({
    //    type: 'GET',
    //    url: rutaServidor + 'AvisosDepositos/mtdObtenerArchivoPorId?intIdAvisoPago=' + data,
    //    datatype: 'json',
    //    success: function (response) {
    //        console.log(response);
    //        $("#DepositoReferencia").val(response[0].strReferencia);
    //        $("#DepositoFHD").val(response[0].dtmFechaHoraDep);
    //        $("#DepositoBanco").val(response[0].strBancoDep);
    //        $("#DepositoMonto").val(response[0].dcmMonto);
    //        $("#DepositoObservaciones").val(response[0].strObservaciones);
    //        $("#DepositoCliente").val(response[0].strCliente);
    //        $("#DepositoFHC").val(response[0].dtmFechaHoraCap);
    //        $("#DepositoFHValidacion").val(response[0].dtmFechaHoraValidacion);
    //        $("#DepositoUsuarioVAl").val(response[0].strIdUsuarioValidacion);

    //        localStorage.setItem("Stat", response[0].bitStatus);
    //        localStorage.setItem("idAvisoP", response[0].intIdAvisoPago);
    //        console.log(localStorage.getItem('Stat'));
    //        if (localStorage.getItem('Stat') == 'true') {

    //            //$("#strObservaciones").hide();
    //           // $("#DeAceptado input[type=checkbox]").prop("checked", true);
    //        }

    //        obtenerStatus();
    //        CambiarEstatus();
    //        //
    //        link = linkArchivo(response[0].strExtension) + response[0].imgComprobante;
    //        console.log("Liga: ", link);

    //        var imgB64 = document.getElementById("imgB64");

    //        imgB64.src = link;
    //        //imgB64.onclick = function () {
    //        //    this.src = link;
    //        //}
    //    },
    //    error: function () {

    //    }

    //});
}
//Funcion que cacha los datos enviados al presionar el boton de pendientes.
function EnviarDatosMostrarEstatus() {
    var idEUAvisoP = localStorage.getItem("idEditarEstatusAvisoP");
    $("#strObservaciones").hide();
    $("#dvObse").hide();
    $("#dvObseRecHazo").hide();
    data = idEUAvisoP;
    localStorage.setItem('idIm', data);
    let link; //variable que almacena el dataURL
    // console.log('hola');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'AvisosDepositos/mtdObtenerArchivoPorId?intIdAvisoPago=' + idEUAvisoP,
        datatype: 'json',
        success: function (response) {
           // console.log(response);
            $("#DepositoReferencia").val(response[0].strReferencia);
            $("#DepositoFHD").val(response[0].dtmFechaHoraDep);
            $("#DepositoBanco").val(response[0].strBancoDep);
            $("#DepositoMonto").val(response[0].dcmMonto);
            $("#DepositoObservaciones").val(response[0].strObservaciones);
            $("#DepositoCliente").val(response[0].nombre);
            $("#DepositoFHC").val(response[0].dtmFechaHoraCap);
            $("#DepositoFHValidacion").val(response[0].dtmFechaHoraValidacion);
            $("#DepositoUsuarioVAl").val(response[0].strIdUsuarioValidacion);

            localStorage.setItem("Stat", response[0].bitStatus);
            localStorage.setItem("idAvisoP", response[0].intIdAvisoPago);
            localStorage.setItem("UNameCliente", response[0].id);
           // console.log(localStorage.getItem('Stat'));
            if (localStorage.getItem('Stat') == 'true') {

                //$("#strObservaciones").hide();
                // $("#DeAceptado input[type=checkbox]").prop("checked", true);
            }

            obtenerStatus();
            CambiarEstatus();
            //
            link = linkArchivo(response[0].strExtension) + response[0].imgComprobante;
           // console.log("Liga: ", link);

            var imgB64 = document.getElementById("imgB64");

            imgB64.src = link;
            //imgB64.onclick = function () {
            //    this.src = link;
            //}
        },
        error: function () {

        }

    });
}
//


//////$("#btnAgregarAvDep").click(function () {

//$("#btnMostrarImg").click(function obtieneArchivo(id) {
//    let link; //variable que almacena el dataURL
//    $.ajax({
//        type: 'GET',
//        url: rutaServidor + 'AvisosDepositos/mtdObtenerArchivoPorId?intIdAvisoPago=5',
//        dataType: 'json',
//       // headers: header,
//        //beforeSend: function () {
//        //    console.log("en proceso...");
//        //    //$("#defaultModal").modal('show');
//        //    Swal.fire({
//        //        title: 'Descargando archivo',
//        //        type: 'info',
//        //        allowOutsideClick: false
//        //    })

//        //    swal.showLoading();
//        //},
//        //complete: function () {
//        //    console.log("terminado");
//        //    swal.close();
//        //},
//        success: function (response) {
//            link = linkArchivo(response[0].strExtension) + response[0].imgComprobante;
//            console.log("Liga: ", link);

//            var imgB64 = document.getElementById("imgB64");

//            imgB64.onclick = function () {
//                this.src = link;
                
//            }
//            //imgB64.onclick = function () {
//            //    this.src = link;
//            //}

//            //var liga = document.createElement('a'); //se crea un elemento a
//            //liga.href = link; //se le asigna el link del dataURL como valor
//            //liga.download = response[0].nomArchivo + response[0].extArchivo; //se asigna nombre al archivo
//            //liga.dispatchEvent(new MouseEvent('click')); //realiza el clickeo de enlace
//        },
//        error: function (x) {
//            console.log(x);
//            Swal.fire({
//                type: 'error',
//                title: 'No se puedo recuperar el archivo'
//            });
//        },
//    });
//});


//funcion que devuel  data:application;base64,
function linkArchivo(extension) {
    switch (extension) {
        case '.jpg':
            return "data:image/jpeg;base64,";
           // console.log('Es una imagen: jpg');
            break;
        case '.png':
            return "data:image/png;base64,";
           // console.log('Es una imagen: png');
            break;
        //case '.gif':
        //    return "data:image/gif;base64,";
        //    console.log('Es una imagen: gif'); // There's was a typo in the example where
        //    break; // the alert ended with pdf instead of gif.
        //case '.doc':
        //    return "data:application/msword;base64,";
        //    console.log('Es un documento MS word 2003');
        //    break;
        //case '.docx':
        //    return "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,";
        //    console.log('Es un documento MS word 2007+');
        //    break;
        //case '.pdf':
        //    return "data:application/pdf;base64,";
        //    console.log('Es un archivo PDF');
        //    break;
        //case '.xls':
        //    return "data:application/vnd.ms-excel;base64,";
        //    console.log('Es un documento de MS Excel 2003');
        //    break;
        //case '.xlsx':
        //    return "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
        //    console.log('Es un documento de MS Excel 2007+');
        //    break;
        //case '.ppt':
        //    return "data:application/vnd.ms-powerpoint;base64,";
        //    console.log('Es un documento de MS PowerPoint 2003');
        //    break;
        //case '.pptx':
        //    return "data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,";
        //    console.log('Es un documento de MS PowerPoint 2007+');
        //    break;
        //case '.txt':
        //    return "data:plain/text;base64,";
        //    console.log('Es un archivo de text');
        //    break;
        default:
            return "data:plain/text;base64,";
           // console.log('Tipo de archivo no reconocido');
            Swal.fire({
                type: 'error',
                title: 'Formato no reconocido ',
                text: 'Este campo recibe archivos Pdf, MS Word, MS Excel, MS PowerPoint, Imagen y Texto'
            });
    }
}

//Funcion para realizar el cambio del estatus del deposito de abono 
//Esta funcion se ejecuta cuando cambia el interruptor que se encuentraen el modal al presionar el boton pendiente
function CambiarEstatus() {
    var idAvisoPag = localStorage.getItem('idAvisoP');
    $('#checkboxStatus').change(function () {
        if (this.checked) {
            var returnVal = confirm("Desea aceptar el deposito?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'PUT',
                url: rutaServidor + "AvisosDepositos/mtdCambiarStatus?intIdAvisoPago=" + idAvisoPag + "&bitStatus=" + 'True',
                dataType: '',
                success: function (response) {
                    location.reload();
                    // console.log('si');
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error al cambiar el estatus',
                        text: 'Error en el servidor error al cambiar estatus'
                    });
                }
            });

        } else {
            $.ajax({
                type: 'PUT',
                url: rutaServidor + "AvisosDepositos/mtdCambiarStatus?intIdAvisoPago=" + idAvisoPag + "&bitStatus=" + 'False',
                dataType: '',
                success: function (response) {
                    alert('Cambio el Status a Pendiente');
                    location.reload();
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error al cambiar el estatus',
                        text: 'Error en el servidor error al cambiar estatus'
                    });
                }
            });
        }
    });   
}
//
//botones de la vista info cuenta 
$("#btnPendiente").click(function () {  
    $("#buscaSaldoinfoCuenta").hide();
    mtdLlenarTablaDepositosPendientes();
    $("#buscaNombreinfoCuenta").show();
});
//
//
$("#btnDepositos").click(function () {
    $("#buscaSaldoinfoCuenta").show();
    mtdLlenarTablaDepositos();
    $("#buscaNombreinfoCuenta").hide();
});

//Funcion que va a pintar el boton dependiendo el estatus del abono
//function VerificarStatus()
//{
//    $.ajax({
//        type: "GET",
//        url: rutaServidor + 'AvisosDepositos/mtdObtenerDepositos',
//        datatype: "Json",
//        headers: {
//            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
//        },
//        success: function (data) {
//            console.log(data);
//            for (i = 0; i < data.length; i++) {
//                var Estatus = data[i].bitStatus;
//                console.log(Estatus);
               
//                if (Estatus == 'true') {
//                    $('#btOk').hide();
//                }                
//            }
          
//        },
//        error: function (x) {
//            // console.log(x);
//        },
//    });
//}

//



//Funcion que realiza un refresco a la pantalla al presionar el boton desde el modal de mostrar la info.

$("#btnRegresa").click(function () {
    window.location.href = 'https://www.recargacelulares.com.mx/Home/InfoCuenta';
});


//funcion que permite descargar un archivo
$("#btnDescComp").click(function () {
    //    function obtieneArchivo(id) {
    let link; //variable que almacena el dataURL
    //let idIm;
    //console.log(localStorage.getItem('idIm'));
    var idIm2 = localStorage.getItem('idIm');
    //console.log(idIm2);
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'AvisosDepositos/mtdObtenerArchivoPorId?intIdAvisoPago=' + idIm2,//rutaServidor + 'Respuestas/mtdObtenerArchivoPorId?intIdRespuesta=' + id,
        dataType: 'json',
        // headers: header,
        beforeSend: function () {
           // console.log("en proceso...");
            //$("#defaultModal").modal('show');
            //Swal.fire({
            //    title: 'Descargando archivo',
            //    type: 'info',
            //    allowOutsideClick: false
            //})

            //swal.showLoading();
        },
        complete: function () {
           // console.log("terminado");
            swal.close();
        },
        success: function (response) {
            link = linkArchivo(response[0].strExtension) + response[0].imgComprobante; //EXTENSION Y NOMBRE DEL ARCHIV
            var liga = document.createElement('a'); //se crea un elemento a
            liga.href = link; //se le asigna el link del dataURL como valor
            liga.download = response[0].strNomArchivo + response[0].strExtension; //se asigna nombre al archivo
            liga.dispatchEvent(new MouseEvent('click')); //realiza el clickeo de enlace
        },
        error: function (x) {
           // console.log(x);
            Swal.fire({
                type: 'error',
                title: 'No se puedo obtner el achivo'
            });
        },
    });
});

//Validacion que la referencia del deposito no se duplique o que ya se encuentre en la base de datos.
document.getElementById("ReferenciaPago").onblur = function () { ValidaReferencia() };
function ValidaReferencia() {
    if ($("#ReferenciaPago").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'El Campo de referencia no puede estar vacío'
        });
    } else {
        $.ajax({
            type: 'GET',
            url: rutaServidor + 'AvisosDepositos/VerificaReferencia?strReferencia=' + $("#ReferenciaPago").val(),
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                Swal.fire({
                    type: 'warning',
                    title: 'Referencia ya existente',
                    text: 'Porfavor ingrese una referencia valida',
                });
            },
            error: function (x) {
            },
        });
    }
}

///Esto realiza una activacion mediante el combo de select, para aplicar o rechazar un abono
//
$(document.body).on('change', "#AcSlt", function (e) {
    //doStuff
    var optVal = $("#AcSlt option:selected").val();
    //alert(optVal);
    if (optVal == 'False') {
        $("#strObservaciones").show();
        $("#dvObse").hide();
        $("#dvObseRecHazo").show();
    } else {
        $("#strObservaciones").hide();
        $("#dvObse").show();
        $("#dvObseRecHazo").hide();

    }
    if (optVal == '') {
        $("#dvObse").hide();
        $("#dvObseRecHazo").hide();
    }
    //else {
    //    $("#dvObse").show();
    //    $("#dvObseRecHazo").show();
    //}
});
//Funcion que procede a guardar el status dell cliente.
//Funcion que procede a guardar el status dell cliente.
function GStatus() {
    var idGAvisoPag = localStorage.getItem('idAvisoP');
    $.ajax({
        type: 'PUT',
        url: rutaServidor + "AvisosDepositos/mtdCambiarStatus?intIdAvisoPago=" + idGAvisoPag
            + "&bitStatus=" + $.trim($("#AcSlt option:selected").val())
            + "&strObservaciones=" + $.trim($("#exampleFormControlTextarea1").val()),
        dataType: '',
        success: function(response) {
            //Swal.fire({
            //    type: 'success',
            //    title: 'Estatus actualizado'
            //});
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/InfoCuenta'", 2500);
            // location.reload();
            // console.log('si');
        },
        error: function(response) {
            Swal.fire({
                type: 'error',
                title: 'Error al cambiar el estatus',
                text: 'Error en el servidor error al cambiar estatus'
            });
        }
    });
}
//$("#GObservaciones").click(function () {
//    var idGAvisoPag = localStorage.getItem('idAvisoP');
//    $.ajax({
//        type: 'PUT',
//        url: rutaServidor + "AvisosDepositos/mtdCambiarStatus?intIdAvisoPago=" + idGAvisoPag
//            + "&bitStatus=" + $.trim($("#AcSlt option:selected").val())
//            + "&strObservaciones=" + $.trim($("#exampleFormControlTextarea1").val()),
//        dataType: '',
//        success: function (response) {
//            Swal.fire({
//                type: 'success',
//                title: 'Estatus actualizado'
//            });
//            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/InfoCuenta'", 2500);
//            // location.reload();
//            // console.log('si');
//        },
//        error: function (response) {
//            Swal.fire({
//                type: 'error',
//                title: 'Error al cambiar el estatus',
//                text: 'Error en el servidor error al cambiar estatus'
//            });
//        }
//    });
//});

//Funcion para realizar la busqueda por fecha y pintar una tabla conforme se valla pidiendo esto en informacion de la cuenta
$('#FBFechaInfoCuenta').click(function () {
    if ($("#dtmFechaIInfoCuenta").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Fecha Inicial vacia',
            text: 'Porfavor ingrese una fecha'
        });
    }
    else {
        if ($("#dtmFechaFInfoCuenta").val() == "") {
            Swal.fire({
                type: 'error',
                title: 'Fecha Final vacia',
                text: 'Porfavor ingrese una fecha'
            });
        } else {
            $("#tbDepositos td").remove();
            var IdUsuario = localStorage.getItem('idPadre');
            //console.log(IdUsuario);
            var fila = 1;
            fila++;
            $.ajax({
                type: "GET",
                url: rutaServidor + 'AvisosDepositos/FiltroBusquedaFechaInfoCuenta?FechaInicio=' + $("#dtmFechaIInfoCuenta").val() + '&FechaFin=' + $("#dtmFechaFInfoCuenta").val(),
                datatype: "Json",
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
                },
                success: function (data) {
                  //  console.log(data);
                    $(".sistemas").remove();
                    for (var i in data) {
                        var fechaAvisoD = data[i].dtmFechaHoraDep.substring(0, 10);
                        var horaAvisoD = data[i].dtmFechaHoraDep.substring(11, 19);
                        //invierte la fecha para obtener en este formato DD/MM/AAA
                        var ObtFechaAvisoD = fechaAvisoD.split('-');
                        ObtFechaAvisoD.reverse();
                        var FormatoCorrecto = ObtFechaAvisoD.join('-');

                        //Modificacion para convertir el formato de hora de 24hrs a 12hr PM AM
                        var FechaHora = FormatoCorrecto + ' ' + horaAvisoD;
                        var FechaFinal = formatDate(FechaHora);
                        //
                        //
                        //MOdificacion para el formato de monto en pesos.
                        var Monto = parseFloat(data[i].dcmMonto).toFixed(2);
                      //  console.log(Monto);
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
                       //console.log(MontoFinal);
                        //

                        $("#tbDepositos").append(

                            '<tr class="sistemas" value=' + data[i].intIdAvisoPago + '>' +
                            '<td data-id="2">' + FechaFinal + '</td >' +
                            '<td data-id="2">' + data[i].nombre + '</td >' +
                            '<td data-id="5"">' + '$' + MontoFinal + '</td> ' +
                            '<td data-id="3">' + data[i].strBancoDep + '</td> ' +
                            '<td data-id="4">' +
                            '<button id=" ' + data[i].intIdAvisoPago + '" onClick="MostrarStatus(this)" /*data-toggle="modal" data-target="#defaultModalStatus"*/ class="btn btn-default btn-round BotonCorrec1" title ="Verificar">Verificar<i class="zmdi zmdi"></i></button>' +
                            '&nbsp&nbsp&nbsp' + '</td >' +
                            '</td >' +
                            //'<td data-id="8">' +
                            ////aqui se puede agregar otro boton
                            //'<td data-id="9">' +                    
                            //'<td data-id="10">' +                   
                            '</tr> '
                        );

                    }
                    $("#tbDepositos").selectpicker("refresh");
                    mtdLimpiarCamposFechaInfoCuenta();
                },
                error: function (x) {
                    // console.log(x);
                },
            });
        }
    }
});
//Funcion que limpia los campos datetime de fechas de filtro busqueda.
function mtdLimpiarCamposFechaInfoCuenta() {
    $("#dtmFechaIInfoCuenta").val("");
    $("#dtmFechaFInfoCuenta").val("");
}

//Realiza el filtro de busqueda de una tabla
var busqueda = document.getElementById('NombreIC');
var table = document.getElementById("tbDepositos").tBodies[0];

buscaTabla = function () {
    texto = busqueda.value.toLowerCase();
    var r = 0;
    while (row = table.rows[r++]) {
        if (row.innerText.toLowerCase().indexOf(texto) !== -1)
            row.style.display = null;
        else
            row.style.display = 'none';
    }
}
//Evento que realiza la busqueda en el input
busqueda.addEventListener('keyup', buscaTabla);
