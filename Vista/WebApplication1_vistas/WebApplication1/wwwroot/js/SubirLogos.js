//metodo que realiza la funcion de carga la imagen para despues mandarla con ajax en body
$(document).ready(function () {
    $("#VPre").hide();
    imprimirLeyendaLogo();
    imprimirLogo();


});
$("#SubirLogotipo").change(function () {
    $("#VPre").hide();
    let input = document.getElementById('SubirLogotipo');
    let sizeFile;
    let file;
    let otemp;
    let nombreArchivo;
    if (!input.files[0]) {
        if (resGuardar = "Editar") { } else {
            nomArchivo = "Sin registro";
            extArchivo = "";
        }
    } else {
        file = input.files[0];
        sizeFile = file.size;
        if (parseFloat((((sizeFile) / 1024) / 1024)).toFixed(2) <= 2.00) {
            var reader = new FileReader();
            reader.readAsDataURL(file);//convierte a base64

            nombreArchivo = file.name;
            localStorage.setItem('nombreArchiv', file.name);
            // $("#nomArch").val(nombreArchivo);

            nomArchivo = nombreArchivo.substr(0, nombreArchivo.lastIndexOf('.'));
            extArchivo = "." + nombreArchivo.substr((nombreArchivo.lastIndexOf('.') + 1)).toLowerCase();
            localStorage.setItem('nomArchiv', nombreArchivo.substr(0, nombreArchivo.lastIndexOf('.')));
            localStorage.setItem('extArchiv', "." + nombreArchivo.substr((nombreArchivo.lastIndexOf('.') + 1)).toLowerCase());

            //console.log('nombreArchivo: ', nombreArchivo);
            // console.log('nomArchivo: ', nomArchivo);
            //console.log('extArchivo: ', extArchivo);
          //  console.log(localStorage.getItem('nombreArchiv'));
           // console.log(localStorage.getItem('nomArchiv'));
           // console.log(localStorage.getItem('extArchiv'));



            reader.onload = function () {
                archivotemp = reader.result;
                archivo = archivotemp.substr(archivotemp.indexOf(',') + 1);//
                localStorage.setItem('archiv', archivotemp.substr(archivotemp.indexOf(',') + 1));
                //console.log('Base64 del archivo: ', archivo);
               // console.log(localStorage.getItem('archiv'));
                reader.onerror = function () {
                    //console.log('resultado', reader.error);
                    
                };
            };

        } else {
            Swal.fire({
                type: 'error',
                title: 'Error ',
                html: "El tamaño del archivo es mayor de 2MB<br> Ingrese un archivo de menor tamaño."
            });
        }
    }
});

var strLeyenda;
$("#btnVPrevia").click(function () {
    $("#VPre").show();
    //
    link = linkArchivo(localStorage.getItem('extArchiv')) + localStorage.getItem('archiv');
   // console.log("Liga: ", link);

    var imgB64 = document.getElementById("imgB64logo");
     strLeyenda = $("#txtLeyenda").val();
    $("#txtLeyendaP").text(strLeyenda);


    imgB64.src = link;
});


//Funcion que procede a guardar la imagen en este caso el logo a la base de datos
$("#btnSubirLog").click(function () {
    var data = {
        //strNombreArch: localStorage.getItem('nombreArchiv'),       
        strIdUsuario: localStorage.getItem('idPadre'),
        imgLogo: localStorage.getItem('archiv'),//cadena base64
        strNomLogo: localStorage.getItem('nomArchiv'),
        strExtensionLG: localStorage.getItem('extArchiv'),
        strLeyenda: strLeyenda,
        
    };
    //console.log(data);
    parametros = {
        method: 'POST', // or 'PUT'
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(rutaServidor + 'Logo/mtdSubirLogoU', parametros).then(function (logo) {
    //fetch('https://localhost:5001/api/Logo/mtdSubirLogoU', parametros).then(function (logo) {
        if (logo.status == 200) {
            Swal.fire({
                type: 'success',
                mode: 'cors',
                title: 'Logo guardado correctamente',
                text: 'El logo se cambiara cuando vuelva a iniciar sesion'
            });
            setTimeout(" window.location.href = 'SubirLogo'", 2000);
             console.log(logo);
            localStorage.removeItem('logo');
            mtdConsultarLogos();
        }
        else {

            Swal.fire({
                type: 'error',
                title: 'Oops... Ocurrio un error',
                text: 'Llenar todos los campos por favor para completar la operacion'
            })
            console.log(rutaServidor);
            console.log(data);

        }

       
    });

 

});



function imprimirLeyendaLogo() {
    $('#logoActual').text('' + localStorage.getItem('leyenda'));
}

function imprimirLogo() {

    //let linkImg;
    var linkImg = localStorage.getItem('logo');
    var imgB64 = document.getElementById("imgB64Obtenido");

    imgB64.src = linkImg;
}
