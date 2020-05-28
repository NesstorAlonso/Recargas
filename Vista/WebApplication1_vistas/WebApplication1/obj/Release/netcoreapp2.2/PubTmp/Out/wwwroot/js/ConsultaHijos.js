//llena la tabla de hijos
//la funcion se manda a llamar desde el scrip de Usuario2.js en las lineas 147 
var IdUsuario;
var strIdPadre;
var IdUsuarioH;

function mtdLlenarTablaHijos(e) {

    $("#tbANUsers td").remove();
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'ConsultaHijos/ObtenerHijos?Id=' + e.id + '&strEstatus=A',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            $(".LlenarCH").remove();
            for (var i in data) {
                $("#tbANUsers").append(

                    '<tr class="LlenarCH" value=' + data[i].id + '>' +
                    '<td data-id="2">' + data[i].strComercio + '</td >' +
                    '<td data-id="2">' + data[i].userName + '</td >' +
                    '<td data-id="5">' + data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno + '</td> ' +
                    '<td data-id="6">' + data[i].phoneNumber + '</td> ' +
                    '<td data-id="3">' + data[i].strContacto + '</td> ' +
                    '<td data-id="3">' + data[i].email + '</td> ' +
                    '<td data-id="4"> $0.00</td >' +
                    '<td data-id="7">' +
                    '<button id="' + data[i].id + '" onClick="mtdLlenarTablaHijos(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Mostrar Usuario"><i class="zmdi zmdi-sort-amount-desc"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '<td data-id="10">' +
                    '<button id="' + data[i].id + '" onClick="MostrarDatosUsuariosEditar(this)" data-toggle="modal" data-target="#EditarHijo" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '<td data-id="11">' +
                    '<button id="' + data[i].id + '" onClick="DeshabilitarClienteDistribuidor(this)" class="button button-small edit" title ="Baja usuario"><i class="zmdi zmdi-delete"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '<td data-id="12">' +
                    '<button id="' + data[i].strIdPadre + '" onClick="mtdLlenarTablaPadre(this)" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-long-arrow-up"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</tr> '
                );
                strIdPadre = data[i].strIdPadre;
                ///
                IdUsuarioH = data[i].id;
                //
                var NomHijoPAdre = data[i].userName;
                localStorage.setItem("NombHijoPad", NomHijoPAdre);
                $('#nombreHijo1').text('../ ' + localStorage.getItem('NombHijoPad'));
                //
            }
            $("#tbANUsers").selectpicker("refresh");
        },
        error: function (x) {
            // console.log(x);
        },
    });
}

//Para busqueda


//Esta funcion manda a llamar a solo a los hijos del 
//usurio que se encuentra logeado.
//Esto permite que el padre pueda editar la informacion de sus hijos.
//Esta funcion se manda a llamar desde el scrip de usuarios2.js linea 7

//original

var dataSet  = new Array();
function mtdLlenarTablaHijosDeUsuarioLogin() {

    while (dataSet.length) {
        dataSet.pop();
    }
    $("#tbEliminados").hide();
    IdUsuario = localStorage.getItem('idPadre');
   // $("#tbANUsers td").remove();
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'ConsultaHijos/ObtenerHijos?Id=' + IdUsuario + '&strEstatus=A',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            dataSet = [];
            $(".YULogin").remove();
            $("#tbANUsers tbody").empty();
            for (var i in data) {

                dataSet.push({
                    'strComercio': data[i].strComercio,
                    'userName': data[i].userName,
                    'strNombre': data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno,
                    'phoneNumber': data[i].phoneNumber,
                    'strContacto': data[i].strContacto,
                    'email': data[i].email,
                    'saldo': ' $0.00',
                    'id': data[i].id ,
                    'id': data[i].id,
                    'id': data[i].id
                });


              
                ///
                strIdPadre = data[i].strIdPadre;
                IdUsuarioH = data[i].id;
               // $("#tbANUsers").addClass("js-basic-example");
                ///
            }

            console.log(dataSet);

            $("#tbANUsers").dataTable().fnDestroy();
            ////Aqui empieza
     

            $('#tbANUsers').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                search: false,
                ordering: false,
                searching: false,
                
                    data: dataSet ,
                    columns: [
                        { data: 'strComercio' },
                        { data: 'userName' },
                        { data: 'strNombre' },
                        { data: 'phoneNumber' },
                        { data: 'strContacto' },
                        { data: 'email' },
                        { data: 'saldo' },
                        //{ data: 'id' },

                        {
                            data: "id", render: function (data, type, row, meta) {
                                return type === 'display' ?
                                    '<button id = "' + data+ '" onClick = "mtdLlenarTablaHijos(this)" data - toggle="modal" data - target="#EditarDistribuidor" class="button button-small edit" title = "Mostrar Usuario" > <i class="zmdi zmdi-sort-amount-desc"></i></button >'  :
                                    data;
                            }
                        },

                        {
                            data: "id", render: function (data, type, row, meta) {
                                return type === 'display' ?
                                    '<button id="' + data + '" onClick="MostrarDatosUsuariosEditar(this)" data-toggle="modal" data-target="#EditarHijo" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' :
                                    data;
                            }
                        },

                        {
                            data: "id", render: function (data, type, row, meta) {
                                return type === 'display' ?
                                    '<button id="' + data+ '" onClick="DeshabilitarClienteDistribuidor(this)" class="button button-small edit" title="Baja usuario"><i class="zmdi zmdi-delete"></i></button>':
                                    data;
                            }
                        }
                       
                ]
                    

                });



            //$('#tbANUsers').DataTable();
           // $("#tbANUsers").DataTable({ "pageLength": 10 });
          
           // $("#tbANUsers").selectpicker("refresh");

        },
        error: function (x) {
            // console.log(x);
        },
    });
}

//LLenado de tabla de padre
function mtdLlenarTablaPadre(e) {
    $("#tbANUsers td").remove();
    var fila = 1;
    fila++;
    ///
    if (strIdPadre == IdUsuario) {       
        $("#tbANUsers td").remove();
        var fila = 1;
        fila++;
        $.ajax({
            type: "GET",
            url: rutaServidor + 'ConsultaHijos/ObtenerHijos?Id=' + IdUsuario + '&strEstatus=A',
            datatype: "Json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            success: function (data) {
                $("#tbANUsers tbody").empty();
                $(".YULogin").remove();
                for (var i in data) {
                    $("#tbANUsers").append(
                        '<tr class="YULogin" value=' + data[i].id + '>' +
                        '<td data-id="2">' + data[i].strComercio + '</td >' +
                        '<td data-id="2">' + data[i].userName + '</td >' +
                        '<td data-id="5">' + data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno + '</td> ' +
                        '<td data-id="6">' + data[i].phoneNumber + '</td> ' +
                        '<td data-id="3">' + data[i].strContacto + '</td> ' +
                        '<td >' + data[i].email + '</td> ' +
                        '<td data-id="4"> $0.00</td >' +
                        '<td data-id="7">' +
                        '<button id="' + data[i].id + '" onClick="mtdLlenarTablaHijos(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Mostrar Usuario"><i class="zmdi zmdi-sort-amount-desc"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="10">' +
                        '<button id="' + data[i].id + '" onClick="MostrarDatosUsuariosEditar(this)" data-toggle="modal" data-target="#EditarHijo" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="11">' +
                        '<button id="' + data[i].id + '" onClick="DeshabilitarClienteDistribuidor(this)" class="button button-small edit" title ="Baja usuario"><i class="zmdi zmdi-delete"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '</tr> '
                    );
                    ///
                    strIdPadre = data[i].strIdPadre;
                    IdUsuarioH = data[i].id;
                    ///
                    var NomHijoPAdre1 = data[i].userName;
                    localStorage.setItem("NombHijoPad", NomHijoPAdre1);
                    $('#nombreHijo1').text('/ ' + localStorage.getItem('NombHijoPad'));
                    //
                }
                $("#tbANUsers").selectpicker("refresh");
            },
            error: function (x) {
                // console.log(x);
            },
        });
    } else {      
        $.ajax({
            type: "GET",
            url: rutaServidor + 'ConsultaHijos/ObtenerPadre?strIdPadre=' + strIdPadre + '&strEstatus=A',
            datatype: "Json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            success: function (data) {
                for (var i in data) {
                    $("#tbANUsers").append(

                        '<tr value=' + data[i].strIdPadre + '>' +
                        '<td data-id="2">' + data[i].strComercio + '</td >' +
                        '<td data-id="2">' + data[i].userName + '</td >' +
                        '<td data-id="5">' + data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno + '</td> ' +
                        '<td data-id="6">' + data[i].phoneNumber + '</td> ' +
                        '<td data-id="3">' + data[i].strContacto + '</td> ' +
                       

                        '<td data-id="4"> $0.00</td >' +
                        '<td data-id="7">' +
                        '<button id="' + data[i].id + '" onClick="mtdLlenarTablaHijos(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Mostrar hijo"><i class="zmdi zmdi-sort-amount-desc"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="10">' +
                        '<button id="' + data[i].id + '" onClick="MostrarDatosUsuariosEditar(this)" data-toggle="modal" data-target="#EditarHijo" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="11">' +
                        '<button id="' + data[i].id + '" onClick="DeshabilitarClienteDistribuidor(this)" class="button button-small edit" title ="Baja usuario"><i class="zmdi zmdi-delete"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '<td data-id="7">' +
                        '<button id="' + data[i].strIdPadre + '" onClick="mtdLlenarTablaPadre(this)" data-toggle="modal" data-target="#EditarDistribuidor" class="button button-small edit" title ="Mostrar Usuario"><i class="zmdi zmdi-long-arrow-up"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                        '</tr> '
                    );
                    strIdPadre = data[i].strIdPadre;
                    ///
                    IdUsuarioH = data[i].id;
                    ///
                    var NomHijoPAdre2 = data[i].userName;
                    localStorage.setItem("NombHijoPad", NomHijoPAdre2);
                    $('#nombreHijo1').text('/ ' + localStorage.getItem('NombHijoPad'));
                    //
                }
                $("#tbANUsers").selectpicker("refresh");
            },
            error: function (x) {
                // console.log(x);
            },
        });
    }


}
//
//
////Metodo para llenar la tabla de elimindado para poder habilitarlos.
function mtdLlenarTablaEliminados() {
    var IdUsuarioE = localStorage.getItem('idPadre');
    //console.log(IdUsuario);
    $("#tbANUsers td").remove();
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'ConsultaHijos/ObtenerHijos?Id=' + IdUsuarioE + '&strEstatus=I',
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
           // console.log(data);
            $(".Elimindados").remove();
            for (var i in data) {
                $("#tbEliminados").append(

                    '<tr class="Elimindados" value=' + data[i].id + '>' +
                    '<td data-id="2">' + data[i].strComercio + '</td >' +
                    '<td data-id="2">' + data[i].userName + '</td >' +
                    '<td data-id="5">' + data[i].strNombre + ' ' + data[i].strApaterno + ' ' + data[i].strAmaterno + '</td> ' +
                    '<td data-id="6">' + data[i].phoneNumber + '</td> ' +
                    '<td data-id="3">' + data[i].strContacto + '</td> ' +
                    '<td data-id="4"> $0.00</td >' +
                    '<td data-id="11">' +
                    '<button id="' + data[i].id + '" onClick="HabilitarClienteDistribuidor(this)" class="button button-small edit" title ="Alta cliente"><i class="zmdi zmdi-account-add"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +
                    '</tr> '
                );

            }
            $("#tbEliminados").selectpicker("refresh");
        },
        error: function (x) {
            // console.log(x);
        },
    });
}
////
//



//consultar lo de un usuario en un modal para poder ser editado
function MostrarDatosUsuariosEditar(e) {
    data = e.id;
    localStorage.setItem("idEditarUser", data);
    window.location.href = 'https://www.recargacelulares.com.mx/Home/EditarUsuario';
   //window.location.href = 'https://localhost:44338/Home/EditarUsuario';
   // console.log('hola');
    //$.ajax({
    //    type: 'GET',
    //    url: rutaServidor + 'ConsultaHijos/mtdObtenerPorIdHijosInfo?Id=' + data,
    //    datatype: 'json',
    //    success: function (response) {
    //        //console.log(response);
    //        //$("#TipoPer").val(response[0].bitTipoPersona);
    //        $("#NombreHijo").val(response[0].strNombre);
    //        $("#APellidoPater").val(response[0].strApaterno);
    //        $("#APellidoMater").val(response[0].strAmaterno);
    //        $("#FechaNacimi").val(response[0].dtmFechaNacimiento);
    //        $("#RFCHijo").val(response[0].strRfc);
    //        //$("#GeneroHijo").val(response[0].bitGenero);
    //        //$("#CompaniaHijo").val(response[0].strCompania);
    //        $("#CPHijo").val(response[0].strCp);
    //        //$("#EstadoHijo").val(response[0].strEstado);
    //        $("#MunicipioHijo").val(response[0].strMunicipio);
    //        $("#ColoniaHijo").val(response[0].strColonia);
    //        $("#VialidadHijo").val(response[0].strTVialidad);
    //        $("#CalleHijo").val(response[0].strCalle);
    //        $("#NEHijo").val(response[0].strNumExt);
    //        $("#NIHijo").val(response[0].strNumInt);
    //        $("#ContactoHijo").val(response[0].strContacto);
    //        $("#ComercioHijo").val(response[0].strComercio);

    //        localStorage.setItem("UserHijos", response[0].userName);
    //        localStorage.setItem("IdComision", response[0].id);
    //        //console.log(localStorage.getItem('UserHijos'));
    //        AccionesHijos();
    //        AccionesEliminarHijos();
    //        llenarComisiones();
    //        NotificacionesEliminarHijos();
    //        NotificacionesHijos();
    //    },
    //    error: function () {

    //    }

    //});
}

function EnviarDatosUsuario() {
    var idEU = localStorage.getItem("idEditarUser");
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'ConsultaHijos/mtdObtenerPorIdHijosInfo?Id=' + idEU,
        datatype: 'json',
        success: function (response) {
            //console.log(response);
            var tipo = response[0].bitTipoPersona;
            var genero = response[0].bitGenero;
            var compania = response[0].strCompania;
            var estado = response[0].strEstado;

            console.log(estado);
            if (tipo) {
                
                $("#TipoPer option[value=" + 1 + "]").attr("selected", true);
                $("#TipoPer").selectpicker('refresh');
            }
            else {
                $("#TipoPer option[value=" + 0 + "]").attr("selected", true);
                $("#TipoPer").selectpicker('refresh');
            }
            if (genero) {
                $("#GeneroHijo option[value=" + 1 + "]").attr("selected", true);
                $("#GeneroHijo").selectpicker('refresh');
            }
            else {
                $("#GeneroHijo option[value=" + 0 + "]").attr("selected", true);
                $("#GeneroHijo").selectpicker('refresh');
            }

            switch (compania) {
                case 'Telcel':
                    $("#CompaniaHijo option[value=" + 'Telcel' + "]").attr("selected", true);
                    $("#CompaniaHijo").selectpicker('refresh');

                    break;
                case 'att':
                    $("#CompaniaHijo option[value=" + 'Att' + "]").attr("selected", true);
                    $("#CompaniaHijo").selectpicker('refresh');

                    break;

                case 'movistar':
                    $("#CompaniaHijo option[value=" + 'Movistar' + "]").attr("selected", true);
                    $("#CompaniaHijo").selectpicker('refresh');

                    break;

                case 'unefon':
                    $("#CompaniaHijo option[value=" + 'Unefon' + "]").attr("selected", true);
                    $("#CompaniaHijo").selectpicker('refresh');
                    break;

                case 'VIRGIN MOBILE':
                    $("#CompaniaHijo option[value=" + 'VirginMobile' + "]").attr("selected", true);
                    $("#CompaniaHijo").selectpicker('refresh');
                    break;

            }

            switch (estado) { 
                case 'Aguascalientes':
                    $("#EstadoHijo option[value=" + 'Aguascalientes' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Baja California':
                    $("#EstadoHijo option[value=" + 'BajaCaliforniaNorte' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Baja California Sur':
                    $("#EstadoHijo option[value=" + 'BajaCaliforniaSur' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Campeche':
                    $("#EstadoHijo option[value=" + 'Campeche' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Chiapas':
                    $("#EstadoHijo option[value=" + 'Chiapas' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Chihuahua':
                    $("#EstadoHijo option[value=" + 'Chihuahua' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Ciudad de México':
                    $("#EstadoHijo option[value=" + 'Cdmx' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Coahuila':
                    $("#EstadoHijo option[value=" + 'Coahuila' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Colima':
                    $("#EstadoHijo option[value=" + 'Colima' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Durango':
                    $("#EstadoHijo option[value=" + 'Durango' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Guanajuato':
                    $("#EstadoHijo option[value=" + 'Guanajuato' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Guerrero':
                    $("#EstadoHijo option[value=" + 'Guerrero' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Hidalgo':
                    $("#EstadoHijo option[value=" + 'Hidalgo' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Jalisco':
                    $("#EstadoHijo option[value=" + 'Jalisco' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'México':
                    $("#EstadoHijo option[value=" + 'Mexico' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Michoacán':
                    $("#EstadoHijo option[value=" + 'Michoacan' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Morelos':
                    $("#EstadoHijo option[value=" + 'Morelos' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Nayarit':
                    $("#EstadoHijo option[value=" + 'Nayarit' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Nuevo León':
                    $("#EstadoHijo option[value=" + 'NL' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Oaxaca':
                    $("#EstadoHijo option[value=" + 'Oaxaca' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Puebla':
                    $("#EstadoHijo option[value=" + 'Puebla' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Querétaro':
                    $("#EstadoHijo option[value=" + 'Queretaro' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Quintana Roo':
                    $("#EstadoHijo option[value=" + 'Qroo' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'San Luis Potosí':
                    $("#EstadoHijo option[value=" + 'SLP' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Sinaloa':
                    $("#EstadoHijo option[value=" + 'Sinaloa' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Sonora':
                    $("#EstadoHijo option[value=" + 'Sonora' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Tabasco':
                    $("#EstadoHijo option[value=" + 'Tabasco' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Tamaulipas':
                    $("#EstadoHijo option[value=" + 'Tamaulipas' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Tlaxcala':
                    $("#EstadoHijo option[value=" + 'Tlaxcala' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Veracruz':
                    $("#EstadoHijo option[value=" + 'Veracruz' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Yucatán':
                    $("#EstadoHijo option[value=" + 'Yucatan' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;

                case 'Zacatecas':
                    $("#EstadoHijo option[value=" + 'Zacatecas' + "]").attr("selected", true);
                    $("#EstadoHijo").selectpicker('refresh');
                    break;
            }

            
           
            $("#NombreHijo").val(response[0].strNombre);
            $("#APellidoPater").val(response[0].strApaterno);
            $("#APellidoMater").val(response[0].strAmaterno);
            $("#FechaNacimi").val(response[0].dtmFechaNacimiento);
            $("#RFCHijo").val(response[0].strRfc);
            //$("#GeneroHijo").val(response[0].bitGenero);
            //$("#CompaniaHijo").val(response[0].strCompania);

            $("#FechaNacimi").val(response[0].dtmFechaNacimiento.substring(0, 10));
         
            $("#CPHijo").val(response[0].strCp);
            //$("#EstadoHijo").val(response[0].strEstado);
            $("#MunicipioHijo").val(response[0].strMunicipio);
            $("#ColoniaHijo").val(response[0].strColonia);
            $("#VialidadHijo").val(response[0].strTVialidad);
            $("#CalleHijo").val(response[0].strCalle);
            $("#NEHijo").val(response[0].strNumExt);
            $("#NIHijo").val(response[0].strNumInt);
            $("#ContactoHijo").val(response[0].strContacto);
            $("#ComercioHijo").val(response[0].strComercio);
            $("#strTelefono").val(response[0].phoneNumber); 


            localStorage.setItem("UserHijos", response[0].userName);
            localStorage.setItem("IdComision", response[0].id);
            //console.log(localStorage.getItem('UserHijos'));
            AccionesHijos();
            AccionesEliminarHijos();
            llenarComisiones();
            NotificacionesEliminarHijos();
            NotificacionesHijos();
        },
        error: function () {

        }

    });
}

var t = true;
var g = true;
//Modificar los datos del usuario en este casio de los hijos
//
$("#btnEditarUsuarioshijos").click(function () {   
    var idEU = localStorage.getItem("idEditarUser");
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTARÁ UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZARÁ LA PETICION AJAX PARA REALIZAR UN PUT A LA BASE DE DATOS CON EL CLIENTE SELECCIONADO
    if ($("#Tpersona").val() == "" || $("#validationCustom01").val() == "" || $("#apellidop").val() == "" || $("#apellidom").val() == "" || $("#bday").val() == "" ||
        $("#rfc1").val() == "" || $("#GeneroId option:selected").val() == "0" || $("#comptel option:selected").val() == "0" || $("#codigopostal").val() == "" ||
        $("#estado").val() == "" || $("#municipio").val() == "" || $("#municipio").val() == " "   /*|| $("#colonia").val() == ""*/) {
        Swal.fire({
            type: 'info',
            title: 'Campos vacíos',
            text: 'No se puede editar con campos vacíos'
        });
    } else {
        var tel = $("#strTelefono").val();
        console.log(tel);

        var ti = $.trim($("#TipoPer option:selected").val());
        if (ti == "0") {
            t = false;
        }

        var genero = $.trim($("#GeneroId option:selected").val());
        if (genero == 0) {
            g = false;
            
        }
        console.log(genero);

       // alert(t);

        //PETICION AJAX PARA ACTUALIZAR LOS CAMPOS DEL CLIENTE SELECCIONADO
        $.ajax({
            //TIPO DE PETICION QUE SE REALIZA
            type: 'PUT',
            //URL A DONDE SE CONECTARÁ, EN ESTE CASO LOS PARÁMETROS QUE SE ENVIARÁN AL API NOTA: La variable rutaServidor es invocada desde otro script
            url: rutaServidor + 'ConsultaHijos/mtdInsertarUsuariosHijos?Id=' + idEU
                + '&bitTipoPersona=' + t
                + '&strNombre=' + $.trim($("#NombreHijo").val())
                + '&strApaterno=' + $.trim($("#APellidoPater").val())
                + '&strAmaterno=' + $.trim($("#APellidoMater").val())
                + '&dtmFechaNacimiento=' + $.trim($("#FechaNacimi").val())
                + '&strRFC=' + $.trim($("#RFCHijo").val())
                + '&bitGenero=' + g
                + '&strCompania=' + $.trim($("#CompaniaHijo option:selected").val())
                + '&strCp=' + $.trim($("#CPHijo").val())
                + '&strEstado=' + $.trim($("#EstadoHijo").val())
                + '&strMunicipio=' + $.trim($("#MunicipioHijo").val())
                + '&strColonia=' + $.trim($("#ColoniaHijo").val())
                + '&strTVialidad=' + $.trim($("#VialidadHijo").val())
                + '&strCalle=' + $.trim($("#CalleHijo").val())
                + '&strNumExt=' + $.trim($("#NEHijo").val())
                + '&strNumInt=' + $.trim($("#NIHijo").val())
                + '&strContacto=' + $.trim($("#ContactoHijo").val())
                + '&strComercio=' + $.trim($("#ComercioHijo").val())
                + '&strTelefono=' + '2727197440',
            dataType: '',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            success: function (data) {
               // console.log("hola, si se inserto");

                //ACCIONES A REALIZARSE EN CASO DE QUE LA PETICION SEA EXITOSA Y MOSTRARÁ UN MENSAJE SUCCESS                
                Swal.fire({
                    type: 'success',
                    title: 'Guardado Correctamente',
                    text: 'El usuario fue editado correctamente',
                    timer: 2000

                });
                //window.location.href = "Distribuidores";
                setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Distribuidores'", 2000);
            },
            error: function (x) {
                //console.log("hola, no se inserto");
                //EN CASO DE TENER UN ERROR MOSTRARÁ UN MENSAJE ERROR
                Swal.fire({
                    type: 'error',
                    title: 'Error al guardar',
                    text: 'Error en el servidor intente más tarde '
                });
            },

        });
    }
});

//Funcion para obtener las acciones o permisos de los hijos en este caso al hacer clic en el boton de editar
function AccionesHijos() {
    var UserHAccion = localStorage.getItem('UserHijos');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Acciones/ObtenerAcciones?claveUsuario=' + UserHAccion,
        dataType: 'JSON',
        success: function (data) {
           // console.log(data);
            //guardamos las acciones en una variable para validar que puede hacer.
            var acciones = (data);
            //           
            for (i = 0; i < acciones.length; i++) {
                var Accion = acciones[i].strPermiso;
               // console.log(Accion);
                //if (Accion == 'CrearUsuarios') {
                //    $("#CrearC input[type=checkbox]").prop("checked", true);                  
                //}
                if (Accion == 'CrearUsuarios') {
                    $("#CrearU input[type=checkbox]").prop("checked", true); 
                }
                else {
                    if (Accion == 'CrearClientes') {
                        $("#CrearC input[type=checkbox]").prop("checked", true);                                  
                   }
                    else {
                        if (Accion == 'DepositosMultinivel') {
                            $("#DepoM input[type=checkbox]").prop("checked", true); 
                        }
                    }
                }
            }
        },
        error: function (x) {
        },
    });  
}

//Funcion para eliminar hijos y crearlas si se requiere
function AccionesEliminarHijos() {
    var UserH = localStorage.getItem('UserHijos');
    //CrearUsuarios Eliminar y alta
    $('#checkbox_cruHijo').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "Acciones/mtdAgregarAccion?claveUsuario=" + UserH + "&strPermiso=" + 'CrearUsuarios',
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

        } else
        {
            $.ajax({
                url: rutaServidor + "Acciones/mtdEliminarHijo?claveUsuario=" + UserH + "&strPermiso=" + 'CrearUsuarios',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Permiso Eliminado');
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

    //CrearClientes eliminar y alta
    $('#checkbox_crcHijo').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "Acciones/mtdAgregarAccion?claveUsuario=" + UserH + "&strPermiso=" + 'CrearClientes',
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

        } else {
            $.ajax({
                url: rutaServidor + "Acciones/mtdEliminarHijo?claveUsuario=" + UserH + "&strPermiso=" + 'CrearClientes',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Permiso Eliminado');
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
    //DepositosMultinivel eliminar y alta
    $('#checkbox_dmHijo').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "Acciones/mtdAgregarAccion?claveUsuario=" + UserH + "&strPermiso=" + 'DepositosMultinivel',
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

        } else {
            $.ajax({
                url: rutaServidor + "Acciones/mtdEliminarHijo?claveUsuario=" + UserH + "&strPermiso=" + 'DepositosMultinivel',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Permiso Eliminado');
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

//Para la edicion de comision
//
//llena la tabla de distribuidores
function llenarComisiones() {
    var IdComision = localStorage.getItem('idEditarUser');

    $.ajax({
        type: "GET",
        url: rutaServidor + 'Comision/mtdComision_Obtener_ID?strIdUsuario=' + IdComision,
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
           // console.log(data);
            localStorage.setItem("ComisionRecarga", data["0"]["decComision"]);
            $("#tbComision tbody").empty();
            for (var i in data) {
                var comision = data[i].intIdComision;
               // console.log("La comision es " + comision);
                $("#tbComision").append(
                    //'<tr value=' + data[i].intIdComision + '>' +
                    //'<td id="">' + data[i].intIdComision + '</td> ' +
                    '<tr value=' + data[i].strSku + '>' +
                    '<td id="">' + data[i].strSku + '</td> ' +
                    '<td data-id="2">' + data[i].strTipo + '</td >' +
                    '<td data-id="3">' + data[i].decComision + '</td> ' +
                    // '<td onClick="MostrarDistribuidor(this)" data-toggle="collapse" href="div1" data-parent="#tbUsuario" id="' + data[i].intIdDistribuidor + '">' + data[i].nombrePerfil + '</td> ' +
                    '<td data-id="4">' + data[i].strUnidad + '</td >' +
                    '<td data-id="5">' +
                    '<button id="' + data[i].intIdComision + '" onClick="mostrarDatosComisionEditar(' + comision + ')" data-toggle="modal" data-target="#EditComision" class="button button-small edit" title ="Editar usuario"><i class="zmdi zmdi-edit"></i></button>' + '&nbsp&nbsp&nbsp' + '</td >' +

                    "</tr> "
                );
            }
            $("#tbComision").selectpicker("refresh");
        },
        error: function (x) {
           // console.log(x);
        },
    });
}

/////
//consultar lo de una comision en un modal para poder ser editado
function mostrarDatosComisionEditar(e) {

    // var valor = variable.id;
    //console.log('Dentro de mostrar comision' + e);//console.log(variable);
    sessionStorage.setItem('var2', e);
   // console.log(sessionStorage.getItem('var2'));
    data1 = sessionStorage.getItem('var2');
   // console.log(data);

    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Comision/mtdComision_Obtener_IDComision?intIdComision=' + data1,
        datatype: 'json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (response) {
            //console.log(response);

            $("#txtIdComision").val(response[0].intIdComision);
            $("#txtSku").val(response[0].strSku);
            $("#txtConcepto").val(response[0].strTipo);
            $("#txtComision").val(response[0].decComision);
            $("#txtUnidad").val(response[0].strUnidad);
            //$("#CPHijo").val(response[0].strCp);

        },
        error: function () {

        }

    });
}

//Modificar los datos del usuario en este casio de los hijos
//
$("#btnEditarComisiones").click(function () {
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTARÁ UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZARÁ LA PETICION AJAX PARA REALIZAR UN PUT A LA BASE DE DATOS CON EL CLIENTE SELECCIONADO
    if ($("#txtComision").val() == "") {
        Swal.fire({
            type: 'info',
            title: 'Campos vacíos',
            text: 'No se puede editar con campos vacíos'
        });
    } else {
       // console.log("Dentro de editar comisiones");
        //PETICION AJAX PARA ACTUALIZAR LOS CAMPOS DEL CLIENTE SELECCIONADO
        $.ajax({
            //TIPO DE PETICION QUE SE REALIZA
            type: 'PUT',
            //URL A DONDE SE CONECTARÁ, EN ESTE CASO LOS PARÁMETROS QUE SE ENVIARÁN AL API NOTA: La variable rutaServidor es invocada desde otro script

            url: rutaServidor + 'Comision/mtdModificarComision?intIdComision=' + sessionStorage.getItem('var2')
                + '&strIdUsuario=' + localStorage.getItem('idEditarUser')
                + '&strSku=' + $.trim($("#txtSku").val())
                + '&decComision=' + $.trim($("#txtComision").val())
                + '&strTipo=' + $.trim($("#txtConcepto").val())
                + '&strUnidad=' + $.trim($("#txtUnidad").val()),
          
            dataType: '',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            success: function (data) {
               // console.log("hola, si se inserto");

                //ACCIONES A REALIZARSE EN CASO DE QUE LA PETICION SEA EXITOSA Y MOSTRARÁ UN MENSAJE SUCCESS
                Swal.fire({
                    type: 'success',
                    title: 'Guardado correctamente',
                    text: 'Comision actualizada correctamente',
                    timer: 2000

                });
                //window.location.href = "Distribuidores";
                setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Distribuidores'", 2000);

            },
            error: function (x) {
               // console.log("hola, no se inserto");
                //EN CASO DE TENER UN ERROR MOSTRARÁ UN MENSAJE ERROR
                Swal.fire({
                    type: 'error',
                    title: 'Error al guardar',
                    text: 'Error en el servidor intente más tarde'
                });
            },

        });
    }
});

//Termina lo de comision

//Empieza lo de las notificaciones

//Funcion para obtener las Notificaciones de los hijos en este caso al hacer clic en el boton de editar
function NotificacionesHijos() {
    var UserHNotificacion = localStorage.getItem('UserHijos');
    $.ajax({
        type: 'GET',
        url: 'https://apirecargas.recargacelulares.com.mx/api/Notificaciones/ObtenerNotificaciones?strUsuario=' + UserHNotificacion,
        dataType: 'JSON',
        success: function (data) {
           // console.log(data);
            //guardamos las acciones en una variable para validar que puede hacer.
            var notificaciones = (data);
            //           
            for (i = 0; i < notificaciones.length; i++) {
                var Notifi = notificaciones[i].strNotificacion;
               // console.log(Notifi);
                //if (Accion == 'CrearUsuarios') {
                //    $("#CrearC input[type=checkbox]").prop("checked", true);                  
                //}
                if (Notifi == 'AlertaSaldoMinimoPorSMS') {
                    $("#AlertaSMS input[type=checkbox]").prop("checked", true);
                }
                else {
                    if (Notifi == 'NotificacionCompraPorSMS') {
                        $("#NotiSMS input[type=checkbox]").prop("checked", true);
                    }
                    else {
                        if (Notifi == 'NotificacionCompraPorCorreo') {
                            $("#NotiCorreo input[type=checkbox]").prop("checked", true);
                        }
                    }
                }
            }
            for (i = 0; i < notificaciones.length; i++) {
                var SaldoMinimo = notificaciones[i].dcmSaldoMinimo;
                //console.log(SaldoMinimo);

                $("#MontoAlertasModal").val(SaldoMinimo);

                //Se manda a guardar el saldo minimo para ser manipulado en la edicion.
                localStorage.setItem("SaldoMinHijo", SaldoMinimo);
            }
        },
        error: function (x) {
        },
    });
}

//Funcion para eliminar las notificaciones de los check box y crearlas al momento
//Esta funciona entra al momento de editar un usuario hijo.
function NotificacionesEliminarHijos() {
    var UserHNotificacion = localStorage.getItem('UserHijos');
    //se crea una variable para poder editar la notificacion sin remover el saldo minimo
    var SaldoMH = localStorage.getItem('SaldoMinHijo');

    //NotificacionCompraPorCorreo Eliminar y alta
    $('#checkbox_NC').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "Notificaciones/mtdAgregarNotificacion?strUsuario=" + UserHNotificacion + "&strNotificacion=" + 'NotificacionCompraPorCorreo' + "&dcmSaldoMinimo=" + SaldoMH,
                dataType: '',
                success: function (response) {
                    //console.log('si');
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Permisos',
                        text: 'Error en el servidor error al agregar los Permisos'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "Notificaciones/mtdEliminarNotifiHijo?strUsuario=" + UserHNotificacion + "&strNotificacion=" + 'NotificacionCompraPorCorreo',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Notificacion Eliminado');
                },
                error: function (x) {
                    //console.log(x);
                    Swal.fire({
                        type: 'error',
                        title: 'Error Baja',
                        text: ''
                    });
                },
            });
        }
    });

    //NotificacionCompraPorSMS Eliminar y alta
    $('#checkbox_NSms').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "Notificaciones/mtdAgregarNotificacion?strUsuario=" + UserHNotificacion + "&strNotificacion=" + 'NotificacionCompraPorSMS' + "&dcmSaldoMinimo=" + SaldoMH,
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

        } else {
            $.ajax({
                url: rutaServidor + "Notificaciones/mtdEliminarNotifiHijo?strUsuario=" + UserHNotificacion + "&strNotificacion=" + 'NotificacionCompraPorSMS',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Notificacion Eliminado');
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

    //AlertaSaldoMinimoPorSMS Eliminar y alta
    $('#checkbox_AlertaSms').change(function () {
        if (this.checked) {
            var returnVal = confirm("Esta seguro?");
            $(this).prop("checked", returnVal);
            $.ajax({
                type: 'POST',
                url: rutaServidor + "Notificaciones/mtdAgregarNotificacion?strUsuario=" + UserHNotificacion + "&strNotificacion=" + 'AlertaSaldoMinimoPorSMS' + "&dcmSaldoMinimo=" + SaldoMH,
                dataType: '',
                success: function (response) {
                    //console.log('si');
                },
                error: function (response) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error Agregar Permisos',
                        text: 'Error en el servidor error al agregar los Permisos'
                    });
                }
            });

        } else {
            $.ajax({
                url: rutaServidor + "Notificaciones/mtdEliminarNotifiHijo?strUsuario=" + UserHNotificacion + "&strNotificacion=" + 'AlertaSaldoMinimoPorSMS',
                type: 'DELETE',
                contentType: "application/json;chartset=utf-8",
                success: function () {
                    alert('Notiicacion Eliminado');
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
//evento onblurpara cambiar el monto
document.getElementById("MontoAlertasModal").onblur = function () { CambiarSaldoMinimo() };

function CambiarSaldoMinimo() {
    var UserHCambiaMonto = localStorage.getItem('UserHijos');
    if ($("#MontoAlertasModal").val() == "") {
        alert("Saldo minimo no puede estar vacio ('EN CASO DE DEJAR VACIO INGRESAR : 0')");
    } else {
        $.ajax({
            type: 'PUT',
            url: rutaServidor + 'Notificaciones/mtdCambiarSaldominimo?strUsuario=' + UserHCambiaMonto
                + '&dcmSaldoMinimo=' + $.trim($("#MontoAlertasModal").val()),
            dataType: '',
            success: function (response) {
                alert("Monto guardado");
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
}

//TErmina notificaciones
//Referente a los vendedores
//editar vendedor
//consultar lo de un vendedor en un modal para poder ser editado
function MostrarDatosVendedorEditar(e) {
    data = e.id;
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'ConsultaHijos/mtdObtenerPorIdHijosInfoV?Id=' + data,
        datatype: 'json',
        success: function (response) {

            d = response[0].dtmHoraInicio;
            var formatteddatestr = moment(d).format('H:mm '); //hh:mm formato de 12 horas
            //console.log(formatteddatestr);

            d2 = response[0].dtmHoraFin;
            var formatteddatestr2 = moment(d2).format('H:mm '); //hh:mm formato de 12 horas


            //console.log(response);
            //$("#TipoPer").val(response[0].bitTipoPersona);
            $("#txtNomVen").val(response[0].strNombre);
            $("#txtAppVen").val(response[0].strApaterno);
            $("#txtApmVen").val(response[0].strAmaterno);
            $("#txtHoraIniEdit").val(formatteddatestr); /*val(response[0].dtmHoraInicio)*/
            $("#txtHoraFinEdit").val(formatteddatestr2);/*val(response[0].dtmHoraFin)*/

            //localStorage.setItem("UserHijos", response[0].userName);
            //  localStorage.setItem("IdComision", response[0].id);
            //console.log(localStorage.getItem('UserHijos'));
            //AccionesHijos();
            //AccionesEliminarHijos();
            localStorage.setItem("UVendedor", response[0].userName);
          
            ObtenerDiasVendedores();
            EliminarDiasVendedor();
        },
        error: function () {

        }

    });
}

$("#btnEditarVendedor").click(function () {
    //SE VALIDA QUE NO EXISTAN CAMPOS VACIOS DE ENCONTRARSE UNO VACIO MOSTAR� UN MENSAJE INFORMATIVO DE LO CONTRARIO REALIZAR� LA PETICION AJAX PARA REALIZAR UN PUT A LA BASE DE DATOS CON EL CLIENTE SELECCIONADO
    if ($("#txtNomVen").val() == "" || $("#txtAppVen").val() == "" || $("#txtApmVen").val() == "" || $("#txtHoraIniEdit").val() == "" || $("#txtHoraFinEdit").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vac�os',
            text: 'No se puede guardar con campos vac�os'
        });
    } else {
        //PETICION AJAX PARA ACTUALIZAR LOS CAMPOS DEL CLIENTE SELECCIONADO
        $.ajax({
            //TIPO DE PETICION QUE SE REALIZA
            type: 'PUT',
            //URL A DONDE SE CONECTAR�, EN ESTE CASO LOS PAR�METROS QUE SE ENVIAR�N AL API NOTA: La variable rutaServidor es invocada desde otro script
            url: rutaServidor + 'ModificarUsuario/mtdEditarVendedor?Id=' + data
                + '&strNombre=' + $.trim($("#txtNomVen").val())
                + '&strApaterno=' + $.trim($("#txtAppVen").val())
                + '&strAmaterno=' + $.trim($("#txtApmVen").val())
                + '&dtmHoraInicio=' + $.trim($("#txtHoraIniEdit").val())
                + '&dtmHoraFin=' + $.trim($("#txtHoraFinEdit").val())
                + '&strEstatus=' + 'Activo',/* $.trim($("#checkbox_estatus").val())*/ //MODIFICAR DESPUES PARA EDITAR EL ESTADO
            //+ '&strIdPadre=' + Padre
            //+ '&intNivel=' + ++Nivel,
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
                //EN CASO DE TENER UN ERROR MOSTRAR� UN MENSAJE ERROR
                Swal.fire({
                    type: 'error',
                    title: 'Agregado Error',
                    text: 'Error en el servidor intente m�s tarde'
                });
            },
        });
    }
});
//
function DeshabilitarClienteDistribuidor(e) {
    data = e.id;
    Swal.fire({
        title: 'Esta seguro de continuar?' + '</br>' + 'Al seleccionar que si, se eliminara el cliente seleccionado!!',
        type: 'warning',
        showConfirmButton: false,
        html:
            '<ul class="nav nav-tabs padding-0">' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
            '<button id="Deshabilitar" class="btn btn-success">' +
            'Continuar' +
            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
            '<a href="https://www.recargacelulares.com.mx/Home/Distribuidores"><button id="Cancel" class="btn btn-danger">' +
            'Cancelar' +
            '</button></a><br/>' +
            '</ul>' + '<h6 id="Mensaje">Eliminando...</h6>'
    });
    $("#Mensaje").hide();
    $("#Deshabilitar").click(function () {
        Swal.fire({
            title: 'Eliminando...',
            showConfirmButton: false,
        });
        $("#Deshabilitar").hide();
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
                    text: 'El cliente fue eliminado correctamente',
                    timer: 2000

                });

                setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Distribuidores'", 2000);
            },
            error: function (x) {
                Swal.fire({
                    type: 'error',
                    title: 'Error al eliminar cliente',
                    text: 'Error en el servidor intente mas tarde'
                });
            },
        });

    });
}

//Funcion que realiza la activacion de un usuario
function HabilitarClienteDistribuidor(e) {
    data = e.id;
    Swal.fire({
        title: 'Esta seguro de continuar?' + '</br>' + 'Al seleccionar que si, se Agregara nuevamente el cliente seleccionado!!',
        type: 'warning',
        showConfirmButton: false,
        html:
            '<ul class="nav nav-tabs padding-0">' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
            '<button id="habilitar" class="btn btn-success">' +
            'Continuar' +
            '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
            '<a href="https://www.recargacelulares.com.mx/Home/Distribuidores"><button id="Cancel" class="btn btn-danger">' +
            'Cancelar' +
            '</button></a><br/>' +
            '</ul>' + '<h6 id="Mensaje">Agregando...</h6>'
    });
    $("#Mensaje").hide();
    $("#habilitar").click(function () {
        Swal.fire({
            title: 'Agregando cliente...',
            showConfirmButton: false,
        });
        $("#habilitar").hide();
        $("#Cancel").hide();
        $("#Mensaje").show();
        Swal.showLoading()
        $.ajax({
            type: 'PUT',
            url: rutaServidor + 'ConsultaHijos/mtdDeshabilitarCliente?Id=' + data + '&strEstatus=A',
            dataType: '',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            success: function (data) {
                Swal.fire({
                    type: 'success',
                    title: 'Correcto',
                    text: 'El cliente fue Agregado correctamente',
                    timer: 2000

                });

                setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Distribuidores'", 2000);
            },
            error: function (x) {
                Swal.fire({
                    type: 'error',
                    title: 'Error al Agregar cliente',
                    text: 'Error en el servidor intente mas tarde'
                });
            },
        });

    });
}


//Botones Con nombre de cancelar
//esto realiza una recarga a la pagina despues de dar clic
$("#btnCancelar").click(function () {
    location.reload();
});
$("#btnCancelarHijos").click(function () {
    location.reload();
});


//Botones para realizar un llenado a una tabla solicitada
$("#Arriba").click(function () {
    $("#tbANUsers").show();
    mtdLlenarTablaHijosDeUsuarioLogin();

});

$("#Elimi").click(function () {
    $("#tbANUsers").hide();
    $("#tbEliminados").show();
    mtdLlenarTablaEliminados();

});