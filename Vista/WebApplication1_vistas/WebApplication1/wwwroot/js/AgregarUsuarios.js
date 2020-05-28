$(document).ready(function () {
    esconderDiv()
    LimiteNivel()
});
$("#btnAddUsuario11111").click(function () {   
    //$.ajax({
    //    url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/Crear',
    //    method: 'POST',
    //    contentType: 'application/json',
    //    data: JSON.stringify(
    //        {
    //            Usuario: $("#UsuarioD").val(),
    //            strCorreo: $("#EmailD").val(),
    //            Tel: $("#TelD").val(),
    //            strContrasena: $("#ClaveD").val(),
    //            Rol: "Cliente"
    //        }),
    //    success: function () {
    //        Swal.fire({
    //            type: 'success',
    //            title: 'Agregado Correctamente',
    //            text: 'Usuario agregado correctamente',
    //            showConfirmButton: false

    //        });
    //        localStorage.setItem("UReg", $("#UsuarioD").val());
    //        mtdObtenerIDXUsuario();
    //        //setTimeout(" window.location.href = 'Cuenta'", 3000);            
    //    },

    //    error: function (jqXHR) {
    //        Swal.fire({
    //            type: 'warning',
    //            title: 'Verifique lo siguiente',
    //            //text: '1.-Usuario ya existente 2.-Contraseñas invalidas(Ejemplo de contraseña valida: MartI2!6)' ,
    //            showConfirmButton: true,
    //            html:
    //                '<br/>' +
    //                '<h6>1.-Usuario ya existente</h6>' +
    //                '<h6>2.-Contraseñas invalidas</h6>' +
    //                '<p>(Ejemplo de contraseña valida: MartI2!6)</p>'
    //        });
           
    //    }
    //});
    //console.log("Hola, si valida campos");
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTARÁ UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZARÁ LA PETICION AJAX PARA REALIZAR UN POST A LA BASE DE DATOS
    if ($("#UsuarioD").val() == "" || $("#ClaveD").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No se puede guardar con campos vacíos'
        });
    } else {
        //console.log("Hola, empieza insercion");
        //localStorage.setItem("User", $("#PVentaU").val());
        //localStorage.setItem("passw", $("#ClaveU").val());
        //esconderDiv();           
        $.ajax({
            //url: 'https://localhost:5001/api/Cuentas/Crear',
              url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/Crear',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    Usuario: $("#UsuarioD").val(),
                    //strContrasena: $("#ClaveD").val(),
                    strCorreo: $("#EmailD").val(),
                    Tel: $("#TelD").val(),
                    Rol: "Cliente"
                }),
            beforeSend: function () {
                $('#btnAddUsuario11111').html('Espere...');
            },
            success: function (response) {
                localStorage.setItem("UReg", $("#UsuarioD").val());
                mtdObtenerIDXUsuario();
                EnvioCorreoAdmin();
                //window.location.href = 'https://www.recargacelulares.com.mx/Home/Cuenta';
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

////////////////
$("#btnGuardarUsuario").click(function () { /////
    var UserRe = localStorage.getItem('UReg');
    var Padre = localStorage.getItem('idPadre');
    var Nivel = localStorage.getItem('Nivel');
    var rutaServidor = 'https://apirecargas.recargacelulares.com.mx/api/';

    ///
    if ($("#Tpersona").val() != "") {//1
        if ($("#validationCustom01").val() != "") {//2
            if ($("#apellidop").val() != "") {//3
                if ($("#apellidom").val() != "") {//4
                    if ($("#bday").val() != "") {//5
                        if ($("#rfc").val() != "") {//6
                            if ($("#GeneroId option:selected").val() != "0") {//7
                                if ($("#comptel option:selected").val() != "0") {//8
                                    if ($("#codigopostal").val() != "") {//9
                                        if ($("#estado").val() != "") {//10
                                            if ($("#municipio").val() != "") {//11
                                                if ($("#colonia").val() != "") {//12
                                                    if ($("#vialidad").val != "") {//13
                                                        if ($("#calle").val != "") {//14
                                                            if ($("#numext").val != "") {//15
                                                                if ($("#numint").val != "") {//16
                                                                    if ($("#contacto").val != "") {//17
                                                                        if ($("#comercio").val != "") {//18
                                                                            $.ajax({
                                                                                //TIPO DE PETICION QUE SE REALIZA
                                                                                type: 'PUT',
                                                                                //URL A DONDE SE CONECTAR�, EN ESTE CASO LOS PAR�METROS QUE SE ENVIAR�N AL API NOTA: La variable rutaServidor es invocada desde otro script
                                                                                url: rutaServidor + 'ModificarUsuario/mtdInsertarUsuariosDistribuidor?UserName=' + UserRe
                                                                                    + '&bitTipoPersona=' + $.trim($("#Tpersona option:selected").val())
                                                                                    + '&strNombre=' + $.trim($("#validationCustom01").val())
                                                                                    + '&strApaterno=' + $.trim($("#apellidop").val())
                                                                                    + '&strAmaterno=' + $.trim($("#apellidom").val())
                                                                                    + '&dtmFechaNacimiento=' + $.trim($("#bday").val())
                                                                                    + '&strRFC=' + $.trim($("#rfc").val())
                                                                                    + '&bitGenero=' + $.trim($("#GeneroId option:selected").val())
                                                                                    + '&strCompania=' + $.trim($("#comptel option:selected").val())
                                                                                    + '&strCp=' + $.trim($("#codigopostal").val())
                                                                                    + '&strEstado=' + $.trim($("#estado").val())
                                                                                    + '&strMunicipio=' + $.trim($("#municipio").val())
                                                                                    + '&strColonia=' + $.trim($("#colonia").val())
                                                                                    + '&strTVialidad=' + $.trim($("#vialidad").val())
                                                                                    + '&strCalle=' + $.trim($("#calle").val())
                                                                                    + '&strNumExt=' + $.trim($("#numext").val())
                                                                                    + '&strNumInt=' + $.trim($("#numint").val())
                                                                                    + '&strContacto=' + $.trim($("#contacto").val())
                                                                                    + '&strComercio=' + $.trim($("#comercio").val())
                                                                                    + '&strIdPadre=' + Padre
                                                                                    + '&intNivel=' + ++Nivel,
                                                                                dataType: '',
                                                                                headers: {
                                                                                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
                                                                                },
                                                                                success: function (data) {
                                                                                    mtdAgregarAcciones();
                                                                                    mtdAgregarNotificaciones();
                                                                                    mtdAgregarComisiones1();
                                                                                    mtdAgregarComisiones2();
                                                                                    mtdAgregarComisiones3();
                                                                                    mtdAgregarComisiones4();
                                                                                    mtdAgregarComisiones5();
                                                                                    mtdAgregarComisiones6();
                                                                                    mtdAgregarComisiones7();
                                                                                    mtdAgregarComisiones8();
                                                                                    mtdAgregarComisiones9();
                                                                                    mtdAgregarComisiones10();
                                                                                    mtdAgregarComisiones11();
                                                                                    mtdAgregarComisiones12();
                                                                                    mtdAgregarComisiones13();
                                                                                    mtdAgregarComisiones14();
                                                                                    mtdAgregarComisiones15();
                                                                                    mtdAgregarComisiones16();
                                                                                    mtdAgregarComisiones17();
                                                                                    mtdAgregarComisiones18();
                                                                                    Swal.fire({
                                                                                        type: 'success',
                                                                                        title: 'Agregado Correctamente',
                                                                                        text: 'El cliente fue agregada correctamente',
                                                                                        timer: 2000
                                                                                    });
                                                                                    setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Distribuidores'", 2000);
                                                                                },
                                                                                error: function (x) {
                                                                                    //EN CASO DE TENER UN ERROR MOSTRAR� UN MENSAJE ERROR
                                                                                    Swal.fire({
                                                                                        type: 'error',
                                                                                        title: 'Usuario no agregado',
                                                                                        text: 'Error en el servidor intente m�s tarde'
                                                                                    });
                                                                                },
                                                                            });
                                                                        }//18
                                                                        else {
                                                                            Swal.fire({
                                                                                type: 'error',
                                                                                title: 'Campo comercio vacio',
                                                                                text: 'Ingrese el comercio'
                                                                            });
                                                                        }//else 18
                                                                    }//17
                                                                    else {
                                                                        Swal.fire({
                                                                            type: 'error',
                                                                            title: 'Campo contacto vacio',
                                                                            text: 'Ingrese el contacto'
                                                                        });
                                                                    }//else 17
                                                                }//16
                                                                else {
                                                                    Swal.fire({
                                                                        type: 'error',
                                                                        title: 'Campo numero interior vacio',
                                                                        text: 'Ingrese el numero interior'
                                                                    });
                                                                }//else 16
                                                            }//15
                                                            else {
                                                                Swal.fire({
                                                                    type: 'error',
                                                                    title: 'Campo numero exterior vacio',
                                                                    text: 'Ingrese el numero exterior'
                                                                });
                                                            }//else 15
                                                        }//14
                                                        else {
                                                            Swal.fire({
                                                                type: 'error',
                                                                title: 'Campo calle vacio',
                                                                text: 'Ingrese la calle'
                                                            });
                                                        }//else 14
                                                    }//13
                                                    else {
                                                        Swal.fire({
                                                            type: 'error',
                                                            title: 'Campo tipo de vialidad vacio',
                                                            text: 'Ingrese el tipo de vialidad'
                                                        });
                                                    }//else 13
                                                }//12
                                                else {
                                                    Swal.fire({
                                                        type: 'error',
                                                        title: 'Campo colonia vacio',
                                                        text: 'Ingrese la colonia'
                                                    });
                                                }//else 12
                                            }//11
                                            else {
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'Campo municipio vacio',
                                                    text: 'Ingrese el municipio'
                                                });
                                            }//else 11
                                        } //10
                                        else {
                                            Swal.fire({
                                                type: 'error',
                                                title: 'Campo estado vacio',
                                                text: 'Ingrese el estado'
                                            });
                                        }// else 10
                                    }//9
                                    else {
                                        Swal.fire({
                                            type: 'error',
                                            title: 'Campo codigo postal vacio',
                                            text: 'Ingrese el codigo postal'
                                        });
                                    }//else 9
                                }//8
                                else {
                                    Swal.fire({
                                        type: 'error',
                                        title: 'Campo compa�ia telefonica vacio',
                                        text: 'Seleccione una compa�ia telefonica'
                                    });
                                }//else 8
                            }//7
                            else {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Campo genero vacio',
                                    text: 'Seleccione un genero'
                                });
                            }// else 7
                        } //6
                        else {
                            Swal.fire({
                                type: 'error',
                                title: 'Campo RFC vacio',
                                text: 'Ingrese el RFC'
                            });
                        }//else 6
                    }//5
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'Campo fecha de nacimiento vacia',
                            text: 'Ingrese la fecha de nacimiento'
                        });
                    }//else 5
                }//4
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'Campo apellido materno vacio',
                        text: 'Ingrese el apellido materno'
                    });
                }//else 4
            }//3
            else {
                Swal.fire({
                    type: 'error',
                    title: 'Campo apellido paterno vacio',
                    text: 'Ingrese el apellido paterno'
                });
            }//else 3
        } //2
        else {
            Swal.fire({
                type: 'error',
                title: 'Campo nombre vacio',
                text: 'Ingrese el nombre'
            });
        }//else 2
    }//1
    else {
        Swal.fire({
            type: 'error',
            title: 'No se selecciono tipo de persona',
            text: 'Seleccione un tipo de persona'
        });
    }//else 1
});

function esconderDiv() {
    //console.log('hola1');
    //if (localStorage.getItem('Role') == 'Administrador') {
    //    $('#btnAgregarDistri').show();
    //    $('#Complemento').show();
    //    $('#TituloComp').show();        
    //} else
    //{
    //    //$('#btnAgregarDistri').hide();
    //    //$('#Complemento').hide();
    //    //$('#TituloComp').hide();
    //}

}

function LimiteNivel() {
    if (localStorage.getItem('Nivel') == 5) {
        $('#btnAgregarDistri').hide();
    }
}

//Geho comision
function mtdObtenerIDXUsuario() {
    ////
   // console.log('Estoy en otro metodo');
    $.ajax({
        type: 'GET',
        url: 'https://apirecargas.recargacelulares.com.mx/api/NUsers/mtdNUsers_ID?UserName=' + $("#UsuarioD").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },


        success: function (response) {

            for (var i in response) {
               // console.log(response[i].id);
                //console.log('dentro del for');

                localStorage.setItem("IdC", response[i].id);
               // console.log("ID creador: " + localStorage.getItem('IdC'));
            }
            var ClienteAct = localStorage.getItem('IdC');
            // console.log(" Si entra");
            //    console.log("Datos: " + response);
            //    //$(".sistemas").remove();
            //    localStorage.setItem("IdC", response.Id);
            //    console.log("ID creador: " + localStorage.getItem('IdC'));
            $.ajax({
                type: 'PUT',
                url: rutaServidor + 'ConsultaHijos/mtdDeshabilitarCliente?Id=' + ClienteAct + '&strEstatus=A&dcmSaldo=0',
                dataType: '',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
                },
                success: function (data) {
                   // console.log("Activado");
                },
                error: function (x) {
                },
            });

            window.location.href = "https://www.recargacelulares.com.mx/Home/Cuenta";
        },
        error: function (x) {
          //  console.log(x);
        },
    });

}

////


/////////////////
//$("#btnAgregarComision").click(function () {
//    ////z<
//    //mtdAgregarComisiones();

//});


function mtdAgregarComisiones1() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom").val() + '&decComision=' + $("#porcentajeCom").val() + '&strTipo=' + $("#tipoCom").val() + '&strUnidad=' + $("#unidadCom").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 1");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones2() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom1").val() + '&decComision=' + $("#porcentajeCom1").val() + '&strTipo=' + $("#tipoCom1").val() + '&strUnidad=' + $("#unidadCom1").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 2");

        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones3() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom2").val() + '&decComision=' + $("#porcentajeCom2").val() + '&strTipo=' + $("#tipoCom2").val() + '&strUnidad=' + $("#unidadCom2").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 3");
            //    console.log("Datos: " + response);
            //    //$(".sistemas").remove();
            //    localStorage.setItem("IdC", response.Id);
            //    console.log("ID creador: " + localStorage.getItem('IdC'));


        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}


function mtdAgregarComisiones4() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom3").val() + '&decComision=' + $("#porcentajeCom3").val() + '&strTipo=' + $("#tipoCom3").val() + '&strUnidad=' + $("#unidadCom3").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 4");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones5() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom4").val() + '&decComision=' + $("#porcentajeCom4").val() + '&strTipo=' + $("#tipoCom4").val() + '&strUnidad=' + $("#unidadCom4").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 5");

        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones6() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom5").val() + '&decComision=' + $("#porcentajeCom5").val() + '&strTipo=' + $("#tipoCom5").val() + '&strUnidad=' + $("#unidadCom5").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 6");
            //    console.log("Datos: " + response);
            //    //$(".sistemas").remove();
            //    localStorage.setItem("IdC", response.Id);
            //    console.log("ID creador: " + localStorage.getItem('IdC'));


        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones7() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom6").val() + '&decComision=' + $("#porcentajeCom6").val() + '&strTipo=' + $("#tipoCom6").val() + '&strUnidad=' + $("#unidadCom6").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 7");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones8() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom7").val() + '&decComision=' + $("#porcentajeCom7").val() + '&strTipo=' + $("#tipoCom7").val() + '&strUnidad=' + $("#unidadCom7").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 8");

        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones9() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom8").val() + '&decComision=' + $("#porcentajeCom8").val() + '&strTipo=' + $("#tipoCom8").val() + '&strUnidad=' + $("#unidadCom8").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 9");
            //    console.log("Datos: " + response);
            //    //$(".sistemas").remove();
            //    localStorage.setItem("IdC", response.Id);
            //    console.log("ID creador: " + localStorage.getItem('IdC'));
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}


function mtdAgregarComisiones10() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom9").val() + '&decComision=' + $("#porcentajeCom9").val() + '&strTipo=' + $("#tipoCom9").val() + '&strUnidad=' + $("#unidadCom9").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 10");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones11() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom10").val() + '&decComision=' + $("#porcentajeCom10").val() + '&strTipo=' + $("#tipoCom10").val() + '&strUnidad=' + $("#unidadCom10").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 11");

        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones12() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom11").val() + '&decComision=' + $("#porcentajeCom11").val() + '&strTipo=' + $("#tipoCom11").val() + '&strUnidad=' + $("#unidadCom11").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 12");
            //    console.log("Datos: " + response);
            //    //$(".sistemas").remove();
            //    localStorage.setItem("IdC", response.Id);
            //    console.log("ID creador: " + localStorage.getItem('IdC'));
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones13() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom12").val() + '&decComision=' + $("#porcentajeCom12").val() + '&strTipo=' + $("#tipoCom12").val() + '&strUnidad=' + $("#unidadCom12").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 13");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones14() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom13").val() + '&decComision=' + $("#porcentajeCom13").val() + '&strTipo=' + $("#tipoCom13").val() + '&strUnidad=' + $("#unidadCom13").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 14");

        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones15() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom14").val() + '&decComision=' + $("#porcentajeCom14").val() + '&strTipo=' + $("#tipoCom14").val() + '&strUnidad=' + $("#unidadCom14").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 15");
            //    console.log("Datos: " + response);
            //    //$(".sistemas").remove();
            //    localStorage.setItem("IdC", response.Id);
            //    console.log("ID creador: " + localStorage.getItem('IdC'));
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}


function mtdAgregarComisiones16() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom15").val() + '&decComision=' + $("#porcentajeCom15").val() + '&strTipo=' + $("#tipoCom15").val() + '&strUnidad=' + $("#unidadCom15").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

           // console.log("hola, si se inserto la comision 16");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones17() {

    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom16").val() + '&decComision=' + $("#porcentajeCom16").val() + '&strTipo=' + $("#tipoCom16").val() + '&strUnidad=' + $("#unidadCom16").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 17");

        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}

function mtdAgregarComisiones18() {
    $.ajax({
        type: 'POST',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Comision/mtdComision_Alta?strIdUsuario=' + localStorage.getItem('IdC') + '&strSku=' + $("#skuCom17").val() + '&decComision=' + $("#porcentajeCom17").val() + '&strTipo=' + $("#tipoCom17").val() + '&strUnidad=' + $("#unidadCom17").val(),
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {

            //console.log("hola, si se inserto la comision 18");
        },
        error: function (response) {
            //Swal.fire({
            //    type: 'error',
            //    title: 'Error Agregar Permisos',
            //    text: 'Error en el servidor error al agregar los Permisos'
            //});
        }
    });
}
/////////////////

//Funcion para agregar notificaciones cuando se da de alta un usuario hijo
function mtdAgregarNotificaciones() {
    var CUserNotifi = localStorage.getItem('UReg');
    var size = 0;
    var i = 0;
    var arrTodo = new Array();
    $('#Notificaciones input[type = checkbox]').each(function () {
        if (this.checked) {
            size++;
        }
    });
    $('#Notificaciones input[type = checkbox]').each(function () {
        var item = {};
        if (this.checked) {
            item = this.value;
            arrTodo.push(item);
        }
        i++;
        if (i <= size) {
        }
    });
   // console.log(arrTodo);
    arrTodo.forEach(Agregar);
    function Agregar(item) {
        $.ajax({
            type: 'POST',
            url: rutaServidor + "Notificaciones/mtdAgregarNotificacion?strUsuario=" + CUserNotifi + "&strNotificacion=" + item + "&dcmSaldoMinimo=" + $.trim($("#MontoAlertas").val()),
            dataType: '',
            success: function (response) {
               // console.log('si');
            },
            error: function (response) {
                Swal.fire({
                    type: 'error',
                    title: 'Error Agregar Permisos',
                    text: 'Error en el servidor error al agregar los Permisos'
                });
            }
        });
    }
}

//
//
///Referente a los vendedores alta y modificacion
$("#btnGuardarVendedor").click(function () {
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTAR� UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZAR� LA PETICION AJAX PARA REALIZAR UN POST A LA BASE DE DATOS
    if ($("#txtNombreV").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vac�os',
            text: 'No se puede guardar con campos vac�os'
        });
    } else {
        //console.log("Hola, empieza insercion");
        //localStorage.setItem("User", $("#PVentaU").val());
        //localStorage.setItem("passw", $("#ClaveU").val());
        //esconderDiv();           
        $.ajax({
            url: rutaServidor + 'Cuentas/CrearVendedor',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    Usuario: $("#txtNombreV").val(),
                    strContrasena: $("#ClaveDV").val(),
                    strCorreo: $("#txtEmailVendedor").val(),
                    Tel: $("#txtTelefonoV").val(),
                    Rol: "Vendedor"
                }),
            success: function (response) {
                localStorage.setItem("VReg", $("#txtNombreV").val());
                mtdObtenerIDXUsuario();
                EnvioCorreoAdmin();
                window.location.href = 'https://www.recargacelulares.com.mx/Home/AltaVendedor';
            },
            error: function (jqXHR) {
                Swal.fire({
                    type: 'warning',
                    title: 'Verifique lo siguiente',
                    //text: '1.-Usuario ya existente 2.-Contrase�as invalidas(Ejemplo de contrase�a valida: MartI2!6)' ,
                    showConfirmButton: true,
                    html:
                        '<br/>' +
                        '<h6>1.-Usuario ya existente</h6>' +
                        '<h6>2.-Contrase�as invalidas</h6>' +
                        '<p>(Ejemplo de contrase�a valida: MartI2!6)</p>'
                });
            }
        });
    }
});


$("#btnModificarVendedor").click(function () {
    var VendeRe = localStorage.getItem('VReg');
    var Padre = localStorage.getItem('idPadre');
    var Nivel = localStorage.getItem('Nivel');
    var rutaServidor = 'https://apirecargas.recargacelulares.com.mx/api/';

    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTAR? UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZAR? LA PETICION AJAX PARA REALIZAR UN POST A LA BASE DE DATOS
    if ($("#txtNombreVen").val() != "") {//1
        if ($("#txtApellidopVen").val() != "") {//2
            if ($("#txtApellidomVen").val() != "") {//3
                if ($("#txtHoraIni").val() != "") {//4
                    if ($("#txtHoraFin").val() != "") {//5
                        $.ajax({
                            //TIPO DE PETICION QUE SE REALIZA
                            type: 'PUT',
                            //URL A DONDE SE CONECTAR?, EN ESTE CASO LOS PAR?METROS QUE SE ENVIAR?N AL API NOTA: La variable rutaServidor es invocada desde otro script
                            url: rutaServidor + 'ModificarUsuario/mtdModificarVendedor?UserName=' + VendeRe
                                + '&strNombre=' + $.trim($("#txtNombreVen").val())
                                + '&strApaterno=' + $.trim($("#txtApellidopVen").val())
                                + '&strAmaterno=' + $.trim($("#txtApellidomVen").val())
                                + '&dtmHoraInicio=' + $.trim($("#txtHoraIni").val())
                                + '&dtmHoraFin=' + $.trim($("#txtHoraFin").val())
                                + '&strEstatus=' + 'Activo'/* $.trim($("#checkbox_estatus").val())*/
                                + '&strIdPadre=' + Padre
                                + '&intNivel=' + ++Nivel,
                            dataType: '',
                            headers: {
                                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
                            },
                            success: function (data) {

                                mtdAgregarDiasServicio();

                                Swal.fire({
                                    type: 'success',
                                    title: 'Agregado Correctamente',
                                    text: 'El cliente fue agregada correctamente',
                                    timer: 2000

                                });

                                setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Vendedores'", 2000);
                            },
                            error: function (x) {
                                //EN CASO DE TENER UN ERROR MOSTRAR? UN MENSAJE ERROR
                                Swal.fire({
                                    type: 'error',
                                    title: 'Agregado Error',
                                    text: 'Error en el servidor intente m?s tarde'
                                });
                            },
                        });
                    }//5
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'No hay hora final',
                            text: 'Ingrese una hora final'
                        });
                    }//5
                }//4
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'No hay hora inicial',
                        text: 'Ingrese una hora inicial'
                    });
                }//4
            }//3
            else {
                Swal.fire({
                    type: 'error',
                    title: 'No hay apellido materno',
                    text: 'Ingrese el apellido materno'
                });
            }//3
        }//2
        else {
            Swal.fire({
                type: 'error',
                title: 'No hay apellido paterno',
                text: 'Ingrese el apellido paterno'
            });
        }//2
    }//1
    else {
        Swal.fire({
            type: 'error',
            title: 'No hay nombre',
            text: 'Ingrese el nombre'
        });
    }//1

    /////////

    ////////
});
//
//
$("#btnCancelarUsuario").click(function () {
    mtdLimpiarCamposCliente();
    $("#modalCliente").modal('hide');
});
//Funcion que limpia los campos al agregar cliente o al cancelar.
function mtdLimpiarCamposCliente() {
    $("#UsuarioD").val("");
    $("#ClaveD").val("");
    $("#EmailD").val("");
    $("#TelD").val("");
}

//Validacion si el usuario no existe en la base de datos.
document.getElementById("UsuarioD").onblur = function () { ValidaUserC() };
function ValidaUserC() {
    if ($("#UsuarioD").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campo vacío',
            text: 'No se puede guardar campos vacíos'
        });
    } else {
        $.ajax({
            type: 'GET',
            url: rutaServidor + 'ConsultaHijos/VerificaUsuarioNuevo?UserName=' + $("#UsuarioD").val(),
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                Swal.fire({
                    type: 'warning',
                    title: 'Usuario existente',
                    text: 'Porfavor ingrese un usuario nuevo',
                });
            },
            error: function (x) {
            },
        });
    }
}
//Validacion si el usuario no existe en la base de datos.Esto se aplica a los vendedores
document.getElementById("txtNombreV").onblur = function () { ValidaUserVende() };
function ValidaUserVende() {
    console.log("ENtra a validar nombre de vendedor existente");
    if ($("#txtNombreV").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campo vacío',
            text: 'No se puede guardar campos vacíos'
        });
    } else {
        $.ajax({
            type: 'GET',
            url: rutaServidor + 'ConsultaHijos/VerificaUsuarioNuevo?UserName=' + $("#txtNombreV").val(),
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                Swal.fire({
                    type: 'warning',
                    title: 'Usuario existente',
                    text: 'Porfavor ingrese un usuario nuevo',
                });
            },
            error: function (x) {
            },
        });
    }
}


//Validacion la contraseña.
$('#ClaveD').keyup(function (e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
        $('#passstrength').html('<strong> La contraseña debe:</br></strong>' +
            '<p>' +
            '* Tener al menos 8 caracteres</br >' +
            //'* Tener al menos 1 letra(a, b, c..)</br >' +
            '* Tener al menos 1 numero(1, 2, 3..)</br >' +
            //'* Tener al menos 1 simbolo(!,@@, $..)</br >' +
            '* Incluye caracteristicas tanto en mayúscula como en minúscula</br>' +
            '</p >' +
            '<strong>La contraseña NO debe:</br></strong >' +
            '<p>' +
            '*Contiene únicamente un caracter (1111 o aaaa)</br>' +
            ' * Contiene únicamente caracteres consecutivos(1234 o abcd)</p >');
    } else if (strongRegex.test($(this).val())) {
        $('#passstrength').className = 'ok';
        $('#passstrength').html('Fuerte!');
    } else if (mediumRegex.test($(this).val())) {
        $('#passstrength').className = 'alert';
        $('#passstrength').html('Media!');
    } else {
        $('#passstrength').className = 'error';
        $('#passstrength').html('Débil!');
    }
    return true;
});


//Validacion si el correo existe en la base de datos.
document.getElementById("EmailD").onblur = function () { ValidaEmailC() };
function ValidaEmailC() {
    if ($("#EmailD").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campo vacío',
            text: 'Campo de Correo no puede estar vacio'
        });
    } else {
        $.ajax({
            type: 'GET',
            url: rutaServidor + 'ConsultaHijos/VerificaEmailNuevo?Email=' + $("#EmailD").val(),
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                Swal.fire({
                    type: 'warning',
                    title: 'Correo existente',
                    text: 'Porfavor ingrese un Correo nuevo',
                });
            },
            error: function (x) {
            },
        });
    }
}
//Validacion si el correo existe en la base de datos.Esto aplica para los vendedores
document.getElementById("txtEmailVendedor").onblur = function () { ValidaEmailVende() };
function ValidaEmailVende() {
    if ($("#txtEmailVendedor").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campo vacío',
            text: 'Campo de Correo no puede estar vacio'
        });
    } else {
        $.ajax({
            type: 'GET',
            url: rutaServidor + 'ConsultaHijos/VerificaEmailNuevo?Email=' + $("#txtEmailVendedor").val(),
            dataType: 'JSON',
            success: function (data) {
                // console.log(data);
                Swal.fire({
                    type: 'warning',
                    title: 'Correo existente',
                    text: 'Porfavor ingrese un Correo nuevo',
                });
            },
            error: function (x) {
            },
        });
    }
}