
//var rutaServidor = 'https://localhost:5001/api/';
var rutaServidor = 'https://apirecargas.recargacelulares.com.mx/api/';
var header = { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') };
var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
var usuario;
var errorC = " ";
var confirmed;

$(document).ready(function () {
    confirmed = localStorage.getItem("Confirmacion");
    if (confirmed == "false") {
        mtdBloquearOpciones();
    }
    mtdConsultarNip();

    
});

function mtdConsultarNip() {
    var nip = localStorage.getItem("Nip");
    var bitNip = localStorage.getItem("bitNip");
    $('#nip').val(nip);
    $('#confNip').val(nip);
    //$('#HabilitarNip :checkbox').attr('checked', bitNip);
    $('#HabilitarNip').prop("checked", bitNip);
}

function mtdBloquearOpciones() {
    $("#nave").prop('disabled', false);
    $("#nave").remove();
    $("#nave1").remove();
    $("#nave2").remove();
    $("#nave3").remove();
    $("#nave4").remove();
    $("#idInicio").removeAttr("href"); 
    $("#btnCancelarContrasena").prop('disabled', true);
    $("#btnCancelarNip").prop('disabled', true);
    $("#btnGuardarNip").prop('disabled', true);
}

function mtdDesbloquearOpciones() {
   // $("#btnCancelarNip").prop('disabled', true);
    $("#btnGuardarNip").prop('disabled', false);

}

//$("#Ini").removeClass("active open");
//$("#Seg").addClass('active');
//$("#Seg").addClass('open');
//$("#idContrasena").addClass('toggled waves-effect waves-block active open');
//$("#ulpass").css('display', 'block');
$('#btnGuardarContrasena').click(function () {

     usuario = localStorage.getItem("idPadre");
    var act = $.trim($('#pwdAct').val());

    var a = $('#pwdConfirmar').val();
    var b = $('#pwdNueva').val();
    var c = $('#pwdAct').val();

    if (a != "" & b != "" & c != "") {

        var a = $('#pwdConfirmar').val();
        var b = $('#pwdNueva').val();
        var c = $('#pwdAct').val();
  

        console.log("Nueva" + a);
        ban11 = true;

        if (a != b) {
            Swal.fire({
                type: 'info',
                title: 'Contraseña',
                text: 'Las contraseñas no coinciden'
            });

        }
        else {


            $.ajax({
                type: 'PUT',
                url: rutaServidor + 'Cuentas/mtdCambiarPassword?Id=' + usuario + '&currentpassword=' + c + '&newPassword=' + b,
                headers: header,
                dataType: '',
                success: function (response) {
                    //console.log(response);
                    if (response == "" & confirmed == "false") {

                        $.ajax({
                            type: 'PUT',
                            url: rutaServidor + 'AsignaRole/mtdAltaUsuario?id=' + usuario,
                            dataType: '',
                            headers: header,
                            success: function (response) {
                                Swal.fire({
                                    type: 'success',
                                    title: 'Habilitado Correctamente',
                                    text: 'El usuario se  activo correctamente'
                                });
                              
                            },
                            error: function (x) {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Error Activar',
                                    text: 'No se pudo reactivar el registro'
                                });
                            }
                        });

                        Swal.fire({
                            type: 'success',
                            title: 'Guardado Correctamente',
                            text: 'La contraseña fue cambiada correctamente, Por favor agregue si Nip'
                        });

                        $('#pwdConfirmar').val("");
                        $('#pwdNueva').val("");
                        $('#pwdAct').val("");

                        //setTimeout("window.location.href = 'https://localhost:44338/Home/Index'", 3500);
                       // setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Index'", 3500);
                        RecargaMActual2();
                        $('#nip').focus();
                        mtdDesbloquearOpciones();
                        //localStorage.removeItem('Confirmacion');
                        //localStorage.setItem("Confirmacion", Datos["0"]["emailConfirmed"]);

                    }
                    else {
                        for (var i in response) {
                            $.each(response.token, function (i, item) {
                                errorC = item['code'];

                            });

                            console.log("Code " + errorC)
                        }

                        if (errorC == "PasswordMismatch") {
                            Swal.fire({
                                type: 'info',
                                title: 'Información',
                                text: 'La contraseña actual no coincide'
                            });
                        }
                        else if (errorC == "PasswordTooShort") {
                            Swal.fire({
                                type: 'info',
                                title: 'Información',
                                text: 'La contraseña es muy corta, ingrese almenos 7 caracteres'
                            });
                        }


                    }

                    
                },
                error: function (x) {

                    Swal.fire({
                        type: 'error',
                        title: 'Error guardar',
                        text: 'Error en el servidor error al cambiar contraseña'
                    });
                }
            });
        }
    }
    else {
        Swal.fire({
            type: 'info',
            title: 'Contraseña',
            text: 'Hay campos vacios, verifique por favor'
        });

    }
        
     

        //setTimeout(
        //    function () {
        //        window.location.href = 'https://localhost:44315';
        //    }, 3000);

    
});


$('#btnGuardarNip').click(function () {

    var nip = $('#nip').val();
    var confNip = $('#confNip').val();
    usuario = localStorage.getItem("idPadre");
    var isChecked = document.getElementById('HabilitarNip').checked;
    
    if (nip != "" & confNip != "") {

        if (nip.length == 4) {
            if (nip == confNip) {
                $.ajax({
                    type: 'PUT',
                    url: rutaServidor + 'AsignaRole/mtdCambiarNip?id=' + usuario + '&intNip=' + nip + '&bitNip=' + isChecked,
                    headers: header,
                    dataType: '',
                    success: function (response) {
                        //console.log(response);
                        Swal.fire({
                            type: 'success',
                            title: 'Guardado Correctamente',
                            text: 'El nip fue cambiado correctamente'
                        });

                        $('#nip').val("");
                        $('#confNip').val("");
                       

                        //setTimeout("window.location.href = 'https://localhost:44338/Home/Contraseña'", 3500);
                        setTimeout("window.location.href = ' https://www.recargacelulares.com.mx/Home/Contraseña'", 3500);
                        RecargaMActual2();

                    },
                    error: function (x) {

                        Swal.fire({
                            type: 'error',
                            title: 'Error guardar',
                            text: 'Error en el servidor error al cambiar contraseña'
                        });
                    }
                });

            }
            else {
                Swal.fire({
                    type: 'info',
                    title: 'Información',
                    text: 'El Nip no coincide'
                });
            }
        }
        else {
            Swal.fire({
                type: 'info',
                title: 'Información',
                text: 'El Nip debe tener 4 dígitos'
            });

        }
        

    }
    else {
        Swal.fire({
            type: 'info',
            title: 'Contraseña',
            text: 'Hay campos vacios, verifique por favor'
        });

    }


});


function RecargaMActual2() {
    //  console.log("Esta en RecargaMActual");
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'AsignaRole/ObtenerRol?UserName=' + localStorage.getItem('MMail'),
        dataType: 'JSON',
        success: function (data) {

            //guardamos el intIdRol para ser manipulado por los permisos.
            var IdRol = (data);
            //console.log(data);

            var dcmSaldoCorrecto = parseFloat(data[0].dcmSaldo).toFixed(2);
            var confirm = data[0].emailConfirmed;
            var nip = data[0].intNip;
            var bitNip = data[0].bitNip;

            localStorage.setItem("Confirmacion", confirm);
            localStorage.setItem("MActual", dcmSaldoCorrecto);
            localStorage.setItem("Nip", nip);
            localStorage.setItem("bitNip", bitNip);


        },
        error: function (x) {
        },
    });
}


function mtdMuestraAyudaPasssword() {
    Swal.fire({
        type: 'info',
        title: 'Contraseña',
        html: '<div style="text-align: left">Requerimientos contraseña: <ol>' +
            '<li> Minimo 8 caracteres</li>' +
            '<li> Maximo 15 caracteres </li>' +
            '<li>Al menos una letra mayúscula </li>' +
            '<li>Al menos una letra minucula  </li>' +
            '<li>Al menos un dígito  </li>' +
            '<li>No espacios en blanco </li>' +
            '<li>Al menos 1 caracter especial ($@$!%*?&)</li></ol> </div>'
    });
}