var login_attempts = 4;

function myFunktion() {
	if (localStorage.getItem('bloqueo') == 'true') {
		bloquearUI();
	} else {}
}
window.onload = myFunktion();

VerificaPin()
$("#btnRecargar").click(function() {
	if ($("#n0").val() == "" || $("#n1").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n0").val().trim() != $("#n1").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n0").val().length < 10 || $("#n1").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaTelcel" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>'
				});
				
				if ($('#n31').is(':hidden')) {} else {
					ValidarPin();
				}
				$("#Mensaje").hide();
				
				$("#RecargaTelcel").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaTelcel").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCode");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("RMontoTelcel", strUser);
                    $.ajax({
                        url: rutaServidor + 'Pagatae/Recargas_Telcel',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCode").val(),
							Op_Account: $("#n0").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
                            var jsonRetorno = (checkTransactionResult);
                            msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            //Manda Mensaje o (folio)
                            var MensajeMovimientos = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MsjMovimiento", MensajeMovimientos);
                            var MensajeMovimientosRCode = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                           // console.log("Su mensaje Movimiento es: " + MensajeMovimientos);
                          // console.log("Su mensaje de error es:" + MensajeMovimientosRCode);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTATelcel();
                                GuardarMovimientosTATelcel();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
								});
								
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
                                $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                                    document.getElementById("msj") = "" + msj;
							});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarPaquetes").click(function() {
	if ($("#n50").val() == "" || $("#n51").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n50").val().trim() != $("#n51").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n50").val().length < 10 || $("#n51").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaTelcel" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n40').is(':hidden')) {} else {
					ValidarPin();
				}
				$("#Mensaje").hide();
				
				$("#RecargaTelcel").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaTelcel").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodePaquetes");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("RMontoPaquetes", strUser);
                    $.ajax({
                        url: rutaServidor + 'Pagatae/Recargas_Telcel',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodePaquetes").val(),
							Op_Account: $("#n50").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            //Mensaje o (Folio)
                            var MensajeMovimientoP = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeMovimientoPa", MensajeMovimientoP);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasPATelcel()
                                GuardarMovimientosPaquetesTelcel();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
								});
								
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 5) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarInternet").click(function() {
	if ($("#n52").val() == "" || $("#n53").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n52").val().trim() != $("#n53").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n52").val().length < 10 || $("#n53").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaTelcel" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n41').is(':hidden')) {} else {
					ValidarPin();
				}
				$("#Mensaje").hide();
				
				$("#RecargaTelcel").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaTelcel").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeInternet");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoInterT", strUser);
                    $.ajax({
                        url: rutaServidor + 'Pagatae/Recargas_Telcel',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeInternet").val(),
							Op_Account: $("#n52").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            //Mensaje o (Folio)
                            var MensajeMovimientoI = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeMovimientoIn", MensajeMovimientoI);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasINTelcel();
                                GuardarMovimientosInternetTelcel();

								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
								});
								
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 5) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarMovistar").click(function() {
	if ($("#n2").val() == "" || $("#n3").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n2").val().trim() != $("#n3").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n2").val().length < 10 || $("#n3").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaMovistar" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n32').is(':hidden')) {} else {
					ValidarPinMovistar();
				}
				$("#Mensaje").hide();
				
				$("#RecargaMovistar").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaMovistar").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMovistar");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoTAMovi", strUser);

                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeMovistar").val(),
							Op_Account: $("#n2").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            //Mensaje o (Folio)
                            var MensajeMovimientoTAMovi = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeMovimientoTAMovi", MensajeMovimientoTAMovi);

							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAMovistar();
                                GuardarMovimientosTAMovistar();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarMovistar2").click(function() {
	if ($("#In1").val() == "" || $("#In2").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#In1").val().trim() != $("#In2").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#In1").val().length < 10 || $("#In2").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaMovistar2" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#in32').is(':hidden')) {} else {
					ValidarPinMovistarInt();
				}
				$("#Mensaje").hide();
				
				$("#RecargaMovistar2").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaMovistar2").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMovistar2");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoInMovi", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeMovistar2").val(),
							Op_Account: $("#In1").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            //Mensaje o folio
                            var MensajeMovimientosInterMovi = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeInterMovi", MensajeMovimientosInterMovi);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasINMovistar();
                                GuardarMovimientosInternetMovistar();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarMovistar3").click(function() {
	if ($("#Pq1").val() == "" || $("#Pq2").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#Pq1").val().trim() != $("#Pq2").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#Pq1").val().length < 10 || $("#Pq2").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaMovistar3" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#pq32').is(':hidden')) {} else {
					ValidarPinMovistarPaq();
				}
				$("#Mensaje").hide();
				
				$("#RecargaMovistar3").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaMovistar3").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMovistar3");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoPaMovi", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeMovistar3").val(),
							Op_Account: $("#Pq1").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeMovimientoPaMovi = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            localStorage.setItem("MesnajeMoviPa", MensajeMovimientoPaMovi);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasPaMovistar();
                                GuardarMovimientosPaquetesMovistar();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarUnefon").click(function() {
	if ($("#n4").val() == "" || $("#n5").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n4").val().trim() != $("#n5").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n4").val().length < 10 || $("#n5").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaUnefon" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n33').is(':hidden')) {} else {
					ValidarPinUnefon();
				}
				$("#Mensaje").hide();
				
				$("#RecargaUnefon").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaUnefon").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeUnefon");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoTAUnefon", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeUnefon").val(),
							Op_Account: $("#n4").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeMovientoTAUnefon = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            localStorage.setItem("MensajeMovimientoTAUnefon", MensajeMovientoTAUnefon);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAUnefon();
                                GuardarMovimientosTAUnefon();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarFlash").click(function() {
	if ($("#fm1").val() == "" || $("#fm2").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#fm1").val().trim() != $("#fm2").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#fm1").val().length < 10 || $("#fm2").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaFlash" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#f33').is(':hidden')) {} else {
					ValidarPinFlash();
				}
				$("#Mensaje").hide();
				
				$("#RecargaFlash").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaFlash").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeFlash");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoFLasMobile", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeFlash").val(),
							Op_Account: $("#fm1").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeMovFLasMobile = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeMovFLas", MensajeMovFLasMobile);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAFlash();
                                GuardarMovimientosTAFlashMobile();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarAtt").click(function() {
	if ($("#n6").val() == "" || $("#n7").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n6").val().trim() != $("#n7").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n6").val().length < 10 || $("#n7").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaATT" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n34').is(':hidden')) {} else {
					ValidarPinAtt();
				}
				$("#Mensaje").hide();
				
				$("#RecargaATT").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaATT").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeAtt");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoATT", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeAtt").val(),
							Op_Account: $("#n6").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
							Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var mensajeMovATT = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeATT", mensajeMovATT);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAAtt();
                                GuardarMovimientosATT();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarOui").click(function() {
	if ($("#o1").val() == "" || $("#o2").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#o1").val().trim() != $("#o2").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#o1").val().length < 10 || $("#o2").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaOui" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#o33').is(':hidden')) {} else {
					ValidarPinOui();
				}
				$("#Mensaje").hide();
				
				$("#RecargaOui").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaOui").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeOui");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoOUI", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeOui").val(),
							Op_Account: $("#o1").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);

                            var MovimientoOUI = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeOUi", MovimientoOUI);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAOUI();
                                GuardarMovimientosOUI();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#o1").val(), datetime, "00000000000001", "Oui"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarTuenti").click(function() {
	if ($("#n11").val() == "" || $("#n12").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n11").val().trim() != $("#n12").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n11").val().length < 10 || $("#n12").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaTuenti" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n36').is(':hidden')) {} else {
					ValidarPinTuenti();
				}
				$("#Mensaje").hide();
				
				$("#RecargaTuenti").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaTuenti").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeTuenti");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoTuenti", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeTuenti").val(),
							Op_Account: $("#n11").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
							Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MesnajeTuenti = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeTuenti", MesnajeTuenti);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTATuenti();
                                GuardarMovimientosTuenti();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarVirgin").click(function() {
	if ($("#n8").val() == "" || $("#n9").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n8").val().trim() != $("#n9").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n8").val().length < 10 || $("#n9").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaVirgin" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n35').is(':hidden')) {} else {
					ValidarPinVirgin();
				}
				$("#Mensaje").hide();
				
				$("#RecargaVirgin").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaVirgin").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeVirgin");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoVirgin", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeVirgin").val(),
							Op_Account: $("#n8").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
                            Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeVirgin = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MesnajeVirgin", MensajeVirgin);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAVirgin();
                                GuardarMovimientosVirgin();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarMazTiempo").click(function() {
	if ($("#n13").val() == "" || $("#n14").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n13").val().trim() != $("#n14").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n13").val().length < 10 || $("#n14").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaMazti" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n37').is(':hidden')) {} else {
					ValidarPinMazTiempo();
				}
				$("#Mensaje").hide();
				
				$("#RecargaMazti").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaMazti").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMazTiempo");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoMazTiempo", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeMazTiempo").val(),
							Op_Account: $("#n13").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
							Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeMazTi = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MensajeMazTi", MensajeMazTi);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAMazTiempo();
                                GuardarMovimientosMazTiempo();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarCierto").click(function() {
	if ($("#c1").val() == "" || $("#c2").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#c1").val().trim() != $("#c2").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#c1").val().length < 10 || $("#c2").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaCierto" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#c37').is(':hidden')) {} else {
					ValidarPinCierto();
				}
				$("#Mensaje").hide();
				
				$("#RecargaCierto").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaCierto").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeCierto");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoCierto", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeCierto").val(),
							Op_Account: $("#c1").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
							Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeCierto = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("msnCierto", MensajeCierto);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTACierto();
                                GuardarMovimientosCierto();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarSimpati").click(function() {
	if ($("#s1").val() == "" || $("#s2").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#s1").val().trim() != $("#s2").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#s1").val().length < 10 || $("#s2").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaSimpati" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#s37').is(':hidden')) {} else {
					ValidarPinSimpati();
				}
				$("#Mensaje").hide();
				
				$("#RecargaSimpati").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaSimpati").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeSimpa");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoSimpati", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeSimpa").val(),
							Op_Account: $("#s1").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
							Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeSimpati = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MnsSimpati", MensajeSimpati)
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTASimpati();
                                GuardarMovimientosSimpati();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});

$("#btnRecargarWeex").click(function() {
	if ($("#n15").val() == "" || $("#n16").val() == "") {
		Swal.fire({
			type: 'error',
			title: 'Campos vacíos',
			text: 'No puede contener campos vacios'
		});
	} else {
		if ($("#n15").val().trim() != $("#n16").val().trim()) {
			Swal.fire({
				type: 'error',
				title: 'Numeros no coinciden',
				text: 'Verifique numero e intente de nuevo'
			});
		} else {
			if ($("#n15").val().length < 10 || $("#n16").val().length < 10) {
				Swal.fire({
					type: 'error',
					title: 'Porfavor ingrese 10 digitos',
					text: 'Verifique e intente de nuevo'
				});
			} else {
				Swal.fire({
					title: 'Procesando recarga desea continuar?' + '</br>' + 'Al seleccionar que si, no hay modo de revertir!!',
					type: 'warning',
					showConfirmButton: false,
                    html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="RecargaWeex" class="btn btn-success">' + 'Si, Recargar' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire"><button id="EnviasSms" class="btn btn-danger">' + 'Cancelar' + '</button></a><br/>' + '</ul>' + '<h6 id="Mensaje">Espere procesando Recarga...</h6>'
				});
				
				if ($('#n38').is(':hidden')) {} else {
					ValidarPinWeex();
				}
				$("#Mensaje").hide();
				
				$("#RecargaWeex").click(function() {
					Swal.fire({
						title: 'Espere procesando Recarga...',
						showConfirmButton: false,
					});
					
					$("#RecargaWeex").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeWeex");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("MontoWeex", strUser);
                    $.ajax({
                        url: rutaServidor + 'Recargaqui/Multi_Recargas',
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							username: "recelectronicas",
							password: "WRVqk1DM",
							Licence: "",
							SkuCode: $("#sltSkuCodeWeex").val(),
							Op_Account: $("#n15").val(),
							Amount: strUser,
						}),
						success: function(checkTransactionResult) {
							var jsonRetorno = (checkTransactionResult);
							msj = (jsonRetorno["body"]["checkTransactionResult"]["rcode_description"]);
							Error = (jsonRetorno["body"]["checkTransactionResult"]["rcode"]);
                            var MensajeWeex = (jsonRetorno["body"]["checkTransactionResult"]["op_authorization"]);
                            localStorage.setItem("MnsWeex", MensajeWeex);
							if (Error == 0) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Recarga realizada con Exito.!',
									type: 'success',
									showConfirmButton: false,
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
                                });
                                GuardarMovimientoComisionRecargasTAWeex();
                                GuardarMovimientosWeex();
								$("#Imprimir").click(function() {
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
									var doc = new jsPDF('p');
									doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable(columns, data, {
										margin: {
											top: 25
										}
									});
									
									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								$("#EnviasSms").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Mensaje enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
								
								$("#Correo").click(function() {
									Swal.fire({
										type: 'success',
										title: 'Correo enviado',
										showConfirmButton: false,
										timer: 2500
									});
									
									setTimeout(" window.location.href = 'TiempoAire'", 2500);
								});
							}
							if (Error == 40) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 99) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 1) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 15) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 91) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 98) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
							if (Error == 18) {
								$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
									document.getElementById("msj").innerHTML = "" + msj;
								});
								
								Swal.fire({
									title: 'Por favor verifique lo siguiente',
									type: 'warning',
									showConfirmButton: false,
                                    html: '<br/><br/>' + '<h6 id="msj"></h6> <br/>' + '<br/><br/>' + '<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' + '<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
								});
							}
						},
						
						error: function() {
							Swal.fire({
								type: 'warning',
								title: 'Revice su conexion'
							});
						}
					});
				});
			}
		}
	}
});


function ValidarPin() {
    var pinRec = document.getElementById("n31").value;
    var nip = localStorage.getItem("Nip");
    if (pinRec == nip) {
		document.getElementById("n31").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
            setTimeout(" window.location.href = 'https://www.recargacelulares.com.mx/Home/TiempoAire'", 2000);
			document.getElementById("n31").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinMovistar() {
    var pinRec = document.getElementById("n32").value;
    if (pinRec == nip) {
		document.getElementById("n32").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n32").disabled = true;
			$("#crono").show();
			
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinMovistarInt() {
	var pinRec = document.getElementById("in32").value;
	if (pinRec == nip) {
		document.getElementById("in32").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("in32").disabled = true;
			$("#crono").show();
			
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinMovistarPaq() {
	var pinRec = document.getElementById("pq32").value;
	if (pinRec == nip) {
		document.getElementById("pq32").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("pq32").disabled = true;
			$("#crono").show();
			
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinUnefon() {
	var pinRec = document.getElementById("n33").value;
	if (pinRec == nip) {
		document.getElementById("n33").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n33").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinFlash() {
    var pinRec = document.getElementById("f33").value;
    if (pinRec == nip) {
		document.getElementById("f33").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("f33").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinOui() {
    var pinRec = document.getElementById("o33").value;
    if (pinRec == nip) {
		document.getElementById("o33").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("o33").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinAtt() {
    var pinRec = document.getElementById("n34").value;
    if (pinRec == nip) {
		document.getElementById("n34").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n34").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinVirgin() {
    var pinRec = document.getElementById("n35").value;
    if (pinRec == nip) {
		document.getElementById("n35").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n35").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinTuenti() {
    var pinRec = document.getElementById("n36").value;
    if (pinRec == nip) {
		document.getElementById("n36").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n36").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinMazTiempo() {
    var pinRec = document.getElementById("n37").value;
    if (pinRec == nip) {
		document.getElementById("n37").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n37").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinCierto() {
    var pinRec = document.getElementById("c37").value;
    if (pinRec == nip) {
		document.getElementById("c37").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("c37").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinSimpati() {
	var pinRec = document.getElementById("s37").value;
	if (pinRec == nip) {
		document.getElementById("s37").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("s37").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function ValidarPinWeex() {
    var pinRec = document.getElementById("n38").value;
    if (pinRec == nip) {
		document.getElementById("n38").value = "";
	} else {
		if (login_attempts == 0) {
			localStorage.setItem('bloqueo', 'true');
			//console.log(localStorage.getItem('bloqueo'));
			Swal.fire({
				type: 'error',
				title: 'Cuenta bloqueada',
				text: 'Su cuenta fue bloqueada se restablecera en 30 minutos de lo contrario por favor contacte al administrador.',
				showConfirmButton: false,
			});
			
			document.getElementById("n38").disabled = true;
			$("#defaultModalTelcel").fadeOut(2000);
			$("#defaultModalTelcel1").fadeOut(2000);
			bloquearUI();
			
			setTimeout(" window.location.href = 'TiempoAire'", 10000);
		} else {
			login_attempts = login_attempts - 1;
			Swal.fire({
				type: 'error',
				title: 'Campos vacíos',
				html: 'Pin incorrecto.' + '&nbsp' + login_attempts + '&nbsp' + 'Intentos antes del bloqueo de su cuenta.'
			});
		}
	}
	return false;
}

function bloquearUI() {
	$.blockUI({
		message: $('#question'),
		css: {
			border: 'none',
			padding: '15px',
			backgroundColor: 'black',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: .7,
			color: '#fff',
			height: 'auto',
			display: 'flex',
			'justify-content': 'center'
		}
	});
	
	$('#yes').click(function() {
		$.blockUI({
			message: $('#question1'),
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: 'black',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .7,
				color: '#fff',
				height: 'auto',
				display: 'flex',
				'justify-content': 'center',
				'align-items': 'center'
			}
		});
	});
	
	$('#btnPorPin').click(function() {
		$.blockUI({
			message: $('#question2'),
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: 'black',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .7,
				color: '#fff',
				height: 'auto',
				display: 'flex',
				'justify-content': 'center',
				'align-items': 'center'
			}
		});
	});
	
	$('#EnviarPinDesbloqueo').click(function() {
        var pinRec = document.getElementById("PorPin").value;
        if (pinRec == nip) {
			Swal.fire({
				title: 'Desbloqueo Exitoso!',
				type: 'success',
				showConfirmButton: false,
			});
			
			$.unblockUI();
			
			localStorage.setItem('bloqueo', 'false');
			setTimeout(" window.location.href = 'http://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
			document.getElementById("PorPin").value = "";
		} else {
			Swal.fire({
				title: 'Pin incorrecto!',
				type: 'error',
				showConfirmButton: false,
			});
			
			setTimeout(" window.location.href = 'http://www.recargacelulares.com.mx/Home/TiempoAire'", 1000);
		}
	});
	
	$('#btnPorContraseña').click(function() {
		$.blockUI({
			message: $('#question3'),
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .7,
				color: '#fff',
				button: 'true'
			}
		});
	});
	
	$('#EnviarCredencialesDesbloqueo').click(function() {
		$.ajax({
			url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/Login',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				Usuario: $("#UsuarioDes").val(),
				strContrasena: $("#ContraseñaDes").val(),
				grant_type: 'password'
			}),
			success: function(data) {
				if (sessionStorage.setItem("accessToken", data.access_token) == data.access_token) {
					Swal.fire({
						title: 'Desbloqueo Exitoso!',
						type: 'success',
						showConfirmButton: false,
					});
					
					$.unblockUI();
					
					localStorage.setItem('bloqueo', 'false');
					setTimeout(" window.location.href = 'http://www.recargacelulares.com.mx/Home/TiempoAire'", 1500);
				}
			},
			
			error: function(jqXHR) {
				Swal.fire({
					title: 'Usuario o Contraseña incorrectos!',
					type: 'error',
					showConfirmButton: false,
				});
				
				setTimeout(" window.location.href = 'http://www.recargacelulares.com.mx/Home/TiempoAire'", 1000);
			}
		});
	});
	
	setTimeout(myFunction, 60000);

	function myFunction() {
		alert('Desbloqueado');
		$.unblockUI();
		
		localStorage.setItem('bloqueo', 'false');
		//console.log(localStorage.getItem('bloqueo'));
	}
}

function bloquearRefresh(e) {
	document.onkeydown = function(e) {
		tecla = (document.all) ? e.keyCode : e.which;
		if (tecla == 116) {
			return true;
		} else {
			return false;
		}
	}
}

function BlockClics() {
	var mostrarMensaje = true;
	var mensaje = "No puede realizar esta accion, PORFAVOR ESPERE...";

	function noClick() {
		if (mostrarMensaje) {
			Swal.fire({
				type: 'warning',
				title: 'Desea desbloquear pantalla',
				showConfirmButton: false,
				html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="#defaultModal" data-toggle="modal" data-target="#defaultModalMovi1">' + '<button id="Desbloquear" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' + 'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '</a>' + '<button id="EnviasSms" class="btn btn-primary">' + '<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' + '<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
			});
		}
	}
	document.onmousedown = noClick;
	document.oncontextmenu = new Function("return false");
}

function VerificaPin() {
	if ($('#Pin').prop('checked')) {
		$("#n31").show();
		
		$("#n32").show();
		
		$("#in32").show();
		
		$("#pq32").show();
		
		$("#n33").show();
		
		$("#f33").show();
		
		$("#o33").show();
		
		$("#n34").show();
		
		$("#n35").show();
		
		$("#n36").show();
		
		$("#n37").show();
		
		$("#c37").show();
		
		$("#s37").show();
		
		$("#n38").show();
		
		$("#n39").show();
		
		$("#n40").show();
		
		$("#n41").show();
	} else {
		$("#n31").hide();
		
		$("#n32").hide();
		
		$("#in32").hide();
		
		$("#pq32").hide();
		
		$("#n33").hide();
		
		$("#f33").hide();
		
		$("#o33").hide();
		
		$("#n34").hide();
		
		$("#n35").hide();
		
		$("#n36").hide();
		
		$("#n37").hide();
		
		$("#c37").hide();
		
		$("#s37").hide();
		
		$("#n38").hide();
		
		$("#n39").hide();
		
		$("#n40").hide();
		
		$("#n41").hide();
	}
}

function limpiar1() {
    $("#n0").val("");
    $("#n1").val("");
}

function limpiar2() {
    $("#n50").val("");
    $("#n51").val("");
}
function limpiar3() {
    $("#n52").val("");
    $("#n53").val("");
}
function limpiar4() {
    $("#n2").val("");
    $("#n3").val("");
}

function limpiar5() {
    $("#In1").val("");
    $("#In2").val("");
}
function limpiar6() {
    $("#Pq1").val("");
    $("#Pq2").val("");
}
function limpiar7() {
    $("#n4").val("");
    $("#n5").val("");
}
function limpiar8() {
    $("#fm1").val("");
    $("#fm2").val("");
}
function limpiar9() {
    $("#n6").val("");
    $("#n7").val("");
}
function limpiar10() {
    $("#o1").val("");
    $("#o2").val("");
}
function limpiar11() {
    $("#n11").val("");
    $("#n12").val("");
}
function limpiar12() {
    $("#n8").val("");
    $("#n9").val("");
}
function limpiar13() {
    $("#n17").val("");
    $("#n10").val("");
}
function limpiar14() {
    $("#n13").val("");
    $("#n14").val("");
}
function limpiar15() {
    $("#c1").val("");
    $("#c2").val("");
}
function limpiar16() {
    $("#s1").val("");
    $("#s2").val("");
}
function limpiar17() {
    $("#n15").val("");
    $("#n16").val("");
}
function limpiar18() {
    $("#Referencia").val("");
}