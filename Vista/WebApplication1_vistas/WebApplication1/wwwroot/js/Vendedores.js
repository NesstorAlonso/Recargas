//llena la tabla de los vendedores este solo muestra los que contenga el rol de "Vendedores"
//la funcion se manda a llamar desde el scrip de Usuario2.js en las linea 8 
function mtdLlenarTablaVendedores() {
    //console.log(IdUsuario);
    var fila = 1;
    var Datos = JSON.parse(localStorage.getItem("data"));
    localStorage.setItem("idPadre", Datos["0"]["id"]);

    var idPadre1 = localStorage.getItem('idPadre');

    fila++;
    //console.log(idPadre1);
    $.ajax({
        type: "GET",
        url: rutaServidor + 'Vendedores/ObtenerVendedores?Id=' + idPadre1 + '&strEstatus=A',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            //console.log(data);
            //$(".sistemas").remove();
            for (var i in data) {
                $("#tbANUsersVendedores").append(

                    '<tr value=' + data[i].id + '>' +
                    '<td data-id="2">' + data[i].userName + '</td >' +
                    '<td data-id="5">' + data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno + '</td> ' +
                    '<td data-id="6">' + data[i].phoneNumber + '</td> ' +
                    '<td data-id="7">' +
                    '<button id="' + data[i].id + '" onClick="MostrarDatosVendedorEditar(this)" data-toggle="modal" data-target="#EditarUserVendedor" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '<td data-id="8">' +
                    '<button id="' + data[i].id + '" onClick="BloquearVendedores(this)" class="button button-small edit" title ="Bloquear Usuario"><i class="zmdi zmdi-block"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</tr> '
                );

            }
            $("#tbANUsersVendedores").selectpicker("refresh");
        },
        error: function (x) {
            // console.log(x);
        },
    });
}

$("#btnVendedorD").click(function () {
    mtdLimpiarCamposVendedor();
    $("#modalVendedor").modal('hide');
});
function mtdLimpiarCamposVendedor() {
    $("#txtNombreV").val("");
    $("#txtEmailVendedor").val("");
    $("#txtTelefonoV").val("");
}

//Funcion que bloquea a los vendedores o los deshabilita, estos ya no pueden iniciar sesion,
//hasta contactarse con el administrador
function BloquearVendedores(e) {
    data = e.id;
    Swal.fire({
        title: 'Esta seguro de continuar?' + '</br>' + 'Al seleccionar continuar, bloqueara al vendedor seleccionado!!',
        type: 'warning',
        showConfirmButton: false,
        html:
            '<ul class="nav nav-tabs padding-0">' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
            '<button id="Bloquear" class="btn btn-success">' +
            'Continuar' +
            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
            '<a href="https://www.recargacelulares.com.mx/Home/Vendedores"><button id="Cancel" class="btn btn-danger">' +
            'Cancelar' +
            '</button></a><br/>' +
            '</ul>' + '<h6 id="Mensaje">Bloqueando...</h6>'
    });
    $("#Mensaje").hide();
    $("#Bloquear").click(function () {
        Swal.fire({
            title: 'Bloqueando...',
            showConfirmButton: false,
        });
        $("#Bloquear").hide();
        $("#Cancel").hide();
        $("#Mensaje").show();
        Swal.showLoading()
        $.ajax({
            type: 'PUT',
            url: rutaServidor + 'ConsultaHijos/mtdDeshabilitarCliente?Id=' + data + '&strEstatus=I',
            dataType: '',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            success: function (data) {
                Swal.fire({
                    type: 'success',
                    title: 'Correcto',
                    text: 'El vendedor fue bloqueado correctamente',
                    timer: 2000

                });

                setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Vendedores'", 2000);
            },
            error: function (x) {
                Swal.fire({
                    type: 'error',
                    title: 'Error al bloquear cliente',
                    text: 'Error en el servidor intente mas tarde'
                });
            },
        });

    });
}