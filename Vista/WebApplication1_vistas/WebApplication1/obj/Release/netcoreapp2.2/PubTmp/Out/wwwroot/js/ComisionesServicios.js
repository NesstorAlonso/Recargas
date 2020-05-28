$(document).ready(function () {
    ComisionServicio();
});

function ComisionServicio() {
    //Porcentaje de comision
    var CPorcentajeS = localStorage.getItem('ComisionServicio');
    $("#ComisionSMegacable").text(CPorcentajeS);
    $("#ComisionSCFE").text(CPorcentajeS);
    $("#ComisionSSKY").text(CPorcentajeS);
    $("#ComisionSIZZI").text(CPorcentajeS);
    $("#ComisionSORIFALAME").text(CPorcentajeS);
    $("#ComisionSAVON").text(CPorcentajeS);
    $("#ComisionSINFONAVIT").text(CPorcentajeS);
    $("#ComisionSTELMEX").text(CPorcentajeS);
    $("#ComisionSDISH").text(CPorcentajeS);
    $("#ComisionSATT").text(CPorcentajeS);
    //Ocultar Total hasta que inicie la funcion
    $("#dvToMe").hide();
    $("#dvToCfe").hide();
    $("#dvToSky").hide();
    $("#dvToizzi").hide();
    $("#dvToOriflame").hide();
    $("#dvToAvon").hide();
    $("#dvToinfonavit").hide();
    $("#dvTotelmex").hide();
    $("#dvTodish").hide();
    $("#dvToAtt").hide();
}

//Validacion para tener colocar el total.
$(document).ready(function () {
    $("#MontoMega").keyup(function () {
        var MontoMega = $("#MontoMega").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSMegacable').text(TotalMegacable);
        $("#dvToMe").show();
    });
    $("#montoCfe").keyup(function () {
        var MontoMega = $("#montoCfe").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSCfe').text(TotalMegacable);
        $("#dvToCfe").show();
    });

    $("#montoSky").keyup(function () {
        var MontoMega = $("#montoSky").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSSky').text(TotalMegacable);
        $("#dvToSky").show();
    });

    $("#montoIzzi").keyup(function () {
        var MontoMega = $("#montoIzzi").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSizzi').text(TotalMegacable);
        $("#dvToizzi").show();
    });
    $("#montoOriflame").keyup(function () {
        var MontoMega = $("#montoOriflame").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSOriflame').text(TotalMegacable);
        $("#dvToOriflame").show();
    });
    $("#txtMontoAvon").keyup(function () {
        var MontoMega = $("#txtMontoAvon").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSAvon').text(TotalMegacable);
        $("#dvToAvon").show();
    });

    $("#txtMontoInfonavit").keyup(function () {
        var MontoMega = $("#txtMontoInfonavit").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSInfonavit').text(TotalMegacable);
        $("#dvToinfonavit").show();
    });

    $("#txtMontoTelmex").keyup(function () {
        var MontoMega = $("#txtMontoTelmex").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSTelmex').text(TotalMegacable);
        $("#dvTotelmex").show();
    });

    $("#txtMontoDish").keyup(function () {
        var MontoMega = $("#txtMontoDish").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSDish').text(TotalMegacable);
        $("#dvTodish").show();
    });

    $("#txtMontoATT").keyup(function () {
        var MontoMega = $("#txtMontoATT").val() * 1;
        var ComiSErvico = localStorage.getItem('ComisionServicio') * 1;
        var SumaTotalMEgacable = MontoMega + ComiSErvico;
        var TotalMegacable = parseFloat(SumaTotalMEgacable).toFixed(2);
        $('#TotalSAtt').text(TotalMegacable);
        $("#dvToAtt").show();
    });


});

//Comisiones 
////Megacable
function ComisionMegacable() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#Ref1").val() == "" || $("#Ref2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        dcmMonto: $("#MontoMega").val(),
                        strReferencia: $("#Ref1").val(),
                        strSKU: $("#sltSkuCodeMegacable").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}
////CFE
function ComisionCfe() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#Ref3").val() == "" || $("#Ref4").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        dcmMonto: $("#montoCfe").val(),
                        strReferencia: $("#Ref3").val(),
                        strSKU: $("#sltSkuCodeCfe").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS
                       

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}
////Sky
function ComisionSky() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#Ref5").val() == "" || $("#Ref6").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#Ref5").val(),
                        strSKU: $("#sltSkuCodeSky").val(),
                        dcmMonto: $("#montoSky").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS
                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}

////Izzi
function ComisionIzzi() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#Ref7").val() == "" || $("#Ref8").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#Ref7").val(),
                        strSKU: $("#sltSkuCodeIzzi").val(),
                        dcmMonto: $("#montoIzzi").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}
////Oriflame
function ComisionOriflame() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#Ref9").val() == "" || $("#Ref10").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#Ref9").val(),
                        strSKU: "DEMOQ0S1ORIFLA",
                        dcmMonto: $("#montoOriflame").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}

////Avon
function ComisionAvon() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#txtRefAvon1").val() == "" || $("#txtRefAvon2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefAvon1").val(),
                        strSKU: $("#sltSkuCodeAvon").val(),
                        dcmMonto: $("#txtMontoAvon").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}

////Infonavit
function ComisionInfonavit() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#txtRefInfonavit1").val() == "" || $("#txtRefInfonavit2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strIdUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefInfonavit2").val(),
                        strSKU: $("#sltSkuCodeInfonavit").val(),
                        dcmMonto: $("#txtMontoInfonavit").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}

////Telmex
function ComisionTelmex() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#txtRefTelmex1").val() == "" || $("#txtRefTelmex2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefTelmex1").val(),
                        strSKU: $("#sltSkuCodeTelmex").val(),
                        dcmMonto: $("#txtMontoTelmex").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}

////Dish
function ComisionDish() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#txtRefDish1").val() == "" || $("#txtRefDish2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefDish1").val(),
                        strSKU: $("#sltSkuCodeDish").val(),
                        dcmMonto: $("#txtMontoDish").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}
////Factura ATT
function ComisionFATT() {
    var hoy = new Date();
    var fechaMov = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var horaMov = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHoraMovimientos = fechaMov + ' ' + horaMov;
    var CMega = localStorage.getItem('ComisionServicio') * 1;
    var MontoQuitar = $("#MontoMega").val() * 1;
    var MontoActualCS = localStorage.getItem('MActual') * 1;
    var MontoFfinalCS = (MontoActualCS - MontoQuitar) + CMega;
    if ($("#txtRefATT1").val() == "" || $("#txtRefATT2").val() == "") {
        Swal.fire({
            type: 'error',
            title: 'Campos vacíos',
            text: 'No puede contener campos vacios'
        });
    }
    else {
        if ($('#SpanMonto').text() <= 0.0000) {
            Swal.fire({
                type: 'warning',
                title: 'No cuenta con fondos suficientes',
                showConfirmButton: false
            });
            setTimeout("window.location.href = 'https://www.recargacelulares.com.mx/Home/Servicios'", 1500);
        } else {
            $.ajax({
                url: rutaServidor + 'Movimientos/mtdComsionServicios',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strUsuario: localStorage.getItem('idPadre'),
                        dtmFecha: fechaYHoraMovimientos,
                        strReferencia: $("#txtRefATT1").val(),
                        strSKU: "017PQ0S10SEC0A",
                        dcmMonto: $("#txtMontoATT").val(),
                        strComision: CMega,
                        MontoInicial: MontoActualCS,
                        MontoFinal: MontoFfinalCS

                    }),
                success: function (data) {
                   
                    obtenerMontoActual();
                    RecargaMActual();
                },
                error: function (jqXHR) {
                }
            });
        }
    }
}
