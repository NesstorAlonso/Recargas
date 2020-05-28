
var rutaServidor = 'https://apirecargas.recargacelulares.com.mx/api/';
//var rutaServidor = 'https://localhost:5001/api/';
var intIdDistribuidor = 0;
$(document).ready(function () {
    ConsultarPermisos()
    Acciones()
    mtdLlenarTablaHijosDeUsuarioLogin();
    mtdLlenarTablaVendedores()
    $("#buscad").hide();
    mtdLlenarOptionSaldoTraspaso()
    $("#buscaSaldo").hide();
    $("#buscaSaldoinfoCuenta").hide();
    EnviarDatosUsuario();
    mtdLlenarTablaSaldo();
   // mtdLlenarTablaHijosDeUsuarioLogin();
});

$(function () {
    mtdLlenarOptionSistemas();
    //mtdLlenarOptionSistemasPerfil()
    mtdLlenarOptionSistemasPV()
    mtdLlenarOptionSistemasTS()
    //
    mtdLlenarOptionSkuTelcel()
    mtdLlenarOptionSkuTelcelPaquetes()
    mtdLlenarOptionSkuTelcelInternet()
    mtdLlenarOptionSkuMovistar() 
    mtdLlenarOptionSkuUnefon()
    mtdLlenarOptionSkuAtt() 
    mtdLlenarOptionSkuVirgin()
    mtdLlenarOptionSkuTuenti()
    mtdLlenarOptionSkuMazTiempo()
    mtdLlenarOptionSkuWeex()
    mtdLlenarOptionSkuServicios()
    mtdLlenarOptionSkuMegacable()
    mtdLlenarOptionSkuCfe()
    mtdLlenarOptionSkuSky()
    mtdLlenarOptionSkuIzzi()
    mtdLlenarOptionSkuAttFactura()
    mtdLlenarOptionSkuAvon()
    mtdLlenarOptionSkuInfonavit()
    mtdLlenarOptionSkuTelmex()
    mtdLlenarOptionSkuDish()
    //
    mtdLlenarOptionSkuMovistar()
    mtdLlenarOptionSkuMovistar2() //internet 
    mtdLlenarOptionSkuMovistar3() //paquetes
    mtdLlenarOptionSkuUnefon()
    mtdLlenarOptionSkuFlash()
    mtdLlenarOptionSkuOui()
    mtdLlenarOptionSkuAtt()
    mtdLlenarOptionSkuVirgin()
    mtdLlenarOptionSkuTuenti()
    mtdLlenarOptionSkuMazTiempo()
    mtdLlenarOptionSkuWeex()
    mtdLlenarOptionSkuServicios()
    mtdLlenarOptionSkuSimpa()
    mtdLlenarOptionSkuCierto()
    mtdLlenarTablaUsuariosRol()

    //mtdLlenarTablaDistribuidores();


    //mtdLlenarTablaSistemas()
    
    //LLenar tabla
    function mtdLlenarTablaSistemas() {
        var fila = 1;
        fila++;
        $.ajax({
            type: "GET",
            url: rutaServidor + 'UsuarioPVJoin/mtdUsuarioJoinPVTodo',
            datatype: "Json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
                            success: function (data) {
                              
                                for (var i in data) {
                                    $("#tbUsuario").append(

                                        '<tr value=' + data[i].intIdUsuario + '>' +
                                        '<td data-id="0">' +
                                        '<button id="' + data[i].intIdUsuario + '" onClick="ActualizarSistemas(this)" data-toggle="modal" data-target="#EditarUsuario" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' +
                                        '<button id="' + data[i].intIdUsuario + '" onClick="eliminarSistemas(this)" class="button button-small delete" title="Eliminar usuario"><i  class="zmdi zmdi-delete"></i></button>' + '&nbsp&nbsp&nbsp' +
                                        //Linea que permite mostrar un modal y en ello en este caso mostrar los distribuidores
                                       
                                        '<button id="' + data[i].intIdDistribuidor + '" onClick="MostrarDistribuidor(this)" class="button button-small list" title="Distribuidores"><i  class="zmdi zmdi-pin-account"></i></button>' +
                                        '</td >' +
                                        '<td id="">' + data[i].nombrePerfil + '</td> ' +
                                      
                                        '<td data-id="2">' + data[i].strCorreo + '</td >' +
                                        '<td data-id="3">' + data[i].strDescripcion + '</td> ' +                                        
                                        "</tr> "
                                       
                                    );
                                    //para cambiar el nombre de administrador  de la consulta de la tabla por un icono
                                //En la parte del cliente solo se deja en campos vacias para borrar su contenido
                                    $('td:contains("Administrador")').html('<img src="/assets/images/admin.png"/>' + "&nbsp&nbsp&nbsp" + data[i].nombre).addClass("text-left");
                                    $('td:contains("Cliente")').html(' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + data[i].nombre).addClass("text-left");                                    
                                   
                                }
                                $("#tbUsuario").selectpicker("refresh");
                            },
            error: function (x) {
               // console.log(x);
            },
        });
    }


    //llena la tabla de distribuidores
    function mtdLlenarTablaDistribuidores() {
        var fila = 1;
        fila++;
        $.ajax({
            type: "GET",
            url: rutaServidor + 'NUsers/mtdObtenerNUsuarios',
            datatype: "Json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            success: function (data) {
                //console.log(data);
                //$(".sistemas").remove();
                for (var i in data) {
                    //console.log(data[i].ema);
                    $("#tbANUsers").append(
                        

                        '<tr value=' + data[i].intId + '>' +
                        '<td id="">' + data[i].intId + '</td> ' +
                        '<td data-id="2">' + data[i].userName + '</td >' +
                        '<td data-id="3">' + data[i].userName + '</td >' +
                        '<td data-id="4"> $0.00</td >' +
                        '<td data-id="5">' + data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno + '</td> ' +
                        '<td data-id="6">' + data[i].phoneNumber + '</td> ' +
                        
                        '<td data-id="7">' +
                        '<button id="' + data[i].intId + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-sort-amount-desc"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="8">' +
                        '<button id="' + data[i].intId + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-card"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="9">' +
                        '<button id="' + data[i].intId + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-balance"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="10">' +
                        '<button id="' + data[i].intId + '" onClick="ActualizarDistribuidores(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '</tr> '
                    );

                }
                $("#tbANUsers").selectpicker("refresh");
            },
            error: function (x) {
                //console.log(x);
            },
        });
    }







});

$('.collapse').on('show.bs.collapse', function () {
    $('.collapse.in').collapse('hide');
});


//ELIMINAR UN REGISTRO DE LA TABLA
function eliminarSistemas(e) {
    var url = rutaServidor + 'Usuarios/mtdEliminarUsuario?intIdUsuario=' + e.id;
    $.ajax({
        url: url,
        type: 'DELETE',
        contentType: "application/json;chartset=utf-8",
        success: function () {
           
            Swal.fire({
                type: 'success',
                title: 'Elimando Correctamente',
                text: ''
            });
            location.reload(true);
        },
        error: function (x) {
          //  console.log(x);
            Swal.fire({
                type: 'error',
                title: 'Error Baja',
                text: ''
            });
        },
    });
}

//consultar lo de un usuario en un modal
function ActualizarSistemas(e) {
    data = e.id;
   // console.log('hola');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Usuarios/mtdObtenerPorIdUsuarios?intIdUsuario=' + data,
        datatype: 'json',
        success: function (response) {            
            $("#txtNombre").val(response[0].strNombre);
            $("#txtApp").val(response[0].strApp);
            $("#txtApm").val(response[0].strApm);
            $("#txtContrasena").val(response[0].strContrasena);
            $("#txtMail").val(response[0].strCorreo);
            $("#txtTelefono").val(response[0].strTelefono);
            $("#txtTipoUsuario").val(response[0].intIdTipoUsuario);
            $("#txtPerfil").val(response[0].intIdPerfil)
            $("#dtmFechaNac").val(response[0].dtmFechaNac);
            $("#bitSexo").val(response[0].bitSexo);
            $("#bitPersonaFiscal").val(response[0].bitPersonaFiscal);
            $("#rfc").val(response[0].strRFC);
            $("#NomPuntoV").val(response[0].intIdPuntoVenta);
            $("#NumDistribuidor").val(response[0].intIdDistribuidor);
           // console.log('hola2');
        },
        error: function () {

        }

    });
}
//Modificar los datos insertados

$("#btnEditarUsuario").click(function () {
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTARÁ UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZARÁ LA PETICION AJAX PARA REALIZAR UN PUT A LA BASE DE DATOS CON EL CLIENTE SELECCIONADO
    if ($("#txtNombre").val() == "" || $("#txtApp").val() == "" || $("#txtApm").val() == "" || $("#txtContrasena").val() == "" || $("#txtMail").val() == "" ||
        $("#txtTelefono").val() == "" || $("#txtTipoUsuario option:selected").val() == "0" || $("#txtPerfil option:selected").val() == "0" || $("#dtmFechaNac").val() == "" ||
        $("#bitSexo").val() == "" || $("#bitPersonaFiscal").val() == "" || $("#rfc").val() == "") {
        Swal.fire({
            type: 'info',
            title: 'Campos vacíos',
            text: 'No se puede editar con campos vacíos'
        });
    } else {
        //PETICION AJAX PARA ACTUALIZAR LOS CAMPOS DEL CLIENTE SELECCIONADO
        $.ajax({
            type: 'PUT',
            url: rutaServidor + 'Usuarios/mtdCambiarUsuarios?intIdUsuario=' + data
                + '&strNombre=' + $.trim($("#txtNombre").val())
                + '&strApp=' + $.trim($("#txtApp").val())
                + '&strApm=' + $.trim($("#txtApm").val())
                + '&strContrasena=' + $.trim($("#txtContrasena").val())
                + '&strCorreo=' + $.trim($("#txtMail").val())
                + '&strTelefono=' + $.trim($("#txtTelefono").val())
                + '&intIdTipoUsuario=' + $.trim($("#txtTipoUsuario").val())
                + '&intIdPerfil=' + $.trim($("#txtPerfil option:selected").val())
                + '&dtmFechaNac=' + $.trim($("#dtmFechaNac").val())
                + '&bitSexo=' + $.trim($("#bitSexo").val())
                + '&bitPersonaFiscal=' + $.trim($("#bitPersonaFiscal").val())
                + '&strRFC=' + $.trim($("#rfc").val())
                + '&intIdPuntoVenta=' + $.trim($("#NomPuntoV option:selected").val())
                + '&intIdDistribuidor=' + $.trim($("#NumDistribuidor option:selected").val()),
            dataType: '',
            success: function (response) {
                mtdLimpiarCamposUsuario();
                $("#btnEditarUsuario").hide();
                $("#btnCancelar").hide();
                Swal.fire({
                    type: 'success',
                    title: 'Editado Correctamente',
                    text: 'fue editada correctamente'
                });
            },
            error: function (x) {
                Swal.fire({
                    type: 'error',
                    title: 'Editado Error',
                    text: 'Error en el servidor intente más tarde'
                });
            },
        });
    }
});
$("#btnCancelar").click(function () {
    location.reload();
});



//Llenar el select 
function mtdLlenarOptionSistemas() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'TipoUsuario/mtdObtenerTipoUsuario',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

          
            for (var i in data) {
               
                $('#txtTipoUsuario').append("<option value='" + data[i].intIdTipoUsuario + "'>" + data[i].strDescripcion +"</option>");
            }

            $("#txtTipoUsuario").selectpicker("refresh");
        },
        error: function (x) {
            
        },
    });
}

////Llenar select Perfil
//function mtdLlenarOptionSistemasPerfil() {
//    $.ajax({
//        type: 'GET',
//        url: rutaServidor + 'Perfil/mtdObtenerPerfil',
//        datatype: 'Json',
//        headers: {
//            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
//        },
//        success: function (data) {

           
//            for (var i in data) {
           
//                $('#txtPerfil').append("<option value='" + data[i].intIdPerfil + "'>" + data[i].strDescripcion + "</option>");
//            }

//            $("#txtPerfil").selectpicker("refresh");
//        },
//        error: function (x) {
           
//        },
//    });
//}
//Llenar select PuntoVenta
function mtdLlenarOptionSistemasPV() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'PuntosVenta/mtdObtenerPuntosVenta',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

           
            for (var i in data) {
                
                $('#NomPuntoV').append("<option value='"+ data[i].intIdPunVenta + "'>" + data[i].strDescripcion + "</option>");
            }

            $("#NomPuntoV").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
    
}
//Select Distribuidor 
function mtdLlenarOptionEncargado() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Usuarios/mtdObtenerTodosUsuarios',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

           
            for (var i in data) {
               // console.log(data);
                $('#NumDistribuidor').append("<option value='" + data[i].intIdUsuario + "'>" + data[i].strNombre + "</option>");
            }

            $("#NumDistribuidor").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}

//Select encargado 
function mtdLlenarOptionEncargadoIdPV() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Usuarios/mtdObtenerPorIdPuntoVenta?intIdPuntoVenta=' + $("#NomPuntoV").val(),
        dataType: 'JSON',
        success: function (response) {

          
            //SE RECORRE LA RESPUESTA DE LA PETICION PARA INGRESAR LAS OPCIONES AL SELECT
            for (var i in response) {
                $('#NumDistribuidor').append("<option value='" + response[i].intIdUsuario + "'>" + response[i].strNombre +" " + response[i].strApp +" "+ response[i].strApm +"</option>");

            }
            //NOTA IMPORTANTE: CADA VEZ QUE SE REALICE ALGUN CAMBIO EN ALGUN SELECT DE ESTE PLUGIN SE TENDRÁ QUE DAR UN REFRESH PARA VER REFLEJADOS LOS CAMPOS
            $("#NumDistribuidor").selectpicker('refresh');
          
        }
    });
}
//Llenar select Transpaso de saldo
function mtdLlenarOptionSistemasTS() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Usuarios/mtdObtenerTodosUsuarios',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            //$(".sistemas").remove();
            for (var i in data) {
              
                $('#TransSaldo').append("<option value='" + data[i].intIdUsuario + "'>" + data[i].strNombre + "</option>");
            }

            $("#TransSaldo").selectpicker("refresh");
        },
        error: function (x) {
           
        },
    });

}


//Mostrar el distribuidor en un modal
function MostrarDistribuidor(e)
{
    e.id;
  //  console.log('hola');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'ObtenerDistribuidor/mtdObtenerDistribuidor?intIdDistribuidor=' + e.id,
        datatype: 'json',
        success: function (response) {
           
            //esto hace que no se repitan las selecciones, en este caso los distribuidores.
            //la clase se agrega al option para que limpie los campos
            $(".Dis").remove();
            $(".Dis2").remove();
            
            for (var i in response) {
                $('#tbDistribuidores').append(" <div onclick='MostrarDistribuidor1(this)' id=" + e.id + " class = 'Dis' value='" + response[i].intIdUsuario + "'>" + response[i].nombre + "</div>");
               
               // console.log('hola2');
            }

            $("#tbDistribuidores").selectpicker("refresh");
            window.location = '#tbDistribuidores';
            $("#tbDistribuidores").show();
          
            
            
        },
        error: function () {

        }

    });
}



function MostrarDistribuidor1(e) {
    
   //console.log('Hola desde subdistribuidor');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'ObtenerDistribuidor/mtdObtenerDistribuidor2?intIdUsuario=' + e.id,
        datatype: 'json',
        success: function (response) {

            //esto hace que no se repitan las selecciones, en este caso los distribuidores.
            //la clase se agrega al option para que limpie los campos
            $(".Dis2").remove();

            for (var i in response) {
                $('#tbDistribuidores1').append(" <option class = 'Dis2' value=' " + response[i].intIdUsuario + "'>" + response[i].nombre + "</option>");
                
               // console.log('Hola subdistribuidor');
            }

            $("#tbDistribuidores1").selectpicker("refresh");
            window.location = '#tbDistribuidores1';
           

            
        },
        error: function () {

        }

    });
}

//////////////////////////////////////////
function MostrarDistribuidorPadreHijo(e) {

   // console.log('Hola desde distribuidor');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'ObtenerDistribuidor/mtdObtenerDistribuidor2?intIdUsuario=' + e.id,
        datatype: 'json',
        success: function (response) {

            //esto hace que no se repitan las selecciones, en este caso los distribuidores.
            //la clase se agrega al option para que limpie los campos
            $(".Dis2").remove();

            for (var i in response) {
                $('#tbDistribuidores1').append(" <option class = 'Dis2' value=' " + response[i].intIdUsuario + "'>" + response[i].nombre + "</option>");
              
               // console.log('Hola subdistribuidor');
            }

            $("#tbDistribuidores1").selectpicker("refresh");
            window.location = '#tbDistribuidores1';
            


        },
        error: function () {

        }

    });
}

//
//Llenar select de skuTelcel
function mtdLlenarOptionSkuTelcel() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuTelcel/mtdSkuPagatae_ObtenerSku?Sku=001%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".sku").remove();
            for (var i in data) {

                $('#sltSkuCode').append("<option class='sku' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCode").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de skuTelcel Paquetes
function mtdLlenarOptionSkuTelcelPaquetes() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuTelcel/mtdSkuPagatae_ObtenerSku?Sku=%PA%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuP").remove();
            for (var i in data) {

                $('#sltSkuCodePaquetes').append("<option class='skuP' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodePaquetes").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de skuTelcel Internet
function mtdLlenarOptionSkuTelcelInternet() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuTelcel/mtdSkuPagatae_ObtenerSku?Sku=%INT%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuI").remove();
            for (var i in data) {

                $('#sltSkuCodeInternet').append("<option class='skuI' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeInternet").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuMovistar
function mtdLlenarOptionSkuMovistar() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?Sku=%MOVISTAR%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            //console.log(data);
            $(".skuMov").remove();
            for (var i in data) {
                //console.log(data);
                $('#sltSkuCodeMovistar').append("<option class='skuMov' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeMovistar").selectpicker("refresh");
        },
        error: function (x) {
            //console.log(x);
        },
    });

}

//Llenar select de SkuUnefon
function mtdLlenarOptionSkuUnefon() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuTelcel/mtdSkuPagatae_ObtenerSku?Sku=%IUSA/UNE%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuUne").remove();
            for (var i in data) {

                $('#sltSkuCodeUnefon').append("<option class='skuUne' value='" + data[i].strSkuCodeUnefon + "'>" + data[i].strMontoUnefon + "</option>");
            }

            $("#sltSkuCodeUnefon").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuAtt
function mtdLlenarOptionSkuAtt() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuAtt/mtdObtenerSkuAtt',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuAtt").remove();
            for (var i in data) {

                $('#sltSkuCodeAtt').append("<option class='skuAtt' value='" + data[i].strSkuCodeAtt + "'>" + data[i].strMontoAtt + "</option>");
            }

            $("#sltSkuCodeAtt").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuVirgin
function mtdLlenarOptionSkuVirgin() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Skus/mtdObtenerSkuVirgin',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuVirgin").remove();
            for (var i in data) {

                $('#sltSkuCodeVirgin').append("<option class='skuVirgin' value='" + data[i].strSkuCodeVirgin + "'>" + data[i].strMontoVirgin + "</option>");
            }

            $("#sltSkuCodeVirgin").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuTuenti
function mtdLlenarOptionSkuTuenti() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Skus/mtdObtenerSkuTuenti',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuTuenti").remove();
            for (var i in data) {

                $('#sltSkuCodeTuenti').append("<option class='skuTuenti' value='" + data[i].strSkuCodeTuenti + "'>" + data[i].strMontoTuenti + "</option>");
            }

            $("#sltSkuCodeTuenti").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuMazTiempo
function mtdLlenarOptionSkuMazTiempo() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Skus/mtdObtenerSkuMazTi',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuMazTiempo").remove();
            for (var i in data) {

                $('#sltSkuCodeMazTiempo').append("<option class='skuMazTiempo' value='" + data[i].strSkuCodeMazTi + "'>" + data[i].strMontoMazTi + "</option>");
            }

            $("#sltSkuCodeMazTiempo").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de Weex
function mtdLlenarOptionSkuWeex() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Skus/mtdObtenerSkuWeex',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuWeex").remove();
            for (var i in data) {

                $('#sltSkuCodeWeex').append("<option class='skuWeex' value='" + data[i].strSkuCodeWeex + "'>" + data[i].strMontoWeex + "</option>");
            }

            $("#sltSkuCodeWeex").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuServicios
function mtdLlenarOptionSkuServicios() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Skus/mtdObtenerSkuServicios',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            
            $(".skuSer").remove();
            for (var i in data) {
             
                $('#sltSkuCodeServicio').append("<option class='skuSer' value='" + data[i].strSkuCodeServicio + "'>" + data[i].strSkuDescripcion + "</option>");
            }

            $("#sltSkuCodeServicio").selectpicker("refresh");
        },
        error: function (x) {
            
        },
    });

}

////// INICIAN SELECT DE LOS SKU
//Llenar select de sku Megacable
function mtdLlenarOptionSkuMegacable() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=%megacable%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuMega").remove();
            for (var i in data) {

                $('#sltSkuCodeMegacable').append("<option class='skuMega' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeMegacable").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}
//Llenar select de sku Cfe
function mtdLlenarOptionSkuCfe() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=cfe%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            $(".skuCfe").remove();
            for (var i in data) {

                $('#sltSkuCodeCfe').append("<option class='skuCfe' value='" + data[i].sku + "'>0</option>");
            }
            $("#sltSkuCodeCfe").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}

//Llenar select de sku Sky
function mtdLlenarOptionSkuSky() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=sky%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuSky").remove();
            for (var i in data) {

                $('#sltSkuCodeSky').append("<option class='skuSky' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeSky").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de sku Izzi
function mtdLlenarOptionSkuIzzi() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=izzi%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuIzzi").remove();
            for (var i in data) {

                $('#sltSkuCodeIzzi').append("<option class='skuIzzi' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeIzzi").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de sku AttFactura
function mtdLlenarOptionSkuAttFactura() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=ATT FACTURA %',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuAtt").remove();
            for (var i in data) {

                $('#sltSkuCodeAttFactura').append("<option class='skuAtt' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeAttFactura").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de sku Avon
function mtdLlenarOptionSkuAvon() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=AVON %',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuAvon").remove();
            for (var i in data) {

                $('#sltSkuCodeAvon').append("<option class='skuAvon' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeAvon").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de sku Infonavit
function mtdLlenarOptionSkuInfonavit() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=Infonavit %',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuInfonavit").remove();
            for (var i in data) {

                $('#sltSkuCodeInfonavit').append("<option class='skuInfonavit' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeInfonavit").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}
//Llenar select de sku Telmex
function mtdLlenarOptionSkuTelmex() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=telmex %',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuTelmex").remove();
            for (var i in data) {

                $('#sltSkuCodeTelmex').append("<option class='skuTelmex' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeTelmex").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de sku Dish
function mtdLlenarOptionSkuDish() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuPagaqui/mtdSkuPagaqui_ObtenerSku?Nombre=dish online %',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuDish").remove();
            for (var i in data) {

                $('#sltSkuCodeDish').append("<option class='skuDish' value='" + data[i].sku + "'>0</option>");
            }

            $("#sltSkuCodeDish").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}


//empiezan recargas
//Llenar select de SkuMovistar - Recargas
function mtdLlenarOptionSkuMovistar() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%movistar%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuMov").remove();
            for (var i in data) {

                $('#sltSkuCodeMovistar').append("<option class='skuMov' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeMovistar").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuMovistar - Internet
function mtdLlenarOptionSkuMovistar2() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%int%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuMov2").remove();
            for (var i in data) {

                $('#sltSkuCodeMovistar2').append("<option class='skuMov2' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeMovistar2").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuMovistar - Paquetes
function mtdLlenarOptionSkuMovistar3() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%internet%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuMov3").remove();
            for (var i in data) {

                $('#sltSkuCodeMovistar3').append("<option class='skuMov3' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeMovistar3").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}



//Llenar select de SkuUnefon
function mtdLlenarOptionSkuUnefon() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%IUSA/UNE%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuUne").remove();
            for (var i in data) {

                $('#sltSkuCodeUnefon').append("<option class='skuUne' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeUnefon").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}


//Llenar select de SkuFlash
function mtdLlenarOptionSkuFlash() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%flashmobile%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuFla").remove();
            for (var i in data) {

                $('#sltSkuCodeFlash').append("<option class='skuFla' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeFlash").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuAtt
function mtdLlenarOptionSkuAtt() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%nextel%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuAtt").remove();
            for (var i in data) {

                $('#sltSkuCodeAtt').append("<option class='skuAtt' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeAtt").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

// OUI
function mtdLlenarOptionSkuOui() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%oui%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuOui").remove();
            for (var i in data) {

                $('#sltSkuCodeOui').append("<option class='skuOui' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeOui").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}
//FINALIZA OUI


//Llenar select de SkuTuenti
function mtdLlenarOptionSkuTuenti() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%tuenti%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuTuenti").remove();
            for (var i in data) {

                $('#sltSkuCodeTuenti').append("<option class='skuTuenti' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeTuenti").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuVirgin
function mtdLlenarOptionSkuVirgin() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%virgin%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuVirgin").remove();
            for (var i in data) {

                $('#sltSkuCodeVirgin').append("<option class='skuVirgin' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeVirgin").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}



//Llenar select de SkuMazTiempo
function mtdLlenarOptionSkuMazTiempo() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%maztiempo%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuMazTiempo").remove();
            for (var i in data) {

                $('#sltSkuCodeMazTiempo').append("<option class='skuMazTiempo' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeMazTiempo").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de SkuCierto
function mtdLlenarOptionSkuCierto() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%cierto%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuCierto").remove();
            for (var i in data) {

                $('#sltSkuCodeCierto').append("<option class='skuCierto' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeCierto").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}


//Llenar select de SkuCierto
function mtdLlenarOptionSkuSimpa() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%simpa%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuSimpa").remove();
            for (var i in data) {

                $('#sltSkuCodeSimpa').append("<option class='skuSimpa' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeSimpa").selectpicker("refresh");
        },
        error: function (x) {

        },
    });

}

//Llenar select de Weex
function mtdLlenarOptionSkuWeex() {
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'SkuRecargaqui/mtdSkuRecargaqui_ObtenerSku?name=%weex%',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            $(".skuWeex").remove();
            for (var i in data) {

                $('#sltSkuCodeWeex').append("<option class='skuWeex' value='" + data[i].sku + "'>" + data[i].monto + "</option>");
            }

            $("#sltSkuCodeWeex").selectpicker("refresh");
        },
        error: function (x) {

        },
    });
}
//TERMINAN RECARGAS}


//GENERAR EXCEL CONCILIACION
$("#descExcelConciliacion").click(function () {
        //PETICION AJAX PARA ACTUALIZAR LOS CAMPOS DEL CLIENTE SELECCIONADO
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'tbConciliacion/Export2',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        },
        error: function (x) {
        },
    });
   
             
});


//
//llena la tabla de usuarios con los roles 
function mtdLlenarTablaUsuariosRol() {
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'AsignaRole/ObtenerTodoUsuarioRol',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            //console.log(data);
            //$(".sistemas").remove();
            for (var i in data) {
                $("#tbUsuarioRol").append(

                    '<tr value=' + data[i].userName + '>' +
                    '<td id="">' + data[i].userName + '</td> ' +
                    '<td data-id="2">' + data[i].email + '</td >' +
                    '<td data-id="3">' + data[i].phoneNumber + '</td> ' +
                    '<td data-id="4">' + data[i].name + '</td> ' +

                    '</td >' +
                    '</tr> '
                );

            }
            $("#tbUsuarioRol").selectpicker("refresh");
        },
        error: function (x) {
           // console.log(x);
        },
    });
}
//
//Ajax para poder Agregar rol 
$('#btnAgregarRol').click(function () {
    Swal.showLoading()
    $.ajax({
        url: rutaServidor + 'Cuentas/CrearRol',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        data: JSON.stringify(
            {
                Rol: $("#ROl").val(),
                Usuario: $("#UROl").val(),
            }),
        success: function (data) {
            Swal.fire({
                title: 'Rol agregado',
                type: 'success',
                imageWidth: 400,
                imageHeight: 200,
                background: '#fff',
                imageAlt: 'Custom image',
                animation: false,
                showConfirmButton: false,
                timer: 2500
            });

            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Usuarios'", 2500);
        },
        // imprime los errores puede ser desde bootstrap o de sweetalert
        error: function (jqXHR) {
            Swal.fire({
                type: 'warning',
                title: 'Usuario o Rol incorrectos',
                text: 'Puede que ya exista el usuario y su rol. Porfavor verifique bien los datos'

            });
        }
    });

});

function Buscar() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("txtBuscar");
    filter = input.value.toUpperCase();
    table = document.getElementById('tbANUsers');
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function doSearch() {
    var tableReg = document.getElementById('tbANUsers');
    var searchText = document.getElementById('txtBuscar').value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
}



//
//
//Ajax para poder eliminar rol 
$('#btnEliminarRol').click(function () {
    Swal.showLoading()
    $.ajax({
        url: rutaServidor + 'Cuentas/BorrarRol',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        data: JSON.stringify(
            {
                Rol: $("#ROlEliminar").val(),
                Usuario: $("#UROlEliminar").val(),
            }),
        success: function (data) {
            Swal.fire({
                title: 'Rol eliminado',
                type: 'success',
                imageWidth: 400,
                imageHeight: 200,
                background: '#fff',
                imageAlt: 'Custom image',
                animation: false,
                showConfirmButton: false,
                timer: 2500
            });

            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Usuarios'", 2500);
        },
        // imprime los errores puede ser desde bootstrap o de sweetalert
        error: function (jqXHR) {
            Swal.fire({
                type: 'warning',
                title: 'Usuario o Rol incorrectos',
                text: ''

            });
        }
    });

});

