//Esta funcion realiza el envio de correo al administrador nivel 0
//en esta caso solo es manlio diaz.
//Solo es un correo de confirmacion cuando un cliente, vendedor o usuario se da de alta o da de alta.
function EnvioCorreoAdmin(){
    $.ajax({
        url: 'https://apirecargas.recargacelulares.com.mx/api/Cuentas/MandarCorreoAdministrador',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                strCorreo: "bugtraqqui@gmail.com",
            }),
        success: function (response) {
        },
        error: function (jqXHR) {
        }
    });
}