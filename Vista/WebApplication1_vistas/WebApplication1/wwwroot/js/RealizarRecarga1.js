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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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


                    //var monto = $("#sltSkuCode").val();
                   // var monto = $("#sltSkuCodePaquetes").val();
                    //var monto = $.trim($('#sltSkuCodePaquetes').val());
                    var monto = $("#sltSkuCode option:selected").text();
                    //console.log('Monto ' + monto);

                    //var e = document.getElementById("sltSkuCode");
					
                    console.log("E " + e);
					$("#RecargaTelcel").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCode");
                    var strUser = e.options[e.selectedIndex].text;
                    localStorage.setItem("RMontoTelcel", strUser);
                    var telefono = $("#n0").val();

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
                            console.log(' Result ' + MensajeMovimientosRCode);

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
									html: '<ul class="nav nav-tabs padding-0">' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
										'<button id="Imprimir" class="btn btn-success">' + '<i class="zmdi zmdi-print"></i>' +
										'Imprimir Ticket' + '</button><br/>' + '&nbsp&nbsp&nbsp&nbsp&nbsp' +
										'<button id="EnviasSms" class="btn btn-primary">' +
										'<i class="zmdi zmdi-smartphone-android"></i>' + 'SMS' + '</button><br/>' +
										'&nbsp&nbsp&nbsp&nbsp&nbsp' + '<button id="Correo" class="btn btn-success">' +
										'<i class="zmdi zmdi-email"></i>' + 'Correo' + '</button><br/>' + '</ul>'
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


                                ////var imgData = "data:image/png;base64,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";
                                var imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wgARCAMABAADASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAwQBAgUGAAcI/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/aAAwDAQACEAMQAAAB4iK0ZFrXANxtCX8wEPLsSFPGMhQDqTDUbpJQtCMF5cjL2Ws0aKjGMobA1UFgJIvAwEVwJIID0xQHKgsF7ChDNQwDAaQFjAOwIHEqRCLRSc8pIabOJ4Ok3/nco+rdJ8Fma++x8E8j7jb4ZIfaMH5rpJ0uvRGmFagawEPIZIlDNSERo0VwUBkqLAEhXwPDWWDTWqIDs59xseoIGpBUCWEMLNomaOvcKD0umM3glCajlB2c8zLxHguOwAN6IQyvdQDDTqOfUilqFzIlsMZsjbKuZL0zRqa+8yImoaIu64WSjGc1qi7eNEHVZfQrc18oPdV6s1BWHDWHYdrRewdeSo/UBBgAbW3m6IpYlNPKZfwSUFiQoLPqhafWAdXk0QL00EsxdNYelKWfXXqGMVbUZn01FG1oY8Jf25RVjPGIOuZpdjmfO7EtrmKjdRqTs5DKweqB6SYUMUpYLWRKDtRQmwEdBNwtUHJzrA95HzHhowDofXTgVoAnqQBwWkZ6BqIk3GE23M8BC1Ws9cBZmtSK1DOaV8YKMrNSQxVVKVDpWaPheQSnpChaNSZZB30D+HKd4gyRm1aICIoCrTUwSlHqXVZHbYkLnGlD7LSpGpDtl9Ppc74S/cy1wivdck3nU0R6zmaSDtk2X0YoOP3fGiIC69Dh85oSXiCoYD7wm6LHTK81rD58WZANL9rzpN++4LXdX6n5H0NT9HwuSsa4Hd8S2s/NZr9gul4ns86s8fOz6TYDuA8dzouapxXr8F0+R145jbMay7h6Wew16dClzMlXT6RW46nEIs8npqLGTfy60BWYsFL08y3o8HvWuma4rVF1XkxgIB5MdT6ALNdMmjHzX8tX9l+X9r8z2w1s/qOV5uxaPD0x1ekx+9R8r7fi7NdmPjdRS2MFEa3IdfiU+w0OpeuPlCJkI1vr9XmOfmE1LOuwp0EK1+mx9Xo48zN1MTKg5DiuWtr0kaexj7GkfRAZ+x5t/Ly096mel9H+U95yVvNfLOk5tuv9AuaC8L2mNqsEOpgdU5tk57ZccVm53M1A3NefUg9qL9H+cdNzrmwEFumlZlqjqvh9pyq0JWYV2lToM13TE94pvgBQgOXtHo5TgKCte4HJV7DEbvlrfD2MxLS0ee0IqzKx8a2bI8414QzdGQqbXrWR0udtScyGQB6vpa8wB+bA2nUVq3CObDIyI9KFymVESw7hrAKvRnmDeWLQz70tzrOIeF9V5Dmw1IUGE8tdsGR31xtfPPpfzXPXIpt4lZvmB6buO0EToIEqT9NzbzNXmVgp/ZN35RvZXfmOq4B7Jr9Es8sMwtZ3pZ+gtD1ENLjerlYshpc9LjbVnSNPObbyPq3y37NrPB9dwA8GClqbw5EwmNhYrfZhxs7lroHeH8zpm+M84GUcdKveWdUKlYyJibK7GASaUHuHefOxejJ9aA9E1teIK2kubOETI6W3L01wLn6A8epTcydiXjiMGlNYmp0NrnNg1rmbK3RjkaETzXYSr8NNd9dtfQXrebsLPy07tjTzZtoSYbNCUh6CWtNpquigUaFpaUkLUu5yaFWlsKsqVMWqQm1g3m/Vr4qTDG43hZkFdSXmOrvPCyOk5hG79I+S/QMttXmepoq5rg++4a8ns11MViCsqMyrK0fyYvWQ3FDkHm8tUqZNauotZrgj+a2235eMdevxunzOZ5FeoQ0jlAdHzdhHM6NJa7z57qVp6zykpJTtjUuIaXHebpEazbVbKAeoWp0UtZl5IQQVIuhlu1rUDCkzNhkUszXs524c5WKwzAEHSj01TtE+biZvUkiycqvp8J4UMGqe/mN5M/PmXuImIuDdJgjmtsCV9pYWMjJqoMAzoXrqVJzIvTbucGUoIGXNWk/IN4Uj96aj0gMJZ9BDh8W1HS8zfMo7mlVnz20mpvYtZre0rRplGr4XqlE3JQEKnpeX3byjC0s4gf2j4zqzf0ieANGmnwbC15sUtRHiC0o1TYWubHpOkIaLtnhmE3cekKJpO8KsLVicwyk2fQ386HjzWNjKkrVCEQNYQEwbzYYHdHWoFpOxqiE5plbWHUkIsVq0WmbijSa0ocbTxUo4m1ZtRkZM5/Pc2bV3KOnX4tfXLUbxCxRNrK2bnm1WV8N5MGwR6PE+qV5mVJXBINqlHMkLLRFpo0gWt0YjdItXLow+c7nCrPLAQl40X0qxtRTTTeQNQOe3pwo2WsfdLnGJ7tWeBcKXs8O65zoMpTa9jrfmdJ26enN+un8y/t+VfRWhUJdwNKjmi8q5n3QZMvPsX1RN6jLZXoMZ7i8IZQeeevro6vP1EIPNx3w6jv2eedQd2yFuqih2llvfWxrUtNBU5G5naeS4U9S060WMG8SmnWDJ6bn+i5d+ULW2mlyA+l5V80F9fCsPkAelwenDo19DClF00XtaiK3lqKNgaVv71QGS2TsI3la3mbkJed80kVmowiZqSQJXaWHBgsllXbaRaeTl53tosXgzuVDEvvsox2MGKR79H1kV8sYabpYRu/4oo+Rodwl81W+o/Kqi+pkapRtrN1o0wPoeViVLfM9dzE3p9DxX0VHN8VvJXkr661puq9kdJ3XK/VeN8eH6KXnv5pH0hOH8/wDdfnwcwLofNczTpRueWT63OueTFmP+mO9BFo71MD6TzUvlI7RTHg5enSr6GEPYHZnEvWmlV+HOoeJ5u4+Hr5zWT5y3RyZnugyKSklqn6ZhaetEDC0oZx0vOrkEU6Q1Wgh6XBTL2noY6NAHPYFLh2ln6X8xfyO3R5aihFxInRj3PIebytB/Nn0cL+ovjTbAuggwZ+7TnXwxn7ZVnx9n6mMXzc/eLi5FneUaSqXRzr531fzvQ2X1vgRKuOWo+q2IwvNPfcvgOw5+yB+Ojc/XQfMNBrtleJNokVbDw6NY2e+Tkbhxxp2/zvrMlU+JHQZyGZ9O+d1mlp6OvF5e4XjJs2TtZW2IKtymwxmaOXR12dOUk5lMRWfP2vS8+kYUfVZd+mt2efma2P4Ot0/ni0X9ac+H3z0+93+EFx2+5KcKxy9nzPO2tDqw51jX51abmjj/AEeGFT6gPkj5hP0ZDCuJp2I0coLrklPPJdUm1gg1x30ZWfruXHFx1/P74cmUWv1SL3RqYLHrsVp5I9OjMzzVKS5bwNeGfMRlzwl5LZX0XPdJzGGo4vG+NomA9W3nNJv5KnrSGwBsd9ect1oqvm2mgvlYnZX25Irot0lw6BQQH01mcah39CeSI/zfi94rdLidMpP8vO072VSBsIX9Ux2XH/TN+ZL3Y235uNv1KdZ87w31/wCVrZBxW/L3s9LxexePXA1I6vL4vQTnzfd0xRltyoS+NW9WoGUj15rpuIaTfwvS/bmF1oIitGWxZjzzzlzitbJU2YrpOt47re7zQkITo5FaMMFZNttTl9DJWbJnvyoeqzHnxiLIMN/bXPkDexysuZ0spLTHuNn5hRr7O/8ACpl/fm/z23lp9/J+ftDPT7gD5Ps532oud4pX3nOcer1ZrbGQWo+hzX6P5vT81F9RFjXzL30kKXzqO+Ap+fR3InPFC7NMnlKdFZxxwu10djlMDvAQ+DF3IdZ4v3WXpcjHUK0YHuhgOfjblngfSPmft8TruV2+2OExtcj5/r9jfl+j08800jfks4nInpQlDxsxeNMrn+vV4uzkPI6WHfnFLZjPdcN23TnptukT+c9N0nHac218tNykHVdp8j3bjrcNbG5uu68etE1M7U1y7LzAvQ8Hnc7Y5rg9zUztHLy3JTVyteSItNwsw7j8vWutMU4IyebFt5H1HTDjcXTystGfeGnlwG1zrtZziOp7Dheu7OK47o3kEOimmmvrIDMOWAEtsgi+QB1VnHIe6/Ez35RqrfL3dTm7Ne/y8U+pUM9dpfPXNYX9y9abDvZa8uX1O/m/Pa/OOM+2/Nuq+cbrT1NCVrS40uz+dVyr6hp/J03P3Rv4ORH6BZ/PbMX9/r8P1s9Pqy/Gv467I12paydeGtdyTP7jGuSr1IcXzKXXeg48PXrzHK26IFThe1gmeYuz767xRtULU5nK9py3n+kB6pc9uyYVL6fiJi5LF872PsNvnXd9PF5VqOjkxG8B3xfpUO7BqeX1/Ht5Dd68E4exfQ5et6Lh+26s2ua3c2Y4jmO65zF4bUvRsdLqVM/R5G7S23m+6RHZ0x6stkuji5Dm+wVy6MjfT6Dn35MbORsnKo+o0Fwdnk+QW+n5FYcQLpVh5/f841WfPL7XM8/W4sI9SE+03rzgb0tnbHN0qqONaEtysgBhWVoyuYM5Pn8fn7ur1flnZ3G454nRxpqvYPN38rq830vN2fT1udt2cGmvr5e3L80U1Aed7C+qs1FdO1zPUa8oeghn48BwHV8F6uxb84/7V18y1vzod7y21FzPpFiL9knUYSfZjqeSb6DOz1V5bo0prNubYEgt2+Pz9OI+rps1Nf5ePTH7O78Ou4+7n+Fnivup/hbuen2Rf5tpZUYj2r73h81cwRafz7U5nz/Utvc6SNOzvxB9cS42dXLfd+g/Itsejj5dhdQfCLntr50V4uo2piyzosBrd9Dh0ey+Z7HXl2S3AAx05c1WsbydrmC1XZrc65l7Jmcx7Ty1dFfQ6PMiNlFxWDj0hXXVvU80fVTw6chs5JrnejWMn0KwB9PBeADaMCLZ6Z6e+CdMx5il53uAmvO/1vN7LNSiFRai6w0q0NYQVHyj+R27LA4PXR6/D6Jrb9ZTv8iBytz9zWny3sdu8ycNy06h2/sr+V4f1T5bz9grdf1mmXzjoW87q4+i59jB532HFbuDYvl9YoVbYxtPpwEBwoKPqygl/VmooUY4ELwaOI1mcvTzfW81otnC8K4I+hEUbD3gaRlTqk2wxI2h3GAZqRqC0gI+k+wnkExN/Oz0whdbi5vPdQd0erhdhzmXRxUOJy5MPtdubjXNDMKeOlpc/WXO6blubb3phPT18Lqe7jz53EdsOCzorhuXquR3k8CJi5udUs6sbeH1L0NfcZ7vBw50aVmnJ4qQhZcjbHD2OTzdeNI79fCAksJiYcba55TdQZmGK1NAhgSZvBI5C8ErWrX0oD7WsLNo4sSQ9bh6c3aw6+b4j6xj+Z7HEm0XN8N5ggfT8SijFyl6PnVZbEUz20vnf0DN8/1V8d/mJb+vD+mO4pW+ufIM20Lw8vs16ebMwOq+Xc/a+fnox2+iHU2e3zsgu0nNKA8dpeHIrNeGdab4lHufn3n+p7d5Xrd+ewXS78yp6LKvUNRivjFqRUOsK45eaBZxJNtgtUhMgZY3mlfz3yWKvK6p6HO5dmHn6CeOxtDK6bbDn46/K0y3m6Lvl9wvdcVx9sTU06m6PnOsDtuR3eL0nhgdbzl5Ka2X0c3i7/UH6/O+S26LOx6g77TM9e+vkdr2+Rgi1U9eP3tfL3KfNfolDT55s9bnm1eq5AnYtdVd2uODoJ7YdAtmXioM6943UBtUaCrbOKDBTNAppIKi1DoPIhtVgpD5t9P+Dc3bopAtz9nbopdLK5TpEtPow6t3ldvfjsvammE0cUKNOZfLpeyXB5780LctDzozedz2+ln+V/QenjYExXbjCxNqM7kN/C8z3M0GuAOj6fC2fQ8fTDFtMs/zq0utWDYdNmUs3l9E/wA66zks9DbC5LjXmGvQ8j0EliViVc18UKa0OLjIoxZNchpCGOWZ5O/sg42908QuxSw/P9nJyEE47SSGakkUlqWFZB8Svlfe6nF9H2+HCT+5phwhO75edW28thyxgb3AEamWhd2sI63N1b7WEft8/qtXi+xl3Qu1Omr7IPWEhvfbmytaeV9rPWG/d6ZFp9rjmpdNyhu7rZQNM+0zMLQnKHWNXmyQDsB8brRne1JrlBdTlCE3njZtSoaae9mhDdnG8PR+Gfb/AJHz9uaeDcfpH+t/JPplzsU8t2eaqwE94hERNxaD+c0reFVKmGNLm+x5zm7eXztxfk70PrfM7nb5RgeFpymIzV3wWF9C+d8Xr2AKJroej4xnbn+geRY7fKJabCEOo5qipWObqyAvkV5xzNXmFk1t+ZYrA6kEN1AZhiTFDwRq101xrVZ8n87eTL5nudhp8h9AuePyOnfmsBH6hn65/LxfXPluXUrNZnX01lk2p0VZY3Zo6e/m3SaprzqiN5VTRz/NW4vsaxrxlugy9c0wvQqFqqv3l0t8Nt5aK02QJtd1xXUxeG4/T+0o/Jm+X0egUeJ6PHljpn9vI8itGs9fjpjWGxfMY8r1eppx2qufb9Fu7x3l1rjs1eE9X2c2qKuOgyjs5N5dNvJbz+Q6586vljvVqef30y9kwu+nHyaw3aDF2+boBy/OdEQIFQxbDqpprJ143smeL0vlq5A4df1Fz552PXwboHUZvP8An/0fAH85D9DHl08Cz9K4wUeaS0z6LaxOg6/LXkid5NwpZNqtKqlAaFGIluQVLwNy6ARHNfXqBV3Vwi7JQzisrAasXHw42q+L9QXpua29selUPTr867APJ04Hr8/Dr433Rez6sDrM/RJsvNrzcXmm3Gcy7l4hfFW5qq9QlETgHOKtupzspDJFSL7TLiszesWGU4c6y6hSdBCum1wiXZ/POH1tp3E0sen6X8363kPLzyRRX3ohgV/Qxe0+e0+clbaVwpjdLq9Hn4rr06cxTzZWrcZhhLBU1HM886BTbHO/KaOqTPUOJXN5ew/Q8P03Rw6t6B6eF3ys1LHs6qGqrssppDlN5GgM9ncg+RGmRFl89mRP6Gept/NmgazKrFleJW5+rpMRW7W8dXc6OUHR4rfRwbvsoeuGwPMsB6+bBfzao7q6sCxI1DDyCsriZlGGnLLMB6jsCRl5ILMIjT5Yqz3kfSt7eex0cewJYGuF6JvOcxfq1I2SezrGmtmpUE4dGKxeeoPTPULg2rPoEcoQtmcwgmk1qIdhXw2FGCKs3zQZKlrcgxJs8/UvVyS6dmzcf1GJPUl7Z0/TyVzBT8n6+Uu4l6edjBJ7HJXUR2PR5daHcDTDolVuR4Ne/wBX5d13k79IHTytOM4QMqvSwedEStJgIjSy1py3YfMs98iU2OPvAz4DPput83+r93k5DDYdeZKWBAOhxiEexk4z2wTYaEvG+WTU8mvXXs4x500bg+bo9B5nsfDVekx52zyut3GpsVnv8tny99eVheDuYksBX1TuV6Pps8XzQgjbVbGOrKEiujAYCLIhtWotWmXdpuKmT42zt+f2WbaQc5CYd9MmVRBBsIRy7OoSzS8kCpP4LCRKXIwRWGrxSoSqFyMkYhGzCMohFXIT3OUgPSWQrOlcSxa2SrTS80ADOD0z0/KOI+1CvR863pGhnZ4+XWmdohy26VLJN6nCel2No8PXzPJ255F+fk/pFdZEqffafzX6/wB3kIaN7bc4yAAmYKhAWNorDzfnv0v57h14hvV4vTLSxQZ+ich3noeMuUwNuWRg80zahRA8Tw6DLZMFSytBTNQCSkiLrCjk9AfAx9N5PRzfln2r4o5H2HF67O9SyPoPVxcobrOV6OIi4B6c2nbNs0wIYAculcGVqlAcv2a9ZS4UzdWwZpS1QnejA/LtFFK7BB8VPPz4/wBJr7/K6866Zg9D2cWfTqMPOk9rFXw0dztXO6uW1A+6eS5hWJctZppG7Krlka0Cmg4ET1jjWrpgDPq8y1mNvCBdzNCLpr8ncOkrztha2AfwN0dT1uNLDnDpjG6JPoxwL7ZdObFI6vvF9WNXELwvdcpw9nMmon5vuaN1Fx3+ofO/qPV51YVc7PKytNiwLS54pGTBQLkeqXjX58Aynme+5YN2ur3gt+p8+NmW6zzqPriSKWgTNBNOADcZTBuM6pWpvOdJyHnes/yIdSeiOl5UnXz9hw7AprKfPM1jdxzAMde+6X539A6I56+4p1+GhldEKs0R2XAZ5oIke81QTIgpUoAmtLiORI4VHrZapuFjuZtQaPnjnveJ9Y0szEuO343pdszcUuiRaviXOj1nz7bvLusjQa7PNw3n0gj0Ecp+cITn+0CNK6a9g0Ec4gaNce7TCLroYpNhEkPoISnOuAYNjAqLZx6+AgDQOs1mdPQS1QEjKVZspm905QwoWTuuOIxw+n8/W08rzvYboqyWf6bx/Z9nkwVWevzijxnM9nRFy9ofQx8XXo6QfOQarpjnxPUYbRoT9P0fmGv7Xkdnfm9vPmOAxZhKHBAFlCwiwQQ7vLROk1kDnN5ztcvm7sx9HS6eXOjSFl15o9BakuSLDNDzjjjdljI5On7Tz/z7qY3Pp4Lnd5CbI2defHM4gApIEHy5rgmaz4Wevs+DI9o0AXRZLyvLX6jJm16KTWafIbmh899hy8Lta532Ejm2fja2Tpx19EXEuJ6bntayTv8AJEzQoVcnN8/1nGFtTq4lhsX35s33SIoyCeXvFi6YBNpEkkczUTAx+C5QS06fMOGxmJ1HNYsgJqtt2sYpWb7aXqcCu/m3CJ3auY1Wdnz/AE/l3N7eHw+vJxMD7zWKXfg+ec3CC20q5do03pw/dOWkPPvuqOqUmrDa2MNcCse1z2dPno6M9d3nlNY+ru/LfqU+Zfw8PJbIVXqkA9UlRmsFomKpxjijWEtkcjdZXR5WlMtVg6ajgDeU1caJ8xm+VwtdSsVAvVV52guSacZxm7yaVtDTHqeCqbxQyp2iCwXHs8GqQwNcL4gE5nDRr5LmzGvz8f1r4J4X1Ovl9hE3jdQlGvS9zPSc91eTxcEpm/aeYel3umwXXmxCa8zWXfQ2N+bkNaC8foGXOj2ed5d1DblH4k1nWwaCm4pamJkVqHOCZtDRV8wDoMsSAWjNCs8uIRahG4su820RTw3VRa0ao90hmeR7vT8jkvcvb83T7LlOnnEyJlruc6c3PTnXkdLSM6SDcpoa+VWdPXP05r6enGW4gDeyr2ciLqxL0mbtdGCGZ2yJnhamGpzb9LjhDz6G0cvSa6TqPlncdvmbcq36eC4mkFqALQ3pFhBVwHSKPkx9PnOM1lk7makgyXKyYhUjgwCWviSDqIPNKSDx1VR6wVWCaGtUZy5ow0Fg+Atk7AxMAF5/KlP7H8272/g/VfG9LNy7b+liez22+eyFOjl2KZz6IUfTDcVyXlYdkYKndNwN0+52vnRp37pXgFduX6VTE6T0PCTpqKuF7ehwatLgQhFWGujoCoo6mOu1mnG1TIVDYCm+UmUy6cSezSeou5Gk5F+J8v3DVBE30/QcK9GqSzyWudb1KTfRX0h8WHREiqnSZKqgnh0tQs622GDg/S+KjTNkauuY7+1urGOlS6K+YTbiRyfJZYH5nuRNizXl2oYt23EfQOnh6QED7vJNWwxi9Rh6D8QqS/jLsCMksl8XiKjZKTmh0hEoPKWHpkRuS2C1QHW1QtI3U1SsVBYWjKMwlkmtFhRpq4CWBKj1RiSeVT7vQ51j5n7QfKdzi6Ti8F9N0rn4LUg9+W/qeYe6/gKdGwuw5/T5yNCQGtwc6Mh645ad+pfJfoXTwbFWtno4+ZZhKsnKo0J9X1iaRNWXYVINj1KAB3xx6NUqK+kxESK2bpFVRmsxxeqLJ3G9McPn/pAIriCdBXLfmA9hzqpc+ecnpqqaO2PIZ/d8FluO/i571gUuenYyx9HL0mDis4bnpZWgGujXpwb3Mfc24TMpjkW5TueV4fUynJdjXHZIcSfc8p3fVwSYgPQ8WK3EmY6BC4k3gAu0mKXUGGGAArmGg+aOD0C8dcoFqWgRby4mLLmRYcWKVsx5JeGVBDcoULMBAqsyowyZCFrQ8sQLdFyHX/MfcI8Z03zi52ZwkNudSjINMqRNXM+jzXvRIaSpAxoCDiuae95z6YkHe+4rverzRszO/FURoqVn4EL1SyIshM2eBtj8ChAUI7AJPVgY5vQPKMinUOhlscfqL52+reGE3W6H2sKuPVfFonFe8DzT/T89qb8znHdLzy1zBnry9QSeCU2pNGm9armevO01E6hPpuUZ1x+i6mKt18U6Ov0SXEcV9q5Tl6/mHr3y6q2mrjqzcjPRw9Uz81pU/UNT5d1u3N0gQE6OIsC8xkVYDw4q0T1fCYuhZp6oWnIFNQQ1DhWRr0y5A5ESBoSkoG8PM0BEHI01dXIoG5KbQVmasqAvgz40wIU6/nul+a+4xPl301G8uOz/ANJ/Ob5/nQtJI2x66a2mKfrxedZIwBlN/djXgKNrXmD3vOYmYab6nk9W43tThH9uPtY4no9eXRjzGvMs06QpNm/mekYwN5MQEGUoCfpCd61TGQOMQTRq+V3YEnz9e5jqu4daIOmXjblsTpwXnzy/REuKOeYqakXy1XPqN5mG9yAemwkXZTfnMbmyNZLDQkd7Ic9Z9E+bd7vlv46JI20M/NQl8ouYeNWy3cvTLTNmGaDTz4JdNmItfW1sTovU+fX8EV5OSEgXnxQpJJBellgn0nYC7FhKkahpWG5AMGgKejwLRpWRlh3KBhj0VgEW5wGewBnsguGv7PbTex8RP5z7fpO55PpcjY18N6uf4xidPyHRHhsP0YdOr1bjgCfSPNcV1bYo0zuC+h8Y5zpOPXEpJKrFuI9ROnMMbgOjlX3favT5q7kTpzW9CwEzZkhdhlYLo+kRGVaN6tM0oHyz0TBtogVNVXfnW+mlpc3ZzR+j43Hp0AY2hrEpiC1Lufr565PthTHoz3lNya5pP7E3jt+fzfY/nFTyrKjm2DOkiGNGiKDZq4+hkEu6md2W+PPbXT6Ohz5XuMV52fpgzMjP3cqAeldqLhkVVbXKdNhuNvv/AJz9E9LybraF9/PwqdEuPCYWHWeqZEzGvAI5GNmAFa1QYqO7n1ouEWDZO9JVBiykg5UEghcZSWS1I363oT9XwxrFreXz2+sL5z7UvTclKfYt8Jop9zflTOdanLITfYZGVO2DGahndfHql5SWtfJczBCA7dUMmzkZaRrZRNcOlFz+908/SkTnXlMzW189gGhyPPaOpUK3VlWUJKZqooJxOlBFeXYVjmgWTQZ40aezGObsd5np8nLoSt1edtHIGeyiAhyY4vSYjMGGvfGuPsWOU73m6OQxfuHwi81pivVy7Qs7Tz0Lathyg1QWr2PC/RtucS2zXSMTKpYrMqQE3fF0FctQXJSKdztZdV7xjCT3MPU6ubum+e0+/wAVoqFKyCloUrPLaYWA91ZA8qVBkYhg1bPIGhfMYaKVY4NVgohUZkFVDqtRaLpNF9YqsxIeiZAdGPC+Zysb5/7FrwvJzEeB1vGMNuK+JvYA7hPy1unm9X1QY9QzGoIbLS654ztK1Ddvn3MF15msQM6e2Oc1dcdQa19eEl6MtSGPAxDSqtU+qiw1k2Grwwkm0vnAmtCEWuTvdIxGXSBHRrlrkstbRHMYH0n5qXyUivdEEdhCFdQAR1vL/auPp+d430PlMduGF0GB6HDQlCaRo3tGG3p8ZqPpnzvtefbu832bw9HLV6jk/Y4MwO3l7cylWbVKFLL83boCVMW0ZciizG4l6fjC0MfTZqSE/T5tRGs5WsYTdTBqh0iTDUEGRrwy1ECGKJhtMDLWtwuQFRBHQgqOryDMwMZ7A8BKr+Bq+fRGNzf3AHy/2nxKfpmHvlx0byVznWc1msjV7f6JJ+aAfbfiOuVZr7WLRezUmr09LmtLfZy25RfraVHMNbl+jmzWZTEnZywldT2rpy10gk0xv4dxU0VRqtFRJ5Wt616y9EQ1ZNldXnPPhx3qaWM95Ew5ydmev0V5ePo25PzvR1PlH035zqsE9me3jSdMIYZeuMn2P5P2Hm69dnZLfDr8fyu94H3eSpBva5tNeBzbts5rudq3XY6Mnyoo5abUYntsuzUe0Onk50L2jfHhc/3vA8/be4j59x60lTuWwek7fITl5O1fZAz18NrLReTcLmCtbjCIvQLFTozT9nMCZuqUGAk8JSjlgQo9A0V9hcAWrRI4XCBnTo1YAyMBoeowHUgvHx33diBlqLW8lJKM1MO586z0Pw/7Ql1cf5s86n05WmCgx0XNdRaeuDzY6EnXEa2gg4zmRbIqsqevPScyW6xZPWrzrWFnDTCUC0KZTAnrq1G8NewRu5ZY3CuVdpgqpOXu0ej5TUw32zL8pzdXUc7p5vF2b3xT6n8eXPmaK5PTwvQdm2KRZHUBoxxVRvNC89Hh+lU1jKZ0C50iydObbIgyWFkCNLa55sO2S+sHpuzy93Ocyn4r6+ZoD53A0MvP32GF2MfTJI7j9QQN/P7x7G3L+eJ5720Ir7inTWXLgNdom1Agy5Gix6wLraYgBKrAMHTKDYvWECRGZN6+C47VQiycYT6ah5Vq4Zc6qAdgSh/jfu49T1IhhepUIWAi14cn2Od2enn+f/JP07+ftubFmLdOZNTM1Lz0gePcKaEZlSeyrZMCZh5ibtI/XrVyaxvXzxdc7mksgEKDtMQ0LCCwWTDXAO4JaZhp1LeVqLYyFsOjo+Jd53n7N9n561x+l9d+dB6XBcInqC6uBQtaaUQimlM/Q9MOtF/O0HcvXJNOwFWoXNb423IXMpFVy1JTVBO2eZDafVJ5lDp5OlrTpY87g1ep4VdLmM6m+wjKb2PqUOKs6LWAXo8vY2ec7N+bnOqZiz7BjjyVjstJO9UeKK3TvFDVYOfVBgqtwGF1UKDIYFm4uCtvKBqXzGAdlcoW9ECIOlAt4YAdJksh1dor8d93ZpRlq1KMteKI1T4M3CrYYqd7kunN1cn5jnteV7OWdpG+2Wqgu3WSc6g2lq1YETSm9SoGCCzLMMJrNvt1lnzpRUIXe85A6Oysy665JPBaagJpBP2iIaFNaqM5F/yr2duBjTgGdxjj72sXexIvOq2tnkNPQG6G/n2DtJw77J7PNTSsvN1U8N1dnEmZ6cuBrzlaJ9M0klWvAOPrYgFYR0/X8x0Hi/QsfOvo69L8+x0XO+r8/BQ+bbUkioVyjrGdvBsZtgXhU6ziahPX6q3eTychHXYnR050+96PmTSaBa4LNEiJRePQyJtZHq+qCIdIYLGmoySnYRvEsNejNBLeYqn21xz8l9z6ZkBSOZGbAK0fwpaJ4a7W3oYmv08y/wAX+68L083zuKX7eIrqYqzparbVtSwG4EyZpcrPVKuehlMWNfSTrCHsyrjXrkwTogGRodzNjRLuKK02h2cyI0guE41RI9A5HegJKaKOPVbJ1ugw6fmlvr/CzXKWgMhTI+Neionl6V0T2T2ULCwOs5RwkzQN4vM5DjWpZfJFvezdFhrENc4xGQuT9r816vxPoe2LhP8AL1K/FPvWVvx/EJ+uc32cXEkd9tzW9DWuObXoKvHAHprkSr2Rd8fd98h2fH+l+tixdzl7efyO7yPV8TmfNA9j56l6S0T3pEL1oZYZKireSBF5gdRMeQueLBePQyWkfBpYxgy+nOEnyH3NqkWBit/BclDuRClpoY7eC7iHrnoaIaXXyfFcT7V8d6+IRXH+rnVdiGryGzRLVkDEWkCWHZ52ibVmO8yTWCeBW7NgoyKRs0BVV71fPO6vkRusZjSGKhC21VR5MS74JvJu2nl2TjaAs9efH2ONGuS21djHhsCTF0iUGSjoIbc4bT6kJwBW3LkuqsUZSTFHbXKJLd542dv5PP0bOhxet5H0HSG4ocv6RpfLmk/qeXxukkyjv6GuPCB+ksXj8ab+rodPDwsdbjen4+Vg9SOlz/Y8rm+P9F9fY+fb3B6fS8/qMaY8hHU4Ht/Nq2sPt828180TwpA1l7gePQ36vvBMxYV6WqFKEoFazCnq7iv8f95I5EDDOVoNWKpQGZiWvekTTFfeatp5s3G7wvbr9fH8pnND6Xn7AsmKjckLLXve8L1qy1e0Wc+iViPEuoS5CdhPGztBhfDgfve8TEzYY1uipGvLeMKsmypNrSzXRL59GXm9riTWAuau3OoNxWN3c8AstgFKYSrVrNbyKUN1TaC4WoUTBwS6PHH4LVWhDh8q1xsrVs5oWtUcpVlDk6mrLWjY/hEmrmVlVoPY5JrpNXjCp/VNj5N3/H3dCPG41X9B5jjvoXTy85n7HvoPkuH6NzI871+6b43V8P6TpgDYm+Wpq4H03x7ULR1+axFpH7wyNXuKRl8OoiVm46e8ED1XYFXwhi7EbYPkPustp8QGVk4SZYoXGXzXokQGg4GhkpYNHUw9jp5uK+afoH5F28PN2anr5Q7ibbRZrNzNLhIKUBSVfPS4J61x0tQzVh9jz2e2dBKaYV9MCtPhhYE2FrZxATqgWwHOglmeV6a7BgSo6FygzaAkg5VWDYc6JsetGpR+C1e47tWRcXDJMek1NqWBMrl2vR6jkKrSgni5OiJXnd1jDfl6krD9MSqval3Nyj2NMWjh9oqpaRpv3PdIl5vt4fd8DQPqVfn2/wBEbp03erg5Zp/nMTs9r5z3Hj+5vc51sb8nzT2/l/Q/JCKG+kMAJA5sMoqzPgmwrAWlvMUo4mFvAkXYmi/x/wB0BVr1lGfRJUlxAarAWot5cZSisiR+PSq4hdx0mQ8z3cXx7qp5fv4XULh1ykmHVxvlzdFzePQ1Nhlct1BZBPDkTtVbjKEw3I/T4mK3qKPT4cLnGPLvp1GjR6qoutn9jnvxCenmaYU9MuYdVbnXT5/o8HPe3V8ZtzfOrnWvI7CZAoNhZlR28ibwYIPPnNk2atZsO+DJpoqTatNBbO0FNXPkFJ6iHespPvotWMlCa4s+k1pmXM2bJ47D3qxlwB9ccdLoZx7MPTawuL2tNznu2y00FtHE4e/a5XrsTs8nIoant/MhvbwCJWQt63gpM2ClveC1fXGj0Gx03F6XIwNr536ZctatXGUg6egomECyFfWMyom1xemfB6rC9S9s4ej0c5Plf1vnerk+ezT3peZa42hiM9UFfdPnS8i94vOZ9Lmfe8KbVsHvXOhXz6oBi0OY96oer6o5j1hjLfZnS2J1HFxqVcYXmWAFvNg7PYZ9PCA6TLDLZFLSQnPAqQk0qjKMVK2hOLUlNiA3c2i0tLibzVRIzqqtdKxlaa2mBABsWSzFejwZB6alGtwiGnpJmFmdM2LpnrnNYNqyN4cubzW4rrMSCJpzufsz+j4efJ+n+tG4nEc/TsXJ1/V8AFNMt4Y8ErrzR70ir40oDJNadEO0dZ8/2PRGfy9vOWj3m+hYoGAtMVtD0MhpBJDcLRFk7+pWkTwqCbob1Sq2KUdFOfo9vH82w/qfzHv80LixejBt/N8q6DICIm/h3rK9j1GP14F6b2RVxSrNhNGEy1HWomk1FHvSHvRDLkX8qYQIIB1t5qlpur0+55jT5u8uB2/JTXLl9O/LsodfyOfRh+cX15heLDQJPcFxEAmU2bZpygiKmqUENdPTCnjs2pLdEEtEFiwEpaoZSu5jSe3sPZqWPVpcnuuy4eIE2nFM+sT6Zhk2p4Qg2oSlldUTn7uf12pqJms7c68M+nXSZwg5dPQZdOlmucPqbwlOit7g9T0IZfN0vLB9w9K69yuwyuyMoJXYwZJlBR18x8BRtDLW6FrnhBIi4grO1atv4eh0YaHHdiDq5flBTKen5egnT1TaYKTSxqiPUXgIcTqZSb+pzdvCB3MLfkBWa6Y+j0C9HoZ73vIiYgJHcbKVJADi8DrMwUUynp01c8VFdvVgloFqDpHoavfy6ZI8dMTXlxg8WrinrQMdS+KWVfVTyiNjRSLNDCRkDVpmXN87RoqwHou4dhhRz64bI02sV2+fR8El4kkXhF9SoLxF3Jr0lhJHcLTEjilqpx6bBGq52HJ6AczoFfP9jnmV0OXp1x4b+dvV9OVLeFVVLMBByoLp0aTikyuWBmkFmeKMKGbxdqt6eSYiAVLVQMBqsYuz2cvP8H9b+d9nBkWrbu4isLSK0RJNrjuK+hnXH2BORtj0vZtR683qzFRHo8Ho9Ae96AXP6WTS8IpUkgCSjKiCVHSvhjkdpVEkVE9d/I6bPfiREW1wNYFwZeQ2o0Vu3sTph5H0r5yJWfdBcc9V0gZdLDaHS9QHF7hIiVFa0Q4L4fi2qiq5MDxSc7zwENnGZ5ycc3gaLeaGBhZKWQGatHpZ69LNEmJHEWemlOv0tHz/AFwhPicXo52Ltj4uspOWeyrVcyzZaQtoWuR0FNohhWYUS5mDKNhP1KMDrDABXESgM1EzUgZWK0WAEaWMHyo+tmlrLczn57OT5OPrOV9PyvXrfTK3vUclsEorTXwXtSUTX0NerNWo96A96PBK5mFWc5ImiVrAEiKJ+rUbDwCoFHFB2IvCogSyq84C6a6zQWhX95lziJNWM7uRrzaTK9QjbXAP1OlWjXnQs10xRqegDtazmtSS5Hb1yQ2mpVZmR1eXbeRANKvNNgLgrkr5wWnvNVAwogpljMN4dwtYd2iWv1+W+X2RPed7PkVszh7iLtp8nRVodc7LnMsI5Nno8+5aJzR5elabaCekLwBbRaC3hEGUkptPBYWamtSgSlxUjCpMs3rBuYCf0lzCAG87h7XbyC+b/T+c25eKsg16flGmPNS0rKZIixM+95qsTUURMMrFoCLTrq8sRFHNfFKJfdq5n0s872S+XRw4yg6uD1ZgUR6E/RaBzMQq9HrDr4lQp6ajmaygrCkjKOfB56uhGvac9lLZ7jC1tXlg5nR5d55wzirIcT5npixMzNg96PKoZE+8xLHA5EZc6bBl71kYc+chA6AQTBsmS4jt+03+45e1LS8pwesxlBBx9QrQbl3DWazVILM1StLAZYsoXS0aNEsoDRNghplZEVnqGUTaOsWkQlKiKOwgZoAzVpGMCQtoM8UFrlYgl+e3djAa2z6akE7OP5qh9L+c9/mU96erl9MSKbUkRJpIWpENe97wej3gL0PNWWhV5q4LUcAbwfFblcWs6VEWt4jgogrHrJ19MDiJ8OCikZ6xZVQTNULRerXrVsBXc8irW2cHoMujnAfQ+OTJ03Gus08Myl55q+pn6YBreBVtW4ve9DVfeoqKVawmYGZ50tfzmL1uK1q+cz6fCFQzs2r2mvpcPqxPs7k7pzl7cXV4Ekw29ao4qxQCaveSRQK+rSk2boBU6lpB1WjaWCoVYxfwWqaOecbFqyqsX3hKupsgzWRVNooxjee0IlSzRU9ITFGalKS+T0dLmdrp52+S68XRzfLvNp+t40zHnEzEh70iEXyrbURMBHplkeJKYamCHomWUi4wj3qj9HoC1fSNaSSlERA5reg49Ej973h2kfgtWfB73vI9NfDLo5ZFfdM8T2PP1Ocj9D4FVm0oLq4djK9cWdVpdyOvoCYnwqxbwVtHh2Mucgs+vWfrWkVJmAmxO5y3yOxL7z/X9FM/n3NkBpxdc19OejK57pDXrcoDS1kN5TxWkSEdzpK4xjsOoWv/xAAwEAACAgIBBAEDBAIDAAMBAQABAgADBBESBRATITEUICIGIzJBFTAkM0IWJUA0Q//aAAgBAQABBQLl+XyW/lvY36Pz62TPbT4b+U1yGi0I/JV2oG19qAG471GP4qxI5Dl6M+ZyPMNCZ/e9HWg2gdAQa0fUtgPILvX49vUM37DaKn3eP3QqlbuwM5CchOcXI1FyUi5Vcq6mtKUdaqJXMxJ9VixsrFEGfgtDmYcOfgTNs6ctNirxo/FAx2jnyU3IhZwZkMrVK/CX2HibDz8m7Gs2TZteWlc+1b8WZweXpW/DX4/+LvwflN8pyhB1uFvxo/GhTqcmMDah9Rz+PoRmO/8A0ykz/wBOZz9xvhjNT5LMZ/8A5FpU/FrCS6HU8iR7/LOZES0c39myDc3+TfJ+e5nypG+wrInH83XTe+NbfiPTD8SX4tZ6OJydF2tiHktnKbMYzZ0PRPob9H+YmzqNrX/nt/cPqLqctQ/Pbl6Y/jFh9sDov7Xt7nue57nvt77++/qbmO7mWegDCx7f2pn9f2zT5O/zA9NoRDqMYGIG4LDxX+LWbUPrs5/HybnwGO5/EXeq6R+y5itP5WMNRnUVKd1uQHB2nLUpb8y2+w003uXf9nvsG/dsf9rfon2fn+4ASdQxf4f12+Z/fvsVMb5Bi/DTGXzYtiU/UZ6oYAVPH0AHHLc9cSdr01+GVkr/AM4VhL//ADYfdbzDq+oP/lx+A+X/AO1fcM3B/LufmMfSfH9GewZr1qb96bR5AsSYCyw7LcXmnn5zF0DbkWWD3BszRmvxmxNzYm5yld6JQ1gMVhOYgPr+x8T2J/XsMdaaNFcQuCSwittZs9qyds3KBj2Wz8Q837stLQMeIcqy2HSWFbWfkjiVqzE7177KTKf4PzVd6XbCcz5amEDAzl6Kcoq6gpLMRo1AF21tPxOhuUVtc2TWtJcnkzGbOquT2Zn4OHJYGjx5mQ+RYD7qhRnmLY1duIgI8SA2YxY/SNxI42aM1oytuFmSX2wIySWEtUoyfyxzZXblcXtVv2n9MTuVNxY/9W/SfG/SfkbfwiJ5IRot8VQ+Jp42MFLkCi3n4LNXUfiv8gGgXaMpHbiQaFU17GrBsVUXPVUhtduiW34TI6EcybavGtdZsAxEai1ODqPx4+v2wnoz1CuoYJs6bfAEwncabOtmD39hJMX4m+2+w+Sx1/U8VnArqdM6VfnV9TxLMLI6LjjItzM4hmKmH4WHZEVCQJV85D1tATD2X4PzowfxB9qfUr+ZuDZYgqUtIqtY2O8M16xv52nb1hmYJe4yEKPKv5I3F7F27ZVjUvyi7m2gqZkPqE7P9zkbKCTzqPM21M8P4ta5EVohG7lHDsePilRGnAlR1ZmIzUdP92lGat9iugbatPyTBttr6biLkVjo2FqjCw0nUOoV1udrZ0vqbUV+U877+eHii17sGnD8CJiWM/Rxdd1TExMTBpyDwwtIlPUrFn6g+muUDfami29/8P1GWo1VtHCFZZKFVrM7BxcaU4LXPeoS6k2Cy20ePdQKtinFyceyirusPb+9DddfIeLUso4l14xexUrPe8XHtybfDTS+TfY4LcmooqxrOu3C/qeLRZ9Hkq6uf4820KAKsTpS3dKn0dNf6f6VThGXv00llxHmPjI9+R0+2tal52f46tLD0ipsFemg1tjUgpheRsnol2P0+J/LptC5GbnitMzolONaxwumNMzF6fjsowXbqKU15Eb4X+B+emj3jUpw6zVxtlf8pwyDKPqGn5ADU0hmRj12rxT6OpEeZNXBX9NgBXuVSThLV9bd9KKczh9T6NcB3F9xh3b0YPYNVAxOs5RbpuyIh01/S7PplxuETYY3WINOrfVoaqmMxPIMnKO8quzjU9vJ2y1bCFrK/Sk6Y9N9tHTUt6+PprcWlcUW18auPj3+eWScVarbDbTXSteTZjXnqee0sbk2Pca5hDH8N9b1wfGU+IrP1Cy8H5x2FYoM4E3ZbhnsNj1/1/Wu2+w+TFfigMawWq2tSjRN06Zhtl3W4GW0yMJsejIA41D/AJPUcxK6LDt7GBxck7s/qUsHp6NYa+jj5ex2FbNyc2KaMk1UM73LvLrwej1+TqYQBspeNHVcznmUCuyzp/8AisKn9R5tD9Nlc/Tulyus9P8ABOig10NaZ09ca5MShLsnJ9W/2YPmYTaXo13Pp3XBzwYs3uYFobDuy6KT5FnkE5icxOq08cyypLbM7L3QhpJqZUihph3Cl0zKzmdYrVLO1TBHxMLCtxriecVAaN9sVQz5dp8VljMDKSqm25Hx+SxeEHBJetbWmtDEOpi2stmQd5EOu1VT3vRyS/MZXmjMh6yuT0nLxor7lcxGRLutdWx8oGxvFOPYCXZNoxbTsLqOdtvsBB6lbjQXcPIlVMI9f0o3D8tra/JlONW46jSKSh1PkGYCeW/qqV1W/pLKooTqPVMfDbrmdZlpkNtUP/Iuv2/TMVs3O6liY2K+ZStVXbGb9tb7BWdmNoRay0LIycscTo2UlI6t1TMtwOi22UdQ6b1DKyL3K2HqfSrQmbnJl0fMbtX8dPHHE6hmXZRxvwx7uqAYVGUa5ZaSWQK39/8Aqw8MKdBwaasX9ONyp6om8Bhoie0nRrqzhZFnls6XnoEdApmxOp0rcuEA1fWKyuRrtQ09LE5B878n/qJoDFyTg3OfymzxEOoCQfnvg1J9Pj/FVyKBfXLcljXscTYsDxeMs92VquyU4r/LBpstynpbGyczQrb+Q+MG+5Bw4xYhjqVY7Br/ACPjVRkJQ1eBb42u6lkWpkuWuBPf+10I5GwSEXY78tqf41+w6DUEEqvsVcrINwnqN81sUbO5efp1WSZlNf8AUD8g5hG2IIP6QYUX9WYHG6ivujH/APrpV6p5fgZ6M4EQJGBsIxsZBmld4pIfpmcca6jrWOXfqFNtGdWi5GLVhm3q/q4AsVxMgSrHZKzh22P1Sx6VK7gB5Ch65kKUsEAmcdLWOTpjAV9DYpkNdUVs+Vmvx2Eimb/HBe0YdvUaEVOq1lrcrHYfULRZ1B8e7Ch9QduQ8e/UVQTwGqns26lT2MHYd9+sczDKivyVzyBlYap7YmOTVcCtkB9TBbV2MfCuWvOXKBBMTJNCK2q/OwhdnjfyPqY9W1sR0lVVl1hHgtN6S1Ty8T+KVANB/LgQhxz41Olngtngtnht2QEhYaJ419hEdkOyZZ8gx5jiryZFtKVrePJk4dtGN4a/FkUcY3o9GpW/MobFsXIHNbMI3TrYWnpsuQ11BiJyJh9TbMUrBF/gprZmJZiRiD1Y24VCprxq7chi2tRkZNhsurJFgZ2iuUPm3lfQvlYzdKzVi9OyqnuUqbN9k+eqOCenIj5i3iixXtUMzpG+B8qYdMRU00QKzkeKzHdYVIPETZ4tte9WpwWONEHUJhmoo90ZNSQjDvDAo0+IOx7CU/zuco3nE8wg91aWWTp+UtGPe3I90PEo+2O+NKK1QRAb0/EGKZdqBYK5y1PLZxXL40U1i9spVpNrmwm2y6ogSn5r92smpSdvkfiwPF/I080FnOPNAl9ovb+oO6fl2H8Nzyua2P4Zh1G+cW96J0ZeHTjNT9Sr/wAWr+eS7POPcMQA9ojAyuNKPyGgoXW763ea4qHUVt7ZRuIGELShPJf1Om2inHGcIMymqHq5WzM6jVfVN+8huV2K7V2HJtsev2hXmLvmcotnBBeZW72nzWzzWzbGHsFJPYGIZadN67D5HYQS/wBWcpvYHb1PU47lX4m9+Q7K34MI86VxGN1l63H/AI7CVY+lU8XY8C+yquWl3htm9R2gIlupiUeZ2uxlFoXS2usLlu2Pe9BtcNYDpIpPLX7h0IwG+Y8aVXulX4M5/Ku1eFpDQzX4/wBa72V8IkJUxWUTSQ63af2M0/ld/wBgleP4OnEwGfqm0eGN3HwIuo2pWgZ/pzrgTGSyICI9jNFUEOoHaodvmdPqRszrVpbMVzPJ6b2X+e9XDS8eVeI9VK7mKanrfpGHfXbU1bD+PoRfjGuWpwSTs7QqtlnqwVO4deL9qjMqf0sMxq3tuPS68fG4RE3LPys4mEaA7cTvWoG4wsCp7ofZmNT5rvp+K2nY744HkZ250u/Nm3kWHVdfyLhWDdzfJXjYP5QEjEdCpVipYe/lO/8A5E0YfVcsHoD/AI+HaP8AFZeuyVs4f+MH/XTWbJdj+InBvClSlriKp4lG342jfy96ubbZJ9s258z63JS2l+oWx26msyLrb7I/8+1VFjYZ7D3MivknnBpw2Hif/rv/AIfjwj/Eq+JudFTeTkP5bu7dj8RVr4IPTuXjfKn0xmWPIghfki2FKq3CMFEFftp8xHZTYduOyzL+P7X5FZmFlLgpmZirPqUdsTPtx7W4W5i4qavGoOznUHtflVGyfRgiz5TiWPifTfx7AEmroudZj1dCW7Fuw7sSz2LHfaVqSSnrRlu3oA9amJj2MjiVUAy+l6ba8W8wYGRv6DKn0TVqEwFIqoWzj0Mr0oYbWCvo6HAfHXq3VTjNVZkD6Pl+MwcxccMfwixFY0NW4nN5o796Xc3xa6177DZBObR2JlYTx9IXeZfj0GVDVRIVeJyMm/Haq1qWKsvFhTYUW+1MU/J9lIGjkEYvy3/VD/KWfEX5n9dO/Z6UW4hG5CJVbYrUuG4x/QlSVmrLNXHyUtG9xTHOiT6gEQnm51k268o+P7AHOrxizJ8TXT3F+N+Sif8ArB/bVrm87EswT9vHsNVuY1ZzVMb2vZvgErAYg/cu9yv+dn8YpOk4iY7X8siu0KFnGdIaii+3qEtzfHVR1SydUxq6bdRB+UAhX/jalfjVT81sdgblj1iql66xTatqiMZkpfZLkyeT49onisnBwPymz29T8YeM1GQ7waqa5lPS5p8AbIrRbNTUT+R+ew/j/wCD26OPV38U/wCvqT6q36ViV5NyY7LZj+BbDwxGoJ5jlyEJIheUOqFh+zuf1H7Yyh7fBRMkIr5f7PRiINCGdK4Y/T/LWSXpaddsoe2hDZd9Hai3HlFXg++1gHEGZAAtX1NwwSoxv5Ge+2uysBEcK7+zior3Wi2h+6Vs0tqasjIIH2gcpj4tjm/DYLohrItbOatJZkMLLKeXFfNdVrtygOpQ/Kv+xWLumii0zpdFWFT1fAsxyDMFqtYXRBlJ17pX0NUp1AxE8ja5ev08Lrcj6bInCwRv5N6GtTx+xUDPp69/SUmP06kx+nUabpaat6ayhaqdV0i1+TeTpvTbuoTqWBdgtaZsT1PU4icIazAjasAjAzU6T6q6iSKcc/s9QblkqDwb8UA7iJ2T5t+TKhyuvtrRfK0c8Tj5HjbMuW6yIQDzWVL5LuuvvN0zQN6p/OzVTixFQPZbUuYzPkdHXedlJY0yKn8hOpYGABh9gy0bnGcZxE4iAanzNCaE9T1NCaE1OEUaO0auxAvfppgau7HXGvMHTs0wdKz2h6XnrP8AG5hn+JzovROolbGfalp0TpjdSb/4sTMyk4vUOn4q5eW36frVT6m/Y6d0rjbh9IWntjjQpXna+NlYzHMVcb6rwjLz6srEYokxj5ci/qmE9OVbcbHq3LFKL2Hz+kb6cXOXqmAYmRivONThsWqWYWLqzDxBDi0cji7n0F+2xMsRqbljbnUuX0BmHY1N3VVxVTomcaU6jlfXY2Fj124/+PxzD01Nnpno9NtAOFfGxLwPG+yrT8tktOmD11H+GKv7OYE8+1iUG6xsbBrV6hvgZqH0kr+bP5wOUY7lQ/Ow/l2Hfolfk6jlP5c6xyICeNRKk5uS0+oDTynjaOT0Mam+qsEXqDKDaS1+dbcnmM87SnnZa4nGBDPE8XCyWg6ZnGf4bqEXoXUDB+n8+D9O5sX9NZE/+M2y39OrTjjLwVHQum4HUqf/AI5gCfqDpp6fc/z2RSYN6q6ti+A9XxIetVQ9eEb9QGN+omj/AKhsmeVyMtEmHkviG3q1zyh+VuNXbbbidOuppsBLfpyrGfI6tTXyQ3NOBM4sJV7XFw83IstXExUsue1n3zHvti/9Q9zoj7fNx668nVQObiKog+aK69XYWTWnkyRKsu+uV9ayVlX6juEp/Ukr6/W0XrWKZX1HCeefGaclMNfKPi1MOqYn02eNiflYa1CFX88x0z904ea2Jp1mn3+DEQ+m0eLVIs8VRn0eO5FFdC24/npNfimViM5+lumR5KMWVfy205QmHjBoQqu+AhSeMmKhA8bTiYYBNGaM6KPFQvoHU9QfG5uH7bRxfxtpl/bmG5rfHzP+av8AjEhyenLBm4M/yGGp/wAphxur4wh61TG64Ievx/1BZD+oL5fZ1DK6Wa50+6zFsPUrybck3TJ4PYyMv2ccrxkPODFa8Wxx/i7grYgVKG6ci32uSGMrRmGHTdj5Wfis9+DyqtyOr23UWKHFCkWWKLLrbel41VH/AGprli5fgfPz2zqz7mN4ktydeen1H48abeIoP4YmZ9FLb3tt3FYiWrxsi/xxsh6j4hnF+nVrLcE+QdOZ0bptwP8AjbtfS2BiuXUK787imXmPbjfU1r/lmeZOvqOnZdWPLhj3kvMahGx/0v5cbGrdiroxhpJj4dW2waZ/j6o/T9izpdkfp+QFGFlCZOPeAikJ/O8FQFnWNdul1LZY9VGvpa9nDhwrdti3KGx7QvGamu3ubM2J8T32f9roU0Jqa9amu2prvlJU0Wcj4op4zHtC3fV3T6rIlS9SuXx9Q3R0rqVst6V1Ct/8Jl7XpG0s6ZxhxNSiqimWdXzWFg0QxprTMeLkYIXNuTglpEvWgrBMbD50LhTwNWfp2ePjqT9NAjMzIwbCNYttPB8LOOYzUJuyoeNT7ob07fjZYvhJ3BUNTcV/yvCeXI+W+Vdljuzdlqeml+ywTI/nKztJ0O015TqjMyCeNVA8ctRSpoE54agZ2JUpzclpYjsKP25kWc7CYjlW+mTNnU78fxLk3LE6hekq61fXKv1FaJX+pW1X+oazF61iNF6lgtFysNoPC08W54njK8aisxsDEKs3RkPUs3p70WKOPSFDT/F5aj/H5ALYVgD0anhLRqdn6QabDTX0KT6BZ/jRo9NAjdOEHTvbYTcmw7QeqVMQcVwTUZxnGanGamprvceToBK1wTXZ0+iwHpuaIMe5LLuNrCsSr9uNk86vPkMq2XCJe7UcTzTzboo99ZVDcKLdp06lZ1XDaivsAZYmjrsJ0PHtuwExMkAY9y1/TvPI4gWsplg0Ztju8+FHpeiH/maM9TIXxZEWZB/MHf2A/nf7X1r7M25XXfr+h2yP+yUH9tZ0UbyRUeXisDMGWCzcTIHBvFZMjGxCWSpXKEL47y/UMa14y6hE0Zoz6ZxBicpZSla8fehOA5eODyKwtyFn1OYpHULwU6xYko6/asr/AFDbLP1AVqyOq25N1vLRLGMhinU/TmddfleBxPG8I9muow49EbExiWw6ocAFh09wpwsgR8bJVit+tHVHJrforKw9e5xMancOErA4tU/x9JjYNZAwTFwGh6e5hwbRP8ddq6sMRTXK0rUqu4L7qguT5TXjrZXbRVpVrWFa5xDWBwILm3ZZ6R6ppplrYGy2tRcPMsqsvva2wVfl/FsOoX5S/p6jljfpzEW2z9PdKedb/TtmGn6bdsfpfVOq1YuG3Vb3yMfqj15WPnLm15mXXju+Tic7dFiRFrZ26NXyzTWZrU6oo5L/ABBlv81XjTynIwvD8pa9Rtsax+yIzRUCzCwMnLPVsavFeCN8WN+5sSggoJ0XkMxqsxmNmUksyLmhqd54LI/7bM7Fxfa0a24ivkVtWNjttseyLRZvJLY9NPNylViFKFFRxV4piAxcQ1s2IpL0VpMqytGOVdfKeTjwF7Om/p/Iy4f01hVzrXScml22Cje1b8T2xrTVe/Xb8exP1PfK/wBSMYOv0NE6rgPFzOnGLZiNPEjT6ayGm6OjiF7BCSZZYmLXj5lGdLemY9kXDVYcJocK3VtOSSam0U8Ub8pxhOgnuBffWvo36eyMJVU7ynCcY5ox0oTqDeReoERbK7E2Z7g7agEK8Wa54Etyj1Lp1/03jZRRQWx1h+MT/so6lYpxsvyqp8Za068/09n6kua7Kmp0axkzc6z6mxhtUMC+6rDXkdJH/N4tCkzk9pcA9ZUhmDurVfSFPfETxzExhkQn8O1KCO8wi75gsvE6vkNkZq9rf+vtjnSjytOls9NqZXKNa+v+RaRRYsYZKFbWKcdwBkPJiaaiZfS8VH34XBGPWZ1yva468QCxBqVQqKIUqh3HyPG/1K828WQ48prw01lYFWKzi5Ult7WP5bHTLxUGRZWPIy6h7KTOJLPiX1wA8l8k81wWvKyIvULRE6oyzG6s7MnWrkideti9fUxes4hnWupYRxz1bPn6Zy2y7TjOYcXIn09iw7WcjCzGMlRP02NHwaWj4Ebp9oNwDRaSQlAQgtOpE/RAeionTrmqyNOYlhWZmbjU2V56WDynXkQx2SMDGy3qarKe4Pj2XWNgrT0nU6d0982u2g4lqNMTIVS7g112qwzEIv6yu4BGBExA5ufalzoV/LaDAc26WyV5OiSmOxTrNO8jhyZa7a541y8UEBPI0LtORnleJ8Pjs5WiwkNxLtudNXlm2NfRUxLHyCHIjOzdhVYZjY7mtVYMvLhVcgBqxdDIsWebai/cru4vlBLA7lQlq2WjqOOLi0G2gCcTOpV//X1tMCqy/K2KK3srZXWkhatS65xlcyxrQxSQuNWBXe2T4606gl2Pplv5FMl+dyY65FmXgZOFNTWpVx5FMBsKjyU22YmLYPo3a5sW3f8Ajr/E+OeNShLXzMpY3VMw12/y26jy3iXe25GJcaRT1RlNPXLBK+vXiJ+oXi9bqaL1Dp7wWdLeKmC0+lQw4jR8OyH3FVp4zAupmY7XUBGQqZiIWzvI4CFzM2i6zP8Aat0vKZLB4iDwnkrEcHnjOlUxr6uV/UKhjFJ0our9cXxyrcxj+dLArVxU9Vofy5GdjNMzGONadTpq2vmtSC1uFjkWYzVu6GdNQcrqKGuoam5LDkY12Ugtt+mqB1wbFsFGV1LSZTNPntszoSUik+Y15wtS7xmPj7OGtVdnUMmtsetloxT2RORTFCChV5YnIP5LHay0AeVrJQ9ClLqAltgsgRmi0OAzkDqFtd3UMrK5wfPRvPw8lqwX2wZiW39fzFY7nRlu55GR1F78J8pZfVRpjShz6QudUgE4DYUAfVW41mL/AMsVcGU/trnWvbMy0VlHdXsz8izHRAytVqY2O11jYrc7qXrSqy6kV5aJBf8Au83U3fuPVQb5fgrx+mSXY/GJXzejp3Js7puKlH0JWt8cl/8ACNZj3Umh/H6HPjXdfPqr1gzrYnUysr6rqV9XaJ1rIgSsw0cV1XAEiohTqdwfI/rBzqaEpzcW2ZF6YyPlrkZFliebHbF5YCN9Jm9SexjktOnObrOq4zVS6wikQH8sVwLM23z42Ku6+kViuJeXpqyBMrIH0hb1uORvp+ZVjV/5AWy4iBvdqpw9rKspwuPa9ccs0w667LbfwtCbIuyUx8k7ycxP2MEbyMpVVJ0i91Wi2qm2xntnGMNTxtLPGVanY8MRKgUWmF+UXUq+cX/r2GGjEq9XV3IWyAIb9xKnnUWynxH5LEp5JRXynSqLLYMe+PTdpStRufp5H0XTFf6fpFarfSozcq2hjc9ssD2TqGHbS5Om5AzhMU1SvwgjxrNM0oQY/SnxaC1+AzK2HarYqj6dcKi2fT8ZzMS1AGyqN8xYTVzgoQg4Uro2BQgKDzXdT8iWsWDdPv8AqaXNqvY7MlF7cRmfnkql84NvgdKkA4nQ26bbUNP4BNpYlxavEyHqspdCDUj9VtZLCOyxSA3WbWK7PYGXZlr4PslQSyjiBZD2Ywn8BtntxLvHRj2g+Vcep78iw3Ni8Mha+Vn/APJFbUDRbNj5iqXrWvUqFYO8b6YLNLCIEbiPUb8jakqq01lOz49RARMQIbrQqPuFpzn8ow9BYVnCcTBMenJM/NC3gMDhIcnjBnNBdUDZZyC3XVQ5bPOrGpqK11Wmp02oeLwKot1BLMYGWUMIMcE11tpMm9Rj8KqsfKBs/VFZbGdNzpWJhtSehrrLw/pW1tmdlTATlfayRm02CfyuvW1x+zaltgT8pQ9azYi8ds54871HLIM/cWWi1YmiteVdSljCxMtNN04OKzXyjUiJSgBrrWOtKgMAC6ENQFgrWPTUIy1RuTt49AodfV86h1CuNluZarbtBMA9BZj0tc2R0m2sdWwcqle+7DWFZG/Ha6lC87M2m6myN8f+cZeUsybmp9tOpYz0YmTmW2TcUneMGv6X2BgPbCLFAJqKn7eoFM1s/wBEQj0aiAFOis46nGKsWp9GuMs1AkApnFTBivGwrDDjZCTCpvDlc8TnlCPdY8YWa8ttS/VXRMi5mR8mxv3HPha1+udNtrROZlasxYgtj2q9H7TE+BY2NaYtIAXHZnOOa5h1o1/VEf6fHvtpyLcl83GFuLjCu5+FvV8sUdHJysTLxraLOqXanTV1isE0yIZXW/HOyqVL5jE05kTxumhxWtt+GycSAPxJZmi1NrgYeZl99qujkLYRMdRXWePL3yapSleRkVDg1jO3Ec3nktM4synbMQkNplbMy2IwgX1StcBFa5FvO662krZUFhLTFa1WbMY19TRmW1eygscbGFOPfWIVIiBtdMr/AOZ1gWPNxiNCYx/PBp8+MmK3PrGL/wDVnvXTkDE7p2/T9hS7lxPnFhIr8Qq3OM0ZqY1dGzd0mZeb0zxVnydtxLdSq6niX9WLehL+vcZ2Iduc12VLIwymlf1mxj5lo+hsETDK17MtIWCgEhamj0UKEyakmFnYiTqmWWStG6bjKfqbUxKPJUjV02u8FgEB5srusKlg73Vny5AZ7Ay1+BLc9brItPtPpVQ6KqxSr6vUzOnG2/GVUpApaDh4cimqzBsQrCTOU/TV5TEtfyP4kEzWbHqx7DaSvjceyV/IEiYWBfkzr/TsfGpYmOzckO0Xis51kME4+NivBVr1VpfcXxRkrM/gwJ2BXDyVGayIYthENjEVVNYh8dEqYee008qk8s8ORU16tfMumylgolCqHfLjMW7Y+F+eLVRvqiU+M/y1uCUEC7AazSo9uN129FpZfR7U2EUlRvq3T/BiQQTogUZrViBHLeOaldYMasCeSWXWMa0usI6VnhenO2DZl0UZFWRTiqXWmWWY/FnycuY6ADOFBHFYNCVMDGtyIRdYWoo3XjUQLj1xHDMyhRznswodpyCOhUXdTby2Zt1h5zA6prB+qsqmNc6vj5ASzEuqsnh2r2IJ5duzWxDk7atmlOpfYEa1ucu8gs1tVpurReoV8j1BWRVaXBpy/BUBisoGXlvVLX5PaPynQfxxq23E9BgjQ11wWOksdNi2oR7cJlTqF7V/Sc6shtTGq0FfgKitlfD2AONmmT8QdOx42wvbrk0LbgGIav4RLGE5PrWx4xAnI8SsK7i4LMGF1DVPlkW5S3TIy+JueyyERZ02im+tsHHWZuGKV+osyqRVslamSxCCNzYMr4k4POtanrXJ/UhevMTBGRhXVNW5E6NXi3snTsFGz6ce2ZeLWLVo3b/i2a3HxXrSj6kSvNyGxRZeLLFZFwmemi7Oua7Ius15QKmzbfBZddYMxb6ZiZ9lIxshBdffjJLOohD9Tk2UV4uXcMpakpp+nNQtorD5NxlZvsjY7qnjdjX09SBi4qyymsys06rvRQAlwKWCUXXKOpZV30LezBMIattwRoYjKaaVQ7icvGfFpHo2rVMtor2yWGJXbLFn57vZ+VKqRn32qfIYW2MEcsRipnGsz+M8jzqmTaYVUx15K34jo9fHCACN5BG4GN8HTTisruFYuvpYnHurVr8uqlaz5U9wgTDVAhEXYDExwu1YrDb7JBnM8Aiwqk0ohIJ9CJk1tA6OzVMsPqKjXQmjpeBZmc3sz7tciJyLTfem+yuNk2tEsKt0e7xYjZG0fTT6O2wnHeHDNcwcJLa8YX1y4PXd1QC6Ymc+KmQ5tstisykZt7xcpzMY03MBRTLM+4VVX2gY3U8haWysm20s5N1dttWPkXY8u6xlWVJ1C9jZ1C5mHVb+Q6rcszMh8iK3s2EzAXFstvbpmPZbnO0sybLI37qi9wnIwNASIb7WAYCJdkOBS7TjhLNYkCIADbOZ0HBh2ZkJwuRdqicW1OlcGxstKK3dUI8FUqqp42BGBRePj9/TKW+lp4+PiP3teSWNuZtn72+ZsQo1NLO/oSzU8SMFqi1++sb8/PUNwnklHUbETCzqMgkJNVzxoJzWFBDyjjcNDBSuSs42NBSIlJUJynqKZwEddT3vg+/3AWABC1TgI40GCkAVzyLMnmtmFkvdK8Z2nTPHRZ1O+hrr25E/bua7H1Ol2icDOJmLdegvowtGwCVO5g+WdjMy1rbu1nxE+F3vGYq7NyVRxPFGGjAqAc23+ZL9OvyK1S3GtxuuX1S/rXlh6jds5+5V1MVAtu3gRHLCVkuExbmWnGpSJRUy/SV8mrUNXhCJWqranpqbzGx759HfKcOtZZihotFySwvuq/Si2x4U4p1Wv/nr6g+fy1hdRpOM6sLrXuJrsEDJLLSo3ZdFXQaD1PcUNN1khknVWUOFWXBS/S6VbDqBC3Ms4sCgtMYpip9T05qsgVGzQ7YmObDZjFbMLJ8tOiIvl5PuaeFnm22ce/wAEFjOKxDFdlLWcmBqKhBvx1zxeuT1zyNOG19ggAzkph/Gc4DPOzzCCzIa/Epv6hbYNknE6fkZBzcVsZ+JJ777lSZUrCYfmspam0JyaNyMVAVrJRubEdRYDBLE99bnjgBmHTydMczx46TnWAx5Rdykpz2hanq2HjSvq+A4zK6cxbcNEL4gjYN4hwsmNiZGqqzXkc6WGSV1i5S1Y1ea/MNRaDsTn2ryrEQ5Fpby2iVZL7+pq15KjPKgjX28rnyga6mZXoIPO5YMjIsfq7883UxalsZ8R0wk5bwMreObuMtVTAAClqquo34wsrTx2bXya5OIyMSByHWK+GXy0HaYl1VmKo901mZNa+fJt+nXOy2vudiT2QbiMa4byT021GHMgCxZzQz5HCyflLSvjNhjM0AM4T4g9w+18UKMs3OakReQh5iBffCGmCj8eJU1rs0/tHFpTqPTLukeJsbGpSYtIQ5WP9WcfEeuZXHzdt9+ns/h37x72qj3WEmp5Z8hSITBqcKdeLHltlKOTvtqIuyfNUUdoGico/KBgZXXWZ1HHRsXiVgMrsZTi5lol1GPkrb0/Px2drgF8hjOdrkPxDe8UKC6jXsHFyjtWCnj+P8AapyavGchsYrPCGniIBpYQctouVkOqnQx1+nyGjWGkY1dPUcez9PXGDouWkbpzCV1YFEHVKR0vpV9+UORSWMONjsYMgqVzTpMioQjmwFkYW0qxDij8Gy8WmzGsH5BeT4rmqYV9V1SWBUvsPkya6nZ+j02ZDdFxLFXoL+VuipXLaKxbjhHT0r4WhFt1LfE08bzTiKzTlaIfI8ahjDTcs/IQWETmWmxNmBWMKMIEJgUhfgi0QtUY3iMJAiudeSzXzK04sup0Y5SNk+e2wLZW31VglWXZyfM/DOr42dgpMxOiW24y04FdVNRETEsAI4OC0a0bDhXOQY+SWnowlYx9MonAbpqqYvVXyVNStfScIDKrzWBk8pqhgKq0i2Y6jJpw75l460MrLFYSuxYq21dLzh2f53N+8PINGVk341r/wBNOm3ksQRCBMey1SLH1+NieBROXjHOuyMBxFyTHvVat1KMkUHL6oLLMzGXIqWrNvoTJysi0JiFzRVRUlq0l8bVMfe1ZBCdhMf0UVZtNAlZj22buawzhGuZasfMvmUUErpOnpIUIROnfVbyKSksUsWV9W55Uv1e2tMrquRcTYScaxyrNzmBbXW1N2K5DLPIk5pC1bTZQ+R9m0wXNGsuMY7OpwMHERWEUw+OcXaFNT9sx6TPQiugnJDFCMvZROmruCoGt8cBaqqlGQypLnqWORYPoLWhwvGErg+peg1OFRrgPHZxlakn6a1p9HaESq3bYjw0WCcRGrAnjWeNZ4wZXj7gxyAn0/HScgi8jXXOGp44aGUBGJqqRZ1zHUYwTTzo9Jyc/Otd7832P7PxrtqYtVbscUpBjF2w8BcQ2eUsbVWLeCdgBYy84la8fECbF/HS78Qh8QhaswxA2+odQossbINaJn3Vtg5mPkV/tcdoYoflazIPK05NBe6lclGgapoVhcxrwI9islyKQ3KcTFQsi47KldrrXyLRUud7BqWWsx336bXzUYbGDHKwDUVlE+T2XQPl0BemjfyIsDRgGngWH0OdccIx8Fgg5LPM0S6bVoK02a0jVw1T8h2QezW2sJsWlPyMK3LGD70Jf45X5oiZhGNhoWzqOnUB73CLarT6nR523SjGIb4gML6Q5SCG+tgG9WpznCqcMaLj1OThtHpsB4wCeosBInNmmzPiB2WC1wL+L49lejRXZcMVrsHI+pqul3sWDjG+BN/iPjD1vKpFuNjOcY35+TdPO4mNcHZms4VXHVz2uVtWgfVMx8zNBZdP3dWndYruWDlDWZ1jMeuoWcY2VbORmPYy2dFzq74yJyBdG5Fx4Nz6cz6do2JPC0RChteyxTjExsR9Nh6j445V+WufuRarCWUJFd1XBvSvL69iCrNbHbkajNGVoWPT6wla8XngUTwieNoK7BPG8EHAA2Q8DPSzZMRobCs+oraFaGngaauSK0/4+nWuKSDXdPOIcibtclLIJQNkLYZVVdBWeV4AEpWiD6VZfl1CfV2bbJssU12meC0w0vWo1Fyq1FmSxAe4wtcs2xhMXIsAa4mMTNmbnISpbbC9Fiz5jD3FhVOTKBA2py3PwgfQ5CZfpsC5aTn4j5ePSFra0y4xos4napOmU+XJvuVVpTy5malGILMx94mdbQ/R84XZhoEyVtBSlnleKTFpZD48lo1U/ergtDA2+yw1+oGZuogQVTwwgrOhKW6lskMRGLCbvhOTF+ohscEWwWQ3TyPxR7nnou1dxicxAV1uOmw9K6wamOX1WzAtpsRkVgYFJXHrYslYVeCThA3GH8igugF23W0gJbBQAXRNFBAqwfHAMDiR63qi3TyzkI49aZe3EzU9CJdqeaMNTGt4XQGyHytFxrDPo/TY5B+nMeuoQCsQW1pFyVjZkayx4PU5PNCaECkzgRH+J/WjriZxInIa/vwXMDU69tQKYqMR4LhBWSeBJXGBmWgoFGGgwcq+smhx5FyRxtOO0dJZznycBumJjuaNl1EBYsSxnI0zKtstaKRKmpB6dnWWSxsljXZftbBoNX2ZwkfJpCV87bWW2E3qesnl1FdLAyk81BbjZOhIzdQWqzYrRYCAGMHwIda1XPGoLLyniq1x0vuDYJnzNbHzMLDa4dTyKOniuvIzsm3paVdGsGiGnQcQZDW4uTRAFaGgRHRIXRpzAI4MGELCeQzzrA9bRqlmrlnlsE8zRGBBrraWY/ofifJPN+J4koHnlcDYYpUOL1aZfLZMfDe0rVVXW1on1N0+otMPksh5CMPeu/8AXZfc4kqMe0wUwV0iMNN8QWsILli20qDk1R3paMUlV/jJzWgzLNeRnYfUMfDkNHqtWCm0yvEcyzFYS2l6xaX8tmTkWUjFcmxKktCOayTCZuFQYEECLFAEVGMrrE6y2q0QuDRBTPEJgXtj5YCmaA7MycudW3rVpTiqk1HMM6x76m4Ig3uzcTlP0+n/AD/mcBraiMbeXOxRXZyX57e9mCEnaxk0PmM4m2nTqPI/V+rrUALcy7plK465mJkmu7YdUG67mAwOq2YdmPmYGUr4mFfVcltVpNU3OWoLvTlwTswLuGkzx2iI1kBUwopnj4zZUC9TGUOPp0E8dMZSprZdcmi8Z+SwMNNkVpa+c7sH5nGFToVash0nE8CFAqpa2NgChLvBsVM7/SWx8cpAmoOAiNdrdhhrAi1gwY5MspcGGanHcCbhUTRM4CAATyvpLTXFzFi3I05LPqKdtkVSzJHFLih8uQQq3qtSothzba6TglhbQVPi3BjmLjwVpF4iY4VijVrP1H//AFVek7epkL7pqs8HluWeWwxvlOKr5tQNbGZ9wtOtU2+Ymf2ZWZ0bH0GRFlVtawurNyXkbpzM8jzymLbufyh/biNua9urhPHVE9RaCJ1Pqh17semzhMfqboX61crZ353e54tVWDZGV48XkVXIQZmN4FIWhYarDGBVq1Vw9RQ8iWXyQ3cYLgT5PXkaed4fcYag2IGczxy0AMBN7TiJwnhE3BEX1XawCWJamOldMybPLiFSZ5+nIo6hjtKScipr7oXaAmfMB1EL2t9OgjVVa4KOxdjNmbIKc5vIgGW0bFyDFp0Vrx1nnpSNlPCd9jqa7e4Yn8gzott9hLOeA4IWyWINlxLbacdAqVmjvHqqsAbHWbrM/UOnFnpdz2UXe9bVURsRlJcUoQaajPHUIOELCHbz6NZw8b3L5FvRq3AmvVaHljKK6QFaJWhgqUGyhOa0rDR7byrOfr8SNQOVCup71GrQKVJ1PqLW9qaiBx9w/M0gm5ZXohzurJ89jV41UtordWrrWaBAKB7QjRbmBcLYPaT8DPETPHoeHc8OyyOCPUOpsxGO7KVZNEHZEDwsJswgyhVMaFoOUxBudRzcals3OuyZym5h5JpbA8eQrJUqv8ryY/T2z6a2HHthBE13rrJPjqSeJSrVEQM8f6gS0ZBhB7K02DD49GbEqNYam2szIsTbsIrkRubLWeJVKuO2AGoB7BBNxsKwoUihePS68YVfqhK/O8ZRF1xAE+ZhgJjhJoAE16/Ofu7cWtPG4mReKh9cSr5v45j8sgETloYtnjux8ymwKORewBvPGuG3vhZ55OMFybH5RkECzwgw0Jp1OwxC5dvllle3x8YCOjEeKEcezDc4+lTcWr3k47XWWpZRZhZiq+NZi5NfUNVPy2Me5a6uTI/AOrquwmgi8bN7K8hB7HGMnJWqYTiwnKe5Xy2mJVfVl474tqlDF4rPxn81qOp6M0omPZxt8BsxcoFbYPlgup0yz95cWLTUks8gnnsnlfYblOFM1jieOpitNon/ACFnn1CxJ5aB3vVsF1yTz0mPcwVfFx9GKoMHhrD2UGaHfiYqEt/dsRSRxGq05G7Ctrr0yxXOhqH5G5Xad3VV2DqCLXkEwRSDOkV0MecHkJISfW4gsr6jiElleW5XjORl7j5llRfxuq5NVhclLfRgUS1vVLhRi3PKcgFwoIFSRUqWWH3yM+ZWVWc0Ysh2oYAm3izFgdzUuXhPqFBpuFgOyXVTAtALldwEShVaWlVl/G4NiuDiNfRbZn1kfUIxJAiCcRpqVaHnU7EtNtFtMFixbFnMAs66GjGRDCSsrtUxH1GspvbKwWqUmcjLsLEtaxXqsVoxMrJ41XlJ1R1svPbfbE/7vqbIb7TF00VUnjVonT8hwuJbzah6rGrDQoqizkkFzwP7YoILa59RWBbfzWe57iiuGbMqRCWqpmOlMbxhWvBA1G1NxdStQGd7wptull5dT3BER64jVGdaUJlsIBFEw6xTjIjmrqeW4P1jg/U1tdzRmozb8eNkbjv+XLmFZke8paLHLwbE5t2xvzmTYuHXQ1i015rIcLLouTy7imwT5nFTGpaeO0DxXqUa2cnZXYK3JTP6tStq7sLRq3yfIAr89ktHvm2xZEIM2Fm5uKhaLX449awVGJtFUzc5iD/tOpxEahGjY7CeGyCu6fkDUSZrkPHOCiMzrEtErtltSXl8V0soyWrbqNH1lPxKke1xiOHNFjLepZD9mCjGxVfgMd4UdYotWWj67GyKMinHwM+4XX2crBZdjlWNjeKuy7J8dZ51iArtvy7+5x+8LUVn9A6hWcYAiS26qq76oPLP3AMbHMuTB4+JZ9IY9JSdP6e5Fq49CdYu8+XuAwTpmar4/VPplw8r9y7gZo74NN6mzN+hYRCICVNFLX2Vth49fbHuNJrRrnuvZ5uYOQ2PelkyMvHDHqtfP/J4piWJai9m/kRPcNauHrrCNjFmOMoanEpLZ37VtbVNLERkvPCMxY1MICxKEyo1RChjaJ4ABpy9fEr3PRIX3NwNoA7g7OqkNXwNb7gMMPGMuoraiPFuR06/h/QZ3T81qpn4upTY1bra9j0uu2+neZ2GtmL3w7BU2HZpL8y6yH8iLeIXmwD5CVUJ5LPxayzyCtU8QKE2XVFW46jFdV6BsYMZz9TU4jXHZ4uIBfbGquE0wm57MqrEI1FssWfu2m1MYCprK2YZfEMUrHhZGVqphpfkvjY6VLZsjqOPe63IyvBEnQ8cvV+ps9QmEvN2CmcRvUtT0Ie+NhXXIAhleHlZTN06qqdQooosC+6MSy7GyOmW10147tBjCFnrRmpTHe3YqDB+nPYJR1AVWq5m9zjCeMPpbGfYNpCHY9VHTNMutNMBCDy/KVc4oDQ067qX1y9BhNJPwM8YEV9MLhpH320DDXqK1gYuVgebjLueXgfMsaxTOfGNriGIIM67gDPwDyqfou7T1fo/gfHqTGq5pZbZdifT5P8A1MvHupYzB6dcmOXxcUnrFTzjVeBVYjW4TV1eEXAU6CqhjEIBdb4y+m8rGM4m9HffmIpJPjcwJZqpHEqsNUvz3EsvtsGpVZ4yz+UNW0Fj1Q33Q8zKMnxg5S7+rXf1Sbw0utn1mPULuq1S/Ptteh86idbux8luM1K5hZxTG/UGMgxMHemFaH1GZRNq8deL8TKxUZgYKCvOzXyYD6trT6VrGPbDp5hQK0srfKoGNYpy8gm5S08/pH/K88nwLlVM7xpb0XI8+HyUQXIDtWnH3rS/Bs/JmVOGIiVPagY+OviccaWrUFG5p0Cu2+UBSftw8JwWeMmGsicWnBpvUZjWnkfYuMW2ebcP5A0sJ5LBBc8NtjDxtK2AmucNbiN5BFtYQT9Q9Kr+pxruMszEWHNOVfi9ONuTmWU4tt175BWijbLiR0wyDRwiZtxGS9qvKGZKq+qHj/lbzWOoKJXlVX1XWVCcqGYP6J3CjaAMKsIF3D4uCkTyAQOzziEi3KgOSY72PK0QOo2uo1cWmsh6XUA0wPVDaCa6RY60qZjY2HsUYizP6nHtdyGnSdeTKu2l4/cmoIpllnmxqyyUlvYO117rBl6btx0x7cfGTCrbqByLV9xDPKEPyU9NW9hanm9mNyLX6rUj8vZghBmvXsQEmfp8HxaVh4k2NCGH3OPqtOR0sHuepsGGVrANB05nwNP3BPI05kMpBgUQQrCs1qFAYtSzwAwUMIEnCGsxbGU+T2o3AB2KK0NOpthP6tKTHaZdKZGPaLunvctdjYmsct1C6ZGQbG8p0ljQfHGhlb1C8LHIroqrDZ1rZFjbEWwrOfkNWa1EbKYv5G30/J+oVVqEeyuPa3LZMPzwMVBtWprllhabAlVq6a+qPeWlfBQ3lYMbEhdjFa2CnJuXIxcgMKX14PwOO3DjdKaiB1ZmakhoZuUXFJ9Sxlp5A9lEqqsacWSBVFZURExlwT6IMsAJxLK60psqrezHxcpLsQlvHcU12xxjhFKWV9PVa1PjltzOLanrNYGv7YMZz3NAgji3R+VGJ5vQtbbN6OtBxvmIJ8z0I7dlXcGhPcVvZM9RgDDSIG1BZFuEFoMcsD6aGmDyA7/Dfr3B8S78hrUpbv6nKejGBI+nM/iyZK66rijLNnQ7IemccHKqspc9tzZgbRNhaM25juUZGKLffzhPoMZvRdw1cExLPFetVZXdSx9NKwBB8ckhupWbm4NwxE5TxKIhVZZkNOW5jVBpUtSzy8RiZnEXHHFnkqnKHK4AWMxup5n6Gw2ZXR8mivgQyVFpbjPVPx1Cg40FK4mSmnymmVWync5TkNIfTqbm41eOjCFgqy7ME3kWj/pHOh10dpcio1ost5ustPCupxfOuUcaCja0YqngUO6wRGQebo43i8OJ5QmCJNCWp7XnHYTkugy7T4YxtxRBCIRNRVnjQzxJAgB2ZqfHZvS+VgPM087xrSQDE4sBWAxAhfcB9fZfeDK9w2cFvyTvGzv3+p2Yppb5+4GZTnxnY+zfdPymH7xsOpOeWccrayCFmacYdbnoT5nxPcCOZ4mYmnUFVZn0w14jC5ri3Ws2rt+MMWorhqrUceM4sZWnGC50VnxL7q8ajyHHSefw4ubUEO5V45UaOK+OZ9LXYpH5T4hbUWUZJ45t45cgRQ7WG5k0DoqA88ZlXwtWQEWtLK1S/Gu6kfLgk6ny2xpvRWcdzDHDGPxqah5AiyeUwONH3OEbkkVlaH0g5bG5qHazyzmsFgEFqkgqRr3x2ODRQZ4wZ4Z4iZ4gJwE4w/Iq3BVqaaGp54IvoMTPIwi2bm5RZyan2MyzUyr9TAtBtyssOrf6Kv4Xfy+7E/mDpBsTg3EVsYyus9mJi/jZ41iUs5NCaWmuaSuVr7+Y4rUfmYiWhK/IWI203OUsc8hZ7qTynIusrZsh3nLlK1QLivscEc5xqRsizyEwSr+VbopuzRU/UL67sktC012DagJ5VopY18KrfyiNqeQ7wHXIOIlVb9UzOdauSF5RlRly08d0BaEjVcwMdDR9bjBmz1RvrqOVebjO6lTCoM46n9djD2EME3BPEhhqEZNRbFnMGLqP6htAi3LPMsFyze4diKSZYkVijJaHGvepxgjajJuMjLFtImI0xj+HUdgZlm3o+LvVlojKV++s+3/kADD9vSyoyvNUk+p9fVPPNaZxZjzWuFy5D1iNaWnjMH7aqbGM0Xioqwn7PZGpqOoM4aldh0FVo9vCeLyWnxzlWJdmBZbY1lrNOc5TCrsvj6MI5jIwG3WdKe2+TGD2yJVWvmXTqC1tWl9TDs8V3me2cXsPTek5PM4GOWrx+lUz9QVYGVSV9q+p8x28YqN9wp8j182SMxMxeBnTv3aVFgmyJucxtX3Nkw+SaaDcY6gs1PPFtWCxYWUzaS0VsPHYoDsI1jGfMUTg5DAiV2kTyLOYENsdtkP7S7c5zYhMHd0BmL7OKZ1M+iDbYKMitMkhiRtXGxr7seg2VtsH4h+2g8Xpq8kxkrrfy1qVyFcMxaHj29StG0KIqqvcQ+o2QohySZQ9jEkT5jeg9qK1lylH8ixN656NS1Wy3GQR1l2OLp9AAt1lFQss5E2Jr3vGErrOucQsGzVsqyPJGdjKfRYygbJInKeczyclyK9TZnT7i9PTelbW/EwlH+Jotn+Ewkmdfhv05vc4z0odixoVLJdR9Ncz7ij2fU6XkWUuSCPQ7a7b7agWN8lVhpBnhnh9eFoKDPpzBU6w17grAnFYEAnEQqGjV8YBCk4wjUIgAg5rFti2KYWMB9TlMfFsIRVVepf9XROmKInjev8AUXQq+NCc8ewEFV1HSEdgsVRMBzXbfjV5a302UWtojtrtWA0KOMYOVKZtyg5dxOHY71jiJWeRUfZzSNcgn1C7LUzy16DDSDjHEWZIZhFBcip0CJUAMcObqrAyNcWra3mleO5toXT4lZFGKiN9HXExADXcgPk9vkan1dHPOtNz9qkj/NO+GxtDyhDbqrMdPxK6X9O5FdLjqV12Q/UsOhv8xbYDlJ5HzEZv49rv+uIw3ff5CFLSqhplUcJTY1b9EyOdZXlHrIgLCCyBu3zBOMYWieUzyCLYhm5ue+3qamoVM8bQJB3IlupxnjIiBTDUkOPGqYD8hFBJrHtWNjZeWanqyzkytZQ/AsAy9TrTB6q9gebhMPcbmJTbbbXh5STqdRtx9TUAgWBBPp9lcENW2I4lWHqDDqaUYpRBQIoCjtYWEsFkVS0+nePV41MS0qBkNv6lY7o4eslWn91eJa28XM3yjIXnkYtN6LgeGDJrn1NMObZu6z09KvBSFisNKwBs5WAYuPaMboFl65fRc6gtaqrx2fiP8445L4wJgVVvLRxNbR25Sziq4B92W3aGKwBw/f0D4191WHl1XqGJUy/fD+q12y1rEAEBljAo3z+n243KQQ0YKZqFZthEYPB6m5uahScO39/ZuCGbm5ynKMfXZTv7SoaPVqLuf5C8xjfk5i4tWBi9Pt3jLw5V3BR1TBuua3Fyq2pxcq2L0rOaL0TJlPRa1n+OxhDj41cRcUPYcpIcu0G6hkfIrNNog7I5Ex8k8bVCsN7xF/P7LLQsLuSmmnkprj5LGFmYhTFKiOdwfHI8dQLssjVudkit3NNLJPp0mEhSZmNW65YWgVsRXSvKX4zrkN5ECqbZjL462VAnoT8TOl55N+PdVfMjDocXYvTMajrHiSGYZ/cs9TkRF9zf5rMn/u6epFtNVPM4tJXxLjHNd1D2FbH99skbpoGzXWog1PQnlqh4EZNXA9Byzh5dKVAW+MpRQLxZj8HzsYVyxShHqI3oGbnKb7H7jAY59F1nlScgYIW0IsAHfc2Yx4zyrAdyvpOcTiYGRjwdJcmrhRSLViukXiYatxlAnISxEaO3EvZHyOJssAleY3HOLksxMyfIxX5A74olrgSoM7ooWE6nImCH4WpQ1nCHbMMeeBROIEsxeClaeIVRLDSI3jiqDFrr4FVE8yqrXtv6gyi/kAz6L9QK2U2NYKxxyCzRbr1tNYsGRaEx8m9ypvbyjIcTmAy2lZVn5IDZ+Txt+szDd6hitxZvzVUIg2ZxE+JkiYgVUrpXRBWl7bLAM86yvGw7BVc1LxdzK31G0U2FNb7mYN01AJX0693epKTYPEi1Ma2zvFxb3Grn9gGAOO3xATDbPKk8onmgtE8izyiJas9MOCw1JPGojHQJ33R5yhbuawZ464yT/IEs2cd/XQZW4LwDXl1iV9QUGzq34257NDlttMwzJyA9bXy+315Z5jy8+1J/KujyPUoXI6lTTXb2V2nGYguZONiKNEjXcnQ4q5TgOxIEN6CLdzNl0JZp+yAtbPExhHxg0fF4lqbJ4rNpQsFCAIz1k2+if3vFSmLn5UFH1RudqkNntSeJm5ygYzHBsfp3SsXxvlU1VWlt9q7GQpYrgQt2t9piqCMOl3D3rxfGU0HbWsjM9tapYf4+ZdL/ANhrE8fvjteGiojLtEUmLW31NV7MvMTYh9xXZVEKKZwIOrBN2zjZB5VnmMO2mtTcDQJueMRAB2HbUvHceoujOInDsD9m2gJ3yAHlac2nJpRfotkAzmZyM5GcjrmYWJEMB0WnhZ1opecIVjrqVgFtAFeYiZNqx8ptLmWiVZVzV+dzCSeyPwjZDmDRnKhYb1EJdyuO5iUIsZ0EDqYX0WIEN1YjZMrsYke5wMI3LRK/PyC2GCi8TrW6+3KOYAYQe2I/G1LLCh3MqgMrow71nTA9yPWGdDoN3IW1pYrYZ1kl6spH4VnRnGePZKFXM2AfIOMXtXWyoq3LCiFaL/Y3r3Ducm35Jz2A8DCAw6jKNj1PUIBnjEP4zfb+pucpafy0eyH8Zym5yh1NzlNiCwxXU/cpg7bjtpe57J7nmda6V/bb0QVWuaKxYoLQYrxqBs16mPcRT8TTarrZo9HFRU8NTbbp94oqx7GY4Nunp1DQ5lWOonxLrCIXOzPiU+2rTUY8ZslQoMT+S2CtF8zr+o2BtgipAmoVhCmYtPLN/wALiPXldEyK62RpnVhX7V65ik6+OyozTHxr99GZccp1DHY1dUW6ZXiuS2kqasFrY6Mh/uwkw+i2oqtCeASH4VP2W4gn2cZKzN8YD3KzhNT4i2Gcuw+z5hXQEDLDoKdaEfYKNLBKjDGIET3CCDyaK8ZjPIZldHvqVqSJ+azmZzM5mczObSkPY30NjCznU7MT2HcCLy1xsecWCsY25VTZZPprhKaHSMb1DuzMOEWVLoUVnf2V+P6bFSuyJZZit9Ta8CgQGb7XgKiozHHwrrWbG4SpAIdxkJnA6+naVUhYFAGZmhZ1Bg9xE9aBlZlu91q0wLGozUyMpob7Fq6jQt655HkPav8AmuxBc887Six2nmtOQ0xjwx68lUrbOaLllpThuIypblX00rFp3MzDtqVl3OREUbg9Te5QFsrI9gAWNryVhmcNOU323DOM9ibgeK83OU33YCFBPHPHNMsYnXxFbcIm37EGByIls58oJoQDbZGLTaMjotDy3ouYsbpuUIcawTwGYvTci+dO6RTVKkrVf1L0hMvHPZZqD1ACZXpUo2xICwmfEBaEgD6ioQrZkMcU6TEMpo061sIgI7cgINw8OFlhYLXFsK1jXbXewkxbETHpusrLWNYyegPZfkxpp1eK18uS4oGRmtacbpbGdUoZMvW2AnEaT+R9dumJvLTJ1GyOYqyVYfqjFXe+2InKzxAwgqUVnazQDaW0xD/x9zcE6HlY6saKbUYBl8gFfVc1HQNPmKdQnfbkVmPkV5FVmLcI34jH/wCviDGSanuGxjDOYnObE/KHlB5ICR2BIinc1216IgmhGpBhrdYJW5g7MvIOnGI3Eqy9mXROgFAEd92Iz7hVIvoVlmNVjczP1Z036XLnqbgmL6uCmVV6FsMAMblHp3PSmkW2lK0XtX87iHkYqiGyCtmIGu2xNd2OgOTyrDf6ewMWi67Y7gPVWGW+ivfJKmz1TKxekdO4Nn8lr664ssp/l/bNAZy3FYkdJtGMmRfybIt3LrkWq+45CvQeaY048DkqN1jgKraoUpEvx6rBRj17ykxETt03F+puFFNSFagymu2X1anWW2q/EHd/4YNnC5EZmWnJ0uPYIzrUvohq57m4I0H2FJzg9z+xAezevuesNHBErPbcIjV+yNQOwisXZIIGAbZJ4z3yCGF4nklD8k6piJm4eTj20W6M4wAQSgg1bM3DB2yLiDQoLDSjypPLFdjEHsQughtWf9ZF4297GbJilQS6TyznYQFHJ7Eld1iRjOab9xYp/HFcKXyWZacvzXNafHh9RLnq/UKaKuqD94JpFbcI98JxAi62lTtX/j8s15NT0OyOJzPjc+lnzFCiWK7WKhEVnWWVC1a8Z1DVMkCFp4PWBqlGs/FrUMLDmr8hlu/FYIO9zekmA4eqi6pYLlaLwc8E0agDZx1qFPx0de4rCbHYSysGaKEHcG4rQNG0Rv7dkQ6aBdTX2FQRZVqcWET0nGwQqd+jF4weifUI3GMxWHkn6vwd1Tc3NmYjW8VFwFr2LEreyIFqS24uVrrWFhv3F4g86lgu3Bdskpv1FIEfTTxsJoQjXYLuJSBHuVYedgXhUr5EJZpV41Xy7JHpHKlMumZWRVUjX+C1urVu1dPhyPHYauu08CfcI9jsxlA9dEyavpHyFE6je9uQ3Mq7qDy24g+1FLkrQlL1mcVQj3K7vaZksfyTJRlmNe3LqWi5idl+RGPJpgPprKCkS5llORqLfGsCVCw8eyAEz12Bg12sGjxnP8jzgcwExv5BxAZvf27Hb3CQIG7Dhy5Di5ZWL8iAeIh9tok+p/TFjKbOYuRbK+s4JwM6CCY7+OeV3FVEstRQzs8UTSgBYRthSZ9K0WuxZ4tQY+o4UdkKiecxyDBU7RKeM2lcIayKiVw6Kip2P08CqJZK0hnqOyieVJ1ByTEybq06bmFbM6o5SldQruEahifk1a6n6WVfpsikeHM/7GBeWjTxCYu4DFpsNSoBGQGCvxr6lgJnH2s1q7DZjETyJm4XEW7pyLm5LAdH5AEufiogmLcKbjfW6O2aI73c6WZi2UtqUbc/ae4MPsFDPHB3sUkQMROYlbgzffYE5rsvGIMDai2xOLQtWg9cwQGPyFmyzAaFnw+9H+NR4PP1J0/6zC12x6y7rQvJ2FavYXhgWNWyTkxlYZp6ENwU3Ws6dlaD3EpYxxpvAZ4dCuo68CimxqS8fgXDoIbFAa8TzPDY5C2WtH8hI8dQdubUKvDOBKRMeyyYvQruF1rNeezLsMjGV1hBQa5j2PSr5LXS3XDQCZSetQHUx7F4kIASFXZhJ7kwy3+FWiMHGCipvxYbn6mwN179Qyp9RroTs90vYVPkXMTaxl1/7eP+TVs8SmycWXtv7R67b7amu7KJYujBA88s5AjnNoYQB24zh7A1ADs8VCnSsgtOgOw5GeSeilTDWxuo7Uifqjp/02VUpMpFtcayxoJTVziivdroJ8ypC5AADIrpbWK2Co4ahwa8YxKkEAHb0e/9KeMa1RHdjK9Ra5xXfBIFE0sHqHiIyi4+AarrWtbqlZfH47KHr0134a92kEdiZuY53Z5PGqtsnk0bQXhbYbF49hK+RgachNifjNiMi6sQgP8Am5bRof1SRqXIHXq+EuFd6+xU5TxNNEdt+u390FFnTRyNeJVxfGpIyaCk1333E+Dv7OU32NYnACMwCxfUVC0NRhqaeMwKRGZoByI2xIErYb5OpQiE7iuWXW29mP8AjOQJof2JmY6ZOPlKcTIa1ieb6qTZdhWpJ2dsUx2hU6LKoLXbFXJasf8ANF4tdR4Tb5ksGS3EX7lbVzmmzaghvjWO0A3AnI+JzBUwiVgdtQjsUUkdjuGMhULVVLf3JclgjVus5aBsMBYz4mK674gzyBZsmVpuPS9bXWuzSpkVfMJXaG7ampqAGaJmWpWDdtPT8qY9kV+3UsZMnHvr4Wd6xF5a47jr7FbGGl5xlWFZaFR0t6TlLUMbJ5BTuOgMycYjtr7T9wE1NQiGoTxCBQPspdVbKursjqpiFij6Fh00DAswMHqE8mUbDbjDRQMYxVXVuBT4n6pwfLUFAilQfM0Zye1HPctLmV8dSscj9NijEQ1VV2MbG+I1CMTjvPHYIdiCBoJ4mMrqmPj87LAQ+/sOovv7XGxxO+Oh0JqlyeoZOPOp04aNa66ssZyQONZ09t+1VtNhs11mguPa/rIrC2FfRDCf1XsSx+CNlWcqbr3g5RDOcsQNBVo3I1NmFkclSyLbDYrCzp+BkNd+nsK2ZX6by65kYOVjyuva8FJTlEIYOvGFbXJRgcPj4LqEsltT0P0/NKtjZIMrsDQqDMrF5F62Ukdx92oP9W+xi6ZV/h7VxwC1z/wR7qIILRgd8tQLuDiJU4BEdQy9ZwvosuDcVCZVQB9ymFyfs1NdtTis8JMFRERdStzW/lYmw1Ed7LIqhprt67HtZ22e2XX7ZROM4EypSsWul42PXP3K2N9m/qbBLGexhATGXc4c0GwVSrlomBIEnoDW46NLbAUxrjRYc5llWVYwNzApkyvJEqyhryVuL+mYGTLP0/Xpug3T/C5iSzAy1g2CmOruavGBGUMMnFNcxcxkmJmchXkelvjqlgyMcr33N9/U9T1/uYWKtpV3Hj0fxnkLKyhyK9QL+XiCqPc1qfjwOhGHup+LD3OsYQzcTwWc66IAAP8A8J+Puu5EeJoq7hRqyt0N6z6gSoiwFZ629Ub8YbhHWy6ZPTFroevxRQhHKoTzVym0EqmVZHxHSPj2QjU121Klbbc2JHoH0u5swKTOOpz4ywIypjpYuPfwh6ghDZhgzGgzYubEzpVnyrLJi5G4LRFO49dTRsCiPgusvxXET1GEycQPKrHpbEzgYpaVN+Il9CvLa+BnH7gZv/Se6iy2pCEKsgrex1rQuwX8Y5Zn5PEYc2/IqrcEPF1GpYreRdcsdvxnXMbx2d2dNgCa/wBDbhssEW5Z5UnlG/InZCFawqzfZw3HWGblTryuqqa1sLxTHxw5u6dZuzB8ZNQjUrPHNaiZH7eSVn4mcF0KqxFmL1G6mjMybMgtsRvc0s8SGPVWqoVio2+Im9Q7nNtKxnP8NnRf0jN4SdkfaCYLHEGVcInUslJX1u9TR1qstj5uNfFPbcsFTTLpCManl9K2S2myk9IziILREMBl1YZXXTd+M33Bm/s9zc5Tf2VeQUnycuCEC9K0qya/HWdszK9fH8tEI3pQeUG+baMA9+uXNtoeS5dK5GPkq+Ld53htYwN7p5cftHb+vyZvH7tH5KpJ4Nta2aKND7ADNe8EotnVPAXKzUWY+vJlU0Si1KLG6gvPqWULibEhsWB03bzJK2Q12GJjNOGpqD33M1uWkVzzrDcjStqmnAbPLin4xwzHV0W11i2IY3wi7lg95a8bYGM5wOJv1sTkJS1PlZsfdVS2A42pgH6SzBzK7lzM+nEnVuq/U142dcGWoWYp2raDw1Nq7Eas413NKr+MqtDdsxPXKFtzlF9zUP4wHf2GDXY+4QRFbs+4raisDa9jQ0sIaeZRKxUp/c2VCepaEYehPxakwKRLQvKtiIzL5MUkGfqXA8teu6uYhBXubEEWxWnIR7CxqKgrrWh34n7txRuM8OzMDES+ZNaqxEUw2+jkrBkrDY9r+CuPSmvDANCBQYw12sq5msBB8wicYFh1qw1iaDWeCJ+A56HjgRxELaetHn08DOsRrHh5zKQNUylT9up60ilpiV8V3tHHKfvUTHx3zMU7iHY6P1OoYyWUZbFGXt5CVykNFlF6sMZhtDFpNoz+nW1HsCdjZm9rrTdvfYHuYyTkYrbmhvHYtWyNEVOJXbbCysbFP87Ug5RKl8JOg0VisOhED7r9MF4sjclIBHVenvj5YoeDHcxKEEAA7kbngWLVxgUCeuyjcca7UDb3V0/SLT5lI19nrj2EWwqGO4wjOqh7C8VGY1UqsMMP3+MNPEs/jC8BPbcaxoS/bUCzU4z3LX4C2z1vkwJUi3mMpWcWFMvD19g70JxTuB6xrDRd1jwtkj0/xZjebyJ1HIoNGfjXjihFlR1djvXZj5JrbAuFjG4iJktrPrQXFQYVIit9g+wfY472jYalzAq+OpyJX4SEIazhXOKyoaPIkbbTEglhx/sDcs9L/wCsa0c51PG+pxz6bp9GLbTk45rebE5LFPL7B2qYCWHk0X1Bb+NdjVlvf+m2zhGL2RKYRByEqBZasUPXYOMJ+yis2PldPelWExkDPnU4iYtnzF1G8YB7HsOwgE9Syvc8Man1vcdAIRFLbtXkdTU12UbKUDcHYLsoAZZUHqXA9VYKKFw8cLjY9VMYersHHshxcumVdSux4mXRkF+nVWTEwcrEv8oWrHyV82RQt1bqVaFQZ7Hcf6CIyzpvTWui6CJYbJYsCK7BfyrSlTYugA0TUJBGlgbkrD8PwhAE/LjZ8+uFLchOtYWrDyWNa7SwkI0B1KsifP8AsP3tvQB76nEGUtwmLloKM1g1x76lDGtsrOexbDyin26t9K/cGMBD3EAiofs+e1tQaeGJWAbVQs1b60R2II7D0VtUxYIIPcSfM/rXZfsYArbhUsaRmYz09eKQ245qbDyrXx0sRM7XKHvr/SAWOD04DtXaLSvLi7k1rWqJQInLbFuY/mjL5N+lLOp0Aqbn9AcgFBZvVpdSuO2rJai2V5dL494jcSAFnBZxWD7B/wDkrQsbMNK8dn1FCPLBxeconucTCIexZ+NkEAgE9zhOM4963KljyMInvsYPnctr5RqNDxGcVEdA0esAdsc7A7IBpBynx9u+w7Ouu1WPjXvm1nEt/T1iFbOp5GLZ9V0zMl3Tn09Lofs392PRZa+FhJjjsyFJQ/FW0W/NbASSR4wV3NKKwAKSPSAByOZHEr6MTUbXLRh/KKFSY9nNZ1rF82N2ErOia0eV0FjR0zaZFaLNf6NRKS8bHZYV+w/aqbOGK/L1NkAs+YZ7iiYlSsUwEKZmN43ux7EWGcC04EdyQJzm5v7B3b4ud1n7hCsyxLA0PYj3AI1DeHU0IPRpZNr8D5DcYrrNzf363L08d2SjPW7u0ousqavq1njOrMmtcvGNfW8pIl/S8o2dOvEetkP3YWE95opSlIfUyn/a/wCx9DycG3tpyG6gock8ms3j08rEFbCI+25aKD2D+be4AeOwscftLz8lP43Kdg+x1bF+nv7VaMp0tzFUyDkfhY/Kb/0Ayq4obMryBmB7H1Cfu5GI5WWWFo0PcTFLCUX8qsim9mzGvKHYlNlgmMMquzJusKnlPcCwiamprUNlcDoYAYbahPPXPkbllY2w7JZ6GtGa7IxWX0i6MpQwSonhNzStFbiV+9Tprm5WTMx1sWrGugw7jKseuvu9FTyoZOMU6rYAp6blS7p96QqR2ocpZjYIZwAB2yL2D87CCDwQcg7AwlK1U6XYriFotjOU/GI+posRsQbLfDbYR3bm42tuqovF4eHLFs32z8cZGO6Mj6iiFDx9kcvRPYRKiwZOM320Namu+5uH/SftE6XbWjrlV+Z70FWRkUkWEFqWCuM6v6Pddt1hrPb321AJfUzy3Auqnh1PG0GMsapTP67MNx0g2FT8ZvfdYRMtCaoPmskibgaD3K/j73/lF+Pv3CimY1ltBTIstDVYbtg4SUjtkZK1z6hjAp2gdgvxSyMuyXs/KxOUtrbartVrgaxWU+RtjiQRF9Q62jAvxmxNttzusqQyFxbW3JZ13FXjPQnn/a+1LGALb7ViLQTDURCNQw/6fUMP3q2orw3nix32E2dEfYo5Q+oOxbkpUTXfU1PUsRx2SGAbn8Z8wLNTkQMmtfGJSdTRE2OyHURoD239rHZg+IP9OFiWXsMevwt0/wAcbNzcUrnY+QbqLVUn8Dyh0sb8mVGR3bQVKxAWEOxZzcT/AN8OcQKk/M1kcGHKHYRUHJDqAaNnoqW5HkFA2lHrtagsTKpNF32ATX2ISrU+5gJqMqsM2tUZ4f8A8rMFjfxQBex7krx7Vhd2cP8AQVjh9tppx4kgNA4Nd6Kg4wbg+TCNhqWUqCIPat+J7ciIjEwN33OUZvUUb/1amDg8pX4wsttVI9vke3HqtijIxp9fbXEuxsovTYsK1gFxtt8qqUi1nxryA5kA+IU+lGuT6HFf+pPxLaRwdwMZYSGT8iSS/BYDqD01L80nWMby1dhAICNb7DvjsFlWWoV8wcbreZf/AE22cTWeS/brtr7NfkoXbqoGDji983p5x62m+6gmVYt1htoeo1Y7vLMOxFYa+3cPcicYrTiWi8hP77fI4gDkJau4GZFr5Emtkijsp+xvlew99x9taM7YfTUUeNI9FJmeclB/kHRwVdd8Y7GtwxmTj1XmurNxyPKZ5OCNkLZGdjC7mVtYtfit4K54VnQq9wHk66cey4J5/MrbjOKoqgq1euZ0qbHEIStHNGhGx1TG+nvgMB+8GB5zMJ/26+zY32PdVZoRokzCuNdmbmJbVcRy7CK2jiZ1lTZObzt6ZlVg59tfhvb8lKk4yY5xhqNw8bCHuYPgwbB9/YH1C24ZX7NyROVLCxfEv8ewPc/KfaPsxcay98TFrxxHcIMizywAqLseq5XxL8OyvqlNh8iCrkrDl7QCJ4wcgO1IrHEIZZ+MC+158GIaH1F+CPXlaHTIfhgBK/yUDhYOJPjXS85tyebsvM8sSzmszqBfTYpR/wD8j26iNY3bfc6MIE99jNwnslnGO+zEnEkOmoe4gE4tEFiR72Ib8o6kSux1i2B43ZvsE1Na7mAbhECnUx19umzag0AINdh2M9wmBpv7B3wcBrZWi1rLcgCcuTkqzNrWnC8tU5OPVkp4MzFspz0sild2oVd1CxGXncGU1Natdjco5i/GlCBGMALRhxs4q7Nsz+yfyVzxRdxWXj7Kg187Xes4/Emta/Dj7VwdidbxvtO4hb/fjVC21uKzl31/qAgEENhhaHuIDMW/g2XkU3y9EDKPZWvXh2cLpnmXNxRUxHsruMs1NfcfsWVssNiy+zmy6iqBOMAefl2J9Qdh3ErRnbB6cE7EgTKsYqDLW5r/AHzQDnygHJdVw+Iy3FqunDKxJR1Cuw/yP92bacm464QryjnTfBZvdmlXaeOvjsfixUb/AL2wZv4f2fVKixxcvv8AgzWAhQhXHc6lyLYmTSabftSi11ZSp/1qnp3m+wnT8dbjd078bqWUn/QJv/SrETzPC2+wlHz04p4OpWh7LK5Vrb07LJow/dqKSsZRoLqBZwXRAE2IsEHbUbsDr7AJiYtl7YeJXjLGPEXszgMTNbnF5y1Pc/EhgugGYStnVuIjYmPbZt+KoyxtszaBFYrbyNAWnvba2ODRflmcGoBgAORbxv7yHsKkgENySeUlQzchWVnP8XsGl41up2J1rH544sbaPs99/wCsSrEssquUq0CbniMw8YPbZWtNlByPH1QWuj/P+rU1Nd/k/ZqY9Rse7FsoFWQ1cd+baMxMAXpfX43sSH/RubgMxmr5R+wg+1x2WfBE6f097pWi1pLLgsclmnoK24xmuAc6nvhocSuoBXt+AA9RVZrW8aLtpUW0SUOwEZlNeuM/NSCLWpX9xWPFeIUepWBy9GcNRlBSwkRNGH/vDCoWs3A/hUx0FNZmOeJjDY6pg+HIQcR/uT5oy/HRa3IwPqeQxXIPI7xsyypcrNtsVvfbU1/oH2H7BBKeJPF6LLLvq0trZGmEycruFQospa7I1yf/AEHuDN9uPcfawi/KVmxsDpgr75NoWfxjng/JrJosxLLHjJpVYlj7jkcmnLY3+VZ/Kz6d56dqkPM65t5AOXkeryOGf98MJXpYjekIKLpifhva1+XdnKL6DfHorQv5Wv5WAArHknP8tJwxzxZTvtmULfS6lG+/f+jf37hP2NN6/wBG+7CEfaDMbI4HFTHusvwldLsd0ZVIPlbiQSCY9J4nv/fc9xBB9g+3XrCw7cl8PEqxl7G/crLu1rMrJtmTl5GDNOJMHERX0a65Yi74ggrsUc4SeCkRiGPkcWpYhstNbNo7eyV2lK8cWOPxqsdQ8dWEPuJ/Gsbu9NC6mFm5AerPxflqDkoQViP+VoQvLfKlnK5WHJ3os5djOsY3/wCxofZAI/07nKb+4THt4lc0slNPmjYNfHJXi3kMB2adGZNRSwj/AFr3H2gbnT+ml5Wi1rD6j2blrBpuxQ/PkoJx67ApsoUMePjoteGsc0IUumUYGaDenKmH8IpQsXrdmFbTeiLH21r8qb+KPZ/yKOOhWnjLcVUtE47eyfnvkN/2DpkciM+41X7ljFoJtfp8UHhxd1lumTFYsuK5euWKHTKqNN33O4EFvv7QOx+w/wCg+uzGb/8AwAyqz307JjnSZv8AJl7BiIx5RhDDub/0L219tNb2tgdOSnuzaF96gsWMRlAuUBri1SkWizabbxmxrawllBMuveMy8lFq2bDOzJxA8ksBEPDgqVuf/8QAMBEAAgIBBAEDAwQDAAEFAAAAAAECEQMEEBIhMRMgQSIwUQUUMmEzQEIjBlBScZH/2gAIAQMBAT8B/wBd7UUV/wCytbtdf6fXwMUTicL+9ZZZZe6iqtlfYv7fk4lb0Ney9q25JNJmRqJRHHx7vZRiuz+TMsVjjx+SDVUxE137Xfxul7Eh37X0iCJJJFmTpWhpj3hJyF15RKXdJGJXInG23Y276FLZlN+CutkPHSKRSGtlCvn7Caoyx65Ic5y6dCXFUX8DRRFdEnbIUeCRftXtoTEjjvf4JdiQ1ava+i9qLMbVF0iRh8mSjGr7KEXQozkvoE9+Rysrd4ZS8FOPQj02VvIRljyjR6L2SHtGdRaNK7hKMvKE2jnSG7Q7L6FvE6uh/g4lD2i1szgqJKhEZLjQn1RLyMURQil+SS7JRtUhR4nwMjXKyTTKS6HFbMx5JR8IaJR2SOKsTVdD2xyJeRddimmit66OPRe9fJPzulxQh97LsftyJRfgcPqoi+3YuyaS6W0Y/jbuiN12ZNkdjYhCZKvDGjiKqMjKIrshjvyekifTGX0XsxMTJJJe2TpHZYyRfRZRWzJCXYnH4Mi/BE4kuiLockxx2XRDLx+Bar8xHrG76OXZGfF2iUrIwslDj42TpHNk9sUE4j+lXtEvsVElsyifkboxr5I3Y2PF/Y13RJUi62eyY59F7Xs9mLsplSOLLOLooSJ0dEfJfwL6OxtEVyH3vcPk+gWNHpMeNnBlCMWFufB9GrwSxJWdlsscyyL/APCZJf8Aj3REb+kT6F2yUnZ5ZQiU+zml5HM+RtS8jR2dlR/J9H5LxnPGepAjJS8Iuj1b+N3Nx8Hry/J6svyKfL5I+CX8hHUSSTdHpuJFDpEpO6OJjaMiSl0f1s4KXkk3FtCyMWdkdS/yR1DIKbVvo+Tn8ks7m/qKTPS/DPRZ6cjg/wAHjFRmf0pCjv2WyxSoss9RnqcRT7slOyyyx4XZ+xyV00ycJQ/kiUuzkj1Ec0cr8C+hKKHB/Itmai66F6n4J5JI0z7YkZv8bZHPJMvlGyG1mT+InavZSkpqiXkvfVSfOi2KX5MeXTLzFn7xL/HFIjlySnymyzkibfk5HqCzP8izzFqZC1f5Hl5LwRlTPDIxhJWeivhnoHoSPRkcH+ChIl2/ZRRkco/9Cz5l/GRp/wBQ1Elxkk0annF3Q8kj1Gc5EMjiYnkk7+CPIcSX42zvijF3GzUR5w6MUI4o9IkZvEl/W2nl9CQvwTc7ouZjvj3sombPKHUCF8Ve/InV2xNHM9Q9VnruhZzDJTdCQ8osiI45SMceKMvUyMkkQnZ47GzlSOQsr+GfuJ/kjqJnrs/dR+UPKn4QvSfk9PE/DP2y+D9q/gemmPDNfBJikaSScTNXB2X2YccYx7Xk1eHh9UfBGLZj6SRDGlGzHiuVM1GP050RM0OcGjBicY1Ijj5Oif6dl8olyg6+TIri0ftFHsx/SqPWSHp5ZHys/Zf2LE8S7ZPN+COdEpcpEXY2Szr4Flsctq2x6dNXIzadJWijT4mvqkN9GXTP/knjnB9kFaRRLE4vkK5Ecbj2yzmRZY0hxXwRm4ro9Vy8itlFN+CUqObFqJoWqmLWsUHIx4ZZJcUR08MMrM1ODsy6WMmmj+iUY5I8ZEYqPSPCos5ce0anLLI7IzOz1KMGX052Y9ZzVM13xIcyU0/k5nqNEdT4HqfrMudSjRK6EKR6pJ2MSGWWKVMwz9RWZoOUGoi8kNTNKj1mzJlbVENFKXcmOHBUThP4J2umQlKMXJMeRvwKTSGzkLIKaOSOSMeSHAk+rOYsldoyT5D25MU2NRMP09k5SmU5fyItfxQ1Rn1EcK7NPqVLpjl8mOdxH2ZkyD72SvbDOnRqf8TPVJSOZjg8jpD0zS6Y00zkzkKQmcmci0NjTXnajBpZSlUvBKEMdfBlmoRtFdnIUjC6mnIeW/BLMiWqUfBk1GLKvq6NRkjx4xI9GHHa5McI/gn9DoxQWSVGWPCVFkOU3SKdfUahtHqHqDkWWXs5nMx8p/xQuXKieizJcj0212T/AExama7M36Xmwrl8HIxXwtkZpHNRlzR9DlZyTI+TNrIwnxfwQyJqx5oOPZPBGx0SpI0+pjj8j19+EOdXZOb8jk2Ry8emWc0OVHZZ5IeezTQj21tmydKMiUk1Q4o4i6MbXyOcSD9R8USwx8M1GPj4GWQjxgkUZnc2cj1GYZxk6ZjdeCUhtV2ZHUuj1Gc2czmczmx6aJKDi6ZpsXpw7Fkiu4Lstlik12j1Zfk1sXjyX8MxZPhjlQ83E9WUn0K07IStGXDBtsxtwjQ8pPNKXVlD9XF/LpMaxcemy0Y0pRoj14JttnoqTtllWOJ2WWWaPy1tkTa6J5O+jmNlnMs0XbYzVSUpUvjaKbfRilJx+ryWZMEJf/ZJOLp7IhKh5pE8ross5HJnI5HLbJBWpk85j1DTtkM3qPxtZmycI2ZMvqfyQ0iyk/JLNCqo5dHOXwT5MSe3Jo0EoqP9jcZqpKyf6Xin3Hol+ltfItJ6fyR01OzDHG4eDPooSVw6Y4+1RbHiryaZS/5JwytdIjDLFVRqEuNxfYxt7uLNBiVN/O09HL/kWBKNGPHCD2aYmZ19e1imctuy97LLJIyyqJ35FNmHlF2eqj1CU0Tkr6HQ6OhimcyTH0PZSa8Gnm3HsWo4OiGd5ZMy+NoZliuxamDfTNU1KdnH2YpUzqqIZ3B9HrZZeDM8y7ZyfsQr8mOUoPojmn8oWWf4JZoT/kRg59w3nJJmZpuyitrLOXvlPqyWWyyyGQ9Sh5LJNseze6ZZYx7UYZuCJZ3z78GPGoQ+kzeD1EiU1KRN9UjFpcuX6pMlpHFDQhIQmYVctmjUxUZ9e3mxSOY8rHI/TsqjDsyJJ9FGbJzY9rLL9jftjjnQ8cku9qYhliZJ7Wchy3ssb2bpWPPy/iTc0/BHUZI+GfuZyX1E4K7stR8Gki8mRKRxKNZj4ytESxM5GkdyEhms/wAnttiZyLNJo/U+ufgdVxj4KrwNclRLQ3/FmbBLH2969t+y3tFfkyw4T68HF/gjFRNRL+hssva/dyORyOX5McooWahrETaXg4sWNeTRKXqdbNmvg+PIsS2ow5fSlYuxujLNzm3tXssVNmm0EVFZMv8A+GbN1RHIeo7PUvwKZOCkqMmJwdMX21FJkiWLlT/A3e2WPKPvsvZl7XsnQpEiSa8k3b20+p410RkpK1trs6b4L4FE9Gf4FFvohgYsKIPon2uyWCiSa2oWy6L7Mn6hNojLJklyZTOVHqslqaMGti+mZceLNGrMsHgl0xssv2wkk+0Sgn3HwUNKS62WGajzJeb2bpWdi8kdBi49s1GmWLwcUSxV3tY37LLPGzVDhfyShx6OLNN+n5Z+ekLHwXHbL+my5ck7IYlDaWKN2cdoQsZxJYlLyZ8fpsWGb8IlCcfKEXtGKIeTmOiombGl2hI5P8ksspKn7b9iZGpeSEvk5Q5E82RwoyZre0lZHSZZv8In+mzSuDsj60OvwXHPjuS7MmNwfZKvja96IpX2SS+BMZE+SzFhlmdRRp9FDCu/ImiXnZv6OiK6KJbQxqrkOmiU41SRyRLLG6sjD5ezRrMCj9URIqhSFMvotjZ2WX7K+x/F0QkosU1LySUb639RkcjvolLk/qMKx3UujU4ozfRODg6Y/YnvYo2OPHbDBuXSMPHFGolkZdDOQplDTKIzhjfSJZGOY2ZZUiMeUhbM1v8Aj2vsss5HIbOTL91ll+140/J6USUEl7WqSXs1qXTFC43ZdF+1HIllco0zBDnKmRqEaiTz8DDk5/IpnK9m6MGXmtpdojhdiivB6aMkOJlg200RXyYHygUUa+VY6/Oy2v7SZZfvm6Rkboa9l9Fb6zzWz+zinxZiyxZqMV9oxriqE187NjTl5MSUBd7MURokuSo8fSj0JSNPjlDyUMnpVklcmPQ4jUaRQXKJRX2K9i9+RN+Bt+BeCUNqFBtdD3nDkZdM5O0ZcEoK9q99if4MeSbVMhiQoJDkjkWJCbQuz5OQmxoWNcuR5KrZ7JE4/Bmhwm4/dsv2uW2SPyi2ixsshkS8mSSl2hkcaXbFjjL5J2ujUTbdbsrdMoSoikaeSX0sn0c2cvyYcXPtnoRMeGN9ktPEli4oXkVJlkhyrdM8iW2Q1ent80cO6Q8b/wBFUi1szkjLCLVosssQyeTiOaJY/kls+yhUXsjsxxbIZFfgyWxxpXZFcmhM5nMhJszRrZO9majHPIriR5I5PyKyFNf2UNDXRqprioMyfQ+kc3Ve6ivtdb2McvZjVk3RN2yjpKicYsaK2cGvI4ted0YMa+Rx76LFp/U8H7R4+/ZhnS7HU0ZI8WIplGGMrJ4k+pGfB6Xa8bLI4sTsskzm8j7MsVX1Evffsr3PChxkj6jskn8ktrLIOkTlu2ZWVtFqPYpqv7G29krI8IMxwfKxCjbMOOlbM8rXRRxKIJUJ14Mn8hFtCk/JyY5tJEszfTJygvkepxmlzc7rwXtqLwSv4YskJ+GZZXL319utmSjY18bUOjmqJOyxsbH2S3vfHKMX2X2Y8hHJ8GGClIWKlSMnUdr2b6oeShz5MTLFN/KOcU/BlzcvCNdqZY8f0+WLk+zhx8Gh+mNC21n1dDk10epIjnT8j9l/bftyx+SS+SxsbLLOdvZktqKK9ibRDPRp9TciGp/+RllGUbR6gpEpCk6s8iW1nIkyzWQ5QMcXL+KMeKTuMkYbjGjFPkiTpWZO3Zng1K0enZLTWxT4Pi/9J7PvofXRNUxsb2ZVDe00VtFpEpW/ZW0JuDtCzWPJ11tGVbdkRIbHvQ8ay/QzFp8eHHxxonjWSNMlFxk00RbXglNvztPHyFjj+DJBRj0Yv0/Jqe4ql+TN+kZMGPkny99/dyx+TJG0S9sMTkSpLoctr2SHBpX7sTtEF2TSIwsWNEYHp/JKa8HJbUUOVHNmk1HqRGjPpvUfJeSemmidxLRKT/5PUnXZDV/VU/BpdRBx68ba39MU/rxefwSi4un9pOuyc3J2/Y3vJWiUaZmhTv22Mr28349l7Rk4kZpiZyo5nIeR0N7J7yY2aXM8cuiGoUlbY88T1YMajIejxv4JaCBm/TZ19DMmjy4/5RMWWeB2jSa6ORCakajR49QvqRq/0zJg+pdr71HzvONonHkqY40P2v3+n9HLaNeD0UpUzJDGl0xOiGT8nNDkix5G1RZe9jGJ9kMjXQsqOZ6tH7pr5Fr/AMmLIssbKryanS49RB15O4S66Zo/1Jp1MhkTGrP1LS/t8vXh/b6PHsVjRlj8meH/AFtWz9iRPA117W48aW1lj2QvYt7HsvJHsT2Y9seaWJ2iORZcfNEMnEnotHqn9UuMzP8AoOpx94/qX9Gk1GTE/SyqmY8yaNXp5amFSMkHCTi/sv8Ar7ElaJR+GNenLsctns9+TH7kYYRb+oku9o+SfG/pISSVe5veLKKfsY0LNLGqiyWoyv5JSbdtmn/UtTg/hIw/+oIT61MLJ59K5J6dnNV2fqGiWWLyQ8r30abRf9T96HtlXyZoco7tDxtLsfsoa9sI2zNUXSJZE1VCMeJy8Dg0J7X7qEhFlFFDRImP2aDMsOe5CnFsyRVXEeHBl/i6J6TJH+xqt4Y5TdIwaVY+35Ixt72NbvZDVklTNRj4u1tZKd+yjwOV+1Mb2RhdIypIROkqT9yr22J7PaSGu/YzFr8mOPEyazLk6b2hnnDwz93GX+SItPiy/wCORDRZVMhjUPBHE32KKiuvcmMse2RWTjyVDVOhv2JEdPaMkeLr7KExyv7iGWWNnLacR/Z02jcvqmRXwhYS5LyiM0/fQ9q2yR4s1MP+l7U6P3LolK9279le6PHj2PaFX2KEXIywUWRjZXssvajwWTY/bW0YuTpGn0ah3LyQx8hYuP8AEUvyUOCfn7D8D3mk0V8Myw4Sr7SV9e9Pa/ZFKrsbEODq92909pvosfvw6eWV9GHBHEuiGL5ZHakVXg5fndbIW9HfxtRkj8mfHzjuq+R/17YwcvAyjFj/AOn4MmGLja+1e0U/JLJcaFFy8El7mrEhj9un0jn3LwQhXSIY/s2Iey3ZXztOFrbU4uLv4+xDI4eBss5Hryqr+2mQd9E4OJGdInK1XvZfsjBydIwaRQ7l5ErIwoW9ofss+Bbf1skJd7M5djMsPwThzjRJU6/079kXRCXJ9meKSGy/dL2YcEsr6MWGONdEYtkcdbIr22f/xAAzEQACAgEDAwQCAgEDBAIDAAAAAQIRAxASIQQxQRMgIjAyURRhQAUjcTNCUmIVkYHB8f/aAAgBAgEBPwH23pZf3rWyxo2lD1r/ADsc93jSRCastC40a51TF7b0sssZTXdCNxuJZlDhll6WX7qKK9tauTul7GeBau/ohlTlt0lQpqHY9f8AojlTNy7aMxysr3NEU2iCspDlekpTkqOy5I/J2SJx3GD8K1rSvexUceChrRUybE22UY+XTFWqROMY0SrwRiqsl2E1RFKuSVaIQ1tzadVG4kunqNip8mKSizHTnT0k1NOLFBKfGnURbXxFqk/JP4mJ1wKl2Lb0jKkbyT5Ik93gl/Rh/QkUWLR6JWONaWNF8FiEVZHgbsXDrTzoi9JWXZFkiJlqNJMloiNXyTxKTv2fx+eT+PA9BXZ3INEu+jafsgSqiLpm8SJkdIupo6qMU015KFjTdlURoa5050Ym7oTrkc79j0RZFjHF7iXcj2EWWIbFJMaFwqG/jQlXchkm+bN2R+CLb7oRwWKX70bLfsix99HGtK0Q5DWiJtPggqVFnN2PJvfJPuR4LsfuRY0XQudHL96LSI+49Eq0brVX+9VpldQbI/GKRuYhHd6oerFrGNs3JaR9ll6ciGz5EXQ5WWWdxRMkpVwPq8iI9Q3+Q6n3ZPApP8j0PluvSUVJciGzdeta5JtPgVyZyclfvRexCVnUeIjJy2iz/wBEXasxrm0bW1ei1r2xeiJOjcjcjeihzSZfkctIktFHcxJk1QltFpmwOUrSHgkekxwZ8v2b5/shlyXVjXHBjamZ5LD3F1cBdRjfk9WP7LRY/wDqGNfP6KsSpaPnJ/wUTg5dhY35H+NEVKPYhKhrkaN0v0fP9FT/AEbch6czI/TVykbdx6W3yLT01Pufx4/o9GIsCMkdroS4sYouSEmluN6kNisguDfzROyD41UmuwlGSseJD6eI+lj+iXSoljjdI8FEomTCvB6dG1mwW5M3OrN7RiyuTJOlYsqPUib0WWWXpj5cpe9zViFA2Hpm07dyLx9Q3OX/AOCEnwvZhq+RuJFJk2ZGY0k6HjTI/GRl7aw78lUUhpbXYvZgittnBRKGb9n8a/zZOEFGorSiKRsPSHgX6JdPEfSIfSEenSfIsca4JQUlRkxyi6Ka7nJukepP9nqz/Z68xZp1wiOV41TQupR/IievA9aH7PWh+zHKD8DWPyjNjxRfBilGRtQ4o2olBSRLBih27jpFmKLqxpmOFk+9GK4sySc3yzGv2J8rTNGpbifKsxrHVn+2Trdxo2Y8alzJk6t0LTaQToaK/s2m09JWPEjJj2qyzYbGSyRiTe5jyrHhc5eDL/qssipcHQ9U8txl3QtHG2bB4T+PH9Eumgfx4n8R+GQ6el3MmPK+O5slHxpRw+4hIo6hNMxfkijJNyfcwZN3D7jkkS5dmfqJvJS8GbM1C13OjzrLjUkTIy2uzLkUnaNxZCn3IyW/k9a+xkSfY9JkJwgqZ66/Rkmp9kRxjxC+MShIjj/ZsorTeOQ8r7IhlfYTM2T/ALUJGPMvIpxl2Jd9M3+5i2UZ27qSpn+l4WlufkXBtHomxSZKKk+T01EdFnC7ihZ6Q+nj+h9LD9D6NDmkTyKKtksssiZi/IhnaVPROUHaG75Z5NtGzfwzo8KwraicfJuibL7DXA4mNeDYKLRRtJY+4sfBGFMXcaHE2EVWl6UUhxsyLY6MckpJvSWGLZ6SI40ifVRXCQp7uSGSK7kafYz4Vlkono+COJrg8FDgbGUyid7hKzaPGmQjtE9NqNopMzXLgxqvyPiuxJeRMx4nNmXBt5QkZIVLgXBhkT7aN6NGP8jYJFE5KCtiz2+ULlG0UW+xtaGUV7smZKNxPWb79yEW3T0ooyL4tI9OiONiwORjw5MfYwRd2yzLkp0jeyPyRkk4KyEtyvSTjFWxtXwYopmw2CRRWtFE3GPcpVYssLP+CGf00R6mEuDaTa3ksbfKIxbjsYtyVFUS7EOnbjY4NEYOzeyKbdEenlJtGXoJz7EP9M/82PplNJw//qP4kYtRqyHTuKtJIn08cjq7/wD0NVwUIvWXYzSfbSOFPkimmWyxkl+jayS2K2RyPuYp33L0k7k3pj/HRwTJwcVwZFfcURWQ5XJtRtNptNptQsz8idqzPk3PgS4r2UYqkhxKRsPTijiqJxpmPI6SJ02UKK70RntdmL+P1fySTkj08ql/0l/9npf+iJOUfFUb1ljV0xYceP8ALn/kz9dCKrGMsv29R4YzHXkjErSiijquyEYbii2y+OScVfGkMkkJ2r0Y48npIjjQlpRSKKK0g3TiRxDxLwSjt1jG3RGG3sJso5Iwld2UOK8kaHpR1KbZG8b3QdMxf63nh+XJH/Xv/U/+U/kJpKhZmuzOpy5Hk5kY+okn8i/bZD5OkdQoVz2IvEnbfBOWOTtGGW5/Je20dXkfCELqF5PUbdkpOSGxNDRj/HXaVrWtaUJmPvo4onTNpRGxJiTOSnpWi0ssdPuZUkyXTOWN5F2RhT3Wzo/zZtM/SudTQumyPwYoyjHkv2SVi7mTFvXJshExrGyl7eOxNRfA8cfA4R/ZGEo9htL8itIxbRC0WXrRXvUeaIwrVwRtRtEtb0v6Fh9aaRl6VLH6b7EsShlcToPzFjb7EMWyG5oxL4tS7GbrOmwralZLPCUvjpZeuV1HSzE24+3aijaekhROtVS3EG6LMcNq1r65ZcRvjfGrFpQlrQlrRRWnS4lkyKLMeJYrc2OWKfkzdFhyfnEx9HhxO4owqEeeSeS0db1cceN7C/3pgla5GVpRn7D0wfh7a0rTP1Oz4x7ii3zLvpF0xdR+yGRS+ytJGL5w/sdInvl2Zgj/AH9lFCu+CW59xwdn8jPHyR6rI+5/KmZM8pHUfhzr00lde3JDeq1hHbFLS/ZWmfq5N7Mf/wBmHFbNg8SojhruShTI5EyMk/sb4ERy7U1+9cbp/e2yiiMU+wqS0y4m7GqdadPDjcWb4/shBzfB6cI/kxyjEyKpGP8AJHpRl+JKDj39rKI9HGx41jRa0o2JmTBKPMSOTJB9iElkX0NCf70TcXyUUmR7aRVvRj6ue7sYs28sUvrQpUKV8m5GbrIR/sc9z3aQ61VtaolNvTD1MoKvB6h2Mk0uCKoWSlwLqK4HT5R6kUKSfbStLJO0bBJlMjfnSkKCXb217XwKNqmQyJPZIUo3SPT40Tol1MI/2yPWx/7lQ/TkVLDP49iEr7Cv3MV+dFp40nkWNXIz9VPL27G1kexQo/Pkb50WmTO7qIpNMhCd/JlOuBJmTK3wtLOnyN8PWjaUUVpX0X7b8k8SkrQ4bewpSrnXYhxVckVt7Dsxy2kZWr+my70ySpGW5yuWjjbFo1omtHCc1yLEQw/sSESfA9en/L6KK99Fe2DaFkkuD1G37Vz7Onfg3c19FCgk7Mktq4GtztixbjJDabCq0Ssyw2vRDzG99xZWQy2KX7GzLxLXpV8r/wAeKsglft8+zB2+uStGSDMU/DJ8sartokR47GROQ+BaOWkeCr5Y8sUZpqXYWizbVURdRMxZ9zp/4sJKPIpKy+RS1c0u4tYyojmRHIpfXlgv+18ik4ocrFBmwobQ0hj7FFCZubVHCO/Gi0ZF+SD3K/tor2qJOiL4oilRRWk4N9jHFruIlk8IU6FFEIrv9NjbM0X+SMbTRtRRkybeD1mTyuuBZn5I5NzH21iRXBa0lCyqG9IGCfxo3cWbl/g8scbNpRtZjk06ZRWjPJCFiQpC+mcqJxf7MdF2N0ho2m0yKK7mGW7Sq0RiyRhxIbRaHJWZO/s6ZO9xHk283/hWXql7MjoirI8IsSdib9ll6tmWbYnwUPqXj7kep9TjSyzqXTMeUxz3qxm5MtI6jNBLuR6jLN7cXBiy7+H30cNy1RtUCD54F76+qPUNdxZYSE4stCmvBjleqVk4c0Rxm0ooitXybStGNOROSqhvmjI9sR23bOnktxelnVNuVI2PudPJSgqJOlZ8Jk8cX8UjYl2IQtyFBIixNIyVdovSGRNCIKl/gpl+NYui+0kKSLIs2OxLRL6ZJvtpPGemrs6rdwZN0uTol8i70boUE5ORHHaIf7aHmZGW5Uxwj3jITbVbzBCvNihrJa41pHK0Ryp/4COBa4pcUzE+dpQl7K0sX0NE8KkZsPA8P/iLDOGS0iPGkjYmLHwbESgbGemyEaOnjyMfHcteNJKhIQ9FIxZPD+9FaLSJ3W5GOW5WJaULWhav3yjuQ40yf9FCEilZXBI9M9JnpMWJkY7UTurHklKVsjNxdkZKStaJe2WZQOm61Te1/dS8Hn24pEJbJf8APucqEV7b5r3TiOKNljihI3IlkXYWN9xRK1SNh1OHZLTDl2cEc0WR502iiS6f48GfC0yzpevr45BSTVr6qEq40vRFPSL5IvcqMM9yryJfXXuascRm0pDpixCta2xCWmfFvRPBXZHoM9KSPlEXUzXkXWTMXWxv5EOoxz7MnCORcnUdK4ji0YOqnhfB0/Wwzcdn9iRVa9tIS2sUtj3IUky/s3c1rvtEXK+VpKJtKKFH6JdiUTabTYein4H0iMuNwYot9jBlngkr7HElydT0Vr4k8bRGTR0ef1Yf39XY58apaOhMxS8HTyr4vRe+M79tO/c9K1ZWlasn7EiieJT7ji4T2slDcY8+XEqStEOuxS/Lg6nBGfziZMLRgzeg7iYsiyQUl9K5fvSIumJ3yiEvUiL3172ZG12FoyN1yNc/RQ0NFFaLRDxKT5FigvAkkqRk6bHPuifQSjzjZ6OSv9w9L9HR9Q8b2S7fRm6nxHRaPjuXpLtwRGYpVwYp7Jf0/Ypp+6/bJ0Y7atig07vSeRR7ikn9V6UUUJCEL29TB5MfxPkiE7fyRvnHuLNF+yUlFWzLnc+3YlNR12/3px7JWuBMjLcjp8m5bX3WlCXuUfpyK3VGNt+NFfn30V7GtFovdPpYydkOnhHRwTPRr8WPJKH5InnhtJTcu5PMok5Ofc/49u19yJXkV6Y3tFLY1ITtWivYyWamRla+qivtWlCWqf1ZuoriI3XI+pXZmyEvxkZMM4+BDOV20RYnRengsxS3Lk6WdPY/az0UJVqlX1S3Xxq78Dboxycl7q9y+htLlmXqHLiJPNsJdRv/ACJQfg8EMs4dmdvbEoj35F3PNaQk0yV90YsnqRv/AB3eqkrr6F9OTKodzJlc+5kz1wiTGLgc0/yPTfdayvxo3XA0IbN1s48nk8mOXhmHJ6c68PV349zaXfWT8EJtOn9ja7ChTbHJLuL7svUbeESn5ZkzeBv220VpSsaEJjEh0JrsblzFCvyQnyflE6bJuVPuvolFPv7Nkbv7JEZqQ427EvslJLuZeocuESkkZMljelDF3GMasUTzpaPFiY5eCcqWkY22zbxwR/sxZPDFL05bkRdq/wDInGl8TA2/syZVAnkc+5LIkSyN6MvngYi9Nvk//8QAQRAAAQMCAwYFAQYFAwQCAwEBAQACEQMhEjFBECIyUWFxBBMggZFCIzAzUmKhFEBykrGCwdEkNKLhQ/BQU/GDc//aAAgBAQAGPwKdk7QgdgELps6hANEk6bN0FY9e6giyIjLYeY2cli2xsO8gflX2dF/hc+isuqkIKFKnZG0ENghT125LVZlXWazELCyqwg8zkmtcG9SHr8en/cv+4p/3L/uaP94X/d0vlf8AdUf7wv8Au6XyqnksoGoBawRORtEKOaa26LrZovIkzZuiARAaJLv2TcNv+FGKTBTTOi7bI0xZIxyV+iHbJOkb8LDKJcu91YZWTgTICk6CVjylSc0D9TjslxR/dHrdT8K60QVkBzTWzKPdBkd1EZbB0CaRtHIodAU08nLDP0lE9UdjQcpk9UXREBNw6LfzOqkc0eqtsGw7By2AqyCaeaw9VB2AyRoVELPNNqD6SrItaMrkpwi0XR/Snb/ddJ2dlKGwbQUR0Q57I2CFPLZ7/cA/yGezJGzcI0jPZCn229tl9masbarqgijzXupM5qeSInJTOVkwj8y3ssyr6hQUw+5RIQnKVK75qBomjO0pobyU9yusIcwmHRciLLO6xnuiTzXsr80OaZH5kY0uUOUKOYWDUEoemBcn0nS6JKBXuu+wbI2BNLLljr9kaj/q5IGlPurt2SLFqxIodEJyKcNKjbKq2QQELSHJ0aqydQ+stJZ1I0UTlkgdCoXK6nZ09M7OnqlX2QAstlpVlkVkVki+q2YyHVRUDS3QRl6MU6rX1ADPM7JlZq22F7r22FZolZ3V1/jadgCceavpsvKC6TkiNFCk8kakdEHi8Ig5kqVbNCVHPa4RfNb2qcY1laZysRupKcCs1Oy3yiFcwEAJUjbhaBYdgE0Ocx5LZOHRd9oa3VYW7HuxANfy0WJ+GeYbE7YaJOawzAdYqHU2H+pOh9PpvIllVl8wSsQq0nDo5aETeCiBzRGwOGhVOo7Qp46IMBMKCghWpi9M4gnVaQIpucSByXkuYM89g2TOZUbbIBOA0vtK3A8d1kbo2mNVwH2XAfhRLAY5oLhK67QVUcc9FdrQvo9kXNpPIaJJjRYQhVpCk2pFm6vTmuBbGaLc7Lec3pBlWLR3Kc7zmh4yadVhkHssthLm36KY2ZbZQhXOy1lms/vcOm3HgdgmAY2F9BzDGY1C8itxYZRFQwwXKdRFKiWf0LEN3ZCuZ2Ts7oNa2IHPPZ09FtkonYbT6LhYBYf5Tqjv3Q2SpjZDRdbjSecI4hB1G0EKWghBmGDqeaOzMynERu5yVOnojkFjxyYzWA56FCpoVHIqG6qEArtg7Rz2tjVBCrgOEOguiy4cU03a8kKujjhREKCg0Z6InxNbwU6gqoP4trSHEYJuV+NV+QsP8OHXiSneG8J4amHZSW5FHmDomU/Lp1M5xNlF5GZmybRwCxmYum0qXE4wJVM+M8RSAI4WtJcEKfh213GbTYJrfD1HEkXtYIUgA7xBgvdiyQp1K1bBBENdAUt1QabgLzhGN2saqBfZgo03PdyC/wC0enU3jC5pghRUJDegVnYgoQa4kTyCY0+LcXHNvl3H7oQ44ebhCewZNcQh5fFkEQX1qrQ7e34Eq9EkaDEpd4YMLnYWOxk9ymOfAxzH3HRWKgvCu5ZjbcbBTps7nkiJ81w5ZICo7dbkEG9UfIY1jiL4VVeHFwsJTqgqOaCbDqpqOxOOzCuqd4qX44MDts859L7U6nuvE1qzG+X5kNnQI4PCZa4iFLadVvYyhgrNHLHZHG6mQ0TIcmt5mEWFgLoiITiWsFTFxRoiTWa0tMFb3iqfwsNJ7ah5NzVTxVatTaGjgmTtZTfOHWFUbSBDGugSqrvEgkCIhRvD3Kg1KmMfSg3G+mOeaLaFTzKYFnRE7Tse6SLRZMeGk4hqg9ogOGwbAcDzGVlvuqj2Vw49wvw//Ffhj+1EeWAecKSBjYTK8twwvPCefRAhpHNWWBxictjDUny9YVVrHOGEy2Qn+WZacir56bAoPpzXsmkUyameLF/sqdAUQyngaQUCCQUOS8wQGnJSZlBwzBRNOi2SIxYVqHBAYKWLlCLC54nkhoReVVP6yuKOiJiJTaHkUwR/8n1KQmNquqVPEH/4xZQxo81+g0CFHw1I0Xzd4Kf4hzqrz9QyusIp65yrIrsUPLYevRNJOJ155J1XwrzTN47K/jK39yL3kvc7MlFuFjmnMOCqV6NJxfTGLe+lN8wQXNxDsUTyTKpcaz4BLEQAKcaDY+p9eTf+UWHJ9l5YF8v2WFnAwYWr7R0xkifuMOmy/FpG2UEc8LcyFFOh5VPkFjqNgkxspj9QRoUn7zvxan+wTiOaoMBbDWDK0oztlE6DGVMLee49JQa290WVaZp7uohPa0AuJ1WKBiBiyqCpSfBbAJbwrw7P1qzL9k3pmnYScBEFBrmkdysLPFUXVDxPnP8A9I06Vdjy5ws07alQuwwyJ7lOr+Y1wLs8VyU6wkvT90Q0S5Oq1auGoXXVRgfDBkUaYIIbaR6cLWlznHIKn+myJ/KZ9FIz9MICrUwk5bNVqtUcNm1iFUZww6xQoVqf2osXzmvtDUA6BFwxB30qQiS3FyR8ygwsfbDHCqWAAbkOjmDG0EjENQg+njLX/qRGgOx1SXYmnKNsOMDnC8rHRdI0N0GycI02XaHd15QOsmBBCipU8Q5/NuSu4x0apaK7f1F2fdYxfmVfNXRgkS2E88zsz2CnSbiecgmOBhzTKxE1fMdm46rJBtOo+DniCL2s8+no+nddtlN9QS1rsRC/6bwxonVxzK8vO8+lvhdwMDYtYlDsjMx0U+mq4cRbbZAyV9hQ2W2g7yYGzB2E7GsmAc02mxrhbMnNVmVKNV73kQWNlYG0apfq0lUcXlAZ4WadygmaXREyFToM+o37KMJcIjDKBxS5zvgbXBeWHPw8psrn4WSmQAgyo6cPJcEqvWphjXgADQp9J9Ylr7EJlWkYc0FYKjmlsEndQZqqj9zw9HMw3M6KiBSbTfTbFQxxFcYCznbVqueGNxD/AFRom+c7FgFk1jiW2mwVTw1OlvVHb1Q8uSIwYp6oMpnCgBy2x02Nr1eJzbc1Up8jKq9BO2dEZddhkjosQnDpKFGu7s5RIOzNM0vEoPPFwv7rF9JFtsKdV5nK6L+btuKd4FSJ/h6gkgfSUTsw7bH0V/EVBIDcLLfUiiHMcb5gL8GonDyIkc1KzRHNbgNxqdhxui1lACvkgPDOId0K8qqBPRDnyRUIta58QcuS57LlOYbwc9l15jr9FipgBwWNrKRqNyxiQjSqUvDBpzw0gnH04iVLclb0QdkK3otSn3QxU8JGvoDmmCEMdRlQ4QZag/w+AGcy+Cnur1A55O9F/wB1JcoVldV/E4ZLWYW9ymjN5OJzk1yr+Jd/S352E7ArLKNgxvFuQUv8QVhY4lmkqWmLIuquJYWwVi3gdFUptcXkj/8AZl+yxUXBzHdU1uNzjyIzTGDRvJADMr8P90N6HfU05LiYSToF5VTzC7D9WyG3KLHN35hQc42hoy7IDmUMFeth0vZOvDS25Rmq2DY7Y0RjUbIW81xHTMhDeLp0C3mvA5o0nVRvaoVuNlQQ8D8wRe0gxcbbKUReZ23ViFHE38pUH7kdEQiDSLr5q1F/wo8k+6cDtHiHmKYMSDcKDeNdkbIBjEITmYQXWxP5Fe90HN12VGhrDjGHe0WYJRhvyt47CpOq1LUDTEnNfaA9ArNcp5rGW7pyOy4XuroOYZ6bcv3XAVdhCImRzUBDsststV9oX27nNbzaJTGeGquqaulmG6IsWHQo1X+Th/S8E/5QkaZqQdk1W4qVMY3Dn0RdQpMp4uMNysj1TQ6wBTKTRALoA2YCCIGzps5qS4+wTDSrOe93E0tjCplDonFYR8r9RWM5oOFp0QrMG8MpRcUHNzCupGaY6rOFvJOr1Px6n4W/YNXDTPaoFi8t/wDpEq4qCBqNVc32C8XVJgAGFvyqYqAlk3AXl0abgx304xmoZlCibbbq6nZuEjldWIf2UEQtVhm0qJz2wfRG3OOqOPw1OtP51Hlii7m1FpzG2/qjCB1Cu155/aL8Of6nEqTqsgrBVaVRhcHoegOGiykPbKMp+LluqCFLbFZLNZKeSurE/KiTCZSEiESSsLWgzrCxHsm0AJZSZNh87W906GwCFgmDp1VmyEx2FTY3XCFhDSFCgByAOX3Bb8bPdWsm0id1psEFGx+DJ4gppA/EJP77aLv1/wCyEoSSfRC3XW9BZigKMlI3lIg9EDKxKdgJsCsk1khuIxJ0VPwngxUcG2Lgpf4gUmj/APa//Zbz/wCJd0ZhHynT4akRykot/gaQJ+qTsCJDnO/qWNpAMaoQWA9ygsvQDhDrr8NtlDRTHcrgHwsgPZbx2/8AO2dl/uPZZenXZvEeiNtdznAEkNZ35qj5dPBhGEycyvf0U5qNDvLu05osInEE1g91IzGym2gwtcG78nNRsu5WdfVHE/AxolzuSigw9cSxMtzC3SQpe5x2OLDGIYXDmEXNaGzop67AVjHNbzpQ6KwOaxinunWU7HHJFBsbZ9I3mmeR2XB9lrBWZ+FIMyvcBe6Ozwg18obfDUdQSdg6D05SrCFGLDOq/F/8VLBjHMMXAf7US6YC5DkuIBZzsKzV5VJrssV1xaLJZbLeg4jCs6U51V2A6M12R4jwtOqBrwuWLwvivKqaU6v/ACnMqbrm6IhWy2O8ym2qCIvojKzTS9uJs3CcBlKc4NsBJRHLaEPQ1lNpc46BVD4mqG1sO4Jt/wD3adg9F9k5+rypAsTco77MXLEPSC4gNF7onFPVA6Sj0MI32YW4R7XQxMHfUot00V1KIGRdfZ/lWyXb0R19XumAi4JVjmL7C4NJDbmE7Z1lZ2RaXb2cFF26Q2mKhvoUWuEEGCsWkrFBiUYGwoKiz9U7LhWQB8RVc1umJYx4h4E2kqfPc4D8qxVXlzuuw7XVgG4GG/P0WFwjfehBuoR2Wz9fmGIY0mye7mfuAfNAOohEqSZ9GP6mf42NZyT6MCHHFKxWnqJVj6LFE7JQTXDbT1x8s15PhaQNU6nQLHXd5lQ5Wv8A+kSW4OyPkMZU5S26OFuBrnZcldyjkdtk7ZHqgXJU4THogZrEabaQz3zcrDRfTqPZxaGeSw16TmHqsSIXtssqbtckdjnAbvUqCrry6g7dVu0zyUeUV+CVjrsqR+kLDUb4gfCY7G99Kd4RBRg1Wuj6pTv4p7IjdDkJ/hlNQsFKXQTkmmnUY7dIwtzmVSpC5AyGiyvsqU6lEVKdQQ4TB9G7mro3zEHZEoNkwNNjcWGwiwhW2CpO8Fcp+I3jdQcRIYCVPlN9k0DkiSbBZtbjdqn08TThMSFRdb7Ux8ItOYKxhhLeadRB+zfoslMQhsIKKOx/oG3xFfnuj/77rJZbMVOm5w6BQQQr7Wl3hA6BnOaAp08HML7Jxjk7PZCnl6AsZvdEtIvex27zrc0cTS4dF9k0sbGR2dNhb9Q2l8NJOR5LzWGOSxOMkrHIzyTag0XmUTukyrmUdoVjE2UId0SUPRiJhYm6803ExoByIWezzHb1T6FPnN7BFtJ284ySF5XiPtaRzDkH0TNJ929Ng2jodjjUE2sFayhZym0302vZGq8zzqjm/wCFjpvELnbkiQbhRipO7hb7ZPQL8N/wuB3wpIIG3hXD6NFj8VTdU/KwOj5TDS8OyiB9LV9u17mHPCbo+W4lmk5+go7PZDbVd2GxsckGfm2EnNAybZIleS2Gt6IU9JlHznEcgEbbM1mpdMbZ5+gB2Sz/APJQzkvD0tX7xWm2k2BiIk7x1U+a0c7ypnwx7sCY2jSawicWEQmsAkkrzMGEDWVdNPz6ThyPpIR2Z+i6kSpb8JoqnC3UosNv9/Ru73ZDECrDZkslkslogbBv5jkpbWpO6Byg7IAJPRXat0bPILgBxQfTB0QTg272GYVmJrwG+eRxH/7kv4hpDqb79p2PZ4m1IiZ5FB7fFDtguFSLX+ZiJkxGxxI+lZ7COaqUqTcZw4oV/D1AFBa73CJhNgQuS4lEFyuxiP2bb2srNj3Wo7K1ROIqAgc1LqsDsj5e8AofZONMsDW5lyis2OR0KCyWWzNcSzChCJsuE7H/ANStmbKmJ+lEflClRsjaTy2gbGN6oguvyUJusJpLGPicwg5tNtO2my7ZX4Y+U1gHE6ITaQyptRwiSBKyCAjNYQ0TyD1BLZ5F4X2TAR0eE5zjJTTJECbLfNQsi4xCEYaSOl1dMeWQ2oJafQFms9mu3LZl68FYSNDqFZ2KdrmYs8gqlOq77WnLmuOvRWo1D/pVvC1v7FbwlX+1X8LU+F/271+CsQo6c1DibabHjzgxzNIV/Ff+Cq0G1bUnRiQoF4bIzNkf+roh2m+oyKBQP8SZ/oT4qPc7CY3NpQaBJKdUbRqCmNSEXCjSaSIG5dQ5xLjmsLRc59FcppqcA0QoMpmmBaQiypcC8qVGh9FWpWnggR3V6xb3C3PEUz7r6HK9Jvwvwys6jEIrVP7EQ0l3+iFanKBFF3xKOKkR7K7cv3VSM89jXtJCHl71Q3c8FeVP1YkaNSLCQToUHvp4iSphwXG5SKnyplsIbuak0yowu9D009U1yk8lJus7ankt/wAZiPKmMl9m7EFlsHXadkjP7mnyZvKs/wDVARAJFrqJspGYW9UcUS+mC7nKAD3hYpnuiRhWajy6Z/0oOdvXyKa1wYGtsA1sBZLJWBceivt4St2hUP8ApX/a1f7V/wBs5fhAd3BXbT/uVzSH+pb1ekF/3DP7VUrVPEmGNLrMUDwOLmXVCnOxVQ9p3myrip/et29F/CZ/b0WI+Vv1LTKaC2oThC/Cd7lbtD5crUWfKs2iFxUh7L8cDsE+s1047nuuqc9pOUWWdT5RxfXmmU6EGqTaU/xPjnNdhEhjL/Kk6qo3xNNrwW2nRE+Dr1GkZ03/AOxV6hjZcL2QHhqTursgPdR4rxlbxlX8jHbgWJ2aOLPXaT12eRUNPDmMae1hbgm0LfbjZqF53hnY6eoObdsPc9oOrdEalCuazP05/CwuI7OC4P3QE1m9nK9V/wDqat51J3tCvSZ7OV6bwuNw7hfjD3W7UYf9S4AVD/DCDnZVqLbta62yEN4jqvIxGS4DGMoRp+CDq1Nn1U2yCvOqUhI0FkcTO6nDkhIae63rSrEAaFG0e6iAFiwM6nCiHROkG63NVExfNCl+Wy8wObfRGKZQp3bi3iPTkFwBcK1WanEtEVw+rxXiTo2ApU/dQpQd87C9pg81SqeIDXhuctzClrvDezVxt9mLjP8AarPqH2WVQq1Jx91+D8uVqTPcqwohWfSHsvxmewVeq+o5tPyzpnsL2F1xFlGGrPVRUbLRc3X2VPCFdvoFTG7AdV+K75ViSUN09yi5zQ0cyYXEHFRVY91Tn9IQYXAtGUbCzVya59MMI/OJ/ZOq02EyfpbACa6qx27dGjgAvmsYGxri7APqKPl+H82pGbihKJQd5dN/RzZWHCabxlhdYrNN8wEzryT4yxLFroicIRboUF5lNjTV5nROe7Nxk7SNNNgVii81KhPLNQS6dcC3GvDf1ICQjLVai/vCAa53YSpx1W9wsWKechNYG4j+nVY/G1P4VvIu3j7I0qBc2nzcZcVUP6k5z2tJNriVjoNwH6mt12Oq1nlgmAY16osNbwwl04XG6u6mT0K4Vem2P6V+C3+1RhIHdWdUhEebM9EcD2e6+zDZ6FfhX1hfgP8Ahag9QieSgH3hOOIQhA+kbDi0XBu6LN/wrPC5q7ViLDHruArDa0a1Xf8A3/H3hLHHHqTqoRG1r6jPMaDdvNbogbMVOm5w6BXa5b7/ACb2xarA5/L6kGvrMaSYu/VVSfEtJpibaoQXGynC+F5x+nmiC8+U7NpOitcFYousNQktOajyS7ug2hApkaf7qDksVN1+W1j/ADAJCgBtT2urYweiu5ylz6jz1V0WtElYXWX2wlsZhfZvxDmmsqtbjAzAUynQTMbMJ52Wavmdl/RijO6YBssr7KbnfXcekdtg7bDBjdTnuddxmwQs4hcb2hWqP+Veu+E1+Om0frK+3rMef0tlOZSpVaoOjjAX2LKXhW/obdY8XmO65ol9rpzuZ2AhCrTrU6Tp+0xf5VLwvhJLKf1n6jzWa1XG8KDVPurljlvU2/Kuwj3WbgrVx7rdqsPurRs4VelTPssVak1rdIR+zJjm5Op0vD0weZGw08TGufkXZKwYez1L6HwVenUv+lXDp6qJtlKEOi6xWHNEAWm6kt+ERFp0UN5qZHZfiADMlC8hFrRJQGG5VGgwWptUQogzsz+4JsOgV1hfQdP5g5f9PWIPKp/yvwHHtdYXMLXDQprjSYxwbhLRkoEo46byE2kWmGcKjMKLgaItDbggyn8Fx9QlVGhvEIODdW8686heW2wwxZYTBOiayr4oMLhnFkS6o0wREajntg+lhpsmFaGxmsQe2AOSxTMNk2yVxM81vuId/hVPLPC8wUCdhKA5jZn+yc3SbbLo9PSUFiFj6W0WXDNfT7eh25ihn+6vTc4fCnyzh5Sp/hyAvpb0WA5TqpcWHupd5bDyRbTD3dmrJ4+FuC3VFznMOAHX0ZKagwqW1qZaCrVqdQnMCUL5L/dSVIPwiA8gKfMt1UFv7K41UfaBfjPC/GB7rfwYyLBYn+IcOg0QeH4mlf5WVtg8LUdiDm7s9FlKyKursb8L8II7t/6lZz0SXm/RHfYSBZEBuId0AKJiM1vUoOVwhYDogKbDiGSFSp9OgKxOIBN4xBQMMciokFSW3CgNIK+pSHkAWJV3i6xSC0XVuS0UgD5W83JcK4f3W7iaok+ymrSFT9QsUDTph0i+LMJpDWttkD+6MDFbMqYui6wnos5KzF+Y2ZBOfRpbgHFMwrYZcdVlHVYnfaD8rjZEfQbgcl0WSpUuHG6JOicC5xg5lTVDqjeWiwNZVaeYdkvP8M/zqWo+pqZja4yTYIneL32ARq1CajupTa1Nxpdskagdhfk5uiwOxYiJTnuoU3u1k3KxMylXQptzKYBc3/ws4XEg4clKsig90wSQFwrgCyhYh7rzGcTckXONztsFe5W63Cz8xVOlTnh3idfQfRhbnUGHNOweIYGtyJ1W86/MK1bSMlv+Iqn/AEyt2kT1ct6kJ7oOtbkh5Ze4+6vVf2lEb3cLMTqArCVwhfhoFtiTZESpbUhBxoh082olrT/crhxPQhHHRfEaBSA6OpUnw9WOeNAMpPb/AFOlMc5uQj2TmRdqnBKx1CKbDqc00uq1HEaRmjXDvNpn6hooUHLkomFnOym9rsJBmVh/iRUHMXCzaVvU2Fb1AfK3qZavxC1bviGrcrMPurH91lPZfhvXC73V2hOrOw0wMzCcG4j3sgZqgjKFao74RIqMnqhviZzauGRByRc5jmn6cQTXG0j91igZLTsFmeui3iBa6jFMfuiA5pqzYRs3QSmu3cuaNWpUDMOhC0azkENUH0ahcI1C4tuqzWqgQUQMuSgU8UdUSaEYbyDKuCEa2C1PM7Q4fTdXuFZzx2UByMjT5RptNRrdIKYS9zhhm+0CeIQiXC6i+IIqTcJlTkZVPSSVms1dzfcrcMrE23ROIuJXk1Hy6JpBrcj1Ku9qzJ7NWbh/pT6ZrBpAxDrHoxO9tlIBoO8LKX0iY0BTnOGHDugbXRtyVm2RdVAcI+Fwgf6len75qDjw9GqBSLuUwr4m8lDqc9YWRCzdPRb29/Upbg/uU4PhQGXU1ATzUhzR0KpNGGL5InVZLepuH7LKZXA8qxIaiBvdAt9xe3KeSLqlTgFuoRMAKTqy8IMwGcyStwASjfXD/uqjKlPC2YHUIjkjhsFnsvshNNSg8B2UhRK3XuhTjVrq4Vw4LDTdUnk2Veq5v9S4mH2W9SYfdb1GE2KPma4TkSopuZRYMmsaqtKvUAgSJW5UYuFhX4a4VBgKCxjgjNCmhFMjs5E4nt/dANriORarOHsrtVxZSJlcSdfUIFZZryjkVP8Alb9PEg0tg8gVFGrgd+qIQ3h1hZuW7iWsItpmwRa56bQpjeJTvDj8ufM7HPFRrQ3mvLd889kXHVCpscAJHEqbiDqiIV0zCNUWOsQpG0YQpfmBDUGkEJ0tcXDQI1L9pUMF1Mz2WNlL/qWiSR9Q7c1JbMFZQs1mrFBfZMJPIBRhjusLhkrKm0yJOiLmF2Ft5KLjrc7LBXOzhKADCTqsNx3UN8Q48xhMLy6zrcsIUsdg6yoFTzP9Kk1nA8oUedWhfVUb2WIUKk9At95A/UsFOHak6BeWXFv6tFiY6Rzap+0V/MnsrSjUwHdIuoQYxuLU9lPl0iXWjNQYC3SFIwxrvKo6YOIrek7GickDYnmLoN8IxjampOcIV69cCk1u8C6UKjX42Okt907AQDFpTnAzfNeWx5845NjNf9TSNOcp1WaurmAnYHhz/wB/leaKpe0NiDoFUc1jWyN1rW/+0fLa1rer1gIGfNSA1zObVkE11Wj5gjJAMqOps0AssD342/rEqW26BcZlDfQ3scNR3ViX4jgv+5d/cvxpV2Nct+g0reo4VxYe63K7Vuvat2NvErnZAzXlvEEKFLb4W3UYis14kN3nMMxqQoMghQ47uSBEuVmrhajIUuzQq4RiOqqNtOG2zAH4W5kc15w4XfsskJMdlhh3vZFuKekLw9drXFk4XQvJp07HMvRaKjKgGrdlIUDD8ViUT4oYv1NstzxEd1hP7IclvsLmawmsoOrimeMltymsoMDo+k8XyFUeHQT9JM//AMWKpUbTDsw0TCHl1cTncxGFASHc0HNLSAZ3L/CdhaWh18J0WavszTnuoec9260aBCnS8JhIdJw6oscwNKnXmp3SpcBi7LymbrpuCvMa0VKhuZbLQNsKXS5b7bLddhbOrkSynI55r8OH/pMKKr3x8rC6iHDmFulwHJbtN/clfiNHdYm1m+zlDn1u+JBr3OdQp53zRZRb5VP8o2GnjsLgKC4hRZy8p2Gi1p3i5O8NSqOA1jJyui9mRtJN15PhvCOyxQbyFh8Q0OPL6luU3utckQsOGCqrYsd5qMqZ2Mq0I5PGYf7J9TD5cC/X/hYcQeMrpoZTt8YV5Hh5c7WNAi0GXrG17mu/MChQeWuDcnFu98pp5rddPdABkgcWEaKKVSIyGqBe1bkdi02Rlvh8XVYm+RfQ5IYfD0La5oHAycN+GEKYZRDuYEIuBcfZQXOB+Vke5ELC128h/EYg39MJrqDnNdGTjMoS5ry+zQ1yDHy3qvNb4mnPIry6g3uWyWudKs5RYqMJ9ir4l+IQrVz/AHL8UrOFjJd/arucv+Vi8xgHIrA0QGa7MLqAPMjNBoBDuRyWN8jkvMexrToU4kA90IDmO/ZeY4tDBqSsLN1vJRiQbWrBjOZWKlXbUZ+lBgOyULwqnh38ebUA7ReYGtc7S4Rx0Tu6WKIa0tty/wDarN8zC8sIDnuET8rK6CzUtpTV/MdFDxB0OzC7h0QGupVjrkiIBJ1KlnvdZu+VhrVvKb+aEW0qrnNGR2Gi3y8JzwhE1MXdF8skukwEJw5fUm0y4bo3YGffY6nihueSDiHuA0yUufi7u2bqlxy5oggE81uExyWS3mlSGrNcS3br7V1/Zccd2r8ej/YF+Iz+1ThZUC/BDSo8ln7rGHNHRPYPEEGMoiUQ4LFPZcoTnsFhZZfKxDAEauEPqc3pvm0KZfMktMFfa+EeJvGNM8qk5ruYej5b3y7Mym4HP3rko1C4z0ZCwsaSejUyrVaWyIvssVqt8G3JCKjsJ0KAp1LEH6Lp3l+JBM6pwdJNTN7D+yAp0Wn3K+xomeihwheW7QICmah52yWOk42F7ZI4iXLeD/lAt8xvdoW5Wtyc2VelS9rShNIexX4b8WgCNnTzxoTTcTrvLA2m2l1w2CLG1/Mb1V80fOe41MgUcL4i0oAn3hBrzjA0LkcM050OSLp3u6wiSsj8LcuNVkpyVlga352Wse6x4RTk5IscYGYUOCiq/D0K8tlRr2Hp6fDsccmT6GUpOFp2RsmNoR6XXVeY5jwD+hOiywzBPPIrJuH4UV69zo26mi/G3ssWZa3l6IKhXWS3mz3UNokVps+VvErIKymDGy65qYWSyVgVFd72sOZboiGOxt5xCy2ZK6idmSyC4Vwq1I4eq3/C4erQvxY7lZU3f6luCP8AWov/AJU+U53dbnhwF+E1b4jsFUOKSX2lsIDYannUwDk2brE6o6VZ0hXKxAW6mFeXN0V2kO0UNrVMY6oB0EjvdebWaPMIy5KGOHVNqTIDtnl16OKuXbuGS5Amr7EKMBwnXMIYQPZOcXWaMkXHTLusLmNjtCOnYp1R04BzJunY2sbi5BFkh45pwYYGXdBzTdDG2eYlThK/CnsoIcOQhWcQOjQnbx/tCB87tKjzWey36gHbMotbBB5tusWC5OcrmnjDaVyWqdLfMMWvCAcKlN2sr7OtJXDfnjCgNcP3UsY97SLlzYV6Q+Vk4Hot1zleFOJvyj1Rqk27qxeOgWIUnEdVve0q21rYMExKdDqbovIdoqb6rRh4QZ9/R5YnDMwpIUq6DabMXTmvtqRplwmDthXdbFBTKXmVC1uUq7pHKUzxOFuCbw6UWgwyctviGD6GSbaeogbceL22cldRPtsyUrRZrPZkuAOHdcO25W9jd7wt1hztdbwH9wX2dMn/AFAreovCxMDx8LL4hbzyFGOVLQ6OqsxgHaVYsHZi/H/8VaooPicJQpivjPIhEEbmeILAeILD9XLmoGQ6yqZIPDyQYS2/NQxxnlCxeWztkv8At4dzD1vf+RU4PhyDsWX0l0okOE90XCQjTi4vOgRw4a1XmcvZR5hoiZaGtgLy3VcRH1INr1Je4aqBMIUBpd3dYnfWVGEq7ZRw4U3y2hxztkt1rB7LeaPZBzSSCrClbVWIHurG/dbzpPZEYrqMDVNm+64ZX4pVSHXdYmNFAKusDxJ6FSLDkVcSOQUiWnW8rC2s14GjhK4WE94WDDTnmNkY3fKEtvzlSS0dMMITSg9FhxHDyVsPYoE0R8KJBHdYanlt6gqRDr5LF5eEH6V5WBpIuCViFRjgfyrJNInNGiWMaDmQP2WLBha05DKUdgAEkqCd/Xor57MjCaRaLoValTEZWe0s/M2EHiNz6VdnxZVMFElzDiLtAPQatF0te3C4Dl6qkOA3b9V9DvZAPYHcgovnZGMunomtWDeih1RluQRpNBnRy3Zd2WWzILfpS7mgW+FzyJVwctFAY342C9uQQ3IA6LIx2WSlgcOy4q3yoDnH3X2jjHVysJQqOYD7re8Or+FasTGO6yFDqHwVJqGmBzKxFz2tOUw0lB0xiyJdmnbstNkarWMf4h43rcATpw3vhGSawTji9tVDCLfpRxsb7tzV2wtwvHObLeaXdQg5mGeqw+U0z1lRCjy3Yu6+1YcOqdSpPaG5huHCSgXGyYzw58QeeI7qgBpEZIBm72CaIaHfmVSqPEU4N76oNygIuL3dpThuE6WVTC8iq4ZAWUEArlsqdHXsjiI9lhDcQdkdU1tGDUcd4j8qLKkZbqluFcLT7K4A7FWKxy1lP8xCFT+Kmp+SM9gDLlNJzi6uyVcR7KxN+RW6091D2lzpzBXJGGSt9sfK3akd1LX35hXJU+W89wo8uowG/DCgPJaFwT3C5f6Qru/ZDMdVDmsqRkVuUGuBdwrCfD4HA/StyniJPDhUvoOAjhwwsDmuyvCwvaQdgKgCyudgp7rP6inB9RrGg727mqppuMTuo7WlzoCjw+Ilv1aKahh0XDTmv4VrZe5m84nL0YRYSjZUawAaYhw/39DHVPw8ij5bg++WqwtaSey3jh7hZq7z8Lj+QvwqazUMa9x6BB9SiabTq4wrWcEzxlNkMPHH0qaGOoOoQwNflvdEPJoNtqbkp1QUjYZ6BfxPiHtGE6G5QrsaAHGIWnwt1Wp1XqG+G+SvtqRA6MlXNb+1X833W5Wc0oDznHqpxx3KGF6kR7KdeqyxDVTC8zCCdJ+nkpe6dnlEYqzOFx5Jz5xToea7oPwlzv6kSRUt1ReKjXRoVdbrSQtxikugdFil5P8AUvtZxc81izCHl+Y094Rxh4/qujEKSwjW6DXtA6pvhvMpBs2X/wARC+j2Kgj3U3joEG+Y6F5TB9m4TiUkLLZU/U5WAXF8LfMlboLeqwy1w6hT5Lm9lei9yALD4d3XeCd5RYGtHGW5Kp4nxPiZdVbaZJCgfKxHM7MUrNZst+lb1aSNIUtDvlSxsK9usqMwr3UOTpNRtT6eSOE4utxC3oeebrq5EbYaPdZlXELFTdTf2UFkFE7rV9v4lz3MGhUUWvHdb7p7laLL904PptcRqJlfgVT1xIVKTi9us6KnVw2jQK5junNc52VgBt67LOIZreyhzj5Y/KZCfj3vNp7pnqm1aDvtAN5p1RY9pa4Zg7HUfEuqMObS1Nl5dqiMRq/1INbTNIZyi1txMAuUhvlUNHudKrtZXpNizpOfZOHl+Zi91HkspvJtDblcBJ5LE7OMkfE0WNqXg6wpe97JyjJB+6eZwrE2j4d55+UJW7UcRyy/wgxrXnGqTK+FrmjL6h3Tqcksdm2bIPqNxt1AKcabP1NJOYVbymtYHCBAXlsa9wJkwrxTpNzc4wE1lN7nEZnRNNTGXFq+ypE9VFmjooFQ/wByxebUeeQKOL9ypc+ey/8AaOEge6wVI6FYIxN7LEN09FZ8rDwg8wvENa1p3TDtfQ1lhjsSVby3HkLobput7AoaZOgFlDmE21W+yO6gS0D9WaO9+64vhy3WwOeJb1QgdChAL4/MVv27BWa6OoRqvwsjLusLn+b3utNlM1aJxYfzK7flcS3XByu1qNFwAAOilQim4jhxGVbfVwrPAViT2UVJCzUGk0+y/AgHqn+VXBafpaFgpF7XDUN/3W+Ds1KnC4SrFWhbzQVbZJaPdWEdkW889liVMD3XA0KDmuKEGh2InILNo6K6wNFysJh1SFL32/LyRY1wjmrFXl3dfSvpXJHA5yvPypjunUgGljjIJRaYdOc7Jpsxj+lRhCD4Jacnc0+pjLXAThwLD5jcDhiLc1i8PVAZMjdj9kDWqw5g5Zry6DgAcyc0XvdicdTsxNMFY6lQucdTsx1Guc7WHZqqG+GAec50XleXRDdAGpzQ0OxcxkhT8ukcOVsk+owwYvh5KSSSjDXImSB3hDA6nUAzBZdYqH2btRoVceVV5iyu7DUH1c+6OFxa13E0aFNe+XPbuk89ggIM8ZUcynoQv+npmqR9TuajhpjJoV8hkECWhoWHGYAss1orEjsoNVy5oBrwB3X21cYehUDy19C3MKi3wvzdlkQsOFv9yez8riFfZKp+d4drapA3slFN39qqNiS7XkrhGSRy1lQBNs8K4R8Ln7KTf2Wvyt2yJxMwjMTCvCuDHZGno0WUWV00EEAkAlBugCvkpEQuE+6kkSBayxHFlnt4U0WdCwluB6uourD5Ch4HwpY5Q4EqBkdFuvgriLvZASb9FnKkNlbwXAVZb26rQVGCe63WtapaGT/St5l1fGOy3Z7ygHtB66rjet4H2TS11zxIte/FFwQsLru5reMKXm6L61TF+kKQI6bea0WmzIrhHysl5ZOatsFM1yKZ/Kv+7M4Z4URink0rE0RHIrUnmUXPk6klFxt09UhSOaG+HQIXNSyo1h16qGu+St90HooFR0KznFFwpGQPlY27jmrfoeHqdcML/tqDDzwgr/4Xd6QW9RZP9KdhpsaTqAiRqsldWusWGBzK3yXn9lxYQsIM81hDmfClz/YLC0QFaiD8KRQav+3C3g0e6l1Qk9FuuW6/4UPefdFopud2URDVix4YHJVDhLZM322aSqbThD2AS469FiAwPGiJwT2V2uUz7LdaunNZx2WZKssyrZqLSuiIDOP6u2wTkE8vYT5hsUMbpIUDeKEAhDEYTq1SC02uqn8VwxZg4j/wj5OINmwO2XA4O6mk4gaSsNUTUi8K0hRYKC1pXCQsyrlCtJwkwLq5PdauUyWriHupBCl2Ioh9IXycVAdZZ3UNeoJnZMqS1bkBbzfcKQ4KDcdNjQ+IHRbkGV5jmGJhQ3dXNQMLf6ioN2nVQAoutFmFmtFkFZvwskC/IWxLHaEJWZRMieSi4WallTEScLhyV7+i2yFkGrefJX2dGepV/eFnZDE2RrJWWEFeUWm2oQIqlvdY6L6Tj1UVaT6XWZC3Ko/1WX0HsV+F+6/DKHnMgKzVEIeWweZNyvthjZ8Qvsq3sVdZ7AyynEVi8w/K3qxV3rNZEoNp080WxhIUPzmZupbHypxo4XEsyO7KNS8EX3Yvsg1MJ0snuZUDqeObZqwTJbvAQbSnBhIxZlN3RTeNeaneKIbh3rK1lL/lbjm+4U5diuOe4X0/CxudJ6BQi3WNl0MLBf8AZBrCCTopwj4RcG4BoJTi85CYGa810gD8NpPD6MieS5rJEOGF/NZSpwqzlZ4Kst4fshvB36cOSsAFmsisnLIrVBrnZKzgs52XE7OErev7o5e6F0MP7rqriNkym031iL9yFeuCP6VFMS7mViLn4uTf8Ih9AjCZIugGObSBsICfhJIxFZLRZ7NE8fTOwxFxGSMnEDqsRbA5qFeyh0FQoLJX4DT3RH8JTXCNmaiVh8yezleVeF/wpLS32WavVRFF2J3dRs3XFvZR5zHD8r1APkP5fShhpvIORZdYXl4Ku9/yrmVhmO2x2ISDssvLqZc1FliDleYUNursw91dnwULOaf1L8QdlJqNCDgRA1hEspx/UnNY4OnWEajKlN9pBhNcXgRYsDV/E/xDKALjhGpQ82riF5cJN0XUKjY5FcdMf6lD/E0WqalZ1U8mI/wlPy3tMEG6qF8mMua3hEolumz/AJW81cEc7rEwT0RYGvvoF9pTLR1RgWQ8zh6LFhHCTe7lkuynEY5LffvoBr3/AACodTaD1WOqKAcNQbpoqFw8zelhX2NeqHNG8HCdV9ndv6gvPrPgtH0/8L7GsIzlFoxOgzJRbNuRXA6ea3luk4v0rgXCs4XNXst0hcErKNmSz25bL0p6qRs0WYVioGfVG0ogjZdYqJwMNi45KXua42yVg4FXdB6I43Ta10cbMR0M5IkcJ26r+Ie4NZ3TS13mVbhxN2rDTDirvaFGcKdFlHdBwPyFfB8r6R7KXT8KyyWQVzbojiq4B1UU6mIdtu8wk91ZQGBb7GwuKmP9KnzWkLhn2Uljmu5tVnyDzCzGzOFiqV3Cq/h3shtttZVGhuE51GmaRnh02+U6/JcKG9NkA1oPspdS+CtRK3JClzJ6tVgXI3AhQJKLS4jTknlstOKyBEuBHyViYwueOJxuHckKbRitaF5mA8iSs2NB/UgatcX0Td1hjTmjDWCdGr/p3+WeiOOrE7Mh7r9IzKyUWK3Wn5VgWx1UVHu+VOJYCLKrQtVadDCLiIut0SgcLhzVnJoc0lhOaJxtX4h7QsLXOEcysJfLzxFTTqozUMKdVjB6QuC632QOi3I91xBZrNQrZLhXD7riVmW7KHM/2VgslcOlWe4L8QlXY5bs4e63qZPYyrEjus5V6YK4FkuvocA4dlevvaANU+Y8lY3OBhAhzDB0CkuxNIlEt8NjnLFot4BqlxYPdE4mMQpkOdTF881+G4claqVjIts3RK5e6u7rCjywPZZsXCD2KIc1Wet6dmi/EY3upxMf2cvxHT2UCsI6hcVl+K4f6VYmOcLP9ldzB7qG7yh5xO5JlUYc4gbWMc/CwbziNAnF8Eqdg2yj5lTDysvxGx1WFt+ybUM+Z+tsIFrYHRGWAO5RkoBjkSFnOywj3QIF1Lt49lutEr7Ted+lWEDusMtXE1bt1MxCw4BUIzeBCtUDZEcMocLx1auHC78qmysyV+Er01osyvqjqrj3VsKs0+yjBCurf5U6oguJWcdlDGVSg6pTAHUosEBuUSuGTzWFlugTsNfFE72TfkqSb+h94W6VBg/6lwq7XLPZcbMjGzgGHkpVwtVyCuVFNZfuvqC4lchaFcK4RK4VZa7eGycG0qrnkj6tF/sSrPUktH+pbz2n/UrR+6imD8K9UN7r7epI6Jhp1TUnNfZ0IbzKHmVMQ/K0L7NgAUXPRS+Oysslc2X1Lic1Wqz3Uue34W9V+Fm5bjlYhbwjrs5bd0q5JWZ2WdCIGuqcy91zTgxp6wJU1A8A2IOoUUifdH1XEkJtVrMMG+GywYt/iB6Lfrk9IRuhh4uqndLei4FhMtCwgE9lkVEx/Uvsz+y+0DsPJq3Q5x5LFK4p7qRh/wALyBuvdqHaLNQx7g1ZoFroPNPpVOLPutwv7KPLKww4dwrOXGFm1WKAKkf4UYWn/wDzUgAKZlZ+6htTEi0NcZ1wozIJECVqhJknot5sphLbZELFUfU8h4+yjTonx9J24U4Yt2Vhaf3XGVZytf8A1K7QphQXBvsrVJUTKuFLVIn2XH8hc/ZQ5qsSt0r6lD6rlnK3HFSoM7LNW6I7K87TAWrArViVBqOc7ZvklfQtwYiphkLAGhcDvhfhu+FvtIV1DWQt23Zbpd8refHurun3V1C4Gf2+jMqGPPuVeow/6lpszV0MNS3UKzw7suu2xWaiTc/srtJbqAV5rKXlNF7mZQAzIvtA9HlkxqsDMgg2YxFb7yToiWOLViF5zWB1gcgVLCWqHb3VcJhS4kdAvsXfK3qrW9gvxHys5C0nuvp/yuAu7hOm0AADbnsZ0klWVyt0D3XDTXC1cLf+VDqa4Vw/ujheBZTjZ8I/aAfshHiJPKFIcEQ/9islkpgwpAhMY5uIGyqeA8yawFgeaOIEStF1QaCowK63Xg91vNlbkhZlWdC4pV4A7KZlcK4o7rhnsdtnK4W8s2qzWq2fMK9lY7NdlpXBsa5wls3Cs5WUbxXLuvxP2X4zFvVGj3R+0BWq3KZCu0rcb8reedmazVlZZqdkbMirtjur0wVuhT5ZW9iAUTtgBZFXsVBIVqrZQ3pJ0TvFeIdYWDRzVqDYQ/woOXJflJ1COGox3cK7dh8+jVdVItBstxsd9gcLQpXnGbG3dYqjiXc9l8kHssZyJXlUwIAtN1MfCvMdlvuurO2SbKQcR5QsYZ5fULdqKcQeO6qGIy/wt5WV1bNBozAKh7iB0K591CjbfJfSpDcskMWiO6fldOq+lWMrhjZcrMrE/dZzKP8AD3qOylRTBfUJknkqrqwxVZxAzYKNjzjwEcKlzcTeYVwFuASt+mB7LcI7KCChGey9loQslmPdWEHpsyWavdcIW4t5WWHCrNhWWQW8gQ4oyQvsaXmN5o/S78uS+2mk4aZr7J4PsuL9lxfAWZOyBdZbc4280COeQzXAvtDhHVcfwiAZGzJvwt+k32XDHssiVk8e6tKsyVkAtFYfssIB+Fdquw+y4HLedC3TOxj7kQhRjd5KahFMdUMFSedkXhri0a+nM7LBWC379AqbctQFJ2X2MJNpus9uFxChjlugkqakOdyXJQsl7BcOyy0VV35WrNSSvzdkcIEK7AV1UbbnZ+GuHPNYgoJhQzeV2hGpVtSb+68ulHQIvc7u5fwtGnjmDV3b/K8QccMc2GtByRYdFksDXEc+qxFz3tP0F9k01PDtGMflWKhV8s9HI0ngu7hbzC1brpUxC6oiQuGVF1orLeEq4WS3TCBJCvZZqS4qz1Yyt5pJ0IWSyIVjZXWKgXs7KS+D0RL3EogDA6M01tXNWZPdSabx7KTTcsFNpKxVqBhbtGFDAtPlaq5gLKV9nTgdAt6rhV6oK/FasxCsLbM9lhK4SV12XXCtxoaOgWIHEdQVvNIW65XcFGJZyjuq3NbtNrU4m5dmZQc6lTf0cEKTW0msJyLZWJz29oWRhZriWZWpVmrefAW5FkwjIt9OJUyLnCM1Bp+6+v2CuIHRcIb3Ktf+lWDB3W+0hWg+6gMv1TK3lQ3IkempWOT8lvKEYKjVcI+UTMLhC4Fm0Kd0hWJCzC3bKXjPldGQXW2OdVhojNeRQsBaV1TQ3QqpUyJt+60dPNGtAGLQbAdZumgLw1NgEhsSvDeHxfrcVLXb7R8rjct2D3WnsVvtIWbSty45KHBXIK3gskTAW64q91eyzBVjCiVMKBsDdAsyuI/PqwvdBUvpOaTlqQgT4h0tzmYWN9byaeUnMp1QY6oYQCCf3RHmV6bRcb8pz6Pig9zMw5RiV3Faq5JWSicKuSrPAPdfiBZqJJWey3+FAkr8v7KYxe6w1KmA9Vv1Q5bjJ9lZkIkgnbnsyWSBGaxVZJOShoACM1CHTohUbL+crgjurQFDlF1cFbsreMFcQUtAVOAZbszcpWRKb3VGtjnGLiVYhoQxPJ91e/uuALL9llKsyB1K4zKw43uHRFox3EJ1N1nA3V1aSuZKYzEbDkicTVojoVNoXFC3XX0UQHLeY4Lh/ZW/ZXWW13mAkxurzX6LCwwNkonYFBEhbrNmKnlsYDha7LFzVOn/ABeCowXI5o1KeCp+bCgWPC4vhYDLx/hbluuSh7VIiVvDEFuuhfSjICzVrd1BJ2W2y3NQRsyV2qxj3Vxt4kIUvqNtog1ocXNzk5reMAZDbiBi0IkiSFk0K0FQF9Kzaufvsz28BWgXGZVlvuW48lb7SVlsvssrbN4SoAwhZ4+iyhWC/FvyQkFts26onzBJ0dorsb7hSBsjFHVAVL6gnNXUG03UYb819sN7qmmiRhhRsjbTDmB32cbZ/wABbpf7tXEP7VGNXrOCOJ9ep2yVmtte1weylqc7ntp1DoZQdrycsUQ3WBkokdFwOQlbrDK4FvNKzhWuryIVnuQl0rEzEG/1ZKzoHVERPVb7iwD6QiWNMclifc8llsvO2FnCjGi6IOi8uq0tdyKZ54xNB90KtJ4nmM1LRIKiIlYAwTBunBvCc1YCVGRR1sgXDEBmFubvQI4rgaq2zkVwyOi4SslZiG78qXmHnIhYXEHqrqREqZhWRGyUDhxdF5jXA/oDrpwd++3dJ+NmDFEhbzvhWZK3MIXE0L8X9lBrlXqrNQx11Z8L8y32OlTdZH52Tdb0+4UkX7K1OFvgk7IJjur/AGhX4IVvRr7bIDjC3eJXccWoVrT0TakSHflV2n3RE55q6zWaEmyIqDGOic1lm6bbJ7q4kDhW60riDe4UPrEotE4R9S446kLdq/2qA/EszfkUCXebSdrkQhV8NUGIGzUKYZgJ580Wu02wmX0kozmeL/hYbg9NB1U+YSrkn3U8K3XNK3m6aK9JZOB7q5+VuvkKJGUFCchkp1XF+y3iSETpsOBrSVvN+FlA5rfM/wBK3RA2XkrL5QGoWF7VumQmmk7NBuGZG8UA1kK6dIzWvzswtOJbwIWavdC0LNXKsV0W7Yq4tskIee3uQvMYcVM5c9rv4anUovn80tRa8Q4G428QzyKAwg9W2KD248s3m/patPhZwt9xK4YHMrcLfdS1rf7gsG7MxmiwkSDFle6s90KJfPVXyWQX/pbzFABWEC3olzvhW2b7lu1VcsLlMNX4TVdWdfoNl1JpB3IYlanHsh5mLDoDkoJEdPRkr0591hHwQsMRujZkrJgbTJe4TJTnOexp6lHDX03YVsuqc99IBpPC1Hy7SbApzGHdOYUrDNj/APZW9YOz6FB7TBC82IdrCBdnz2Z7JneG6F5dnVjn0TSfqv36qQ5Xs7ULcpqXU/lXREqcUqJU/wC6gz7ockR+6mdh8xzZ/LqiG5zliUgoSwk80MJDOrlLagf2UK8K9lG2MKhuH4WU9lumFhJmfQTsyXIqxnZwlQ8RshXNlZqsFdBWs45rC8EFdF/EUmS9o3uo2BjRLjkoqjDCLhBjl6sbRJbogQd0oGxCzA9012KS7h1X0061MxnZ6phrnu5xlKDPEDzASInRCrBcTd05KwwHshIIYOV46rC+qGWz5otpV8bTYyFwypj2UwB6M/TbZxweo289mRTZpO/1LE2oDJ4WiAr4uyEy0chZXa4W0Kb5biDrJX4gU+Y2FY4gVjqgs5SpLQ4jmnVB29FNrhIDYun15wluk2TsEQb22RsyQUck4aOz2SFhpjvOiex1Btc5eYf9tpc0b2hOiJJnVxKIFhl7bG1NNey5zkoxhp5F11wOwc0N+Tyi6D2Gx23BjpsNkIBQaQ5tQZrjIB6qC6dTa6LqmMjONCvLa9z2t5hbuEOGSl53p0atzEGgd1K3mn2C4CCrhbwKABhcwt3NQSVB2Tisuu3VTl6LhS24XL0S2+0B7qgcNQUQB9k+7FhGS/iKbdw5gaIObmEMWfRRWJD/AMxRmHf0hGtSBBp6cx6GVJ13gngk2fa1k3EQcIgWhYnOUNk8pUwZRaKj2gmbKKlni4WGu4swiG7qguaQchMrH5gD5sAVhZiN7IjXqrgqwUn91lfnGyPRZcKgMc49lek74WR27xg9dkNKb52LDzwrDDh7KaU5RMIDzGmc19tA6hAAMeDosWBscgoZSaG8zkEMieasjCLXCD6MbuGV/C0CI+rqpcnRb0R6PMsyl+d1gv4ehPlzd2rlLaeBmhecI/df9R46iDyp76aKFbzWkaiFeyJaPL8Ky9QzvuRrhrvKmxNuy4R2QmyFJ1fDRaJjVxQrF0u/IE57jvk2a1Y7Si4veKc6aJtN9XGw2kiC0+iCjhAWX7onC22hRa5jWie5RDDEZObZA2lNIbvRvXyW68ygSA8qRSYFot4NWc7NFCu1ZqQ6VBUtcVvKwVwdu6bqCYXMLnssi1zXLVDXuoMKdrqcfaC7O6wmxCwvMMNlj8M4Opn6SbptWq3P6UQxhGsudKDKVM+ZY4092MnoEOo24ReU1tSmKUN+sq4FZ/PRYHUqZCmjU8s8lvvH+y8zGwiOau/B3TS95I5I4HtaG5YsyiwYXHnyTWYhDbiFcNf1V1DZRv6bNlZKBTA6redbkiWWPNRjLvdZWV1wAq5a1bsHstx//ivxCryUQ4O5K2IfuuEwh9mcOqx1YZS7XKgQIW6UGUnLE+oHN5FMqMbhqZO9H8McpzVOszMGCrBQdl1mo2HE5zeRiV/F+N3aP0s1eoO7TbwtGishV/isdT/9cGyzjZJcA3qsHmuLeWJYxmy0Z4uqni6o4DACxEWW80O5dFyE3Rw8OkIUXNmSnMpnFv8AEgDxNsrmFxLPCOilzsY6qFCJAjoog4ucoVHNxjkUXYQFkD7K5+ArE7DfJc1wlXCy2WkLNarIrLY3DUBkXClZLJWGyWujbhLZHZZFQ5quQrFXG13i8muG9HNYqIaBkBikptetFRxyH+6ipAasQdFEfVzQbIDgM2f7pkYAGHOF/wDtPRQabvZbkg90C09VGJxRbUlp5FZpr21mxO9nu90WlpqIUgwFv5cSBrUyOYa5fYwGcougxzgDFlasC5Z/AVlMGNlxGwZ4lkPdfTPZRuwj9p8KMLit1oCzW+VlA0C3aYUuIJ6L/eVLTZXY53uvwWoxTaJ1yWFrpd0W89HzTV9k5+8ADYHksNNSSdhcVEo39LqLsiFAdh5ridssPlcIQQHiC1kCyxMHm1NMWQXmVXDOA2b7ZFypQMSvMgYZjKwTS7fA6JwghmiOI6eqVh5qrAtiCu1ahRG3Jb4whDJGcgtSeqN57bc52bpEdVFioNu6vHp4iuIq5OyRIWcrkslaQVDrrJTtuFulX2WWFPo1BLXBP8OIYWnjAuQm+UXR+pF76Dan9SsViKhZ21WKWlSTcrdyRi3ZY6hxFtt6pdAu8HU/ussAb5VMZNblsssVQgABHDYHVPebvdqsQMO6LC6zxmruQwtmES0q91lZclBlbrZK0A2XwtXDPsoaMKEnEeQRJxdACoxH5VySsLC7sFADjAUnw+AdF9LVx4ugQdggHmVws9k52Ri4lS10ei2yfQIZIV6CvnOzCXfbG+0ArCa0TmCF5tKsyesFNb4SoytVjhLMynnw7pawSQ4iU52F2EZmMtoLhvI0xSc1qDeI81MhYWUXPB1yRDmwQYV1ZXhRCyhFCwMmVw/uvwyhuwv+Nmam+3Lba/qlphQVkdkAElQWwrhS0kK8lS31wfVAsuJC6ug5jWtdEEuGYXGxPkuNfQaJ7HC7fQFO2xiUXOJJPMq1uuyJspFlDs9NrXT3QOndQFwkdgpmO7Ud0HqVJMdlYSsvRvGF+I1cfw1WP7LmsRjstR2WDU8l5dRj3A80ZsZVnBanlAzX2bAXaSvtPEMLjmER5mFmjeSDWEGVie0nsoNu6geWfdS8Af6wrA7LOWN4xdFaStxqxH6tkSo2CmM01lZlRtQC5CL6VVkgTfNVGgl1WMMtOXdS5zLHldG+48cCwvYAQN0t59VFgoqGSLbqY5oyW5Y8017XTqQrQ2OkrFJMuzXJZqdmchAkWRDtTZW2yFdZK1lvbJXEFI25+rJZKR6c1kFosgso2ZX2Zq0K/pDWW57LriTWHVObUpsqbuoyRj7huAQHNz+4PZU5InCgahEJvk+6tmrnZz25xtyX0hb7gFaqpa4q6cWiRzhWbKMw663qTm9lr8obg91ZsLI7AMW6DMHJOr+IYx5kcLsliwnAeRlWa0ct1OoVKVN2M5xdB7RAdpy2HGeybv35AbIY3K4UH0SvKCNNrwBqQjFUyMrQt4DEBxQpcd5XDYKzErJQbeyxeWYQDnQpqMxiMwZsgQMnbY2hMb09FhbZwfJQ5qFZxCuAVwfsoEBXJ9F1nszWe3iKu5XVnkK71zXCrbM1xQrvUYlxbLeideanYU6o49FUbi4re33MfcFv5hCa3ktUCJPMBcKuFAupe/2ChufNX3RsjNGGrGc1CyZPIq1BqnGW8h0W9MI4cvUXuOSIp08Q0XJYZU4Ti7QvLdZoysoZVbPKLq/mF3VWnDyO0TcBTwtWLCcAz5p1SnRFIOyaDssr7MconFC7qWZ6qdUHWsp5JrfLxP0QdX8M7ByxKKNQYcovaMlOKSeKywlmByLagsU5vI2Wd1mt47POqRnaU6KwkckMc4Dk5RJPZYRUAPWysslkPvMgslIErks1mp09Gf3V9trq6vsN0b7HDZcffguiI1QwhvcqzW91aysF9qYX2YHdbxMLgWFjYW/UvyWY7IOwwNklzgOQUxdWV9obtus0QCtVESdFje6OgW85zuSNy0SqflzAuWkCCi4i5vb0ENYCGje7c1cTeUQ4SEXMcTyCII0jbA2QMihqVkslIWSB0QNZ73x+YqAD2QquApQZ3kTW8TvnWYV6zD/VVT6/gqjS+iJqRkRMKdVk0oYtMlK/DNZrdJsqhDWAMzHQ6IjTqs1NUyBkFYERmoLjGl9sKIKsAsmlaBXWW3NZhcQWYViJUkGFZyuZ2WdC4gduYVihiBUhcvuySrZLGaZLOcIEJp5j7h/MBQRf1tMwZR81tvzJ2GpiarxKt/4larWdstN1vFWHourNlWbCGo5rPbhJ+FAdfsodVc2cpat6oCuJXe0GbCUAC0HOygoYiGRqVJqh3OCsLgalrBpAHuuENbyChtJvfVWRkWI1zW6PdGxEc0H5RkiKhk6O5rL0Tts2VBYB2WIbM8s0K/iX1KTs2ta6CO6uap//ANCpa6s0nqvtHVMIzl9l4jw/gaQbTa2cQ12yVJKDKjoasTCCFfYYQcyoRFnt6KW/Vnsz+4yC5K5XGs1cjZaoVc3Way2TCurLgWRXCVy2WdsutFbbGqbi3RndQHJ0ptevB1axYYEcoTvE+FGHmwKPqpmCiNlvTu2lZhtXmRYote2C3MFWEHl6Yc8MgG/+yp1alSA6wAW64qBhU2HZDG1wPXVXBKtSCyE+jiC4p7LIwsUuJ5K0A9lAN/6V12TCzgddkWCd9o3KCt6rJW7vam6BZgZ+6gVZvyWVQBb7d7WFwNRmBCFQbxHMWWbliYDksMtlNgDqnYsLQL3Rwy22YyQcdBE8/TYwtTt12/aNacLsQXl0mjuUfOrec4aMuh5YbQZ1u5TW8Qak6v0Rp0aczxPylFnK2w7JIXRWCyWIjNYgUaX5bjZZf8q/qnToue22St6rLjKuSfTGzJXbssV/wtVxKDdFzrAZLCEaLgbhCN2FddCn+XUBovN406KfWGsMFQ8hw+Crj7all1Cn08kXX91DRPWV9qQRyC3W37oNlXKgDbuNlS9QAtFIdfZZrVkIXC5XqkDlCllTd67YxNKhrA7qpDEPNapYXttZYqz5g/SVxfsuNaDrmsTj+4UmsfZZE9SUQHfCPlsM9VMvpgC8L/uBf5WL+Ia3lIXAKrebEKbqUFuh9BGwmpUFMK0HaQc0YaHGMisFIw1wug9zvgJrrva82K8yi5ogfKL6I8msM2qTxc/TltuiqpI3Qy5/KpGy6z+VnCvdcWFZlZqNnP8Al7hWQUAwEKdNuJxFoRJfjrakaJhqGSW6KRmiH6JzmUXXMiyvQqD/AErcoVD7L8GO7gt+pSat94d7LhB9lfw9KOoUMp+RU01X2dcj9x+6jx1IAH/5Goxdk2IRYb7bqxQxQRCtsLvTAuVMlS9y3Vu2UlZFXZiXCBswjCsiVwEoY6EdCuBgUZxyWka6qxKw4iQrz2XlubE34V9nGKZxH/C3QPMfmeqM4DzIyWYHYIYibLeOE9kakAWOFq5wESNFi8RWqYBmG5Ldxreptd/UE+s+hS3f0pgZgL+KpgyHTYW8xtyVthWLopcwwTeEHeGENO7vXum0YuP8qYssTTfa5Fp9HErPBU6FY8GJjhhcopuHl8TB01CxUg7O/JAB+/qCgzCCSsTcjyUOGzi9Gf3eey33V1qunJcDWjq5PIdSD3CJlHH4oX5BCkww0K5WY2SBZTCvC3DhKIOeyHZLPcP/AIlGnAxj915rriIKkGCOSFWocWIWPpGvRXQ8wYW8gVuq63PnaCjgpgDqVFj2WeyAIKa6q872krC2n7lWAWQJWSscI6rjDiVeT7rDghfSsgocweymmLqC2m5imrDenJbrSEJbkMMrdDbaRKGKWlMFO2IklBzDvSckNFx2J0R1HdWJlBrau7pK4kcDalUDOMgr++wO5LEFmoJ2gqne6ki/RCmxzqbXb0c0WvkOC8mqC9eZTt024XOwtOZVRvJXefZcROyzAoLVPJbucXTqMb7TLQdUMRqAfU1wghOaGzycsbTBCHlVC6cwVe6tss5ZhXUqyvOywOy5We2SLrJZLL03HpuslYrNcSiVnszVlGFcUKcWzF9QWewt0TTqERn0XdRiazqUAXNhrs8wpoF5YRO8I2wDClfS5q4lv3VtslYsShsbLlWuVL3BbkLffAWbnKwst4qccLdrB3YLPErsRx8rQplAZqWktUu3jrK86nXLXxGFYKYAZhjK6hjww9TAKI+VP7LtkjJ2dtgYw3Nk2t4ur536ZssFLC0AWAV89tvhWz5egppTXzjZqMivLq0fLDbifr90asOcPpLViJv+pBlSk0ieIIgEjkHZqZV7Tqj/AErLZG0gpscgE3xFI7zc15hO9q1X2uaMnZ7LqzlxbNdkQPTn6xtn7q6tnszWa3vVn6qbRnmVKu4BGMggrujqua3SQoxEjqt2QVxleYae7lKzUk7LK1lvuK4S5btMKzfhXICynuruCtJ7BXCus1uD5V1xK2iBU5qGnPQlEFl+l1am4HRYJnbPoaZ1WdpWaxCzpzVx9wOiY06YlBaCgRV8poym6eOHvqnfZsqiPq0V1mv9liw7LrJW2ttMhS5mEc1jLjiGQwyENXctPRkuWy9vVkFcLhCyj1x95l/I3904TdyCK4szcbIIg7IY0lXcAvx2Kzw7snUSMWLUabJhWWclZbBWgYe6hsSiXF9s1apC4wVvwTss33RvtC5I2XDGwBo1sUfKpuA1JK4RB11QE5Z+m6tfsmM0n9kPKqPbCL6b21Y+mIKwYTPJFjTLrDaJyUt3gr7N1pKdLcInUo43BECoCWiSpdmf2V0bSM5TMJG8DE9FB2RKhXWq3gRtbOACBdGDKwlb8j8pWYj05bbt9cbOSzWJTI2X2SFGzNZhZrJZLPZiAD29Fl64yViZRY/MK/pupDTCDROaw8lbZuBcP7qcDJ6q76bQpeS5cB+VZdVJb8+lzYBrHLoE6nVcS6N0BGN3W4XlseQ05rrz9H+ygC5TgGHdzUVMwrLdW8J7o4WCBmsv3WL9lL7BQCjq4kzsyWRUKwWap1mNxFqkupDsEXVHNdcAAJz6cCtEArDcObntCsVoVwtRc4jCEQXWhXuq7ukINjYWm0oOc4ERity5qDkeS+zqOd3av/SBfTLba7Mz6Gk3cOqwltua4iB8qbuHJTghnKVl68vuslmrlWUOGy6tcKL+myusl+nFeUMVNrhNlNCoR/UoFIO7L8B3srsd8LVblExzNkH1/tHzwjJbjA32RrUWAV2cvq9YAsjumAL9FZRktFopNlxKRZukrjC3nfC4Ce5VsLVdxOy6yhHEL6FYWNY0KXGU6naHeqG3Rpml9pzUscWrE8yTsyJ7LCBgbqVhqWLhZGCanPut9YWXQq+JvyaE+S0EusAZjbPox6M/ygJVFguS7EqlYncZ/wDQm+Kp5kb423X2T5/Sc1BELC0SV5TchmU087bKre3ow+LpmoMh0XiHummW3prE57CJjd/3TPDuqbrN6A1eZ5UiMLZPqxNMEZIYhDtYW5heP0lAFjg7WUL7M1xLMqXQSp9FgrjZdWP3NrLnsiY+4wyGg8lxErXP2Ku6QsQFp+FIzWQk56rFqiRcrps/iaY+yqn4PpGyfRux7qalUohoaequ4wsr8z6sRE3UMuVNQ+33ENGa8xk+ZOSJqne22W8sRfAlMcMWei0AOQCdSIzyPIovqtuDZYmaA29k104nkS5022x6C5wuUSEzD+WFS8MOBhxVCPqcqhdqZ7K2S6oEjJB7cnIfxDraNRAZglbwezqhh8S0d00VfEsjUhFvh6rqjjz27xhgzWGn4ekR+6hg8p3KP9lD2DEM/wD7yQfRvh0/2TcPA7eHqK7qW+JwA5SJCh7GVOoKk0wOzlLyAOZ2W9GXourKCs/vb+iQuR2S8iAMloBKg2U4JKzmVmoae6MAgKxgKCLQuyfQfrl3T6dRsOYYPpbBm3qwMHuriVdwWp2WmFz2Xct3NXc5oV5hbtldxWZWatfsrM90C/Eeaa1ohS1xCklRM9ttoKBqNdhzU0WGNSi6UYRGHfaYcEC+mKrXZBOeKeAPuBs67M9oIbIWPyH4ecINfmArhYBYTJKDLRM7LqIkAyEXFaLdiOSMjB/hRLSpU5d0DiBHNBgVyR3p2UHD7GW/+kN4tM2Kg2tpovJd9J9UbIfyVj++w4gCrrismZTFxskOHZZrL+ZsoIDQdSidDkoJ9lkmiAic72VzKAClZE9FhjTZ/GU2TFn/APPohFjI53WYcVd7R2W+THVZ9yoZkvtXX5BfZNw9dl/lbu8t1kqH4gOi3S5WV1AudIV1n6N5QN4oac1mt0LeJVs9VAae+zohiDlgoVnHnCe7TEmtLTg1X8T4d2Ki/n9KOJmOkcxyVINvTFx6p6o0KrST9JAK/EOE5Ek7qdvYmgmHYc1cnD1XNSfX/kpvll3mEb8ropaEFK3fN9qJW/VYP/8ApSLf3VwOhBWE6JrxqL/cGcliBsoKglZp1Vxs0JrqhcXvyG27gNmXpnZlZTeNmX3me0g9wm7vYrdYY1cVa1vnZJ0Wd1nnoj0UzdBzc5XIoscJBEFOpfTmw9PQdySsLGqX5cla63suWzD5UdTsgBQ1nyswFAe2F+KwreeAoadkzfksm/3KdVos1GquTHIKcu6ll+SuuJZLA1olROepRj2QGK6u8L6ijFg7TYWYjhcIIQZXq1PK6OyR8lprQMTi30wNlSo8CJgSsPnkBvKmB/suIv8AdbzrIjZnt80DcmJV7q1kHY2ku0Gm3lsdylW+Vm5/YI4WkDkQiu3pwjPaHluIahTRrt9hJHspB8P3wwsVRzT2U4sLRmUA61GfkBedU4zpo0clP3Wf3HX1ZrL0ZwtX/pCjlmFNsk4m0KSsgiTE8lLiJQVrgoHFLTYbCWj7Vl2/8bbaKSVYe3oxTHurmVYLkrXXLbfZyCw4YCzCyxFZkdk2oa8k5s5IeXRLW8tm+SoapVgtFYxCsSVvn5KucbllA6KQRKO6Fkt3902vUswbx7J9XhxZBto9EQuq3wZUUXlo6Fb73OjmUUQI6LzNTthYiyztYUUycJ0n1Rs3uLCPdA1QCfy6Db/E0m3bxRy9Ngr+gGm4sdGYW/ULlCFJuX1FAmDGTNB3UNdiOpWI37re/k77OWy4hWO3OO6MkB3JXMlbsYsyjZSZXECVkrC6sNIusOHvCIiQVr77fOptinU/YrhlWbbVcu2wknJEAC2ahobs6KAoKAlRdZLft0XCrAbND6bXK/KrG/Zc1EFThWiyCssRgKWvPuuqjNSLLEGtdH5lvWco823LEpaO0rMF2vpuQVDZPcrEc+WzSVpHJZRtEzHf1TqgZzTbAQIsqG60YHZ80NpDhIKg4ix3CR6bD7gAXd/hBjBichiJcf2X4TPhWuP5HNYYnrsuFls5rhKzV4K8wDd6jVYXOyPLNEOCw4boyLIbt5XKF9Sl2igC8oWvsjY6jUFnBGg5kYStywUFXstwKVdXIQDYCgnEVZpAU1CZQwkzyXlNbirE4YIsEGF2/wDUOSx/4XVbyhpXEFmrNWeyxlWP7I48Qcr+mXX9JtY5ws4hcXtCtfspEhc1kQuE+60+UZz0W98LCyLK+w1GZ8lxbLlWb8rI+tpvKIbxC8INPoLHNBOkogAiNDp6JaFwLgcuFys0rhcPZXUtiOqwuEEZrDqc1ntxM+P5cFzcQ5LcotYslvOxDliQI3W8xohTYDzRpgieuicYJjRSIgqHcOim8IthRMoiW91gxS7RCdVz2DxTBvM4uy4wFli7rRX2S1s9TswiysI2gmqG1IzlSCfNnRS4yeeyQYViCuEq87bQt4qA2SsFSp5Z0Tg43B9VvXdfalsRaQnUcNJ987QpoVG3F5N5UBTYdkDMnlyQPXREf5CxINDUG5wVHNZ5q1zsF5PJNGKJU3JUzC4Lc1xBb5Vgrj91ukhCrzz9JdUoNLjmUfKL6R+VNJzKo+Cpq0HtCBP/APVYkK+I7C9ma1dOSuE3CIW8L8100KwuPoluahwj+Yc17cOolBoi+eJYJa79li11R3t1ZCZzCJ6aIGAjhtOqGFv7rT2W7+6tn1Qk6bCDkUWgHynXadsZlS659efqzV4K4IKuR8LjWZKDm5hHEbHi6o4acXnP0RIVqpPrt6JdU7DZkVkuFql0fC+ydfksonkIVnkLQrESs1nsGG0ZLQqcInr6gaZiP3TmubulYSbIFua3s1YrNWKzV1LqbJ5tsV9nXMfqEq1Zh+QpDWO7OQL/AAzo5LA5jmK8uAzW7w7IcJCx07tUFZrNQVe6llwstmSz/k27v1ZpoxSeTb2W8DhWMHLogXARl0W7l0Qx2CLqTYbCDteSmI91YR05KMz0UjDUW40lYC4HYaeThdpRbgMhb59lA/krevdKzCzAUY5PQyoeFwlcC5bIkKQt6y3A53ZAOaGj5KpVW1MWMfCs0kaqYC1XCV+E7uEcHhzA5r7Xid0Vrjp6bOhAvqSRzCGLB8K8Kx9JLgsdRxpsgw6NeSh4lcMKyvszXEolcW2yh7Wu7hbjcE8lumVwFqwvGzFTseSgz2UFY23G2YVxsn+TBc3cF7qxwjqLo4xM6rhLpyhWbEoNNuaEiBpdWJhYi2YWKRHVGRIUvpg87I7sQUJmDdRALpsgD7bP4hvCeL0RN/urFZArettz2SWz0RLW4Ry9NvQMQRbScXCbWX2g+VhYwK4I5LflanuVYbfLOSsslkuGdhpWcIgTommochGzJXAXLsruKDR/5L9PILl77M1BurLqr3XNPoWwv56Hmj681Z5XFK3mNKl+Jqmm+eY9G+GrcdIKsAfdQ8Qea6cwvLdf0kbM9lir/fgF2KNFiDpA6LGZOLlojUPL4VN7XEgkzAQMj3VhPUIA2hQxsjkhli6fSjidEDJcTsIy5K3t3TuiLTlyQdEKU+k8WcEaJEOaeazWalST9zmrlQslEbI9YxAQvsvQJsmnHd2pViHBWG6pyAXG1cYWYPut0CNsztt6cpXArsWHCAt0fCznur391IdCznsrrP0G1vTOiz2N87H5c3w5o4PNibTCkEhbtSedl5joLXWlZ5LEXzOiAo4mXUOcSCmnWNm98q8HRebSBBF4Uyt7bjbnsv6Oit9zf0RjcAi1jiSDAAUOeQQcwUDv2M2GaO40H8ywYotktzDBKkmbrNRunqheXDooztog2CZPJCZsrNOXJNImYvZQbzs/iqY3mcXUeiMRCBHozVpRVrBbyspj7vd2HE6LIhpnZK3irSVeVhbZq1Qiyz25wrGdm8SFHq/D/wDFcPtkt5watSiMOatKs9ZBXF1OamVk1b0IyoP3FgiMGJxGiyHwoKlrjHMInFL/AKUQRBXVYa7oiyf5VRst56rLZBusdPhd+ygq2ywssbWy3ppt5rJQTl91bZBWibi3RF+awzY3tom2k4olNNNxguWC3l53K82PL0zQEiBlC3X9wizKeSu24NissN+SxsnqnC1/2REyszbTRarHcuKlQck5rB9mbt2cle5VtsHZIK1WXq0kBFzLuH0+kiL8/RA25rorBXufutVw+qzV/wALL1Zz2TSwq4+FIsuqEH2QbVOHxdEbtvxG/wDP3Fxc+kXDWO1Qq0XA4xvRzRXdfYcajxNFygwCt16IcJaUMN5yKhya2c1DDDRkr7wRLBuuuNlv5AunWCETTYMEao1Jw9U11aocOhXmvaAO2aiYaEcO7yQDiBIjdVnEGFEjqiHqYC5d0XadETcRqi8uyUF3VXtpGyBxC4UJ3mkNd3RGmy5CzCkZeq6nbdSwwfuspK1Uv+FYQs1knEuLSOY9QaFiMRsElB1MDEfRYn7qyglbua3rFS0yFZ7gVAOLUTYrzGt3T6YQJmPThHuUaZsjif2hHzN4n9kRBnmVLBfnss3AebV9jVxjkVhr0iFENg819g/2QdUYcCm6NPWJ7qcnBQf5DzKtmf5WbnOGkLAXuA+oQmvkiXeyLBuibIN1AhO33OCw0w885XIJxc/IZK+ivdXCA3roiSO2anMnRS4CDlKAwW5wuLdzUHMbP4hkQ7i7riW8USFOuwAgfyllLiD6LmNm9onH0yEG9NuJx7D7uwn1SLFcSl7cbVZxaP1KWuB7LJWV9tz6Y0Qv9xBEhboLD0QdSq4oKw+LpX5hGajQHXCdX8C9obw5oeZIPL7+AEKlcX/Ls5NGac/TusJFgi50xlARxSzVQN6VGMnksQOdkcjZa5rCBhi6kcQyW9wjNbwHdG6GQHJHDlGXJDhaToj1PLYWPEgp1N3tsjNZBcIXCP5ptTFc6bN6phREz9xn93IMHopJPrspmCgWvhb9SVl8rl2Uzt19EKB8/dnz5G6vJbVxDQhOaK1anVzsbIU/EMZVByORKwvd5L/1WWKi4VB0W80j7vCwSpzfz2uxSE4AiTz0QI4lYGES4mFLLk5hN0fFsSgmeqc5Ymi5yRyPNHDksM3zR5qHFZWleZbsFiItoUXPMdJXXXYajQMbL+3ovkvsyoCx1HgK33VlvA/dgOyWBmnqupKiFjc0gHbYK4++jCe6zJWfyoNj6i4tgRntzUX7nbZQT9zCczOCtwnEoeSY5rcNjmvLrUmVW9V9nLGH6ZlT4auWrB4zwrKo55K1R3hqnJ+SxMio3m1Q4EH02GyTZnNYWDbwEqBPUqA60appDgsMvcCuZ5BFz/YlRd115bWy8o2vkFhaeHVQ9x5qxUwgZGadfXVEyb6I3IB1CkWbodUQ8hy4lOyWjcdltgpsugTcrdO6UWTkfu7KHfdyrn1SF+pTCFNzpDVktyPhCr5YPsntcxkl0zF/Xdcas4bOMK0n2U7JFuyh0Tsh3p1jUSiaTWN7m6wnTaJ29fuQU4gAXyGzzIdiH5Qvwyr4QgY3ue27Y7KfC+Ic3ogPG+GbVH5gF9lX8p5+l6kDGOYVxsDm5o1aggEyGqBltwtb7ou+nqh+UL8vfMrcBst3EHkXRp07k6gLf3/yBF2cXKxMROVlDsiZIUhsTkjkdlrrAbzcLHhsUHZhBvENJXe1kdSsOuuwsPsi1wgjbiXb0z6Ov8tD2gypFgsco2vsBXWIhQWrcbHqsQh5u7IkLP8AZcS4ldziOSgWG26ssOh9bXC+HONP5u4X2VeowdMvhfaUqPif6d13woFR1B/5aohYjvO2wN4nqigRHsnfaEd7Sny3Dh90TnGQUu3RCAaLYVe2KyjFw3xZWWLzDi5IkuAGqdEROqhom+aIOQ+pdOa6LdGIol69k0iSRopEAarDAtkQt5t+agcI57f4hueTtuADPP1R6JGSy/l4n0RPpzHoAdePXCLmmduvqI0dmOaa5jADrGyNNtv5e1m815TxjH6lPg6z6J5A2+FHiqAqN/M2yhnifLd+V4wrEIK4BKA0Rh2MdU1wPQhOMtd1GighxMyiRBd0WGR16KC3PJEGIV5P+6LYxDkhhtookEEwnXxYbSigGOzzV/eFw3KHdQz46pxw+2iOLizlAgS6L9FnxZDYWuEgpzD7fdBwzGwlQQoH8vcq1119OW3eK3fuLKWlb7bqQFnCAFJmIdc0yHBwIuNWlW2X2RzXMLhXVXd/Lh9c4G8jqsNMtjpt3yI0ROAYUP4Su6PyOuED4zwf+umvs/FyfyuspLPhBtQuH5oTWk7k2H+6ljbTZEvMQnOG63kjDBi5pzTAc5BrWb3+EXCflTl7ZouxEu5ckJEON1DmwmgDSUHCZ1Vtf2QP7o69VLWyI9gsbo6lEgxz6rEXTCnZ5jeJv3gGFbqufuoAUn7ydVvKQUG81inF6bLdYVDxBW60lSW/eQ8T1OasfVnstdOZAvzGwY2kTl/JQ0SUHVrnkuAKS2EP4Ksezl5fi2YHc01wqBw0KjGL/SgHW75KzfYol1JoPSyjw3iXR+V1wsLy0knLRNDmgCflU2NdfotI581xOE69Vn+y8zzDizlEvO/NijibCguwhP3bc1vcoiEAbdUdE1o9yjvEck5x+CUCQXSoHCVIcQIUvEmFjiCFiPDnbbYbjsv56PVYbQUAfULougFQREqJB2vDvxRw9VEKMI7/AHEgx9wFCmx5yiLukRfRC/8AIQ0e6td3PZJRlxA0hcXuiyqAW5zqh4jw5a+nPAsHiKfl1OcIOxu/qzC3He42bzziWMN/5TXCCRqsWp15rBhndug0tiNEXlxazILog2JEDJTfCv0z8rXK6aGAWv1QLz2R5goCU+QC7Qo4ji5qBJ5LFMINMGB7LEBLxzGa1xzqiL5qDpsLTnoi1wuPRl/I2ErIevP59c/dWEqYIVzsss11+9gZ7MWn8rjfusWFggbIZdyON0dULon8TlCAkZKMI9wh5lMCNciv+nOOnNmlYHtNF3KbJsHFzWKSQVIDstSsLbnW6jGDHJY2cOaAxG5koQS4xyyWboxWRE3U/VmrYcpKDRdkS5SWW6L7PhWJw+EeqljIwo709Cg6SCsRduDhW/I7olj89VE+6JAvzC3iAIup2ee0f1emwW8Pvw2Q3qUQL9f5gHCCm4mQ2NFuOkbM1ZYi6EWjT+QzXPbzWezMfdBrRJKD613ctl0QIjYOmqFgIRDhPsiCCtwy5uXJS6pJGgWJsjut+k09UfJIrUxpqvJfNN3JywskgWyUU2YrZ8k0NmG81h/NmAo3ZJyUicU7yjLkscSORQ1dkrHe1KIazE4rCdM0QHS0XVt0QmUxIi5PNHS/ynMAiTmdUSDcBAA63EKKlhEglNxtsNEGDDPwoIc0ArEC7pKh3tsLXZFFh9UtaocIP3kkwFAy9BDnRaVjYZCuP5mx77C5vuFdYRnp90YMShBnmpxFXv2WX38NHurXdqdkp2UK+QU5BNAsjibiKkkCNFlZQ0GdAuQ1uiDAPXRETThxsj/sUBVpEuIs6Vj8yByCbDpnkF5bLXu1EtMOGXRb1Q5SJVjA5rmZ01V806c1nkt3dBv7IuZBMXUQbBBnyV5jhabLFMXyW7IhN/LqiSHYOQRhplOxiHOshlh+pSeHomNmAOaMkHaareNuzL+QxNCg+hrXmAUWU3zzTSy7QuCGj+Rj1BozKl4hZ7P8FY8UHVETkp+8+0BI6feRtD37rEGMEAbIBuuayWkzqovhjVQTw5Bbzd5aKSBnkjAAugSL6wsQDr5ygZ30BhElRiAAQa0b2qL5v/hB3DfiW8XG6wljjKGG/MKH/wDtCCHBS4GGrDgbnmdE7mTEBF1pVhYfusWIhaZppaCChgcMTjknUhBPdRF8hKOCXDupcwh2k5IHixC6sM9E0tE+91OLEF5bnA6jaS2zHXH8iWjMqdltkzsgGyDS638tDliabaEJrXwHwiCNg8wS1Nd4c58iiPEjPIo4Rb+XnYGtbJWOvc6N24BmoMSt0hNIGIDmjYLL3UD6kZqSY0WGMghJuEeXdAs3Qt3JX16L7RtuSsIPZHE1wnKFgce4lYXuLR+lFpwwwIeIe0uJNm5BBw3RiuAE6ZeUcY7I2s1EsUOMEZJu7PZEE317JoUQwNWEZniKgEgznC+zPysWG6x4clvXP+FgD+LNeXUAtk5eXUZGpQjdHOEHF+MjaWn2Ra7Mf/j94Ym8irS1Wu7qoI2Qp2Ym3H8vui2pW6Jd+ba4N0RsssR5FS6B2WURmnGI5BDd/dOJa+VuYcroOJ90MLi7orx2RwQbIirhknRYQBI1KBWUDknvgFyBqCHZkowpw4sWQWFgOHSAsO+OytDeXMprXQVjvnbohOqxaqzMj8rGW5fKGgam21yUqP8AdRJGLog1ok6qMkL91IAgXtotx0mUGS0yMl9oxpanVJjVAwBt/iGj+r/8jGK6lyKttwzZFp/lRUrWbyWFggbYZmhJwzpNl9m0f1E5L8QPBWHyy1YGlzQc5R+1dPdE+Y8R9QKDRjfbiwQgZDnFO+09nI+S8HmITW4gXAbyugQ2FvK7hC3CAVJd5dvlODHyYuYXDbJO3jfQWWKMhCOIglw+F9o/C7FxK2I3z6IiNViFwVvgxKgNwubmojDIWFumcIgQ0rCQbHNF8R0WIoPvGcozJB15K7YIR1ceazDsH7I1BvHJEZIUgTPRPaMUsP1ITnsLTkU5n3GX/wCJwuyROydt/wCTDWCSUH1N5/8Aj0FmZhbu6OcIMYA6eQTSI/tumNpsxX7IVX1Glh0GiIdMLywQ7WSi2nkBvEZIPdVc22jljbAxGGw2U0Q8F1jIRwxbVYy1o7LqsLTCg3hbyO6CF//EACgQAQACAgICAgICAwEBAQAAAAEAESExQVFhcYGREKGxwdHh8CDxMP/aAAgBAQABPyFClpblgHeJcHTGIrIwpCtL5loGyP8Ac3l7HJEee8VHk/ZM+aBAbfkQypkI5cDvxMKHEvtMjIF1cy5GlzM18fcpasl7g4KHepY0C2cTRhkl1S8EUH6nSqZDyXcG6qNd7lbQrIPEMjT3Aym3fiVMbZjTFB5dQ5Jgb/tKIPHMxK1/OJcgmVuZZT5RhVAGSFMmisS2tojvWmOjz3BgbHnzBRhUWdSqdkeEfMK6+idwzlM9kJhf2SUZtZlf1mVloAi+D4QXX0oHaFeCLIYfjCl4P+OZpfXJDZ0dnMYQ0Bp5uJptckeIqxk3V1R4nLJoYikhyMrq+5hCz+3c5Qk1qBVinC1oFf2y5uOxvXiDBRHXgqpcvFZZK0b9s0KslPRBZXjvdzLPFjqoNgYF4WzAgql/zEUIzle5zE7IK9uj/lHfoDyrqYuKq+MRV9hT4jioiz/33DUFixcqavUpShdNQTdXm/UZmW3dOoSsUyd1rEYBpsid7N3LKeGpl5UteY3kjcesWesRl3knAPDHyeIRWAGTtirBnn5mKs1BB8AfxCKorNR2RLuoYWv4psOcEqtH+AuWZCsD8f6lbJpL0Vz3Mq3jEMaaiI2pVRMdh/tuUK+z+0ziiirOj9xVodEtiuszQ1NprM79YltFzT3TLmXYGdwVKU2iHDmfc31pw1E1viUEjSXFKAdDUeWAqoRApWteY5HUe4smvExMO4mZlaBOyAbmg5w5lllX5bl1PggIupRfmFgc5+Id7E5TmCk4c+o7a8S4HJHHqIu4jLk6MvV8Ygri7l/Il4SrM9kWTxKKbsyD4g3hyfpNz9RbxWY2kt9JZY4i88jcf8R27bzMcvqWfmfMz3Pae8ub6S+ktlxmZlRXkmOYvzZUcH5l+zRgSzxAUVHvxxBYO4FveJe3REOeEc+LBVq7qAFHUumlwRAJFXaKFHdzzHX/AHxFoO25aTWWYN3lVqwGA/z1HkZAHMRVkD9oozMnPcs0mgB9sBDkZK3sgcygwfrE4S1v9Ephba35iik2x9Q5lN1/cCh2/nBc2OfeYxgKWe6jg2bKedQLusCfH/yAs5jEM16v3DA9LZSuxlHJWS39xbri4XMW3n6xmOHG3mVsaU5iMztKyJ/zJZd3BfEtAFKD7inGE/8AfMshepRcitPcCwSmr+IaN4EMoGzm8xCAwkW96JdGGhJSQN3NTm3hjlfnHL6h9bExPilCfIiFSh8oQIwfGERRClUtm4AZVsGT/MY2MyXN8TySK6jR4xUg5dlT6ggWJ5GoCUuzZ5OYpk/DY+YLjsOTdToFtEpvRdQRA0DnI+xf6gPYyhbR0x5cLlMLo/pMtO36mWepoDtOQhgsdyslI5gZ1DB5DiAL7RacRM/MvnEoGN5mXuWt8JgWoJP/AHE5omxUStGZoCB9HLipkot9T/40oc/qGvMZ9PlF2lgJXxE649zhH7mO6x3LdTCNhbgz3SjPZKykMPG7OVx/Ev8AHqCVbNy1raCjwiJ8P6lcrg0t6MEu3OsIZTd1SUgMhKsXmVMotzuP0yq/BMlg1B3miqhRG+txOJsXuZzmUBw2e4qTCtRQHB/EyM0fEdalVOCrz5l03eyGm30dMxzx+pRXdMyjRfDqAkJ2XEKbFk2i8xbW+sNThqFRzrhG3KwFVxca2jct1Mj4Dv3K0C+TYTHXAwSqlhePieRpnz0TK8/zClDLP8//AGA1tMLK8wVoLtqcyU1iGfcS8Knli7fiHA+otLUb2llqA7VnlmMDiBWXluU9kaAbgZLVRGFq33NkMzwekF/4txXcGKi8mokbsziD9OY3tpDeHqIfIrH7uNYRwyfUIMR4GAi0M7I3hwWjB6WFX4i6TUdRU2bJkqY/Vwl1y+MQCgCq8sUbovujOqjHZmeLpS11DKrVu6+YbaKJxGipQrqIw5f0TNqWbhqIgtEG3h/cekWhgdxEK9y3pVSuDqWAwm0NszaupxM+BVywfMAM9Z5XBGVlxSOULtnrEv8AJMun+GAgG+CZ2sMc1MKUNJKjqUXlbeow7+5hRt7ymZSOjt6hwZv9uaO77nButwjdU/MaGmcnQdTsHeHw8TWM6yNF9/ga17Zcqh2low+pXJCIoOloaFIHMlYWolk2fcWTxOyYrNi4joMxMmUEbhDmPMfc4LfcOjxFqX1OZWXo1K1w3OIoxcuCMjT+K7RNjg3HrqEabBWKpeo/CWeHV/6IF1R8GBFzyr/4h7DgKnydXFqAOzqZYalPaMFlIqtzSte5nxMGchM6lkFcuzb+pSwY5l1ahyv4MQnpl1ouo0+Uoo4lBb5tuM7HDGaJmsNsEam2lQyHCQFRY6P27jUNrfZns1N6mFm5YoTR3URlhlD0IxBuiX2XZDMNkwp3GHWn7lY1HmaYWqP+XGmzl3G7b15ghR6DmP8AE4AY2h2wTYRMjuPmITy/wymNiuWZkAtfkYRXw/MCqww4eMtRatq7mFMeWWQSadxIcxUznn8Ed3cVbYW/bL1gt6uDS54Czx+pg3Ra0ql3Kh0nAwYuHBQ51A4yDc5uFc8QVEGJSfXMve8HADdTOWNf9YgbcHIrg7gaJTI5OPMqd5OfaOYQqmkq97hiQtTEIFM9brnF8ypRoNAb8xWr1BZ2kYO8gP5Lm19iNN5f+Zi8tlT1XAwzbxFHiX+5cmZxPYeIziD1yoXn2fxHoGWvc5nI46ba7mO8HxH32i2MSHeg3N/ZACy76p+o77HcNIqhszGYd9BhjhavVRRFAPplhabohaeCgSm9f9UKGj2rKxfzNjPojwaxAmsUXnEFdziYir8MTFL1GwlxRU28VqU2PWyUwQ1eZRuz0zJRgYqmFGCUsJaQvY0DteIogZR2RdjyOCAEbBMf3tODt6gwjSuaIkYStw9mchLWboodCClM8swq74qbf6lZlZSrxIl1/iY3xZ1B8+SCWKAFSndT9kvdPTX+IvNBWMVEH2Y+WUgzIDTKQIIEdKqOlAdaT/Mr2J5Rr19Ll8SwDnY5qsYjDfhDnvtrzQRzwC2xK4eCkz3iWt1fZ+5++6P9RIc1XbuKGAt4HUN/guIF8TJTjsGSnMoSRWniG89PyfjCxnMcvGy7C10nmQwP+A6mXN+4WXfiLn6aVfEwKIv1idfKvoXb/MsABQvDCJazZACv5EzV00w6NVrzdYh0TGPDUzyutCpd3iIZ7AiTr6epU/gyk0JrjFR3QiTiDeJnWEdfLYtt7IUDLWJyTLOYjQLNvuU8vg6JwcCe4CLnls1v9zF0h8jFA9l697gh0zpFXxcstOqF8xW6tXVcxfFJ5QtjromZGxo2Lv1CBVT3TLL956LxmXCs3D83H8wmQPlX/cxLndp0tlKXlz+o6HA4+pqEwAtFP4/uU0mlFV5PqWUSvkKqu4lSAVZtGv1aR3ErXle4KnN0/eyXUg5Ch9PzLapV3OhhaHG5l1qDS+WAQ+zk6mT9ziKK+l/oQuvfB4YbZby7gX/Hnv5g5w/DMD1Jv5y961MkoscQ3SCItrTqWHBKRw1Z+pSyqSW3cyJRgRs4zAQrRWtPjlij5778vbAqajCcZeTn+aAldJmj/q4GcCqjBGSP2HcWwtMS8yGEep2vkjPqwDhAgXOSLjrEmBtFodsX+WogJgWqcVn+oduaBmo2Y6ksf0ZmLFKLT1mY5ixwmC62TVIhGrTTCiji6AfLxMUszm/A6/lA2WUXF3/UZzYhhi3wgQtdywU7iQsjrghlWK9R/wBUslsXLo8dEznhj3n/AJlcuh0NQKE3ILW7MzbmO+CDkmQ2tt+mHVZAfx/f4rta8wIw3HcrovjE8dwpiwtRWPH+CK2yjw/8S3bwvI6/qNceBaDTUqtJ2S/zLa6mm44leSNaWX6ho/mJY1ZF62pdoo6PX4rLrsqyb7Gv+EoerIff4J1Cwwp5uKYbnkx8kqQ/F0I6amizUGZa9bXCUF5/kIvMGHkgD4R6+2b/AHFXTEwUXh1ECKfkeWCtK7kVUPG4fjfyLjP3bsGatl/UuLQ0DmKixh6SP7mUmUvhtxStAftg5HKaJ33USg4BVSy33HZDCLUM/wBTb85Zo6NS5TR2Go3RFma1HZLmDAXvLI54YtluqT1BmL6CghzCW8QrwQ1xYF13O9VTMeRCWDEo05g1ArOIAx7jeGvxqK6q7yRoaDhYq1csU6m85xy5ujMrdF21lLosxqgiMVcEfcroEc1t5Nv4BkcUOfmW2S3CI5cNDLGteAFAa7myLvyUfPiSy7vIXGHWEGApAPkzmOauUsD84bho/sZYzQ6yPH1K7dUDV6/UwhENXxUpuOIEftjNk3wWSUtvEeJ4GfYx31uxz+oarH0uMP3hBd3lqypA6km97hr2MaOZiv1Zs6B7mIfsEXUPDgX+4wdlM+YZhz6TAKF25zxCWt5grlx4JlbJ/Y/1G3PK6bmBmlTIByhqVqx9oinRiy8SiUmGMemUZ8iNHMo3GerHr3/upWRVS8H+5UWRwYRv6nPje7QdzdbXFuLRzuJX4WAoJDuGLRnrxGpZ2VfxxBV3dZmMyYlyQmbPPMuoMzlKXJG/iPPGhBzEBVN3gifR2N6iVziA0WKFQn6S8uxTyXzL2MXi42nfUaxWc8xmgfabFluhDS38x3mJarxcFhZai0f2SqnzKZYTZwin1uJVDCeNQK0E4UURcbn+ZlYqWjKcyaGmF5miB5TxB03SA/c1s1j4gLzvEZWoGnmANQuOzLaiC1Rs2V4qOWZgE4IjSBDs3MmIRgtsZnECYxBeScWYYnTNQ1pUehkCSmwbPNmntgahY5t9xW0sQLDFUOodXzUULZ4lSVscVPs7P9SplY7i7x+5Vec2VKBuD6VsYfKMpRzFhXsvqpSAx+Iuyl7jYbP5g/wBSfxApD1dQmSmy43YjhGZkoLYwXkFEPiX59VuLt3G5w2r08/5gvRcJtdQjoTqGV8TIWlBDqX9JdOe0R8KqGBqDRcyKmFqA1oxKRxGZCYPMUoKgDb6lB0AseGcojX8xxhf0ZabVBcEkEqt6fUVHALOYfVBsZhXdWSl0zmAxRFjBuEtX+4YlctxQatVDcoVAujJ76gQ9KMKkoVbHhuUxVv2uSUUF5bhdyxetMfK1MuTmUkbR6SWQROGVFV1G5YrO4itwPQlVKt5hAGbUOILPxbcd/i6C40gX3Sr/ppUQf4CXl4cZBOTRj8E7KgQd+CNHLEw3HMoSNwiOizhEPyjmsx8RM8WWcqBRsdMUWjOkaPJ5gNjPNytgnHSbRT9QKwcr3CVDeauUI/aYCFlBPDGP4g/pZkiH+STMhNtQDDfhMJZ5uDAItaYiMhiuiTPLTdk29sOq/Cf/WJxi5a1FF9DiD5EEdiuFRpqqfjWIU3uWbS+2LA6JVHfwiwU/Nl4KuDRE4Zb237gLnDGCK8RVZg6rKd0nsuIP2o3DsmfY+HXXyY7ZpVqw4lAYvVmV5qEGI8AtlK1AC3LZU6muoJp0iNXHqdkpoPcXQ3cL+WObmcOYDMfUCDfKcxUbOiYiJbGZqUbtqHoy4PFRj1VjKF1nuWl5deM+rcYsrwNFK1tD5mPfcf9wk3Ocr4qCt+mNjLd1O4YI8dsGeoRQsaMpdsydkZVkbFKw0H2xCQVg8Qa/wAGpz+YsJkNKmIWMwFYVNrGg45YBHrsMtuZbF7Ew7tDqW3zARlMqFjB4YMguKFlk1kzKSOgoQoscQlq/PDOEN2WZArTND5OpvPEYCywUSqJgn42/DOZ0OoEHILhZjPkjMV4ruBZw/BgNdUMOzR1ZUsFOOXbDX4ImxKXeq+mU+5xS6ybgIWnJfIzOQ+4Fz9HUprapWRfWGdxhpSjH9TBkQeIIyA2ncQQHWN6Xiy8Q3QF20hxc1BmlKa9Whe7mKeCGhV3/eBTiCu2KliSNFaliwxeV1N1AsGPMFWZD5A3My0tEnxmGquFTz+OTBixfUVW3f4NE9+0yXcrV+UchFovVndEHxO5Q+UVu9ymZUH5uYPPoP8A4mcBcr84QB4hmVjhMty1bgVMu4pNU+JiaOku2jN27gp3ZAgXsvmZ+mW5SM9u5w2HLU023wSyHX3Fd3Zcd4IAyx3FFNP3NBxv4s7YmA0W1rnHbBHp4X/Jgf0H/YZZW9af7hRHYuJPcsINJAADAO0dYAWGeSsUR4RrEPJpDboDFYPzoW1y4ijGJLwauoly12xdrnRXMlamk9blesGryqeIsISLCF5UpWjUIyEeI6fXH4Fjy1sRsaR4FSk5i8jMvr9oNYhL6NdwALGvzd/DKJwzDeYUL/8AhG5rW0wccQcjmLYMTUUVyIOTdTjhBnAwEevtDhNa+56iAKGTBtynibLaxNWMTEwXxEGkYFVrmlggILFbr/xF0ynkjL8cxwRVYjNEemPeHX6gHRLXRLoLoMHNmOoC+2PcxC4LHZnZEzsbxOkilWaLU/MAGyUqTi5O2IDQ2Q9BZucXqVufsTPqyzPAwMxs9Be6vDBtijmeUfSviRskxqBdSvbf7EtXtKYJvLlrIS83v+5n1M0XzJ+sEutMeTDL+XbMYG/ujVTCUnpTmJ5NPN4xZGBZw1Raity9r1pbFnmVNG34sFfiJgLISncvmbdYy58SmCxweYAzZndRjXV3K4aS/wAc3FsL1cx00cUywgl0X8upTjMW40Z/sNxsVi0lPgP+JR4qlx36zFXaxL23MdIA6t3LgXUKhBnCN3JepQ5VlEt5C8J3GZS1WGJeoFlVMUD5xH3I7ZShNxcOYC2MmqcZNavnwgbuoqoI74lcR64978OZmUS+wCfcl0V8pszjcNwDPTCVbonmyBBj3La24KV9xLF/U4/BubggKxCXCu8t+Zczey/M3CBGWPX8R3RarM31DeR+e4B0Bh/Yi1HF9Jnbhl9RbrtP8FaygPM8USvIhXS2n2r9MqVKnV5QfgWSOtRvnUSeHQW64u/7YMUGpp7YczKHVGjzFkMfhhTyR1qgxq5rhHYqVnoD0Sj5mII51TLMDKl+Z1YS6xFZkudpXzCtAyhizbK35s+5vGYLsblYA3iD82GXIcQa9egluMg0f1UxDKr/AAw+CZ/DZUIi8QcExV3R+5kermZUtKrxBXdmK8y67x/mOvZnawzOJg4z9r+KHMTvoF0uP7h3N3v7gSoxGq/G5/F6dorhgaxi4krT2yp4yjDUFalOshT5/wBI7xGrs4jcaqEwZxf+ZXVqVjH7jHF9SoLFd02y7ZmYFQKgLzX4AgU5lQXUFYi5fe5xy8lAnGQz1FFi2vFm3ll9ygR8DpFY762JszskfhzGlbSb58Sqt+iWHawm0ZUbc7h3MmZToiAdsKg/jacooNblGNig7YilU29S/GGvwZBVgAlchOD8G5jdr0+fKVirVMPruXgLywjRzH4e0PEMy66LUaDspR5PxH4irpD9y1Qpi+ydxBQdrgdniCtsekXsM+sRL/XKkZNUCz6QoMV6HU3jiFCQkFt8EfyUAN+Y+pXzYkMn40fSUuq2YWo+oNIZHBs7+4ihbs36meuZkIqDwUwnDmvwb+pxqlt78QcouZpq/QRSzzK2FXdRtZtFsS7BnNxy1RrFX4iKmBLtKruHw0amHsgGY63MIioVLLqj9ssqD7H8QD1AcSssFsb3s2AX3EA24uGXHySc6Fxhmgz0/RiN75fK9wPiiW3G6mB7f3Ar/Uo4R3iYuT+nNzY/7f40/jCF3ljRjKr4cz4gbSx7g2FKixQXtXYXPN0WS9phA0v4IFU1GUJmXNHMX344wmiU5T2BAsdlQw+pZdMCisNrBm6LlSAU2IrDM38MxdC6XGQnMAqIOOL2XCYAN8jqZx89fxxe5TRdyD/3/Mv0Pl4ipGwrLPHO3uAxdtdkaYq9XmMkCuQu43kmcr66i3qObY6gJ+EoADB90BbEDeGBxwkxabjHJMuifAy/oXCp8TtGZb4jAaD1PPuLhZXZeO4SS2qxBlJiZFQCfPLt1+H3UClzANe5/wAxz+C4SHcvMVp2Rx+s5agE6AiyeR4YiTpVIqOmFUNfUVWpTbSMmAMW0R9CAwEu+5hT0Y8/U22aKi6CEJs5qX9Z4rlnIl9Mvoz/AIqUTZEYftCi4ZpD5Rx4mMWirT5zHUujEBA5tlmqeZ7/AIHGO27YNWzcJufKZhtFn/QOY6UYroj+I5Ttn0ReZxETVOWFV9lqKztzFkKVNKuJTVa8F376ng6hdyzSFxTxLMF3BBYasbT6GBKEO6ntOzlL9fcej8fshVK+UDte2bgB8f5b/Et7fEqUURYl05x0Nwjmhp/kjle+sZnCQZTf/fcoHEVFPFVwGIqFXiNY3mo0viWXqcLGAHiJAShrqKzG25y6/FK6Jcom1y9rfcq5bqVmciiw8oByq3lFOLq3FfbHGh3+SBFBbpZIIFvsx8dymZZQYzmURRxPsz4R1QD4ljOelCWFEBpBvMLguEXrgTkh8zrcVjnzHg5IlZkABkP5/BKLiu2Krj8sseo5/E5pb5YyDaot+OvLmKuB9BXCo6wzjhDfYfxPLQW0eZggCyQ4x+EM1kGap7jllGXUW5Zsf7RsLboaTOfcSKLHVn6gFIHLthshUz1iG5YrJ3Girz8XjuHFv53HleyCRpGEYxBhMxVuL7lsNiN3xmLsLPbX+blDcI8ltTYmlCRyOfNswgujOM1HgjOa/U5onVF9Rp47z6IxhnEu2YsBOhzMuF9SqYMsY+ya1+4OhXDEsZD4mXEr2UfxKB/1ZhDbNCJwgBLVFXqFD7zDdylvlErDMMzDwIbPU2+Y/UJwloZKLALWNNxbAMyhUDOp1ehuuGhCic/xcqvVz/7yUMYPkYdPxf8AvqJLbHqHMXNloXIP3PVRH/Cytf8A8bMXoDlFfA3HJLu4hTWDtFW80HAgxN6UYfERCEjxHKmNon6mCwtJWPSVFevxU3ae+ERZF3EFk/EKdSv/AJQOv4HZU8bnaVLG6o6/+a8SrwNGq/JtmSMu+cecToX5XI/yg9kdihOX8oV+zSG48igyeSdjPkjhdFtLY150luJpCzFBDaynccxh8YfzPTYUstfxTUszUdA0zcbgzRQ0l8wt1O4NjIveAehAma9/kPMqX1tqpv8AOpCumaLFuW5fiZvZZ+ocVgy5TJEvRuEIpxRoh26oOvMzaHA3Z3AfC4O+R5l5g/gIyuu8P8Sw8jeEJuAvqfqYttXqGCyrOFgHEKDf9QjJrJlES8ibf8Z8irsf3PeR/wCNTGC7uY6hDYO/UNhjQRXFxLueuov6hSg2sX18RAAaeLahYW5CDmHAQ2tUVHlZmhiqAHouc1elTLctZ5g8A7GePw+3lDqoBBGWEWjLvMZt0V/cOSXVdxPnfzAoG0XM9yjWNQsFd6LpL/f935Lj4hfndU/Ue/8AUXqoKXKud+oZfxYjdxJhpQxJttXmWDozLFOfxtCEuSbH8H+ZnOz6Bj+oxZFKNXBMq2yWKrIPmcQvbG4K7P7jdG94itbbbBZJSsly9r5KjlGexAsKWdD4g9VpgEof8o0UD7hCZdgRrAUzPU6DDg+uEWN4crUz6tEHrH7SCW+iJwh7MdX2D/Ef/BrOxPSl4Og30e4T0GWP6qHeohGB0wJl+4ti8iJ5S35i2PPNI8HUTKsLlANbqEbGeKIbRELh124Agap6wmWfDYsyy6sdoQQbOtlqXMGa+Zxck2VMOHacBgGB7ezWLcRBtVs3XI9K8QZobNf/AB1PQ1uGhvUUUpHRXQj4hy/tJ3emsnt3LyWqA68R7jNy7gdBfwKJtgwbYg0Cm8JrPqIpcvYEp6V3/wDbj9P/ACrk/JXHEts/5T312flCIe9Gd+prciIs3ugP85ltfJQSpkv1f0zTxo7H600/WQgV+mz93EZv74/EtEsiVo1eCJWFwdQl4+Acr/mZAKr/AKDxN5RvITd1GgTPIhrFdiyGiRrLLGcrYa8zD3ixz6imIHl2lUkdARz17YFpvgZsW4l4/f1CSjFXSULL5K3Avlxr4mks8Txz08Lz9RbicCVm2L5/iW5foiRDhU+YzhmzL6nQfUMg/aaktjyqV8QMaeP9QBzGre+/f+JkJ8sTbR6TesfCDiuZ7mfze6cxDBZLymsfggI8Ag9fqOTNzCJ5wS4pcy6ZLMFR/gQb7IkNo3AtJ/YxiID+ERXD6Ihh4cE1+opecTa1oe45fiWuFUZi7jGau33Mswd/kjQdAXrMQlp3D65t3cpnJapRK0h/zczZ98JUTMRzzetxcJ3XRNQzAJnU/wBRckmug/tiDhGqr0OYtkEOqTOZTxtm2XxDG0WwgmjLMrg9J/mXnIqsA99R7HH9SpALxKEIbMGeUSY8STwD3NsDQOUtfYq+4aPoii4dYl3dh7gMNgDR3TxN4Yo7YXEmXIQGNvSckV+iCbg8SiCYxP8A4lDwIAc/e5wiKsH9SwErgolINnD/ABDMp78EoyvRZjhIOG38zDsR4MG+uQDHkZlz1cfmNId3D/R6i59Vl3uN8bzoeLjXaXC+PTKMEdVwaxb/AJqIsqBP/NTxz0eEfpmIZ0bRqHP1SLLLNkOah6CT7cmcUKw1s/8AVDVEb5WDmr6Mwngz3ZTH44VjUDdUvbOg1eUf6iL0D5l9M1HxuJU4PkgCYrMOHu/Sb8w4g0UUy1/UyhIDAXNRY07m8WblO5YlfO5YZT6gnBlxbc9o3xcJsvE8X4mh7/NWdfkqVLlnZfPwy1W6jQapS8Rj28wJYjZVOopobXjxKMP8Qy784JZTgZqa1SC3+kciciw1meYIIeErqnnsHh8QmUMm6/rUxFa6JUH2KDVcxzuwsGMweHUUYngzHLwbNMOhGdqlKsxBl/yi1l8rLgh498SVTmG5hhcrf9TBnnqPUwQ024f1MRJ5WEKNza5plZ5ZQyLlLr+ZT86LNPcR0gyBlh0sTP8A1RmtLaq2XQo+BQzAZHb4P7lZh6JenVTUwZRhshKlXdzzHd3iPKbBBKRXg/Go8odf9uK/onCzvOn4xljgb1EWw4NXyTYYX+iHsrzPPAJqZ1uc/wCkyaeyw50Fj+e5ieiJDxPMT6SXQg20U97jBFOy/SYzCac/MocosjbjFUmZYaeBUHM2R340vuAbyjWzzhmAtTFmeEGPocyk2/SEXYdRl/qTSvxG5E8y+DHySlm3sjt/GSVEvRZ+JfG0LK/mM1ZjViG0X3UvhIWa9IMUte77heh9EwbUyaEBjYGaahYVQWmmHkMF3FPdKoo+1a+I0JaxteJeKrbLX+o/94yyzg3Z8EiX8TnF3q4lObj1ETbUXL19B/j+pohyQGlyirpdT6J5xhofjtEZXmYpvdFEsaVPIKZc9U3Y+kd1+zR+ScjQFmISgAdPHEoVfCYMhcumK9WcOLNfqGCA1hW4BY27C14zxAfdgu4OatpG/fiV4FeIPuuYtUFdl/UwuoDjqVd8QoxzRFWHiVd9d1/z7/AN6bmvOZVVLRELixN2G/mLqYDlzKfVir2PUx0SqC/hM0FcxmVe89fbzANcCjZca2TBO/cVl6macn8RTuBerR/8DEHJXMWNJfR6SoPcXEu46mKZkN0xoauZjt/IXNfm1rNVR4mUm0xJq4rr1+Fg8RTY13A1WGZe+SDb5nKt6/5gluJimq80B+2NOvYCJfuGlM80lzGaAEqZGxn+pbr98NKiNj5KPqAWOqoUfGYyZigEO9KYgOrQZXaCVywo2jRsfZK3IfTcv3u7gepj1AUI3pVK97zcGArOxABKOmwMfFumJvS+5qfBW5vfDEYCzFWa7nqQDEVcgkt+SMbTtNEhzGBLIj/ETmdPmAbKVYKepuR8YjNPfEeFi3SiADV8kxVCfD2B9QoRHi7FpDyc/wCJe3/IDqF1gF01Mikxr9ysFbZjiXTagu+SKLkvJRFwqXdYJ5CTOI+2jiFHbHCFeY0VWBee4NLhpiNLHlU07lwoAtMIrXedS5Kg1W0J7sNVLX+TNo/aDtT3ZDgMF8I+GjQHwRYtdbWX3M5lRWsVB1gX2d+JevThXcV2xXih9EATcl3V+EbDVlbi7xBw3b4xL9dDIly1yS8ZoUEYos6XSJ8WblnuKK7bbeXEJd3hcsojARFxstxmFrZs7xLc7q1e1mZbgO/7aKVHxfJ5IeXTEwHnqbXs9pE4vqcccXURcAbNx0nMWnwrD14ljcCawj/EV2UXRsiYVcHU1hcJU/0Qwlgt+UEwRsJey2lzI7huW62R/bKJYMeK/wAyrpSvX0S0/gJ2WMQJcMli455W23mOH8dOd8TPr+CGV+XGfHcsxOSMq9+IP8/g6UJXzDzTAOH8aqnZYVmXzG6Hw7jV200WHmYOnY0+/cqSxp2+E2YHsH+Yinw5bMMgHXOVjl5hUxSt7xWQuUH9ymt4wGf3SmsJ8zn6eoBTXLOPUQCuMrlnE8z5iE8jvcnuO3Vty+oVe6VSlo3IFCebnbPAFykt3UD6wxUC5orn0SoMMbhpB2sL0QysD6nnU1a9EUygtFfCGozqKp0zbGPkLzgl1BWu4jQvJlkKOPk1Kd7z/kmJ+tKyNi3HiP0pNzU+wM/m0yncA7gYNhojJuD5n6ypKe0+S4NZUdu2DY/SGqkuwZlCtdbmaDbBKnAPsZ/cUXSLTOScHMsDEQqJvHhLAdrdpsM/9iFn1tCv+YqV4gf28soaCcFWeIzrtRV2jCgpUH3ZEazEvpohLgDW/qJvcmyV/mNVnCHJHE6b4+ouA5YEeoeR+o5ZWWunUei1+JWsO91Ubuj0S6HDu7hANYXRSBw11sASvwD/AOmi23GNTk1/8PuL7hMpfnFJX9ycjMZxd2uWK1TlehHcQ8HephoS81z/AAfi0Iapqj8xKMLRjFQg8DGrpLLRs9+Iawco4maugD6YwM9KjlxCdGIkcLcQO0yhjZ2LMVfN3+N2SihPm5/nxKce0pZZHFbQ4icOI5/AKznCYr4I4pfcjGhgq/8A2FtGErAepfmET2KuE4jvVszaq7VNKEtEbR7Fr+pvMHQIym8of3KYGbDCPhdS4ktXyv7jc5kA0Xkplu1t3qYYvWsr+IHb8rIu7X0ZilduRRBlg8iTQjwWreN3+FFYOVagAS1bcbc+SH/sRgDi9mPUqlbVqVE7VBVFG3VX/PiWyGCDkDUS6FcXzR+OAd6cnmLKwAX1qFV6B/ZDPHCWzuiC5p76jKQVHi5TMfqDor3GzInAMsbYZ65laG3dLO5emlbzUW8g2h2VknKxnFrsZhIBFFcFv1MbUcD/ADBBfuxjIDZvojMXG6PQO/BGUlLDJQs99lvMyjf3Ln8iOcr4IWyx8ks0n7j9LaslTD0Uwow17X9x8LPrKJoGv9qJsI1bJmC4L9Sq2ekuQhqyLuyJ4hHW7PuZ5WfEIGnapaj/AD9zjn+0+DWiYYZ4XuXYC4/4MLS9xiumUKV9TzzzEZYZyl9sbCCVUu40fX+pTFtn98UMax4NLu5foU4aEzw8KOaXLgVXiWttGVmFo9D/ALiioALPiX6ERhSZQ6ZTBSiMJQzHtOoBmZjoZVzKuMC8+IpBVqrtlAJGPXmFhg0b9EsVcfEKKPZqZ8YS1/cpzOAeGIs4Feiozcha/WUjtpzcN+CZhbvTN2u9ZkqPT+Zp6Q2pbBbqULK+BENtTCtvicX3xi5V4moaGHHA5h5uXQ/qA9p40/3KkBcKjxGBUqkhm9X6R82bwBCsDzs58GWBLWZOI18se1QZdB3coBFraKyz3DmK+l+9kTkA5pLLVx6I1u7O8XDF5RkNOeKF+Yk/WGFEzRpl+5ulmgI4FQdnTLXZus1EN39ysmhUM/7C+IdUmlfyeZ6gqMZaMEZTsIO0GSCtoMCmDwVcqtd2P944GhWD8IldvqUL28QUbDiFD0EEMVCqdV/qFFIlLUxU3flOzTzpcwxmMJx5hGA4WipUyLku/OIhpVe6r+YaIqCzfUVRGX0rwEuibDT/ACiz2fgjbZnF3BPZ3KJsgtqsywoio80vGIOwfaTFAe4z1D5BjD+kh/1TCsjev9TOF3tMJZ4yTko8QTt+YnKK+JrzmL5h6hyH1GFH8Ro5lZ1GC+OkFBceJVzY9YCr5iaKh6YylyrV4BzG8ClI4SFLvyJcKRZyYIeX8sscvmZtCrOarzFINYZqFZdxyzUJe5mufiP/ALDBY4N7/wDET5PqCXQ5tmAdzkK/YS5SztH5shby4jQm4R0x/njMxhUt1Gtwg9bKo91ERpfA8UcRDs6rG1L1bCdwOQ21cGbs+eZBAgaL44jiMFmmmyxmHiLp0W8u1NimVj+04zEpvmdRsFDhr7ghMOi16jo1kpsuIryl8k1rENVoG7OSHa551ETLIAtTmuoKkhYkyaH2RFpZBCFKpUHFdhKK8SyeNMTrOG4rG6tgRqNZ8zForqsyidDY0x3a61AEQk+o+yZsR5b+MPsbj2RoGfIvAZyW87+JgPiH/E0mfd/E1xfRM/tAZLnP6h5CN2b9yzSLBti47lK61zr9Rxo+oWHZJb6KxArzAd5j/tSy1cf3NycyjgaIaEMxiolTq+2QfMpirtBX3Z1kg+T9Ix3Z1ETAwDjuFFqBXoGl7eYCoLHFAu0hV9dawr77gB5vTSAdxFHo/wAi8QW5NNaJR8eQP3GMlgH05TqSvHEpZh5TZ1dG4FhPk06axcs3XsRsfuVPG51j5jCxF4IWcV3C3Thc/wAMn3OJBypXzCAHoKLegmXHc1QeIPJDuEbT0bSGs0dmCzh6Gsxsgd2v/MV2rOPd41Fu70bdbVgnhema/wAw8Q40f1iP8P8ACCyGmVY+3mJadrsgwt6p463BLEJBWPtk2fiQSqY8sFow51dzGOLQ6QAyfgJ3XeIpkR8gf3GtkJla/wCoPaBFbpV7XMFGoW/tGjBwO+pgdbTv5eYgA3sbjro7zfw5II2oUwRgqOOydylTJi85w3AaMcu3uUKsV8RU4xCLd1UUqcLWAQamI5JSNOLAniLk95h34AAzaN6f7pLgRSAIxAYvkigDTeWFVH6uVNMp1OiD5Q3zmUWsvpNmPIcPxDAnRYtLewvmMVUIrSk2D/qZasfNhHCORhHhOcshXKEQ3lBtzq4yqnhbr/MDLTbgxo8Si4LaWamds751f0mTiYJO9DlKZ2D0b1vEar/YfuUHNPpuOKGXxKmoPZTF4XPL2hyWrnmn1Ks5hXGTV1AFMJ4jOit4gQK9CxUcIb+QmLg8QusIvISMPCAZh0Lq/wDMAUa+f/qLtocC5oPQV6MQ2AMZXTp3LarSMxm7ZuAzUruQCsfEJizoWvVsZMiCu9xIVdy/9w5Bq4p8QLFxAZ4CVP8AzFkiOX+ER8CZJaZwApfiWlzVoCZKsY4fsDMJPgKoeIO8mQfyxqIbgWFdf4iU2POvkb+YAB9D/MvOQ5KfuciCtQwyPBQ3LhXdcf8AaPlwTlnOZfsLmcZ8CPBpAzPnFVL/ACpd0fc5zA2fnoqGz0cXN55RgCg1LXc0t3tW/HmUJZvDTnUurPmwp7xuYKvNjbX6m/PlMEDnK2449Qc3nQxSIrbg+IgxjYT7lDolmxUEAPYCTM+gjjoQBfnYVFQAX4g3O94ZnaBHHTtyJT5+pYXS7/aKGDwPiY0RVe2O/IM8SvLDRuOjplwfT1LcsqElAl2ltHzv6j3VL8yhu5kOUZYKyzjF/F1DkDZctbcupRtuZTnB7IzJdFLX3AgUHj9xwuHzVzNE+3N+iMAvZEsfdxIKbL6/uHSfJRIRpX6Bx+PuwnJMx3Fo2yamZMxFn9JcfSjt9Qxr1N9HnV3Ekyd4iFlAfGYTw26x6lsrcazBbW2Gj+kpcHxBRKENOvqa4QYRqFb5VzENk0N2nn+7FND9wWrQvRg1D0AOCDc5wQX+iVZp8S10SRlJ0MMKFB7b/DDpvdin8zEoeykUZfANROXg5gwg+Ns/jrqZ/wDslMVu7f5jErQgUBniAX1LA5Gj2h9IhqWv6xh2Ij4uY0i0hAqltCv/ABPklifzO+y2x9zQn1sPNKTZKTMcJTZ8lknQnV0iIrk0fMzic4L6i1n0UIXyken6jniMRNa1Q5QeuWlJ3AYDlFcE+KOBOYiLcyA/xM1tDnc1otmkZjS4sXupinm2Y6joCnQVOJbzT/MQQRwIJmCYQSnyO7pbMRNLPzMrb4f1FVru6f0RDtgE/bcxS4hYOolI21iKFWEBVocXMCn7SovAA6Pcd4z3h9Y1PmXVQ/qc+aoqr6lgPe7FCAYFFX1LuE+QfzLL1jEl7Ze5nFbBgrRXEWGf1IEAUVuIw14zSVrR4Go30AqZCxdtkSoazEwuB2MIhaZLVnjn0ZxGghL4X3HGz8mRSxtXW4UoS0LFy3SyLad0S40i9CsS5o8MtUGrK1EI0VIVdv8AU7JzkMwrLw7IY74umDx41EUbyHWY5bgrDAhwyZYZP8fi50TmJbuGldeIDspmLVTKoKQ7PqWqWN+02MnvuI71HbEq4YzQUwQfc/3SMlJlFuzLieR9Rli+5/2j2grODiCTpUerrJgcPpGkZcjf4nUHVULWt6/iQywpdcVv/aMW/KHG3tSIDw+MxA/Qn6lXeOawO/IwqlV9v9Rga9uz9TRocHcFRXkV9y2Ho0D3GibpayxyetV+3UuJwSaKKCW3UGkxUWT98RE9JCc+2KZHk2/Ux5/8fOo8XfzpNwV2pLIhyFZd2zNgGDaNCh+5cwUJfsZVjsaHxTPziPo/YrN7uBqBy6V+pkfll+opJDkZksXJOenxDqGld9Ylr+tmOYH5CIAkMthqGfL2EJOidn3ctHX5FYjPVXeyZJ5Bi/EV9Wi+6qb5QpbzjP8AuJqD749TALPUbl/YYBwXYQraHtZcz7IhFiLc2Fti3Iumv8wpWnxW/ZBoxHgY5MubA18anEE1dXi4YhV0D+UwBw938ToWc43xrHJI8gy/RPQP0QpSozbfmNwpcm5UGi9hEguMaXBaekkrQb5kpIJy2TAiEW1nxOqpGnqLbE0VTxU0AHmpQS63hep2UiE/w5mq+2liks01+HLIoDbKZXfphqIV2R3GSZH3Kl6tt+eJRMVHDp9wBYwmcZdcob5bIjxV+l3rriNGe9UofMsEamsD325g/BLyo4Zy151+SLicSq9dxpepsnonEPXoo/xEpVObIdhL1tjpfEt3cqNmY1N3F2Xs8fMMCzhdrEqvFKqVFNG6XUVJc9Rr0/suH9koS2oBvAKnOlakOPiPcu+cn7mDDZCOSXwegLLmZAf8Jc9iuTBrHtAiuNWVjKiN5r+IvEh8Qu+4y1+iceI1RcX1HlKjHAZGH7I9hPkCAroXSkfyvG/IVupvs5kU8y+6iB87dj1+5fCHOFJ/plDGxS9eHlg/g5wlB2yqs+kWw38MRr7soTZMcw3D66ANkz3MhFBgsviboJneZ/DUrv8AVTHQT6AcSlFbNxZgZjUaziAKdlT9PcA/HNYT5IaXOA3vLnmCB4Nsp4rjcsHpnlmSScRqEOtoJWO89wOTAUD7eo25JTTLWCnUtUaC3HaxSTGhdWiOdMxD4QgXWTYDXp/qAiEsu4g2jyXElk9YQ6FUaluEPJMy92n1BgFwOqe/EA4in8sPYA00xZi+capPghkYTt+5UvlrUrElYFV8TYu19rDcBX3Aj9I/yhRa+cqlbGIUmBzmIC94ySioemh8wRxsviOHIeWWterYx0Dxt7lKInbcyXWwJj4lVyArT4j0hAbeYKybRtjcCLsfA38R6gxplb3OhdXyTkkRo4bw5jPCccRO2f4gXiA6IXdAYlGHqCX5Eu90OGy/1MZCGPwP4d5fUwJeNDIto/ctFoZ0ww/EdrPUirx51NzzBUIM2DJz4e5VqbhVUHMcfhgwWTIBba3mZQUohofEsZnAo5ZfdgBoPhmrb4tELpXlJQwJ8S/K2y3dcMzjoGoZ3XF2bK57ig8c1bcwY12mkblJudFhbqWuhlkV/H6gSg3MDD2I2xevBF9JRcHmUalh2TyhuVyx8VKHwqJagnTBACvjGf5eCZr3IZ8MYqUR93/MejvVmIIiewubwI5zYOQSraZT6otbIdjPvQ4f3G1iy12YlctdJs6Psh8/LvtLY5FnGY4MW2PDK67lWl+bgO5l5D5iA2HyfhAHdAedxl34E/gUYSVSHRLeWEMrtm78Tun6Qz+0wUziqdiJ9QB386x6nMuay6y+2/NRYiyC2/EX9QNS+aZmCYNqQaGFeeZX9UivUVqFvdxDggLeGO42f0H+5rK9hOsvxqpvjJ7lakegx7SKvOxRVrsJN9PlCZeubs2Puchx8eldzikJCNmcdx7W7rhFqP6CJggM1dJWmNsKeyYYu5Yv+4QK6WqvEGrL6TJccf8A2VU6uUGbydl/M4keGoW4nF01PWTFw1QTSRdUYVlpClhNFVE1U/cwW6nHg5OIMoR7GCrDhuU5GHKXs2Y8wgU1tMkucAdA1/MAcUzSV9ldZ5/wZg0wR9BQiLwL/SV+p0K5Fv4lk0+05+IjZp6TcIcg3Mg9SrMRWwADGg8wBPniszrAHRdkSsQBDRHL6j7cfzNG9lSSiF4GSK83H7tSUpcuilk7k3DYQ69Tas0TnfiYyuoBYGuOZU0OixdWJXMd12x5uFNgF2m+bHO5aOwVl++5c3KxfNxqDlpb4Rus2YekqQo0m44U7U6f5haYjgYHUWAxQ00sGKh2wKof85lYh1gqJr6cUg92KNr6H1Hc50RUNFNJ/cIHUDIPn27b1FR3LowTKyrYr9wfY/L7i328LUD1Lg6dVhdcBfDMR02yTiWmsvlDC7iWSkN8ymD5+PUL+nqPj2NB5h6G47pE2fgK0EHhBrD54jx3gyufuUpV9IZPNeX+Ik9EKP3Ab3RkZD3KgMPL/cyZ2S/TifsjtMrv2kxycAn+RRY+XiDNQRcAQVgeFUsAtgUxVThzw/3Fti+JYXxklzWrIs+WUN9nKWcGvib/AGhDmXWKiiTrFb4GUhwwMmYIqqxOVBzOJZwexUEoQIM3yNznc9KiwVHiLllmHD+yyMpbhB/4TICmAWemZ6D5J/SUD2My+1E1a9DEK6K/3Dvg8zlhvqAQC3iZbEidmo7YDrKZQfdNls5A1O5UpFiYVh6inHExCxKu1TXL3HE+wwmEF+AdSz/zirwgYQFOqae5aFFYf8bjeq4KfUuZA76jva+0v/8AEXmKrpeCYB73TUKpRv8AwcZXiX8FyCQRXNHN93KpZVY3FxYGxR+QZywCxSIUUg+RxmF6vvE3PwIYennxNeiue3OVjEy8w9m1jqIFC0NGNn2IGm4bSXJEeZyZ/wDkFptTPxL+U8Bwl65bb30f5i0cGf35gznepfIxiM7ttGBefGRHXkTMso0YaaMwykuriMhfiX5TNngQYXGg4aPxKLwIAeA5lrw19oOpY4G3wmZUSoFcRsytFp6haoLvs4XXPcra+C7e2UY+h0S1eIGpUdYBUt3CAhe4tfsExhurjA4XmAA3gfzKdVEcme7YNqbID6LhKtbmKHed5rMA+8VGzfHHkT/4eLDRtcuW7n6Js1wAod5x8QiO7xt9wqLmXbwGI1a3xCjUGKWUC5rKjDFAyHJR/UC3LHnIn6DsbgHxFQb+ruVUtwBf7lHJ+CMvgfywmGcztGzgviVCKnhw1bUECVAGOIHvXlFCkC7uOClXCq/UayFwZS+pShfTAUzAaiOE+2L8q1k4gTqJ36ictg5TDxLGS/ZDWTL8EYT8u3KtXZapnD1XdRTNbW0F5JVUrwte6lMCPNwDkPBE5/ZAuh8XBO7zBJe/pzLzEPCAh+IGIBEFaXGqynjE/wALGK3VdQRhnOeXzMuboy5mBcDeVsVGT6j3MmCmmrj1B8VHyjtkPdyoMdogerd23+oymHSdnNzXU33Gej7l+frKeF8Yi7ux9zEHNQ9MIIuncs0uJJaXNEh8LqWzdYO3j3BUrPEGJ2sTeqUQp2DMaUGQLlhuWOhLpi6e/wARMCSrI6xAypXaOfMBwk3925c1AsQEso2he1TRTLNaGheYAKR7jfAnWcs5kxVBR3lS6z3Sv1NnxBn7iboEgX+mp/n+ZQiFUf8Arlut7i6bn6YgCiuiZ8+slM+pVG/g+COUqbVgmPBDgZTwVKNfRC2P1F2AdIRHG91BND8oIdIYTjv2TTT4X+Zgn8YMcBA2sRCqbmliteMjQmBAxRWy7+dxY1xFcbUgwtYI3IwsOOk51xfJ9XDsR4okS3/Ojy59imaYHxNvPgQijbp2/uZ0PyoHRXqNwNUBey5iigjeJxK+0NLbt7GAHRDZCYUgbYeZAvRo5PmAT7DVX5jqOzoYWpOxyTEjtUOURPn4O5uUfNO/qGHIrNtf5lEUgG0dUfcqCFW2vvGoAcWP5QyK3mPJU3monbEeGIX+tC3RfEsqh8SqAvAG5exp/wA5lpa/BzD/ADhDMW/Rhn7WfxowqB5AqOya9Mvw/dFfyMRUFB8L8S27eMrGl8qpcuCd4lpKGGK0OpUwfIiQsPRMCGRx1YxUq0614jkM9t2ztkyleHogxNTGhSJylei4jdrVPge5f/wn/NQ+X6n/ADcGVE5RZMPa961CV1m217NzZOncpoFmZcMWJyuZcs81DJac3H+J5cn/AHNjfaMHCfUaNRd3HXIJK2DC1nOIEpfFmaYXbcdtKv0fUIlnl5BDRNbbUszuUHor01FaF638k9REsfMEli9U/wAoGcmsrC1lnQCbXN5Iw0Pbuam9cxrOsNTBYoLHZ1VvRl9NTjpiXhXcVfO97mzDfxAVgcsaIV6nCS/KVGP6uCgF+JjOd+I6HxI4RegmZXtsUDErPuXqXEfZDwANYJcEOA3PSxqqqtg9MsaZ2M8KQ5QCRC7KTMQ5WtDCetF1X5c/bA63Rw9tT5MBZDBvyY/UOaotZAl/6JfKQ7ahlX+bG5klwzDNfZkgbn8pQUHglEMj3FcTAtN1/iGEtwEsXfE155zmnBB076GYLMrxkZiHrQZXd+yPEqVhrSncdK3ct7hbDW5oH8y8LqXm/wBTAlTmqhVB1TiPGHYRGz4JSynsuVuzxUA2z5jhh+LSg0jwRoFeoxy4rkguf0QN2GXcG5a7DPMfNSiw+UubGGcFOcEBar5qDAUQLRQ+0A5fTMarb7hLW+HUahoCuN2FQCBk3ovErflQauOCujzLuVXbnyrv+olid8xAVUMr5miEB5zufA9svz9Jb/4l+n2Q8EGToNFZlnALf3FhjSje5ghAU19TAd2JetxfTLsweRzMOInoDws4XLnNQLJ/zeZUA6zB2+EjMuBMOMNnVQmYhi/n3F7PcwUZvNC4goI9I1X7RfGfFRxN41XJFVhJVAD7JUOvpadxBQc2yvXJGDk4l+otD1MqfEs53ziM+j3KIUBXCZF8wCQmM6Yix8kq3FAtvXIjjkKfMw9DhgGyCUFoqfAvEbJP+twwAH6dQS5cAL+IX85xHeLTY/8A2a6C1QY8TD+jRjvc5PQEfExV2KBdet3GemLfp4MyuTYSPRvH1L6ZypUWW/3aDAM3Sv8AUVogyVfuWhCbkeJrqFKhLn9UbcDyiN2jW6ldt9ncsgU8MZwkvBCrgvliNaErShwtN44hhqZouPEKXLtmVh4AR68EYRhU3GpowG1GXATrr1LjY7yP8RLI2rvhOMQQJjaBuEJQgLjPHE20YT0FJ2TBh1FefO5Y5GaFehLjQ7D+p1XI6e5TheJcJDQHhZ6lcwT3Nn0C5RkUSZf1C3nTuYCBaJqOHiLZE2A9Y25UC1Mi4bMQds4m4VbjNQ/uUj1Ea/qI+hsZkFt9ShnF5mOvO6hwi+CIYHlWpXzaOyuOIbYRG2y9QgNTAtlZhwtNAbly6W8qmAuRZ0o1+5beJzj/AGhOHb1KOCF9n1+AYhEuacXfMvcgVo+OfcIyjygRo2vFv8xtNcjJLn6BqZIfUVw478BB6UOpw4Ve0eEHZBDNXyQXC/zHXZt8tzlB4Jg6Odn4gWjgWssXbEyr1EDJOSn9RDAwcbnykbzLoK9LjSl7ik+EZMYgu37oIRGNY0Tiv8zwJdKu9xCRjgX/ALgm3NrnbFb3OtxBj+CrhrULE5PqXKB2tHjqNNpgxHxrb/EVLRfCUQ+HYxqFCNVGXtQcNq4VLVr95LUinAfxKbhNmk+5mA8bv+Jc2mAC4slBpZa4gvHWRK59zBrzGDBnxUCVKCGVkFcRG1E3c22+P9RTwNAZmMaI5XBS+i79S58j4e+czkxCRUtFnwIlYpWlhcEo13UJi6+VxKELkrBRLy6nkg6Jgrj+41Zx3BL9yKML3ndpQwd+o6C96qX6c0CErplhOinDLSnLiCSlu1XxMkH8RUAQOnm5UrJ5Ll38tMvuGNt2ZDd695jDXtIa9QjhaQckzUHEyh7EcCspIlaq0+YwqTdsMwgE6VKWKfDGzWPVhKn9S42gYFgOXMxxOOAw6tPTmACjEcBYc8mPMtenmaRvBgdJ6gP6dQhu1DhPlO15OAMKvhAcPC5R0gcjOGStYr8MpNvbM95lZiFYiPdLtf3FwAO1fcrhLs359SsRVUpdzdOGx9eSL26yCGXeI2PRnrz6YOv5I/qfeEyf1L9A7LWWzFjhbvM/cYslWIdKzSXlct8kBCvwRfZ8ERSpa0q5iBUdsqf6mGcXySxynlqpWZPio5b18BKLSvmIStpt2PclIUuu5cLKvOsvSgNoRtLeUFh9hSuTvQgnSrtwlm++MMp8Ikg6maiglurrDz9RKZqBUxiMHP8A3cL25mC3LDcbjGieMb/U7NRiS3o+4Yor9IHQt7TNXGbhXiM79lEfEz/HRCJsKAR18S7Zjm1cOQEdQvE70TJyviB0xHhj1ABoS+0tbFdQWrpasEHMoKt1uI6DrTH63LsxYMn75iUhOycabmy35xAGPfpslrY9RWFed4hWnK54gpoHqNSbt5hqsG9rnAfpcEy+ZHz98f5mQrDzEwpnzENP0lxiLqAUR5LjhCv7Qp3DqOgHhv8AzF50RoV8uoAsObJw/wCZy1awFTleVYUrrAxihW2K/ANXMxQsMNQC1+qmrXqMYvXiYYFfUsxIPEfbDGFxFaq/mAyF6R1qXxMW0HhB+FfqHYkmaxrKV2fRLMfogkG2OgH1FrMbUw+oy58cB/kgMA+5nZOmoluYRHnKPKPiLARcpGx3qVCuHDy1PZmALtE26fxz2Oyuv/ide/tfzFgl95uMcLMsbJtNsq9Kzz6o1MiTLtuXRmzYK8MTV58ZguiHMVDrxtG3QomCtoyOLEtL4mf/AKE418DApdHNCXuV9I6X2ykL85lhu+8SlV+7j7leRmSKpbFqxIja33H9rGW1krzDyphmf0Y5DSyJk+1NnUtk0i9mwOpX6OsYZjaZaJRAZ+5rRKV7ingzOCIfIGqhpNbax6mriqwejKCt1gqI9PdYuGWfQX8w4psXFslp5i44qDcQy4TEFXAMr0AP+aiMI+mH7ibp2A/iUCWQBYEYsRf1CHK8ARmAV7/hKFnZR3+5xJqVFxcz5V+4uQoss1wOBQRSLbxP8xuKPVMUkRhXgX4lX+2Xbo9xDIX7qFyceC4ToQ4XX6YURB6F/MFt75zA4nDEPfq04l2GnISvziogWxiRjX/EJ23dUNQZeIZe87hAydVxMsJ2LvicDAK+/QqVINckLOKuZRY5jGXLghqyPJhzL4nRRI5ITyvTGuz9bixguJWML1DeB1VREA/crMv8y1gMppUCquGxpqGviLlh6cR3qHY4lp+gxKNkObbH1iUJuVFtuJXsbnDZ7Z/PBA4C9Z/DYQsIu8EtbZtuOVwQNySXYQC5uodViX7MjxcuRPRRDIeJUcDLuswTd8oYBFYU1xqpnLyynxwQcI84XqJvn2lbf7SEO1zQCHiB1m7hDo+MSh1KuUlRgXxE/wDTsAsE7gp4A80RCeKp9zgHECmVu0qZz5pGwM9JgyV8RfBmFUOrlrwhEqN2MQatvDC/3LB8AqPhBbeW7iAzAYxMRPMHiKjETT+pzKDt0XACVolOi5XiVCn8g/3GkBboYrWlqd4T+4kLPWX/ANy/LH5T41LDNeGCBWdxmEV2VKeIecsYo81w6pTtcbbrLHDwRZsPQqE3/gD9ypOzGiv9yxmDL+JCVboZHFRwBCaOX3Ka59j7Iq2ei4TX2RLbJorP0i2o3W6n/JnvHrCqwcNxdZRxkzHKHNkFwveuXGcz5xBgB5yPzMQL73KWaBzMq9i4Cy8hhILvkY38bnAyNeGxcXM/AoXmpwP0nETtLgC9EHBUcsdlD5gNgdKFgH7QFnxD/EU0+XH+YP8AkIWsctcxGLToEzA8UiqJ+CDcUdYQDt0hROItCfUsyREODsZWArxvmZHB7zL3B9ly4VCEJChaC4vrMveYHsfiU6wdQNZVvK1K99TATZOmUDolulZ2Mw7+KmFZCQ9oUz9k6Q9GUjG/7ibgXqHV2Gcw7hnhmKqnuWWwPF4mDWe5ixv4hdnTcBcFilCOS/SeVPUb5vqbn8TSDepg3W6TT6LCRtyfuGmE1P0KgOwRlaw2+p5MvRb8yrirq4hFRH7MGY3wxKP05SEkU0lwmOqVbg9tBmDBr+iZsuApE91Qw5Gzpmeuo9UM0XmLvS8rmWxcuIKseYVB8TTb0lqi3/SX3AufbBGsOzKJhhwjswvaHhKWpG5HenpVRWhnzNw+V3OcYvBBgUeDEI3Qeblz+8Ez+Tpd8IM2DKwmNEmDG69JtYLdambb8ksjP2T/ABBACuf1MNqivcGQntL3H0lQC8lUKq1CqMQqLLm+B9RZKOVHqK4CTqEXjqUpFTqVHFXljdBTRuOMG5LfqGWAq2334J/kk1T0Q4t4tg8eKl8iHpo+Y2CLYu58WUslkX/ULn4CEVVexLrI6YmIZ8xUA+Uo0QXL4Ss/QYaFXMK5uISX1Cppip7lun9IX7HqCmkbORCdpp2ubPHq3ErqvzKK9eGBvJCYrP6zMgm2NoI8QFVHxiV2wOmIqAFzIFPI7V9+IAsrlrDT/FK3H0Ra1eWCwdmIVlr3VS5GZ7YNMr6RCVncvZbp3F1FtP5EatfzGKAs1aaZwHwAShXV/EyF3xiXJ9KlJtDT+MVGr/awGbPcKz5JOL8CWm/siugrxCyG6oTzDykxfu5E1P0wS/T2xMA/WWkuvuOoi+jBQs7ATzcHeLSY9BNgEKYl3eonM9I3aU+Jc/vidi/M01N6Mxsl0QxiuYOJULh/AKnDE+AplxDBq35hqTcBmVXVy50A5tD/AHKM49cCPcmD/MaGShwThBFzSzxDlqr/AII1ge40BCAtVPMvcq+Jqf8AuqUrT7iFAHuc+vBZYj5ChTWjxnEwGPDUV4A8xNGKleQjAhTGL9EyAny1EZwQVYGVx0LWpa891qHpr+NTrHzMGdny6m2wwGo8LLm48f6miQtZB4y4jjFn9qGoMiCrPENd9JTO1QGtoUDzarefEz2sH+NkYJuQyF+mU8jgKhGnO6jVze5L7q+czIOWgImFrkSmDqPEKlL+ZW2mAb/VgxtP7/EGTAxayQvo8aZjL/Ca+qawV1Gqo0AKdMHXnAgjbch2HwBtHpH5j1cKVndqz6jd/YKmce8ztbD3KUXsZuEKz+YMn/GQM+ZpVzkW3qq+Z5re1/qGgp9rUWWSGhB5i4u9eMQUXQWp/Jz+EpDJc6X/ABM0s85ms++OX8ZubQR4SiAeHqV8/JN1gPETWh1BmR9oiw/cCeUa5VNQkf8ATGMwwHP3H/pG4XY/LUqz9uVfs01O+9CUwVeWEd8uMeo15HdTvFSfqpSNd2B+qmHND608Sg5nIqpEw1lz4hbhfURkw9TOGZ6IT/NMYEZcjDg3EhpBy5hGu4J7ZYPMMbZU9iOAaYFP+gwLk8Qgtw8p/wB9x3meBl+Yy4XNYsbEA3tiOR8fa5ivIbJlNDxFDcV2xHvAGx73A0wS+sSqXi4OSou0oEetwC7HzHKW+UgQPwbgdE5GvdhL6BR5Rg+bPid1PnEFVa9sbyHqS2QL2WTuXoRmhy/UNJrHI03DlVycj8yujg4TUsAnkt+JTrTgcy1zNomf5gUoYPlP9swzEdNYJj9y3oGVbM4sXPyj3pTEcUfOu48AsLG3H/eYYY94vsTaYfTBco8iFVQaxZRM8j7mXLquqgdSDy3NMn6SUY8AuZSyj6gcsLF6CY3mIJS8Q00hiu3tOERmw8OWtM8o0hIV03Bto9e5osJthSBO35incCsTKUocRjSMjFztjodjBsZYHBLTK6BSTk3kFv8AhHQ0AXDpiuQxqx2TaI9Yi8t+ZcsRLf3BuXBLQ8Kgy2wylfNS/PMLxTX0ixa008YgNqHm43Uw4B/Usb4a2hdRfxX9QTqdwxhjag6xGrQ6NTW+BScK9sx7sMrOcQp5gthiuIK031BzaWCKGsShHwHyVPgBU6YRgFckuVty/U0F7LInwuwxCII+aLn+YQ6xX3K1ZHqHV+cvEcrKdF4i+080xGZG34f/AJMYGsS9wHZQL+UhXeO47y8fan+pe+wFw0LJRs3MFxprV4uAaJBecC4biwfxLMorrUsKyXzghncrgeYKGvDHiV2p5MRgrgEDfvoXzHcN7iGB9YiQWHwzLLrObzDayfqJQDPLEZ2ys8MU456v8AzKsfSapr1UQ0vzLzcE8kN1GHmJKa0iqyFqzA3OX+oo7jC+uIFgtbTsmHZ3ayzVx6Raa5Gc1Mh/V7R0vqDLk3KUvieBzfdRBCJnZX3MZ/RKUKG2/wDjNVUapl8zAcnMsw/aBwTz1BZL3XE3j5kMwLO9eZYXQllrTi1yhB8S+CWQb2PEojxYQkwfiCEYI9bxX+Wpntx5gTkJwEGNhEug/BA+8cy1dPDVstsJuC4PHMVLsIXBFd7g4/6IrcXuGJjqTm4kQvIMNAyw8b5nB+yA1Q7jC4gqtjRA9wXybdQqYbzB9Q6cRSAFfIuYP6EgNAHQQG6Qs4zMl2anMQjwAVM2QU4Yngpl4Y9E1qO6Jx0/U+ZcxRwTJ3PuZVFrV4lLMEYH53PFMFf6QpKJ4IbUIBa6mpnwmUIhkKV38TDpUSDQIZ2HKVal/CpeQuGmMvp+ATnJZuswo1dStmCmqa3K3JMw1CkIV3Rs3G2PtXlGcteq/iVDCdMZSDp+9ZqauF8lCCbGIB+sv1+ECxhCcTKIH4Et8bviEZcnJ2y3KJ9RIWHxmJde2iTFb5SW0HxP7oIPY/cWuR5Mv/sXC0QfuFvdWjAs37R9RgBPTMfroFKY6cZNSjQ4ek6Y9yw3+oSoaevyBaJyYX0APMBfDofWIvCuCFynZHTryTpZGAPTEl+RrEdWAzTGViDHOZZLJhUb1HCFzU4qX5bv0mWXXbVnUs9G3JqPgRmGcgg7UJiKSmXV5Ec/B6lHzjpZ8S9r4eGIJuyBwR4HP+JUATyTtNzzGmQ8ruXU5fzAbFZ/CnpMXTnJoZtEa/oCDUjd1sRgGl15g7KfNIMStZSreZanzkcgPOWIrpTFT8SOIWhcF+KhdkfUMb+bM0inxNSCPfTwxorwiRhY/MNxHzaZP+IGUK/MaHB9k/l1FyIPKzY6SaiJdfuYU01aCoLPGIQlT7r+IpGTEbe5ZkF+JTNjpcMI5calL9QuYDEUZS/ggzVrHB9wGK6NmUSXtrqXsD0qAHQpSVN3rxFez3GdCH1bEo6GS1vxAtcNHjGoRtjPNTYrmCrAI7lUqr2tE7LcJcLSjq6g8blWtzKP4xQSrcHFr/cN3A5jkM+mBfXmcEYUiug3NDnZUoLSm2DpOYZKywrdXDMmWZg0PDKF9fU/wJaVne3V7eIK+yuKyFClK6Zliw3uPaGluY3knmZc4rSUCw+DmLFXor6giheSred+JQeiv+3DCU53m/8AEHh+EpVck1c7B5sdZcoaHCwkSPlUpL7FNea5gLB5tFrcYszLe5xHyTX0gK4eCoaQDYhSMRwt5RVXhgatBo56jUWfiAcvEyKxWHqGcvqKFIiXzzDgVBCx8ER1rLdEH1DUaeMxrqzUMXzJsIwv9CK5aazKLJ8ywbYQqGmZhDnPj9IoVcE3j5mVLDHrb4jmqZpYTGrMRWoIr4EctfyS9jogbQTX5ZFV5lOiWHp6EsX6YVjT5iSzreVH7gancXJOrRkZk1Up/qAarupUA/YljI8CVMQL8Ipkw8kyn8hgcWPYT/C9GWpygLMIOi4la2eBmKrySFGAibF11BZE95lCCskp8RoYuMxLqeruVZ3OiCMViXuLR0RqDelAQAOoKBo5sR6hCKVU4pzUEuEyKEr2mB6AvqTFQLFfMy5JmgRwqG5Axotgs54CYCs/+O2LpurGn/2WdydFSu0oVM/EGpfRnk6gcz2czIy63zxCPoPr5lyIYi8JuDF+evcYyCU9otCk8uGcsuA41MyCFdGxPc3JN2zAV8LZHTc+yUwW9XVRTb+kqktYzfmNcluYf3BMFF8lpg0tti41BwygczKFrpAFDLvc+5xwxlaluNgVDKFSDm4WVou+B+IoUg0BcpfI1KQ5D0ky4fSFWvCpiu86zBfMulQBvp8Sv0ekYafRLuX2wxKE+xMRqU2IzIl5lVEDrEOn9TWEH8X6SsyfTOFPZMAKuPcRY4jjSMbpEoNvhxFGFMosNhw5JZhzBnMRHGumH28OIlj0b/qyArDNRIC4rvdh2M5ogmLEAFpMMR/Oboj5bi8WbKcVKGQe6mHpuYUaIW5V0XXyQApzzHSKKtC1sKuFrjGcZv0UWHfufAfVfp8QrvlRvxcYIGxhJcSk4rw1LOqvtAWYeC5ReHEL4Ij2z2Pma7YfuW6gHNzN0JfDLJbpwfqJEytgbkBsv5hlBVIWkvQ/HUH6ABqljMPyIlhraJyRJ/tZlNpGVtvxF2j47ZVt9vEprMATmKskMf8AU3CEJuC4soi1UxvxAkBUXoqYZAKVbXBkG1Mq+Lhc2OI4gnJUHxfUWMKi6LwhGCmrfzCAR9y8vu9MomvdlB7XqIYJZWvjx7/J9mtcz37j0gZ7R3FkcKvoQXcMy0ce4Mp6FmkmBovCf9IVlHaZlOlzgos8DjhgKK4gVoJUCjlAbGr6iU4HmXEEaAptlmfsmql8cAvKIlo4QPTxHr4wbNZNS/8AwsK7IyKCGprw9xO5N8QU7uoL0AbMv9z/AAhUw6R7oOTsGpWrR5gt9/Uxx+2J4gHiLunDqWWklV5/Ms04iZ9aPSYYW5gDc5UekEFyrMDKNhmUoGNV9hK1JaB3EHmKuUIHAdRFfEqRGaJAXAPmOmbLx18TPGWpWeVcz/j8TYvZPFCZIIcGj+4aeld0MfoSYV5ff/i5jj4uGBkl1LU3FQRwBMgBfhlJUnwTgU5gToO1Zm9Ngxc0G+c/UpwZXgNnXxKjUIF63OHgoF3GpddmDEV/fiQOPnMJgBh4gU5wTHLG2v6Jni5TmFThgqKss7fzGfUU5QHyjsBFhuN/LMj4Y/U7BmZ5eALjTCrFMglgO7tk+ZjOVcuv6lKEPSzPc0R0Fi3HaYGhSJ8SvvI2ynq7JhhwHL/sfjOciPmMqB0yoamTFCVZuUEuarWJj1M8cMSYOkymohKhXic2/K7mBeU//wBIkLyEpe/XROvRO+3ZitdI1f0fuIBs1tDHqKjvmWkBcFhvHjrU0YAS23Ic5qNWJ7ZmWtbi5qCkPoHMCHqoo9Xz7nBEjYCEsBtBmuaFd5c1LOH+0TwxmU+4hRsY3GGQN+JeytPT8MvnMryniEk3EQuLeCK8iru281zOgGB5maHIgWrlWvkJhHGb1+o2T4Ncy0huYJh5/mUB9PMpHJUFaBgWAZUF99kfi1eSLV6KtSrUM/ETUTxHZFsQbL8y5VjupYNaiemVG49sTDE7qPFPYy8saQDuD5IDwAlzgihGHNKisD4S1jc3KYMOYEhtv4fMCRUUjxKd2UUu5Raxhq9eSZX+mrfeY4iPRDxN6kjz7x1HbbGlrLo8xsqOT8k1WoBGmuZEb+J3smGEK8MVMEkdiyVzJ5SOa7WbeDuX2Ici8wfBU5qtwSinAeS4dz6xcRZhJZsfMvlB5GZWpAeAjg+QyxAPk5nSpfiDUovAszDXqDs/ASf2F0p60cCb8BmHaW/hFYHtRO0ZU9mGWJ8LGZpdBitCPI/5Rj/BiFDIfNzdOOURRj5I1LOxLSst0GHDcD+BMvBDGv3xIuXiZXHeabgRj30xzxGDWZlwLEcDLsH4YzmCy4LblqIHdk24IDotLh8RoFGoMGN4DTj+Mw0CGdCf0RsI0FQI2QSF52/zLOrOjEIt2GMH7mctxwP9QI1cwrfl1A9aHD+JbXgifzGZDpawzrGi6HjqYAW2S+GZgAYBxNNv+aaxLvwLbYYjWBS+d1mXGxdPUpX3qeWRzlBZzoEpQADxGtzHcWArwdRl+dn/ABQHXZ4Y3SOa2EpW9HijwyxAWYN9xZVPZzG7Fu5bb9Ubw/DDagQLickwjd9k3Y/UtcVeYo8PiCFMUlbKNTzHxLek5395rNHbKVKPqC0/BZUpTHiWbEz4lEEDsqiNZ+JUZHTEauljP9TlmOzuKAL6Kam86MQ8pclAhxiAaM10V4S6TnrAS6n1OnBEQj4dvtuAYTNgWvL6li7OIItsduZjrRyvuXFL+VTL89sCoe8DLbv+UTIVMPTauYyqhvUTwGlQlG2uxfqab2rG/vcf0TBpl9iuQpnOp6CDiDMMcxzWJapM+pu63ZHF4Du46g07eGBbP2Z0H8sscXpAVh/KVh5Cxt/INxqm18EENwbI2T+CxBnM+Il+ANCYAD4Rdm0zTDNs+ay9xe7lybwQss2gKrOMPHMQDKzTvEwHcP5yLS3gjha/MbuZI1LDR4jbD8So/hodzMrC+ZyAHyiuz5Y7pLaNxzsHUJGhIzwQQbnj6A/+kpknxtuuvM6VOCN0URtOzFgFOJjyo5PQTsADEH7lG2meLuJFLHtmRbeYuG8EOjxBKOO5a1S1o5IFXNuoGofoNTE3fEdQ+Wcw94ixZMu5jovi8TEAW/8AUa6FjFXmXSHkMsoZFG7RZQQbdQly1NkPhMl/US5TfSOlDkBdCoAhXqbGEO4Zi3FvPwRa4phvtwPb8xyH0TiA8xT/AGj/AMMyEfclUQ+ZaxRggoE2I11+MGzhqi77nB73OiYIWc1e4OGoRJaWE4s/u5rJqvb6NEoUw5YPqc5Dq4/pWV0OI1yoGqKLnP6gIzU515iMVClUhwmkNEdXFToOoSSVZat+tSoAJ2ncv06PMbLPqZ2NgW4uDplNMyLu/wDCBXJZvtAvf2XmUGf0VBhDLox7lKHupeUW8y7gukw2n+UyqPFNsERPITA10AgLBbzmcdeqVYbu9JYDDutzzi6oaCRHFXG4W23n8RDeLjmXpVBg1qbUBdrmBORfRKRvaNN/EbseOB+U23auFsXutM9j5ljYzFid8pVywoPSZYNKoR2wn1DxXkJSMrZX7jHI/UOoCihh1iaGJq1tgbvdWQT9kHwwjEzbozm8MxSZSOh95gCt49btipXFRBS+hWO0h4GGAEwXzEF0s4lRSJwR33wKASFiWMx7mUWUQKLziNFYRiXmMLmXuVeKofSe5e19xXbX9IHnfqPcX1FgRlEpqYMmYHEOeGWrujzC2RCW2VAKbhMTrAuGcgOonMfOJQaZy7uIjp6JeDFoEghP7rxZheYPhGCFKjREcGIcUsOiZZrbL7SlxsvUWI25j/8AJOQl3jcxGTcvZdcT/JHYLvFhDq2xddfEpTXGMn4Ex1NjQTsXuAF8dEuKAXBnWXWp5GHFHcuV/mRHKvqCLqDmqUuvmmp4RMYL+kyxUXmDSHwFyrk5rklK6HUkF3UCgmb9mzAKy+Uv8T6TkxFXEuYTKGH+4rgnmyaQ13gyzV2m1RGEdL8uIqp/Nm2AF0giEtLgmge5VwF2f4DuPehx5eP8xoANbPiyMQvakVzbq7qErJpzP1Mc3+E3uOe0JAT1Df8AsTF0oeYAIL1qOUeGjXmZoAfBHpfZ9Sj4CWup5zC8h7lFV/UXJlIt8FtZlQAJRTXiXQgpUwimjgdfVn7iOrsTCL5C0pQesQVU2qZ4HhKhtc1qFfcZiJINcnmGZnaJbczeuRslavAu2h+dSgaa+GeMQGG2WBvL4irCI3T1FMewTIAhiZQK2OP+JfXqAreSWSg0FxL4y7h9Rd9uGAGB8TQzfqbh/UXX7IAwK7JwV+o6VDu8IDucHMyy0s2XHgD1HzvmVZbPMeiCdzpLvZKs2PExiBADUl9DXKq2ReYaECDaQhjKIkRR5YyMF5olbYecz1G4pa80eFkuG2Ya2k5V5S0sJanXcrdgSv8AxeJcp4jrwZFzDgeJb3+BSbR3DcD6EzMLQwspCbYcQgKVyglI61mpsBsqZXb+4DQf4RO2eJZlaR4N+Zb0MyVw84gcFlcMt0t1dwYAvzj8BzFXPuN5LjfyHVYl9R23iYf9BlUUWNRfW7FoaDLnBUNKXyJwyq20wSeVG+oPBJ2KmbdhxOZWnGo1jyslyoQ72j0xNT29Cd8YUbaswbQ1xMC3cymPFtsAFNFWecwqIaGfUWbPGJbwXAUlav1buED5x/iEZva3Es2qU0sKHlAFJYut4gJK5w+5cjp7p3/iHbmT47gRoIYec0jKqIa6gl5TLwxDKqmRbNKve4J/9hThV3RE2bdNygbRewvcsKBOZXF4IMivTPIsL+IDGl+IA8nuXf0i2bmoQnI3qULZY6VkbMB7nLWUcmYZlVMz8TzvlK+MVWAeodEhCyFzEoV0t+CWHl8ztSAo3COBXcsZLgwvFOIzMtZYNQf1iPeX1U1RcI9KWsxs/h/F/wDjMrZFl/6JZMR84hAiTzjm4boZJpkPmcAQHyJ4lFMX7od2jtLgvZBUL9y7sjeYAWf1NBbdsaFjDMFz6MHzHpccJvDkwlFh7On4g8MtOKIYmHMtAaVMSARvluJLN2h2b78Rtvvyl1NjFyubxjiFgt1szIMmrvKFqAsRV+uJwkOW26lOJ6Slw2kuFVX7HqWEmubHiKMbYffmYcx3tBLcjW3ErJo6CObZOxdJhZpy6iyd4fc0ReW3/EwDf7TrpBYD7uP1BTifT4liSwponsZRIucFf5IRkjnJU7cIEc8aTLriCXki8wmMoQc8bacRgHHVKZaqbYvqIlGw0/UsRQF4XjvzPXYOUocF8M4hMuPiINdbnqrglZM+GDNyzG+oE3+Fa3f4AdhHI/VA+PuE8NDlIqGgJ2UlS5I8RjAspXb9R2/1F0co07igjqpeW0P4d5pKNoqo+GZfhAnBC2w9kzSjDhiXWnRNDFuogIbiIa23L+cuZx7nBF/+iV/CHNgCVmD/AMEJhWRUyPRULlV4O5TjZhqGL9RC3UeWJ6ZH1mJoP3lGiz3mOU9A5l8efOGZQQXxFl99JESpbs5YGMtZvuDhy1j3KiMbRq8fgqYpEvkCiCow4YBe0LaXAg01+FaIwGMayYnzjS8f7g4sptIHGTZD23qBKDMRC3K+ICspps/wSyFyh9kzhHEIkThzKEc7NjAfjQrOZUrGDZfEquwih7swKgPqKsAZgiLyh7tE04vEy5hrRjRK1IXALWUGADm/EuhMqCos47oxAYUzbFGe7gUphqJ/WRW5XwcTQ7XUstou6P8ASAWZncuD2OfEtU2uIEMkMF8RaULt3Rz1OVX6omEbiHcblXOKJZYPuWP9CGN7DdQBx8hguWXwJ5jqDuQHM/8AgSvLRfZG7U+WWpX1mBleJvAgwV5Z3IwWPyiknyJlUSYhcS2rkkwMxIR3DXIeZTYyhbQCZ/ENYlm6NTcSZeoctX3FCqPFTiycU2nHpKqp6Sme9SXtkXxK/wDBFAvOOpYKBuGVk0/8kJ6riG7FG8LK+5czdkxUw1gzSzMNQEpt7Zhx80arMunmZV/CpdT7wmUyd8zcprJKN0yhtVN5ezU5TfcPMW5cBsTGRmMubfUVZRnKz9RMoXNos7uSLmA/LSjUU+idEYlblM6EeE36O5cMlLKa/wAQ+NOCvERMSn0IZfuU1geuXBRwrjkFMJEZ0GXOQyQruzYdD/UAZYDSpnAldJzASjSL6fcwK0R2rqHWpnO4Rq4UzFGlXnEufRrTwvkhs6jteHs+p04Zy8u/ER3fn/PEq97tvREV7G8z31LdCI0Mbo5dbhLMRd5l8QJ9SXAR/l++omAHQ2J8zRH3A9GKo5Y+IUysJ3ae7hRU3McWnhNcEFxMvP4ckpnuJw/VLaiKmKXxDcL5h1fuUai8xNEoGs+kUv8AhFMU+ohZX1MlAMMxuGerwkV39SdM1P8Agmtn2lWblK/sI+SUt7zKqPTO3ruBhUEWuZS7V8pqpNtMyhtaqBEzKYZm2Tz5f8TEXr4PqOs7ep7JQ8gcQJDDKm4QlRmE4mesGY0umxa+TZPOtSx35PMdzuuHxK/FupUbrCBC21jCZcefFK7OJTKnvc5uDdVA0BeqViNOyPJ8zU2HrtgJbW6IYwY/CgW6nBn9wun0ZQWlcWMY1Fpuru80hWkRBsoW3RMFhmJzhPdrKl5VipTeJXT+kj1tyAf51LmHg1MTNT0JWDVeHKUx2ppg91N2DdUf3KDRS9Q+YVhZ7Ze9LUnOYmFqwBhtVT6JaVysckAhOl3Mrhtv+gg3LMLca+ZSd3K+l8RGBcBwuVA4ipeCGlHf77Kd0lZK1HLddxbdzUyWnmYThombcfRhiPWXZgO4pNwqn+P3FU9/78EAgmVufQ/1CsgvAHVRtJt/gijuL2w5s15qMdNAoOo/sl0bRLIAWYmEqv34ltufowRmPWPqOVbfUBwpnTTBL1ApiDuaXVzUg8FsBwtPO5XTTMU4+JTlcHVRLrglrs/GiYnRlGHrov8AeQgVMdSjqF1EoozZh6iGL4fuE8MXUL7QupT8ylY+2VWTyCMUoTy8zKlvzCF3MS0pEKsfG4VVM7zUZjkJcWbk8vYZhEc/wZfi6jWiX6DmllF2fSEQNR2q95Eaa6npPBKtkZuLBujM6CArbn+Yv6SiXL/6BmK0xx7xuHB2sv7/AATBES/xXliN2f1E8pgu6+bi1W2Gwity2yhK9kFVXwhZn8H2APGdqm2fuGdqh97m4tScugTBRA91LUqc1UXW3INkuIFi2VzMgtjylCNL9Mz9I8mLa1Xir+JaZ0sC/wCWJQquVxSZQMQm+Fygzkuv5jBsteg+zHtC3dEYprsK/wBbjWzVRVvmBZo3qNhOZur8Rcx+J11tS7lqoB4g7u4XALjRtsBEKYLBx37i6QW+viYzN6o/mLhhLc749wUpklm3JAA+kXKKVpAuL9Sq9Jnr8MU5r8IJgJTKELKqCqu4qC3ute3xCqCJxAVxOGMQ4MHiBOTj0yaBLol8FfNwVVaXcMRPi5mbAQAagVCywwcRZuBWvwVkdZlJWAC4BOIqyDmn8a3MrxCV+ekWcOJq4hprxUZyMD+UAu+5jwiHlxyluBaLwYX7mT5fkRBjvKI19TiVPwyPSh9rA7d82ht/GBA6R/zyal+CGV0fUfXoP8H+UKYJGkjOB83ZX9RKigI9iWMThja0EPK42WYlIXcFRY2M6YslYh5BiEPwT/SIS0Eheme3MCpl6mgg+2XAWJyN8TW68stYD0RN9fcBdwW3Bdxwyr3P1CuOiU52lj5ExpomWqYdT+opluKDtMGT7lzcuJd6e9L9zQg5UcfcB5nuBPtULDVWMZeYZXSlGWI6RQOTUpSBZt8wnzTg4HUzwVAi47iq3VW3zupkCGVYzEx2/Uj/ALiOFKOnuXEnxxjGt1S14C5cd456T6mbcrQ9HuYU5gY5IrXaLKBvmK/xCAsGl/JMghKLNRdFZ7jl4H1BgGjGbhQlYiFh2iurzE6idILgELGa0qAwYIYSM5G/uNVbivuxKXR3GAFMkP8AILx4ltiBTgV/M5py1URnKKMwyg9wDF64i1o9MyWOJbyVE4bh4TyZR1GHTMPMsOYMphAizuccQs4IPcFPP1OpR81UFbVh3s5uZIQ2iBA8/iwEWp/2IudX3czObzZzXvXTRFAvK5lNgaLyy5kjKwEQBQkq+YikA7LB7g6/IYY5uhsgpuZcV6ZWGxjv/BLZb9HuB0NDMV37J5SZ/lASeUDgxxr1CsYpUIygRtreFW/iyLRe8/MPwq4AtB8zhmLgDucGc9MCBdN05GZfSUzFRPDEt2PqYFOfMCe0VmX5aX4Jaiy3tYLh/EzL0hOXB6G4hZdlWXXDvJHgHp0gOH7GLh6UAn++ZvE7pHp9NZltqymN9zwvqcOjqWAQOcXBL7QAGOpQLVhHolbQ8cS7b4IMBEC23NiEZcY/Ux6tq2ZYLpYFbqxuJFQdD6gmYX2zkEFD90K6oOqTbDGM2rjAexlgi+Z0h4lGiX857XUDK6X/AN8yirdo4O1FGW0hF1HLcMqRpq68QfMEY7iQSbAQuiMZl0fEW69ODeh5mw1HOSo/Fepj3IYFwoGDDY/BOv3CjowPvzHb681VP55RHb201VHVhzfSBW1RXKTUfVM1p8RvA6lCwwjQfE5LZfAEw2R7wRM2Ym/5hc5esRagt4g2xKcGYCGzH/Eu8REpBm9SnFfhF1MlnPcl+c0ajQ8x1NnzxPqxjVrdsJK/uAZ/ea8cRLk0yyQfKLsjauZF/wAMCLrb5gixyxNh4F8QdBQjuxqo7aLj4lCpdTuuSGaQiNnnUPwYvB3UVth2dwggjzSSq4sNhMUGH5C4ojejTxCFv2mTmZAD3GdpY0PcMaS8/h0eUPomSr7anLV8RTa73DL2SQJgD9woiJLKuZUX8/iAa8GW3IbxBpkMgy0bEjXOyuo141YBRRtIUbcbkVlNsNtbpQ8P+Yul47JdVl9zbKwoGG/KUlf0xNna4h0tu7Lz3FI4ZaCMe9m4nMZcnh3wlyw5Qy50bhnLCREgus7hCFd+ElwZGEq/I0wJ5tH+my7mhVqW9RVZwHe+WGs96T3GlGma7imBq4Yht+XL7m1lcLXxN1HMIl5nABKhCG/9yGeHC5J7mM39SqrUs5o+bF2Kawhx+IboJxLS0pMepeYJ5A/JN6+iblfqWd4YmtfuA417Ju/oTzr7hIUfUGIeYk0mx+bIhALzGFO4iQO6lc/hlA5czMRpftNOZ96Vcoz2uG0DF5k3AeY3C5xw4GOorlaw/qO4EfBLWAVxcQrjvmWCz2MoW58wwUfC5oHwaqPUPhg1ukSwwMhxdRO/2xCCravM4B+Cb8Syoqtn1MCQxvZP3K2EeYJQ5lQ+kHs33bA+buP7EQSUCh/5YPaCtzvPomarTuMrVfRA7o+Kl4XUW2bRh2BL7ttnMsPUFq4sKeSHPhzMtivFuyuI4zdwom96gOAU6qIbLgssbil0SGRiklRs2+4hD9hOBI/igZfL/FjJ7MnhUfw/3PlCSXb6PF8Eq7bNowf7lwVMP5TzK+1zDBpK0nPfEvBBpi4hYcJYH9Iot6SrFxUp1O4xqOWFtFzxKuRZTTCXK8Co3bzMsk8JKP8AJF8lpiUK9QloRwMw7itF6SuHEehfE1g/Ee0+IzoeID4nEDa4rxBm2ZERSl2Q/AI8fjyhNIlnUEc/iNzBbjkafxUqYmLgQCbjRzK9w2Zf4dfgQD6EJzTbWKJVkwzqIttwVtuKLkKjufooT/dqY5JIf6uYPBMyZBf+YEcwruojQ+YV4vREmKyi5fGZlpC9IVC7Hcw6DwwSha+zBrAeVgN/wUoFABNgH6RbeUV0cEIFCrlbH9ljdBoyznHTMBt99xUNHwPmYGpl7b/uNusy1/8AmHWz+7+5bw1LOpZ+IFZVMEGBJtKz/KAZ7ZGy/mcatCxGWgvVim4AUMHa3cd/gonXKFsHi3K4E9kEn6tiEC4sURMM3fjVcxvejG6IXV0eHBMAbv8AUrOho4PPUwTLFieHmMAqoNWzMyudQqqINLLoiEojImR2WaiymbS2wt1NKXuIznywp2NLipTGu+JgrmU87gQOJTZF+5VMGfEuVRAPOZdsH5YmwsmEDEF8g8sUUCNNiKu0e4rMR9nK8OpolmtzLCFXcwSR9QCxV5ZeyKV2PUovJmxf1U6Yk2JnbXqNbFSu6pXsningZ4YdECFy5grZijDDIxeIsRm6i8oE/Kaggbu1ce4BOuMvcalhpnMteYOz+iXSXhe5by3iIvk0VcIzcCiN8Tgs4HL9WjTjiCRzqK3AyJfCgtZthxP+Za1D/sxDcjlM/V9m5Q5L/FbKeYAq01AvKKCKCP0QFU8mKh+OHohGKfMUD0BM0wbyqIIFBL5Myiq1hPNZBl1WrXiMY2T74lDGotOOIXX8ztL7ge55YttfqWYV+uf1czkntjsChaysHsr7fiYDkzvO97/GhN1j1C7+QlGvojwg80b8S+QzAUVEuz7MrTaP5wdZBKNF/cuk00yu24QodnjyXBSZeKvrywEvbpwcGT9xs1et99R+llhsgO0gIAK8y1bb7YDTUZNCgqlwT4oMT5ZtRTpPSpiebZkhuFXAVbAMGNNyr49S2xZ3W9R5lRNZJ2MrNtSrAlToxZinqL3geYAxV8Rdbs8RWb8wbYbIIrXxF5+iYcPpKbqm4Dj8Gq001AhKj6j8n5gcWxkwUsF+RSDDKb8i/jiLGcUX3L23rpcQQVbylDSfSNH1EqC3cSjHz5hEG6KQ242B+kKKJSb/AAqYdoTKM1V+JRKgajREyHScE+oVUfaiOFU31Abt8VLQA8sex9EzKH0Q/Le8Tjp4ygjhdgTJFftlou/qeolyL9xvKB+5TYX5KqAwDkMvzBttGGcwrstxKOJV6lolfioc/jNlI2ynWJa2eGJ+Qmd74lxrxIp2JwWxw88K/iGC56RcSjxZL/KdQxDYvafEJrs0IPF+JQ27JncSuyUbkq9YZipmpZX/AEllcIA6n2qjP+IRipfCuBF4owRvp9xDr8CdbODuU7D4MXRLzCFoiGt/JMa/tAn2xGGFncKtJg/pMMx9aXrG5pHDa330nf69e3b3L3A2bjHidupjSEKcxfSER3MtEWj0eb1P7BiHZi885g9Q0CUMDOR6iHJJqxHipiUP1L+aiDkjxDfqLfIw7URh5mWB8TeYYS7mgxVynmPdB+YAin4kygUifIzkKjH3KOcwsgJLFmpkGI0wriZRygFf/YAAtxriH1Z521B2HDBWojMDYjC0UMUcZ37gnaF3Mp9etZnyd41E3StGCyKibK4/7uJ4npOkylLLF8TPKz5mxj1PWWIK0y9xW+eTBF6g7GUAfOsBKdLDyMI+qwHKThMGvwm7CHcby41M2Z0nW/DfV2+MzyXMNYmYVzEuJpd5gKNC0yVFOvO9sqMcS2y0oa/XMIFxGmUQpQtLiYo4AZYxwR/GMwT0LN359R3jO2q3SPvXFtjgNajrwxUuLJcfEaMsYXdEBa58zQO8+pdvSjj6i6r/ANANago4SvArB/EuzBanIt9IN4LDAC4rs7lisRlLf9TFQYOav5h2EfYlqSPCKAuCth5Tpalu8BGNzGJt+/E4Eg6V9x2vrKn+KepeJnhzXY8xaYrt2cwy0qfJVMVwMOPys/iZtcYQSgkwfKvg/uB/ABqItEU4+J4SJEqxUKzqkuNjAOYPVfhBJXAslRd3xFFaZU2RSWuNH8BTLvwxbh+AmOYFdZi+cncuLXqfMaNVAStz+sxuDyTlZc23EdjSO1TiFOuFljCzTkiuXtrqWMJTOuJoV0uyW1pez7iGOAWtkIsX/H1A82DONbl1wfyBAAXcFxMWOSD7Q7JfuLuCVEwF5WZhZ7OIj0zjgjbRZ6noH7nNn0IvbhCBWoxQXKmytYgv0ssYyr6awzCin7lySuGaZ4F/iVEKeEeau2JZIOA1LAdPlf8A5E7b7l1+8rHEXeFxOEVbcyy5S5ycgLLOh4bqWLZ1D4t1GAzMM3OJVv3BECL/AAOvcpznmaDNtuYW5fcMzbLEHcSAnJOcKAhUVfFwG11fxHVvYUt6p4z99ePwoFCyHmoDqV6N/wARS37QukuTySx63NRjyX0yoaCZKYlYL84EG2F4MPEGdcx3GvKxox1lPjbmQhbOn/v+5jo13K3/ADzAbV/3/uKsQ3MZcNSjzzCHmsI20fwnODE8gasuXszXmAT2tamgMzFplfqABp55EdIPuWI5WJ5pcqwm6zNJqGemMMS9agXMBCrmCSpki3uCYQ1NYliVCFMyAmY/WPp4T/iC8twG9/5ji5y0HUN3brx5l6AeSAKX4mJl2Bd3Fi7L7yE0jTfUChbBVDFQ1VVs3GKloCnqF8QggqOEZoG0Mxd74gFLTn+gYznzSZrn7sytvagLUn5RE2t+4g2fMJ+X1mO6VfcvzDxtOKHmDbb5j1wwydBQRRQL6u2Vc/qJsVNzuf5hdi3qfzqYlYfvxKYac+WcfzMftUxzMPaAvU8I224Su4wDuHEuHEyFHqAOU3jrM4MCWZOGNtunxFMOfufLzAuaWjVSgjeCczPcArLBCjc+Ug5NLaKHjBD/AEAHOqR/iCICWD7/AKgr1npGWfCDiO4ofjiZGyUfNGeiXzEnFvjxAbz4Fw3reYMlZGc3rxMVfcP7gGlOlIEqo8kSos/+of8ANEIKbifiOovwXKahKll08RraZmXNRE5UBI3shMbwBG3bXg7/ADSsTdp+pXNTLcVOBIoHieMMRvR7idPsl2Co5seUwqUubqYcyizCh1Fv/wADXUqCfKNLE1Lk/LUwVN7OO4ctO/8AlqLgYWcxbYo49RWcHKKtojMofZTmcDgybmucYvgardzZnaf3BXLA8keYr9yKgghjInmorUL3yzTTQ5SvZ+jU3p8GoD3fU5EfJMUWzLOwXljLd/vS0qXN6iEVae4NGZg01zPcI+HaieBg+gXfMzg09y569TSZ8MsGsk1cgXFsy+yfhOMq2sNFX1NZ95wSXZYSgKbWUxDSLVe0u1K8069ZlF4T1OA6tbn6Yb/ABN18rBbuIzBI/wAnfqBgFQREVRYlpCHeCWlUX+X+ZZO2JiPkgLaleLp/AR4HDx/Uw9VRgKyi73OzERWxbfnqOC/TiZ+sE4Bc1pvmCC9wDxMLor3cdF6SWrEFDj2mEAvcn6iofckJXO4eLn/MuergFoypgcgiihbzwvJD7P8A9A5mCOKFGCkbhYBtOgjxIWTnge1l7mCqfCSkOn4PwlwId/gUqp3XNJmppDos6MA6i8S8BmFjWptMnmFVxhXEDWZZxFm4wSB1RDg1XcV4Z3bgy0WXBCex9t+b0S1bY+ZMwCop7AzxKCwzw5mB/RGvbSmYdK1q5js3hEaKiEB9bU8QgcE2Qrnv83fymLTAgSnlKxy3o1McPTExS0dQLL4PQemUEC/tHdwczDgAcysn3vEpF16IS61Hdllh3Ebfm3BoDXce4gL3wLohLHjKHy0cEYwRm253RU1C9EHyJ1MMPiG5/cVND4j3QXhyyqGjxcGS3CzSbg0EztOAEyi9Fhx8FZmTDDQZHYogUgXRhn9ygar3EfWHx+PZE3DO7LbLYJTRmiP2/ZLYPpmhXBACDOH9wd1JTPCEsymuY8Qk34DzKoGXcXCHYjD3BcM9WJR5YzvcJW1ubtVeZ/zQQ8sweKIQYQ1dMfaWw43+S+ZyTu4lm0IMuUqfJvbjyzIGZbrfsZsUpm9CuIimfEno0H/ZjKsXf/f6IqrK/uXW/wAnqUG4AysK7JlKnaW6hDMUZCabTKSPxKHkeIi8GJtlU27nbE5hIlkGul9TgfiRmw9GxGLI5X0TCZ5tAr+2agtxb1MtVlFKfGI5D1GyOt6ujPEOyRl9QG6LWCXUUuFYMiQUBYrOj+IsKlNznWv9sUxC30NGB8g6S0LECLFfO8QQW7xFjWMdsInQfhHlEHOodAe8wIZ3qOy/RuMaPuA0PRNZZ8B+MMHQWJsCJEKR7pztfdxUQH7YBlBeqqd9fNELqCdPDxK1rN4iNFEd4Uc1H+E6YhXL99TAVu6jhrV8S6HsunqPV3gwsXC2teCVvuclVARQcCBGVYvLLoxNUZoalbj5T9zUAYZAnuFFPszGrQ8Okuo/RUcstxClP1oYBWJmyVcO2X2g7WYg38iUsP8ACWsDBB35fMBTYGpm3fqEpcVk1Lg1AUjzNqwSa8Tbc3qAje/EU7qJkic1mbKH5KjuH4uUju/xn7So9+bdf7eYVjGfB5Z5ZvNRXH6MUGw4zmpvuZ1MkbTMLZaV8n4DCWR6TKIOEjsjUoZhCQo4jtlZkihO1+poUQjsPUSsQ+SKwYeIBcl21CAdrjb/ACgAX3pgOYOeGWHKU1ZKmZNq1jqVsVWxroHnENK8LzmUGFwQUTW1r34m3vHHBDdB8bisg6GprXmIJxL78ylQLXqPUx7p/M/pPiWjcu4iIy6AiawOZiQni53I1VE26pU3wI9Ck0U3HVyH/I3GxkPa/uFg13rUrMPkzTFHguOw88VU0MkYrL0Q65vM2FDonAmMNBepoI+MIv8AYo5aXwsK8Rt+C6mV3UXEwMUeI7zEs3co41KkGrslIcvk2zc4mKycbubchzjFrrJfQr8ZVNUd4RssMAZ4ARBdK8tzQQ8OZzT6uPXGGaGvAuLLeeOI7iBa71KkkoDP4LIltwjaDmw/iYXFt8QCdzFbWTEZhOLj9zcInFczmBORdSqgsu9xVyq3GqK+MynibhmBHmDCkdVClvuRchg44MM04FpnMGtdwAgzZAMmJZhjmEeY+UANwh0kA2f+WZX4iKQXHETxAJqicS4MoJHbcpsD07nUnxKGQU9FS0lrlJDaLZ3b16igxcqipmF1w+Y7riiyy2b0AVnUBTs5x8xDIU+PmAadjvTLdY8cQMRb6V5hPTyqO7ih/Gnbry/1hVvqZYMbU7VHLVL8ShtddwTdXLqlPxQKmgQ88s8beMy5SQQAWOzqooROLpUbObk5lu2SMMv4gnE+6mg4IMRHuKpgpB+IlapvxL1jBa6zi2JpheFZlzSgt3AXVMuofMY8hTHmINqz1EqDGXnJcZ4vQnCnu5yolpYmRthR8csvJAIN7IiW0jwmiCoUu6Nxl9x7JuU+BjnvTNjF3cWJE2jUvVvKZGU4QsCWdxy0nQEu6aioG9MYnpT1zGUYOOJXY+iidIvq4VbOqKiHilSJjymcjk9sfDmCCMvaiBUzUPqKUKwst+IZ8n0/cs/bX80A4WtMQ8JTzpKwY469XKNKfmY/SRzh1yVs/wAwtkuyMBxN3OKT33Lgr69zPM8GCIBTM6CA8QWOouQ/A5uGeZiXx+EzKlYlQgfjn83B/NxuxZtCoaWPLxNottGCVVAPNPUuLWmwOWFspKXnmb0Bkg49RrCUC+kcyHN5plygbLc+Jmj70qIyG3huW1Gb3Ubmjt5gkoPKK4CVhTOfOL+PiWcDct0BF0Ho1Pom4hgxLqXAOvxRmYxTLzL/ABnAEDyIp19pFxoeiWML1GsR6Iub7kxRZCX5VbgIHepsodSg1+NSvRE7b/UO9gDOhr8KCbgfwKyP1FbzANYirvMKtS+C2GzY+plkhWwz3Kx9mcwA0O45gfSzIbvaD+e6aDecpKwh9Sw7SzkJNgnIU9oqCwFRy8IcwlU7omFCzLGUq2ExDLdRnJ5mQi+4RXVxGQIoGAlTSSbUMI2PLCoBLwL/AKVTBB6DFv7YgqYGRQDYbE9mpZURqH6aAuH/ABKgLTxqI0xaROGWVobOSUqtdwwiyxBpdiU8gi7b18kbHa/xjtQvD+LpL7T2hCJLqX+D8MT8LGYOg8uzv1K5Mq2hgFC+15WVJirnAueVYGKdx4/DpMQlea4lAvB1VwFspe/z4mJqBg7f5hS0YXY+kvGrkeHvqLl4/wCYl7ZwW4HuPUgoHm+ogCZGWQ+HmIpBKbxUXDo4StFH4X8DD8DUuH4P/FfgngDBl/hZmXUJxjvMQzBxTBiaHiQM0a5JwqvcOx9y1g07nlmdCPVy6A2QPLNJXwxPUJCC0zclArqWso9mUx6OYdxKv80w+rouEYMtXo7hrQM3gQttPuRUiJUYqYc1Fl+1mLjwEC/k3DUVoJBb5GUbl8woBofc7CBzRfBKDQMEa/qKtgDShA2peIfqz1FPSE0lxlSYy5b/AO5kB+8AtjY4lfIws4ubd1Motj7MTSPu1FlvesTZmncpcaiDVy8GYaE2pWYvmKx95MDdPcYw6mUXjO5RFaNMzjFzmXfJK/OcI/g/Bj8MfwT8DWMS/wDBHqi5Lcv6J3JQMZgAA+RNCGNKKy4JUb2uZQK8yn/2V5AO3c0NRbHNMMy8mnzMpRwsGWE1ZaweiAF9A8wBEqieImPF0jD0H1n8kHZ8WYjn8Nfkh+CLjHsnBTxHGy9ToX6mNhrmXtfxgQyInKXlBxbX/kWQjDn8BDcXgjlq49X5MLmwudWqWgr6ja2XS5wD4qpRq/YThB8RRzFKaPK9GImQwerhM99jLYDASsNwozFrhr4jOW4PqKb3xHXGGNW/3EWrDQJkSvIu47y/0QPE+cyxsZXUWDUOyb4/cvgjn3iqf3zMIVpkFZfUYx4IqB17cQsCs4ih+cwXMUsc6sTVD2JgDwuHaEqf2aShq7IUlkRdS7EV2TDTK9S9YHgQ/AfkS/pfGSFftcW+4Cbi6Y88xGNkL7xGjcY5jzohVraXKiEqyprmKcQNpYlplOZ7mILOeIye4wiIzdqZpYS1kL1MM1IusLUYBE2DzUfoZpVGF982YHx3DYeSvMpyh6cwAr4q/V5hWKeBuYHdDUZrpw7j/IHFyim6aYuF1HSiCA5l8ChF1ZZyGPWH1NivOZVpuXEtOgP/ACfk3ZNwwEEzsr8RR21BwONG62aQo7YBgqvzX4VnR3KizctCWzcqkAc1AWNeIuKzL7jl9TootySl99II5R9zAB58/wBolfP2xufiwcA9D8HaXLFgTju5QNhKjISVEjKmSLAv9JRy+5ut+p5FNk3kE9JShzdIEVX6pRQ+i48Sg5WddmZS43MlX0Qhfc1g1FJgskYE7lQyTkWQG+Canm58ITMPFxniANJS+GMysILhYqMChUDp6j5pfnDjwK5mszbdShdKywiNgv6lwaSJkGXXIl7QLwufeWieJVLKWq0gwjFvzHaGG5a7umLwMEa1FTJUexC5EFlHMxLTEtEOLZde4Nj6gy3mKNfhc41E8icIoGf35glY1B/zGqEqxMaxDc6hCMbw5CXBWfRfuaF1mhh3HJWZySY73LxOixqHE1eKEeCtMOVTqAqfZl2AouobZbyX+EzWDAX+J8mz8NQ6v8z4l9wJohQAPcVi8fipgywPVfEcDZ4mFXYblMkwEs9BMmC5cMs8TmIjTH/xaquIt0dyhpYItrOA+0p6DmUMqSFzwncNpDJoJvUbY859okLInr+oVRde4PeY1rBSkODMDMH6ldNzwiRgIdhdeLgl5LGELX8EuH9xKqWvdSotuVkLOQ+Z0T5JTWjC7p8JQwadMXo91u5XVh5its9FTECzT1mMQRP/AAVAmGIHBmKOat5h2J/CzffmpmXtDFOIRowxsTVj/JMfpkM2IOEdjFt0JlTfr4leDNSpE7QeIsaH0wuyaJNrt1By5gsuJ3y/+xGXfdoROPwwVlGuxFBcFg6nxZ4vEyQIfBE8XMu5X4VZgLHX5AA+Qk35HUupzKOC4YGnYi/nzHOVLafUo5VNrbxxO6WRoHuVUKnuiF+wFoITUq2SW4g8zNSs+PM8YfRK1gN2rr6hAFhu2MYqatfU1VGFmAhRS7MRwzDUIhGYCiknIoFf1El0HzEsgPLBzL9UuKBfUv8AAGixjlqxh0TZP9sno+obiqC6FnFygPMLgEjhzcRTyuSdx8E/DMQba6qraitVKgIpWr3L+ZbMmsnBGM44EojQEal4xAGj8HLlyoERjFXD5gZq+5YKKCJxEc/jGOx9rFbd+kSoszugNVChDo49QPsrEp3Pecyl2Z6bl/VEq8gdk1pH2jMKAUDo9c+4wn/gQcQwr2ZJfTUCATYjJdNtEf8Auuk+ZguGU+KFVn49kDAHfE+Tg3GwD5ieUypkiMNH/MutrmPwJy6nUzUJYU/mhFNR14nGVF7VyzDhmZ8xY8ZlfjEUvH4ZW2fkcAsWKz2dSzScsj57nBuVTlePMLau0CnHESdtHKzAT2b0xpCdrbv/ABKgRsW1LV0xZuYDVQIysqCu3Q1/9gQUD3+oi99K5ZlURGwZYh5nnJbYDYTQSX2fqIeHka/AIH87MlCI0xuIY4fMNiI0juZlTQn3AC37oG5T9/l/AxLli1pGqitYzILL7mkyqyJVsdxh+alSoQogS0vUQ5Ir1/CWri3XXxDShYLmO0ZdxPj8ENC1alv14Rx1AIguVgDhuCOYrZmdu9JHcZpLgWAQzshUrc5OIARvqDmmE3B8EYLJ9kOvWJSYHBxOvMvnHTnPMY9JTqGp/pU+AQ8sHNQMCj8QPXCyIOmrlhDfMSyQStV8JbGXJaS8Vba3AWII7ii/BH6nHb4mJfXcS2+WBLZovlknlm3U0JVuVBtT+krAgZHklTcHzA8x+EpnlCGbuVKxCyF/mpcSos/fHnJUt/E1T6p+kRwnm/QlzIUu/uVEvIZtslgIlF7Jt67QWjGxCsRMAxHBgINh45iBRcGjqJmC8kGngtLxF0EdMvFxKoA3YCCGKys9xG6G8mYI20cgzc4U3H40OSh/KJsaPDKUVqUJWdzK02okIoTzqCCxx+GG4S5f4IQmEgPy/wDjob8y19AiRIiFrI4xcelBGtAeBzABy/kE9YMbMslgB7e46tqIYxfqLJixYah6ZUuqiI5hLeWXzkfoSu/wscpgmSI4qv6y7TQ1h9kDHHK1D/Ia47iJRDFBHz+Egjkg1UPqWvEU7sa6uiNMIvALHmV2ltwjrmWVHEIzMnCXEj5FlJjYd/uFBFctXEbkAKlaG+R7qDhobN/vmDgBuVKfio5QJSxX1Dcu/wAXLhRSzMhsf5QAKNQBdFyOWGhK6dIb6QVdQW9AbKyluRNTPqEFUX4yTOqXLdwAklrcSxl/liLw2Fx3F+2rOZUWeBH3AYpz8TNsN4GpXaFHirlSVK0/cuI2EN8ReKxx3C3Epzp+KxjpJxt5XZ3+GYEPK3eJz/rme83qJlzP4H/7sWXMxPwDKWXGPiMS3/JDJINJzLJSLh+SMLHE5TXUyYXdRZRmNo2dRP41WCZgdxcqo6ILzco4v5mDEoRu4F5gMGNYu0C7UuIhI3jmW7PTMNYv2hWrfCKbMSpUACrB8TCFs9jGXWFQDUIVLCX/APBFfH4BFoWNV59zFAlq2Tk0lX9eZlLgGJ/DKtnpO38TNS9pVnfJH1GXZLYeMu+PxmfcrMBLgIzvXHr8KEwAvgnSAOQlmVtW/wColypduX/5ERkJrMcndA3XcUXzWs87jXS/ExcKSXq2PSBPTY8hJeDrxAdt4juBUFe25QjKH7nDsMeD/c3UVlyHB6g5h2NgwC+yn4EgsR57EDv8bwsO4SyPicniYFniKtsGJW91Mj+ePwQheNVOjXxK2JKYxRfyTZandZmGaDlUUML+FrmES0EJl8S4Lh3RJTcNy1alrYx3AlfjbsVwfiuWsp/FJX4tpuIv0GJeGD3F3K+SMc/2SkWFCdR3iOdZ1zEd4VWRPC8kFSu9vANtzEwBazGYA+YXLIWh+CEITTS7me9KNQm2GrjlwxwyRNeMUlqvYx4mls+BMY9wNX8agJpGhb/Epah1fy1+4Rl2kuVArhJxAD8Y5hbsa6m5UKrlC1I5eX8Klwx4uzE0jhyS1YDNighzdX53LrH3IZQBt8aPiW4egZ/qO4JnnPMYaYeJSUCAu5+71g8QKkQp5jZz43qBltTk7hcEya1LBj8jmEKysoi4UnPBiIIaXIxfyCHqXzUvOoBjmAockveR+PiP4Qck/gBggFVSx1iKEVW/EZWx/M/NSpRDDT8AeSmFmLE4P/NyrAxyjmWzZMm/yqXuNAaijZ0IuupjCNAi2QvSy7DMTxvuTwvO7xMkLcss0flXnMgIPFJu8+5zKmNbPGYJ/CUKpaYjiIoW7ETJdCxn9oidioPwDGI5VtuGtxAYuqq/2jnbhjUTOJjMSN+ZctzLouBGpdSiWQ/J+UA2NwBVVkwfintFgzj9xZdD5xN4+SPDcEXNlJc1yu8IIovfD8alF1ZpJ/X8Rqk1BqE+ytxukGagfKHRzFJYQU/MJAA0H4sirD88MsRKbtGLddXBcpbE7XQ/uWLUwHF1XUf60hTJm4yEQWEdvMMpvylfEUDRm/X9TtKWw5v/ABK6DlDbF0o0VgJRT/mixWrl5go8lMvgIdFXcABerA69wEntU56mov7CJMi4U03+4uG7VarxACrAtE1+N2210y4Y6T8HY+saNyxtxbK8yyEWZ1FGV3EVVZgQot7a8TSXj+LS0S/h/L+bijElSoS4dAYK8TC+TU7dcQiN+44SOQslw0BgqLgvDxM2nznqX2lXv8fBCaoeYAwcYtSGi/zBdgV1MFv6oYIAzwCKFKjQRiwBVKh55e5aOnwXMPZKQEIBZlrdy0JBDwYp/GpgGgqXTTLrcQRrEoMTAhCBD/zgvxr/APVy/wANWwAdCV/ZiVE/t/tf5l2r1/O8wc5xvB6/IJS6qNIPsh2kt/ThguovAgNfU5Xb/MaRdZ9M0qfS/wCYr6KjLdHcxZ8imyupd43lZf0mnHkzAOOXLNxWdOgywLiOyClfY/4jqW1zwuWzcWhzIHWpsY0UageaEtqZNScqgoHMbZ/5gWKNRmHF9NtnqEaDDlcAGMABq+jfmGZeQZiydkHqX+KhKGZy4k4Eh1NwfmkXhCfg/wDh/wDFQK1+D+a/BudmIN3H5KS9dxgLy5niE80xMSzqZ4DXbE4bZZaYmcQ1FhRecQTKTP4YYb7ExROquMsubS+4Q0qIOYYFjBNIxlhVuAPVVMYh4JqG1+MQR2Grdxw3MVKQEj8oix+A2X/6WL+MBLi/B+GX+CBA9aN9ZTYH5XGt/wBFKxBXvT/4/ZM6lq4++ZatvV3EQON3TFlV2MiSwmWCgReZdARHXjVWHBHtSzNa6lE1HO8RkFurXUadIzrcupLzXJOeQGhx5ROXo5aOYlRVy4p9S6XhbuJaGFW7mpQi33M3lrw2xvzqFa4lOxIY9TNNQcggcismAR4q06hs7mjnLaEAkqsrW0NlXNfiv4KYdWn5H5IS2UqUfnGBkGC0rLklISTjbN5t+X/1UYyokqVK/NsuDfo5jcjb3UC/ldsv8GDTEUBcFubnXEQaOIxJUqJ+PcLwgsD44g0h2GGyJsEiUBZSqHz3P6i1If8AMObSKlEWgqA6lplwaczU3gamUy9y+UfaYBc+J6X7iLDRaqUVziYuM6lzwlIJ7fixfH/gh+H8nhPTRwMM1Q0L8K0uefHmIjcuMxc/SLZd0DDWfuv9f7hD3HaFqQ8o7U3ZzHZBFGwqCGcwOrI97KL5myhyLvqXmyw014lA8kqZqpZJah7jwk42PMRfs41AFumzjhWAvaxZQPESKoyXn1OUP9IHkvbLFoBxZ09QD1aZ9Ib46Egtk58kDf2RxCzBXgly5/GHv7z8ghQEP/k2E19e5rFMZGbyl/lg03Fttl1Dzn8LnfliCFLHEwyojK/CpSJGotSiaHlOQML2r4jBaYsCpawTFjSDDPMVoSoMTxL5uifoQJYaEdVL/DFjDsjuVUC+orjMNv8ASCO8FTY3NbS+IMpq/GDs/cPNPtMODzH4ZyEvlJGxwzHV5gI1OFJWL0T1MzqgtqFGIBVdT5/I/NQUxOCepJ6J532XDKFeTEYjVl5PUL1DtZPcq7mw48SpADwcxkLPIsf4ltbr3/JPl0g/3LYgmNHFHT9uZSyw1v8A0l6AxaOeviIl3HBig0lZYikOYed+ZZntrf6jrdQE7I7XStNaOpZBgbuszAnjgl49RMo2UBM9wm0vXDTXMRFTtY3OCuUMQc0ciEEK8yhpaL/qXARaZV9BV8yvKzI4+IrYXPgg2XCQeYqPMf4fkGXn8n4IkQ5nml/MW/wy/wD3mVKRxWH6mO4+p3F+oxijcWMZI1TKJYBq5cFVcdy0pv8AB+Dkm4pDo4cxqgLycSvjVL5WdZlSsmYMu9pvpGRRhdJv2ji+IGMuC4ajSZhLwxcrbuDe5f4UTBISBBLVRniY+YKovDAb7i/2htH5XMtX9wKbnfGO4cocyv8AyPwTSnytExn2fjdGYDjTSBLSecoaDh/biakbXzXrmYsorVX+JngHpR58woBddE6G0Iygj5mEm85W0tRCs6IItctLl/iNxtwBsevEocn2Iu3zGsZbV3iIalL3Kk6AouVsgDhzmUwFttUZNYGCWfQC0tAUCoTJN/8AAgKU7gsDLzxmWw8Yg2eDw7lDVmbJVbzmcCZFbGnPiAhw74/qUMVXYxUXKWtv48/RdMpmJTKgfhy4p+Ah+Lly/wDw/wDonViOYq9S6iJdwZoJc4lnpmBygWsxEROiXEVkRLWzK3GjCltI2xBUIQRUlzSRkcFbsiBmIXGljIOIbG+YI/ivuZEy3+CyVNojAtYCJqAOOVbiXDyZnZuKMRruqhHmEokMuYuCLyljcqo7h+Q/gMBdSut/Yw+Uo4hah+qLQ2FxpCY55jWFVQjj/MsazM8StjqMz+oWF7wAAxaen/EUrN2paXsbfSUT5BHALHNlvjxHFaMWVNzItOhqacLJ3PMIa+pWHYvCHZNEXz8fuYsfBhfxOmG12GkDxGKLbGpiafdDTTPB34IW9hTCKV6VxC3uq6zKF270ZJhgMUcncR9BPS4C3u6XDZhmUtplotiFvgYoysZKBbKEA0xIAnhf5fg/LOyavy/+D/wx/wDNsdF+8WDEaJDxwguiKQlo3FYrLYuZcVmZUFIBFWZq3iI7zBbKgRVHI94hvJMwdjkMWXcFlQtnETSA5VwdJsZq/wCf4DDBEPyVBjmAEMTP8FxPiCG4Q+TKX7VDmrvMyZuIDFawrgHRK3QJrL9kLIdRm4y+YpdQR/BmWgT+jFIFFEAtAR2Q+nLL8Zzwwh4vjIvIFZRqG7RhyZsY1hoCG1GCKvKA+WMEYUNwC6gj+go/EKnJRfA6g/oyUD1Kb7kNlO4lbTwVCxAmPL+5hGxqi4mICs7JfUyrHgAeIhDp5H/2FhSPJuWrkLw16mFT+Z1BsQVZvMsWHT/Jmqi03cR9OzbNgJlCN8R20o0XbG5TdALfmEF60LV5lGAKJVEJTxn+Y9sMZsk2zmaWcQzLSIug3X4GVYVC/wBa8kqV+LnzMyh7Jb50MP8A3d3+aZajBA6YVLZZh9GURCprvERWlQR/D/5VRhf/ABUJqEQsZgq78VOpUuWiQ2zIhZ9Ih/UROB7PcspOMLXDmI48RIP/ACE9IYEop9ToM2KpjqgX4sg8BdqoD/kj1mI8RHjcVxkdShdQ+MRJcm9wYRJqz5WoArZt/BqoZDRVQBXWLEWdf2TUAbqt+ZTx1nUzxk1FJQWwtfqILIpwhUQfCgWl7N7DxK8FTFz5YjZdY0TuAIB8wHAYq3L/AImSqwyS0t6LgmESVaCi6qAuCN0ZdiiI3SUvk6li4vIqsZh1f/zHtRct0sTcKHArH+UvCnwRTQ1e5cvN/wCKKFTQG2othmwHBLm/I7lh23L1kmXIt2biAsHHriWALAp5jaVeTNRVlFYwjbrAQUzNkw7zcoWJcQi03rZN8/qYJp/4F3Ltyr+L/DH/AMm2OHsfNqIxlqFlBBRIq7g0a4X9SrhYrO4DWsu/MxUX/wB1OPwflVGAgDLiaUeJcGblp4eyDEW1AKNpnFgqNokMey0h3q1RUZ8oaxGMPX4CEuen5wFiOPL/ABC6mcx1HjBEwYP55QlTul7IF1EQv7WcaBH4uiM9+9rUGrrw3mKApLLpA3AdGHaihlcEd9toq5ZH3w3ExxcLS3DJlYNj08DDov2gmeVsZIDlxzxLM7Aw4vm3OZ1dcKVQ3Pk/zExSbBuV26LDL5gY/V/cdZVg4wPMVf8AqE+Ro8dzUKW5O0utqA8kr69rb/iULSlfmGbByu5eZVdMvBFbGM3oudwCOoVSNAGFy6VGPAO8xgC0VwPicm4v+0wiZgDiDBW8Ur9CZK/yi9hzpxHsInw/gamWJ6ZrxMLdsv8A8XB/LiM3+H8UMpZWtD1LlbmCcJFdMyQm7cFb66ZhYN0VczSvwYr/AMP45/G40yrgj/4KAyVcSO8iuwCg6GMGElSvdxBS+mWyyWcv+NyvmEGViSolwIflMGDKczOJcBKh+B/4xUghYCPEeDPgCABRj8CKNziXXIXZuIOQ7rMtMMvGn/MzVCrzguI7Z3bE71YXZr/EK2d7eJ8mBMRXF2A5nBgJ0iDJDgbvzDA9jcK2GcThMpoGxuDrDwYvSoDMYabdtgwKsGMLfUzYWKTXiAqdF2mLVezAZmQsMPkjcops8RWzSx29fMqWfNsEkzKdzI6ztBXKrRuotgCsnUatDcOb4hxd5TB4m7hToK/uGvqvPzHMJ8CLSq1X6hKY0V7hyuZtOb/4Zd8g1/76lKNzcGYuGgcXXcMXe/wAdu/aFRWD/wBEGWl/+hlqi/8AtZH8VL3OyWP/AIfwMIsgDMn/AICH40pJIEjM4ZXUgUMM9GWzUNjLpnE6jUcTH8KEDevxf5XEx1MvxX/ka/FrF3crlR26II8ijP5q1B5X/wBmJOSuCi5bw6KKCboPkRWlxwdQAEV6L+43i+sLBBku769Q256W3UpL8cV48T4ihjZUVuG0hYzqCvJAyIvxELQlYD3fMcguu4uHndxvP+J8AVScRBSvdVmGWChylc8qLwU4w1nMbYRYr2cMpBTHN0S2dLfh09wGukKh1xMQEsW2wYtWBD+ktfYBkRXqZXOanFVez1KBAXbvbL+bQmFsqmL1i/1KAA7Mf8xjZTu43hbI3kDRFi4cmq+5fWWY8wY8sNkBUINDqHZoFLBsmkc4Gv8AL/0D/wDmkf8Aw/i5f4uaY3MAYlNxIn4fzbLn4NpX/gYohowLdhTG6Ewxz6gOQji8QskeXRYmxwZRKj5lBmX+WB+Li/IlSvyiozFg/tsClPg/CpcfI9UmBB23GHJnH7KYDUOy78VE6r7zllzg6NMslN01llxmrEKo3DAr3zP5p1Bmy1dGLmmEWF8S4hNSqIBk5ziI0D9QVp1c08L1qE65s5YgdlLyn+pSy7Iyf9TL4Y6S6CnRVGjxFDTqfqOUaM8fCcmTkxKv27Nf5QglRYoweYoLtim9Td0DOM1qYVaPh49yxRbmzfMaFF5UblbQ0J5lIsZxmyWQ6NlJsd+YlNBgKPhwd68ypTslcS8MPzar8y0yAtRVooorVE6EFd8+JQzV3bPuFLhsMHzyzGHDRo/Br2FMcuhx6/8AYOMsVGH5fxX4KJrGVAgqL/4v8hVmoIlkI5zDH8P5f/xISiIbQCmyg+BjLsSqa/DeGPunhhIhA84mPw/l/BhCAnxGXFI9CYMfo/INhuo+WATJTFspsDN0nm5SsvBWzxUaBfwY9swrgUr/AGluccGM/MAMIW9gf1OF1ZCjlKDGBOoisCJYJzOAWvccHxG1kbCqZXGtQaTuk9RWk1XbUI02dlxcMEmMXP/aAAwDAQACAAMAAAAQiW518FlX0GVgCKaKgUJq7PZhEYS6QxI45Vm0v/XqFFgQ82AFM4mQs8+S0ES4gHcJEEIPYwUROlAuaWW8414y4FwtcJNwewuuyfwTTfANBH1E0QGNOD4aVBSqqlo39bC6UDQSDQJYiMqKHIaMASOkkCUcVyGxUwWTgrMGmUgBD06ccBCssoWCaGiuGZWUgj6D49BDohuIAOd4eIQnvtptOrkEgApzDAdRxMwc6cyp0FIAVJIOC8LOIIZQSQ70G7CAGBKr6yL0babWDSMIwF8jOgbhDgMgNG4KRUGMjCkzv25EOmN0McyCf7TX7IAGZ+Kej0EAB7ykVi5WKBVEWjzKbVhSBAMtNfLPmiCGamXl4HIJZ5EpAWHcx1gkN0EJFUQgW+h+KGDjDSMKIASGTEFFagpMOfCPUU7W8qGQgciIv4YMK4CKXU0skaDrYoeQ2CaBN0wMahSBQzPZ6S8sCzFM8gGaIUeKRJ+kgCSYAfRfpEkRoikkDcIJpQxkA6a1RBIMoQbzUFH/AGZKdIwqmwA5wA5YvwRHbOwnxm5gLHIUJKITKHnCVlsOQAz8wEwfLwcc2+FCKyO7bglh4CY4Ab6V0hUoEEQKatLgOypUKeLAWEggPa/g52aBFpBp6NbGoISBjqkyq0Em2gXxyMHaMrF2jueCu1ABEEpTbaYBhHQniNDOHVX9gCeQ/OhFURILUUSuFUhAxu4HiOs0y1A3gXMd7sj4AChSB/gQhuTRRGOZSu2DYCtMbiGhMKtU0BChtPecNafcTY59Ij4ZBSctIEqvW+AWij7iEn8k6bIuXBmcYD7ArKNCYQZnJQqCbCoo5BGBDDpCzDkUYUY+fM4MkHaQeyeBCMhiPStwcZp4khMKSYMbQDqJgwQpETGh+5C1oAGk7bvmIcOvA6h2IhACFMgyEi8GkF/TIHYCgrgLe4xDeyZkN9lWQEGBmpfkH7cFBY5n/SXhPgNqSvAJLIRHNJ4FB8cInazRUBKtR7xHHCoYjWyxnYlSVFGwu4ioYQL4dcygEA0gp9mae2lEqEaWNO3Rd7AgAJHAAgAPTCPhg5shkFzdz2YaOyQeDLMoUcqbYSfUgH/FKOtu2Gz2VyZDFSbMfAB2jQFLGKdSECZSsAh6RnjoEBf2Ffqu45AHaT4GmPBWQledsQ7DpvJJRlmlBp8wYEgEELuqXR5UuAWmSyBAaBUmYAszNx3PUQEtjH0Acrs+w0dwGG5nBwOb1N7YBub0AeEIFVAQZlrgMRRTGY4lkIZKUPSeWSaiQB5UephWwRxMyCiLD6LZAQgaqQhlEPDLB6ioM0JIcHPJsYQ2vlQlB3hRMWo4PR1mOEmUMBaSGFcEMjF3EtEh9sd1TztUIlWtCDxTkJDoazCyLpAshc4h6UB6uhz0VSxhbqYdeUKCl1qE0CkrNFA81nlyI8L834uEQLxGCC5XZQU5GlyxMBI0E55mK0lGfENKSWfgrWOJXZcmywWSCGkNGMYJp4JqORQJUItiVGMf9OvVd37yEHvRoL1WKl2s4N4raVs40TJ4AJZCWyNK86n1sBWqEP4YkGXOJJEIMU60VGkIzyGEKGQ1ZT6MCRACCW8pj0C64WjCrNR2TGG8V1EG3QDqZjGhguQUVBgV0RCGdALoqkHxxQVGhSawhAJuU7i6aYJBWzCyw5pvxw5BahizgxOML2kig4XMcYYacXqeMdKZC0qDItOhToQLpoS+CkFgmVGQXTJZ74WfBtqILKsg4CDhRiKDbqBVJA4s7AWFANHxZXkRFRBihllTCRUqQiuhkc/VHMb0zQYdcny9vkmgnWPXtxlRGFsotBUozLexCHQwSMaDpFvmcmbChLmDQOWKWAAIViKcOKCcKmpBWQIjks1KMSOMUF1uABziNoY0kgGYSz4BFaExYddrOl/YINIgjy2yWAwgIYGYoVqf/wB+BhhCkbAvJxcoGbThtbBBq6uCASI4ygwSXCLaW3TfEBHuDYChe8ABmM/SEiP4Gw27gCQbkIDD4KWIFAJmQ9h6dlIaRwjBCmFm0iTndDhEHaA7IL8yG7PkBSdcnBhbScPDkUq4FIOi2LZWQtofYj6kjY6AwQAO2YNPIbgIDQBQzqzwkaEJ00AbCARgRSQMCSAUBNSMLnANpPAAuA06yM17NG0ULbBARB/XNNF6uGBI7TJAAdGA7BgS0ABJpxiE+fkDTAs8QhSOaoLJEGPh4Bvia9OBTemEPxbL95En2HhKEhHDikAShMVPbMghRGLIC/0AiphAAmATT7KWWhjAbV4wMAooNJSsVVELU0Rx7Nx4g7BKLZEHSMxYiwc4ilaoqAE/FhHoxYk66NX4boAa9QNFsuZABmi8dkqT9Q7MQRx0GJzWxhjQ5qU6eBRlX6sJCGTKs9eqgxp+2ingJWw+IeoYxIgQeC0A9xIWEk+LaRf6oMOxsxBQ5T+ZkSPABTmSvGMhTbDIjDois40QWkyYNPnNCQcYc6Z8dC4LFoAmlFAwH6g3fiFRByNQyssNnQBNgZCsRCjNFMKzYwDg7hCHPYBBBU33qFe0WAok/ZBBXEQ5gKk0UQAAnYpaK5KKohiCOxpWxMW/XqHQHLDkGz8Bj+MaozIow6IIglq78FTQA5YAEQAvyxMuIAYVw2dNZ7gCIkHnAyzj0anSiZuhFvHTwfs1lIsDkVMEownCUyADNSIVoMhA09S/YEXrG6oR+BDj6ABQS4pJmhzHTiFEmweU6EL9XN5+QBHTAZViMaCAQzgbCAB4NU0fLh2F6pr6IG5/EiiaBIQIE6w1SjipSA9boNMWduaDrZ92iAc5vsIghCCZAiAlaUAMHiDAJ4lx3IB4CYGxDDcEGj/ymoUgSIZWGMYFZ8SUZZDLawdtNFIFKphvED3LAFEoQJjaDoUZBl8AashIaTpQrVbgBfGBcmPLKw2EJ8DEZcJaFw5IEKZahMgOOYuLc8yGNBf3IHKC4J0VdBpiOl7IxS8L4XjoJIxKJRJRB2GhrZqUBNspYegsZAIJ0BNqjKGEgVCmBCNJppBMEfvAUACUdkfHThGMJMh5AfYSGBUgvdMIJ0MvjitAhk9rOO4NQJur7O3w4AIGvbz/xAAoEQEAAgIBAwMFAQEBAQAAAAABABEhMUEQUWFxgZGhscHR8OHxIDD/2gAIAQMBAT8QhKl9Lm49K6V/7rpqEYJXVKQwSyX4huLbcvpcuXLjKh0r/wAH/wACGMy8yiXLm49AC7hNM2k3MDKOjublzgf/AEN4m2JUsl3CWmlcCSwM1Aj3ihZmaczFXCMGsy5cuXLly5cqbJV1KSldGawSziKLV7SuTrcZcuXLTmZJbCcROicw6N7zvliVGUS4pVsDEzcZtDMEjjW5sqWYy6JUK0a95dfDAORxzxCnbUSo/WAiHOK7vaXdl77HjzOQMzCVW7zOSpXeNnGIneJRxDTEckSV0sLmTEBKuOC4N5mVAhao43tnksexjrDaEsFYJcaGC6loK8SxowfeFOZXfY8QM0HNwBmJAFAcrtdRzFEHN4hmk6NDaUbG4Qi1DBzbx0qJQXEslATDm406nEauMomCGBrBEU5lAovzr/GMi09YIFwEunZGFO0uNXKQg2O/iveNY5ZYUivGYiqZRIhliWEwmXMvoBKlZmiYYEaMoxE5bltxxsmAL1KDcOuIBqMMONxQIpbWJbCmZQLYvLfaNGru8nFce93LVmIFbWJaKLfasfMYtKfMcpgTkigQLt8eIgRq7mskEIrkZRrVXLuSKlkqoFdK7QJbZCpnmImalO/SoEJa4lbh5gXYfSIod6ijLCnRjmlKu6Qd12vVwMqQRcr4uKCYZah4jkEo1BNJgf4MoLhHUaO30YMxRiwsZYgRig5l5l7HvLLd5Tial2jLt+0qdMMELMVl4RXYlGlHaJoIwgrfbMkUzAAuJShMSjqWd5iBrMWIHgbzaZ++olFxXJMmGGoQSlsQjQgtxM1EGnmVVUSCMqw5jSC3iI3TuKaVcsLFMECdMJCj2dbFIljBSirr6TImq9yqcwUZYwnS4dp6QJWTuEvsL+IrQwXX4ZhCrhpyQK4gVjbMB5iUUXNAfSbhogMqOZpdNekRZayoy/WEFRIA3BuqlFCMUMEJaICiKgJs6cQtwOIRS76Gm0Ql3Hx0kJXEJchcwI3KvE01Nj4loz5eUtuJapZyYiLvuQoqgKzMxYWLgxD6xWhCcmjvCic++YCXoTaiVUl1UVXBC9yrJqAcRA7xWgX1Llehe8AFC7lFJiIC0y7E3YCylRPLcwUOXcqhCiCVBu5TxogsRmUQEq03csCuJiugwxOGEzERIp2x2jaICxVQ3NwUwCqLHiXTcobYLXkiJcsDLjXNX4lJuJC4Ud5aaZ4meNljEE4Z8wQwr3nxBgqHrFWkfSXLSi25IwYZcF8EDkcQL2DWrgBgpMJEqplgBSplLTEYG52YPiYNRZxArUJIJMXrwe8DiC9nGGYSwqCM1EQE1KMoubp+8sHt9pYzJgmEoUe8+Syhe0VBBOuJbn2wKXbKiMFqcR8lAdMurvTjLLpmFmmqeeZX/mUdxVtX4lfeeN+Zh3fMxrVxdT6YKlpUbm3Vctx+cVG0+0RYUqi8soi/mIsHUbKNPMBOmz4ZZBRV47QBuDIZWMxYDf4hYuMAI5VvZLEtNOYFW3eNisNXn21APNesDpfvOD8hiWgGUZAcv47v81GhpguXHK0jdSpq7qux4g/KHvKOAiJhGJcRkzhZcfWEeCX8QkXsdCzmeqYq4lwqKrItzCrZKotF5xfzEIXcS9dS/Cm+blpfACX8NQbIV3EhiosmPsxpwS4xGwE5idqNvdhBRhmBQRtJkykptvUVM/RXxMClXHQu7CNTeMS6hyD9IGbWmJMaaYgdRpyzAxErppM4gl3b8MtqBJsVt7FfuNte4roOJaFxjEpGo97QgHOMrv2CIX1xtfqfiZvN89zg0RKbgBsjkGo5o2e8Ecp9YS60jNN1/cwfFxOEfFS4iCTNTDiaeyxVhbvHwMR4ieFfEUbICx2SpTKWWlolQ2/X9xlsEztneKV5+mftLAgFxWjOu8TuFsWKjFpdfN+uYbYq5r8ywrgz+4AYiBsyisStTvvtMRtr9oSWyZPzBgV0W1l95Z1tgQxgoPmm4q7hPFolhwhWr3iu3EANvzMV5XUIFWswYZNvHtMc7UtXzmJUvMakaYC94BcEoaCeBKsIe5/kQwRYy2k7tcEGsxV8S1mH3gGBUb5gGBq/zC1FvmI0dkLeFyxuAQ5iqu6g2vqJAH9v3FY37QEtD6kNH1P8jdjXNn5iMoD7y7+SO1MUMvmA4GbJTEFyhtp9YmCrtxBY0qKKBB6Ki1T6HaAjCsV2e3o8RDGXxmDtoB9I7WV3mqIG8GKjPJ6MSkXkKx6zn8dtUypHMAYU7LT78fWFSKDSM4cvfvENnH28y9hEO2JoGRlUAEK7/aWq3P3/AHHTcOtygs+8UU4gGGoHgEoMsIplUTeE7jS5iDUCsQA6rx/ZmjYbP1EGo4FVaL+9SymrxChknbmU4Pw1EVwhFEQXHPPZ/UCYMwjSs03ErTLRTMStMU4mxa5X4pd8CB95jjRB9C6llHDAMjqYIfq/uD3f0YPZ9P8AY/QKyitvPj1gsZUr0fHrCFpj7kCejmvp+oNFNGpxEGyt3CKaJixLIPFS19hmEGY1riXFEvYZR55iA/rkjrW3pPtKV7N/aCbgFEYFUesEMR7Kx6kJDdAf33iuu+blhBKvXMIZcypsxBBUr3bni4KwRCJHfTbuxyd0wGRVYmSB/HMEAk4PBMS0D0MylA9mmDix3W2ABb9Y4KX7xraj2ZV04K5+YaW9ZYFzKF5ggpxKeSK2xwY+0EaCU62NoqfQgnIQtGfJAedwYomY1V2gHLENhUtcIDiryzJGAb95bDM7f8hESh4Y6zCq8uA7+fQnCi68/wCwapxMs4iMLwwVhkKoOzn8Q+FRiFqO4udh+8zTtn4iH1griA7z/kSYVPinPvM2KRmCUJYXfTU4lqmSK6JQd2ZvULNGWCRrZfx7wTg1/wAiwF3qWUhRliqiJA0IefpAYo+v6hzGXv8Aqd5e9SrBQYd59eT19pUtj8Hf1ZbBSqlHlHUUUiMUN0/8lwtHLPBTT3O8u5GGtq+IMQZrJvMFKMTWCZQYlmXMXPCCQL1CjUF6iG6l2Ftdc/ELAAwlpZNxL5rUUAWCA3Xfi5Z9I3Tk9sMuPeU4OVQvjEUpjYFoYPn9xrEpdlVn+1BKDkaZfA2xbYKRyfzARx6zCNiOP5iUihVnPt+ocKc/aU7m3xiu9xFqt1rj/Ii+88Q0Hd59H+34mgQLce32PW5sbWqODvcs3AYw7TVHnNwNyhmoGWacTDUs5ZlDYHc/tQau0x6d+l2YK1H6gjuZ8PzGG6VFonPmGcHwwKTMqbIBFLxTEXczlAug8Z5mStwljz9sSxqA7b9c/eXpB7o5h3x9Qq/zBTHESgWQHNRx+vaYNRaCNMt3l0wdB90pKDZi1c8v4P3NFFhVt9Dseku3MmImBiramu6/uLwVkK7cnswBtaiOru+zfzBo1k7cwv2lZmwNsbJuOgLvcy9ZdF5a7e0SsrdQCyT417QS9/vACN0MUJ+4W6ntTv5nryp7vO/71gWAEG851w+HTE9leAoPv95U4K+WUJitxKM5ZhxBVFQtE+kGFAYzLEBDLz8EZSKbwVxCjq4i9pi3cy1E1CvWqPuwWZZtQWJQQmbmcWwKmvVd+WKYXQV3HfzHO4mYFiEDEDi4tC3GzbFDiWYEYYeMz4lzglI1GuKRL8nHxMV7YfHDdgfEd6oHmX0I5zVYuI6wfUg3GoEIosTB6VrX96wvaB6VK7biANRVliKkCzl5rgOx94iMHhhSqnjZ/e8Vpq+T/YhbsPtDuYDi7v1gtD2cGa7x+NHF4fnT9JSo4Td8QWgu4DVy1mBzMoCDdcsY6l53x/cQveuvJ+PRlDYfUx9YSQ9VIDMBpPXGO0SquIgL0TBAtgGkb9IxLSwHFb+Y5xFLudtJ+/vMqI8jW69Iyrbz47EC8GYQuX3eyEt7zBBSgquht1GhmKvMw9LHEtBkEzEdItsr95dNx2GnDG3G4m84jBtE+kboZZuUY6EDd3LTUMO0RMSgplNxbInbp8QOrPP96QQeViamCq+sWHrFGNHRrz8eZtgRGLLq8c95QbuDAWES65SoDvLsIDsAPPL7TNNniklCub37xbmoYdxIiS12X1iRNX8fFxFmTuMKXavaFnI5vP8AvvC0FDbBQqbjsWomF39Oi3EpNkpKwTuNL2jjUblzHMKeYGFsiFMVLDQnxHLcWqq/WCVy/mOVxMCXmIy5SFpEGUeh3MZnt0MxcXD1yWFeLxW7+jByLurz+ZiPWKG0lBM3DMkbxmNNAeVu4sd0XZECpZrtLS5QcR07QDHNZgLqIFOpRtEuu0uLUzVwXcsS24VZlgwwJV4lu47o0LfbMW3stjQtcQ7ygMH7fLLmLi32hTmU3coy5Z0o2QbMRJUBrUSiqvzDyPjURghiWOYrbiBzEXEVwsUJQlLxLCoSwjlF1iLrEVSXy0SyZa+WCKSVnDN7B24+I1SvyERYsX9Vc5zV0XxLmGe7+oPGLv2MwoAal6giFD9zcSErFHURzLkXj8kogXcQMOAmY73KNwWWMoJaVdynoPfmaRR4+76sQPCEq07hWaA7wIoTufmNcyiaZmIy5c8oVLl3KoMC8MQ6qWyPbx7S2kFPMYtB9SJZYPJEizmKcxwRFQFyTPMpZllgbluIvkinUCDSyJCYYJw0ekYWAPxAKlS1a9YK2njzGVGKV9INYqURA4Dn1YWwMobuE2i8rh9GIFmmULm5NuPQ19JVlSpKSXBhjFSMHljw3eTuOL9e0EGgYA0SnmYDs7RSwohl1yVHbyJGwa159JRctRswTDMSyYcREhiXZG7mYYTJAriG6bbY9oqz0ZQLTJHcU5IpHMqFEQy8aeZQ1KcTHLBGplyy5EcSyxHDMTcvr++Zm7L94Lw0YU3VQnqQT3lmoS2K26q0jOpSXavSIUMxDbnxq5bsM8+PmAkOCEU0RIis12i+SpV9GTKpxKDNMqWMwVRk84+Kmdi+cHtDl3LPDAOYx3kgel86feXRR2Y1KcDZhr96ljazI3GxUZctYyxWHaIulxyHn7SxLAKTiCuOYnAgeP77TPydL7ao2YBo4OXtMgqubKCvBn7wMVdu/HpBMZHtUYtirrZfxuXUuGJYy7iS0cTeWdS2DO9d4GN+jW/f/sZoYPLEVEfRi3EIEWcu/jf2hGW6xfeGY9FDajhz9Me0KAJniIQKX6wQTbfMQqtByxK5iVzqAYbiiGnUw6Ic/wDZvYPSLvCaFhsuXt2gAURo1Gpc5iFuIiwNsR7y7FhGYlS06L6XEHEzRU/R/wBihV9YOKcvEUig87/ntEIr4m5TrvHRVjlea8cxoDuNPtA9LOR/jKOkdPD7dowTg05/7FXa45Jaq6IssymzrmpZ3rzBGiXdylS3JarVSlwHeft5XtLBR5L+Dj7yhXEoIu5dR2nbmAmIIDcEWC7rRy+vYmCTBwRqoPe8xJzAAC/XmGgFvniUVBdlkRCoWkNX394ikC7uEOCINmJla89olHTLUcNx8IiWQm4omZUqVPToYlZWmYkZhmePE0zEsqUbIqUsHi1tmSydRZSjzV1Ew02DjJ5jneQg0aj4i2xQNyx7RWDiUeIzoMxnSV7VAW2rmxldyz1YcVt21We3oSy7gFI6WUgAl7gjE3nmPFjGptcua9CIbc3GqYoKgZYAtYlEKlYgGKmd0/cCorDiUCiLMSoTzjrHkZTmWbjM9Le8sS4SsuyZ6XCYs4+svA0R6XN4lUaDfdjLZcMcupdMFccvpEYEt0qUs0Zlu0sFmK5ITyVr0g2CHiYKo58+sI0NvaALF78e5xBMSnKUgiw85sXI0/iLjcWAgEriUsIoxBn5mRutwQOR3gC9rPrChKEIztfQlpC3FpnlGLFqLcqV0y8zUoySnMewgXuUGIR6LZNNFH1iGej0bVigjLjUjVXMDTATAZhV3MTEs5lUwUKlZxMm6mAcnaHgGXiEQckY8pZGDEAQUeJoil5ljEAqcAhhncQWFYihbaX3/vEBXXpePmNo8PGdxVROooc24Dg+sUlWe8sYobH79CiZroxuVnpV9FEolQF6ua1Ll9DUpqOhFC3EAl7kQLJT2lmXjPxEjSdGtSvjD3lsh+kt1EgXCrKCYrMs4mWaJZUG6IglkgLIPMUFtesBsLPX/IRxK8S3MRhEurYK+iCWWKlbiDs5+krhEG1yRRLJvXRHiWCuYjGa+zqekyQmZmUkZctly5cKErzLGYdyjiEA1GwzuKvIQtlNekUmSAvRozfiNGzmW1zBrLfpB6GPkx8n6lmz8TIuD7yg1HG4halDcaXEtDERcyy0EXfcSZaYpUZ01Asc1EmhlL5M5IB9Y3WH1gld8EsgKL3z9pqnJM/XNgRNxYlwJTdLCgih4lqlZmFECkZtnPocnpzBpoV1XPpAi0lbmosbZbG4wuVKiRjhxCE8wi0sudwRgRKlBSzRlPrHoZMutywQFV5iBtq4q2bPrMGp5mS5SImcvEbOpniWMmZQfPzEaupRDdMXABuDey7ReJbAADBLEAsDoFjEVtZdNwfV0AjBA6q6hSrsrnZ/eZSILO0SL/MXjn2pP3LDEZyoGozaf74YHEBny61n6feBOtj649PXmONN95YzEoZVSjKE1LlsXoVLiy4K5lMpltXLGZUTm+qqAJkiXWaAgDZmpZLGYCxsAi68zDhLgLNSy0QDeT9oLbQmBmC21EG3bCX2iWyq5hNdqHGbmGm0S4lnEdSsfEoQM88+0VbF9PX9xUM8zcscwRZMjMwVBpyTF8b+IwvDVQI3x0xKIkbmSCm4kTiKgNwnEqVEOGoPGm7gtwsOQEDt0wiiWjLxuK3gnrAqItTAiZjCqbKr1+zFDYLpOew/9mUW5maEqLyvbj55icrU0x0gST+/cATQmbCjK3NhDfB8Rql5mTDRYcto+rBHbK07fmB2WMZpA9lBjVy+wv4mAshKXn/kqmIlsy6259JlSX6ntuNW6MEqYrzDpRKiJqXFlxm5qPSkm11cQvUoQBTUoVym+gDMqoEVTCWYghLu6oiJcsOiyGWJM07nHnMApXbAqoC4Y7xELRAda94mh3DULbi5ilGoK3mbCAbgRsZSoEiUvtuAigDicWJQ9u76yjZW93m/W9xSHTkf7Uw35z3ziaRlAvtE1Fo1rPjOGUtuonWD518wUzJ01KdHMrPUly5qbltTOImMRcWxpijT3ghTncURKlEzI0zLVEsHzMyBHoiCZh0zBYZY4iYtQOzRAXD0SJELeOcfP4jnUX1j89BNOxhEbJnE6GLm+YsM5uHm4bitOpwFvvRCFhqyxPi4QLZ/EGp2Q2XETcnDZ3AYtezf4mLNc/r1YHGd+z2PH9qFXbno9blf+a6qpuK1ct5mB2JSbhpaCytRGJVFWiNnMyKgHcsRl3mWtxEogiIN6viJdjPYqXczAYrvMzmcRgYq5YCxGxzF0jbKZzUCbmGFpiOGW95qAu4cJQpBhAO23yu19Y09t5GOkEa1uI2qYfKjAIdmA4X6Sljv/qv94l0LRYw+ht9sTFqN0Uh322faPS2XcuXKS76HSu0qpbk9ZYkqyIBNso1zAHyiXmyaJCPRyVLCtEdfb8fuWbixi1iLUtbAtQ6CdMTDPEBpcJrKcRDdU+YIy3AC5ZbaIYpxFOY5gmYRorR5IR5z2i3ZOKNHsnHxNCX6QYET1ItDjQvi9QClR8X+YptrGNn7gMp2VqUmTIy3w7PB9Oz416SvKJscPSozMroy+iOnERVC9gPoS7gW58TnMKq+vHb5lgWek9ICDE8UwzTHx0vpYKJlGKlSiCjY0kWFZvvmEplJCDxGLIThzKncsqlUzLDuH5BLVZiplpY0uGLREXcRaJZV6yuA8S1uUc1AKsfXP3j7h7KRYpZ8MYqHw4fzGrQO9WfJcujjkdP++YIBzyOz/PMOszKfm4TZ78nhganlDJ6nHqWdHpjrUInTQxQliOcRFekxTvNiP6+s5uYKCm78xEjsgroxix1M8zMzzFariMCUtcsdczcCBGV3G3KIpbngiK4i5BBDZEtb6bYcSgdFwUjbcqzLiMUMQnsiIHvK8pRvCVOQnklcVbxKZqj6/Eo5gYdN8X3Gb1gfqQDjdXw+vb7QETTDFJY7OIODWY8dz2+0eh0rruMM2PECiJALHeNDUWjMBlj4gbJQ+W5YU9/3NxhmEY7uVi4i0REDal4iJjo0F3ctYohSbe8IrmWdxQWJhblidFZtLlxja5dwJFAnMDiWxPeJWOSXox2/tQuuXd7/AIiPGYqbTgqns1+cQNo7iz8P4WXZBoRLPfn7zbtRIABk7n9yTawKTXS4wjHpYPD11LvKxyTZDLnj+94UxMXFqDm5lFhhgMCyEtkW+hgi4qXWSZh5ILYx6BUMQKxMLFMAQagSu2p6JEFLuO5joPSyM0QLyQDrpKmJc4lpdhmBi268x1V57NHwS3Je65iJZRwtn7+sHqh5ofen/ZjfJaK48U6+kotieZXxVeOTt6nD7RP/ADUEsG6/Q/f6l4wXHsYmfmCLiGFv0lg1xEt3MrIVVckta6mWNmv1HcMxHULIq+hlSoJ1FNkrpdTcqhdzFtVWu8wdE5Lz6lp8VMoLcM61ECN1dYipbBYscQtZdlOYoKkuPlLMLYZWwIYgTcXEZcS4G0tj4v8A2WZLPtCpaKbB4iG92dfXMyYU7mfpuIqcMqBbAR2sPM/0Hp+4hBzLjxRGxVfuA8az7xG8TD+oMzOCIU7/AKiCotU7KP0e0MTEjDctZTUYqCq4+0eoxRiLcJtANveKgLTvcQIXKC9fpzFBm4YlKNcRqohLGXLxCPCUzSpMyYgJnUqpElTJLqsGgGtLd123CsA7GL9e8Fmzg7bgWifJh/veZOh7P9f3gIaAbu/t5h+OXK8sLtghQpZzPDtmkmBucSt1uANX/f8AZa8R4HEpdHMGmqhC4LvnXrGuGSIxLiVLdQlh36WKy4jL6MIwhMIpE3ZzFU6ahTLTB0CGJfaDcyxcsb3C8MKmeoBaHMW4l3AnSomYkIdKWUGA4OX9ERwXKAdPyRPsO5+o1uns4mNf3rBU7TY2Qp9n+9o2Fynv5/yNnMFjW5iqOJg4xgiBd8wcGn+qWgXh/DGaiy5egNBiu2MFGzcRK5X/AMAldBg2ywlr5cTBhAwLEqF4lAG5boa6NdLqKdwoy7IxRlAJcBMTKVEqVKuYSpSm1gVY9nB+2K9Ud4AtU+eYAgKY2YRQuAOScYheKhV2xQyxpSDZLlOfiZHmI0u2VZfxHZyRCOhwxGWuPSMely4sZfRkDbHCkuEWXLlEu4UikuCRDwJxGXLLQV2mJ1F6i4mQQZVMatxjHMqVKlEwOV0SgC128sN+zAhqoDcaO8Hl8GFkMHz+GUGJRUpdzHEAg8EyuvqxQcbgN0mPzcAE8Fc36/mXRntNOxAGmmZ82Z9uSMZS4qeGvwylrp0elRihbLDVQTKCuw1UammLqOHoQg9K6XBEFdylhggFClDMYw7ixiwZcs5agDUrWII9CblJecDl/wAgCughDe2BUFCnoYxMRBG9TAS8y1Zx/aisGBbCIVk6FRqF2X9YEtv28y4C3ztK/s+sarDdy8mmYeZfR7RjLlx6XGFVMRVYLUEG54dHM1CEITc4j0oY4pp4imsS2Oe8Wx88xscxjLlxMQ04lo5iSpVm1lFm7OD9x3iGaIA4hMuoXURUTKQMjmGEO0cp2d5gUQvvHLhE5ICaitnVRS8ZJcSrXUaUao+7qZOP4gFsEz9vDFZbGowj0uECMOh0egy4MuCl9CKoZCgJColxCeZqXGEuDEZfSkYBt/tyjb8vLFcQDZCiZGvz9+0tXdgt41OFNxugqAmIsan/xAAoEQEAAgIBBAEEAwEBAQAAAAABABEhMUEQUWFxkYGhsdEgwfDh8TD/2gAIAQIBAT8Q6YgnEWswK1BtiLrquX0uX0ucSv4EfEuXMY2xLXEtLwIYYGIkoMolEIyuqdTrvrfW5uJcoqZCrlQw/wAFfCu8rEKmHJGVts+JcbhBiEvtfE5mEljFak46LLzULKck4uC5OgsyxqIxQvV8xRYpLJUfMF/aDQSWupb0NpVxJ4lMr+AqpTKlPRgYFwDC4NR6NBTcFReGZkrPRDUbqVjpTedTLLxiBiVFj9xlDaxNAZ7MT/6iOuTHuF1txyTAzEuMAGIlIwySonMoGWZiFDBKKBmAGTMCgFQ3guWgWHiFIiZQKPuwI4gJuWRbWPpCnMa4lE8w1AG3o5YoMvMxCKoEEVXSFmpQ1Eq3iWbhIAV0gYZgv8kFG8vEarUafEAwYuOi8r9oM7URSSRUoCtWvPiFxCy9eI4smUoJcHHik+8YJvZ/MOvamyIwXTAO84iNxa9yi4QN3qoKVQFJf0hLMkTzvx77fELQQEW24lkxLWxptP8AtxU8JTaVFF94iQLmArUNQaSACoWjUDYmzw3j7xiVCafqlMWYauUB7y1F9LDjoiojQ6hYiOZTBMykVG5k5zD6UF08xHayjxd66CIDUbFAdAnGogVqAuCa1ErnUC2HqAwvEFZsSi2U4XYXUM4ZWIBVcXxGzFkKBaR33IuxBFpmAWneYIDqyXWyYlyi1LFcK5lfMuWtXEhRMiVLtV51V3/iFnQNBX2mERI3ANqBWsIwiDmKDH1m5nM4iUhRUEWqhXE4lqlUVMioIfURWAuADeCCw8kW0wM7iIp01FiAFuoVR+IS9pdg4f6i2PMo3oQdqpWhu641HOqh5r85hGp93+Ic3PJb8QFwCMVZzEDE8URGWAXCoAylqY7piO+JdzKYI6YCnJAuyVMBgK8MKtxLSwQ0jcQN0v8AMw8I11xCiYNEA2MckS8MKAOhVVYMN7YFYm1uolWx1CNqja3xELuNXuOOoS5I0tNX7lCowiW1xGA12gG0/H6ltRtcwtMXMG44YAgzRcxbmR0FUE09NagxHWIKtsQGrisvU5lT0c4hnhZQt1llC4c9KbuYRoxuV9EVGYgNZY3RWvUVZj5Mxh2TIiF1A2NsbpCzjNxE0PaQAKnpq5YhngSABZgCvX/sCjOYgMj4lTErcEFiy5sqBCqxBTTHMQljUAQ5ZYqnEcrYpMSWqialCcwl5mkrXcye6nwZYBPMo2FsTTGVFQG5dee8xQutw6LEqNJCiy5cxeZcDWvMwzNzBeGd5Jz2fM85G+ZWM48M07JZrEtMAvqW5E9zSU1dzHLgzjnxE7MygAou04IwpbHmLExFVy4NtPtEtwRh+5ChhfS4CVf5ZX8iGajCtmoSLi/zMpkeInueyamBeHzBncpKNXV/1AE+/wAy5ZWSLcczmVkjgiRTzAINEtJr9i/Vx+CDqOHAgK2hWjdTWhgkLq4IiuYl4PU7DlrX3QXgfMu7SzkPpKoBbR5YgUKMELs+GLBxCYNLSVukDrARWaCJQ1GHtmWRTcYPJx48Splw/JM1BAOe8sIkZx4gl+b1GsKlYjka1FbsmyK3p2hruPEXv8RfBHagQuiCsW+Kf6gIc3iFhNQHDmu5cc2XOyvxF+3qXGYpouG1b8sRoW/vLdjTzK+hUFlxFLhId6Cuz5lepmRhO8NfQxKIUdLlwV3xGci/EouGGkHeMkENtSwOr9RoqCguC3d6PBxXnmAQ458Rp2wDUBCVK1FblnCfM0FNQKqqhODK6grfX1gSUZhVHZZEuLtlpCIDTDiN9RsusxNikCvLABUqGo4WVC3mVbMVxmLUCD2P7ZZ5XwYiOp9PyykxFMMVeYB1KPaO4TllROdQHlmbbPUBYURksXGlLO4TvkwbInp+/QZ8RSUsQrGBqnOfLHGSVmbIIb+zO5GC6QVa49fqICnOOJc0j4/eICAtnf8A1QCIJVmKDv8AFfMx4AcX/ULW84glzEIB9S/zLTeGJcZguJGNTDjMT2UurxAvLBKl5X7WVMcRq3MYIeZQ8ub7+iIm0PhlzBglzLRNOA4/7NEovEygcSy4hCDUVrMU4VPaIci/P/ZZlfRF4UyaIENSjMxmVJkOOJlTAr9P9UXCp5vR29+Zi20NnI+uSVSutZwHKD9CL8PiEHFfWLOFPh/qLfo/7EcuN4px8Sw0Hr/2F5t8M02nzKAZzGzK4Ad4lWYjRiXlMd41q7yiZiUEA4B/MYOUc9yAZjGplWExQ8NvPxqK8QL/AHEcvh4yQBmD2koLQ8u7lkuVvMKZYqUToSqqEV2im2klJLee35lbQA+n6jZiedEuaWMOMwjPMWZYGiK9kqcQZzLQslrSonav97hVpPMe2yvMVMwU23tiDfbMRxHvA7RFSOZauIhgbTA5LM0mMMFWhjABRf383Ex1hXev1LbalquEEIi5NzmE0Gd7IMs1ERalbzuNVurlCxsY22XHbHwfqOMD7n9x5i/n9kBtQlnscefURLoM13PPqWD9fxEiW8X95Vt8s5TuG4ystiXYgLd1bgENhxF2Xlzy+ONQEt/5GmqZYPZAaShxEWkbk4iGdsomSCW3f2i3vccWU4ZiOojKzSqBzETDEs7QQRXePyIwFErEtFZYm6fmM3n65Jc2w50RrvERTCMboncnN4y2DL0grs5PwkzBuuYDgYiW3cFeYhqBO4qruIq9cfuXKibmJY5riWYYBqeCVTJDmcxUUtOYAwpbO+IbRCqpmWGJ4kbYw2HPiHdOoCGRLO+TvBQeXb5Mf3iDLNv+8w8QDL0uMTV5xLHqIHVgDMBAAjYxA4ilC2OwQEBKysQA5gjpmDcWv8R2lvH7nkk4/wCwvQQSqdykTGdwnEH/AL/2ZAlHab3EsVCLrWP3LXf+5kYImq7wFsWBt4ZQWXglGOeO0xqXJoieUjLbmUiDeZbxAHEpAjY8VAysTLAsFyFd+IlG/V1KB7Ir4wsR2F7m4hMyxC8AXWL8d4TRKAUcv+9TbsRQF5lCyYJV2RLMMcaz6mgwkqAoXW4CBa6hUqjC3m+1VcMLGN7/AFDGwoc1294r7wkSzAGtG9XyLp5pZZjw3im8U5Mm9azwwRkAWttIL29b38TJVKlBgApfAr7c9o68MS3eC7ZQxmbmRzqWcAfcTSKN+5xUTQYdwUkGez9oW1MolJp4gxS/aHaTRMa5hziGUrGZgjbLgQj2iDhgVVXrEsVk9zgmzvmowqyhswxIu05rlCIZTtKXlWUcQ8HU1Bx/F/3EA2w44hiGoglMoFBUflmGC6r/AH0YbfyJ+SWXDj1AGS7lOwMeIGAxAWOIB0e5UwAQTTL5iEcIj4xKBvANNP5+p8Rf0aEC12bLTwkLmaOQT8IacnbiArUUqm7HdAUA6lq0hVlX7LHJCRajlW85OB9HqVKtLpqgvft9yy53MIW3iYTcouYGeoCk8ksxBpVf0gAXkObieMQAlGVIZRAG7f6ipxAxSrzmU91KD4eYRmv48QAiZydmBU0zHEWIqr5gnEA6qAYIGJQizknu9FY1Fk0kz1qJE27sOhd3DoVzEu2sxG4pZYKIO/bcDcXFLiMvpRIIFaDXEp0BpGomFR30/wBxHYfTn+oZSA37guRe+ozsbyZcXCw7O/J+4XN4nPaWTBFUxEhS28xH+j/fiENwGL5Gvv7JU0/UXHi+gGIpQP8A7niABKDRuKy6INkcQCBYZe8sNkMcX7f8jiAnFdvmBB0fT5gDTEONxAxqJoMzKOYhdwkomLgJkm5TvKiImiESMA0n2lB1cRVtJYLqWTG4A6zKmSpwIEdyZjR3EtxMNwVzLHQBoWRSBiCpWxhLC2w4L2P5IIbiIbcmO28wextdi/vBYfUtWYxqNwhUCWGBQouBVTtqUwb8wIqioUFEYajVUxfB9IDb5gdvkgWgX9Z4G8RcKi8RC3CjUscAVLSkKZXZ6UQsjMSpTG4pYUwVcoS2BcI3cE4l7Xv/ALgPxCN7hUudhLCUWNMTtKzCW9LY1Dnl8RhjZWK323d34j5sC6sz4E8wrZ7N/aZcL9I+BBavjmW1ARaS/J/5zBR+4AA/G/mKaoLgePr2glymaihlqTBFxc4jRuAvG5YnevcqVcxe5jUoGio3YF3LW6zKdTJMUHvfaKs7glo3ErW1ywp4gTbJAlJCZ4hKjiEuPuAbc+iCq9nF7mJZcAkwJmInISoisy3BIkpdynboOcqYuRt91x9YaEZwGAOADbywGwfVrP1iNgvdM/O48pXhyuNxFFl4VQ9GiBQoHmETtSr4Lx9Y3VyZZFcVp+ICKiXDsmJfP9RXDGYVs8rMHS41KBqJfQlS7uX2lg1ra/j1KSvVfEA3tK8C17RGix7MvpctYSrmtxJnpUoyjcSmNxhLdMJ38/WNkVE4tl7QHu/m/wCpUOS9n/solEqVCa3MSpUqUdFIKNGE6VnuIpVpq2FW3XzMgj4P1KihW+wY+tTA5e9xAm12fmJbcMwC5Oolbl3iVLYHyj3GxpgWkADg+8VMzLPWuhEL36iHgw/p67y0d8q7ZRKjKBT3hFta/aJcmmyECYSA43HBMM10zM8y8Tc1DUYqjmOio9zRTMoGApcE2VK6V1rMqHSulTWogq8TulEq24yKxDSo+n6i8fjEzpbdC43GZbGoxyzko+YjmcFPmUD5cEeWetHvNwLFF6d36Y7WYtgWrNIyjape+SaZjvNdG+J7gVKxLJUJQd/7OZRao/24F6mElO0o0mIpsPG5e8jmWtErZAqVUqsw6USoyUNMUoxX4XxLIQMx5eJQiHuQUDtBSUBOLiQurYSlA7N38xmlVW5i+PcFQ59Y+YdK6nboyrxMrUs8e/EqjWptBJyEbQy7H71EalXmouIUIRgrJNqyiJi2vtKL4ZkJx+PJEMLXggaFRQNmOcbPM7ZHjtHaQY3kMroybl3WPMShbIFB7wGIVbZgroWMkbsZ6XLlDKQKh0xL6Fn3nco/1y22eHx2YPhaxqFYqXLhYaODj68RjTeWyAxab0/9jmdrZyfWCQW4LZl9b6WrG5g7vES4K1Hdy9AgURclH58HmIpc7Dn3/qlSPPaWbOGWZRbvxEKwVj4YWFzkN5eD13Ziza8uYC1vgMRZCp7whnOe0dVo/MyuYI1uC32mvUsqb3CEv1m1EIKdMpUp6iMslvRct5lxzCxXKfcg7BeXzErzjcmY3ctgOSL5L0SmmIwJ3FfCQCGmF8wh/JAWsALGcdoCq19ZvijRMBEsJkEqormtSxzEXB7SoJANGL9sqwYrvAu1fqBADK8O0sS8wanP4ljCpZMuYD03KTwld+tSogwMtKrpRKmUIbRx6horfEGXK6Oyu4ShlRMrW40FFvng9zfW5fWiypCr3Mhk+Ytvb+PUsi67w6FH0/7Lr4jVmCLiIDM9AzEqNwkoMxvbVcCQjjfaDScojhMMFvZp+03L4iL4BXz0aqCJK7S2XcJcuWTHVLxKlVFqWsvqFQlLH1Bv+AUmDcOlBLPX8LhEm5zZ0OqHMYe8pyP1gsXI6uJhhKb3cyyi5TkLDiK1RLmHMRcEEQiWJiGDYccRvcDEZPxMpWY5AFGXuwRx8RsRfeXBJjoMElk5i1uXMy2XG6iXAlSoxqDKgC6Hn9ywztAWCRSIV8oBLHpTWp7kIUkco3DoS5cvrxmVeEiDRGTZYjzh9H7jC2W3AABmCsWMXtMTBKENIipgzKOMerZ2ir7TTTDeZmyICOINkMzz0x/DHSpR0qVMpaUyklsZc5hSJogNumKCuagBq4IJU2IrzA604lLzqXcBAoJdxmagim4S+l9CIVMBmUYVszGFjji5Smrg2UlqxqabctwxuE8sWWNdsTDBMX4iqYlYm1RmnDAQxG3MJXGmojqUsVKQizR+ViCzB+IInN66ExKIdX/4MXgiCklghhklk35H7dFNSsQYrvGrA3URjWIhVECtTujOOjdmccwo6JcE7QBqUlKDxGV1BqoTeoi3tgYwja+0OwFBKEzF48RcR0y4SrcXGFkNK0zDXuBBnFfe5hIYmkYB8NP+8YlDlv8A3+uIaMJ9/fqUuyVUb62wbmZUqV/CpRGwySnQ1BHERTE4l9BGZcAhCIyi0IwWbmYFtG6gHWZcWUExhqIIdxyshNZdv+xzYpZUoQTBLC34gDh1uHSmA3BmGULWvrMtC+M/iXAQZVHF6Adr3dQSYAfPmBbCyb4mRzKitqUAMDxKF3d5kdM9LlEx0a63OP4LUCK36nsPOJpKYiW0RbWUDjSbIQL6KzJGEplK3ABQwdyjMHoWgd4q3kawwBxNxUQh4/v4haguMgbY1xV8R7Q/iJQNodC2Ymkua4O7+II+3zFb0fDBdcTJml84YkAt3zR3/UB4B9ICnlPwRgQyQHLgnIS4bHctUMZgIcJiIn1TpcOlsuXN9KZT1rpUDXMyOBzM1AMNy3iXHS59RBZ0u6JZZhBHU5oJBKoh0uXL6BZA+Y4KIi7iF7k4iRVwK/qI0NLWf9+YxlosHvWzz+JRY6ELm5i78EEmsH+uWSsS3nI8QQag55e1dvMI2h7X/f7iqwrwfnUMpe2Vd39IQ5I1cuzMuLjvpQTA4gQXZ5nh2CJZNypuVDo/zqoOY5WRXuUDRC4apAJfSBeIQwL1MEMywQHdSxMoS+h1oMwFiVu/EMPaObexl5Sc9reQlHnUorEpVcxMXAKGogJ3iDRLHBcKP6hikzKV2jrMZkq+0Eyh9TDLXiWNEoFSkHtECOHBxNmOmpfVmpfRj1oOcyl1xECpddWxTvFVJES2EAxzA3C1lIMwMVMuJYZrKmIFSABXVJRUqEgy+HiaVpMMSwVHW3MGwMyhRizqIWzDF84iPEa6hUVnmUImi46W2UO+/MMaGNJmCOJSS+/S7jdOXtK/08K78S+lSpUqVKhGZjNzIOjVxxQYqMFVSaILdkVwwyONvD3huawQzACbhEwq9i4Fbdf77S3EyS+lQDBlx6VBHHMzGswAtxANGYAxBogEG3iMbaYpLbmuID2lkQlcMdkllZlO1p+Ivlr3KPCMB1EpcG7gocX7RcojzBDThikazh5Pff3CSiPJLl9LlzcqV0QlPMEg0e38xKJgal4xLDayxr6wMxCAdbjonDD589CqldAzDrUqJeJQTrg6WQBGIbNS24BllGoF3VswJawuUGqfmWWoAQqBS5YjqzzCLkBC6wr1MN9wMI5B+0oqp5MkKxr2un4alaGeGK5McPDGUcTJ+OR0/r6RS/oefT0uXLh1uEY2txFqLVJDG+ZwxqianFkQEjjqd+SEiaZ4dD+Fy5dyi76LFVrit8Rje7grwzH0oO8oSAaLlh1L3kgLqAN1mVK7zF1H1Apg1CtkptAVvcXLdo22RbSGKMCemUvNd4iECStOTivHZiUqIkBnLxz9IjTsiF3STfuGH9/XpcuXL6HVvLhittRtbJlLeI7dRoYQFOYnMNF/SK7r5P1KZY6Z4mZUx0G7VA1mEJuVAE3jtGpUrMolEFxKMwoyoBMiiUNyoQRxqZEFOsRGVAl+CAIXQzF2riEa1A9Bxm7Pr/7FaCvOvmD2iPb/AJG8EC6V5OHx/wBmgJL/AOTMJf8ALlTAAEEGF9paGHcboZdYZYZiYuJVN5+YI0ou62MCGZcG+tZuVKVPEvqyiUCD4WxqW9NIPMjIezKmTokqBUq+h+JRE6jWUSkIZZjcMAHxKwUdpo6+5iWizxqZZ+n1vUsqZQfdZo8P6/8AYfxuKBayzL9f1Ob1KI3GhCXggDELTG2UoCKi/OZdbqh1Ll+YmfyeHh6NQTmJ0Zr+KhtgHmHVlJd1F3RGdqdmsemr+bj0AAeYgsw4lEqMqHRQiFlDE9pnEXiUMAykyhDpoik2wn+9Qpw0xwM3Cd/x9pTxs+H9fiYpafOPvr7y7LOly1NEYTD8vcIVehnmAEdnOdDMt273MsOqhgANQVB7SrzcoWMfuUtrcLP9Zap/YcPTLNwSVLNS5dxBKYBr+FRBgAdExHuYGbmy0lKR2UVX4MwydbNTPaIswiGUzcCW+5XeYsuLMHHQmEqFAET5l8EXsLfOelvZFZofj419ovV3kx+z7kUtt4r/AH9RkdDXiOUZY48O0+Qc/i5QjC0qLnxMc6igrX+/qIq53HLEjwRBL5jLGooua35IRZBgDU1LlRIRq6sIV3eHTizqfwQwBr+DkjKuEYxJUcRCWSohzz0ESHSuEuX/ACAuZ5eD9wTZqMULO40/qL7oXhx95srHczClt7P8QN1FDLMqmvE2CIrPav8AspYJtlw8kzedOZa5d4KeTRW9x/Z/cqVCVBZUVbSD0IJ4gCjAdK6cy5cqOI7iB4cwyRxMTy8wd6trUtDhi15l9Kgd5hqV13KpgrcOl9L7y4Q3QEccB35YRc57RMDZ4wn7iM5n3+pFHKbSDts+NTNC9RbcyhLjYV3gK43E0i1cQMI20mHh/Us0UMQMc23D93T+JgNpkhCd6Ts8yv4V0JXRoFeIdNypXRLlRLh0SINcd4BWIxStklwlSulSuiiFVK6PW4PazwcxO1QaOCf3GWOXM7IlWNMwIz3N/wDY0bDx/ZFt8y1aYgd0LQXcRUMvPaABfnUCniaE2Y+0WQ4/qZF58V6/rtFLdrxLu128fiJ5iZJ+h7y+gpkD5L/shdF7hK6m2qINy5apUau6llBM5vPx3hqPVJqXLnModzUsZZg2t3Ab0mfqEOvMMFx1CHXXQlte/BLm/MZEYJZEti8RzKnAaYUxeZqJd2ZQpxECLmIssOZYXMDWHwxVIze/EsdDh0r9fiWNiqhmkagv/eDhh/CulQWsiViUSpwBfepUf4OZqX1S4aLTXMNs3PQNnCeSEK96xxjtCn+FQl30OlwG8KnAJ92A2sR2/SMlzc8mjxA3KoLqUHDMyBZ5YlbmVWYI5bdEaGGKN9oi0xLs5YJBd3M1kphoNFXXqc2S/jmYFfA7xL70YW8J4gkHCX0vodV6MOr/ACo6scxW5S1tuAJAR8S+r0OmJcHzl4I3ax24hrW4xmKrKDnUQcH3+8F6lBzHJqbzKOVz/8QAJhABAQACAgIBAwUBAQAAAAAAAREAITFBUWFxgZGhscHR4fDxEP/aAAgBAQABPxAJHUBwXNTIiqbNf8wOhFCdGl/OGebbE7L9s1Z1+WY4kSJ08f764UALKdl/798qUR4b6ZzgldIQVO4+je/frOPoY6dPn51jkTSDOLcnjr7ZRIoKe9c/t/3IRvA3yT7X7ZxZQj5Jz+cWrIglSLfvl1gQA0JaHxNaMTW4tRya+OcMG9EOKEXwbfxhqN3zKOn7OSwKBIE1+nnEwgYamrPx+XEMgRFmjXpusAhBNTckNf36xQFLBCU3hYrQANSn/HBBq0Bu03z8bwmAAKG21389TAEwpKkQcfEv+cHFIXKdL9M08u1eUEp+j9ceD4gmxDf5PuYNqIIpbrj8S44waTiQ3+HfzmhewJQ8PJuX4wpbNwdGt/nGCWaPAvPrvCcF9iTU/p/rFUNJ3vTvj8/nEmle3Q+fxlBWwdjxI/xmugGdCTj8zNaainv/AFv+cs3IRIiePfeRQ1UeTv8AnNzI1BbNp9OPzktpBRTZmBmsxGs1x+2Ntwca/XES0Tw4Ml/AjrDRFXSDAQm+S4VABAUI/OADQPDv6ZSFGgIPxg+ViqQWTnXX2ylsTBFTcQnLT1hMusi/33i8W+BsSRytk+7jUi40g/nGLIduDdVNkplHJUTfA8vc+POTVJwgiCV06+71MY3iECFb82Zp7IAx4/DQt9vy61AACgruDwesaGhBoJz8DTPRxcXFmMpVTb9v9oX3REyIHypb69GUKRmAaE97H6Y1K4JsqwPbJfa4AMgjkvsLEvv4ysHQqQeCvzXn0Y/ECha/4bM3yVEIvVfofd84coaMBEmnyjx6fOczkFFYFr5AMVJG1oQH8Qxa2RgUEOHVIHp95usBBuNw99v1PGJRmR4oHHxoPpiUZVNbq7fHBj3IgAcgT5c49nbh3ZNeSiX18YwgG8HL/wBH2MPQnBRrVnrh/nDkkyCEA0fGv+46cBPfUN+9B98omFQlGQPpt+5jaZNS2tv6oY0MAJBPEenT9/WM4Ap5Ajf1DCaAjatNsXy2uOiamk2ttfofjFCkCbU4666+58Ymku9N7Tf3p9DBigqS9Qb+uOSiiFpCAfYxLxIkaAKvxt/OEmFCkoef1yoOleWr7Ah98VUVdzR4+IB/3CmNKIS079G38YokbV9+fu36YTFQVOYcvzccnCCWtD877+MAFkbOKhftFyNEiy6IPvqbyBUBPoFofXeSdFBXbAX9cNDhQOF6fHLEEukpY0/hx5MEFSc/jDTS6bMd8fv9/OAEMBJonjghA94pBhivKx+d4AUGuYlh/RMLXqCIG3l+uKZJUiJzkxAUWaf6TIO0Oj7YnwnFNW8fthICGC+dOveXYKNjsUNZdzCNPa8YAO7NXergKHYRHWr/AFnAKNQfCYvcgFxtGL++cSG0jJxxjAIiAv0xwlGIjZCenU+3nEDUClhNz6Or98Mk8RR3OfiTBaBCilEif73i8taiKSv4+75wrAaADV49usBgkk2SN708OULWmHAd++J533ino22ChDX6YRQkToF0Tt26+ecTwIiGtK4zaABEa3vvQfbziqVFSzUIP2PsZATNh8C8fgxniERQsqb98OUWsBE7Lp/XF5UgsI0VyKJTTo5dYS2QZerFMDpRR5Fp+PyYCN5l+xhswWj7mOl28gck/wAYji+j1/WXeQHJz79+Ppikd2WXrj+MZAVQeqz/ALiDRRGnjnNEoEfTw/n7YrZ0JPLuvXZ9ctoqsRa1fDillrPSr/vrjEGgA07v/cDRVNfLSH64pVqBB4WP3wEjehfN/wAfTDIHVndKc5cCdg8pdn74Yt4VP99sbfRUtfN/LjHoioXS+HyacISOmw2XEaz8MRaxCamdYIvK76w3EH5zzD1rPIDPXMPVcreQuI+tfGCD9vFwZKH1M0dKHy4C7KeIYGKo2NcLSFJl2mm00u3rrA6ga6eld/j8GEAYGocM/tMQdogewhr8z/OHsqmb1YbxTt3UOG3/AH2wJXjh7F6Pti4xsXvWn6847KKEEUvHo6+mEEO621VwLECqvRrX5yeJCoZScfjIouwJ4b/eKmKa8lJcFaACJ4XW/svvhTqjTtaH54/PnEbCoBEYm52c4GsK0F07+N3B9CJXliD6Fc1niDDNs9upiNq4kqpf0H65FsEYEIAfkq3KgIqDhkD5oZe8AMCFJ65n19YIJCiTnl8H9sVfVueLFPjaZVoxDaC0fPDg3m40OxH7mOVghEe/1cP2zZ4Au20UD+v5x+gBFO6X41nOoERFHD/e8KgagQEGnriY4sIEigE/KMmt201NNfXOayFVYLtr8GI4vQK2uzwbMOTQ1eXn8v2xkolW7VZH6Dr3jLIJGyya/IYnOUkKhDX4x7sWtfir728es4BGAUQRnyqbxgQFJqb4/N+nrChZWwJHWv1xCCKA6p486XXzgSCGKShHn6GcaCNhya+eH7YQS03q87xGqRIdbW/lxgIobOlnOW0ilT65uSVC4SAgqHy3jG7gABVbxPriAXYl1vV/HGLToqbm3T9sK2iqpX38YJKAbHhi5QpRU2k6/NwVpUvzvjGWqGM0qv8ATiEiar284QhRXLStcSoSqa7PPxvAhST85x/vOF1USWOgfGPplBB7vJ+PzhMNbTyn84TS71k5J/zGtGFiNt8un/GN6iDTpXhnDfn1hoJSayGtenPvrD5gqiJP4MIZK7raz+rgWRhQwTl8/wC+hu6O9Y3X44dY7pQUjvnDHAStOyqP5fth2A21FLG9MuH80ggkh9Ef85bn+lQKCcy4o1ppo37+JTN8AqqMCuvj3gNOmJ7EKfn9fOFVuNIH0QCPnDWQIhwpCn7/AHyFwNRsolPn1m+ujTfvjAktQWaEG/fOFSWmTWtN++eMuhrk+O/4xIxwAvW3Eq2MQ7unfxgQkiHzkaA2V8f5yIkSFuxvOLV04vbvnEXYFQ64yZVQRwo8/q/jChPLd6d7/OOFyjnm6MVCxgx0j4+2PAIQM7pr8YEgEjqD0ZWTTIfd3+MNYAjvrj9Mgwiwfs/GsCWgqqlCc/tMLU7BkpJ/zLsV5Uja/wA3GIB5Nx/1wiSzAVVePzm3ujoV94M6Rs+eJl0mm8XBIlFIq78glnsxR6JBprXYmDFlpBBvJGECuhDzhUeCi0J685vQBpu1i341z7xlDYjNO8hyj6YCor9MS2v2Ym8XxgLZ++KOsUkIgPQtfLxiToEgZorr83DeClS9PWBYS1jKVT/fTEYJIK+ufxlQpRO/kpft98KSYUUno17cZ3YB5lH+8CPRSHXZf1XFThoG9tL+cQkojONEX8ZYgNNL2pr1mmIIGJR39dmBR6AKjXe/jYZKnFLN0u/syY1XW3ZYE/C5MAUU5Ym/y4xVJMjov6H+cZeSU10p3hGhbVdqx/nEoK27Lz85zKoCb04+sDNCAJFhEnrgxmLpGh2Q99GAxN8jlywgoViifp9sfTSZkLAj6klwQFdlo3wePGCqtFU5Of6whSCChsEs/Lh+4iBB0g+zbhCVjQpsKni/u5N7oWl3r844fbpwKs98ucl2bE53mpxKaWBX7Q1jAAOa7f4xhFJUFrvfzzjope15cHEoADwic/7wYzYEaGgb93ie/WBhFYKjFbpwNn8TCbpAIfS9tN4ayuXJacL2bmblUQEJUfx9sDBRCzYo/qc4CmoL2sFfVnGMc8AQVBDPnf3ZqUtQKL+3H5xRNRAYDpp+1w2esRhez2bxHUorgxd/GA0ArFmachUW0vKeLL9M3KzpS9O/XNySUaAIahl1oJrWsaqSzg9AeMFqLYBrG4LC3jfdMYtY0Q3b9+MIUDfE5/rAMIt/HvEyTBYP+N4x2hWyuN05GX694EoVHUJ4zXIxIXVgg6gydGHSksC6IaXQ/fJDdhD7Y1Tl7rcbKAgKgFXwAv0cIKMGBu3uX8uc3PqsM4QIfGb4KrOOvqln0PObHmgEV3xxSYIYwEDzdIJx+fmXYwwm2p8m0+nWbFdQQI7Ops/vEbskRSj++TW0dk/3vGnBgk84btYJwll70LjZUCBUY/lnt5kBGp4dBfnBjgLLdeP1xjfrT7416dFBSPsI/PeFvppFQ39FPxjpi0jqa8DU1k2lKDktQ7nnb/MzmRtftjWEUI6dDXxziLjpNa+MK4EIozvh/OGQqI0Fv0/3jHBKeDnnj51jGEVqtsJ/GGKG+lAc/G5lRBLsSTTjZYsU9d/9xsTNFpp9e3GiSRCVLoNcUzXKDZfPP0ePvizqMCk/YccfOXxATEjZaW8P2zX0ZWNF/O8DcQIQxvkDxvJciwTld5twCimreOo0tje/+6/gw0UIwdJlIghOTYYojoF1Nbw8Q7k8KqfMJfbgguibi0a3o7t+POMwtWbX76xXE2QC1+kfs+MuUDllh49us10sckZyaNWcWvGJHXCQtB10/wA4zVTT0rEs+n64hrBgIre9mdff1gQCcX6rvnO8gnJnCo7Ojr3iOkRWhUNftl+uIiorFx5Y3qb9YrEoShfD/usnYjqVZ/OOeIKqO31hTsmRKJpwARrp98IQYiD4/wBcL9DhthgGg5hxpf4x0WApSqx1+cYUXa7VduMRYo1sec48BoyLvvFykHkUj/pjFRkJ3MoCqR+MWbSJsTSOcD1xMgERQAaLh3adrdOIFDICJss/HOUlotz8vjnEyQaJpHzg0ecQBsTp7xluUEKLN/jDaXKS+uc1bhh8gCew8LCzDKxO8fEapE6XSj5+fGdUDpIjO3w4/lKCaCxPgfcO8c0w5xA6ros94nVkqxevHxmmlQafOMrVpX3/ADhfG6FVP9/GbC4YYREJioAneBgKm6dGKZC06Ef+4mOsmDAWPC1+/NxtmgBrF3+ccA06MtSWu8LJ1oknXOCagnByefnA6IFdcHnFaqqA9azVm1R9+cjPmk1s8dOucDK7u8iijThGm31zrEQVvu6h4zjAI7EH6fGSRR20AcfxtHYE6mcnEgBafY19PrjYi0oUv+/xhB8BN9Hj8uMYIBs53hQsR9vBgW5RAs689d7/AJyBwqWVM5y3Aq5VJBFEfphFtpIClv5v1xxveJXkC43BEQLCIn5TNUvgFu2GNtBvG/TOoyoWh5G/9rBGqIjtLhWAaCVrn+8L9yoQxQDldJ9Q1TC5QZCF0fyY1FPAal/b1jUOjKcLljBvhHF2UHaqpWfY4y2VaqGg++jIpKLgY6H7axQUtp0nDo0TOo/1g6hCmESaN8c4cmIl4KT+PtljKg5AHv445wyKNTQU37OfviFE2azT6NffJbQ3vpN/bD40YNiKQ1E/zhq9suJ0fabxi+Q2R8R5yZTB1FSvO2v0yIYUVmq76g/XrEfUSgnBvbVe+sBoCWiuuL45wcFG0Oyc/FmMtShBWj9WFfMLpXyROlLlaEWJiGim0+j7xjW5AEWczlz57zTdlu/IuhzdYgmEnCEEjwK3vnq4EEUgItk4zdSkm5lnwt8eMpbyxdVno3MobGVIjYHTacdHGKuTaQTpXHBvLV4hVIqQHXDeuaY/YllMQXYBpr4fqx0rWBYKAVNHs7mO+mtOW7NyBtYYOjEUVmwtK/lzbMW2YLx/vXGBsjAaQd4egw3Iq0OUn1+MGRWgDb4YMUC1MjehugEvobPvg9zQNZf1x6ui4J2YpQCIKPDo35++PVyIEHpXH+24ISINrS4Q0QB0gEp8YTQqsnNDwG9XFy8yoB0XLp7xuyUlRC/jLrDQCqpDf0ycQsAQa3pkHDZ2aEJdUPL1MIEmjcOUkUHHbzMZkAAIEFfldfXjCO2+cZPzi1O8gXt0fbN0eH1gw73PGBtUqsOsDYVqkZe8g3UENT5fGUQK0pr76xFDQOT71dZZBVQKJjbBefZvONRXXeOTte3fH4xZDXvDKIX8Cgf7dMXuPiSeffx+mPphWas5261rK6Egs5TX5w1PBh7DT6ng1gM1QLBinq2YPmSGZT4isffrFoqDN/z3mzc8P5wiIJNaXLEgp4Zx6w2yk7TfV/zrHdDtYcuIqDiU8cvl47wjhoZS0dlhN/nHLoK1p8Cw+ctTTUGw18G7cKpqwGKStGnvBN0zSOBGPGvjBxWacsD98Q8EhMuSWr/picESMJWzmq/Q8YLIUsUS1TQifJjVKIAiJ5lHjCrljyHmv9rJ/MxZQOg185q+Zl68CxxMueJsOvG598Xo0lBBX3Rw26jAJVVF4Ne8lDy1Kqe32xSw0aEO9OvszSzghmtou+eCcd93opinFa43ftm1ylouDXtZowvlKaNQnM8e8ape8ImdhEppTg1jRLGglDp7PWA0CVYcSfaOBrZx3jX034846CMbSOVaJRF5H3jeNbDc90yVuKLdf4YdoiTp/TeFExjZX444wzLYArNrPjBHJabXgD5N0+uBWIOUAvjsp5Pdwa5tF6D12fb3at8q8og/vgXShCgw6X3fx7xKQGC60v4wmibAGtLoKn2cFjd4qdrzSejDD0sW0LrrdMqNBwuWg/j9MREHmYkOAlO984zqDlGPw+t/7uyO7UesNg8OSBKTYd4KBZyeTFRZMsbkY7AJ5X+skyuJx3tff3hSitJIeiuxPnDVTCkQTbevH1x72ReqXn594ReM22yCFZu30ecvELQiLvX4y+NhdgRH8Y5dCk7A2oa5TzzMEbCsUAt+vJmsXb0Bjd9Rhx5CtMRq6No/1oWDRaQguvmXKMliEbfRo5wDuFo5sT6ne/WT+Gg6GGvxcPRIsFEjvYiWcLxlkAkiDfk4ca0Paaw99Rt1vEKqtlU/YOrtbdBiYjuM9csLW1nfUywdyULGti1tk+dYEqaLTv8AYn08+cE4oCFVNPvu4pchTfXBr84rCK6WNa+dsOJViE8njk32+MuxyZqEO627da+cLMIwhrN06PthxcbY/Z8TzlBvIqO3l++K4QQwvk0TRwn1wT8iNtNjxjvg8c4UHPMUip4vM94tUHtxdnH3v0cT4eDoNOE7dX63DuJBEqujPi7Ljp1tuvnDujU+Qt+gT5TxgBw0F8/4GfnG1BCLhEX4Nt9Y9rJbsc/Wr9ccCeYAccvfzliKKCTSLgzJOHvjB2iTZfGCGig7xgjXjKQcrz6whWyK4Ip1j0VGWXXfk1xldQA60YpIgvBh+XeVXZU2q+fXjAJMcugJaGwnJ74ywt0AUOPvj0uMsqujsRA48yY81CFCQgtVDa+3rCfJohWKs+kxhAM8Zulq9PXCnHWBvbGk1UO+DjaFKRPKVn7ZAu0kJLeKFl7g95CxDXAYbTTNe94+1UMcuzAoLU3x+cvUTQ7A37OFIlsCV8GEniA5r0/vhkog6qaD3dYnpogn1vn5yaFa6DVaSuhJ58Zq9NFUq332fUxRsndICqkSi+u9Yd0ikFK6cOsAKGNAnwejecTCIHxx8c5Hpq0HT5UZ9A6xYUkh50twOV+cJo4Fn9nB455PjLUu0Q0dcGh9ctVw83wYMJ6iKH087yRPjSYqAl5t+eZolwiqgAOfq7vTzc1g8oM5viqD5yyd6poQjeye0fFyx5NZASc2aX6HAl9oCieHvnLCa4fePk09YshLCdTt8GVR2rfzklgSKuaA7ecgiQsoKQ+yZem/rUrX0/Zl5hjk0zrw336y1IcKNyJXIDutvthdNgKdXnXB/fjBApgRIj794F5PZjwKvzlXj4Y7Apsgrt9tT9caGylouT6f2caimZ4ok955H6/QiZqHzGERS93AhACVG418SX8d47FnNu3+cndKKADsVyIp6uUEFuwQ3bFp8eDG4awzaCeWD9ct30IyfbN186l3A9M7+MfsAIYkXY6TY/HxlijQm4L7518ZO2NClpV6bqT9HNQCvnnJVSODZabBFQNHJtcliIcmC2dcec2XyCbt+nL+c5tj2aZ7veXPhXMI8ThprC7yYK2M5I269GceGJ34h5ZFfnKhaKwt3o0B9WfOGp6lInp0U8nvCcKHEb4euP8AOMWg5kL0/pghKwQQqYzJTKyRD4CW+s3Qi0i1t/ORZ9siQCCgIemCCDpNnNxTJxQID/r9MtwwARJH3xjgRFsfCcHodQwo21pXgcDyL0h4bT+Ma1Ww9FJBEdzAHgJDSh+fnE2Nq1cBMyJCSDBeExRcIgl4cA4bejxiiQAgqiP64fL1H6YRMA3rfzn4UzVRUwWSe2VbA+C+d5aQSqiwUn2Mei1I5Jf0ymXYAKqAAH4mI/SYozV4zUD4xjRMK4AYcjr1k66RStl/KU+rk7ABamsbSwqMhrr7YrKio/POMiwbBlhxpLiKQoHwvjEEaPwuGriRqb9+ssT6f1yot3ck4ApKsNGtc4o6+iURN/nLKBtRUHWIk3wbI389/wCMWodGJdIQhBKQ7YMwTGZi8REAf5vjZ7mDE3WuGuDz4gHHCanIpvl8YRBztMBOheAD3l3OQscZoFIthpv8YQ2Su8o8+wxDm9Nt5Pej8mO3vogl5Mo/N9ReGfgkB17am/RiwZvXWONutMfX/mMzLKjt1OHlfrjQiBGwni5LqJ4jPOEQE8hfx2fjBtKGoeapwO/tkyRNtb87agn0y7f1sUV7Jp+MaQb8GC1zg9bFSCuo/POHkjIohzTupii0AFAPP6TGdSSVhYFTUOQ3Y5HOUa8KG0132vnTFsuAV+EWWQd7IB+oZseM8HlkNC64JJBtqb4NXHcCDwK22F449YZ2FJFbbx2n2xQUa4ronF2W9GAqpjSXyw56w1AVSHIN5fbwZDMMxLG376+mNZTQuLbtjFVAQwcm/wAv1w8ecTliKaNtPab77hDKtoss1C/53kzgBTkAvnQ6xnU2WneOJbLjZ0aJx8OEeoiEQP0WmSUySopf1XXvGetv0FATqdP8berK2BT58dYWdCG4kxVAV4m8fETAWzQfiPucHkKjbZt8w/n1hVKFluiJ9J+T6MpsmAD40PBk68eR8GMQiNDw4dAlUkTZH+vT4xnoFsqF5Z9MUTfgXvHWbFUoEFb9TWvbiGIIA1HwBQnidheMEc+q5bcQkKaELRq9mv18uOG0X9MMXZTeP2HAjEytS8oL9cG6MeNYSosHiZspVQjUF4ZH64TdETn4cuRAAKT/ABm/RtCafG9uM0oIQPM71cGkAFeAy00Hg3j+Q90djfvifX4yWD2EAFgGxjDwnOJNNgF1reUyUgGk0vA/7nF4AgBK8+8KdA2KA43884EP6ApmwIT8vnHpwuhryOXUX1nBEUUgXedtt29ON2ANHw4D8YxNN8DlkelOePp66y4kOFe3zj3EBu4cYdgGEKO0+2sgNCwY72YhwzdEoL4fOC4RAAb/AMxWBrtSHix4fPJ4xiVILNBQxej77mH/ANs2CMORxblowoCAAAno1MNXAqv0xV01ziDS83reUL4Y/ObPwCP+5xD2evPZ6y0yUs7N69nGHLKbUOJXXChib9DyDz/OMAWEVlP5yWum798Mmhm+AyzNvaNzUd7GZpIpBeMecijF6x+hZRP1gY/2CVEQpHngb6w0KS+cRELgU1tn6Yq3Y6Mdp1WIneFW9Koo2IQsX0HWPnwMkA9dbPvlOe3MRvy+mCg2grxP7x6ukgpz7w9JSAs3cMbhtGlvF7+cJ6ReBy/iP75Unm2Qg/YvyeMhTARbCI0+/wCMYzBrnKwv0++cs0ft0+D/ADg41EBVg+vx7+mRRRIDAvF/fWIqJykC3z384y8CECa6uNYSIlQc4ObFBwtmhvbiUJsIft4ZiOP2mkOffLjSOCqMU1h/fAVbR67JjdUsRRzQhzj/AKwYABBT3zf0xqIIgwkL7fyfGayRBINeHPX85bqNiaLTS6MIqBrFVIfnB9g5B/3ywjRVb2S0zafGHDsFHTx+cPm+Ty/pFcT6ZZWg+dZK7MgrtxMeMtjCh055B9z3k/DCIw4fCcTLHSBjaCVjpecI4cRQkP0wj0MpABQv5wbwUKPq8uMUm1AACIe3TrA6CDQmxHDMMMW2gscpzBOsqOYAXCrqWdF2ZzmHrTNErcG0MAzAQhIF5gBNcGMBVdVDjovXOWDqNR9odYfQcKBQQiEg4p0YDshHT3PNybqUHVJT09I5Yl5Y+M0aUNNrclEXgmkwVVK5XEFPGTRdPwxD5+MrCoaF25JOIrMRh1tMF8YF63kBdn3wiyQtVBE86G+jxl4gdPJrLjT+8QBUKDq6yVUVp4vvAaKPrAJvTLjFHiPxjHfB3esdY0gCBVX5d4RB5HszdXMUtfD1xvOSdIaqfthFVztBHr64wJKq86SP6YCsC/GcHLHkSVQgiO0jxyfVTAaAAHn9HNUeMCuGwnIz9MFxwukqa0/sYrLF4bSB9J9V5xsNIIAgF+rvElqiq/1vP38GJd29Zb5mRB0cQ/6YMDCksr/nEkCJYWJv5/3ONca4WDGgsAU1eJ56ziBsDhjzhOChQEJgO1VAbHzkh8gQDyWA08+TJ8YNATThbo1i4Uxgp98AHJkUamn2cYTQJtoUQU9dXBm5ExMarEImVYDgK6C4shA72JhMA6SFKHnzlmQCyojzjdAo82rnUUyhQfD7xAdh6T98SJU7aB5+NOVrdgYqfcdZwtQChx6xiVKanO69O+MegMI7Wt59fGNsMaLfeTZog6T/AHeKbVdUUz6dH5yk1TIFHaa8LcvfZBvHYGllbq94KXmhGFJoprbg43tVNNAav6dfVyQTlM4AGeTU4vjGISZaReX9YwZKgbSTX5xDUTSOzDqYfMDv8UD4uOumTPqh42/f7mZhTPHj9DBY+kBUujxaf3hEjxoD+pwb94EAVUAOV8Y+4CGVn95ZATSoET9sqcR1AGX884mNIEdN5sxYLXwcvxlkaCpjnVUw0bK7JI7J6PXvKw7sxaesJ9UpVq3/AJhKjVp9/wCcl0DZNOeDy4rggjK/HrHkoQI+n64RTgVJEv64+YYoQVV6S09hhOTCsHg/tw/CnQQHe816S2i24XNomxTeAXVEigKz5WFxPokOvDlBytevLiFlxpjLzgIwI80b98VgUVSrx0avmz3lRZFVp+PnWbm9pu4jeNBLyN+5iliulc2eVA/HG8BboggFlUhov1y4j6dTU6kjPJlxmhFoXvBrxCg+3WENlSB84gh5AzjqCp2LhoIkiHGhH33gIpi2rMTdUEkbhAabEF/2sPwSt0jZ7cDp0vBryecQ5iOYBcKnKCPGkv4xCnaET2jN4BKffFTnHz5wrYDTy4oRJxkkUm2/rjIbGml+uKZQAacayMUBUaK9f73hwlHDXYWA7DzlraEweHTrD6rR1NqlvlhfBOmlHk8/8x3RTtx5tXlxMECjtH1+2ESFpueT/wAty45jmESoAdBRzXWFgZ5FHccICU5CPzxr4y9d9sj75N41xXXxafY1mkpPERxbXEOjXeDWpJAYJjzwfbu6jsROX2fj9c3SfOPL3m2zkzvMB79YS0xZ07B+Cc/4StQgmOMb0rKEL+yn2zU2PCo/1hT4gJINfn/c4TCNKqbWm/Zt/GBSheJw/pclRcCyC/y6wWiQeis29S/gwQam12c/xlo1dggx0DFUAD+mB2BVkFe/fWHCukBKPPXP3xS9EQVTU74xTSTyvAceDnXvrCXu00uy1poV8rxc44CVAaB/PP4y39QtfneAhACedNY5BI8Nzv8AOOUMJLOVHw9Zrd8IW9muHDkImOt03/vWO32GbQR99YRUMmlMRUkUlgAv742spfO2OJYFkQL7whEKBqPn+821aXeKqTzh1O5feIb5xhvov8ZU9W1wSbwEcTYvHh9dYiDRGPzhQSogedE/Rw6MHkXGdhsnJ/t++ARdgL0sX84K7iKfviJCJbfOPqBWqCADrhJz7cd4Q9alAPfHfr3jWXwGRIbxHSEd7v8AQwEHc3Nn+MfQWBdQ69GzFthfGEIb6XzhMWoaK3WFWEqmz6/rGFjkhmMTVVWjvzm5NEm2mM22yqYqOwRb6Ygw1QDU/bENtVKUAN74NmACFZEI/fAbQWsqf7WVbI0PJ8TDkSiHjeNG0qTW9Y/EA2Kl5/bEpsUiyMJ5R0JgU8A2+sJ2gQFKnhRdfnFLslAjyKp9MqAHgr/kfiMEUKIIZwfnkoIBR+rv3z++DAdmffBgkERie/WEooCBgGnb7/rjBZVFAB08cPO8HlxFb85Vdcf9zf5hT7H+8IjCqI46gAIhEP11jfrchC08jvDdBBLqnB65xstEXbxj3QUbUOK6HFi6AtnjvnNkhO2sfriW3VAAGajKjUtcmKBwIKeNb5d8ZUFbyuk2OOBi/TEjahTEQEAIS4kHQaHvfHrFuNvrGAeLt84oAUvvITry4VNMwbCf9xyQZYvvGSSotqwl9cY8YB1XGB4Gay1pvn4xpQxNkxbX7KMH3giBZ1wxtYHu/bEJSgQvf4wooWkkP5P6x585vJMMgejr+MRG6cYkIRKYJ4hFhV05Nj885y6UQQp0039b6cPmBCPqObN4t0fnEaSb0+cuMwYCoHj9dujAnBVKp/Tb+PecDzUcVX7Uv0MRmEAsg6PL3Pn3hgcdlcczSCAXw4Fnx5wKS7q2LcYFNGmWx4/OCYGIjkEJ+zcOirAp0c/OD1TL2UIcqwDHaiaTj2n0PxcOphsFG+fi/qY4KpHXS4RMgTRj+jPzigg3dftkG4kywVvQxhdYm826PW8BCDM0oCp+m8S3YVQ7P7x0MFql5MHDES0oom58esMKUoGLvvELYLU4P8YvcoxhtfneP6KCggovs0/Zyy8xOgo/fhxoPoTjnDiQRCVfL7w5liUok1g4CXeC1u5JPWMT2U9cfxgAkypWeHLRN/beNbXQCevgd8Y4wmpTpxK2jUAffrKQwBFSI8/P8uMYm+EJ+uSegTYSJrJwISH5P8YU6VBPr/eAQAQ/Qzs6DKG0dDUtTrl+chFOMiAV7wkQAx8Af1+2CVQfWPKcd+UP6waKz0YsZ4wqU8o5NeP2wIAvYiawmkhEW984h4IBfTWtdXGAXNwEnOBIbIJBn/cAA29TjlCihAiU9f1jI2Wicnt7c2dqQL9cKUs2dYpK5uIEIDnzivUAMZ+NYlNIQqYePWBzEtiA3p2sn1xqLoVSJWfk1l6VGta+8KIgO0VE6wPgLQDxkytIR86/7jK6sMHdsfOLVW1wtpUDcBPXH5xBFigJNO99ZvKw2r5+Fdc8aMFoAvcwidhDI+f8xxqAkpfQTxvBsJ3BVHgTk8Px5yiU4fkf7cQM4C8uscMAyJwevzjE5l4oaPnCBQGVGb/OPLQocGK4PUhNfqKYV8YptCs/XnDCQwgOHDsnjHrELYPv3zl1HzjKvYv6Y7YqkHu/vm9guxOZxkHSbDpxlu9awi0cH4yKHSaa4+PeaTByA1+ITps8mXFDzJMvWvorIv8ALgoQKK8hw5HQPwmd1Fb6xm+l7PHjCBpqxxUgg+es1Gk3veKJYLbLlCsklL9usdYIdGTdQNNPLhopdn1yZPReY4g8pPH+6xzroNRFl0HEdNVEiNtFMH3NJAZWy65nnHHtjWgqgoFDW10cZsEeC2v+TGQgAjmgn5/GcUrAeQHf64A4jdNR14Qaj8vPGGLAKQ4A24WWNS9lb1eH2mRdRKnsPn+8UpISqzsfcfthsFLLpBx+h9cpQ2I/Jz+z98axAMO0BL6t++EIIBEJ9PnNRbAPHi9mjJKNxdz1iReVj/jyP3/8V4yv91jsBvZ44P7zkPWcU1vmY9m2TXN/28AgqxC8hMniyB4/3ObFELR+hhzySmUsPvgvrOYAZDWyfnNqCFQ+/GFMsUO834GwvvAkQujxQ1+cNjnESoHk3hObSGiroPL/ALxTMhegK5fXkO/UzkECNND7uPTj9kqBVBPfDjUxQoYbMxhDFNoWwvnT9nw4XoDKJDeeJF3RhErcIL0Ykr2JNy5XGj3dAn02v0y9BCo+duFVfIduAcdQDyroxABMAGCPHExw5ikUXonHX84+JCGxQ40L9sKnxMCAuocG1ntxIJ3hVyVi+IbzU08cuOtZIfZ8cSvhChPbzh9yvYkhM3061gkuWHqjIusmsFC098f65FMoVFaLhlsEgMomaHHIUnT74ipoAdTX+MRAFAcdu9/rgdOjs95CIV0anf8A3ODik3s/TFKHH2wDwvi7uHwT1EACeR2fo5YxVbJVPxMgB1gBWVMncnOOeSfrjyvFwyiM4wExS+jRg1nUTjBmRIBpt1+HHBdVpffvJ1EU4yGycsKB27DyY4hoHd+PbV+F8GEmCIm+tZd6lBSPXHxu9Y9M8kBIh6RfYx6SGjYCLAmMl16I1iOhDZHeFCV0HL4wNBV87c13oRBQSmn1o16wk0dAAPj18YGvimVIDQZr74Ts2rjM4UU+P6wYRQVN4Y/SZJkwQIRvo7oYdP0Aabznc71IGGti6B/yGj5wqQmlq9mo+z7ZUlQjiG6IBvH6ZsfWEKn5Ar+MgwKRYC5tSKA0Yu/xmwmReZ7xlbWAdm9/jHQ0IRFXf45wkqQIM0O9fhznBJhJIimyObWAqmDtpBn2xIdNTGPgRpy67++COgE2p1hfSohpeHxgrUSS97zlZoP/ABgACBVXj25YuSAmug3ghHx1cnpI4nstIKm3iHnVLCIU2crj6MHVSyeav84eMk5kGn8ZAaVTOKYd0HY4RlBWFmPPQITbP+fnFAmyC8IXj8GBqBDmHT5wqdBDmumicaw5uaibG84xH7CTHGcR2gInaEb/AA4hLVLBaeeOnEpQIrBeQ+OQ8zvJsUi6UQX3rjCYHEwnLeHwY3UijAT2eXxuZOtopb2Kqeft1TGrYQoBhsGs1gCKrI1b6SHPlxpgELb09XGmggAJv6OJkSEnOeDjVO/GsJDFiktyNuzRcfV0iaSwfh37PGBK6qk9m8N0wUgVg43F+MutBwPITh+2JCd45RYGl0c4ACtg0qn2cY/WIAai/piwrACwQ8T53iN1UqrVfNxdbDlas5+2riq6qOGrZ52/d84QM4dKb698GsmGiRwTIQeXeGVoQbvnnEiADVa948ZtBggF675cZFEPAVx7w0BRrvxx+XFqexJoEeSGvWA6PW7L5iDAjFAcBDLdDTiTvB6eYOrUGODivziFkKF4bPJvEGyHpyIl0Dfw5PsonpFP2wbvBjotffGcUBoIaNPLoP8AmiPZCajEmOMJocF6zcvRcKasnk+HGuCSDZDOlqAEt3x+M0EdSoTU/m4IJB34XeIRk0gBDgZQ0Op2+s++Z+Me8NZQgpiaSHjLBycCsKo1U4fcfbCW0aH0xmykRcEOH1xlnNrNA175PvhJpa1Jr3iQEJq8zz8ZAu1DSOGUonmSOYNeT85GmQ5C7F5enDLCFTH2dJvnX0yRAJ5565yRY0oX8YYHWjbyPeM0EZXsT+8txYqP3xmCEsPOAiIkXaRPORdxiKEN60d4wuAKTQ0sN57MLjDltNdb5xj3IoUMsnnLJmsK+DfHO8sehAI3ry64ZcLF645xWorQrT5P5xjDygmUsVQByzk/XBoJ03CnUw+aUwkkd612+jyyL5YXISA+dG/lxZPWsrmhHtVkQ4dnUwHyNUCdh7IphAHQtLpE+a/XN34KWazUm7v5uCHziXgS/X/ON7Cxfth1wse1yYRatrWr5yhqbPviSAMFLjjIz+DkuCo8G8YNp+MJNIpT3gr4FRS21+T/ABhNvAiIPI+cdr0IIRdOEp98lRoOnhzdtgeTnGFQQgLG06Og9bxCEIVIj0+ftm8w4OwbHvQbw+igOz5L3gk3UOY3fcon9YFgMuHAu4ZRcsNgYXeMaQVXtn6Yc5aOvNX9TFDAt+pjjkIhpXL0A/jO8RYKHxjUbpadH8ZYjvQLPiY5DAi09v4vzxhUykDjo4m9yaw6jaYqqaRnFv0946vyFtq6eWGnX65pJVFQ38Xj9fOQoJFFTRfM/wAZWXIlByOu+E+mHG0mI48fbmXKNiVaNTHKog2C/wCcCErpul/3OES/WMWK1eesJxCdjxlHaTxLml8zjniEBh0sxOtHFD98KgioPfMHgNs5NUgjqOnmpV2H0wzqCMMYi0eeMY80T6ANX2fjpRzDnyy+6QcejpH4/wBMkA0QXW/8rhBNJ6yT/BriRcDwcZ5ybyo3jBO1CfVT+h9sM3FP8uJlUhOEjeRSNQfY+6ZKdOQ+N4t9ajV+uRZKqI59eMY+qp8qv74TwBDWnHq83LH+IQh125WesTgxBEc+eIaPvisptIKVo/HOJV0DhAmDERLvgw7ZkiGCjoiLO4w/3jHolNaXbvGBeHO25wEAnvveMcKPIMZKEq6bji9oxWdR56wAlPk4mFAXzquv0++G2Li8o2/yfpiqIEkacMqF3NGb6O5efWNqtuAy8HgQ+mU+xVkrOZh1j8FIw/Wk+0wiWqbaDXZp/liwQUbXfH4wKtV0HZl0Y9hIS6muMghxk0Xr2bw0CVwdZoab5ykIV7xDrwHzMicNXkbPvcESMZJhoNnXPWOoNJvHrG7HFNeVMd5y1fWBT632YVIHYIhMWmqvatcAb9nnCaTeEj0QhcT4d0Qh/W8NwLaFHHOVuQAOj8GONZK68SPI1Pq+8ePOG+ecU+cRmBVgx2+DS39MLQmionwunV/ypIxBd9c4BYnkKBhrtHzi/EfKua1RDu4ApyfGa6AVUAa/rNhQpvN5u108Dw+MmzVUFTe70oUO76cEAhAeRvGQhHbnFWhCuEhIoEu5zvCbxqBBF/hv1lfgsBEmBwaHCho9aJ9cKLIJlqpBTG22arduES7HWW9V080GvvfviRbgtnxl3BR2TfH0U+hhoWvMO+N/OXjKnLyVxOu36J/Qdjl9Jskuk8YhdnnUxusoBOa8q9O9eNX5kEw4wGw6blx0pQZE101b6cVF1MugaJZZPY1x76yv3BrnKT6NLzi5pDQGQcPzowTBIEUTsDhF+MCV4RLa9t11/wBcYiSq68x1pOPpl5YmImmc8Tj7eM0vV2YKCedXXzhOhKKMG3Tl7Pr9KuyAVEksethbdcP01KkW4E18cO/jCoAimxNa42HOFMlAiy7Xas147w9ESCgRuOnkPphVQgo6gF3rQv1eNTmH1ajBKHCXnN7fgWQVqb7+3vLoU1SQ5Dvf6ceHSBxyXzPsfUyTAOVCpr4T9ssSwLq+BOXv7eSo8Mqejy+prGZlJRB71nYJ6o4l1GtFcvFIlpr3iiBdVrEATyxEcCBd+OcLVIoEN8/G8fENBZdZIQjmvFxFvjWBLgh9B/ZxNasIKg8via+uETCosYH8Y4n4ysq/n8Yp0Fz5ffxjuItfk5x4bwd8n84gFCNH14x0wXILwYg/OXosRH26P1w7jr+WOhu1v6mN4FHGBBu4xRQg8G39HDbEBRSfmY2mihpuCpAJcL49muMcbrJEgG/RGHvJKxUAq7ZN7M2oeciJJKQD5zlhPVTFayEFmgnxvBnAQGgrx60MIlDAcJVeABcbUz1LnDcinDQT84DikQlGccAx2flSkJxoawipWD9hEZLGCktUs+N8ZBDKG4QC8LZ98AtojvhHh3zftrE9ooQUxVM+MNgiRSpvn24TQ7AeoRZFePgwjyALMfBeFl4xSe198Zx0aN3fGA1p5QFzdX2MdyKe8sgJ7aYnDkGvJjxq+lw5eHi6wYYE6mAWj50yoFXzOsQCG/jHMU+4ZZRC8l1hKgh2neJcRGXEu5idvrz2wzOCg0FdJ064y+MF3h7wAonPQ6hD/wBxrKAQAVjtbp6PGQXxtcPxlUClEGk+PWMFHpF+ecAbrjlcOgo4EU+MFAesiT8Y8siQodB38YOY2FLrSdd5NcLYLp1vJzSq216dUl9mbWQkuPm6Y7I4CJh0ccuPr9WwmzNUED0Y56CE6dDrZ040msaoFEvex3iKI0LyEvHvB44QPFDW33jBISNLRr5d4bDrXX/lt21EdRD74wvkgtv64jSicG9nL/vOIuhLoA3j28p41YgnJqEh6AAffzjdJERQTXrjL4BscV69fOc/EwDTft5/xu4YLi+vJfL3vzk1YpAlr4pufODSdinfvCNzViCOn+MdD3ckyzEx6dYx63IWqLv1hJAAqEHm8GRwHTSM8bxkpWrTcd0nLJm+z5wiNUHLtvvv75WE0JgNk5eePjC3iR1DJaJMAkspmnOhv9MDAgRRAw3AF5f4xIFAE8NIJZG9YyIwWAVwZoe35ycapoqOVu+tfPvZmoepCvvhxTdU89Y3EErKlKvImphOhMEo4nDwb23zhFRBmkA/Ug/fxjgtnGEoPtH0vjJ8A0nQafkusMQgxeA9huh/usp9bFSuh+zh3qtXab8+zCyNqqKJqfffr2YzSEgTY0/HWMYItAFA7nM6uDbJA7bGT6VPvlmQ32z64vIGkqJHj5yC0pqtHjJoCmARe34w+ZDmNI/xjNyIgVWV/GOLuxwuzf2wV6XFgM8fvhZFoEJNU+mDXXJbG9wJ1UeT3iVpurl6do4OvB3WB5fOseYil8HH74MqSdcVS8aPz/WWg00fbCjjFbIHZTn5xW6VUqv8470tU9ZbrpYfGGqNamXXn5zo5m81MCoYNQC3gpPyM51CTkpH7vrhVTZEHp8mFEMPSp3gB0EFgbgBfVFSfaQ9Y0GsWz8u1ySXagAnqRyrMRLtZz3eDJeBHU3yePnCAGKIWP8AOBdyA6e8nQK5Gm061OucbM1UJsA94tCV41GOnOqpx8xEMUA5hyYJqC0RE4pOsFoFfMuKQYPg245jhYRtzs3StP0w4MGoRPrnKg8obr5wsL1pTj5yvtNGA9VrRZPobZLEF6i/BnEKPkzWbysgwzN+kxhr0SDOZIfWRa3rGKTFkHb2OEBWuyB36PzgkymwYBfYc3s+MSQ9cHj/AM+cMsRQBD5ywGFBZOfn/d5GfOYsd8+sPihEKb4OZy42p6TZZ8TIESis8Y0U+FRU/OD2ScofzjJOTSNGc8Y30kiJ8+vn6uTaBSLerzmyFNwQz35wgUJ3g/PGGdKqrdq+3eHuEtUBu3Rq/wB6wCEqgVLRFmu/rsZaxA5V24wUK0DeV0tC/HvHm8CI1vyQ3XuOsQTdWAbp/jDOyYDas/gxyiORPzhcc0DyJT+Mn+Cih8ug7/OJSOje/wBNezwHeMnk2CENDwENfrXHitF2bZeGQrBdecYXr4yCogX4DIBGiUcLzFBBCao0RaN+XLAtQ6kYMNFT6d4DdealJyPW1HBS3cM738kv3wd5oLq7xAoCeSG59GsnVkFgLw2z6U+MGjMVCG89eMapZIFrHria5njDoAgmSeHk7wsAruAxWCnUZYBBuljMZVAJWL153gscsRIPn8ZYFWUpYCAdsDZ4w6wbC2945UCCUF4ZhK3tRVEPaWPw5AJEZEj8YjoENfg+cYrFQVfmd4JJPEO5hSwvhB+qXxg0NUFR+vs+sN1g2UiOnlJqTjGhhTQR9etmvXtMtASUoiHHuw37+uGU4KArvjhTRNcGBA28l2V40czm/GsLeESQgVe3g+us0pCwkDQda7h795TCtSEv6GvxhiuVgN6e7vn+cjxsEA7o9D3DweTHyLwRoggnnu+7jgYMwpyr7Yz64BsCUjTv07zWBIDWjh5eX64gADSmjr8v8Y26hUBSB9XD6+cVKu23DmkR4fz+MQFEePCfvlgChyowIbgCIT49YjJLrVKeMut2mDT/AG8VrRaukzZoo6Hnhqw9xV+MMUcZIG4jzhAI34xKvIvFxZufOsAsPOzGqgp5mUTgcbVuRbFSEEze4KBCxfzx9+TQFaPfvGqCre81GGGkrMc4D84IABvk4xOf46x25PxcKGt+cg9FmSE5MeZsEHVL++aPCVRs14yR1Wr8Pz/WHFvrDg9Q4Oz319set4ISgj2xUZ0YmQkAr+ujCENsgbfPBj4KRg1vH1ThhknvEMHGix++I1gghCX64ApukU/TBALtwCF8JpZ+cnCfkYPz9crm6xVM9a5w6IlDnENRHnPADh5pgNQzYTTmchMkWSsAPMeD3jduFNoPAnDv/bzWTW23Oz537wJBAWKA/pmsMUs+ca4sSYg17lMaAJaVHz7Oc5tSS18ZjVdJJA7N8+M6miFPGt9utNzWUE190SYz8oIsbNCgu2/TGCVATXlA4ev+4BApYHdzZegAFt4eOPzhkA2QQ3Tor7OKWQAO9isSGz9MMNAM3oOGxiTXJ4cMAcVodryMMvCZAbffv3l3xBegEc5MK5k9081r6mBwWXgHhoS8TN/ZXF70J+E+mOiwNFQnH6v1xtCYDFNbNOs1WZRqH1SzSTc943VoU23iAh7kKG/jZvHD1NjRKjhjqJ5UGG/nkylOiKFG83LbDYPBH6Y60UOmmTbjhAvwOljv0YiAlAgIujrnFu0Tl5w1XnkYieHz4wn6MLYuv2+mcfBg0chB+hiMIbFMHWAkAqwLI9enF42SIHraxcKjvxXj6s1d+AFQ+fUuOhHGIiTW3W+f4xqkm0l+HFO8YmwEBvB7bgcTYVa48jKry6B7kFJt8Y9fp5KGvZqfOFRELH1w38owwjJbCdrwEs8jy4h1Zu9Nb+cKjoHUe4DFYX185L8MXKbf4k/d3DTq8uHZ5cfkcyfymE8HGKgXWow/XIRYaAj+DWDygWAB8fvkBN5KFjv84T2RVUo80Sc84PJljUj7vxhBVwxOQ+ONX74wJAAiBhyjsZgEyUDFAhw9AmTUQR0DTfT4/jakMKUQEKc7/wCYjKvCQnk65b7cFJPWgLycq/pgDCkQ4CE98ZzBjECBk6G3fo4xTF0MjOtb5Q1r8YRmRXh5JvbXHqncy7AQazSxf2zRBY7BBS12ijrjnjrcItTUlAJ57ft4cflQURVj+DIow2FpNP3Dudc4QTIe3c3rjn8ObJcmzRd+uMtTyruYsiz1y4gqRl45yAA0un3ix2jYJgBi6ecUWc1rcPQfKKGF9bu8I9kmkAy3lFvz0fSD75qqFzvnIDpHxkWBfbmzwbcYiG4/fCWRuC04e85lszgR775xN3yanRkwNfDgSDTQHKobsbPWJvZsM44wFU/SUg/bg/1wR2e/pjiCwTFIqFk0W+hkuNtlhDQvDwHH0xNBU5VJl8hxKIbL5wj0sAKK8Hp3hvLxYWLpKHHDPwx6AUct488cb9mLOqlEA71VOt+/mCqihE0FSboozFvKNIRBHlG3zxhrkTrgXzuYyvSkIo4dtkH3hKFSHQivuPBgnRttgvf5z3LUCCcfpitMhcCnDq8cYnOgUEr2+Ot+nyZNIhAakfLQ3+lwSPSCRJx8Yxm2gCAUO5uHw4qAneOnvr63jHmGIs2HRwNJ9MIXL1XIO4UedidYA3ZBc9cPeBA8BkU26P5M0reZpbyLwevXvChdFA6MaglIIaO94FW8R2OedcmM0mmhaT2m/wDG9Aa80NfdKYZe5KSBC9QHnvJkHA0l/E16wYBoFUdOvxiLPLmvmpXcg/quDUVGoa35+feM4WSZA7fW69YVBfF/XGqS0Nv824SH6ZzB5yKKQb43z+MkwezQE6et37mb9gKAq7SfplWG7y7xoiOz59OR2FGCB8ZbrzrNZ0YbNIPtE+rGliCn4yJ4ploVDO63zhFLTh93Bs3l3dov2yS6Jh1E1DKebh2794IRRQCwOHBocMSuKEDe9NyKqbInbW/4w0IHRcXzH6GUrJqAGPGs0w1WTrOHL8YqoXINK66P+47lDTAsJNPl+2GFHrS8EC82vAVQ3ny83ARuyqU5TeOAwKkQDrJGtXZjY1gR4RxfyBPoKAcmmhzrjeMLOoHRjo9eJgyAs7I+MFcU2On6Y6MRu1frzkYCoiHfOpj2ISkq+zgLn4Sj8XnNUa3BvrByv3LP7xpHncEXNte7ABuf7WLQrp7bxv8AGARA6anbhFULUtd/p3iFM8lE/fLUgqQtdD4PtkNtAv8AliXG7KasCIjsb7Obo6DFRAv+6y0WyKI6SDObvXxrHqQoHX44Q2qfGGKANq741tNcvrAzci1Duv2b+kxwtdICnG3jx9fGWJ0kAsNzldJON+pgmsIajOW6O2e+7i8IWgOo67rx98cHAQwEW/fK/XqZLIkKqfh1wb9e3HeZABNevOg/bxtsmgqsTUlejbrD4TRBPv0k59vGaygmwJNA+4/6kbulmtcF8/3jxdAIWOJ27Pj65UApBD2vE0/ZxMphCBQK/L747V0QVBBal5Pf2ub6KUJAFJgFI1QL3+mWU2XJ7uGoKb5ccIqLJTFARV7c5c961lE2+jNrUDbrnJ2lDom8Gy7Ig3wHRgipBqDLi817TEWjGmXPLgIjxDT9PthEFmHcXGhNYmQOzB9JgBU6hCLXJqodriiJUYGqWP5TL4QiKEk2dMXHwA8qQNvFDPnAb0E9AQOfpk7s8Ad6oUV/BnBaGC7dynXjjKUAyARBAzv9N7xhcKRJCh6rlJ54y38QUFDRsW83jTnKt4CnszveMvbXOvm8YmYiGeDts3xx78GDhSCUK6eJAmA3xigCcgCuPUCBSp/nJQpQo8jhJ1TrDiFODJIiPT7yVGCsNl6Pvi1JGSWmfMvJ5+cSpQQFW1rWwfp1MXO2tJRjuk3fFxUhES0x3fPWa7LEkQp24Yk26sNm09ia94xCjYo7f1yXvgqnblCGwPlqceOHJyBGW9N+mGbQnKRM3BXxB9MilAmjl7H85t0wdYXE4a7XLeAQA0QOP1wDFguS5LMZBa5W3eTc2hPjeCQKvron9GFMpiKLp2fpjvdHFPpin0xGhu6D3jvxNZSLQ9k9/S4kN7NOIQ5Ji0HGXZ4rggHgP1/nNIPnGFbSfT/OKCpp1hurQHX5LjFyYGnXwnT8mWBQQbYfOlcJ8PNEEHnQ69/rj8iu/nXy+sSpu2ETYBnB/nECagFtbgWaIQ66O7L9cOisaSb06zHnXoReD2fXCIpWu0cCbOOz+V7FzQG2OnU2fe4Yfh6yrJvLWqHXeNPKSznBPlAGFOUdnX3M1ZCpsOtGv9ziVgAEfKkPwP2zSq1B4OvqYtYVbAqt4njjDOxVmgs49YEgWlgDwOSV+tUDoPLs1mumoH7+uMaGFc55Hie8cgiA7vx755yt0dBk/OsDCEu1XrjCoj8TGUWYEJWLwM1/dwO/Bkbo6FS8y47BKLYj4fX9/VkWjugsnHvj/mXRpikl9evOTHAEnrJCyEoGXuhPoYVKFSMHrDmAcczNCcOQs++ID5rWjjKzLYISR+cMi8jl19DgwiU1mi2eTjrFDFVoFoyI68z5w63AJCwqXaG/mad4vvKIAKV3J5uGAoHCK6nMU/xhWL2ESnD51v17xxw0MqQY79uVxqQAKyj1rc1x4waYLUIJQhzbweMAqnQFvhd6rqdmOFWWiB9/K65cZY4Vzw0+5kRUIoEP5FmalqQbVnvgLx/GWShqJgmlvb19O8HJRLBt9kOucdSCy6H6cdZMFQQICJ0t4/TILAliqvU0H1wUASgbB7nu/R8YFUEqm61rjlb69mEIQiUlu5y75c2in6WUAikBQTNwy3N5+HGdpC1iHXXHGE4QUaA5HPw+XCaEprFrzEHaePGMISOc62rp50ePi2/mznQBKo5BTx9FPTjguxFvPf3xgKisb9GZYtwgCEjeeOv8YSkKiyfXCQG5NJ7Amjj8+cVa8E0imj933wbaVGlnQ7NTjDNjY6liDKIcl4eMDkxAAVbAvWrT1xgKcopUT6Nt/XHDaU5S2F5LT6GThSHrfGEUdAEYphVYaFBBXmeMZDoWBLh9Rr+Mbmyd85UKJo1znPgiK1wOxfX9YhmYxAvKa9hOtd43SEgWkdiKrvx7xurRVGNDna3484ofOsV4gmp/vLfh3rFvpfTk9WduKvHpyn1w07oIVAfhF+3lxuKWqZjVB6ft7wqCoPk5+MMig7QxDm8FhVPfENfTEzD1Bo0fbEoSNRVwyAfdBxQoWZxu/fr7uAMUAAqjjorCAVnrHRSNiPTcJe65gor4/g4s1h8tv6YyKfTX74kkLzsw8ACLHNs/RzciKMjHp55y7TijY5/rDSDHFVNbxauB29D+cXnLrgP75fuCaJ8t/Ti8Xbalw44QD87ywB6fTHoP0y0DlDAYqaCRsD+MmKQfGGTUg3HGT6Zd0YqLht34/XIHQNSy34J/GOEzjbk3p6f+4SOKgSCr7GgHOl3rAGsCS1uiPGvyYVAXWoh1od6zjuKyD25h8TD3CHQdednGHRHUV2452fbGLr1QAVpZzx/uWyJSFXe9kee85tIQoPu8X1ilvLe2sAqCcBevbiCIW0VE864Mfy8rAlWtLqXrA+0msN8/PvElhQwSPD5MaJ30UFSac4ZKCE4C/QYkHB/dpr8TCrf1C3wJNPOFgWQQF4dm/pjLFAdM8nA84S/BnOicXHPrL1UYZYJO+uPHfT1sAkGkv3T74cIwFAE+X/eMq7FBA+nk9047xUvRHz8gs+uNawC0ygDYGi16y8gjsHVwoYxU2OtPzhEigaBrdetfn7DZ8B0jZxkhbIYVqQ0aPOt/XA0AESj40E+2Uh14Ul/vHQDduxw0rm0f4wyDSf0nII47sl/nNNVJBMR1HAgevnCLHrE1feLqUN6f64XTQhFB69fOINBOSCvn/eMpJyAKl43xlFTABBdGuVZr4wEoSrsfbTOJ/OFF6y618n0mKAASpR83TxvK9DxFdd613/3jC8yELpTXl9vHGGeoLSXRTl0P06yvmZoKceA0hxt66sThZ4Ao4NKz484XY1AKouuHT9Gcndi5SEZ8OX/sKaBGTSU7eD04hPmgUUKp8frjMMQ0hEJz52+H6k8MWbS980or283BKUPDWfOH5tlDP9rG+QAs2cQ3z9sD6S5aOROeBPZvC5FoF8DXnzjzogLK9rr4cNeRn7+BdmDQRyEUR6jguDm5NmIg0W98x7xwGJIgBf5xcTsYOBOf1yI0Bamy/k1jhqWhhhaJ+nrHcOQWA07+X74zSILYmFUDlfvg7nAADvhebcXOOBRcPrJAYNKL5dHn4wUN7ZTUpxcZR1w+IjfwZbr3myex8YuoTKgR+WjzncyqWuvK9vvBcFgBUDT2c4IdVLaGmO4iR8e8UT6GUR01/AZGyKvjCdgHtxhlMQXUO+ZL98paaFAPA9mGV3AQTni+O/5wVl0R1QdY6wG0UBT6OTFSRJ5FietX8Y5SQMdD+LjFVChysiYCuzZho946NVUojn0YTEJAiCXk8nvFSwutHk8nrKV2G2y4zpSfvjCvIh0mC6DsLn2x1xfhH65paBwkD7XD09JYNKMnI35xlmi99msvbqYbA1ePWNA+Mb8/xm2GFoNAeMMsEME34bdQcGanSRvrw+35ybiOzU3wVar77mChcLo9YYHeXihkvUOcj5yaa7w5O62+sScm2mlvb1ikxCRHeRQvEl++EV87ILbjlvGN0QMDZuMnePPDSaJeGgDFDeVOuck19P0yeydiIPQdnObaGsz+uFiWLuAnn/TJDs0wCc639dYKBBKzn4VxldaEpD5fHWLpQm6I3l8fGF1VRVDiZDgel51jJbVTBeL2fXBTxqSnCjCOvr4xEBUp9nWME2B2K8zvIs0iVxz3cvvABtQ3s9/xghfNVt941AERszUcJrJhp2Ilu6Bx98ITiwKhXZzoek1XpfaJSWaed6mmJ4wnWB7REd/gxbsZdGI3rgw2AkAKfCafd9YSVgaoIPQcTHkmsKDwPxIffzgowGsv7D7fjB3VVBh5nxyYUmqoRRtP4wUDOxFEn64igwNBovtwHSDqnGJUZ0WVf9+2Xg2mir/GHVm4khB5Nn3wyEvYUFMMoY8tvP8AGN77Rb+T/d4pQEFZS/nCRJarluOHQpMdM2ll9KuU3GlRvxrhGtywr605CMLGIv3MnCC7QvnN7G+mw12o2HLOJhIxDGTpZXxV6xvAmwqHhrYz+cXSUgcE84J0KRSb9M1Ebm9n85O6ZFZcKzkBQVfPFzusuqG/DTrnD5I0JcHPrxgCXoO0m3kLxz4yQr7RDSL8tT69Yq9VCBd8wqPG8KRsDM1FSzwm/OMYVusv+3c2V/BaHvjWFEBQgH6fOGAksQL61zhw1EOl0b74NYdEOxNA8YAugwKuEXihU0dP2fbC5Xd0J8t5JOGJpPxgNEtWvLehF1r/ACGNlT2eJy+TFtFImJbN3XvNo7ZEhPplaIdNJjCaRG+MakMPD5v2+mIwgkux694wpw0hDyvUW/GHEwckCCvo0h6DDwiJ9zKmo6STuHWucoxNdqLE9c68jhAF0M3gaFAKjO4c/GLOwFqGTWusDiDzz1i8GJtJKX5cY6OxDRtT8OsFGhObvnnBlVTTbcF5hIKXYeNLvHoJlKbyyyVDgGc4w6hdj3jIXb+A95s1TRJ4vo4/OPdApSkLdQbK62Zq6Wii1ANeT8+THU2hKheXhJPr6wyFCZAATQR1X5yySImge74yqINaD7f3iAbIsFqI6VmWbrvHJeRtBRpeuD/Gar64AH6ZyME8qX84wLD00ftm1IghUET90mHGahe+uMJLttiedgfpjxaSgk++3ETQANj37ecMySq3/fXE6AGMRIh3x+ubnohrXjdm9c+MsUQPlav5txeCo1o5xJXela+2Jko9GjBVi+mMkxNOpljXKZqX9p9sTFyLIb+4w+/pBUGvTrg/GRO6AWzhYznaZuLlEhXxOH4wxcNAqh5uOo03pN8/GXF1C1ve24HDjgkt555wEAyQR7cZy0UY+OjOIHZw+XHrj9MIX2EA3yvM9zLMf5IKc75MKiVsVDy4lgG1I/ONIndKV/Lv3iXawgtkZPOj7cYhGFUHs84eyQIAAlfV0HyYjvtCrA3VQvnr1kELsAp+Qw2GAAsHeLuj6VW67swrhmAAV5Pj/Qlk3EDUvfo7hhggjAUeP7wkuNRtjx78YJaiqFLaXh0T1lzhAVNm8Nrx3hwkLAQGoOBb+uIzpVF2Kvc2GjBsTDWRinZ3lnvItiG59MYhgR5QJ5Nzp1vUcLw8RNW6Wyb+TzjR2VfuxABIu2M8/GJhqFFuX9f5xRo5ZAaoQX4UVzjrlrNAJukj2cGy4DsKreU3yCLFizrGczDIYK7Cq1479ZYoCCDZR4T3ik6USQO4GjWRpUQmO/Ary4mQQBebRZyr38OE3kJBejo64fGLimgG0fDNdBa0Q+HjCqO0LqfphEpeCSHvBEuNY7WFZ0f9xTUMBu87fYor9PHGND4Q/SYqCiRRPzkQBPBn3wSFBtLXt5wqKcMf3NY4WDcjXDylPI/rzhgzyDqxPYzmBmFVD4S785CFCWUDGgQxGjAAnzxikBuA+7FMScq0YMgXngOFEAUtMdX685C7YzMmn2YOa8BuBfOCCNjQo0KeXf4xi3WqFLzcJbBVbF+mE5SB1gFtwJrmeccgEZQPD4dcY/RkSnJF9nr4wq4LdQ8mGakld1f2MY1w8McMaBBIcuHlmqShhbo2YQf659YPAGIQ1B8Le8ZLPU6x6JQAGqh+WG+tJ4Fnsv5ODmhBoUdc/HeJ6xDa+GrcemnBIvjd+BXGnBgDW8AJ9cX1FxzAvAR3iMq+9AILMd2zFIYpDQ8I7Hu8YQAE52cZappgc3eQNY7kbEG7pCemI7AQXMPxNrF8M+MZSQ8Tz+uKlUCkEZNhTnn5swu6WJK0HvRJ9cPsQaQbV0cOuyB03cSTJgUJE4fG9tKyig0eStCgy2LLJne0RFt0+xo37Nc5aoRUIiU8vzhxfJek6A5dcfOUrIoSfoHFmsKp8dh/eFFoe64In6004MB9xxn/AMKEVFHMg4l4xb9gSAgBxT83dwthRKOjYpx48T1iFQ5ASDx6xkLFUor4fLgzRtir1rae8Y4OoIagk4ofb1hqBYegH2UU+PGCsBKgat/GbvH1wIhVBdB84hqbGWacbv1cMmdTGcb7rkqymkG9Ky8TRkXiAIld62HL1zjTjhX178uucYRJgFHzz+c3NBeP/FlxVHFD8BzzhqwtugPOjg5bUCIPO+Gbk7q3D48M2WeRItej98L6U0xUchrK9OI7pTUR2nl/3eA1RUD1/GNIcVChWK8HDPb5yLNy7PDrpxhidahd9Tr5yLPgDLoGh8x4eOm1C3uoGpXRNJ9c1KBlNB8YeeNAuo8vLT7HGMgAoCGseXmc9ZoLtozuZAvi/fBTmlwq8adSlfeEUgob+nbvNaSN0u36pU74cLQUlJdftl+osaAGEuZonaecOBTpRbKiDXwPLULUa4nwQPfiZIURaVieR7xmtn7ew8m+D8Y98cKFJ0A0K+e1xtnLhUUV964wU0lBNTkGzlMX9hDpb6V3z0fU2igpFR3++EagDQupynXxh0FFIRy+F5xrSASAgmiF3Hn4cvwKM3PpOyN/uXIiVRanNQ9eXDPWWFNFLtb0fGJXENKUa2E3foxBwIobRx5nX067rAOrI5CK+v8ABMiEGKne942y/nHbvBEzyU34/wBq83SgQ+mt/XG6863Z8b77yb2gIVON/HGF5eFuh45082dPMyP+uW4wwRrn3wTEBl1qKdEBrVPw42DlRCd7lD7skKBtyebX5Yl9KtCi8j2e8EkLUBSOFfFI1LyzDINFQQveMRaKUk/h9Y1aGUJxe8YGpE0v9YbW3SxJ9M4lt7SffGdFlKXEdsw7qTWvvPnAGEglMe3njDntA/mZappPYJu/HXWc9qgTY20mvRhB6DCbyJ9h76xzsOZ19sIfqWVLFeyMno8ZOzhS7TRol3p9bylfUZuuHOJzgAgaEkXhMdLqaVTl7fnKC7Ludx6H364mDW+TEW7fri3yToVeATCtCgibD3vhxGxbsGuPR7xOMhxQyLybjirg3TmYB9Y3/uOlKRGMvr4wnBQVdc5LoREAKaPvMLYANBW18EU+veUiKGKpVnxvj+sl4gKgPREcehJoeV8SP3x14JAEZ1UjnWsYpNIj0CA2dZcLtKBCX+eMlMWCaB4njnC6tIol8+ByzjTaqOjgWtfprsudnRoXw4W8Kb4HLbFLW7v6Z3pFhKvHhJMUFRBG/PxozTQkDzEERjdnGjjeXAyIbpGJKeF94khNxAGvPPBm0qFSTZoDl5+2KTWArwWXTNfVxQgGlBHK+1WhwmhgLSSVyMZDbYNDfJwT5wk3eARit8v1wzCplTbU1Xf4x+UVuuKbvg33628lB5dZNaFRR2o2w146mC8BgmpSkxqN51jxcKrRHvariSedoH4wrDIg1PeFMlSAU1PX+1nACSirrgZrB8g5UR/WDVOgNBx9fJaacBiVVSPnNUIclLfOBFRkiBki5egLLgs9Ar/qGuOAkIJp/JjNRBxUnx+2Eyo0hL41+MfIJwRPPJnSbERH7DHTtG6E94DT6g2fR5x1NekJKINvH/cfqCOkEbv45zmuYhbv4MZCgut28fjHRjcVdVPpr7mF2IU5W+J3iYxq7gHnr7YmfCsAnNAfbGo65JvPBnG/0mADFpoq7eR27/fIA9lATil8TN+SjTA5oF54xSeJRsbw6a2P25yUA7GS2aF55yjk4UJfJG5H+nZCN7HL+PeBMg6p1g9sG6c4OfbpBR8d6wht7oAJuqn23iP6a2I3pLK/1h8MCq145bR3d+8ZNfpZr3yPUx0EgGyTbEFdIlXvFI1RE48uxj2VA3nG+hz5+9x+9CVXPgeHC8AQQilNrYVs51kg8CujHTtVM0a53pwwnkpvA87Nm536wkFyLoOc3m994POaU0b7G4PcZK/kcz3vFjoRQHtpvLtfPgl4PsErx6L/AG5lmJiAXhqfw47qBjpvjXGvfeJdxikA9Iue/wBcJ4KmH6CPnGc6EeHTqK6DtfA5B9QA3UnkakvRzl4yeGqfXLFzKvkD0onfoylQmFALR1uyR8+8eIDerOEmveDYh3hvhqTc+mSkk/Km9cBkiR0wE6GJv3gtlGs2+cqJJat+71jJSBRMx553zlnksjXv3gVM9oC3s5mBNagld72/nKC4kkeex7dOGzKQ213hIYgRxQOnjHwwDRjeA7JT7mVutCyRwnc73zhRagiVPo04EftCBHrzz+MmTmLB4k8jZ9uMYDVAC9TrCT136wCrsDnxhEkXanW8U+qKSrD2UH5zhUDoZj7PvjEEIjhlVBgCyg/dnxk4FdE5cOo2RupkwWodawnOCRxvxxziW1R3evWUqO8JpgWnxrjGERCmmJR9cc4pEmiAWH33r0YLN4Q3SwUvbcdsSSULsds+d5ZZAKTrZrynWWIpb1VL2cPONqxkLQ2PC+d5Fqqv2t38/pcdyYoAE7ewqP05uSNussRKbfGbsaPHCYyMCQXr1hOSu15MJqaaR1S2+eD884D3/lgcDkoge9c4op+YwB1/PN9SugQ36kx9m0gdnjffvA1tcJ03q/XDsydatl289zIQihIZPj1hwSO1VuufeTxAG0FN84w7I8ujhUeRdo+/nCghF2U/1lQN+JMeuIgp7Lh5DefWsUSYusWCi+IWO6T6dP5xgxe0woRZFQD+s3qliUvn3idUT25roPTQuDGreBD98HNB4rCRS0CArkGQqQQeHiHWEZ3tHH1vhSD5Z/hN3742lmy1+aPxlCIFXkfF5+mIMYiFLZybMauGJe/OsEwRdMx/v9cMAq7EiPfkw5TdpI9xc5t84eQACLeH7PlwQ6go9N5w/QE1vec/UwAFK1C/OStAsG+5lwPBTYob8esdQuBHced8YokLar9L+cXlqKAjo334+nWP7gGkOndVX/axDaSBM240ad6wh9YEPH1zgDIgpd6Hh3z/ABk9h8gPzrBuaiDpQ+vGG5SrNWvr3j1tkOQQDi3rAd0AgEJy53v8Yg11VLfHr4yKEGnYb+gyWmlMVkD3VP7wIuKIzQP2H8YWNGCkk3GPm4xz0VIb6849AhatQWcgtfyZaU6gEVJSo4t+bcsD90AaN9tLJ6+JXwpTooWG9Lt8nrGeioHMLr5069d5pyiwg8NFhe/jibjXZCIb1d7+2NCEKzefQ0/UzV21COXVM0+8GgOHzffvrDeIEUcX8MvH94VgEBAnSNN5qTIIUIrODXePnegasdWK8Wd5duS4Do1AHPM55wbwWJfAnXNw6qiAc+8PNdUK2Oj8YwAGgFz53caa7iIS/sY8s7aL+U8byd6qCtdIm/2zkowsaTRH8gwBXJBl5AhGZufyFM1rXPH64UbQa0/ZzvLgsLGz7i4EmhUKJwItfrjrZICOfGJqpICAAE04Dfz5w6Gh5h+2XnjINnj4yGZgSmENjzycYdk5V6eu3GS8JFFhv3yYwCUhGF43jABImm73jWgdtdYoUSFQHeGWATYMNTuW89ODL6EFMI6NNH743IBs2ES5hdfprLSIPY6y6wG4da/bEYr6MuO8Q1H4wDEWzUT1jAn7MpzceS8TvO9xHmnc64cAh/t4+Q7S/GIe1U1BHfvKEmCCGmcCYfVydPKPhDycy8YgXTaVfzrJr97MGKtTROefDiGYjwC2a5NH2xBRJ7wWgTXyZOMZUjkpwMa+P/BXWII8uscBOc3FYJdKsC77woDrHoPWJsAjIm73h1LNVLjvSISPyYINHGu/pjIjYSKj59OLYeajlXl/nNkJ6bKnPp94KYneuMTgKScJilJ3vYw4pIa21ikFSGI0a9BMExqwIDhCiJ2wh9MS7QJP6SH1cSYIqC8v094w645uXYp6wh5lwXK0uIhteO9YkD6BK58Cuzf83Ft02g78rhVWBWj1wwq/sGKXxiUaYjYs1ka2DUyz51jSciNH7116xfZMqFe+9YTcNLINcaE+uBITKRr5W6wTHTkH1xsQOAkP1g+uFhRRAB86J+fvgtO0SRR60mPMSiIPOjrFpnA7VyOTl584om+op4ffzjB2VVQ21wCNV1Tzi2oAAxolHQnP94yTk5RDs5KOHYVA5v0w269V2vA/fKqQNqb3tvE6A5jfkaViawkCG+Y5AoDFm+hDR6xcOgioNNNxmvjACSoFGudcYhYQRsP745GiCMPKcd5cZE9jQ3fV8ucflVDVrw2E0t+cUNDWHNb0X3hiLdI02acPH+mIm6RI64Vr2M/TokiMQDpXmH7r4yR4CjKQCHw4Ql7VEh8b+2XYZ1MnreWQ2WgSqzUJfpjtGAJCPPkdeuD6i7srKPdOFxRpqtI8Bsv8YVnAPffWuyfPzhQaRBFaAile/i4DVaQZA+dzEac9IwB1Jvz9MN9COdvD0esI4KIEDm9x6+2XWBpZq/OKaQREG3jX2xhSJtpD6YaQcCrvjjzk+AJgiBS9XWTqXCas5+cAsTAV2q/rvnOdj2tLsEE6FuJydwEJxovmwwrqiMEPHGvs5pYrAmUb+541zl9u2TRxFgXjX1xvwvirdaBPrlZKlA38DonxiZBEtkLcF6qOQo+sMYHdblPHs+uc2lQBDgIH4yLCVoIv2YccMCyet45BYQn5imCSGrh7aS4ZLBGcePGro+xnMhBoUHWnd1+ON4RdRoIs1U1x+DxhRhlPHzymavYShBtdh+eJvDAUusa7JDT1CfFZIzps7x8STEg02unnj37yvjiKYpwsoI6mGAxqaxKfMX65UiV2neJMGkQyovHt3hlBVyD9j2nYfiYjQJVBC+fjGagXSN+mPLVcBpl7lprRGnSbscHaY00o81qnnvGjBETCANaJzLi01lCo6U0KM8I/fAOZi0VsF5N1J++MUxhVyM+jxeveM80mSthpyPq85xPHvrDHuZZ2XkQr4dk59aceV85G8b6xRzavY7LnV+mFVNglAaeXezxecYDijUXfHB4MGLFWh3wSC/p1rDVAuRM7EeR4ujEQLZQS0yd8O/TgTGASCAYqihojf9c0CEvb+PWNoYpdnkur1h5RUxPV76zUa6Y3OHyaxjouVgTfxs37w0qXuhTAlgVMgnrp1vv13gqFlCD9OvGT02Yp5XVNeesBq2lKMd7Mya9zYP3XD71kM0HmKZIBSI1/GXLNIQNVWFzaCUgqn9OGE3vnBK51QfVOcI9ArBvGYXQA97dOEQkREFOBy46BRWh+11j7sCDJ1LjAEGaEZnxKY9kSCU64EhcLpJCBFNVb4y976gX3t07mHBpOKnAJv49mWowAE8FPt7+ca22nORrZn4wFRFANRJDy7x1wmjoq702dX1g1PBIRNHZV1+7hwUbK2uyXRGmuD5X0udrbsvna/R5xSLEK0u1ce+cD1IosPGo2YvDDi+0aoYyDqgAN7OXJELZ782s3UCAl8+35w+nKpuzxSBj67lmEJudnrLhE4IDzqFxsOIZatiuk819yZJEZEHT9efWTsaBrFBLNqc9XBdMBKG3o9OVwnm1EB1o2vxgHRwWm7bEVxsxr5jKylQ5VV405puXgpD26V7y4IC0ALD2EPuZe788MqNE4defWHOslsc01B47zmVofYPr9cm2AhV1h7zaK2c/zljxyJdPe0bX7eMoGFEgnQyCn85M5ZQQ3ScGxTuYwKchnGA1Rbp36XCaAKus3ed7PzrWBGA0XgnMgYGa2bQ+6S5Zk44Pzz3hiS9b1fpjQgLydvXl+eMR3ALjbEdDmuvxjiJuV5xyAUICDhljEGkSmsRoTYxA/nHrNtiB8eMg7uIK+B4476wCkVIl/gn3+2CayKRAa5e3DgmoCg9+/jWMh52Cn5l3xjpQBKovz2ybKtBI9ePOLGMMoII0/3nNi7SjZLvAtzyWz6afzjrYRsKpHk0l9ZZpKAu36fjAzbIIA+/8AeKFSijYnHGj/AG8eBERRB2bgtSzvDZURSY+On1lgmBRr2PZRT1nLiQVdl7ryhvv3tZyhUfCWakp4xDU83ErXfr9OcXmBo2K5vaRvrIfYHDhqdAuv845cgQJTs8mJGG95DItUBPD11iiECHBevR3nnzQ6eg6zVZp5DVzcFFKDDXiDT75VOKbK6Nxx57PoRgwYTmrWxNHOveaa6W85oNZuHP0xwLiLNTrOWvXLv4wzTAJPq4Xp/GHyILyhqUSMhepYR4ccG5w94uo1Qx4xEk4zfXJh3Nh1Nhu6aEvlzkYFJo58ZxVxkeHTvmX+GfTGi9mPAQHipjaiOZIDohrrePVnIBHagT7dOjDaQQQWeuXjjDEAbSolTr7fRxbSkEQN70m/7wc7jFEvzzigIGLA9OtZPoxKtH86MTnKjF2q8/pgRYUYq/GHOiAh09W9cTNW+BgYMHRvf7YzpCgV0n1p8nnTK2gEg5njc+nswU5CxqvhrIzpKaOTeh/LCJysTBgLA8w/fCI4A9LZqD77xomyg9Qerp/rasClQ0l+a8Z5QN0H08ZIDJQA3zx+v4xiWBYRPprJuIAq/Hk+cpVCAgvg84pVDyVscaAk/NJv4xAgWNC740awotk3Cngx3oLQV8UH7fjOciBQ19dHzhCuOWLvXRjR1YSinFnD31idAAqQDnX1xuWT0iBA6kp7U8ZuBg2AArQOjaT24st+2Ch8+sRTolBvB5lO+sLRO1QjcfI/S4fOQsMc8eObP+YpvKnJdhNvrFgBQkHwIYNcQw0whrxpSF/jKl0YGPHl0/FwuSgVSP734zXGNFCvcusV8oMRnjRrLomAMM9zx9cJalIAXyacgwSBUCJ8KaxQFTV4L0S36z53jcpYko+YDzziroCPOGuQ3/eyOAcA25/RfeTQRCtQuljrl9a6xy2sM2cK2jdC+PWKRha0vra5v46pSe2qmA3isHXGvf2xBtbQoef84HGePYAunXExXQlpiKovGz9MQyGRIffG1QdjIOawgFYWH7YqYhRAROT1yP8AhiOkRE2tc8++cqao2Af9MfWECiqEda554+fLh+J6Rv8AuO1sSEfC8n1wWIe8k5DU/ONhGaCOeeWZE0xSHpo0L3PPrDt1UKAYeugdhcdvZQjYAESI8ITyxgE0kIY7nc94HgK+/B895UuPd3cQ069Ode+n64OlB3XFkrQIJ3aP+eMd5sVTH2fHzjLgoQtTYw2c6xECmo2jPuygOhQA3x/WHIoWsbOG+dY1AA1pX4yDBqgJXQ6Q9XD8HBJr2sVfjXzlekkKPwFK+3NfdGgd7Ky/7WIgkUNyz8awvROEbv64MlnKpDHVakYeHXnDgwck+ky98AkaM773knBoXhm2nsy77YGh8Zz8ZKW3Wdgnh1+cM2KwDoHc23XzhMwChC12Jye8cSbdGDx6wBNVCyQwog8ihOPWJmCAoj2IPHGHhagAnztV5d466LAqtDSI+f5wF9SE0Boa4qk+MGxuUCh8z8TEsxCuI4XoNNfHWNGRFF1s6zXOi6bgSoOUkf7ysxWVqD9DH+cCA5IWA9nkxugMaBRU1oPrN57bIouuDST2YXJYE1kSTSEh5L9W7zEdD+zLSzZxhtIDgGgUO+Edd5bzCB0gPh449YIoMMAy5+esQ7arLvUVYTX7YRvXQuMDCim5dXuYDkPkBVzapoHm8VwBQiqLNmxZ64+cIywRpqtOB1Nb+cY6syscloPk4fDk/MJDnbJSN3+cloo2oSgPjaPxk5zUZg8Ng+fXdxoqLIG+k18OCbDH6lJI/OErJI2hLwiK7n3mFTFSCZ8BPj1jAoVN0SvL/OA5Zao9fyKej9LOf2ljHhia36wUCYjIeHyW/wDctjPgpBPhVr6PnDg4xlhT13j26BAFILg4NYNRtDbWvld+MLom3euk8mjv8Yx7reKho8hcmuag16Vx8YZAnNEROK455mIdK2sI0waXWgPWudfOGhadg248zeNRDt0o9LzjJuNS2v07wScdD7Mt87+MosCjaN8+MrSCtETS0DXLhipAKwT7vNw/aeGif5yhDgQOwoi7+mJPlwCK2HXxMctVXI6wzQrADKLNoIC8v0MUEZ0gRS9Pb4PGF3UHZ03x7P7yTYILH4uRmkS7ChfL5yZohQJsE6Nce8mK9pQHyYW4TRCr1WCuzcAwffr3gyCpstf2w0b2gg/XlcmBLtGH6zKKbohu+YjXKa5RRfBeP0y2i1GonnE/F1ydE6E03e5jUQKKupG9R9r7x5VfME3zrnNmAcznnj9/vmrBwRIMF3ZHGAcQdUDjj1kUgvEkfl/XI67NAqH+4wiB7BL2+fOQDsAkX0Atnmu+h6EBY64/OK1UNPj3gjQ4Hd8+8iVUJVpAfscezGhMYtx7nD/uMYZHwBjw18JH/cKnpJovWXGConpln4AAHE49cZfuhAKclbXI7gjgYsowm1nt85f5khkWCBXbs9esooiaRTaJa3NTl840kduGrefZcbBJIdD7xCNm6ErhVtkAR9rz4wJLLiY40eXEIE5vJjd+Cm89fPrF2iFAon3ynRiImk/3eGYNHQvn1jFwnYHOTIAxKWrBlPo4J4nbYqYQEXS8F/fCEMost9+sGJYACb8/nC1bJVk9HTrneHRotPrjrj3mvCEGSpGd9Y3MJEQacesBqXVIUTFBg11nvJngwKhteFv6Yj2IFRA99Lz85vHmxjvZ54U+h4wdUFBbQ9e8VFYwVh6+MOxPrafrh0G3FiJ/OaKngC/XCgEZomfec5R55VVxzpLuhXInfxju9QFYfETTb2eMBeh2i3g5Etn69ALUwXJPz3gQuqsD2aofPrK603BnORhKTOKAt7NYYOQkoUAdISE6fCYm7KIRHfjofI5hEoAQgAEAY2OfHnFDycdkSHhwt9uUqUSgAQbJo684j6NirCB6CAHoz1rgDrEkSIkSfqesfg0G2DgPA6DW8toNCCrG/wCfpj2IgecQrZxPi+MKiCSgATpHRfZy9bEOG+Wmny/xgWLphCNfSkPPrC/90oDhAQefrkvGupSGyqki64r5cWqjalJ/t4FjFKxsHqo5ZsQWyr9zbp1kyrQJ7HfyTjLYM30hAnHr9M75LGny9MOSqgMfoK85O9+MPP8A3Yc+JCvOL5ed+jKlCjTV15/f64QcwRd+82Z6jpKvAwbOb7wfUAUMAHURF7TFRoUfM5+15XGL/Mk907feNtDos3sO3uYQKMpkAJ1DWIxBE7f1xihEuxN/hxUs9ujKwWRqE8OCBJup5zV3oo/rW8ORO0AH1wY0nIit3y4zs3mBMcpw0ml6OtZNrhQpD84KBCBBHxltvLNb64rLFVVO5PeNcK9vW0/bD6okm9effnHcABDXXnEAOrCR49/3gPXABegzQoDptXi5KVahOt+Q+OjXd0QHBIVNvAWy48oAqpBdcbMDlM+AAV4+cMk9hWzo1s437y+JAQFrk6OCdami/wAzeIrsGwNxBT5aafOL+cYqGnUr98EfyKTV+/0YgoQ2VHo94FHhrQPvvCUyU4kIW+S3fvBdVCgVZeffGM9V2Jwl5zcaPIJh9OWr4KFBq+9DiClPgQ+fjHzNJT2Gtl5MOu53TvnbWGckImobN8arfWDbAYhUOk10E9PnDgpAjXnGEVZpC48aL3I+dc/fD0FgYFaPPEPp3hEkLej7qc+v16MuFu1HDNfIpS4KUIowDjEjUUAfcxl6MFR+jhiQNkHTxuGbWIRNhdlmvnL2yo0D0V2m+MaEqAWA/Jl0gQQ1XgMJeC4GPpOMQd1ChhQvoogh49YIUhzVT/mWn71HP1jQ1xHIzcj5Bfy4wjVdAQXXjTjJSIoyfXK+0VNHzNu+blxYEsG9+bkZ07Fo+p8Y9UHIKPnjDobIaF7C/ZyHAAWAINbCfOPIQBU+o6MCAkLrZ4cnH294CkKBUhWThu+ePWapGgEk7ffGFyEo8n2wh4iqKDGH3m8pzgTMna9P4MQgdIMnj6ecqgo0Xz6fDhUogkF7Pjzhw2x0EDCJPkK4BCl8f1wFK8QaRjKchUpgAD7kfvnFEm2tfHcwQVVBCqb96Vfg8YParin74xJDYtTCVwgpo2lCvq+cKQFJFQa9VxglGLBdK3p0f4wNVqRvp1xyz5xBZgCQJ31hrIICQKt86d4dtEoTwfti9Ljyt4OWld739shEmnHRJDZiB5KaNPJ+cWQAIRf47++M+4QA1W2FT3f0y6hi769t/GHUGtvqLNWyYkcAAxA6uq5Y/QEHDd6P9vNeqWIh5OMaFaJUR1odfGHIOKCDbPb1rGAEoGI/XkwUt6U77Wa/TKFM7BpjujeEerAKHyFPvhSrEYh9ZHncY9OFhPJucRvc/WYEQEmAlamut2fwZTLpwt1/eCguzh284E8FAWvxhhovIA+nOEsjkJv3ccpMgIDrg3vjAhEBcJvF3gOSK8J6fe8kyQoaPHrC4ZpCl9vn5wq39iMuuNzEODBYfzrL+k1qO+ecZDyZofbIxHeIP74E601Zb4pzjl0kUC/ZMPYB0z/FMWvAUMb9Qxs/WNr65ji5V1zgHg4PrmpIYCZfRr7sI8kQzcHep6wQ2gI1EYL1w/bHIYXmaHmhOfXJcNlinSgbrhxq4mJbQBDzu/OK7t2UXH3MUOI7Uj6O8t9s7aQ+OuLjVILHoPFDeED3mKs5UFwphAkW4SCzsaH/AHrNQIIDGZMB0KIBGn1pv17x4UwMX+cKRgMUET98LRGhFNA+R9vmYwQ6tevWUGwdyDqfT1ivQC2zPA1RnR5y8CJlyvTi60e8VWNb3PTtcH7mwKeEeMEQTIFX16cpYi4qhXioD3ziLIw8Hm+QlWa87w50oSd6FJeG/wBMQ7a5rATD7hWlG8KNycUpHEH3hZ1hgBhwcPd5un65dNwvY4419smwgFh459YxH5UR9jh1ArArENoIiw/7lxn63nncw7OC4YtOfWFd3lApr1t/uccnICqhPRHWMAI4KpP6xhhnCGE/OCxbGiZmrFQCdDo9Y/MArJNhwPJz64wARShYfyYXhjSgMKwJaUk/3xjPkgUFDx6+dY1YbitH+946ggJk+N8ZwLLySOFpGyoU/s4lGPH+N5YoMqY/EwDDoagVON84SJp1hzAxRk6sN8G3+a3eqopM+2CJqWhKc+j+8mGcdp69YJqpVWqv74TENUmkuh5y+qoqg2TpKP1PeNHaA9PnXzhWyKQIHrCnieVcCETfXH8Yhdt8QzIZtulq+MAoQ+W/vhtwVAN/jNae4B3BEFgyutE9ibs4O+3YKTxHSljtNX6nnBCsaENG/wA43SBGmiHjAeSgAFveiH3x4ERYh84gKhVe5nhtvoUXyQg+vvdVDQqp6+M5XvLNffyx3FJhdjzHzk4Akiu36YDD8hUV8cP2xUICICHn/fjFczrUH2Ocr61Oo8zHhmyqGHBHjLqJMUJefxgdl9IkowYM1wfu5oIgAiMSgr6d/ODpCDcV78i4jMIiBz5/G/4x3/dI9Xs12Y7RrAHwtxPWVrAwFHzX3xiFwIFD98MaDLRz4usrsQ1XpZecZsNUCITWucSYTSq9OfeLGEUV2b18PeGkhj23TfhNYQbUQNrkO/TcLl6ghHq9/M+2AS+Qin37MpbAUGn184Mt61iJizpEmrLxlYIRSB/XrFT2EjPh8YdCd15v4xiEltb94bwSgW3DlIDg2/rFLHLCvzrHBIF4UexfGWcwCKaQ21/usa6aKETbuMxgVwIYqcev9xgcfCA2FQGtTxF3vFyVUZARiCQN3zODHEeAm8cvY2BfW2H1xf1yqIFG4b6DfxjUZRS7Hn065xCkMOoBvxWnr4yfWgCefY4uj1vnDiiAQHyjfLQmVxVKIW/44UlGGps36dTBQ0eAo3z6xHsGAL8PWFSFQfAMVQEaoAWXnWA2AIoY329YWPIKAjOOcI6mQIxrmIDavWHerbah14+B/OSahxeXFYgoLhfHxh9QFJDBwaD34/BHLIUXDp/2nHKQpQIRsUg87+MnfK6Uk38O/vggIktqNi1N847KakMSjiKls/QcWEkqrcaILeGIffrLV0hxpvboPOK0JU2UL0/Hs4x4mjRC/UOM3u7pVZ+DX6YiL5xIzzgyj0q0Od2cYlULJYf1nMS7gqfXAFWNpAJm+pDh0/fxmyx0Cbr555cANKgFzF2hIgoYWHzJcUGx9BkoAcbbmsKziRT9MYygoEi9/g+3rNlAtPJfnnGYRFQDP5waJHm45PE3hPHkxg1t8HP0x6UgBsTfI9PVxwVxgL7/AD6xSTCAGj9P0yIAuh/F84InUrQR8SaxCG1oKo/bLSEsTBFQWO83HCoKmvHzijkmQBEByzdHyeMWwO4I6FB4zZRBsJiw6DWM4FNQE8h5euXkxySg7CFKvBtJ3DnNBbiCyi8j3G7mBVyiTRH3S/XECOxsyJ0e6HeIGmD4xXC9l2uNUp+7htA1U2HDr0a9e8BVlFH8PfzidmNhCmo8H8GQ5BNAA+x6ydWO9os3rn3lyueIf3hoLkUHLjLiCUgL309YmKEScKfvm6Yhhhlne+XG1LaFJ8MwRlDaRCfW4io1V4J611gpwazcCxd1dZMDnKDPn4yfiIE4yccfHPxhd0iAlDrVuMFPgsh7xokMAX+BiGgFbBv385qj9AH27w+LpUGT1XVwDwYWRtnl7np5xAoObzjoLQ5Masdrr+81TmmEzh5HDrMgbW/UetesZm4XG8HY+pgXYFcjtnpf91uznTwzwvjG4kgKklyagBgSe/LiLK9rlfhJhN2+9dYdeKoIAcb+P4xKsRojEwq10fa+/Jxv9co4sBsCca5OH7ZCUhQI29f3i6aDW9mv+YjQXBsvx5fWVouVC68TLA7s/tO+EiEAzADB45xCoqPhem8Tsea4ATV4u8aLiDanRo6GAf8ABgJsH115+MUQTgJKqu4kDXvDG1aoUSwsHq+3xohpAQ90eUQ2zrLuxrFeYODQXx93YoKI6hEHTprW9kfcWBYL8veKyJyJ540Yd3oKG/udfnH3cxp1urMAbqIkDaOeb1w83CRF6SqvjrRr37yAEAxnUdnnm4iUphQCEX31/wBwmokoQ983jDgQCEOvV1fjBpxSME+375rIBQFLxennC5zaAK/EnjNwAiIg045Nd4hO2HGod9PGCqNgmlN+usNU6oTgIeHBKwp0PZc8T5+LiASoiSYlzS49vf8AvOFhpmCPkenUwQqjECG8vOGSJsG1Ig75Ja9Y3qq3AF066IeTBxWDAhoEIItO7xvEtDrg0lkqMP4xW20WdUgGlJeGzLoALObE00N1GvBhpkSE0DWGcug/fCybqSOgdq2f4w7YAiOMB51+uBbkzUD43x85uCwFgTtvXDPjiYxglRRFPrlKZCItvhmpGY1rxmgFPOWIx5YpkAOHBcJyOAFv2zceRRBhlWlQ0n85agTaq/Pzg3UORpm8BXseP9ME1qu48+84vei/phESjquDoJm4cYnUPuXCaAG0QIfviQqRjxnxjGSI2MJvjBwgnItwEHEqosWsjQS2+Z3jCjiAxf8AecrYkiJ/WbXhpCnLeBcEsKc/xhQHY2qnnGhtvGOVpx3s5dcS4gIsSkEdaFgtnOW/OA0iCfOsR6SFG7k13kUlSTCi29DXeQqvVewSwYIpvz7ypep0C3ZOjZiEgvtcqpC9G2IEUuhdDh9GEmAGPJwah32TI4yJTGIorZKNl9Y1IKgJI77vWT4aLYwyYmPOM59848oAJaifs42HaqSTm941EXagvjKpH0Ub8ecEQIUoT98uX2ISPGvbvAe2cGfvjGLSQB9fWQCyBGN8a5+c5apbtnraXC5j1IPgA34uSBepO+PeIaV6DGlMB5V86MVzaEkJy7ecsN2NOn1ecOhrW0r+Pxi0AAqp+nfxiuC7BofXY4Eq9SBU8Qsc1EU8VX6mSQ7RfUThzfdSGHhi794Fij0Gr4wMXQ53kCoJE7YnOsqmNBqIGvO/nBVAJDk3b75xwFI6DbnGxY0687/GEGyTBkIic4ShiFwaDyKT647dKWpsfLJrj4mGPw4boxupmhGPYIEvtzx6ciRpFKca/fLpKCLFV174PvlgflAVXmm8cQA7RT84gGBFDx+c2Ig4FXXY8Ypg915nl0TEs9sv0EWv9xhdQwQVd68tH2HDl2Csjm/q4fqenFBpfOvz5cAt6zFagD9X6d2b8h7qtKiN+a8UyguX5OBqCCI8Y/iJFFMHgy78PJjPbgYMOm8cP2cPtYQoPUw7aVQc1uxB/nGEglRBUa9mSTQe6RuJ0mJDYHfVyshICFMOoC1BXfrngxySh2bHZu94JRaWL7B5wkgHAq3X119zjAUyLKKHvCuekbZbqiOcXQAcTxrjGLPcN9C7camTtaq2Tjr9cXMYQZnxjwoIgIpz744uJlLOKiu5CU3eTiYu3KBqNNb63z844QlKqovzz/zjGGQRKTdI6JiEhHtr4xqbC1Ai6NBBtwxcRWwbyPbxv9Mc7ltQGHO9d8YCdDQE6fOztjvmCjyIgIaPuHjOQBkxLYj+uSZjEMDXXjL2yqoi+8e+KoiBo1xzfvm7OUVOU+mQwpCqnTMbdxC/VvThhbwgDnAsjPWa5Q7AcLxLrgnvJHmaH9fWHBxYI+HDCRTBJhQInAp+O8rSL1CeYmTtRgynfPrEsRXQf+4HllKtawimTtEH6Jjcfc0f5w0BDyCJi99CKn+3iRtOBxf4wiDDso+msLEanA3xvnHNH5U0Pp1kU4R23GULd2qGa464I+vvCpPo0Q8zhy6Tuo9mNGGjGk6Du4kEqSxs6HL1f5wXeRIWmkzjfnArUqby9fkJb48OFZlAFDz4CP8AWNntidJFXwccb9uESQFBwAWRhx1iTy1S1EOzkXfrxs3pXCT+DMdlnJR9E2cIxLAWR60vWNDED7qdvDCTUx7TLskvOjjC5BoSn0wvWTRgX2Dt+cgqvEKAGElFUdZ5XxjJAO5QetcfGGBFkCx9AeC4suMgJ7uPFB5AA/TB9D2RfEesXkASI350bxIBe4NHrfP5xJSIouj9Un5xHovucuWuSUjhBmmAqe+ExQqNeo7jz8YbvqR0f05wsZAbr4NP31hbYBbY68d7x5YzjaPvr4xKeWir84sNYhInxclPTYn7Bcu3MqUD5oQ94eKaVfh1+ucxeBMaeh/LvAK2G71zgoWwC10YqFKwntXg0H0Zo5iyGglE0muf1yrbDQtBePjCFpTXzlsG6nxxiUGEWQdmMDTcJ26MDRWjXU1kqspKS+eB2TN0X5X19zHpamyT7G8Cgp2Svc11zhmKLRXy8jowBnIARUO/1xdesAD3o4y5JQ3qr59Yt2S6CcYb01FcfgWGbSuJz9N3h3f1EheCcffBDfpFEvl8mW5zUUXiDh7zbyjaQvc4O8pJKKDV96xjOnCwNn2ynIggp/veFsSBBGz747O6EkEln6uNHO8KPWgiLzK6fpzjhn3EhXTE3iinfAE9Oxrx1jUGxtZN6Nb5PxxklSAQIKdv6/XrDEAPIHLz2YPEWFitGtOuL9+c2JUiCHnn5xrkGIuKWfq4zOyhAH1445xCsxoBHkT/AH0wkpFChTf6e8GpwNoL7nTKa+oJvB088X/mGh1Q4fxhozUkRfceDWRsTSo89psdc5RDKQBPHG/nIUU1sgKaDr5mFyAu6X4dGai8BFLo9sSjgQgV+AVfrha1BtRTeo/c/TGzrqoHZteJzXOkrYVNqNvAHnnCyrKbcji6yrXOJ0sX34xkSialjT3yYWYOqn9znB7M2EEfMe8QIwIErZxrCRQOEn6Lk3VOw1xwK6NGB9MV0Kird/PeGLpaQQy964oTFpk2qC44q3iAuuV+v/c1voia+j4xUdCoYUdwSk+MoIc3T21idEkgNhhviTbpfjrGzSbgXF8MLELg0QQ3Af8AcGwJGU+vvH7DOA+7H25im4b5n7Y80S6KD7ZdCjNVhcWXcbBExdNptaJirbrxhAFF1OcG1GwpX+HnC+WPxpCac3zgILtSAV8f9xYsKEKA0vhvGGbJWai/rgiFDSY/hYEqdvIgPswyirBAj6ozFex1p++M+Lgnl5nzld4RGRIN2GprG31gYPAWAhvnj64gUFhHXklON++s1IOWy96k+MasbAAEvMOPly5wVXg+fBhQanAQc1YHZ84aMCqxmuD+MGankJ++CRU3Yo+1uCtMeFMfo5LYUdgff1jciaip9OcYLM0mwwpMNpunxCY22VhSfff2w81GAC5x7acAUY3kQJhpEB57cCS0NALXJgasrx85YgeQBPW+cka0m9mIFYIKtE49HUyH+omH3Y3jcTqqRV+uaFhSHyrTmNuWcClQRl5ctSxQBHS8B6/rDjygMDgvjTPWAgA0Jbw6uFrQ3rfe8tFXVrsf6xgC0Qng+2ayG9c4gSaRBf0zcLdfzg0FADsqdT735xr+gkKbRqd/j3gw2ykFA6lBiM6+mQAKBB8tS/OSEwIEwnjvj/mC0cUoLPqON/3miOABib3Po/bL7sQ1uN594f2CAhuI65ecAxylKU894al+n1Dy+XBBZVaH3rdx+Fefqj9OLIYRaF8scZCHZ03i3SEenB45i9jx7/Gay8imP2MOVlO0/rX7Y7JEXnsDYR4ffjBsgyMNp4HGAiIBi3t5jgtqW6q3zj6Hscnv8YaL3IY6AK3RfnEr1jAbfw+uDQylSn174wqbVEP33jJKmh1P4+MXRHRdVfth8JFr+MEnc0IGGaoIIo28+cVZCribx9hn64wLTpoQ77ez7+slz1RYPutykbECHc4ytrggKUGpPk+mb76hBTW5yOMsciIgPIvDxvKN6dP03Jdh4n1y2wgpLXrng1gUgqqQR4TyAd/pg9ttN0hr03f/AHHrKKAJCfDnDgY0iNDSwNIHn01wUwIBS6fsmJsKDJRcESt0kwjsW4WR5/XHS9Ws0uzS9G/jD4nCk1Py94masDYg+BwKwhy1J4+cRRYgqCznZ+MEiDyjfnJyUBRIPjEQcKIBD6GucfPZkK/G8AgoRqpgoWtoxMtCLpFjCljIqi/PnHsxOCL9+zHQMNUUScd5ADF2jd+canFAJ3h6uuqp/vHGjMUOLIokDaPeBaAbVSeuMekQVF9P8YNUA0cpk6URB+vBgLS8oVxkq6UDDgFwqBfeOkZzRht5yeGg09axQU2AF1zgzWFAF/nFnXSlU356++XauLL9/wAZ1ExCce2we9c4YAhRUvzzjOngRj/OTg61Wv51gUxiKk8Hj5waonZuM5d+AUGBowVUT13xhFBLUBFPHpwkMDVB/fzjBitor63x85eEXs85EGXcKv2uH4o6f5M3Ek7NX5+cMBAgJR9TCZBF00++Elq9Eg84aIiX3Pecx7ava5eEmtkD37cFJgqoBjU8iihfG5iO7BEg4/1zxBs1xcBNULIH/TANAUiFygHVWGcstMFAy8QT3s4ygahIKp2TIVAcV0mGZW8BAxGY0Uaunad8uN5SBVmr495JtzbRCz4WfbI9wiEpBZ+rCVCgYjUNnyGBfpGnQSnrzjtdOkDqn34y2q07a78e8bsEUMimv4x0CmvAVwEoUhdGWJWAqqYZwtMBRkF7g5L04B0z9fOMPlQKVdfl/GEUuxCt8b6eOzKYBLolh755+ckVIYC0nwm3/CRS1LDwp4XXyfWvsdBcb/O8DGgJSG9e3DzuwCNfHUyUtaVpPF8escUaxftxvAVCpEXtXh94Ui5p7nqZozbVVCeW8YeNFUh1OfjDh1w/HgMI1x7Aa64d4BgDAJAz1yfrkcK3zjoRFwW0tDRMR6i8vnIDGsMYXHl2a+cPkwQNBlQNOggj/GQ7NQITeDSHyB6PvvDkDSaCGGpGAlRZDhe7rD6AkKQi/PjLAoEKRur8YQXiaYj65x6MIUAGmrEPm4ZDoMmNb9czBQeoMAeM8QlUcezjBKINiGWgaB/7hIiHZ1OnsGRRAONz29uucDaEaSiPj+sd4k5sRp9neJa5QZL8fXG0MCIVXf4fRjseksRQAL4N2840voBrgT5NZe6a0TczygRBuY2JMkPr7yF4bkV8uOVTtoBMNTDlCOMPnQAJPeEwnGMx+6YcQB2Y19mVw8ypWffBosaEn/GKt2i/9jCKH4AH25zUV5tXA6lBi0X4/ONGGqqgfv8AOG2TULt/7hkJIMDlj5AJcIpNa7H7YcMG0J8N8vvIRAYyp+GsXQR1RHzhAM2hBPGOGgmqMTE9aDU/fDtEdoaxMSIzh3iIqHhRjMLTEmvnNkXgiPr3itNRwcrixDnZ/mN8esAAAxIAffGJG4IRPpyYieBIYHvNqFdq3/bmzMfPA/OEUq8AxwQtpLZ+uP6Iu7v1yuLwF3AC/Vsw4yec19e87LzYrjBR5ASfBi4wVCPswnK4PDFCWhHSzx7zo7okzUNkqGn+MIHFldUzQNhaRH86woQlsjE+/n1huALYg7cYugCGrd/GNUwQIGT3gxwBIYbxegOFS/ziKH8g+o13lVMWBvMMkEUQBx4RzUWH1cC0BtSzHmVH6P5y4NS65wgoEey/XjJgvkRfxcPOB0gb8esNgPCxD64OKaLVhd/PjFIWTMVnPxs++NhAghg1TbP2cUPFI3o3bh2IpYoO/v0/XuY4qNUovt98dJVWCnrf3x4uqOY8eMOH7VaA408UkdJjk0IA+9Nn5uMY50Xn6ZIC4oEuDjUHSTo8ZqBLv5w0gJWkbA9cVfA+TFp12PXXwwA6UOOjDokMBLxx8YmiRUjOeO6/GudxsiEiAnfM8H644AEQcOed7wbjwgaO+NcvD1jYCNVIPB5xXYBKqPzgCQrTUaTGgQF2AftiBIiRD6XnvEgdGhWmr2zU/gwYLgXgLhy+7FPPBMIGBrsPk7yM1OA2mFGKOkTeLjHuC6wRcVlQODnNhQGOzjmX37wD1CdN9esabzjovjDhCvFMDxMsyHSEBjK0B0c3KEN8clxyJ4GmIexqChbcDoNshHye94WUQEmWvEvneURhYiEby+TnX+dAELoB69ZKBglLfjrGTzjEBRpv56ymJhoVrDeIkCNSI/uZJoYYQX+cZA4CLSHB+cNRrbCLr095Q6piBd/4XWGQEQshN/AeceiHpLC+UL356zX03Xv37+c4sSxomXQFah7o+D3grUipzKnJw+nHastZB9fOGhY6YE8YUcDahPWIq1zH6DLtW6WZepyXa+p1gnSp2I7/AJy+EnVWg/ODSBtjJ+2OEQdduEIER1J6mPbkqJi7YkiHEqZNPFwxoewT/mJ4CSsU9YxUvkI/3jlQGh3gXHm0jt8fGACUrS+03iJWi2pHn7O8BkHHsceQQrIwxbRDhZjL9pqvNze5CAIPn3hJCLU1f0cSlItFfTrnvKNJt5jz7MeqQEW1qHY6u87+2Ck/UfSYRAA52Rz8ZdqUJAYonhSpfHz6yuUSgId36+sD47tJ0bnXjHcgrznGGj4/GAQivsudcThbfXxjWV+2SaB7pftklIHaUPtjDKJlGjh4b+PeHJPMgf1xjbA6HHM4/OJR6pqRv0MZmjLovr3hUJCRdfjeNoBdjH7hgsO7RTrFkFawTjjXOCGYCCH0c6xhQ8R+vj749UppO8agaQ5T48YtTrotb/OMBfPEfj3k8CkHz1DDsGVEpeeDXWJrHhpM++NFzqiH04cMED7QfnBZH31PPi4fFTaxH0eckJs2EFnN6+2bqbRVpufj8Y84G6QU2/PvGZ8Vbb4MkemJbPkw3J0Wj3fGca2oGcdXnk3k8ov5xr5oqLio0eCcMTkOW4hA61DeMAdeQ1da/OS65NiuuL1geTSkKQLPvv8AXcc8pA4Ovxh7sPWTtr1JgmEZrt+MLKIGQTs+MgXCjLSZyxZ7yaFoEL16w+YlSQA78ecWtLU/SAlbwtxiJoEPF4xIaOX0YdsIZCJAA8YbUR5XeAKGB12whMHyAE/mLliFd1vEsmmwgOHBTVRcLAgLCZhapURerH8mFNHuAMbwy1AXFBEeO2cevnIVlECUOz2+/XvFsQrB2fUwzDJiK5qm9vH/ADCq8rRPjFTQp54PeKw+h4xHW2JRfjAbEOFpP5x1UGgvXmK5NKiUwvN6f7x1JTRhYavbgyHsSKJhgV9tA+vDgKAa0KX5wT6fNRma+Tt+nnSeYdHE4+MY0BNgt0Dt3rEbCiiO7SLoTpGd4CNCxc/ICh5fBlO3icpePjIY2Cro2b996wG7hWBsDPEs9GE4iUO3ta3fr7w96PLLZoebPjEc4uJTpanHB+cJHKCi8I+Pn+cmCGQj63vCNG7E1mimt0g9p385uqkxgBvL4wibyR3HHnn9fGCbfIOh9sVgc4BA/bHuIFB1jIGGzlyVISxAP7/nHBCpUQp6fGDqpPA/9xkp2mqH9YGdjQP5NOO0DioTHgDQqRP6wAguXDXh++FYRmtlN/GMUC2ijjvxeM+fOIa7nYsxLA9MifnHfhgcH7YOvfKv+479QJVDyrn7uL+xUtPx89/OOSlKmz/BiIEAIi+C+OPtgMoGMgjzfMmskI1RnWnR6yQqqz8DZzxl8i7RAU4xsKFNQtHJ+NfGDW4BK37vTvN2lxDfO1zZyGNED54MUV1sV9MAF+ygAfnGxBtKVLz++VntgWP0TKbeOQfy7c+vVB8eGJVRYp/TBxcPSx+N4UYxpSvjFZJm1C/nEil0iDq4UsEdA3MGC8NrA/vKS3ApoHn0ZceyNIfxjKLtEnxjQBOR2cALpLvBqgrZZcOFWRLPfJwfzkBj9B6x4L/ZD9sewSGpfZwKlAVU8YWTDEsg/wAvL9cvgRBC8ePOFyYUq0Xkf7rDCJoLH53hYKNgEk4HW7PR4xsKVSSrvoO56xGQB0tOJaOcfy1ysN3ick16n65qqwJQrS615xplrrnm9Ct6eAoRpNq+MPaJ4gr/AIxLSm1LPeP9rXm/B494zEoKC98b5xERXRQSz1Lf9rCU6ihlwQwF51ecER2fOba1idjm4vSUNjv/AH1zeeEFKfLOfnEYBFgBrjj84JRooAq+6b98mtSsO/KfGHwkxYbYXvrEBDoYP9P3+uaUnIbC4UsDZJXOJIFE/DDroQghD4cm8YO6ectlAtHFyakQUceQU5MQNoIGVT9Tj083TBzgARf7ze4XRmbP+9YsXdrLQ9zrDb0NLZrr/e8STQKuA33zikOBAR+LK4ukAVbL/Djq3kipR74pmrE6S/UwjeiQSr8/XJBaxHZ+TjLVqNJ+UcnrA6lGIabw6a4B2k4bHB7BEWYnXkdaxNJQCV0/JhYDEkGxo8ym/PrKqi8AgH5feRBSapv1w0gL72E3+Pxj7p1av6CfYPOEZRexGz+eH74YWsJPIPB/GDIEIBCr69uDtjpcgDR8AfdwmC6WR3h2wJNloektw0BCMUqJvMAuLaLCQhRDvi337wEYUwUD1hCsbXYvcc0Om1Q/bjn74ParTId8/wBYXFkAK05hy95TrK5R4vXzMCJtgD913jcDhSBfXrAQrAA04b8/OFlRAZF/Yx8ylCxW8eeL9sQAJaRBzhG6ccnjAYOu9mGHCaOzSek6cO7D2OnNUZIyC4IE4sHRf5xKCJotbm7R7sxOgKQGybXl4xOiCVFL/vOQOkdBv/eNJsl2BMCmyd94bLrnnK7Icg97wiYSKOc9Ajp/1MKsN10BJUGJTWPcLaM07UqSfU+tWhoEJ2Tg1JbsxRTQAqTtwlD0ecIuvJfCqRRefRjejANizpRBXjA2VUYFfpiohLFbMcGFol58/wB5RXgqojCUANPeIoYg0Jxzh0V2p284zU1ERj5OHdn7Yb1A07Lh8FxFA95BBfRccFB2sbxc/VsuH9MXMINiPrBcaiAxfYMXhjVSl1zk4JwxE801nF6JQ/C3F22ukh+d4ygsot0xFc1oALkBuFxEkI8p1iB1JI8uWxv+cTHWbAr84loLuImQEXXGnAKRRQWCU0nPP64odHW7f1xQpCyZD0Uaj9PdxqmoHFH2W/7rKMZNKp61rKIDsCD1W3FdRThN+utYLlEDoHGDuAHYY9nkxvkcLAHjeGZIpmp3vr17w3pIEY8OPxhtMctteQm3GJidgXmJ6j85vi0OivBgNgTmusdUDimm4nUHKrvxlZGDpvQdnvxhMYNEXQcij5xK1MEqedcOF3yIKL59YXaSiMLoDrnjNVpwWxhcN9Q4UfSAEw/boQjjmUpiOmK641TxRIgOHeub9vOTssGID8vPeOSSJ5p/riGSoiK4C9R0wH84P24IOVTWaqGFe+B87XePUhFBKi8RXHUwRQBv5H4yWCRaodkNHx6wChQlhDuUdO+P0wLYUFov4X64goaVpS++Hj/GCJBXw+vjOx7B1D/usR/F6WbikBDiIPs7zVSHt9zjOiNyH64GIEe8SWp1ODNw6kQFm31jzgLUQ9HvKdjGMh4y61Ve/wBcp6gE+F5xIRVYe7v9vvhRBaSp8f8AMJmq/n/TCgShT2fz+mKwBtVL6HcO8SclHU0D18SYFSwtmls9nj/mRW9MRePXrIFpKYoK9RAp7wTa05sGLx0ayX2KH7PAc/3nSjypTj7sSYJKKa+veJHRbop4OkWfGaa9wCQsQHiO/wBsZSGvOnn3xjvWLqU/3hwYeBbqn98fC2lO30ect2Ds5cdhsBGL1w7fXvBAu8Lt9/GfCqflJMcpAgiRyk8iS6/jOQpzsuUaK++cAAdVbgFN2sHXD7xWQJrf+3kIqcwcORdOgo4+3IWksalbUsnxhkUl2TDlSoPPLhmog5c38N4PCUhCJtDzjjPjCBGsdrXn4w5zT4FYdND6nGAxlQRtn0r9+8YIIRHeneUlXObpApKGqd6ZfjBSCKDiSX41MWCpRbj87p6xwsKjkwOxaAPPz/OAOFQ3zwjW7u6fjNcoK7Axxak0zYYsB31Ji6V77eMZTa2QB3hQSWxhPtrI1fNLq/VwuSKAqPHrGKm2jMNpZoGD75JmO4hQ8XvKOJRVH5M0ZIdjRMQWo3TZPGaIyAV0GIKw+bjNGBCx9eP9xm0TwzWFaKsRwAUnKH19/GPIy1WPx7xyC0taWcxt+PeKaSPJZ694CKMgU4ziswV1NhztdvRnljClTe0T3+m851xoJV6muvE4+p0MUUWmvhf7y+CoqOwpx8YjTHZw4bQsDRnO9fE+uT4NiBIDtINevecQiO0Y/OFGgRaImn85u0soUIeJ3juj0lPBvOvQwRE1+cQkCQl8QwMgu4Dimh5h16yyCBwLIqR6G8/jHKJDUIOvLVcall9YqGAN06xQQIKFbzD5lwuZXwrPrMBwhNFA/piiT4r9YTAwLx/lwmZ0bhpzLovWGqUFVMNrSPqdezE0Y0IRWc/G8AVoRbaN+3vDKCj17x2rHtc18Ih8FxstEJrE8kbv9OeiADjao7nfHnAw4UlC+DjElBTaCLXO8OyGzj1x85Ea7Fi/bC9nC0B5ed+MHic2IUDGwJr2b95qCKwAWvHz6xq8IgnqdZukHgl/eGUjIIDbrjRtxFawVxWxEFW6TjGY5oEIjoY8PPzixYESiLw9X/TLbZHrAe5a5Zm6AxXiu3FkIFSm35fWUhxqIQD5xITW1FvPHzi19vS8t74+NesORtQ1kYrEJA1/t4goJaPYeMdKy7Zo9ZTFCrqpTR5d/jLcNCAUABHOg3g0JqgUe/f+4xFPOkCm3wTBu6qSUsO+yevrilSoSBXrdDvDloauj+3xi0TggaCL5m/v1i9cBEqDR+7iZIKEN4hoypgf64zi0Ar25ON5EMVbXuHHjBdzilP4GBDlwET1rnzhJaLAnXnC+BadDjvZvK3/AFx14wUFxWzvlesTgyO979YELn7hbgAHBibfvlAKkKHqeOvt7y9Q7IxDk7bNfrlYgeT9sd0AQcR7HrAgg4BR/nKTXBSCG8e3GZI8InrGW0TxjsAZrBAYhcONL+Zmg+BXVt01nyvXzl+uikVWb76w79YSQN2hQ3z7wzaIhB9kX7ZNPGJhMJQbEPXD98JFB2CP3cJEDdLEfrox+Re0BDxvU95yHWVavvRggmtKQH4xtBzdIfzvAUBoDS/jBquFa1w5YAC7ff8ATC50gW/trCwkPIFfvvAEuNgT5+MnyKoC0eMGKw0pWAtAWqP+TABmiJGusADeaYB4vnA8ROw1+LgYJaDOOYYbXdiT5esXhHgUw8XGZcWmc8fO8JAFWBH34cLOxB4veBGp4m8GqVfnIKNeMED3gXt/u8uzb1Q3m0yCWxSpXZrXesF1EDKQPH4x2vFKo6noluPSTRAg9rk04MlkKQ+pwY/dYPDPD4+MCRhsrWJdCGBWND1wcY7QRpUbNNwLLJwnqf1MGGDy4VqBY0J9Pvj2lhsm9qInf2+MEqKrUo7e6Y4BBwXLI227ttxyhGmdYcOmAFquueDnzgywAAEp9cVABQS+BxcKTDCNt/OMQKW4HZ65L84WJFpk+L19cSAUQb555AY5OJcY+OPzgUqchPhcfB5mIedIFXhkFN6fHWOkBhPO10y/VyTZTnxIhz8/vlsdoPgwLO72YQaRsqoOOhXMHRkyZpUM0w82acItrXzEPoCE9PnEdtBprCkutLG9njbjG6pJ1gZ3oXPxguwMS6vneSmhAKG3hlMYIJIlHw63jagOkQXGlHnFDdvNxeVbGL294/KotUPjyPeSpNjG5h77DV4fOGOFQoAIcWcqc+OrkmCjgLphPTvFyOjgh84AULTIRfM04xS0o7Zho3HZh4KHjuBzogIJ/FPWKpGQpnL4Hxv9jpWdioTSV3hmgaQUeVxVtdcayqeIKMaILhCpx+cPgzpV9+sEgLERObhI3OM38fOb5DJQF2v2d+sSSitJtRt8c+8IeqCPC+OsLtLw5wWwBtw+O8VY64An05x6DCBoxbQgglPj1hEZoAF93rDBVEp0jhL7Ijsn748u5uh14zUyhom/7MKCb1zM1sAbEQfjGQgyMGz4xxe6nRPjrBbwCAh/eOcjhNEwlUDSOTYCyETSeznLBy1foI/3xlfSnGpN8esm2Lzb9MSiFgcCqC1xbqnONN5zI/vgHHeEAKdt1MTqiSd+8FEMijX6zvu5IQlQvBTmWX+M0aNZVZSIunXowd5asEk5XfGUWY4NsEUThmJ9cptYasv0MYJqaMm+uVcRQtRUJ9uHsWQYMLeePea2OSoV4TyYA65Aijz2wMKSVLzhtKUhaa1xzsMRZlqREORPCf6ZQMVFUH54xQOG9gF5+cFDwlGwTROX5yuHoPE+HjAUcHQAP6x+aNpq+vWL8wOuHNkHZiuEt41rxhatfYMJwY8ukxaRXSu/84FsWUa5fj5w8SdGv6zjOL0vKn684RCCyG+sfLcKhPejHFaRqfQckzeYDQ4KNbyeJ/kg3RGAa9+cNiOAFF8OGY5UmeKHPEmTTQNUPzrvWOel1JUeODgyGlgaA5P44yxEd2mk1/tZtAI4VoZp5371jVGntyXcXar9v2wcWXIr3nHxeary/HOB3k41cB4p8BhCK9EuMOK6wjq8kQJ++KEarCJ0RV0/c4zz1o1A3setB6PMyZCyWXRG+6LXzgUEAQlGBbDi/X1k0KGq2vwOts5fqfGknfNPl5cZBpYOifv5+mIqUM3Rol46Pt4xOLbFsSX4OlzdyZn+/GRbwQ/H5Ozg+kc0NL2icL76+hjlY9MxUjPxZlKiry83INRiBV1Kd8BhNIQLtlrnnjFKY+7d2vXVziBNVs+TvBqSgV1yTp3/ALkcIMLFJ4wSk4EXh4EcEI6pyMTX4xRMCNRTzvZ85axicB41zyawiC1oTD9Y4gsWpQ59cZSgQVIYca2eP4yT7wEPaXn3iPjJAmznSz74hX+WfTGKADu8nKhm1pKJrg1JzrXkxwRKRyFXjZ3zgpKjRA3x7f7wuAnSo67GzSfbNgqIvkb/AF6/fGVNYkFd+phUOjB3j9MCSDxQ4juWAW+8OcL2aF9f5+mSrpTtQXEZgl0BvEKoxW/p6MMwAwtteL4+2Ua6lAI9+8tkxIlDOeFjd+i8YZSF1V1hMpC6cXlRuWOAO0AD51h6SpxTjIHvNyLi61iCOj37wwNXdwIIkLzL9MBpEkXQ/fCcSNVmOzhYNIYpHa0hvnHeAlEo+sXEq2u9/wAYTBDpSjxOsnvMj1hMJ1POcTrB9rXkEuw5OeM3VYpD4WRcIjdC6nx6wUajGonPvyeLzMuJD1l1tIBXxXjCepRKwHR8mPgQqAlCyb5NYhNYpGw/fHahKUvjFc7wN17wztSEJTT5Yz3MnCOlUjsOsHvy7Dg66uSw4ggnsu8r+F2QtnDrnpyrO5VmjU0JtPnDIoQjTeRw6f1y9qRpwDOer8XrL2miGiGktOZ8n1Iu3FxgeQ3g+75y7OyikbUbpT8YTLQacJBUSd9HO8cH4E7X/d6xaTCWg3zrX++MKkDE2V+x85MjBYjPJ2uJOj0fOEvV4dGX0tAW1MVbsFgm8QTyTuOAYnJ0Ba/tii7b6M4u3uYpGh7wPAic9mEtH5tPzjUhGavNyWgRga38ZEL3hRZ8eccebwAQyALLo5VfphF6c3QWJbH7Y1mNQwOdLEThtrx3dWjSWmuA0cBx++QqpN13Xttt9/TGa8CiNO+w/Gs7bgx7OQQNfnINR3YD3xgIaLQtHy/rPBgEK7hunvF5oiCpuu1vz59bZm0DMfJ4y0JM26Bw7gHF5MRxzecqByvLk7uoRDh9MG9oqRA47dujbNc4iljy/T7J3vGkJ5UdY5JUeO8B0ZO8nCCcQG/PvHJSIUJ/zGtbr2lf5cltAEXdGPDrnOihAtb2/GSwFEAo+E8ZDoxki8o4Hn9e3bGNBR4kqxHvXQ53Lc4cb7OYHo9is8W9GFYFqNpU+dw+TNbVAEY/BmoUHW8WggTYzs/3gya1shUHJ74++W86nSFdhy1x+tMJBuilOthrWGlAtBb8Tn1nJdzsC8TrsmL1HS3WvGLsJ4W1xLQIuBmLW6lvD4fPzhmNQF7jHv76wUHCCIcQN4qmEpKNBynHjvDL+Rs0DUuue59MnNpASPNPu+MJo1caDZ1cqvpmFLBQtE30XkdrfxmpKLPFoIUPr74osg3Ua1KmpDADQgDE7ekK/wC4/sk4CP8AuWCQa0uuIpp4t1hB+qJEnEfjI5IAWVcePMJI/nD1iFRU+J3xxiBEYsU8+vjElNxhEHY6r/ucKVS2AJ8mAaBOWr/LgwsBaFr855+IXtI79da946lA3go46LTxXQYiXLu6HEpRSaJM1k2Ay05xBKN96yUdJ13hBVvrHRT2Y+Wgi7wNQNYnW5h2n4dZ9cjfeIMl2ov1xmYVsLP6w4A80Yma1HAQOQ7es2kdGoVu+1M+EwYZR14HxjS5eWs8+nfp9sN+NpWHGE9V2Dx55cMBcCQ8C8LR9segho0Z8aOFfmYw4KiDLTawmpJfGcHGDuOGFYjnNND6wr9sdPhJFtKu0FQ15yCSAEBPAE4POHYW4Eno9fXGZ8q3HeQ64uBLdqEBq/k++VUTCwiGzg3x6OZkhmkIT9OrzxjOejFSDp6ovLyOWuei8gbcghgmJR2QtpHUpz7yBBgrNkNSvv5xKS0nD1vGEwdMAX53lqWKoXxghg0YT7buN3ogC3wHHxiDwavLjHoLWEuHYAFimnKJpvxtxtJRlgJ59Y9sLpWD8YhtEaQB/eEzYWWQPg1xhqDsrox1oeETHJQzgOfWSJTs3rHiEClQv6PnIiMjhdm8aH0SDDesZbKlFH030z5xnyiKvmnM76x4hAVBco7rq/OU/vBCnBj0Onv5xnaQbJGj3dN6++B2JT8UFaLTf8YZsCU05Lvnj3htpq22fO34/GIkECQPXB8DG2g+HbkzCKenj1jOXiCI39MTecJaY4wWdkxnUQVqCa+Kv5wKolJwEXoRXzAwkOgABD/m8fgDCEGd/OsTCBXb3jlm8SkiC3DCJHq4kXueOHKzm4oFd8YERbJyXrt9awDSDLPt42n7i4d2xAoHih7JcGT+pfvikXGh+ihuyVpxH58YlFyEUHmHP+4xt+7AQH7h0oKV3jjLRNxBKAhPHnw40QClEHuZYlWghz49vrD2TiRfPc6PAF1cbQlRCdyu+G471eSWqByGu98GiHPPnGyr7ALOPnYz+MbHKaVQTtup13gfWmkZQBUeS9b8bAEglNIj7OeTJFNLp94QqdoB4nOXI3air36x2SYqgom+jzrCvbVVIZx+ct8AWRKnG+d8fOSEm4cgU8G3V8czHwLS2R2U2pzJXm4hgFGoK9UN8D9PWQQ00qAF5XRz5OMmyhLaAhr+sKy0CAhwGk0GphQbJD723WUQCBgL61dfGGhicWOjhO984diIwIjfPr5ysWGvSZwoiAiBvjXzhskrLKYgCQSe/eMDUvAqfXIThWm6MDpHZdJ9472Eq6Xxk3JpRqucABtpBxnOQuxP6ybQsXGN4u8ZxNoH6GOjQqm/TWT4coETDPtDNzDzhqnsxJlU0DTcSAF2Yp/OMwjNqAmNQgaQXzkwosEJ1icx4aQX37yWADppo94YVNNnS4w/t+kH6BT6njGE406h2enUyfoaPM4Ds6wze6MvaD8n8ZOwCmC7AkOv9rCMLRrpdwiTW8PfRQEaQkIN63x7x2IewLqh7M++GIAjOtpPxib31gucAZwVYsD74HmdqM2xrFXeCwJsoedDb84DAVLLSmMaAZAPA8mHQhgRfKnGX6rpRTWjlgJKkCSDQj08ZJxohHgCvjXGODnEgUSt9te9a46EtSOwigsvE/zjIVnF23QPPly2lUSB9+XBAJrBT1jwU8vof3PebYxRHRvO9zFIjT1t9ZAipfC54YHNcAwhAUVN7y3h9RoPnD0lltL6fDhyuTlw92uKdMAI/WY6sYAAQ/b5xx2gL2v5+csadtXvy8ZyQBefWXkbqmJ8PWFlotXHpZjttaIM+2/nBRAwRD5BvJFFSjMfbjHNGiNJ99uEydhpQnG3X/PGOR00ml8Tr74nUrVgUnIdfGcKQdknp3Gd4enxKIz7B8/bAvj8U1v8uOAsISLguqRE633+uEmyxKDyP7fpjdRAgAk0eSp9vGMbNZNOC9Zoo2dZQiJ0GCnvdfriRXkt0rXxsPvm+UCAHxv1xj9+vYFTFSdw84ZfGecWETSOnGebVHyecODoEUgmTD5AUTYNJXs1vnWGPPeei9+3vrHPkBwhAh66xQ2CjZMqa4ktFdOqsujsxPehoYMG9/fvGt8IIHHkC6ybQyoOB8I0a3wZzVsVmp5g2CfE7x2ya1Q+EExOVXVq9j9L694ZM+RHjgevOPCY3O0aBr5c7cQOLFdoCa4JqGCtY0QE6PHWD7cqapHpyW+jwZp5kFikA9xrfRhEsBKIH0c/j1iGcugJpzfP265wqFIbICnHrGseZBU2he+i/GHmfaQVmq94UJVAhySEoKaN8f3m1HaUg8byHFXxUug4eX7cYf3sXlR1rjzj/YQKC8Fw4TsEJMaA1VEE/ODFR0MTHYQaphMZB4hZF6/XeDCBbYA94Vre1ImFAiuyRhj6nNuMIrxCmbyobGriZdDTCe9YdQeaOcid9Nm4wWlaCC+MNkKlKJPjCqMgq0WD3CDe/OO+VWo43erlEf8ATAigUtNsEBAEEJ8ZfdLvx9Y51Bddf4yelxNPv7wqAdF8MRJXNH39PvFjMOOH6Y7BPCwj/GKIA7Po8TrEiIeB1gqCcC4RBZOBBDO/9HzhtKWBYiYENvZq3DyFQfWvYMaezwY9TsEg48JSfT3ltFA01O4bfjGDu6luVOS0wAqSFGEHbtu+uJqQ8semhHl2nzkiVGkAq9eDbhEQhbyuNcmHwOrCV+hvX36mMMgAiBWynD3m9jNqi11v5cnissCgx++WMabu2PzRCRpWobMC8YEUWUg9/BnNQcEldQ5qv1wmLrQXnh7xUB8ogDvaOde3xjqPQInmdHzicH8gqDvjfL/jSMxdmgwZIiLCu+VzYykEhJKHnk++LbDgDy/jFQPFGFMaJLy4B8e3DNqM4DqPp5+3vCTreeDBC7TaU+PH1wfYTVsDDo6khFeudGW4ZuNf1mFBZ4URh5gUihPjvApIqNuuP94wg8agSRpfHmfrvKjLsLK/fC2ocA3Ofb7fxiIIqCFH9/jEILV4h5nj3i2oqsj9DDkkSilvr1hxp7kD51AONZKrDSo3X+HrJyKWBSi9+MdJEnRQVJR3z8ec1PltR0SnyJx++O2kIGgJ+Mcmutq5bpC6Z3i30yF2K3E1pAFcn7fOWyG0WGXNDfOWRSv6ZoAOIKIRpgd9M7QbH6IONUUSNaLr1gFoYqDT3gWaCLhSLrbtjfKUXMb6AivkX+cKSpBZUaDR0dZNs6tXDoeXtweC0RIB8/j0o+MYaQ+8OLa9D8YR6QCaZzesaDai/Ny22qKxfHxldVCr9RPovycXLoCQEM2JwO6PWJHJqUqafHg/XGL2CJuc62GMyEopw75+McPAAaAuAqmxa75/XBYUQHYjkC5pPWS1CMfDMvKDEAq3U8ZbhkjB5PzyYAiM7lMKHutMEwXAC1ABJ6x7QF0XA8Ee90xCNdtIPi/tjKTKtq/ufrhHoqQFu18vWEORJ3nHif7nIwVoqhxqdGsDChqqHzOjJq5nZ1hengzZ/OAad0JjhroDpCCY6EZwR249mE2Edjb/ADlxJGUI94eAZF3/ALiWu2Vbt84VYLtyegK8ZY7U7sxyOwlBMWhR5k+PnNGSPCHeEIuhvDLSHgdsCRY4KE3i8kNINA8cY4MT6CP6YRgIRdF8esn4XihNfjHVNwCbDxiMZyAT/uHSCk33hnj9saUR4plZk5go4PWnptvzgLIhoHr+sAm4kZWYTHoFH2/GKRuQZrSexiPkMA150oRNroba8eHCKIZCXxsKWb76wLp8GpeYi/7xj1BAAIA8GOopkqpF37crIp2OxPfnzlgAbQovOvzlsoazUUPq7Pp6x4ZERLIT2LdfHOMoVMtSj24x0Ng0eZ8luFv4qB9O5X6vrLf5J6g7vkLzhUXy19ryrd/HjCDUiC0sdvrG3RRBaZNRxXJePXPvJwwqgE0+zkx3ICUQIDHZrCK0lpA8648ZAcwIKHwPPr3h8C6FA+HzjvrYqJXXy6vx4xzQ8BYh4LwY2iDa1ct6HQYTR471zi5KHgUv0dnvFBTeDB6xfzI86+FeMVvggwc/nDAtOUD6wzIvTQefRh6iB0oX3ludaO316wwhWCAvQry48rJAyO9s64w+cAA0PXzjcOWxbc1KtUBX5yMFLOG+Xzyaw+GRVEBa2rFd9uT9VAu0NO+N3FdUAHsT2hg2TqXhybV5PHed2LqFD+MOIIo0gXzFQnHOFzvTYb3T7XjjiYhVBXaBwNoHxrCDSA4ihOVUwgFsCBqYOgEbrx4xIsrABup1Oc1Ikg8uGckR0x59YWrnJuhOePrj9FRCCBefWGsUdGHy0aKjHfqun+MCICUTZLhCaejH1iFujFomIaukGwobHz7xdbcIehJCvLDE2XAfxTBVNBoq3ZUZOzPg7NTc+HJ/5Cewwhqxn1wTw8TDTgjV1cuyliX4nFnONLGQTN5jwe8AnAgHwmr897yytpTY+cuwA6iJd85ZQoPben7P+mMRVSG364VoDRDv5whNVtLXXPrjBtGRGx6/vOcUCpd3vHLQ2T9cepmDWpAS9SJ9PeIUC2Bcv23kHZ6i39Mi62m68u81JJtEXb/azqmuUie/X4xCjwoDvrFAMKiks/XEFNPnnFYqo09GIYpWoBvHCyxnQttjR++F6DwnH9ZRVkURs9YILpzDBIb1vBWi+VxyKHCJRxy7vYqf1hTClLVf4w3jfih/OAdX6Y3EIDC/fHDq8kTj1g26dCIZYqNJHhwtGAaQs+/6YagRAKz59YkKBSqbMoitHW8vdKxe8ntqcC0MUDVX38YCuj25IsvBXnFtNYbbtawA3sdzEESnpySCjgxyY4g38fHrHuqHzGVFU2uhln2F+uIIOsR69riDADmHzyBOfad5TG2QN2t8I5WjRhdskbJyqde8N2pFiw5HsxIlapfjOQcGCCcPGLtXQN+/7y7QE3s3nX5wpYIggU8e8h4gIca4cuQloCrW75w1qLUHdt3jGFFFQfD6a5+cDjW+XbFpCeDV9YY6Sl85XnWUiN/B61zhtzvjHthsh8490ZEPlv8Af74VEiHQic5f37tVP75KReQ35fb9ccBCgBX2fzjwdBI3eQm13noTtAT9tGMFoNpP325TUgXV0YTWJ4zYD4CUcc7S9AVc2M8u69esQZkrqg+2QMCjQfe+MEI8QEB9+feNtpKrtfeCKueypvucYssNEhu0TxxgCnONTJTXB6cdmiiAiOq8G+bigUCkydaI/OEXrwzPvk+pEFQHNcL0Y4MbRAQV1NLT494/Bu4Gs2AHwfrjGAb7qcVa8X6uS7yVoV/T3ndUOHfHKOOq6xdB83jHNzbSCDq9c/gwS8CWLrxbibQXQy4WQN2q43UlUbHn/THSK6qG8LzlJQQoU8HnGphSNS3lO8dmHg0rZ+chg4G14xCK1scLlF6G3GPQ8e3HVKVEK6rxxPti+VDXxXwOcanVQYBUvPM1vTrW1qCKjKcKOD05ON45TpIHkhV+eMQEgI4x2raKxfL7xGoBZsbE8m86PKhpyXIptz8YD5bvCjhPTePnCKMsC8t63I8ZOXXhjXPkOd/GOqBAEY7HpT+fGzX8i0Xd0H8d4L/poAgKji1385BACUCu+sjBbPMYIqZr5w6pPQyWRNJJMc+qA1sP845DXzNAp9V+cQdgajF+mSkYWzmYyVdeGFwzFEEOsfgoOEE+MFjBDTBMe3hUTh8fGFaUNqQ5+I+cvCa6xpP91kKc2qsPjCVBzdB9ZfzWhxH1jLsXrAN8F3NOHFh4yQhTzcFHwXGG36YUkwRxOIlzvAfDHbaHvTBhCalTLobeUrjei3vCbG+DvGCUPZmyAuhsXw+sTwikK/nDkghp25MWKAbcfHR5KJ6yAjec/O15+cAnfnOF7rdTv+PnIhIBFffvCp9VMP5cBQTboWB6wxvxPJlZ4ZAo3DiRNFadHl+fjDiuP0VnOGLSABah+2LBo0nM/rGWApJ6DvBvCqArlyPjLgVdHg8Yq8ZG7w4DnEIdefLjGjlw36zgHtp2ZB2btyRPGsYu8wHreBtEMidJ4xeesU0zFqXsmskQb1z6xoHx4x6BVmFADf7YQYhEa1z4OsYUfIHT98FiBCHfEffeX7TsJ9PXOOK5ooKGteuDCKkDN7H0xdECXhf3MsxAOg24TNtOCHTPpxlmkBVn4+c5bEc0uUgiugN4dQnLA/OPDAAR65ZY4W1Y2SnnWGR1VIPoYmGkLwAk51wYUIM6R6nJ5+uQB45AGFF73cBCBHf99E+/3y+aCqo3xvrC3Fd1U+b1nVqxqH8YOWq2W8a274/GKFS2GG9+8mrB7mslWqzb18YvQjJMHSjydZbVGFPg7oPPn3quOG+cujcfGPtFKWtau/nfxzlXSBQiOno1+XzhlzVQRBRDgbR9OLcY2p7VPubwu4E3O3HrzOcJiKwQNr69Zd4kpFBp52L+MYCgFnH3/jEYAT0SYcEo1cApzbHH1dlR69YGQtaobeXjJPjSoIfJ8T585ChjKpD88a9YrSITwnM4dS+8a2Em/wCdVb8YYcCgyuuhw75/XGAeiwpOj9sZB0KBzickTG2/nB/OFtS1QmxC3H8STPgNOGKsD/BUn5CA1G7NLy1hLAENbCBfFDfv3hENrz8ZoktbXQGS+CRerliAWPqY6UrMcGqbCqa1+Mcspk0IqnzVxvdPnvCU77HtwD7HRHTx+mNINaWnzrjE2jToN+MjXM4IylSSoBDzrHpIeQUcFtARl/riB21QBT4xRFKiAfz1mv3tBbPgO+sJ2NRA/GNuwPbufXN4qzhP9rGgpaIEDNWkDQNY3JTNDdw7IA7ByCfFd/GMEkdQuKSi8XKI0SiM3gUOnSrgUBrokx2QPFjktXdd4W5fEJkip7kGCiL7W5XBXqAwKgRmA61OA1nGH9CjhC+9AVnz05TUmy1s94oCNAYm1xXsF2gAfblxueFG1f2wSJnc4+uFQVTSJH+8A1WNbx/GVLGjg9+st6gcsL37w0LdWGjHRird+/zk7iQFO2/sYHqtbQBx+D/OHmIXFma1tw0e8V5mW94u3vDmYlwtddG/8fTAQAU1ced4mPvLcXw5Hf4x0YuN+U3+r9MZUNSiwJhwpNAFP+mAY34IibfBvCuAcIga78869e8XEztF7wfwkA5xyTraKPa8GGoubVj6/vD1Tuhr8HeAY0At2+8WxNqDr6GCWgrKX1csjx0OoX8day2p0IKX18ZactIUnpx1MJLcdsl+OPvgk6xMKX68a+cCQIKCUnD4c/1hq2QEABz64n2xAgAdgTLRFrPuPcxjyJ3unn+seyFEmhmSpBWFBOTIU4JIpXcLHVyfBwACj185xjoDtPMBvGHdiw3ZHi2vHxidCddMoqpx443NTBqEGKqScTq3szRNAIEokBQu13rvDFBIxlAUYcxZ+vZPf3fODQui694lTPh6HXr5yx8QFNjAequDGIIpUaXlUPr6wKCBWedp5Xc1miILwvbjYJXUwg1Tg6PHzhoQAirxjTaEiF1zj4lpoo74xkjCjTP9y3HacLspXHvi3LQxixV+PWAQoV5aX9GAFBRHgp2/jCSUYGc44DhwuSAK1dQ4q84Tt5NPaeW3gv4w+nhHbENcmuusOQIMZxB48b5zoaKWJ8knxnGcQRe77JhUGmjR+mDpj095ckqCi18YHcQgXnGgg0BCG3euXj13kdIlRo8GR3gwk6YneTbX6dzILbdQsoOI9mL0uQYLwLpcWVxgBb5xRF5tXdwPAPJOsUkDwMwKMm6Wh/XxhGWUikMj0O7O8C6AOgWfPzhCCB6ecbUUeI6xChweB1gB2Xnzmx2fXF9gnCXLmx2gMKSHpFk6CWm6YYCNIAmQiDoWJlkCHlFFzbOkUUHD8jlJE3z9seKXsWzAEUJVpmTmXkx5yB6dY0psOuckCHApMMFQweMnEQEEunCMgAo9YriCcGVAYuqAOFBAjt2uRCIGJyTbah/eNNUIIxMeXA67McuBrfORFDh3L79ese5QaHATJsRPGEhQYdY23ZVPeC8YyHjpxEgqBWc6wgXhTFvGTE1/5cPeHsYMPRdYyjhbrDBAKPn1h1QhieMP/Qi9QC60MncX7Yt0Doq+u8vQVaPD/fXFDECFRPHv4zX0eC65El7hi+48YINI1VX+cTEDYSR/3eEhdOVCvvDFCAjU5MAcpVa4+cJgKJTX61ziEUsFp1y6qYfMCG525FJOmPy7w7GNHaed44AuLibPHrj84UdnTJsc/n8Yt4M6Jp1gYAKQwBZd/QzQkPrjXSYAnJu3j+MaHNlsZhcgk96/ZyuuhZe/OGKQaFFn+cqysGF8jdOOB1TYeqbebjkoqImoEC7L3JrnenYcPSSmLINLfPBjPrwkaqnet8YTISadYx0LOcsXU4FQxqO+AkaPOgvzghQIFJuH98UEMiik/bLzhWtetcvvAULog2hVOR1T59ORCATwYmq694MznVLBycQvQgQ8e8ljmlC/1h8vIWB3x8YPWUgAJr86uPxSIdHrAG4bo4+cApAHYWuDwwGQr13iOOkQmqBwGh+mOw6VIB0Bz3kGVC9KJruUOZgJNwXPFV85bDQtBPUEx9zIVyo65odl8ZZQLVNmvyYw7yJVj8/OJ1idED5nn3kx2QDx8+zXGCaIJ0JaAh5c7x9zhW0LtBgu0e8SzgGyHuecRUECrqGvXWMjGLdsanQ0H1xuvs23E+fGw3684/VlBCb2a33kMKHZyfPvFyF7KqJ/frAUkXY2TzhKhYxQU+LiKQrKkfjGzvHRkm1fAX/ubgpTKcH0yBWm9mUwwUpu2wxaA18ZWMC+0ycDHtjgC/YMrSR0RPM85vNPAQmS21BE/X4wGtGvWdtagsMVVE984uArGy4YJlhunx3jwyvY46OePOzAoYy87MqFuQw1oFQAiYV1HSIp/OMKAJs/TJWqyVwFEHhNmCco9k8Y1CfhymjovrzhOBQ4XASpx3igyt28OBCwFV0evXzjAEBOjjjKMgBVmuOPnHYmuKct5wfbOwJxe/jNZSkJET/TNE0AfYpkUcCX1gqig71xijU3id5MS4VgFXgx1ySZeUj+DBWwASJjF2KYz6MecNf+X745RCR1Gc39sjxlk0H3fPHxkgpRQR4bX3x+OwMtQS68661nEZwTC+yYoQCRBuEm12QBhKUjOPLjIAu18YhtM4GDzt+uQIHLCq/OPxESlY+cqnf0xlUBUFNP+ua4mMZuOJghLtmIo13AfvhQFstYTz6yUQrYR9fthSgB3XjDQoLyJkTgoAK/185MEGwS+aj6wLSwFTw9R94iAqgE+a9Y0hOahu/ziyUAIJCe/wCcNBbARqfn+suwEbEG1bzhLc0iHfPPrBkcokAdaR5acMS0WSdonXFfeNAy2etUGHP0YDiGFAHndr3XDbiNl9W5gswCJOBuNtsKhZYiUrqfeYYQJgSgxB5a0/8AMiXSE2lObx/usD6eShEefT7xfM7/ACdvnx9HnFiKJ2KYRuHRrGMOkQ5dmvWKei1QNXGcqnT7yJpeJclt0buBDRlQJlZsIloQ5vPzhtDZvgfPxlkSxvs9YBUAKoBCPN6+fRlP4xjZyGxC6SHO7GqNlcv7sDKclFeJN/XBwQahFqceW9Oc+ZcXXgFNeWdZCDlxvA9VwbaBXzMtrbSuxr5yyCasFR/HBgAcoUkcpyv+4wywdQDMWSKgJL9cROn0nY1+DA/LD7j6XRv0cY2ChEgrEk1r49YxFHp5MKFgdppyErK86w1ix7Mjmh6MPP8AvggrrDUWzocKANLbC6/TGxNdEBcJQg71PnGpyMHgZECLqgBfGQCOblytAdhtXFV1hwi3CiYHCoH8ZcbraEv85OlzwjKKftEYFEo0I19cJw1tKOMEI03amKZVhnT6eHFDme0LhipteFxBUThiLjQtmwGMCDWUSYzVvhBycjQeBZlYbwEhrxjgg9I/XHKX7I2GEFYdlyI0G98OabQ0gOfGCZBKLY48wrrz8YW3hbAvnN7SSqJw41psUQLJ5eb+XOS9D1ij8A9YpkCJU3i65aZrydgDbH42n0ctxpJ+/rLcCpu4ScPjEtkwVCLcV3r5xQ/6wxEKPtOZ+MvwJIROEfc38OLLWQkdPZ8PJi6QLZV77Hxir85H59YNxWLEI+tY5XFcBOg7UA63uZX7oCQ3UefKb3LjxQO6kfmYpBsKQTwznN5DTABz9ZilEYUZfBTSfRwqyHRI+rijOQqiB8vGHQkixPp5wggBbAmLMsAPJZ+cKqkKk4aYRYkHl9cYgbAlErlzgiiJ98S3IgrDxrGApgLBy0c95C4Q3Om3Yfkx1JAiYENjKDaXZ2vrGihDfGsm+clUNfrh9nYVDWr6jAlriMaRu5vnnGiaiIUI8fb8YoBCA0EHekH1+mMLAYCaIajtF1waMAaiGCjdbJfnLVDaBdgvXGvb5cfkA3cm9M5r5uMRMgrsOdPvs+XDjirmR2nfBr9JsO4aoQfXGsLnIUJx311x5wwyIgo+Ow9Y0ChQtkSHt0K67IzDAyBOiQOnasnz1ilYitB9Y88TzilpAIUIzrmfT4xQ6Z9colVfxhsKJQUdb+2GY1FCRHeN4Is+QhrLhuKq8+8cSovzkmmmAswqyO6hcotRE3gcZCh5084aNL/Ia+4R6Q8uHMCNCc2n840CJyzxzHy/RhpPoo9SCfSjjwHQob4oHxg1+DjKdFytejrndNtqV5Tp+pHFL59Z1IwFZu/05RGhdGPuCqaE+d7y0AACR44L85uj7A4V/No84qBLoCnnrD6UI3YA/gfbDtggOwTsvnhntyWAJcbp1wuD9OsiQDnsx9EI1di4KEG9HWb5jAGbNyVMoWHWi7PplO4h+DNRqMP1LAai+A/nBQivuP8AZjAHPdi++95ZEGFRbHOIfgZkuYQ55w1UDDy0/DjuoN09YKbToR04uKHcdOagK5eJhXaHFYYQW4SYU0F+N4S4GRqxiQAZu4vBOcRB08chhdFIJQf7yzS90zGj6ZDL8JsV+yYbGfIcBN06o/XBmkGJE94MXgWoGfC/7nNGAUQU3+uWDgJWGt+vnLYJ6gSIPHiYN2EUDa8f1gUEB7Ex7XVNvWh1Anp+cOVg8nCesYoaYa5KoYnjCwX7c4qCl8swTz9CSD45x6ANFh52FPrh80X7fkSV+/nOftPDr1iE0o6lybv6O8VaF+escEUpDAM0b1oLmspqKQxW3g8ePjGVWxAQ8zr7uMrMQrR8+B6zTp4aRdLzhsaBuD48G3ICoCIwfeRBtYfrj5YSZuIxVRQ/vK8QzSh/nrKleD/cGPAQ7izGKwIEEei49dRN7hgElbVVwrDBUJ0a+esjTHkiY0DTUAXnWjeMTDYIfvC/OUPk12bfL7MMSQsV4PeARZbkV+vGEiYdqQ8nL9PHNxwokiiC3nZvTlvYSoA6TsOe8YTgR3wp3x/oYwjh1otWzT83CiAsN7z7bxvrOkB5449Zf3KImk09S72uSoRLDF2+fxc0JIYNnG6dGveVldGjX6GLotpxJs9/16xMakjsa36OMaxBBzwiVN6/jDIzm3Adcgb39PGPkMiRBm+jhvzLrJLIoOyc/wBGFhWiyCewdzECC1Gg3wesSWlAQjvIkqXvTip2UUGWn9Y2osLABjp/EfTmoePeMilNtpecmAK5MQUB0ODDaWjmO+Xwd5TCJQ9NJ01H9d4JoAkpDl2m7OPtgiFBgE5HlpwEZC0L2HQ8esofIiaNpwHX1y1/E1POTodxMUplQ7Dp88uPro84IAAIr5XFOJq0U2Ovv8Zo+BswIKV5w8COdEzVgTDZgaEojkHoCPzhNVkqQ/kAvWutl0ahQiTn2d3HNUB5Z9MI1B2cUx6Jp0H3xsOxN0xdUF1KOMQKRqK+TbesJC8SIh8Sd85p4cs5zWSJ4txoIDsgXGtEkENYVCAaE2OOone0yEhO7g9rrBrMpyDJV1OzGic+s+cyTxMFLZhJguPIb3jhCDmuGgKF18YygiMcCxu8IlQG/eAUoU9bMtQij3eM46O8iaw9BV7NOWF96HSYOjqVYH1xSxiE09L24flgoJNrwc19YFeaEsHD17/TC9TagAmt+ZM1T1uXf84RMIERjeg+nGJWAilin74fF2KzfxxjBaaWgPis3h2lZtP1y6Bd7ofQj98NuPKgn3Afo4koUgIH2MSaQBEPhn9xjtAgJfu6+mnJMbTEZ8O4+n0uOUROqJInINNOOe8Eoln7N5J4X8GA8aTXzgBCKU85LDsWVveNUpHF4MRjKE3d4VdlEFWE1xjBk8ip/OWR4H4xAWRAKKJ3jTjXnFUMOpgrrvzlyI6ryX840aGtMD0YthOB3+hh0LZUW/VxxPIj9TrDaryquD8E6bh7uHaT1hiw1B/N7wiCutxMa4MCkB3vrbhXElKQJ17xD2+ri/jZjsZApAB624jYHsBRd86N/j5yxJCwEvI6/wA7xBw07GcN17PgwmgBBQz+MUsm8bfJecbVAUtZGC5A3owgBMAHbQXb5tyQSIIkDh7PH1xYQdABabanNrrDmIQVJrrnfZrxqZzF+AETxvRw++cZNAokL/JxfIpIK6keLRb++N0qFQpDlzuz+MWpNNWQ6Dl5W+8aNmmRUFJ8n19XSy/FSlzPAy+3pwIMoKqbdHjrC6zRqjfLglzTH9UiqH1wpgMoGqJOYte1viMVdq81whwGfg/65WkUw/nKdoABODH3ReYW+8itDt18Oa1et5KwaQTGy0SiNoPrafT05FYZsCdhz9MhUADZO3IKTQnhym2yB0mPzqZBK8eKTj1lqCdGL6xRW0r983PK4LQOA9I5BwFdcYRRN57cqBz7wi6nG8amvIPGMwaIgoPXvCpFfCPhygojqdHTs1s8XCG2UjeivKCPI8OE0UiNUJvnYcsHmzAFkbvR/tUcuIcaV/jjCIaFLJAK7Dfo+NFCyjUR8ZoWVycmEliI02e/2yUiJLxrJlUN5FTCE0HNwDoX5zaQXyYXV7cmPIH3y0B384SrvBU1gBvjJOJ/fN5BXneImAK3xh7RvgXLFEzvTBIJTYFe3txde8iFxGHoDvFVttcQpxTEVk+s2FNYAXCBTmYgYlXnHhRNgJV+MUSgQ3RgmlTWz5Yj7AAF8wqmTlcGF2nHO/xh8ZJcN62m94wpN4193Hm4UOI3xrjGYCLXm4dAi0L9MAQhKBg+3z8YbG1q7IXn5wYWg0G+sLmuwa/i+T84rfVR49+/Nzd0k5uI7keEnp8c8/phm1DPY0j0vw+Lh4c6oReF47Pk9kd1ACqbr5k/GAKUIiV39VmNaLBYjCchJXryYEvJxko7wjGjRwjz6RD93l+2Q4EIIl9FcPmSjrfCOpvXrnHkO27uRIPLGDIgezA/nGgKDa8uOuFwdCGOs2Udjh84SQOBMGFffbJ+mBpgwZ/L+8ZCfzEuCkz2a/bA4NQAvy3kAGMJReiTDycEnCJDwbs3wZI1DgFMVa46Rf6xoU03xx78OGkMjAvguImK3QR1sennDyOzTt5Txnnpqif1PONk6sKKeDw4JYt4tv18YSsDlw88ezETxEwI+d9Yrd0kNEdIrFx/pIZQOjj2xJFI1pPPximSQcIypzzzOzLAmGEMUvh5j8esFwHYEe+I8pOcsUN2Wp6nb9fsR1QIbhrq7McNuwWhjrfy4Ms6kydn7z65sDd0DaP56xwBEDaEk994MKSYA1udY5ABtRnr1zziEW6OjuPA4u3HIBW6lHz33vEaAnWeKkPPr9sh/d9nr04eorUVmO6KdmhlkhqvvJDN8AvOOhi8kyxTQ4CUdflr2vjC0QF3qTnz41gP/Qmo07Gx3rj1kFAoEoc7k54/kwiUAb71ykTm5x5VLUGv2eM2ZD8YVNgZcoLUMNYcvrGCGxCWnfrpy6MdhAwqKGp+vLO9dGri2QoqC3HB+tGQPh85aC+9Z/nCjdEcrDCrMkgxNuhovsesf+u1IQUpCMTTPeLtYBtAXad3WbynREq60d8uIWiqE4b8PLjGN0Vdvz85HkS7HJnF2sWw5/GHqUOEv0w4EHuvzjqlJ8Bcs0PhZjmghv784q2rN6OKVQvExmIOnjeCio61vGRHpk6I8BcQJY+msTd6bbF8uEm+Sl/XjDpH4nWEhW/GjGb26XkyZC8BecPrP4wfOMnlhAEJU05QIF6hyZOJlQI94KxQcREz41HEUxcrwn84lIV7WY8IAQF1/WEHGhSk3x8YhsrAND/O8SIEmmmp/XvANiKkX+n1jUq7rzMNJAFJS879cZFyAIvvNEqi3nBCN2Gl9e3HCAO+Zh1Vt4v+mGRAV1z3Pfn6PnECF+CsHEWjYjqcT4imHKJo2sJo98H+MmxFCMVBr7lxqAjUylyTsBGmjYf05QAowb0aV4N2+B5y/RMPUHal9/XDghQzbi0AvHXHRgZXNDUxMldnF9e/jGogByKt8njzc1loBpnXvnBw2AxBT1h1OMK6P4whAA4DiZ3pmLvWPBhuuOQ04AM8fObivYBX+ciLX14wj3lUD+cRLJwhD53iNpPCV9bcZueKF3hMRmxv6HOFN8KBbHj35p/eIld1oGbCQBQB1Op4MEFAsGPjcxdGENoN9Xj4ygca8Amvt8/rjRTEio3Snrfjrqs3woQjK/OMxvkeQ1gpekCb7971cUyIWEW8Pl9Zp8E4NO1ey30YZjLlpJOVJ+tw+f7NIBVXp5L6PLjSUqWtoWvXYT+zUSvCj3fvWcSmqYi9fjjC8XyaXfOTSJmkLvHQIlGJfjzhQ6rTQj5+cBwQqJ7ejF4ooQIURc7DrX1xCNwWIdQ0ZVqiJI1VT75ufaYvt6xOBlba/h94x1Ru5PfvBBTfvJCKr7GJVNmbDiFHw0xlCA5CTn571jXdJplSOx3PtlTMAJF1sMJsIuOVykcBreBOQjet5qUg3aCQXo69ZVk4wVNtXh5fHgweEAMi72OKI68mNFsq5gB184/AqCoa9cON74vLG/zgKe03v+cIUBpoJhADZRmhmA8F7u8YO3xDDOVa+2DFBnZXRfTiYHHAGrJ0eX7deDHboATSHSeXeOmAUFB+PXxllD9PGcItEJ4/nALCElUGk8bOcChBcEYi8JzcXAh34uICS9aXFM6qKAXLlIHbz+cbqAG7TAKZsdkvbiVW+2khgKp8o2f9xxSWcCPrnOfuDCGtHwmBq2PUJjJoaoDDGO5xkzg+HFXIVMIA5qYMZiDtzXjrZhsRHGJIMT8YL2TxxnGlDxjhDk31irtfzgULg8bmBgR7ZJRYR26waotFR+MkEQlref4ws7xWe8J0P66xIVTS/phh2CW6x7nXXeU7PkzWaD41j6MREvUxq0QZ9McrqZxdd5FXau8ahBdr8ZYN8JrxcJOnCcWf6Y8Na5ER8vjDIAbdpfXnHKKDRO+cZUBuaL8+spceQ41+cXSUdGw8/wCucmRu8p+7hQKJKTG85TYiPnvjClT4aJ9cehONAQvF9LcSiUdkQmNKFCq2P7YFag+bigJdLCvr1hmgOQq419kinIsp4a+c+esQf2x+oPJEPth5X3D9BxhP2+T8cGVgbxAKfbLq6zY/8xWQ6AGleNaN+8TiRa5NYUNJdjM95Nh9hv6Y9dxVDjet3zjbQGsCk51+uNs4Q1UfDnYVlQeOfXxhILKA79zfn+MY7CgA048+usuwk2AprRy+sQhpQM7629O7PXvBImE1ETkveUWids4DLwYIUs6xNBbkKHiZocbzhyTV2+8kqkfjWTYGkKfPsx+MW6EXn8uNbd5FbwwAbA4Jw+cbbgeeTBNzH43jEa6ZzMYCtwFhvCqzvHdLRHEeu1HvYuCGIR1u36nI+mJALsCZ/GUSJRJL7O/zjoTqioeYkDv8Y6fNQZQ8Euzt8HjEsRa7JP6xQFQACcYUdQaqJHkPPrLYIeZIz7bDEsPGJ+IU9470Qm1X36xIq+KRHxgAbJm/0mDYEhoE49c5BA6RYaNc4bj8kfK2jufT4hdci0h4V0mp9ck0FNto/Hrr6ZuNB31miwbx5xXthYsT+cAjQ3FJiHXE0N4ZXHKkMt0jpHWNjZ6mPA8p2MylR1uGM0KoktME7zyAcgAnsYHpchNwSUjBEDBFl6PvBOG95S+hzlXZw8KvEcBM15ccCgietYBqT0Z6efGEwF0aZZGXzNTACWhZ5yIcI5UVW8ebjiJpd6wSqjwBcASlPWACR+uGcwPnrEqeg4AlEcmt2/GR9M4ReMgM2YGWGFUDcfWxF1HrKvrIHlyb+Llgjcc1eMsou8VASkjhMrxuZfzhESBvRkl60SfOIagqVhfP951ChDsy7FGgggO+dmEyFF0HWOyGKM1QfvvGCrnc3hxUdjd+fWNKXzaocezlYk199ZsCrLAfjeLHjAgGiTY+3XdxAIh1IMywC+ZTL/ocrQYct+waGv8AbwKsPCguEJC3CqftiBOYpIe/84x48bGe5g1QyoATX7cYjtuAcOfnAykUdrJOVwFj+XA0C4AAP4xsX1gwo862mK2hAEgXv18+8lSQgGnlv64KNCyl6wHQFKBfriDzyqoiH2/7hEEZEgd8F4637coFIpD0F3Q59Zui2pBQfMxhY0CPng7v+4w5GpshHiX0xWSIkDvnoXG/1wjowY1VU32APvkrRXkY4SIA4qFDL97GtX84SI9/fL6AOakw1geUKGMrGctQ0aFsGfTBIBAPUg1zlk4qI/VUXuZd03aB6R4w6ioS1L7IF9Zq5xe/GPOMkRiOiO/0wKu8LAfJ3lpFzpDKdI/XEp7lUwzaKgo+usP5UEeC0WA6b6wKdBwJypp8c5qsVdNX0e5Fff0y4YCCS+39YVIdRsqF+oH1PORyixdFQ9pGHk94RJaJ2fxhhQjyS5sihvgHr3hkNHWbXmgMuFjhQAOXxhk0cTau+vphULFLk900h9sicaO3Tzo+cBjWNqEfHv8AGMdO+Afb54wjTISzkEftxgl0EO8rnfKiAecAOlfOUY4MUBdJB+mI8AfB+cgws9lwTIw3VByapOhCjjU27DziinGCTy4ztk88YK2kxoEOcYoE88YROh4OsoRE5QF/nEtkZt/fGqgIAG3CNcKE01gonnYriV5nnp/rDC0W72ZUBRNwn1yb1dNd4tsHAO8FdsUKTDShl1FP59YoOgcUT4wGPO54/wAYwpS3Tp9esKo8tIxF2C+Svxku4QsNQvM85zYPeo4lErooxwFFYbRcXguYnx7jDXOfWSL0zcEJpo/vFiIui/XGVTcpKefjGREDg6P7xH8MZm2M34xkTCylXQe7gFYHYc4MOEpSazY3IrXt9+fnDfoVKNO/Z/WIypQEd/LhajDyzGmAFVAHreHJPeomNKIlKPoaxL3ep+gduVTSgkHPjr43iix0rIfMMLCXQTy8YRrognL8YTODegHuduQED4JTLNGvBxjVPwwzBB95aaso1CHg4fxhwRZmUGvQOM0ASHeUYFOxTECLKoH3PofjHQHu2p7fWAKQLpUuv84bT84CbAI9axyIdE0F794z1AztXj1icZQEKFJ744xoYzClsNP+MAA2BaHz7+cdISbQs+DDK1IBB8x45w28TpYCF9tZDC+8BL2JTo38/GGt0AqBDfxzzgqdyNV/bBQgVAlX78Y9SnlY/g118ZQbywMvFgaSbzekndq5aeQOTj6C9qHow0MTY2YMS8DZSA97aYBAu1CnTt9GXmXhRDv5/DgDUDDjy8utP7ZoRmugbsfdv39556Fp9YkVMe5xv9MsGMNqX+cJjHztw4jfNYhgyYqmv89ecEpMOGx63ymM17io47oB89n8jGsoRdX+8ahBeRTCQS0NEuhOzR+PBjDpYCgoJXeR2HmON0A0D0NBBH6GveFyBFBDYaoqJCQ5uFDQstB1lfnGWuZB3799/nxhQamy8jhQ9anjkleyorgLU7Yy1wfnJJpgAmrLrg++WOQbQm+/PUwsbGsYN6jBOP7xk0KAJTxrjGjLXN/Hs9v5whCBqd44QCfCZvLTxI5s3s6BucQJfWsLjtdq5w3CL4Tf85SdPzyx0qJyKD98QgNFr/t47oF8cJg6Sq7mcYad4r1+c4u3rABuI9eccLHsS42V9qLnCLoi4g13hKh8Y+XSVP6Z8SyER8/1jfGF5wwTfKtnxlN8I8jAiWEYroYm2VbEbcbqy+TCkaHdBuCwAboH1wIfAgZ5wqgR2LRiCAR5u+8t2kLQ3OY8XnDKSAAEeZJ5v9ZYsEAG7yK1ty+MIxlJq27LOi5IIKQH865PeKy2AQi8D4fWKdQ07ievWFFIrrfJXXj7nOO0wFIetnT+j5wzrIB1xr5TJPb8vMf5x0i4EiN49Y7PeUC8uI7UOvOcQLudv9YTCSwG1fGSzO16Z57feFMxBQRAdcbh9c1FB3qK4ycno0++AAbTYRcIas6BA/WuSORVADLwaencf3pEtDyBz/vGGy3QUvxzcGDLGgr46wSDjQZfMLM8RQJS97xJQEaAPpjYQN9zGqUMhT8fPrHFwNFX6vGEsDESDuk7X9scv2nuoK9soB1DRfPvE5biYPBHp9+8vYC8QDGN/LF+p9cTkf8AjFgBUaL0+/WMECwBCI2KhtmusathGgJeHzivkbdXJRup6GEtkRZLMTxZFm1xDi+XFU3CSth1pWcf5JeKoQ8r84fACnRbz7caoJCc/Hx/GUgM9tnlo62+8B61KHXZLAD8nkwIAyIjaTCChIc5eAgXfBhMaC2uqZJW15OshWgE6wiRLhYp29yr9TAmJQVamMMGFkHJ9An64fQSXSj8pZ9Bw2dJBuP2QD9PqUFAaCcYpxO9uOkUVWLnB+uXURygHr3iHx+I/wB4zXwNB7fHzg+00Gnj/wB+2XJC1lBZP9/GEmEe1+VMg7cqpd5rTtl7DFK628Kfz3hm65ordiqCSfXAgcEirYDJ6X484bU9sVFfKIeYZa4zGwSC2FLt7yQRsUTrGlU8TDWwd46BTh7wgQy9aDURP9xhFk02AHL0N29x4mNSE0k/OMX4wCTAExVkIJ1hrNE0EQ9evjAESc0w7WDqOBvQvLWCRHpW4PMgOodeoHBrELpJU5HrAgNOLwn84EbadbbjxReK/v8AGISO9JoywakC71l+C4BQRMERANbu/nBSDb+MkKDw/thbCJrfWHatHhMWQ5Bzl5NrQxkVWJvHASnveCRNPJyY0rF+MZQF45y5Bo2cN+MUCINBI/3jCO+aybxVZrrCMxoJw/tm4Gtj+2KIU4+mKiK+HSZUNB5wlaCrS0+Dwmb+W6Rb0xNrQ+/OVcwIQJd+pnPUKOmt/EUziKIqI6PfHvnIxhUpA01NeF9e8oBETzjt6er7+mFjoEAEO6eeMeJOIQgE1+bgqtjLoi/3gRSmCrAJou09GyfXwYAeW7gctMBCCBzxm93PwY09SpzAo5J4HzhDvIgCnzjXiARHGBey5zH56yQgG7IfTvK6QPAD8B1gvcdmX3F18TEYSRqDwBC4j00R+T1ioPf5xYRE54mCFgBUGsynUbvBc4414xlgUFFSfvl+5ynMhUhsTT6fGBVAigHAeMmuME9dtCr+sNlRHFk/3nNDEmbEUfnLxrdBtct6EHYqmg+sxm8cAIhF33dcfbWW94Xus4X6GIFhDGDZZucmKMldqtx+Iho4ns9cusdgIVLROR9pjxCgkB32zWG1M6Sht9dfy3La3NyR/Q+lzdggEmPhx4HfPjDJHhXaRtKa4/WYwcQSKgNbwPwc46KbIT6f4uAsBHmdc4YTxN+8JUI1Zv8AvDVIJof9zi1BHbzMSJyAiAgQ96Ps5DhdAcbZqWBVFSE+tfvhBwKNSUPINH5cN+MBwAH9h9MICNtDOevOVFQOoh/eHkNAIwfxjFWeGm3Xp/vE2mxb+98P9rN0lQVH4cYPeABv+uxMLqLGLx6dPGFlZGfklN/XHLH0gMFENduNW8d5RtmOTEEWK8fD7/rNbwghvvVfvnIxaAXlX1QJ7ycdbA045yfPkeHFtAokrn2E49hxdLnOwIMA9OuPbkceQM3SzC20vF5wQA84cN3cD1liaYQ14t0vrr6ua2hBlQZXj5x2b4FF7nD6fnEdXeAPjc1k7mWk28nl9mMCNJU5PPsy64zRaOBwYrpGjgqqA8l/OMzh5OjHFBZzCTANgcbk1gUN3HAhembzcdI5NOMzhLyEyUr5BHA0CEgMuEi307wApXzhKODnK4g96B/bKrgV94TRjfGUME+eMemDwjEw8rZoETGU4ps974crWaeJvGWwTe9OWwA/p+2HSim64wKyHRIfOOUT84mppEmvRw6595IpppmwZvbPX6Yo8SrKg3fj+Xzhrc6ei6Tw+ssyVTRbQDs0YANAEhQcj+uTXRbAFjxtePjNYoqIhI8s3HAVJANfpkzVkTY15/lhMYNCrPrmlguJUth8P75blAr2PPs/nDgAMYt08cYZNn24wk1x6wywArupsxwIjXHeUYpuTVgDVWGI2Jp36wE43guYBAOOjvnIJDWnE3nXPxlAgzY5uA/fBNelJPu9YRCP2qwEEj6H84coomyQDX8YTgjmcGTQroan8YdCJgYL5yaSKgH2ToxiuegTjb5xqK3KVfxgujHaiu/5woOQoDX0t+cEj/O/8/fNw94vA+Xl9ZHCHsge/Z/t4ehwxSXZ6y1TcBNq19f5zlu547Jz8+8dllV7DzjiR2AifthArT1xhGy8OjFk3sJXvR5w6ZO3DpBn7/zk0pRiCFyxaMC2BoPx+uNkBQrjyuDGo7336fZjl8OQZyOkshvHheMt2g7iB27vjBIGdruphcEBs8nnCdqJ5GOTK+PcTHhHsa5yAQKdDlOBACpt+xrEstAKxr+ciU5Db8vD1/zCYAwXR7YsWwVyzg+DbP4MQAQSJlk9jtjh5fEwFkOB6xnFVnb+OWe8v2tk0HQ9Zzg9iXHijdRfp04bqlQF+ju94ysqEB/TEooclzz6yVA1oW2zeGkDXTG7J26xABpS7qTcOevtjZiOVX22fNwxVhpovNfUCfOb1uWV1aXvp3z3RBcxRQKdKPygfePGEhu3mKPRo/Le9CuQdfxhT24AQ04lYfrlov2xo3a35mWBqLW+MOtsi6m0/NPtk+0ART8McEBwb784NKAZRz9usB9ZoMTXBODCIi5to8zvEXYQS0123SNpilBEgK3Hd0UmbeN8+dYzSAoBHEcVOIY4l+j1g/GmICrpxlCYlB/dlRp7nj1gFFhkcbb3xli6KJ3mv6ctt0nPjJF9o+nGDG4hK7uC4cnTkabJzmujD7ObCNkfeCYaFduIH+chWsfOOEG73cMF0mLwGnezJQOvlrHWuVgpNn2J9THEsCeBUW/DDAmAWonE7TFEhK2WE18vXvFIFtbTkqvjUnzhFCIOiXhbzzx/GS5gA0S9T64QCdCsQHfa1J6xiGAqtJrn9C4xNULR0Pb3lNmkoeePnr/mCkxzhA5F69pY+k8ZFfDIcmL0esbYRwAc+feAiVcpCzX74pHdLQ+kN47IeQK/F6w6TCuUXyZEaxmAL49YjZjCEX+PWFz8jQnzMaRSVtnZuwwGpQKlTwfHrAkQpqsMGgUdqj5FJjwUIVY48fX8YCtXAFe8W2z0effOFOybaMkdUiACL78GBgmAfAJ384DFXgD6FTGQafSfFe8QBAlKS+8bE3++MzUbICp/3+MIm54kPT5/3OMnMbgAePnGDPM2CrRnxr+MgCnZQf6fWPHZmun6YYEd1UPpiArBUqp+mE1VRDRfH94N0M7lmSgqqTnEV2RCgfvipN0Byk9nafRy1SMGgv8AnAjEQKP83Lt5iK8PsWo+p4wdnwxngdPWPytKrSb9IhT13mx5EjP1yoIo0OcSPI1fONOhPziN7w+MUjEQrt4P5wkGiIioWRrTXfvCRdxAIGzC8vBg+ssI7hJTw2aavfVyOEqqA+vR4MJhI4Hj9sOtCyHAYY5B7y01cQLlOo4bgxbiPmFMeDXAChoV8bQ+uWlBjQq15og/XzjAXbbYGNCxi6r9+HGBUGEsbz85e6IBBLo3Dt1iN40Fi+6/PrGbCAUrqB0+8f8AHIjni6p3+mIaSUEaaB+aY9oMNNqS/afYxyNTl/nAJurHu8Y+zm4rwd5YHOD185JIb4xmCIWFKZ+s++Dbu1qCZAhiaZMEOTTfJ0/OB9Qm47mD2HEtoHH31lg1uZJUdWL6Y6u7jt0x67xCVsIRQenCyXLZyJZ1iPwL2c/8wJYB0awCIlms6zN61gp2wdKvPhwKdy0gMoK9I7fOMmqavP8AeDg77TOOuctuQiwag6ev+4Qj6Hkw3o7vkwENPB5wgQZZwaNYadYwNswhpub1wtxom9y4UWHT2uMBtnh1ju/uwgIQdlPeuIVmCWBMCJtw5HTr5xmTkABr0c+H84OQUsSm87/TNSAQXCrdnfC5dCoA0CqxTDqT3HS1q+Sa/wCYIlArXdF1eDjf+RLsCEDU2Hnxk5Ehom2AM36wFkSNQJKsk7+z5wxsGk7OvgzAMOEIg0fWJeOi71h8mx+PeCdc4N941CfjDLhKwAOvfOMBARg/B6xLOqLKvl8Hcx+CRDSNefGWpg0AA/vjSzoAVf5xD2ob1XvqYaAjh9iCwX/mABQGzxro8+8s0gXQr4wSvJcvy8ZRVlp35+MLHHoAvreNgwVNW+PGEGbru4xelKNj29/GRW2HIG4vLggoSc/p1hJIkrYPjXeJWdoUK7OC8fOBbqLSEffjDXN8RbvXvrBF7aJ+B7xxohKYVOfnePudNdb494a802EpjGpZNrDx684kJSqmC8vl7x5uS8FvOrD0ZLCoKBTp+fWGwgqClSbfRgD6K6ftxiBABQSD/GK5AAnI7PPHWAoA+C8YauhLWPZ4cF7VBRHUdmpPZ4wgJjABGLTrF9jcxqIBwHv8Y/HSOmbxUiI4wl4yJ8ivAecIojQXSt5xzIUBqFc8cPx5wjwawFdUD313jdUDAFXlAdGMXIIdPGC0okCrrA0nOABo65uRALTouNwa7Hkx+psABi/gX7ec1lnIKsPhCLpCePnD6RCwOHisHlxnongNuIabvDdaxXhEdDr31ksiC28td+v6wuIbRnAlL45/XAvVEYo+zwe/WOprifFuRlWyKrHiyGCBQIo8mzXzrn+cC0MBbpQfuOcnxm+lfJh+oSjnK95rJHc6P5yTvl/TOxf9MveMQRiJ75v0Mc+LQ4VsBU4NeMDJfaT7ia+MZhvdEDxrjAI1U/K/YM3dlzfaHnT+j4xFuioHR/WXt+MWERMFdXx7fWIKVmSG9dbxmt76jzlk0PnETYzlqx1J1hARPbkFFXkKXxhHAB4bv5yiqXU3g1nRu5ggbkIOWQ07uaYoyEI/GCWI0vb85RTp08YcAj1w/rH8+nF/Ryoip4FfjE0o+O8VL9WeMxArPGNhAc1HWc8l1XRh4YDk7XNgj83BUNfI2YYlIAEBf1H+MNVEoUPh6ExJ1r3Bdz14xwthE0BXft3x/ONMDenOr9zuevezDmd2nZu9fHrDnKkGigc+uP8AmEQCDgKa31xxiKj9AKkknfWE2NCEAeB66++FYA0Sc9rvfOAPVAVSOE64wSnnDThScmfgH3DFOCIxOxvGd0pjVQQ1oN8ev+4a0BdS9eZhsarBSDz6MUY9UHB/OEgydTGYotYFwuSsEI94jagCqhmz3ITA9f1iXhAOgP1xvbJQNvHvHD8h0v8AOXWsO7i0KnxjQT9FVmEBtLwbcOjsG3X06y1Idpt914waIR7aJjOp4Ent84lSHKJf5xlCqFdzS/bxzgGSjGvtoswQ6B0Aw9GF1gKDtaa50c8eveVQflihvn+sEL0pLlQ0JuzBSFpUh+N43mrYIarfX+4wFBFAA+eNYiAhhAjg14HceF7xUVKAQPx4y9Aqgozj/ftj94mg/UPkvGAg68Ca3+2W45VAfXvEqc4kloO0Ygzu4BkKXGwmlgPrbzvIJYZw6yafWE/Ra/j4zTCWFTX/ADFSPcNX16M0a9AiM2+O8ug1cBZ35eriQCCUQXrxxxi8KpaMT/cZfwpCtfJeMlrRFgaOTz1iOi/GIgqPZ1jktGthXzhnKIJiROXcvWKXUNag58O1j7xKq98YxikOh1gUNusSovDExwXQdXNQhCQiuv2+MVpCIBAo6fJ6xkHBKV3o7bNf3jfGCCPqf1nXg8o6EASQ4/2sqAb1rk1hWFpAF+Hpi/L4xQ1sm3en+8WJ4dZsS7xNHbyOx8mQ7D2sDEjKnvlx7xil53hI7mHySYCoSPkZjxUxbUv4wFejpV1js4ATnxfBmi6o5AInoFWWteLjIYCofBr8BeejFklIMqeimvpgTidBND3OzOAFDdTeGg8GCPSnrAIo05Y1fWXm7feB7d/NMJsodes2k4TrJg9mN2izJEoPOW7nfjJMTYYNqfYZT3OCcXxgjXWFQduk85BA8N5f3hAViV1iG1VEqZQNyciUfeLN/kOLjetuuzAKO5jcmNulMUHdG1TDUuAAWt55eNespo3fk5PX+95qqygA3Wuzz7MAy6kAhpsOgTj3jqopVwTwa458ua3LQGGjR0SYKkPZbMFmuVuOsTUQknPvDS1AWc8b7wUAoAlWTdNx/fGA4qwhGv4T6Y0ogMUnB9seia5FaphOi0mCKqUh8o9dg+cnmfQG7OfXzgPMqCi+fK+8GvdbAfrmjel29q+cBUQENK/sYQ+KF8PfO9YWJ2GZ13jRQPHjCshI+j495AEoB1m4huicj595YAKtBN4tIDZDPfxh7lzCRxEldRV9evjNsaaEjD9sLNAzQTFAoAdrDL38jpn8Zd7yaLPnJd4sHXzhjqAimz9sNsDIAD65uRDpSC/T+coPCKLTxcKqhoIDxMAJWaxg83j9c5selNfOQqG7bC/ODpSlVCrj2noAAzsmyxbjXryFfkePjANpMRQHr/fbCku5gvr1kolwEjIThUG03FE5Y/bjG88wAZrvcN8ejIZzdqRdB38YCEqVDHy/nWPhjEQHr4wI+POUOir64y0gBobFxWUE4Zrj8mEYJt6OO+sSQboEQ++2b4GdO2fnBUF2DjEBYNhQ641kIE0FQBwYzi1dUOffBni84hBN9c4UJPAoGzc7wKkBAawxKNJrZX3jU2+pjN0fphEA8cTIdOwKieH3g+kog1WtP3zfF4IR5rVX+sLTLJCGhd6KfLgoKQRMNnmTm+sAjOL1j/AboCOvzg+1nAG87zKYL2KdCJMRTol6bj/UPPBcPFW3CZbJGJiPp3jJQHmTmpTXeK8dYRfBcapc+ceF5wUk74Y5QlyfaHp24+2EYLzdGqzwdXlygdHNH6A2/K/bHrR9b5s/OAUEClHx7N4xrp4TWIWIGKrWBjK3LX8ZzJchr8YFo+U8ZAaco4t5N2bMMXtjPnKNA6iYxUPHJllI8rwYlKNYh/fe8RdBX1gCg9HVv5wwUzWkMK0G+qmEkTrqY+/JBxuEbNB8ZUKSGuMS6OrC8D0dXBVAABC8d1V/GTClqAB2T/a2+MQPZtKpJrj1/rkgBXQDWl1OPGNWkNsKP6a9uXUKgGFTr2+vjCYAQEhb4+ecJHtC1rw33/t4moBKgGXTvlnWIsJQ0BR061MF5SAFpH4+M0wAIujD/wAw7jSzG/KtCvoezzlbTtESOh6RG+8nxEmwr7/rL4QiaL/vGFYzJSPofzhEAFQSK8+8S5FsMFvjvCgxgIPxjKDogdh4+csEyRcHgxC60AKM8HGTSxABT+cEuhiin9+sSfkSVLoybCbkEi+9meJcas2sBRYD6T75e4gAlA6fGOKxlij9NZGATkEPvfeGlgKKmDqYciw/vE6TN8g/XAuj0XrHUtk4hP3xNDAKs0HnCVk3toOXf6frjAjdBR/bCTRJGEfHkweRoqEv+7xrl9ITJNeMUuo+cVA8XjFpNamj1MmJA1BAMkCJ4xxdnlW3CdG1HscJ2HsQF4TvNWG01v4eb8ZvXQNSoDa3oZlw0o4Tfxp+uNg7qpL794WYRGAK/tjDbdbNz+cSAAayHliux0v8Ys4G9S83twjVO9Bo6nXN/wCZMHxFAv16/wBxlI7cug+MGsjQWhcLERHRc93njH5pyEB9OMdStu8IgsgGOjXvGqndVSmTU52xPr0Y4pujLbDFPEk86yihUbpuTJRefGIZF44v0xkEtQFHYvnv/a2KEOSxfylxGA1VbhBJEq8pjAwV5+n5wiVKYu6GG8JpqJ49D/uMIcVdgGK8yJcpGkec2O9XAnS3m7x7Q0FYjhkkNIhH05MaVGoAie5++MvEkop5wVIqAKmLxBusH36w1gH1HDWIaEFhr84/hUBofHs7xTRqyPj9DxgcFE6wPySmMgVfXHVnkH6mXIETSOpicONornoXxjOAfGOaXAIiaOMXaOFpvBQ9Ytcuc8QTBQ7ygDqd4IwPYcTTUezTmvr8rgpIQ8c4M0xaeJgWuF3dVQDx6wkxEWyNc+ctaeTR/vDMTCW6BXtdwOecITQHBYAF5br7vvCNmlLvUCaPb28XJdi9Cu5yt6+OcXs0ESiwW/b4+iOFgEKN35N+MojBgAFN65dmGUdPIIHlzgdUCBFw7ecOEXNJp2+PP24wIICETZl9+TCROdFEcodcfl9YhZAiGyG8KnCiyY8ecahQJ5uflP2Xxh1x2V/RiBqXgL595NsOxSHjAq0JV+cOJCsKavnBxQkGH14wmIAzacYx0Grf8B1/GEyyEaCu/wBMEcOsQFgpbxlyJYBP8DKcYaWjm+bvX75zhqQrIJXu5/vE4N1EIP7ZJdc5MHIb4CnzrHKTnRFx0bZj6OkiD9N4JZtCO363A/ZaWqzxjBLILcfjzhPhsSnoPg5xujCrKLu98c46HyXAchcQnIwCbctBtUin0zn+JVH/AHEC48js6HHFhMZsB44MEJxsmAQ9VeMkNikBdeJiaTSTTzz1od/zjCa4mFj05Lv/AJkfSqCCPIUdY9JEbwR/vE3GyctHRwawruQGgSK8Nrx4wpyAr7OvfrD6z0DTf285vsqVXfrFeIICg129cYPqS8lDX4/GRJCIjTJ+uAoAoiJ7yHGDeYTj+8oQEsUbhLuAoGeG93Ea6ohU6fea/ogBo+WuDAihoGA3+cBSi0r6z3j52u5L9TAyKGpwnibmQLI5SFwmCS1RfvgooiKNuM+bojlz6pv6Oc3mccusU6deP0xRshBV4/vGQBsNF4xjQrD5mjGI66Bz+P54WQRQEh8afnNzaar8qUMOkLoYJaPSXnFHU2tp8Onx+uGwF6a/YtwrHG2X6Tz6yUKQQncnj/N48Uk0T4fGWagAJ/35w7MTYqvBb2aw0OMAgP3+MKNI8iP8PrJehQG6x531IunBhqXrgzQThxhBD5enLohwpp+veSNfVxEh1iB5PUwU51Fp/nNSc+8vQmKp3lPDG1JljZMA6wCcbwZGbcWF5zn6yzlZMdfGMMdhiAdfrjI5tQ5QKAG9e33367yUZUKrcBTYO94DhANLh4PWrty9GMVBVo80dYwY2dgaaLy9a+c0aSQEfArXy/vjn4BILA1rrimTCpZRblnXZhqIBhtI6fe/82apdCpUG+6u3rJirLIRrrpwj7kaDbc3TneQDVVSKAQn8e8dgttMuvz39cMU46wKyAPCPJlyngaPN9v8POaz3ldfTC82EHXOLSP5B8rh5EOBw/nBAEDgOMeTjCzUwHAF75fvhL5yEDE8YEADW3Rg3dzTXe8W6TJFTXxihCvWUYKnm4SAY6hnvS0pm5AkNGMaR9OIK3g01iBi6wY+c15LRBNGL9MZ+3cD+/5wDBD0YN+POUCgsLDlyoNOqg9e2NK6CIP/ADNIEAAHAYgsdGIAN+cBUHeC6uRFMcJEDjo+cQubeLjm30axOmsAVFCICc86PeAQH5XONY9FwTonGgOCoqcivlevphkp2jL8e8CW0qKJ9esE3sAAL5hBxv3A0N4uCM5lfesb+mNA8YLhvmzD+/KbMFLFWoST+cAVBlMEnXs94+c6sRZf6xCctkae95BBL4TjFEqr6xFKk3HxmkAff64Qui7+MfKhB0F7fOucNPWKVQNFC73PpjCcoOiefzhuoSjW+/eSKVFNAeMM6hVvb1/vWWCBupd4KPoc8TAoyFSl8fXNVJGjMQV+w0h7sC/ONaIAXB8k3gK7r8BqzLmptGvvcr7xaNizW42vyxhRRCLKu/PXMx2Eqvwc65d3jXVwFwMDR9XHCgw1hNTiGn/ecepyhs/Psxh4IbRn75AJNOnbhc3CKcvrFgKeLfr849QPv84bdzQX+Qy2Kdh0nzg7oKP4xS0zmhTKAAwhJiZpi4KApwRyVuhwSPbi4KEITj3hh6w3vWFaMcYcc4re+cChWYS+89d5trGa9Y6nrL6sxOjrL9BGIESqyA4+M18kECuhPv6wjE0TAjqF97/nCAIxGUV8b+/2yS8PYEmj2cf31Po4ACjWjW+24tZiLCgAmtDvj1iuQQGnrO3AzUCi0Xy4S4CYXU3gajybz7caqxsEAkp55vGNzMWyLAr4NtcJGYEFLqUfr9sG/JjFDqPX+9YKiYOD/I536xawFE7xfB1AoI6nhNfbxjKLGUIeM4zdFhfNw6PxH6+8ICGOT3gu1zd6MdBx88Z51MEuWO3PFzfBpB4wJu7wF6uV1gvw8407piXciRSzJDWr9DFPRJzi+d4APnKu/pMgbxARsAQTC1Ao0WriR/zdoY3kg3SoMnbvKKQLJB/jLmrgMFwDu/x/jHr5SQ0xwQCnJ2Yqi+6FcvQD0d4ZTrlAMpeulQfVw6gBifc6+Mdf1xU7RV+uSUgiiB8ZOZGNAPo8YyKbeCAZIAxxqcOnUlEybJCCh2Jox7Yd1hDk8/GscKZ0aL3P2xQYkRJHx6yuxjltoejvAUCXh4wqEIiRy5PLjZARM9GD9WOWSoiCR334wsBgajxziFuuAqJ4vXzm/wCBqWHGvXOvhxkoPbxggx3If4yivAANT38+sZ7IqhS/zjh8DtsTXheL1bj6YSnaQ0fGsqOJEBv384ttOR5uMcpbT9MNAg2ASZ0ydFjfORHPUAq46AV29vj4wrF2Vs9YzpAHJGvjJIxRqYBZSV1xjKsI7T1vEVgu5r4evWLKWbBF8fHWRqLyNfvXGW0TQnl5wnd+nnO896D2nh/2sXgpKBMO2jqcskVQQd/OOOICnBPWNA7H3rFMnVDf95OyXANP94yYnHGXcooneLIhfYxpo0wKAR8PLgNUNOvWNGvHnOIXT+MJ06xOnF+2b7TPPnGIXeDReM345zTAXKcaxHB6TIBY8bBJ/neMrIWpBrXo66y48nWOXnjj/XF70nK5KTwhMNqgoAahriTnX6YZIMRCLx8+vjHncVCfGvqxWdcTHXc8H9YA3rYg1eX9WY2g5kFG2c97d/1lM6q2mcHrn8YoMQDeNhzHmff6FXeSoqfQNf7WGZsIWNcezfGSyApIi/AFftk8isk2H7YRMkISFaOt+H/c4JBER4esH3i35wONqQO3jWRJTLzgBNawUQ0PWRSurgBrFh75wO1wbwoDYb2X+MQoMbdv0yfPbiTLpSPY8ZwG9Js/nAAbLKoLgII0expjj+qiCeMtSJFJ6fGD/WAPDnaOt5B5OsTUOtzjExYmpiRlk8ZOG+cKWpBCC7+cjeQFV6PxcqCtgGtO9c+sFqVoFb5wqSGhyeL4zU2h2X7wdx8AgPXxkj8EDD5B4AXAQuh2jhoelpEN+8aJIbrcA/JQXDxBdGo4oCl7UwACaABAMuxLEN6PJ3N4fEqALLt97zegqXSNMSKmLXQvv5x0IHkuOCjI0R+mKIGsovtx+cPhiAI/HjBkiCrF+wPWGSutAD8HEgXrxIXGAtwCAfxnAylgv84MGAgCp1lErxMiYJxoUD6962xMBXV8riB0l4gMaXm9GQ8cvYU8RgIqR1PHz398ajwOsUb9MpD3nGDEMQ0w45wkO8c7mMEAhnWTIh0aPrCCIIhRfeAVhrKJODFKVlGe74xz02z3idtJ9T6Ya2mwurlZQjrp7HG7q5SPp7MfaDCx/rF7dEBPX7PWEnU5E9Xx8frg+mtF0hgXZ4BqGat7c4INs4fGEwCGg3T++FkiI4LNDg43lG8OsRqnSa8YRFJ4FpjcENL0uDdDTxgLahesuQpx9MChY95L/OIaMfOOJtaLiRqnXrEm/wA4V6A7xp8Y72yu4kx0w6jgEji+GnbqdGHAPImRr1zJvn5gM4BF4albdfjLGEBmKUdo6P8AOBKiFsF8k2EcOkaLQAup0gfn24TOJISr7vBPnKng9BIidcvr3ltha0CbKvXX+MBoBKtD27c4NHwNReDwc5KQMIja77XGi9YAqQL+xcAI1YLyQ8N3ymXjQogAIz1zP7zT6MSKld64ON5pWip2OUGK/I9P0Y/TNpEigwjOOEccdZ0cZL2RDB+nWNEocUEH98tMGjgb7zfLhxi4Zzzh4yd85xjApSlx1OGEBH86wsCdEEyzCD2uSAXZqGSUE0TnHnQcih/eEIAiHF8+8eP/AB5ecByIinbRiISTQlj7+MvewDgHnHEEjCC3n1kBsN7C47XTBeA6vn1hQAAqcrCrNBu0017FuGq5xop43j0QIi7P7YLjUF9uX64N0S8a4QQ3wXBUjwBfWNrB0MT785XAQPWUa/Jx8MXvnAoJZ2WZskB2sM33EKOrgzU1kudBgeFcvmgt1jsxebF8e8Gkhzo/xjAABpaT1hEKRQ/tfONUONajAgdiwQ+vJj5FWxYPfHOEASxAH17wwQA2qp/OTehRID+cKhUgDpuaYLN9jz1haJAx0mJBoZnEqZmnW/3xMhTvBVh96TACo/jFRFPVxqgBlUH4yu9PTi4jouh16yS4BsO+Ag9X9caWkoZLZUWvGNFgolTjf5wlzCojfi967MhmgCnuzk19H6MEyaEizC7Whctc4bLdESScaxy2IFYznFvgDatGvjNgqUZyZ3FAAE8+zCOlag3XM7PeFAIqEKbfL4xCieS7ycjtp6wnDS88mRJUJxfXWURQgk1iMFyGP0pwMkxuJ24dmOLR8QwlQGm8SHVPHODmh7HrERUjgUaRefGCELPJxlDbRdPvOLXD5mMwS+DiUlZNIOUK064PWGE1xcES+e8LRaFd/nKJybl3lGgbyLp5Skt/M7D04ARE39BP5mAX0qsrSXUUNl5x/hKKMGPY7edcvlz1iCLbyMCfrjUI0mhdEzjfeVxQEGNXk4Nce+spEwlyBjJ54/PrH62ISg9YccbcFM2C02Bvwyu/5yVjYEb588c/OXQAA0FxGXbwTJhAAwqmzyafsYk8IBdRefGVoZRIL93PPO8SwnWKNbPWp+ccNDVFQYM9aQx2YCuEIRH8n9z4xV8D8414DCoENcrnjxAYfMyTGgry6wFyIdvGMFAAqrAMuELrdy1RULB8YRqTECx/fGiNEAYp5cVqyQnB7wgt1sq385vq3aoLgOM6hXBQZcCnPrGAI3Y4Ga/8VuVcWukODCZobVwHnGdgkHt94psT24UB1tDe+fjLeMgeHfJ6z4/CA0mn3l2cuVjT4qwDGKB1Hm4psKEWnn49YdKfr3hsipSK7784geQ8KrgB4cVLhDBGF77DXF0HaaEyRaQw95QGpoaP0McDa1VLxxgAHT4cUpa5RF15wrfGsImIcFMVgA0qv6YMCrGEP9sqql1wHA8aUb78BguIHB3jLDdmi/GPC0dGzAaJRjByw3DVH+8WKDOaL9TCQxQEcHiPGVx3lNfscYUpJJVjHMuLaNDXvGDlESOSGn+sb5wNHGs5vx4w1K6w2IFGUyYb1zcOLDdBCh38/wCma1WFxdiDoHXHPrBoDzKAF2a32fHvEtAQhJ/eErpSITxig1zEqde7xnNDp0HyJ1JMM3wGdJhlqlAVQbfp9sheYKCejua++PbXk2P6zZ6Gz3iQGg2IePGMW2iOO30OU+vjB1GlHvBgbEDwY1Itz14q0Pk9489d9559HeMxhw5ysKAAuIBNvZwesb8oq6qV9cGUKCPe9CYO1J6Xk/nDkFUNeMotpqmWAQjz/u8soAdv6/ODyB+hgeUffvIVA06mRKpyx3rDSBAnt8ZVyLofONRUeO8iPsoa2vLk+/rElAYREE5dcLrKAPUpEdt6EN/OSKgCYhyO2yf1ixOgSbp8+f8ATKNw4ki9oeOPOIIV6O9PfzvKRFVQqoF65/0xguaitE5Zx/zAlRoJAlXPs55eRRktoPSPGJ2sIKCBry5n0waKRKFFn5mJA2pKrOT2HX2xhvWhod7XlxKZW0Ka3fl/TBibAWAeX3o/vHvokfnHHqQURNmGBHeYD+x/bLQqOkXAR3JBf7xsImqsX0xyNVfJ84QGFXWJQ8gd4kozhWhjSBmKE/3OOIMPJccA7DbbFxCEC+ZvLoF8TD6DBaAjNmImjWI/tY3rCKahJocP5wRKGOyHHybCYlpJpHm4jxN4ZziUSwN3f+MGRTuRI2Tuw+2alQ7mOyzeATvF6AwGr694iqX24QtneN0OIgr/ABht1HTwe/bhJ4e3QGbdmWhqOp2b/wBDAAAONaMOl8dZo4mMvnIet4UmshsJljXjEijxhwrPQ5hRUBKKuMB8IIYlahvOc0wWc7xZ3s/OJJEnJhlhY7Aj6+cRWL5av5zatX34yTRv8ZIbPxmyVB84aVzbZZgl1qCpPc5uUhSodG+E6xBABVgr+es3kEe/j38YV2g8d9nr1l66qtgvPzi0OKsZyOdr0veAummKdYE1gFvD85xXgxV27yWvPeLT92CmjXrKEWR2MTDeHnCu9zjEsJJsSji/TelOz68z04uQ0BCA+ny+PeHqxoe8EYst/PnD7oCgmjk3rOPs0EXw7MELdoIDHR/CG441nWW5zz683CoocIPp8YPqFIhpb/t4n7QSgnymEQEAJU8r/wAwHglQD+2DzUQBV36T98SObyaw1IPHOO7R894qHQPNMRUXGyXfWEAi/ORWaNUxmxfnFrRJ3iDp++GgtxLfOGiOK5aeTOETWHM5c0cEKQ+g7S0w6gANFDs1P+6xjmtB2x1vld+D3i/7aUAm5xfPtwkG1gRhNLX3zp9444lRHj1Hj5+eMulAgTeceR24Ib1ETe0POn7+8AXiXRAEfWnA88AkHjfHlMZaBEYm4n3Nx1AiSeZ9E5+2FtwSYL5NOfH19YBiAaR5LvRZf0yaBZBSlYPGtc+sC6QHXCpEDpvG8tTdyaAPsXmYAuKQVchTjc5/jDZrD+b1704+p+2bzgBIiPHzmhnJS4mvZ6/7i4MgiDziBR08YjeEkC5ICeUzGhbeZB9/JgneUTXX/hC7zZvhyCK6AnGAYA8GNgOucU4HyZoRehdDGrG2kYpr8GINy7feNPB/OC4N48Z3PGROM9NYhffOE6godHvDuk8FQMcQBNBrff8AGIqVJQDM798iazVmeY36ZvLDKd4H9v7wSEeh5mOoQYt3wwBNETHsecm0IHtysK0VW+JjuxNb1kKDWyc5xTAkiHK+7rCXHV6xAV85JAy8mMCqCil7y7wcmfL7OezOWnOUUzgc3GUgJ3jJ1vfGeDE32uXqgyRbluwSITnKzoNCiL49Y1E1KBPj1gUSiXSeP1/GHJzhhT4J36x5J6hB2q+FnrHUW4VACnxUWe/WMHrCjdZ8eYAgIf7vCLhdUpwTJAIAOjxwc47sp5H8YpNwwYDt5cYpwcuHQLpTYHj5wU4mgjfP4yPyWgg3lvJ1PeaoG00Kb8HWSx0OyOTox9EcXY8esNIkCCJ++cmlRTb8HCqbhE+lvT98PjhCrF9e/pjpUZuTz85CRrVQfTyfnGvCOookY+vjLrVokQyTJP8AOzoH3+2aGItDh/cycVo+H3glhm6gnTTigL7sgwTngyBHfvCSyPWJjuYaSni946TvreC2u83C0xhF0Ybtd+cJElezHEFF169YkQbQk9J4PeNAvonro00+q4yJ2tejQfr+MPbd/EAM8Gh4w/oQslPpRj9zCRqhQrbWWGufgyCACENVd8nHHvJWsdQQmgWeXXzh617hF05Njxr2+cbqQBUQeOIV49YtXZpI15Ht9v8A1cYWMqrRXri/XC5UbJY9670H3yS6Y2gE88usqHrwGzl9GHnUdiuo+nl/7skDoRijw5+cNNtB0Kgl+jfnKOIVWDCN5N248fWLD1pxKYzCM4MQ/nJ8zzg/nkPC5aBErymOSCvhgWoiq9vnGhYg9/o4FcUIYDzMI2LYnDgfTL4Occ4Yxd8uCgXWFcYOLePdyFFykrlijjP/ADTHSzA1cs44yyEfK0mKegQAgN594LNSddZscIM+uG1kLtD9uMt6LWmKTsB5OOmFWeN8ZK63nDgLgpiLANx+W4HZDligQvMJhUvmawiRlJTP9MdF1llMQC3EgVL4q4WT9DB2C4OU188YYqAfnAjsfODDJ1iTbc7F/GVGETp04p1zkh37wMXZhVDd5OnC5OZQo/7zkEteQUxMniFj+onj9M365tvnnl9d5OhqUU6fzMKJDQU04cIU6UBXGI0ogRHxjkgyUfGGAMRqBcsdpp51kk2rkxT3vJjD40uHgQNXw+fnGao8IvvBCBBiS0p2rgA089mKAFmiLb3kqDXHxgu8iYOWpBRgD8ZPszCBidcuPLhaI0KXmLPzmvHkMB2E+uWCkTQxoUhvzMGxyKAPvsybSIEfw+s0XUTKPvI3zkzZHGdhTzinTOfjABNzJp06xgafLiBAJ15zjPR3hwhUxGLQAFV8fOGBa1cH+dYSAAQAkwqvABEazq+D5ObnFUQaqnj55MXqDHkF59c4cLWgyL3df3jilg7HkfI8e/szIAMI/ByzX2wEKCnmiKeeyYJDprAzidO/90XkURGx+rs1grQIQCCdR75xUqq7KdXxoMAIkqBDTX3zx6MPVRpKWunbt16+MqNrEjfXXPOO8agaBHnrjjEB1yCMDz70tyOigpCOq/R/5kvIkEYN15fjHMbKoLDi+GkwaXDwKK7P594ZKK2KOswRa694QQBu1l/fGs5oiN4KnA41wLgXc4IPiZsYC6+uPJu40tzYYL2bxuCvw4P2wezrBTQ4uuc3vNecXePGsNE5/wDHv3i8TeXI4iNC4xyYKAUvM43hdRTGgxv2w9SFsHj+8f1Xzp9/3xoubQgnOPZ1kXnEcVOZhzoz4xg3dbzy4Qxs4xcqHitGUrd3jAIC9RKOsSSZUQUw8vHxgU5ZxpHvAjX41vJTBfHDMoJ+M397GIxSGVqLiIfkXKOt4FUN+shyjzjHQ+cKxoRPGGhUepoDFfvDxJ+MIWW75uSfT84LFoaAjn3k2x5AvzlQnoQfhhcB2ikfXzjswhVC2esJcOMQLtP95PBswuFg5dh8nAPR0ZU6Zyt1xiG2m3zkJLQwnQEcNjGmtGUd3eJ13hs9OSNrb8OCmJ9QOVsz35fbE8eOAaxnT5+PeNRCgsIbdhc84CY+wrrlvWn74iWols+XI+uRQcojZ0+HGfjRT/uAAsJ3ecSW5cPpj5+DLAMPcXFptHvIhxPfGQ6qnrAZXa6wexp/XF4jy8Ae/BhUmOwftf8AnIIeK46kvCWheU6vi+MZaEj44Onnx9MutCkAKnH3YphFAKCCU15XDclR1F0/aH1wlFC4ADfSdkxTVIuMpPU3x+ubzm2E3yXc6ww0AgkB9cb2PrKsIDQpxbd1d4GUpLnOz2bv0xV9DR1S+ur495FoNqAab8T/AHOHJ1FTy8P2cpkBTZEOv93hJESQlA6+w/zgwAzcLA2w4C8Y0b0BwIePpzioSqgVmm/UwSl0ATT/ABjxh6QpGhUP49YgNfTEbmgOnDpadn+4zmEFVyeveKVHodYSy+nLXz1jhdoWVxYEU8vB7wI2J6w2bP8AxwHOAOcAhvec4dZKG3gXnC18+uLEJ6yLxm51ghxrPuGdRjyx3hXrOGjU67yQ61x5wJl0RtX+MvmFDwPX94l+/OO3FL45wA9p+mQBbcmQVATjC0BWNEyQ46QpMFWwuB/hgRA4ryh9YMiBWBXGYh71khswDVwRNnR5xoBh5ecX8v4x3DMV7bvNIrvN3e5gW+8BqFyEfOBvU8njLctN2L3rCtQQTt49ODxNQCx+OnHAGkPC9eMIRtO8V0cH6ZUZfRk2bfOA1qdveaj/ACxtNfOw85zNEfHXnCHYJpmA0RWdh7+cMrBeT9TowoUsonE/fHRzWO4YzNZG8/1hiEMa78e8IV1wnvKCKZy5wZ+Mem5ti1e8WvjAPaKAcrmmdVHej+cIoEBpS6/L+fOGDDJArw+8rnofcdGLESIvPD5xCRaWgewvXrL4itZHhVeOIDVl73X9Jix6iIbeDqwLUakhPPvEqQ2gcQVTYcOsYfHjAKIZxAHPi4USArFQ8/GcgK3A6mbDn0ecAr3HJ5f/AA1QoFgVx9VgA2vn05R3VEtfavJ4+feFm0aeuA+DhDAU8Ed+VB1wM9YqCOqCU8d1+uJ+X1EBeV6Ia9YJ4F4QCMv6N8ZxAELog6d8+cYk4RmTvejWJMxCCQL9Te/fvDeQRSQXmvsY2YNwK/PhNG8bSEIHnCs8bfzh6RXZUAfY43gpdRCzd374/wBcQ9AJJtdz6uMJkQSA7DcH+MP8odEg+rw6wS8WktGjz/3xgqQAUBoabVXx+mNQASrbNQ+ed5xvCzxighCI94kwV7hd+nP59ZophziZA6XS5FKwAF2bffxgd4JKa/GsZ4UC6UY9TV4zZbguDrimKmufGHHEwMEoGCMbAJJ52YI9GxH84A7B4NOIvWj74xBDcSoaeTvHtx05zh7wQacAUBMKxDY3GEEtq41Vd56YjN5WagGIcRCw4wTCSHnXOXchaIzAK+iKy+fOtYwiXqd45IdXyns1hPuVIBjZ65xKysCBu/DYz17xFVPoGQ7T0MMVOk7Q5yepExa7+uCQCuaIEbVAMXUqeBTAQUcQD+cudxtF1MdVCbLj7YCqc4HLjGEAY5IiGnzcDQbZC+p3hylCvTzw/s/9KaOec5/Y6Ruf7vCSoTkbkljhWpT9MYKGTCiBFIm8a4cmwxBAXi69bPthTAilVex7+cK6u8CiGzj/AJjkICMAv24+MU9T+cHEpTtyEoIhofeTCrY/HnIO8l/8SvjAgDhnUMOMtxe4APhHGsqCHZwesvfePyyVYmoppVgt4Xxs43CcA+95IhvNan2zXopSxfM6wVGXFEAOxKODtVzNfw4UTAKR82yfph4NoT69bXzcc+SQK+l0/RcRnjSJPM5xCQciRMNI4RqaIj5H7ZduRhB9OPj9MAukBAP/ADclCG71lY5Roo+A7zcAJzBevjL1CY6P7jj7mWI1oIpd75aZjIBoUJKiC9fj3i0N8aAU76+cOiY9RuG8OlfN95KXqgKXtd70XjNh4CUJXhvyfjzjFIAKQgJ6b/PzhLxoxlPoesAQZJIBN3k6+/OHgQU+LHoJb7+xUkHkKO6Dx5xpzcQ4DWELoR8T+fj45uPYoADpfPZ9MYG6Agwk8Bi/7ZxIAggk08wn2yplSBKn0cG+MEB1hI08tPR67xT66SVfT1rn1kSSlhJA32e//NGk+v8AD+31ccsi7SI4okx4RibMGuNPVywJRPphINXPxlivOLdsMRAcY0CB5cgFYowByneI5JFxK405/XO6aw5AuFNRHFRxDh9Ynu4hVtxNYuZnOa6MTwaxdbz3lDzxjox1j3M2ev8AxNMkKWYYYmR9fvj84QR1khDNTEGq3jMV1bqYIULrJhxKY/UQ9EkvrBGkFoKBX44c07OhTrGDpDAtUHrFxywGvPrAPbC80iCSa49836ZH4Qqpch2e8JJZ8gGPYBEpQwzFiNE/sxk8WFHrRrCJxTQAyuDUxg1ziIEvOU0nIHkeMB7ugTD5PD/t5aG0a64wYg1NOUNMDEx9GMrqGNZ5NawnwGNDsHVrX0XkwIuo+srQNI74w4V1VAmFmxNqGj3ggHnv1nMUdznDW/m4DhEwRvWeTAOs4Jc69Z+uD51MEXu5ZmqPPODJrBHWELcusHHbGO8sfGNta9gC/PnK0l0b5ovxhiS7OZ54X6DAz829PgWvoXE2co7/ANu//FmBKggB7r19Memk22QeP2v64dLYoFW1fl6y4z0AmEkTWcMXOQSWHw29epjlGLFXxOjdxaCtAbs4Hy19jCGrRdsqPm/7iLQYFcQnLm6/OK0QQBV6PT8486rQBQAc89n5xwgEFplwHNnHvJ0IgLBIeZN/OccUIsJyL4OZk2RJoh3yvXpgFMAIEKb9POsTWg0Gqmtp+2UQSo0RTXre/wDXBIAKKIYan1x4k7BotfBy8GJyY3KGc/r+MQVyJSC6+XE9GKIUqIqlf1+3vDpE0k0NX7HDGoBND59msA7Wb9YKTGWAQKBNLxIH1PGGwSPeEMDrWUfgTkuRtc84LzMOd4K6PrhbHkzQCSTpxkGnxxnGG16yhvHF8ZyWQKdPR+M308KS5YsXpyBpEwgscQ/7n/xfGL7mFszeMmOm4IbY4FK4x695b9MRcSY+mTXjFOFx1qHDaqe81uhwuMuwd4VbzMggC2F385CTIkwCrhnVrgh5uAjq3Vem8mKkgUJrjDLSaGY+MAX3nB2CbcdpV2xtr0bdY1QpdF1jDRHrLALoyXnNW/xgosh5es1Eitl/OMoVuoT/AHWAGNU83X8ZHEEUofnH0BeBmskQCaR0z5wqJXt7xEjfRI4wgh1khKvdxukQEheHJR7nI1VUnOz1rKa/OIwFjUB8+sBIh5tZiVjQgC+8abUOkHf94jq+Tz7xuF9mT7pdTBGoPhwh2aMo94GreMjfGIRfHeIg1vOC8XJg8YaTnAe8HPbPjGhcvveOy8ZXWOt74xwRotQ+Hl/2sRI0Lv8Au69Y/U1rX80+0MsBUHr7RVvx8GCpZyy+lr6FwHN21CvjnHRwB24Pj6/zlxijbDTp4xjwoCUXz6cB5JTCDB4nX+cORuQjRdG/G/fjHtMlm3l0evb4MiL4iVBrfdT4ndYwCRbZL2dJrfrAWcUXfiPWnn9jKPVCLfu8p5cEEIVEP1nHE6yAzoJpZU+bDKgRCOw3hya/PrBMZUmynJZT3hArRVHgb5nH3x0jOABJdP5WejKIhCGOyD4P9rEDswQShnpbkGKzdjECdvdxuMiyK2ce9YrAHW2AozfHX84zR0IDp6HIeMZGq00WQPsz+s2nIhA8e7vfz5ykPQgi+/B/ODTCrLg8ImM2BlPa6f8Ae8lcNa5zt1nPiuMdEO/jBjOQxDZyYOoGTXGOrRQWPnFE5eVl3jjxSFO8ZpxNnGMBDpvZnJvvEq7x84syr5x41lciZvEd7ynRgY4bc8jEzQxtXJjdZMmAcYp79XOMy1AVfHnBqtIH5PWG0qja/I7MLGDjHk3nJ6wqJcFgHhDrAuM+MBW3fvGGwOQ5cco+fLlvHGOlcVm7zrFOOMirombLAnGM25nGpm3DJW1/GKCT0qLgGIgiNRvWOKAdLDGH175FBIXqejzqPsFoRCh3zrChcHA8OMOzpEcQb117xgEaienzkHTFIx68OJxJdLKda6fWPGp6OvfrJjWNDoe9c5dlipAjg8qd8xcDGddvONFFw3RPGEImwRN4xNo9mIA26PZhITb585RFX1hPY0xK7EQMq8/9wquHPzi78YKODEHHldcOJDCsxG5L1jKBS5qNQUA5zvgwhEYL/wCHjPPwPljzzlBRTrXBxuPPvBSmCiUHjw/MwvNufgMrrjoMaRFoEH3Wvph9DhO98Ayu+rgZAQBaXle8BBgsgdB+/wDtRwFIG74OR3v17c5/cIo9b5d85Y+U105T3jHLqVDeXg3ZjbEdxSdPHjBpzUbsd+WzEMSMDb+rY/njLSAIABBN+Vesavvlqtv2OvqZGG4IA+3t0GKFdiCi1HwctwdoVWirfHDxjjkTemNXj4+POIiB1oI8J884y3c0EOob462fjCcp2hx0HKaD63JpwlaHT9cDJvDaOV8OjXvHdEgCgF0a65MKAEDnJP0/x2iBqERhqAHPPH6zBV0OEvxiazmQKwK95+//AHEi3zgbMgrvNZk7xXrfvFVDjCs6wA7wkRN3nxgAn3yIkd1e8BoBymLQEeXcykZd1V+mRJXuJi6mTWbOTAbESgmWNiqr5woJptMoNlcq8r5y3AlIKgz+8748JD/mavOJwRmLwDA1irxMBLgXFHeCEDIcucwLiklEI2H+coEXpmEVankZR7IvjIupETWu8dxI3h0mAneGm2OSmemCWK+OcfFqpQp594ZldURLmu8wIzFnvTSmMUImKGYNOcaPjFNOzJXeDRduEpd+8YuqLzxiaNuF849qA84KP1CUd8N39crNlUu08+/ph5SElEbiRaKtH45wsFBPzgjbu4wSR5pcvKtFaGHIa/IcVGs4bT4evjJgo1AI88g76xRnEVVgB38YeQqoUNPq5rhEbHThCNHNyLuD1ziRI7J3iLsE83FpGD983alPD16yOnQVyQBD4wAiby2H9YcoBBSnD7w5MWiYuMZJjvrHDVVACr6wSHnEnyec86PIL84sh1X1wK8VV1vHVv8ApjXdF6VjR0Pkv65w99UfU+Prg+7QVRXju/Oc8IjAjvZrB2DhkieHaZ06Op0PPhYSHShMvQ2fSZL546Fnblr/AFwDGwSsx3eq19+ZhO9o8uwePK+zjWJRCiYUO1en4xMQURUro8nBeeMMBNcGiC7dpMYdBBKbuuhKdefGKwIYhY2w0Rv1wSSSaoapd9/dejCnnwkStOl/nHtbi0Im+AvnE5ABAeH15nvAhPBoJp2eeDjwZbFipW8N+z+M3mZIAGOvXb9sFR10KPV4uvxhsQCgUn4NzCNTSAKLD1oxv0gLo02Ojk/jAsPsSDV16eCf3kSAoFS3U7e7+lwbohsoHQ9auKFEIDpPvkKYQjhKYSdBE84lyq5weccdc4BTrHE4cWjs94H1w0+MdN84LjRtwDRwsK+LlDXLEbeWMldva5S4vpkVxR/vFPPGK31jxrFTfebXye8L4eMpuSrK8s5wiVR1qpkJsHy4CvA89ONdCu0D/ObBrXWEu9TGqDrGuW4oIc46WBzjQY/OAL3hUIBZpxUi7f1Ma0V5xa6dZXI8Y97ecZCDsxJpCrCdn+mb37ElOh+1x6iIk6bziWgaigcOQCqJsmRQisTjDcayElr9K6xVOWCnG8NBiuifHmfjBAbU8XCESZ8sdtms6hX9sgaT24B8vHeSh7uWNFQqrtW84uyqec5G0eveLW8XjGxREmwxN3XOIEOTZhsKXeBr41GpjScWQhJHnh3z8YFhwAK+h4SZPHgvIMMKgl3p3jrUeScONAOvL3nYNHIZs7b5mnGPkxFLq6veG22uGvn1glmHxMuh+MTxxiOBXBjAx1AwOipGNvx4P/NXGtBtfgxALChY9vlwr4rWyeN8GGbllBjt8WPSgWtx5a8r7xaloaznDd+GI9ahMj4HD3cG8qcjJzelw0lAK1318/7jDtXY1F/jxgvVYAgxlXacr8dY5AygAEV9HBPb5wfU0IFVqBtF5cQ1gRNgnhoA/XzjCkwgM7V119jzgUARI+47ds6KeCqmRptBJw+XwevWDCkylyG674+3rL1NqCl0D323L0LSqJkOdO37nnALjrBHl+8wHK7mjkqnTrXwecZFMghXavb/ABgBdAKzV0fhf84UqBZdhSnp0YZqyZVb0dvH2zkIoSCzc65l/kzcfoWzva8O37GOqLQcirBe8aFELoQdp21/XziE7p3FTpU23jXwY5hDYohtPKa38ec2TwKsDpDgNP8AOIbYBKp7/wDB2AHlDw4yB8npHjCI43XWFCc+8RSGBKvXOHJ7/GS93NDBnOczqYf94a4uLz5xbw4q7x0E1i7y9dYp5ytxnNaW6Hx7xegvlQB+7h83xglgzzj1MyRzfeEIg+cUcg4VGYsYEcR/GO0A+mmWKp9862/xljT65Y7TNoWHejN7DyvGLYa+cAQ2s3nLA5rzh1wq1/3O2pijrGU/84X3dAK4RIDKk+mFJh1jqK7jcU0HkTjAhYjiMdEYaXLUaZYq5xgTkcuvnA3XTjTf+s1J9uHJCDXrHo2ddTChye8Amgf3wkPCcd4y5oDaq6PeEWERiPJ6xeFJoLZeOZ7xCTAh+GnzmrIjhQpNN8ORtNQ1R9/GSmh8YxBNQgZuHk5DAkJnFdQxNwg95NKPGMq44ylDS+2F5wffOOjXPeN4jimwuVmt4gAtxUlFqfRPXv8AXOOEQd4oqgduBmzJYNecH80FUUOPRhwBVKavkeeOMqeIgHkF40P8YggWkEDwXvlMK5lUqNDngePpxhdoorT69+nJ9IVq98+BxMftuRIFu39H85IkiGQ+dc+bgJEUdg3tLy+sKPSsC0voD8zVzvFwDDZTg06+MPkPZY02Ho24NXc2wss8jqfXA4TZKBDY2sr/AKYV9BBBNr7d/p4yMAwAJbPW7P0POBuqVBBamvnR+cNoCnQ6ZufXAbAAADfvdH94dxTgZHhyAYipzC8/Nh98bbAad03Sy8b+ca7QJgGjxO13X+ceTBCJaS0fLsLhAeVgtt3+f0zb7GpdPC+px84MicZAyB/Ka949xEJp1zfPU/vBckAbAJt99zLXDQVDn07v1xRmqqa2HBvfG9Y6gHY/L75y6GiDedEO+cRGlR85Ywn0WId9f56yI5rhswqafplQexOLccEAHJBcryZaesOM5aykxd46t3ijrFi+cXeOPFH+sfJg1g0DQmvg1h1EwKIvJijoMcU1c3k4xE2ZK71nX1j1bi/LiNLi+jN3q5aarjRziqm+biOuXW8BnB85FwdAw+JHvFRlxMuSckFK4pf31hOKhvFzRQkLBHPpMYLvaj4xwJJ3kcQzl5zVodZESCk35uIIelRI844iyZz24uMikvHjFKXbjvxu4QAmzvvJMsfeRRpu3FGOkjdjkh6+mHZmzHjRgRopkUrUo8mULBPJhY6n8OQVQTRTN9k0mtDdeeL9c26IvRc6q9x4cE1HIslySHDu6xBRD7OIDSnKlMtgTkjxjrhqG46Uc9YE5ni4GBrimnKJHVx4gABVcHmhTkvhe8AAACAHGe5kLMBiECgXn1xmyZRWSqcvgM2y6FUh0+fEwx+ZgOXvnGsgrZr2+T+MaAcjlG369Zw4AG72SgpPxhqYkYd9nsw6ym1Se9Y8CgkG+87TnWWT9bany/b85UqvZzsPTzz5w49FUlN9A6Nc/OTngBMUPM4XTt7e5hY0yRVRHjw1Xy8XUnFBACkgdLwfTFIFYQBwun88ZeNDNwA16fHU7wcBgAPRt8NPPp9YSiGbS2l18/7WSVaRcogeh/OT3EQAApoOwsxnoQ6XDf8AWNy20Coq7DndMSWREdT30S/f4xgEUTRatvh3L/GDbHK0CfG+OMTLHIlOlruWh6+MGgTke39P4clXABNOzT1sxvGqoLC696/OMQWKPbyd11kW5zhYmvbp+/1cdRtpeczg3+cg04EG3aeTXjCpwgE6XeuuNvvGSJLIoHj/AMsZNnziWi60+Bwp8GGuBMEZTZyNp4w9d2MlxoFchJnEyTbjxouJigW7xXHVwsIgML3nvxht44wbgz2LMlXwHebgSoA8+8ZzvCWtecLTrrG9rRKIS3xzzjQMgJVPP74HgcqJklusjH84YUMvnHE1kxV6zZZMVkZm5vcxC47MR4wGvJmlDFfMwEoTBLkdoA4zVo9GLEhlnv4zWwXA9sjcSeKO3g6wvBRdUF/C94RtBZXjCarByV4ws9qJzg5B9Yjc+uCzBfOWD53iNzT9cKEuY7fD1h7baE1nR5JN4D5Emh6x6rzyKeUxWrdXb1i/Q9tDEMM9gGMAgHfnedLfnJtvGS9EenKUEHkusnuRaUyLziRlOzCSqQoZuV31gdrxlF3OsHv1HQBeV/bCozQG348H/iw6Cw5cLlQFdnv5yAwgYUr+uOwBNWuDwD6Aiaq75xQHFl49cX84ix6egy8V31z/ADgg0SinPDf5wwGoUVspw8t/rGoJrBNbo94aK2koSaavnnvvF+HWJ1bXjnAg0Smjb5Ovn85OFIq3EHt9TIsGEt1d+nP294u99hDPM87n8ZZdYICQ1TtRb+uPSvqWQ53y7nzjF6gW2N1YPB9fWJXuoYa9cLH8ecd3PiCoa/E++IsFKTu0nq/p7MfriBAiaa8E/jILAQqCmj31fnHOQUwU77XPP64Rhh0CdnHXj645rFS0U6fjeQY0UyLvTxwbyj8qiA4v5ytnYjMGnng+/vG00XpaYHjLEciSs/vEbuglSTfl5PuYtKlTtKIfgP1wlPY0jkJwO/w4+VtAgzzfPGNsZINC8f3gioGqD71P95cEc8CjRwei/n1jIkU3OMkjl1REK8x+r9PeCKKGpEcdnMHZxitd4cawfeEYP6KZdnJytcIBHAAdYomu8qc5Gzl84vnHEybcMTvJw1jOX484kSpEem45SKuHIkxo2HOGI4Wx/wCfXGjNhQL39nP1zhccicyPaD/tYqGgQKxu/bWWKcOdRrF941xHO/GOyYFLmjjgKnWWypw47wuKFJZg23HBKAPNeMR1tSJTm4DvKYUbzds5yaakHb6wTgnY5mIFAEdu/WIj1XTkgC08np8mPwoijp8+jBGTkraPP45wBDaqecbaaHxvDvXOBF1Hxig0NILSb5/bD9cdd4YmVNZAIhME6nORdvzgbYEI6avnhcm68qw4L1PGagAQ/OE60cmIhjOguSdu8VPGMsHWPCZR5TzitnE1kNR9eME5weJjBFvEy9I1UnpP5wrJoH/j4UK1gHnBG+QEq71+2OBJUA2HwXnHIODT5+O+dYa5odIA8E5feS80AFjW3nnAvRbdg93zmolCANtadacARtiBfnjWUk2imhBJzh7sQAoHh4D484pULKW3SHXiYJoBQjB7nXGEqihAJTqn+/GCSgguK/4zfcCRQA4vdYAY8MNgYqbd6Og+vzaBgQUN5D9XxhBFEAiFa72l443lbMxDRpHR0fTmZAFRGWjRXnpxENdIaIweOOcO8VCKKGS+KX7+cCjcKMCjl7rr44rjWEsiIRhOyJ9sp7gyR11o9fGQ9DSVSJp3zbjCEzXa+H1tZ8ZKYolBs7Pxr48ZGHUFhEH68p9cgCEQA/7N3IOIKKipWffL82wCg2M27sxr2WgA7V5X+PGAQQNRw2eRqGBnZASmK+3P5yrCaRCvHj3lyNgwJ3T3H8+sIxCuEx74GG7a2QcGXl085rxxAjbovbs/zhxjU6IiYdcCImu/885DYpV8+MeRgvGD9M42cYQ5wdYFcmg7wi55zhQ3jVvrDfzjhxhe8k1q4pULc25tmE4tbXlzcIZDBJ3N5a0XvvD4oNEUj59YtV1a77wi8pkIqn24/L5wOgGhDU5/P3ct1584y8Yx8f8Ako6z6ZBcQ6M2PH/hhkLomCL4cKaI48E3jjOPnOH/AIKPnE4QDhUBos4Mcs1Q98/OeVAxPs63MXk8RPeUPmeMPDCBCoeTzrCvNWI1QT6uPXA2LB3SPN59e8enLQ51dftgJDnJOKBm3B0kv3zaTAjMNcZ1gEJf0yojzkUbvvDe0uPHX1n0uA6r5wjR+caQcTrEvrFh4cN84ha6w9CTmY0ww+XAAq+sIR4gr7Hy+sBAAIB1/wCbmAb1C8fOaQuVVdn8S5QSCBqNcvhwglw1P8MC5wAaXl5XqYVF4BEr4MVEbA2LUq+Ggzi54AnhS8G+cNQskGhLvvnBikBSJfx87xqIwaIk4fL3lgU1IinSRfeEoIDUKN1fW5cTaQWVTOrmjJ+QNHn5/vDlMNKvud/GMapEgsN/Tjft+utiWgE78u8Ua6xGD8LXL9ugNKMeWEvtwePiSQ099H384urEDhoGGzdnx4wxBxE0SRb0a1+2NPbAZtwfGGmhjRWWkX5X1i0glbV063wm37cawiGBQrU62Or6xwMlBVAXnx24xiGMwWoe9c4tXk1ZBG3zvHNiFpb29msOiVXUN2vGtz36xvLLINTe+fD4OLhkCFhtkrR53r5MJGfQhtrv30XJJRUaS8J0d4O4KEIMdh/uscFqpmvB64+2EkOzkiCkc3g1hQaURIiJfbCCf1wTPBUg1zHn5+PGSstaU20DlkMAxeQUsxMAyAp2eWOdQoen/wAIcZDLqc4O8feRbc+84tPOV+mP5xZ6xd4GveS71iXLWMqvzi33kqOP4y8mLMGOItLl+cQVriOLvGSB6pikDEmk6wjmnEnxklzzeMD511nWSwnTrCjHeNbQe84XTiCnWSZG5pMc3kuGawvqMtoPN6xXQTXHnozhhASycZyPCU2J5wEBRvCGwHE1hjkHbd4Sr1MfMxLgO/JnOP1MDe8d9bwQI8Cp1gBVf1xdZoNzfjr84rd84MCYidzIBduIC6MIHm5CqmBsAzRLi6Mq6d4OU1xk1cKWmhesN3XQgfv8YVDKbh8eD/xYW6xxoLHFnXrtMZquoAZpU+MXpYSG0/j84UjdEoPXWWA9Etg7Q5fX/cJqBKueaBnX9YjziCBDj25BMACrAcRwe8f4lLS3XnEezI2pvTLq81OC+dcYkoNOinftxpJSmRDyO5hmFYZE1rfPnH5KQYEdeHRjHKWgutwyaF2V5Hf0y7FgxkBv4b+wdYzetKkRAeOX4DHwxoGFJTym/wAe8kywIFm9h0Edv5y6IjSIS0F6V2+jFM+yGtVvlQn19ZbSlShW3iTr1928LQggvbo4/TBYwANUSNcoL/tUUnMHcF6sduakbQd0kP8AdfGRSMKAiW+XJ9zy42toeojnwDx+11JHYjUE18759vjHS3gDkXw0cFfePLIHiupffM+jkhtLyILr3xzgeSJVEpw6NTBPAQIArE6cn+4nVgdwVNfbWCA8losfnvvETqUoBpv26e/OKsEDsWu/Lk1vhxNBZhbgLrxtDNWHQSihoPA/XWS65Imo+xNeeOcEGXF2qfxgAmxMLw49Y8iuAdPXw6+2Oi4dOd51zes35xhQ154Mbm2esjwYDI58dY7+uJ74wPPeBXWReDG8ZQ5dzOHHG2XF5x6Y6e8r5w28ZS1TlcHlDqaLiGRCTfJhpsR8eMtxxky24rPGIuHG8WWOBvOBOXeRzzMu45w2dxwI8cYgu+c47y27Jm8jm5DTvD9yQpU/d94gk+TZNc+8pGZpYHWaOgUN4e7okyjYN+mIHdoYj594UBpUkTz7MdXjGW83CWCPSYIivlcT43lp84jUuGtOMI5L4wQIaMM3PIYVyX3nDrfjPhhLvAn84cTrAAqdELlNMUS8f4wXEwCf9f8AwVTozhIBXf8Anw4eHqJIDbOsgliE0BDQNtx2islPRyB4W9cXGA5Egf4ll+uRNQB082+DHdKAE7Hh6+M22QjB9eAMaLKSE8F68tH3yTmRQSXnjo1jKWoIe+uo6mMhYCYKY28HGPKGGQfOuX+M1u3Qku+HJZ4Btp8njKMOURE+b9eMMlalCL1h7dGEA79ndxIqhRc5flTCMeCN0dC8AAXEkhxU4gl30u78uS6hYbFDw2d+cKLYIZUkb4Cvztectb6N2w10UH6V53gYHUmlnbJv0f4MB2Nikbfa/E+M3xw6pDh9j+cLjRGqjQ/nX9YYNSQqehOS7vo84wxCAUToPZLvEtkAhCG3xx+nOEQ0Q2K8r28a9+tyscUyiSodE39vOxTOIoAYejv7ZLCdQEHg+2vvjGGzm8cw9YAREBAo8e7Pzi0PVrQIzs6bmhjae1pj839TCSMgole3Qbn37x/CkoDRhdUJfvgRUrKKUJ58/OARlAQSFOh++N4ei6N83zqHz6wOxrK8gD9Q4qPlIz0Y8YFRInhphupQ3vo4cngw/wDAh5MNdYYvs8Q8bwgSFjFx/wDOWBcOGsGV5MCNZrywK+cq71nouGFkzZxcXGq+TFOXQY7Xr/w9402raYS0nh5wusxrBSysFDF1epjy+cHOXn/znA1k35xJh5Pvnubxb+2VT3nG94yt7ws1nTkg+HzgESWj04xkRdvjecXKU094fW5uFecltmSu8c06GRI29OMeTEaD8uM22bPOTx11gmTXvJPY5wJq/bDaBv34yJ4HeHU5955sETUMgHTOvWeAXeP0yALgIhxB237vvAn/AI8Qux2XxlLikBdZcibRUAanXWD1GsFfLy50YIhHei8fJv8A5i1QNG4cKb72J17hfWvAHr6tfbEK82CCW6NAv6c4yY2bjgowZzWsjg8B2/3jOUiHUOGw4l1hhj1ikBVpD3+ueUUAH26+MV8BEtLtTWvW8MgUIox8vPxgxuTSVJzjpAtChA9eMKMHYL5f3iMR0NSPdnHzhmuIbFdeM//Z";
                                $("#Imprimir").click(function () {
                                    

                                    var nombre = localStorage.getItem("Nombre");
                                    var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();
									
									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
                                    var doc = new jsPDF('p');
                                    var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
                                    var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina
									

									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
                                    doc.autoTable({
                                        //html: aux,
                                        ignoreCols: [1],
                                        didDrawPage: function (data) {
                                            // Encabezado de la pagina
                                            doc.setFontSize(10);
                                            doc.setTextColor(40);
                                            doc.setFontStyle('normal');


                                            // top/ancho/ //Alto
                                            if (LogoActual) {
                                                doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(13);
                                            doc.text(leyenda , (anchoPagina / 2) - 10, 35);

                                            doc.setTextColor(77, 77, 77);	
                                            doc.setFont('Times', "normal");
                                            doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' '  +  'C.'+ ' '+ calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.',(anchoPagina / 2) - 40, 45);


                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "normal");
                                            doc.setFontSize(12);
                                            doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times New Roman', "bold");
                                            doc.setFontSize(12);
                                            doc.text('TIEMPO_AIRE', (anchoPagina / 2) - 18, 55);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times New Roman', "bold");
                                            doc.setFontSize(12);
                                            doc.text('TELCEL ' + monto, (anchoPagina / 2) - 15, 61);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "normal");
                                            doc.setFontSize(12);
                                            doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "normal");
                                            doc.setFontSize(12);
                                            doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(12);
                                            doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Arial', "bold");
                                            doc.setFontSize(14);
                                            doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(8);
                                            doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(8);
                                            doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(8);
                                            doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "normal");
                                            doc.setFontSize(12);
                                            doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


                                            doc.setTextColor(77, 77, 77);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

                                            doc.setTextColor(155, 155, 155);
                                            doc.setFont('Times', "bold");
                                            doc.setFontSize(10);
                                            doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


                                            // Footer
                                            var str = "Página " + doc.internal.getNumberOfPages();
                                            var str2;
                                            // Total page number plugin only available in jspdf v1.0+
                                            if (typeof doc.putTotalPages === 'function') {
                                                str = str;
                                                str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
                                            }
                                            doc.setFontSize(10);



                                            doc.text(str, data.settings.margin.left, altoPagina - 10);
                                            doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
                                        },
                                        margin: {
                                            top: 35,
                                            left: 15
                                        },
                                        columnStyles: {
                                            0: {
                                                cellWidth: 50
                                            },
                                            1: {
                                                cellWidth: 120
                                            },
                                            2: {
                                                cellWidth: 30
                                            },
                                            3: {
                                                cellWidth: 30
                                            }
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
									html: '<br/><br/>' +
										'<h6 id="msj"></h6> <br/>' +
										'<br/><br/>' +
										'<a href="https://www.recargacelulares.com.mx/Home/TiempoAire">' +
										'<button id="ConRecar" class="btn btn-success">' + 'Ok' + '</button>' + '</a>'
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					var monto = $("#sltSkuCodePaquetes option:selected").text();
					
					$("#RecargaTelcel").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodePaquetes");
                    var strUser = e.options[e.selectedIndex].text;
					localStorage.setItem("RMontoPaquetes", strUser);
					var telefono = $("#n50").val();
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
								$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('PAQUETE TELCEL', (anchoPagina / 2) - 24, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('TELCEL ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});

								//-------------------------------------------------------
								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	//doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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

										$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('PAQUETE TELCEL', (anchoPagina / 2) - 24, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('TELCEL ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});

								
								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					var monto = $("#sltSkuCodeInternet option:selected").text();
					$("#RecargaTelcel").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeInternet");
                    var strUser = e.options[e.selectedIndex].text;
					localStorage.setItem("MontoInterT", strUser);
					var telefono = $("#n52").val();
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


								$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('INTERNET TELCEL', (anchoPagina / 2) - 24, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('TELCEL ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});

								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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

								$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('INTERNET TELCEL', (anchoPagina / 2) - 24, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('TELCEL ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								
								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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

					var monto = $("#sltSkuCodeMovistar option:selected").text();
					
					$("#RecargaMovistar").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMovistar");
                    var strUser = e.options[e.selectedIndex].text;
					localStorage.setItem("MontoTAMovi", strUser);
					var telefono = $("#n2").val();

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

								$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('TIEMPO_AIRE', (anchoPagina / 2) - 18, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('MOVISTAR ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});

								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Movistar"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					var monto = $("#sltSkuCodeMovistar2 option:selected").text();
					
					$("#RecargaMovistar2").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMovistar2");
                    var strUser = e.options[e.selectedIndex].text;
					localStorage.setItem("MontoInMovi", strUser);
					var telefono = $("#In1").val();
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
								$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('PAQUETE INTERNET', (anchoPagina / 2) - 26, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('MOVISTAR ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});

								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Movistar"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					var monto = $("#sltSkuCodeMovistar3 option:selected").text();
					$("#RecargaMovistar3").hide();
					
					$("#EnviasSms").hide();
					
					$("#Mensaje").show();
					
					Swal.showLoading()
					var e = document.getElementById("sltSkuCodeMovistar3");
                    var strUser = e.options[e.selectedIndex].text;
					localStorage.setItem("MontoPaMovi", strUser);
					var telefono = $("#Pq1").val();
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
								$("#Imprimir").click(function () {


									var nombre = localStorage.getItem("Nombre");
									var aMaterno = localStorage.getItem("Amaterno");
									var aPaterno = localStorage.getItem("Apaterno");
									var LogoActual = localStorage.getItem('logo');
									var leyenda = localStorage.getItem('leyenda');
									var cp = localStorage.getItem('Cp');
									var estado = localStorage.getItem('Estado');
									var municipio = localStorage.getItem('Municipio');
									var colonia = localStorage.getItem('Colonia');
									var calle = localStorage.getItem('Calle');
									var numExt = localStorage.getItem('NumExt');
									var numInt = localStorage.getItem('NumInt');
									var contacto = localStorage.getItem('Contacto');
									var currentdate = new Date();

									var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

									var doc = new jsPDF('p');
									var tamPagina = doc.internal.pageSize; //tamaño de pagina (dimensiones)
									var altoPagina = tamPagina.height ? tamPagina.height : tamPagina.getHeight(); //Alto de pagina
									var anchoPagina = tamPagina.width ? tamPagina.width : tamPagina.getWidth(); // Ancho de pagina


									//doc.text(20, 20, "Recargar Electronicas org");
									var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
									var data = [
										[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
									];
									doc.autoTable({
										//html: aux,
										ignoreCols: [1],
										didDrawPage: function (data) {
											// Encabezado de la pagina
											doc.setFontSize(10);
											doc.setTextColor(40);
											doc.setFontStyle('normal');


											// top/ancho/ //Alto
											if (LogoActual) {
												doc.addImage(LogoActual, 'png', 75, 10, 53, 20);
											}

											//doc.setTextColor(77, 77, 77);
											//doc.setFont('Times', "normal");
											//doc.setFontSize(12);
											//doc.text('Atendido por:', (anchoPagina / 2) - 13, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(13);
											doc.text(leyenda, (anchoPagina / 2) - 10, 35);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(9);
											doc.text('Direccion:', (anchoPagina / 2) - 9, 40);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "normal");
											doc.setFontSize(7);
											doc.text('Cp.' + cp + ' ' + estado + ' ' + municipio + ' ' + 'Col.' + ' ' + colonia + ' ' + 'C.' + ' ' + calle + ' ' + 'N. ext' + ' ' + numExt + ' ' + 'N. int' + ' ' + numInt + '.', (anchoPagina / 2) - 40, 45);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 50);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('PAQUETE MOVISTAR', (anchoPagina / 2) - 26, 55);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times New Roman', "bold");
											doc.setFontSize(12);
											doc.text('MOVISTAR ' + monto, (anchoPagina / 2) - 15, 61);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION: 51023648', (anchoPagina / 2) - 25, 67);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('FECHA ' + datetime, (anchoPagina / 2) - 23, 73);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 79);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('TRANSACCION EXITOSA', (anchoPagina / 2) - 25, 85);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 91);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text('IUSA_UNEFON_ATT', (anchoPagina / 2) - 23, 97);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Arial', "bold");
											doc.setFontSize(14);
											doc.text('MONTO : $' + monto, (anchoPagina / 2) - 20, 105);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('Celular: ' + telefono, (anchoPagina / 2) - 20, 111);

											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('AUTORIZACION: 885236 ', (anchoPagina / 2) - 25, 118);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('Llamadas, SMS, Whatsapp y Redes Sociales ', (anchoPagina / 2) - 30, 124);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('ilimitadas, Navegacion 5GB, VIgencia 30 ', (anchoPagina / 2) - 28, 130);


											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(8);
											doc.text('dias, Dudas o aclaraciones *611.', (anchoPagina / 2) - 25, 136);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "normal");
											doc.setFontSize(12);
											doc.text('-----------------------------------------------------------', (anchoPagina / 3) - 10, 142);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('ATENDIDO POR: ', (anchoPagina / 2) - 20, 148);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(12);
											doc.text(nombre + ' ' + aPaterno + ' ' + aMaterno, (anchoPagina / 2) - 23, 155);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('[PV43384]', (anchoPagina / 2) - 13, 161);


											doc.setTextColor(77, 77, 77);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('IMPRESION: ' + datetime, (anchoPagina / 2) - 28, 168);

											doc.setTextColor(155, 155, 155);
											doc.setFont('Times', "bold");
											doc.setFontSize(10);
											doc.text('¡GRACIAS POR SU COMPRA!', (anchoPagina / 2) - 28, 174);


											// Footer
											var str = "Página " + doc.internal.getNumberOfPages();
											var str2;
											// Total page number plugin only available in jspdf v1.0+
											if (typeof doc.putTotalPages === 'function') {
												str = str;
												str2 = "© 2019 www.servicrece.com  Todos los derechos reservados.";
											}
											doc.setFontSize(10);



											doc.text(str, data.settings.margin.left, altoPagina - 10);
											doc.text(str2, ((anchoPagina) / 2) + 30, altoPagina - 10);
										},
										margin: {
											top: 35,
											left: 15
										},
										columnStyles: {
											0: {
												cellWidth: 50
											},
											1: {
												cellWidth: 120
											},
											2: {
												cellWidth: 30
											},
											3: {
												cellWidth: 30
											}
										}
									});

									doc.save('Ticket.pdf');
									setTimeout(" window.location.href = 'TiempoAire'", 1600);
								});
								//$("#Imprimir").click(function() {
								//	var currentdate = new Date();
									
								//	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
									
								//	var doc = new jsPDF('p');
								//	doc.text(20, 20, "Recargar Electronicas org");
								//	var columns = ["Id", "Numero de telefono", "Fecha/Hora", "Folio", "Compañia"];
								//	var data = [
								//		[1, $("#n0").val(), datetime, "00000000000001", "Telcel"]
								//	];
								//	doc.autoTable(columns, data, {
								//		margin: {
								//			top: 25
								//		}
								//	});
									
								//	doc.save('Ticket.pdf');
								//	setTimeout(" window.location.href = 'TiempoAire'", 1600);
								//});
								
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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

$("#btnRecargarOui").click(function () {
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
						success: function (checkTransactionResult) {
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
					title: 'Procesando recarga ¿Desea continuar?' + '</br>' + 'Al seleccionar que sí, ¡no hay modo de revertir!',
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
    var bitNip = localStorage.getItem("bitNip");

    if (bitNip == "true") {
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