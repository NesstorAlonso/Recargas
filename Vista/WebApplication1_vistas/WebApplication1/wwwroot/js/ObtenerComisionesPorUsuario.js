$(document).ready(function () {
    ComisionPorUsuario1();
    ComisionPorUsuarioServicios();
});
function ComisionPorUsuario1() {
    var ComisionUsuarioId = localStorage.getItem('idPadre');
    $.ajax({
        type: "GET",
        url: rutaServidor + 'Comision/mtdComision_Obtener_ID?strIdUsuario=' + ComisionUsuarioId,
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
         //   console.log(data);

            for (var i in data) {
                if (data[i].strTipo == 'Recarga') {
                   // console.log('Su comision de Recarga es ' + data[i].decComision);
                    localStorage.setItem("ComisionUsuario", data[i].decComision);
                }
            }
        },
        error: function (x) {
            //console.log(x);
        },
    });
}

//--------------Comisiones Servicios------------------
//Funcion que trae la comision solo de servicios
function ComisionPorUsuarioServicios() {
    var ComisionUsuarioServicioId = localStorage.getItem('idPadre');
    $.ajax({
        type: "GET",
        url: rutaServidor + 'Comision/mtdComision_Obtener_ID?strIdUsuario=' + ComisionUsuarioServicioId,
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            for (var i in data) {
                if (data[i].strTipo == 'Servicio') {
                    var ComisionSer = parseFloat(data[i].decComision).toFixed(2);
                    localStorage.setItem("ComisionServicio", ComisionSer);
                }
            }
        },
        error: function (x) {
        },
    });
}