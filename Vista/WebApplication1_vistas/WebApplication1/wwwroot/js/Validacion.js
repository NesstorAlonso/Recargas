var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
var expr1 = /^[a-zA-Z]*$/;

$(document).ready(function () {
    // MostrarLogoUsuario();
    obtenerUser();
    obtenerRole();
    obtenerNivel();
    obtenerPadreCliente();
    obtenerCompania();
    obtenerNombre();
    obtenerMontoActual();
    RecargaMActual();
    obtenerMontoActualTraspasoSaldo();
    //Muestra logo de usuario
  
    ValidaRol();
   // obtenerPadre()
    $('#linkClose').click(function () {       
            $('#divError').hide('fade');
        });
});


$('#InicioSe').click(function () {
    if ($("#Correo").val() == "" || $("#Contrasena").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No se puede continuar con campos vacíos'
        });
    }
    else {

        ValidaRol();

        $.ajax({
            // Post username, password & the grant type to /token
             //url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/Login',
            url: 'https://localhost:5001/api/Cuentas/Login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    Usuario: $("#Correo").val(),
                    strContrasena: $("#Contrasena").val(),
                    Rol: $("#InsertarRol").val()

                }),
            beforeSend: function () {
                $('#InicioSe').html('Cargando...');
            },
            // Cuando la solicitud se complete correctamente, guarde el
            // token de acceso en el almacenamiento de la sesión del navegador y
            // redirige al usuario a la página principal.
            success: function (data) {
                console.log("data "+ data);

               
                var Datos = JSON.parse(localStorage.getItem("data"));
                localStorage.setItem("idPadre", Datos["0"]["id"]);
                localStorage.setItem("Nivel", Datos["0"]["intNivel"]);
                localStorage.setItem("NombrePadre", Datos["0"]["padre"]);
                localStorage.setItem("NombrePadre1", Datos["0"]["userName"]);
                localStorage.setItem("Compania", Datos["0"]["strComercio"]);
                //para concatenar el nombre completo y ponerlo en la vista de vendedoress
                localStorage.setItem("Nombre", Datos["0"]["strNombre"]);
                localStorage.setItem("Apaterno", Datos["0"]["strApaterno"]);
                localStorage.setItem("Amaterno", Datos["0"]["strAmaterno"]);
                ////
                localStorage.setItem("Estatus", Datos["0"]["strEstatus"]);
                localStorage.setItem("Confirmacion", Datos["0"]["emailConfirmed"]);
                localStorage.setItem("Nip", Datos["0"]["intNip"]);
                localStorage.setItem("bitNip", Datos["0"]["bitNip"]);
                estadoUsuario = localStorage.getItem("Estatus");

                mtdConsultarLogos();
                if (estadoUsuario == 'A') {


                    //Guardo el usuario para despues ponerlo en la interfaz           
                    localStorage.setItem("userName", $("#Correo").val());
                    localStorage.setItem("Role", $("#InsertarRol").val());
                    //se crea variable para token
                    var jsonRetorno = (data);
                    //se manda a guardar solo el token en sessionStorage
                    sessionStorage.setItem("accessToken1", jsonRetorno["token"]);
                    sessionStorage.setItem('accessToken', data.access_token)

                    var confirmed = localStorage.getItem("Confirmacion");

                    var nipU = localStorage.getItem("Nip");
                  
                    console.log("Dato " + confirmed);
                    if (confirmed == "false" & nipU == "0") {
                        setTimeout("window.location.href = 'https://localhost:44338/Home/Contrasena'", 3500);
                        //setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Contrasena'", 3500);
                        console.log("Dentro e confir");
                    }
                    else {
                        //setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Index'", 3500); 
                        setTimeout("window.location.href = 'https://localhost:44338/Home/Index'", 3500);
                        RecargaMActual();
                    }

                }
                else {

                    Swal.fire({
                        type: 'warning',
                        title: 'Usuario dado de baja',
                        text: 'Contacte a un administrador.'

                    });
                }

            },
            // imprime los errores puede ser desde bootstrap o de sweetalert
            error: function (jqXHR) {
                Swal.fire({
                    type: 'warning',
                    title: 'Correo o Contraseña invalidos',
                    text: 'Ingrese los datos correctamente'

                });
                $('#InicioSe').html('Iniciar sesion');
                //$('#divErrorText').text(jqXHR.responseText);
                //$('#divError').show('fade');
            }

        });
    }

        });



   



//Crear Usuario para Login

$(document).ready(function () {
   
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });   
 // Aqui estaba boton de inicio
});

$('#btnRegistro').click(function () {
    //If que comprueba si las contraseñas coinciden, si coniciden prosigue de lo contrario no deja registrar.
    if ($("#IContrasena").val().trim() != $("#IConfirmar").val().trim()) {
        Swal.fire({
            type: 'error',
            title: 'Confirme su contraseña',
            text: 'Las contraseñas no coinciden'
        });
    }
    else {
        $.ajax({
            url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/Crear',
            //url: 'https://localhost:5001/api/Cuentas/Crear',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    Usuario: $("#NickNombre").val(),
                    strCorreo: $("#ICorreo").val(),
                    Tel: $("#NTel").val(),
                    strContrasena: $("#IContrasena").val(),
                    Rol: "Cliente",
                    confirmPassword: $('#IConfirmar').val()
                }),
            success: function () {
                Swal.fire({
                    type: 'success',
                    title: 'Agregado Correctamente',
                    text: 'Usuario agregado correctamente',
                    showConfirmButton: false,
                    timer: 3000

                });
                setTimeout(" window.location.href = 'Activacion'", 3000);
                //setTimeout(5000);
                //window.location.href = "Salir";
            },

            error: function (jqXHR) {
                Swal.fire({
                    type: 'warning',
                    title: 'Verifique lo siguiente',
                    //text: '1.-Usuario ya existente 2.-Contraseñas invalidas(Ejemplo de contraseña valida: MartI2!6)' ,
                    showConfirmButton: true,
                    html:
                        '<br/>' +
                        '<h6>1.-Usuario ya existente</h6>' +
                        '<h6>2.-Contraseñas invalidas</h6>' +
                        '<p>(Ejemplo de contraseña valida: MartI2!6)</p>'
                });
                //$('#divErrorText').text(jqXHR.responseText);
                //$('#divError').show('fade');
            }
        });
    }
});

//Funcion onclick que permite terminar con el token o remover sesion.
$("#btnSalir").click(function () {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken1');
    localStorage.removeItem('userName');
    localStorage.removeItem('Role');
    localStorage.removeItem('Permisos');
    localStorage.removeItem('TodosPermisos');
    localStorage.removeItem('intIdRol');
    localStorage.removeItem('UReg');
    localStorage.removeItem('IdPadre');
    localStorage.removeItem('data');
    localStorage.removeItem('idPadre');
    localStorage.removeItem('Nivel');
    localStorage.removeItem('NombrePadre');
    localStorage.removeItem('UserHijos');
    localStorage.removeItem('accioneshijos');
    localStorage.removeItem('IdComision');
    localStorage.removeItem('SaldoMinHijo');
    localStorage.removeItem('Compania');
    localStorage.removeItem('Nombre');
    localStorage.removeItem('Apaterno');
    localStorage.removeItem('Amaterno');
    localStorage.removeItem('UVendedor');
    localStorage.removeItem('idAvisoP');
    localStorage.removeItem('Stat');
    localStorage.removeItem('MActual');
    localStorage.removeItem('idSaldoOrigen');
    localStorage.removeItem('MMail');
    localStorage.removeItem('idEditarEstatusAvisoP');
    localStorage.removeItem('ipDir');
    localStorage.removeItem('Latitud');
    localStorage.removeItem('Longitud');
    localStorage.removeItem('RMontoTelcel');
    localStorage.removeItem('MsjMovimiento');
    localStorage.removeItem('RMontoPaquetes');
    localStorage.removeItem('MensajeMovimientoPa');
    localStorage.removeItem('MontoInterT');
    localStorage.removeItem('MensajeMovimientoIn');
    localStorage.removeItem('MontoTAMovi');
    localStorage.removeItem('MensajeMovimientoTAMovi');
    localStorage.removeItem('MontoInMovi');
    localStorage.removeItem('MensajeInterMovi');
    localStorage.removeItem('MontoPaMovi');
    localStorage.removeItem('MesnajeMoviPa');
    localStorage.removeItem('MontoTAUnefon');
    localStorage.removeItem('MensajeMovimientoTAUnefon');
    localStorage.removeItem('MontoFLasMobile');
    localStorage.removeItem('MensajeMovFLas');
    localStorage.removeItem('MontoATT');
    localStorage.removeItem('MensajeATT');
    localStorage.removeItem('MontoOUI');
    localStorage.removeItem('MensajeOUi');
    localStorage.removeItem('MontoTuenti');
    localStorage.removeItem('MensajeTuenti');
    localStorage.removeItem('MontoVirgin');
    localStorage.removeItem('MesnajeVirgin');
    localStorage.removeItem('MontoMazTiempo');
    localStorage.removeItem('MensajeMazTi');
    localStorage.removeItem('MontoCierto');
    localStorage.removeItem('msnCierto');
    localStorage.removeItem('MontoSimpati');
    localStorage.removeItem('MontoWeex');
    localStorage.removeItem('MnsWeex');
    localStorage.removeItem('mnsMega');
    localStorage.removeItem('mnsCfe');
    localStorage.removeItem('mnsSky');
    localStorage.removeItem('mnsOriflame');
    localStorage.removeItem('mnsAvon');
    localStorage.removeItem('mnsInfonavit');
    localStorage.removeItem('mnsTelmex');
    localStorage.removeItem('mnsFATT');
    localStorage.removeItem('IdVerDetalles');
    localStorage.removeItem('nombreArchiv');
    localStorage.removeItem('nomArchiv');
    localStorage.removeItem('extArchiv');
    localStorage.removeItem('archiv');
    localStorage.removeItem('Liga');
    localStorage.removeItem('ComPesos');
    localStorage.removeItem('EqVComisionR');
    localStorage.removeItem('CPorcentaje');
    localStorage.removeItem('ComisionRecarga');
    localStorage.removeItem('NombrePadre1');
    localStorage.removeItem('ComisionUsuario');
    localStorage.removeItem('ComisionServicio');
    localStorage.removeItem('MontoTraspasoCo');
    localStorage.removeItem('MontoDAbonoC');
    localStorage.removeItem('NombHijoPad');
    localStorage.removeItem('logo');
    localStorage.removeItem('leyenda');
    localStorage.removeItem('Estatus');
    localStorage.removeItem('Nip');
    localStorage.removeItem('Confirmacion');
    localStorage.removeItem('idlm');
    localStorage.removeItem('bitNip');
    localStorage.removeItem('Cp');
    localStorage.removeItem('Estado');
    localStorage.removeItem('Municipio');
    localStorage.removeItem('Colonia');
    localStorage.removeItem('Calle');
    localStorage.removeItem('NumExt');
    localStorage.removeItem('NumInt');
    localStorage.removeItem('Contacto');


    window.location.href = 'https://www.recargacelulares.com.mx/Home/Salir';
    });

document.addEventListener('keypress', function (evt) {

    // Si el evento NO es una tecla Enter
    if (evt.key !== 'Enter') {
        return;
    }

    let element = evt.target;

    // Si el evento NO fue lanzado por un elemento con class "focusNext"
    if (!element.classList.contains('focusNext')) {
        return;
    }

    // AQUI logica para encontrar el siguiente
    let tabIndex = element.tabIndex + 1;
    var next = document.querySelector('[tabindex="' + tabIndex + '"]');

    // Si encontramos un elemento
    if (next) {
        next.focus();
        event.preventDefault();
    }
});

// obtiene usuario
    function obtenerUser() {
        $('#spanUsername').text('' + localStorage.getItem('userName'));
}
// obtiene el rol del usuario
function obtenerRole() {
    $('#spanRole').text('' + localStorage.getItem('Role'));
}
// obtiene elnivel del cliente
function obtenerNivel() {
    $('#spanNiv').text('N-' + localStorage.getItem('Nivel'));
}
// obtiene el padre del cliente
function obtenerPadreCliente() {
    $('#spanPad').text('' + localStorage.getItem('NombrePadre1'));
}
//
// obtiene el Nombre del comercio o compañia
function obtenerCompania() {
    $('#spanCompania').text('' + localStorage.getItem('Compania') + ' ');
}
// obtiene el Nombre completo del cliente el cual registro un vendedor
function obtenerNombre() {
    $('#spanNombreC').text('  ' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apaterno') + ' ' + localStorage.getItem('Amaterno'));
}
//
// obtiene el monto actual del cliente logeado
function obtenerMontoActual() {
    $('#SpanMonto').text('' + localStorage.getItem('MActual'));
}
// obtiene el monto actual del cliente en la vista traspaso saldo
function obtenerMontoActualTraspasoSaldo() {
    $('#SpanMontoTS').text('' + localStorage.getItem('MActual'));
}
//
//
function obtenerStatus() {

    if (localStorage.getItem('Stat') == 'true') {
        $('#spanStatus').text('Aceptado');
    } else {
        $('#spanStatus').text('Pendiente');
    }

}
//// obtiene Padre
//function obtenerPadre() {
//    $('#spanPadre').text('' + localStorage.getItem('userName'));
//}
////

//valida que rol es el usuario para poder iniciar sesion con los permisos correspondientes
document.getElementById("Correo").onblur = function () { ValidaRol() };

function ValidaRol() {
   $.ajax({
        type: 'GET',
        url: 'https://apirecargas.recargacelulares.com.mx/api/AsignaRole/ObtenerRol?UserName=' + $("#Correo").val(),
        //url: 'https://localhost:5001/api/AsignaRole/ObtenerRol?UserName=' + $("#Correo").val(),
        dataType: 'JSON',
       success: function (data) { 
       console.log(data)
            //guardamos el intIdRol para ser manipulado por los permisos.
            var IdRol = (data);
            //console.log(IdRol["0"]["roleId"]);
            localStorage.setItem("intIdRol", IdRol["0"]["roleId"]);
           // localStorage.setItem("MActual", IdRol["0"]["dcmSaldo"]); //<-- obtener el saldo actual
            localStorage.setItem("data", JSON.stringify(data));
            //
            localStorage.setItem("MMail", $("#Correo").val());
            //console.log(localStorage.getItem('MMail'));
            //
            $(".Rolle").remove();
            for (var i in data) {
                $('#InsertarRol').append("<option class='Rolle' value='" + data[i].name + "'>" + data[i].name + "</option>");
            }

            $("#InsertarRol").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
    RecargaMActual();
}

//Funcion que realiza la consulta del monto actual, basandose en la consulta anterior
//de obtener el rol.
function RecargaMActual() {
  //  console.log("Esta en RecargaMActual");
    $.ajax({
        type: 'GET',
        //url: 'https://apirecargas.recargacelulares.com.mx/api/AsignaRole/ObtenerRol?UserName=' + localStorage.getItem('MMail'),
        url: 'https://localhost:5001/api/AsignaRole/ObtenerRol?UserName=' + localStorage.getItem('MMail'),
        dataType: 'JSON',
        success: function (data) {

            localStorage.setItem("Cp", data["0"]["strCp"]);
            localStorage.setItem("Estado", data["0"]["strEstado"]);
            localStorage.setItem("Municipio", data["0"]["strMunicipio"]);
            localStorage.setItem("Colonia", data["0"]["strColonia"]);
            localStorage.setItem("Calle", data["0"]["strCalle"]);
            localStorage.setItem("NumExt", data["0"]["strNumExt"]);
            localStorage.setItem("NumInt", data["0"]["strNumInt"]);
            localStorage.setItem("Contacto", data["0"]["strContacto"]);
            //guardamos el intIdRol para ser manipulado por los permisos.
            var IdRol = (data);
            //console.log(data);

            var dcmSaldoCorrecto = parseFloat(data[0].dcmSaldo).toFixed(2);
            localStorage.setItem("MActual", dcmSaldoCorrecto);

        },
        error: function (x) {
        },
    });
}



var archivo;
var LogoActual;
function mtdConsultarLogos() {

    let linkImg;
    var idUsuario = localStorage.getItem('idPadre');
    $.ajax({
        type: 'GET',
        //url: 'https://localhost:5001/api/Logo/mtdObtenerLogo?strIdUsuario=' + idUsuario,
        url: 'https://apirecargas.recargacelulares.com.mx/api/Logo/mtdObtenerLogo?strIdUsuario=' + idUsuario,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            localStorage.setItem('respuesta', response);
            for (var i in response) {
                archivo = response[i].imgLogo;
                var linkImg = linkArchivo(response[i].strExtensionLG) + response[i].imgLogo;
                LogoActual = linkArchivo(response[i].strExtensionLG) + response[i].imgLogo;
                // console.log("Liga: ", link);
                localStorage.setItem("logo", linkImg);
                localStorage.setItem("leyenda", response[i].strLeyenda);
                //localStorage.setItem(""), response[i].str
                var imgB64 = document.getElementById("imgB64Obtenido");
                console.log("Imagen" + linkImg);
                //$("#logoActual").text(response[i].strLeyenda);
                //console.log("eSTA ES LA LEYENDA " + response[i].strLeyenda);



                imgB64.src = linkImg;

                // $("#imgB64Obtenido").attr();

            }

        },
        error: function (x) {
            console.log(x);
        },
    });

    //Funcion para la vista previa o para poder traer una imagen de la base de datos.
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
            case '.gif':
                return "data:image/gif;base64,";
                //console.log('Es una imagen: gif'); // There's was a typo in the example where
                break; // the alert ended with pdf instead of gif.
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

}