//metodo que realiza la funcion de carga la imagen para despues mandarla con ajax en body
$(document).ready(function () {
    $("#VPre").hide();
    mtdConsultarLogos();


});
$("#SubirLogotipo").change(function () {
    $("#VPre").hide();
    let input = document.getElementById('SubirLogotipo');
    let sizeFile;
    let file;
    let archivotemp;
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
        if (logo.status == 200) {
            Swal.fire({
                type: 'success',
                mode: 'cors',
                title: 'Logo guardado correctamente',
                text: 'El logo se cambiara cuando vuelva a iniciar sesion'
            });
            setTimeout(" window.location.href = 'SubirLogo'", 2000);
            // console.log(logo);
        }
        else {

            console.log(rutaServidor);
            console.log(data);

        }

       
    });

 

});

var archivo;
function mtdConsultarLogos() {

    let linkImg;
    var idUsuario = localStorage.getItem('idPadre');
    $.ajax({
        type: 'GET',
        url: rutaServidor + 'Logo/mtdObtenerLogo?strIdUsuario=' + idUsuario,
      
        dataType: 'json',
        success: function (response) {
            for (var i in response) {
                archivo = response[i].imgLogo;
                var linkImg = linkArchivo(response[i].strExtensionLG) + response[i].imgLogo;
                // console.log("Liga: ", link);

                var imgB64 = document.getElementById("imgB64Obtenido");
                console.log(response);
                $("#logoActual").text(response[i].strLeyenda);
                console.log("eSTA ES LA LEYENDA " + response[i].strLeyenda);
              

                imgB64.src = linkImg;

               // $("#imgB64Obtenido").attr();

            }

        },
        error: function (x) {
            console.log(x);
        },
    });


    //Funcion para la vista previa o para poder traer una imagen de la base de datos.
    //funcion que devuel  data:application;base64,
    function linkArchivo(extension) {
        switch (extension) {
            case '.jpg':
                return "data:image/jpeg;base64,";
                // console.log('Es una imagen: jpg');
                break;
            case '.png':
                return "data:image/png;base64,";
                // console.log('Es una imagen: png');
                break;
            case '.gif':
                return "data:image/gif;base64,";
                //console.log('Es una imagen: gif'); // There's was a typo in the example where
                break; // the alert ended with pdf instead of gif.
            //case '.doc':
            //    return "data:application/msword;base64,";
            //    console.log('Es un documento MS word 2003');
            //    break;
            //case '.docx':
            //    return "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,";
            //    console.log('Es un documento MS word 2007+');
            //    break;
            //case '.pdf':
            //    return "data:application/pdf;base64,";
            //    console.log('Es un archivo PDF');
            //    break;
            //case '.xls':
            //    return "data:application/vnd.ms-excel;base64,";
            //    console.log('Es un documento de MS Excel 2003');
            //    break;
            //case '.xlsx':
            //    return "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
            //    console.log('Es un documento de MS Excel 2007+');
            //    break;
            //case '.ppt':
            //    return "data:application/vnd.ms-powerpoint;base64,";
            //    console.log('Es un documento de MS PowerPoint 2003');
            //    break;
            //case '.pptx':
            //    return "data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,";
            //    console.log('Es un documento de MS PowerPoint 2007+');
            //    break;
            //case '.txt':
            //    return "data:plain/text;base64,";
            //    console.log('Es un archivo de text');
            //    break;
            default:
                return "data:plain/text;base64,";
                // console.log('Tipo de archivo no reconocido');
                Swal.fire({
                    type: 'error',
                    title: 'Formato no reconocido ',
                    text: 'Este campo recibe archivos Pdf, MS Word, MS Excel, MS PowerPoint, Imagen y Texto'
                });
        }
    }

}