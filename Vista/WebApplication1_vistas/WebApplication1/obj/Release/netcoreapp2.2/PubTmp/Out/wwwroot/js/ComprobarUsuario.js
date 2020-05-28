$(document).ready(function () {
    if (sessionStorage.getItem('accessToken1') == null) {
        Swal.fire({
            position: 'Center',
            type: 'error',
            title: 'Esta pagina requiere permisos',
            text: 'Por favor inice sesion',
            showConfirmButton: false,
            timer: 2500
        });
        Swal.showLoading();
        setTimeout(" window.location.href = 'https://www.recargacelulares.com.mx/Home/Salir'", 2500);    
    }  
});


