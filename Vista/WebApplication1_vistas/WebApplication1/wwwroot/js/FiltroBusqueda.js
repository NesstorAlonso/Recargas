//console.log("FiltroActivado");
$(document).ready(function () {
    var busqueda = $('#busqueda'),
        titulo = $('div h3');
    $(titulo).each(function () {
        var div = $(this);
        //si presionamos la tecla
        $(busqueda).keyup(function () {
            //cambiamos a minusculas
            this.value = this.value.toLowerCase();
            //
            var clase = $('.search i');
            if ($(busqueda).val() != '') {
                $(clase).attr('class', 'zmdi zmdi-close');
            } else {
                $(clase).attr('class', 'zmdi zmdi-search');
            }
            if ($(clase).hasClass('zmdi zmdi-close')) {
                $(clase).click(function () {
                    //borramos el contenido del input
                    $(busqueda).val('');
                    //mostramos todas las listas
                    $(div).parent().show();
                    //volvemos a añadir la clase para mostrar la lupa
                    $(clase).attr('class', 'zmdi zmdi-search');
                });
            }
            //ocultamos toda la lista
            $(div).parent().hide();
            //valor del h3
            var txt = $(this).val();
            //si hay coincidencias en la búsqueda cambiando a minusculas
            if ($(div).text().toLowerCase().indexOf(txt) > -1) {
                //mostramos las listas que coincidan
                $(div).parent().show();
            }
        });
    });
});