$(document).ready(function () {
    obteneSaldoActualComision();
    ComisionR();
    obtenerPorDia();
});
function obteneSaldoActualComision() {
    $('#SaldoAComisionR').text('$' + localStorage.getItem('MActual'));
}
function ComisionR() {
    //Porcentaje de comision
    var CPorcentaje = localStorage.getItem('ComisionUsuario');
    $("#ComisionPorcentaje").text(CPorcentaje);
    //Comision en pesos
    var montoActualComi = localStorage.getItem('MActual');
    var mtoFina = (montoActualComi * CPorcentaje) / 100;
    var comisionPesos = parseFloat(mtoFina).toFixed(2);  
    $('#ComisionPesos').text('$' + comisionPesos);
    ///Total comision
    var MA = montoActualComi * 1;
    var CP = comisionPesos * 1;
    var ToCo = MA + CP;
    var TotalComision = parseFloat(ToCo).toFixed(2);
    
    $("#ComisionTotal").text('$' + TotalComision);
    //Equivalencia de comision.
    var EqComision = comisionPesos / TotalComision;
    var cadenaResultado = parseFloat(EqComision + 'E2');
    var EquivalenciaComision = parseFloat(cadenaResultado).toFixed(2);
   
    localStorage.setItem('EqVComisionR', EquivalenciaComision);
    $("#EqComision").text(EquivalenciaComision);

}
//Funcion para llenar la tabla de movimientos por comision
function mtdObtenerTodosMovimientosComision(e) {
    var strIdUsuMovComision = localStorage.getItem("idPadre");
    var fila = 1;
    fila++;
    $.ajax({
        type: "GET",
        url: rutaServidor + 'MovimientosRComision/ObtenerMovimientosRComision?strIdUsuario=' + strIdUsuMovComision,
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            $(".MovComisiones").remove();
            for (var i in data) {
                ////MOdificacion para el formato de monto en pesos.
                var MontoInicial = parseFloat(data[i].dcmMontoInicialR).toFixed(2);
                var MontoRecarga = parseFloat(data[i].dcmMontoRecarga).toFixed(2);
                var MontoFinal = parseFloat(data[i].dcmMontoFinalR).toFixed(2);
                function addComas(nStr) {
                    nStr += '';
                    x = nStr.split('.');
                    x1 = x[0];
                    x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
                }
                var MontoInicialComisiones = addComas(MontoInicial);
                var MontoRecargaComisiones = addComas(MontoRecarga);
                var MontoFinalComisiones = addComas(MontoFinal); 
                //
                $("#tbMovimientosComisiones").append(
                    
                    '<tr class="MovComisiones" value=' + data[i].intIdMovimientoComision + '>' +
                    '<td data-id="3">' + data[i].intIdMovimientoComision + '</td> ' +
                    '<td class="align-center" data-id="2">' +'$'+ MontoInicialComisiones + '</td >' +
                    '<td class="align-center" data-id="4">' +'$'+ MontoRecargaComisiones + '</td> ' +
                    '<td class="align-center" data-id="5">' + data[i].strEqComision +'%'+ '</td> ' +
                    '<td class="align-center" data-id="6">' +'$'+ data[i].strUtilidadRecarga +'</td> ' +
                    '<td class="align-center" data-id="7">' + '$' + data[i].strCostoRecarga + '</td> ' +
                    '<td class="align-center" "data-id="7">' + '<strong>' + data[i].traspasoAbono + '</strong>' + '</td> ' +
                    '<td class="align-center" data-id="8">' + '$' + data[i].montoServicio + '</td> ' +
                    '<td class="align-center" data-id="8">' + '$' + data[i].comisionServicio + '</td> ' +
                    '<td class="align-center" data-id="8">' +'$'+ MontoFinalComisiones + '</td> ' +
                   
                    '</tr> '
                );
            }
            $("#tbMovimientosComisiones").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}
//TiempoAire Telcel
function GuardarMovimientoComisionRecargasTATelcel() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
   
    var MontoR = localStorage.getItem('RMontoTelcel');

    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
            
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
     
        }
    });
}
//Paquetes Telcel
function GuardarMovimientoComisionRecargasPATelcel() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
   
    var MontoR = localStorage.getItem('RMontoPaquetes');
   
    var UtilidadRComision = (MontoR * EqvComision) / 100;

    var CostoRcarga = MontoR - UtilidadRComision;
    
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
            
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//Intenet Telcel
function GuardarMovimientoComisionRecargasINTelcel() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
    
    var MontoR = localStorage.getItem('MontoInterT');
    
    var UtilidadRComision = (MontoR * EqvComision) / 100;
    
    var CostoRcarga = MontoR - UtilidadRComision;
  
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
        
        }
    });
}

//TiempoAire Movistar
function GuardarMovimientoComisionRecargasTAMovistar() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
    
    var MontoR = localStorage.getItem('MontoTAMovi');
   
    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
            
        }
    });
}
//Intenet Movistar
function GuardarMovimientoComisionRecargasINMovistar() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
  
    var MontoR = localStorage.getItem('MontoInMovi');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
  
    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
           
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
          
        }
    });
}
//Paquetes Movistar
function GuardarMovimientoComisionRecargasPaMovistar() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
   
    var MontoR = localStorage.getItem('MontoPaMovi');
   
    var UtilidadRComision = (MontoR * EqvComision) / 100;
  
    var CostoRcarga = MontoR - UtilidadRComision;
  
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
          
        }
    });
}
//TA Unefon
function GuardarMovimientoComisionRecargasTAUnefon() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
 
    var MontoR = localStorage.getItem('MontoTAUnefon');
   
    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
 
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA Flash mo
function GuardarMovimientoComisionRecargasTAFlash() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
 
    var MontoR = localStorage.getItem('MontoFLasMobile');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
 
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
          
        }
    });
}
//TA AT&T
function GuardarMovimientoComisionRecargasTAAtt() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
 
    var MontoR = localStorage.getItem('MontoATT');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
  
    var CostoRcarga = MontoR - UtilidadRComision;
 
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
            
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
          
        }
    });
}
//TA OUI
function GuardarMovimientoComisionRecargasTAOUI() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
  
    var MontoR = localStorage.getItem('MontoOUI');
 
    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
  
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA OUI
function GuardarMovimientoComisionRecargasTAOUI() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
 
    var MontoR = localStorage.getItem('MontoOUI');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
  
    var CostoRcarga = MontoR - UtilidadRComision;
 
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA Tuenti
function GuardarMovimientoComisionRecargasTATuenti() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
  
    var MontoR = localStorage.getItem('MontoTuenti');
 
    var UtilidadRComision = (MontoR * EqvComision) / 100;
 
    var CostoRcarga = MontoR - UtilidadRComision;
  
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
          
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA Virgin
function GuardarMovimientoComisionRecargasTAVirgin() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
   
    var MontoR = localStorage.getItem('MontoVirgin');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
  
    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
         
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA MazTiempo
function GuardarMovimientoComisionRecargasTAMazTiempo() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
  
    var MontoR = localStorage.getItem('MontoMazTiempo');
   
    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
        
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA Cierto
function GuardarMovimientoComisionRecargasTACierto() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
  
    var MontoR = localStorage.getItem('MontoCierto');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
   
    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
           
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA simpati
function GuardarMovimientoComisionRecargasTASimpati() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
  
    var MontoR = localStorage.getItem('MontoSimpati');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;

    var CostoRcarga = MontoR - UtilidadRComision;
   
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
           
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
           
        }
    });
}
//TA Weex
function GuardarMovimientoComisionRecargasTAWeex() {
    var PorcentajeComision = localStorage.getItem('ComisionRecarga');
    var EqvComision = localStorage.getItem("EqVComisionR");
 
    var MontoR = localStorage.getItem('MontoWeex');
  
    var UtilidadRComision = (MontoR * EqvComision) / 100;
  
    var CostoRcarga = MontoR - UtilidadRComision;
  
    var mtoFinalComision = localStorage.getItem('MActual') - CostoRcarga;
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    $.ajax({
        url: rutaServidor + 'MovimientosRComision/mtdMovimientosReComision',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strIdUsuario: localStorage.getItem('idPadre'),
                strEqComision: EqvComision,
                strComisionVigente: PorcentajeComision + ' %',
                strUtilidadRecarga: UtilidadRComision,
                strCostoRecarga: CostoRcarga,
                dcmMonto: MontoR,
                dcmMontoInicialR: localStorage.getItem('MActual'),
                dcmMontoFinalR: mtoFinalComision,
                TraspasoAbono: "0",
                dtmFecha: fechaYHora

            }),
        success: function (data) {
           
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (jqXHR) {
          
        }
    });
}

//----------------Funcion para guardar el traspaso o abono-------
//Guardar la transferencia de saldo
function GuardarMovimientoTraspasoAbono() {
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;

    var MontoDTraspasoAbono = localStorage.getItem('MontoTraspasoCo');
    var mtoFinalComision = localStorage.getItem('MActual') - MontoDTraspasoAbono;
    $.ajax({
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        url: rutaServidor + 'MovimientosRComision/mtdInsertarTranferenciaComision?strEqComision=' + "0"
            + '&strComisionVigente=' + "0"
            + '&strUtilidadRecarga=' + "0"
            + '&strCostoRecarga=' + "0"
            + '&dcmMontoInicialR=' + localStorage.getItem('MActual')
            + '&dcmMontoFinalR=' + mtoFinalComision
            + '&dcmMontoRecarga=' + 0
            + '&strUsuario=' + localStorage.getItem('idPadre')
            + '&TraspasoAbono=' + ' - $ ' + MontoDTraspasoAbono
            + '&dtmFecha=' + fechaYHora,
        dataType: '',
        success: function (response) {
            obtenerMontoActual();
            RecargaMActual();
        },
        error: function (x) {
            
        },
    });
}

//Guardar la transferencia de Abono

function GuardarAbonoCliente() {
    var hoy = new Date();
    var fecha1 = hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha1 + ' ' + hora;
    var UsuarioAbono = localStorage.getItem('idPadre');
    var UsuarioAAbonar = localStorage.getItem('UNameCliente');
    var SaldoAAbono = localStorage.getItem('MActual') * 1;
    var MontoDTraspasoAbono = localStorage.getItem('MontoDAbonoC') * 1;
    var mtoFinalComision = SaldoAAbono + MontoDTraspasoAbono;
 

    if (UsuarioAbono == UsuarioAAbonar) {
       
        $.ajax({
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            url: rutaServidor + 'MovimientosRComision/mtdInsertarTranferenciaComision?strEqComision=' + "0"
                + '&strComisionVigente=' + "0"
                + '&strUtilidadRecarga=' + "0"
                + '&strCostoRecarga=' + "0"
                + '&dcmMontoInicialR=' + localStorage.getItem('MActual')
                + '&dcmMontoFinalR=' + mtoFinalComision
                + '&dcmMontoRecarga=' + 0
                + '&strUsuario=' + localStorage.getItem('idPadre')
                + '&TraspasoAbono=' + ' $ ' + MontoDTraspasoAbono
                + '&dtmFecha=' + fechaYHora,
            dataType: '',
            success: function (response) {
               
                obtenerMontoActual();
                RecargaMActual();
            },
            error: function (x) {
               
            },
        });
    } else {
      
        $.ajax({
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
            },
            url: rutaServidor + 'MovimientosRComision/mtdInsertarTranferenciaComision?strEqComision=' + "0"
                + '&strComisionVigente=' + "0"
                + '&strUtilidadRecarga=' + "0"
                + '&strCostoRecarga=' + "0"
                + '&dcmMontoInicialR=' + localStorage.getItem('MActual')
                + '&dcmMontoFinalR=' + localStorage.getItem('MActual')
                + '&dcmMontoRecarga=' + 0
                + '&strUsuario=' + localStorage.getItem('idPadre')
                + '&TraspasoAbono=' + ' $ ' + MontoDTraspasoAbono
                + '&dtmFecha=' + fechaYHora,
            dataType: '',
            success: function (response) {
              
                obtenerMontoActual();
                RecargaMActual();
            },
            error: function (x) {
              
            },
        });
    }
}

//llenar tabla por dia
function obtenerPorDia() {
    var FechaActual = new Date();
    var diaActualHoy = FechaActual.getDate();
    var mesHoy = FechaActual.getMonth() + 1;
    var anioHoy = FechaActual.getFullYear();
    $.ajax({
        type: "GET",
        url: rutaServidor + 'MovimientosRComision/ObtenerComisionRecargasPorDia?Dia=' + diaActualHoy + '&Mes=' + mesHoy + '&Año=' + anioHoy,
        datatype: "Json",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken1')
        },
        success: function (data) {
            $(".MovComisiones").remove();
            for (var i in data) {
                ////MOdificacion para el formato de monto en pesos.
                var MontoInicial = parseFloat(data[i].dcmMontoInicialR).toFixed(2);
                var MontoRecarga = parseFloat(data[i].dcmMontoRecarga).toFixed(2);
                var MontoFinal = parseFloat(data[i].dcmMontoFinalR).toFixed(2);
                function addComas(nStr) {
                    nStr += '';
                    x = nStr.split('.');
                    x1 = x[0];
                    x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    return x1 + x2;
                }
                var MontoInicialComisiones = addComas(MontoInicial);
                var MontoRecargaComisiones = addComas(MontoRecarga);
                var MontoFinalComisiones = addComas(MontoFinal);
                $("#tbMovimientosComisiones").append(

                    '<tr class="MovComisiones" value=' + data[i].intIdMovimientoComision + '>' +
                    '<td data-id="3">' + data[i].intIdMovimientoComision + '</td> ' +
                    '<td class="align-center" data-id="2">' + '$' + MontoInicialComisiones + '</td >' +
                    '<td class="align-center" data-id="4">' + '$' + MontoRecargaComisiones + '</td> ' +
                    '<td class="align-center" data-id="5">' + data[i].strEqComision + '%' + '</td> ' +
                    '<td class="align-center" data-id="6">' + '$' + data[i].strUtilidadRecarga + '</td> ' +
                    '<td class="align-center" data-id="7">' + '$' + data[i].strCostoRecarga + '</td> ' +
                    '<td class="align-center" "data-id="7">' + '<strong>' + data[i].traspasoAbono + '</strong>' + '</td> ' +
                    '<td class="align-center" data-id="8">' + '$' + data[i].montoServicio + '</td> ' +
                    '<td class="align-center" data-id="8">' + '$' + data[i].comisionServicio + '</td> ' +
                    '<td class="align-center" data-id="8">' + '$' + MontoFinalComisiones + '</td> ' +

                    '</tr> '
                );
            }
            $("#tbMovimientosComisiones").selectpicker("refresh");
        },
        error: function (x) {
        },
    });
}

//Botones que realizan el llenado de la tabla depende si por dia o todo(Historial)
$("#HoyComisionRecarga").click(function () {
    obtenerPorDia();
});

$("#HistorialComisionRecarga").click(function () {
    mtdObtenerTodosMovimientosComision();
});