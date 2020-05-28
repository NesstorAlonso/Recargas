//funcion para obtener permisos y ver que vistas obtener de acuerdo a su opcion
$(function () {
  //  OtorgaPermiso() 
});

function ConsultarPermisos() {
    var intIdRol = localStorage.getItem('intIdRol');
    $.ajax({
        url: 'https://apirecargas.recargacelulares.com.mx/api/AsignaRole/PermisoRol?intIdRol=' + intIdRol,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            
            //
            for (i = 0; i < response.length; i++) {
                var Permiso = response[i].intIdOpcion;
                //console.log(response[i].intIdOpcion);
                

            }
            localStorage.setItem("Permisos", JSON.stringify(response));
            var valida = JSON.parse(localStorage.getItem("Permisos"));
            for (i = 0; i < valida.length; i++) {
                var dato = valida[i].intIdOpcion
               
                //

                if (dato == 1) {                  
                    // $("#nave2").hide();
                    $("#nave").append(
                        '<li><a id="1">Tiempo aire</a></li>'
                    );
                   // $("#1").attr("href", "https://www.recargacelulares.com.mx/Home/TiempoAire");
                    $("#1").attr("href", "https://localhost:44338/Home/TiempoAire");
                }
                else {
                    if (dato == 2) {  
                        $("#nave").append(
                            '<li><a id="2">Promociones</a></li>'
                        );
                       // $("#2").attr("href", "https://www.recargacelulares.com.mx/Home/Promociones");
                        $("#2").attr("href", "https://localhost:44338/Home/Promociones");
                    } else {
                        if (dato == 5) {
                            $("#nave").append(
                                '<li><a id="3">Favoritos</a></li>'
                            );
                           // $("#3").attr("href", "https://www.recargacelulares.com.mx/Home/Favoritos");
                            $("#3").attr("href", "https://localhost:44338/Home/Favoritos");
                        }
                        else {
                            if (dato == 6) {
                                $("#nave1").append(
                                    '<li><a id="4">Pago de servicios</a></li>'
                                );
                                $("#4").attr("href", "https://www.recargacelulares.com.mx/Home/Servicios");
                                $("#4").attr("href", "https://localhost:44338/Home/Servicios");
                            }
                            else {
                                if (dato == 7) {
                                    $("#nave1").append(
                                        '<li><a id="5">Pines electrònicos</a></li>'
                                    );
                                    //$("#5").attr("href", "https://www.recargacelulares.com.mx/Home/Pines");
                                    $("#5").attr("href", "https://localhost:44338/Home/Pines");
                                }
                                else {
                                    if (dato == 8) {
                                        //console.log("Si pasa");

                                        //$("#nave1").append(
                                        //    '<li><a id="5">Pines electrònicos</a></li>'
                                        //);
                                        //$("#4").attr("href", "https://www.recargacelulares.com.mx/Home/Pines");
                                    }
                                    else {
                                        if (dato == 9) {
                                            //console.log("Si pasa");
                                            $("#nave3").append(
                                                '<li><a id="7">Usuarios</a></li>'
                                            );
                                            //$("#7").attr("href", "https://www.recargacelulares.com.mx/Home/Rusuarios");
                                            $("#7").attr("href", "https://localhost:44338/Home/Rusuarios");
                                        }
                                        else {
                                            if (dato == 11) {
                                                //console.log("Si pasa");
                                                $("#nave3").append(
                                                    '<li><a id="8">Clientes</a></li>'
                                                );
                                                //$("#8").attr("href", "https://www.recargacelulares.com.mx/Home/Rclientes");
                                                $("#8").attr("href", "https://localhost:44338/Home/Rclientes");
                                            }
                                            else {
                                                if (dato == 12) {
                                                    //console.log("Si pasa");
                                                    $("#nave3").append(
                                                        '<li><a id="9">Abonos</a></li>'
                                                    );
                                                    //$("#9").attr("href", "https://www.recargacelulares.com.mx/Home/Abonos");
                                                    $("#9").attr("href", "https://localhost:44338/Home/Abonos");
                                                }
                                                else {
                                                    if (dato == 14) {
                                                        //console.log("Si pasa");
                                                        //$("#nave4").append(
                                                        //    '<li><a id="10">Informaciòn de la cuenta</a></li>'
                                                        //);
                                                        //$("#10").attr("href", "https://www.recargacelulares.com.mx/Home/InfoCuenta");
                                                    }
                                                    else {
                                                        if (dato == 15) {
                                                            //console.log("Si pasa");
                                                            //$("#nave4").append(
                                                            //    '<li><a id="11">Usuarios</a></li>'
                                                            //);
                                                            //$("#11").attr("href", "https://www.recargacelulares.com.mx/Home/Usuarios");
                                                        }
                                                        else {
                                                            if (dato == 16) {
                                                                //console.log("Si pasa");
                                                                //$("#nave4").append(
                                                                //    '<li><a id="12">Puntos de venta</a></li>'
                                                                //);
                                                                //$("#12").attr("href", "https://www.recargacelulares.com.mx/Home/PVenta");
                                                            }
                                                            else {
                                                                if (dato == 18) {
                                                                    //console.log("Si pasa");
                                                                    //$("#nave4").append(
                                                                    //    '<li><a id="13">Clientes</a></li>'
                                                                    //);
                                                                    //$("#13").attr("href", "https://www.recargacelulares.com.mx/Home/Clientes");
                                                                }
                                                                else {
                                                                    if (dato == 19) {
                                                                        //console.log("Si pasa");
                                                                        //$("#nave4").append(
                                                                        //    '<li><a id="14">Traspaso de saldo</a></li>'
                                                                        //);
                                                                       // $("#14").attr("href", "https://www.recargacelulares.com.mx/Home/TraSaldo");
                                                                    }
                                                                    else {
                                                                        if (dato == 20) {
                                                                           
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ///console.log("no paso" + dato);

                }

                //
            }
        },
        error: function () {
          //  console.log('Error!');
        }

    });
}


//funciona para las acciones  (Complementos)
function mtdAgregarAcciones() {
    var CUser = localStorage.getItem('UReg');
    var size = 0;
    var i = 0;
    var arrTodo = new Array();
    $('#Complemento input[type = checkbox]').each(function () {
        if (this.checked) {
            size++;
        }
    });
    $('#Complemento input[type = checkbox]').each(function () {
        var item = {};
        if (this.checked) {
            item = this.value;
            arrTodo.push(item);
        }
        i++;
        if (i <= size) {
        }
    });   
    arrTodo.forEach(Agregar);
    function Agregar(item) {
        $.ajax({
            type: 'POST',
            url: rutaServidor + "Acciones/mtdAgregarAccion?claveUsuario=" + CUser + "&strPermiso=" + item,
            dataType: '',
            success: function (response) {               
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


//Funcion para obtener las acciones o permisos del usuario
// y decidir que boton mostrar en este caso "Crear clientes", "crear Usuarios", "DEpositos multinivel"
function Acciones() {
    var UserAccion = localStorage.getItem('userName');
    $.ajax({
        type: 'GET',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Acciones/ObtenerAcciones?claveUsuario=' + UserAccion,
        dataType: 'JSON',
        success: function (data) {            
            //guardamos las acciones en una variable para validar que puede hacer.
            var acciones = (data);
            //
            for (i = 0; i < acciones.length; i++) {
                var Accion = acciones[i].strPermiso;               
                if (Accion == 'CrearClientes') {
                    $("#btnAgregarDistri").show();
                }
                else {
                    if (Accion == 'CrearUsuarios') {
                        $("#btnAgregarUsuario").show();
                        //va el codigo a implementar
                    }
                    else {
                        if (Accion == 'DepositosMultinivel') {
                            //va el codigo a implementar
                        }
                    }
                }


            }
        },
        error: function (x) {
        },
    });
}


