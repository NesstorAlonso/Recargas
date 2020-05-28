////

    $('#RecuperaContra').click(function () {
      
        if ($("#ICorreo2").val() == "") {
            Swal.fire({
                type: 'info',
                title: 'Campos vacíos',
                text: 'No puede contener campos vacíos'
            });
        }
        else {
            $.ajax({
                url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/ConOlvidada',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        strCorreo: $("#ICorreo2").val()
                    }),
                success: function (data) {
                    Swal.fire({
                        type: 'success',
                        title: 'Solicitud confirmada',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Swal.showLoading()
                    setTimeout(" window.location.href = 'https://www.recargacelulares.com.mx/Home/ContraRec'", 3000);                 
                },

                error: function (jqXHR) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Verifique lo siguiente',                      
                        showConfirmButton: true,
                        html:
                            '<br/>' +
                            '<h6>1.-Usuario no existente</h6>' +
                            '<h6>2.-Correo invalido</h6>'
                    });

                }
            });
        }
    });
    