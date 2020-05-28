mtdLlenarTablaPv();
mtdLlenarOptionUsuariosPV();

$("#eliminar").click(function () {
    alert("fgdfgdf");
});


$("#eliminarSistemas").click(function () {
    alert("hola");
})


//LLenar tabla
function mtdLlenarTablaPv() {
    $.ajax({
        type: "GET",
        url: "https://apirecargas.recargacelulares.com.mx/api/JoinID/mtdPVjoinUTodo",
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            //console.log(data);
            //$(".sistemas").remove();
            for (var i in data) {
                $("#tbPventa").append(
                    '<tr value=' + data[i].intIdPunVenta + '>' +
                    '<td data-id="0">' +
                    '<button id="' + data[i].intIdPunVenta + '" onClick="ActualizarPuntov(this)" data-toggle="modal" data-target="#EditarPv" class="button button-small edit" title ="Edit"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' +
                    '<button id="' + data[i].intIdPunVenta + '" onClick="eliminarPuntoVenta(this)" class="button button-small delete" title="Eliminar"><i  class="zmdi zmdi-delete"></i></button>' +
                    '</td >' +
                    '<td data-id="1">' + data[i].intIdPunVenta + '</td >' +
                    '<td data-id="2">' + data[i].strDescripcion + '</td>' +
                    '<td data-id="3">' + data[i].strCalle + '</td >' +
                    '<td data-id="4">' + data[i].strNumExt + '</td> ' +
                    '<td data-id="5">' + data[i].strNumInt + '</td>' +
                    '<td data-id="7">' + data[i].strMunicipio + '</td >' +
                    '<td data-id="8">' + data[i].strColonia + '</td>' +
                    '<td data-id="9">' + data[i].strEstado + '</td>' +
                    '<td data-id="10">' + data[i].nombre + '</td >' +
                    "</tr> "
                );
            }
            $("#tbPventa").selectpicker("refresh");
        },
        error: function (x) {
           // console.log(x);
        },
    });
}

//ELIMINAR UN REGISTRO DE LA TABLA
function eliminarPuntoVenta(e) {
    var url = 'https://apirecargas.recargacelulares.com.mx/api/PuntosVenta/mtdEliminarPuntoVenta?intIdPunVenta=' + e.id;
    $.ajax({
        url: url,
        type: 'DELETE',
        contentType: "application/json;chartset=utf-8",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function () {
            //mtdLlenarTablaSistemas();
            Swal.fire(
                'Dado de baja',
                '',
                'success'
            );
            location.reload(true);
        },
        error: function (x) {
           // console.log(x);
            Swal.fire({
                type: 'error',
                title: 'Error Baja',
                text: ''
            });
        },
    });
}

//////////////////////////////////////


//consultar lo de un punto de venta en un modal
function ActualizarPuntov(e) {
    data = e.id;
  //  console.log('hola');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'PuntosVenta/mtdObtenerPorIdPuntosVenta?intIdPunVenta=' + data,
        datatype: 'json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {
            $("#txtNomPV").val(response[0].strDescripcion);
            $("#txtCalle").val(response[0].strCalle);
            $("#txtNumExt").val(response[0].strNumExt);
            $("#txtNumInt").val(response[0].strNumInt);
            $("#txtCodPos").val(response[0].strCodPos);
            $("#txtMunicipio").val(response[0].strMunicipio);
            $("#txtColonia").val(response[0].strColonia);
            $("#txtEstado").val(response[0].strEstado);
            $("#txtLatitud2").val(response[0].strLatitud);
            $("#txtLongitud2").val(response[0].strLongitud);
            $("#txtResponsable").val(response[0].intIdResponsable);
           // console.log('hola2');
        },
        error: function () {

        }

    });
}



//Modificar los datos insertados

$("#btnEditarPuntov").click(function () {
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTARÁ UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZARÁ LA PETICION AJAX PARA REALIZAR UN PUT A LA BASE DE DATOS CON EL CLIENTE SELECCIONADO
    if ($("#txtNomPV").val() == "" || $("#txtCalle").val() == "" || $("#txtNumExt").val() == "" || $("#txtNumInt").val() == "" || $("#txtCodPos").val() == "" ||
        $("#txtMunicipio").val() == "" || $("#txtColonia").val() == "" || $("#txtLatitud2").val() == "" ||
        $("#txtLongitud2").val() == "" || $("#txtResponsable").val() == "") {
        Swal.fire({
            type: 'info',
            title: 'Campos vacíos',
            text: 'No se puede editar con campos vacíos'
        });
    } else {
        //PETICION AJAX PARA ACTUALIZAR LOS CAMPOS DEL CLIENTE SELECCIONADO
        $.ajax({
            type: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            url: rutaServidor + 'PuntosVenta/mtdCambiarPuntoVenta?intIdPunVenta=' + data
                + '&strDescripcion=' + $.trim($("#txtNomPV").val())
                + '&strCalle=' + $.trim($("#txtCalle").val())
                + '&strNumExt=' + $.trim($("#txtNumExt").val())
                + '&strNumInt=' + $.trim($("#txtNumInt").val())
                + '&strCodPos=' + $.trim($("#txtCodPos").val())
                + '&strMunicipio=' + $.trim($("#txtMunicipio").val())
                + '&strColonia=' + $.trim($("#txtColonia").val())
                + '&strEstado=' + $.trim($("#txtEstado option:selected").val())
                + '&strLatitud=' + $.trim($("#txtLatitud2").val())
                + '&strLongitud=' + $.trim($("#txtLongitud2").val())
                + '&intIdResponsable=' + $.trim($("#txtResponsable").val()),
            dataType: '',
            success: function (response) {
                mtdLimpiarCamposPuntov();
                $("#btnEditarPuntov").hide();
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
function mtdLlenarOptionUsuariosPV() {
    $.ajax({
        type: 'GET',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Usuarios/mtdObtenerTodosUsuarios',
        datatype: 'Json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {

            //$(".sistemas").remove();
            for (var i in data) {
                //console.log(data);
                $('#txtResponsable').append("<option value='" + data[i].intIdUsuario + "'>" + data[i].strNombre + " " + data[i].strApp + " " + data[i].strApm + "</option>");
            }

            $("#txtResponsable").selectpicker("refresh");
        },
        error: function (x) {
            //console.log(x);
        },
    });
}