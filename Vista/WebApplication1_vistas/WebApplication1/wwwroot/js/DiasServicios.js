

//funciona para agregar los dias que contien el check box.
function mtdAgregarDiasServicio() {
    var CUserV = localStorage.getItem('VReg');
    var size = 0;
    var i = 0;
    var arrTodo = new Array();
    $('#DiasServicio input[type = checkbox]').each(function () {
        if (this.checked) {
            size++;
        }
    });
    $('#DiasServicio input[type = checkbox]').each(function () {
        var item = {};
        if (this.checked) {
            item = this.value;
            arrTodo.push(item);
        }
        i++;
        if (i <= size) {
        }
    });
    arrTodo.forEach(Dia);
   // console.log(arrTodo);
    function Dia(item) {
        $.ajax({
            type: 'POST',
            url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + CUserV + "&strDia=" + item,
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
//
//Funcion para obtener los dias de los vendedores en este caso al hacer clic en el boton de editar
function ObtenerDiasVendedores() {
    var UserHVendedor = localStorage.getItem('UVendedor');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'DiasServicio/ObtenerDia?strVendedor=' + UserHVendedor,
        dataType: 'JSON',
        success: function (data) {
            // console.log(data);
            //guardamos las acciones en una variable para validar que puede hacer.
            var dias = (data);
            //           
            for (i = 0; i < dias.length; i++) {
                var Dia = dias[i].strDia;
                //console.log(Dia);
                //if (Accion == 'CrearUsuarios') {
                //    $("#CrearC input[type=checkbox]").prop("checked", true);                  
                //}
                if (Dia == 'Lunes') {
                    $("#LunesV input[type=checkbox]").prop("checked", true);
                }
                else {
                    if (Dia == 'Martes') {
                        $("#MartesV input[type=checkbox]").prop("checked", true);
                    }
                    else {
                        if (Dia == 'Miercoles') {
                            $("#MiercolesV input[type=checkbox]").prop("checked", true);
                        } else {
                            if (Dia == 'Jueves') {
                                $("#JuevesV input[type=checkbox]").prop("checked", true);
                            } else {
                                if (Dia == 'Viernes') {
                                    $("#ViernesV input[type=checkbox]").prop("checked", true);
                                } else {
                                    if (Dia == 'Sabado') {
                                        $("#SabadoV input[type=checkbox]").prop("checked", true);
                                    } else {
                                        if (Dia == 'Domingo') {
                                            $("#DomingoV input[type=checkbox]").prop("checked", true);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        error: function (x) {
        },
    });
}

//
//Funcion para eliminar Dias Servicio de vendedores y crearlas si se requiere
function EliminarDiasVendedor() {
    var UserHVen = localStorage.getItem('UVendedor');
    //Lunes Eliminar y alta
    $('#checkbox_L').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Lunes',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Lunes',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });

    //Martes eliminar y alta
    $('#checkbox_M').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Martes',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Martes',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });
    //Miercoles eliminar y alta
    $('#checkbox_Mi').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Miercoles',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Miercoles',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });
    //jueves eliminar y alta
    $('#checkbox_J').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Jueves',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Jueves',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });
    //Viernes eliminar y alta
    $('#checkbox_V').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Viernes',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Viernes',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });
    //Sabado eliminar y alta
    $('#checkbox_S').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Sabado',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Sabado',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });
    //Domingo eliminar y alta
    $('#checkbox_D').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "DiasServicio/mtdAgregarDia?strVendedor=" + UserHVen + "&strDia=" + 'Domingo',
                dataType: '',
                success: function (response) {
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Dia',
                        text: 'Error en el servidor error al agregar los dias'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "DiasServicio/mtdEliminarDia?strVendedor=" + UserHVen + "&strDia=" + 'Domingo',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Dia Eliminado');
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
    });
}

//$("#btnGuardarVendedor").click(function () {
//    mtdAgregarDiasServicio();
//});