let eventosGlobal = [];

$(document).ready(function() {
    $('#loader').fadeIn();
    $.get('https://dummyjson.com/products', function(data) {
        eventosGlobal = data.products.slice(0, 10).map(p => ({title: p.title, id: p.id}));
        mostrarEventos(eventosGlobal);
        $('#loader').fadeOut();
        $('#formEvento').show();
        actualizarContador();
    });
    
    $('#btnCargar').click(function() {
        $('#loader').fadeIn();
        $.get('https://dummyjson.com/products', function(data) {
            eventosGlobal = data.products.slice(0, 10).map(p => ({title: p.title, id: p.id}));
            mostrarEventos(eventosGlobal);
            $('#loader').fadeOut();
            $('#formEvento').show();
            actualizarContador();
        });
    });

    function mostrarEventos(eventos) {
        $('#listaEventos').empty();
        eventos.forEach(e => {
            $('#listaEventos').append(`
                <tr evento-id="${e.id}">
                    <td>${e.title}</td>
                    <td><button class="btn btn-danger btn-sm eliminar">Eliminar</button></td>
                </tr>
            `);
        });
    }

    $('#buscador').on('input', function() {
        let texto = this.value.toLowerCase();
        mostrarEventos(eventosGlobal.filter(e => e.title.toLowerCase().includes(texto)));
    });

    $('#formEvento').submit(function(e) {
        e.preventDefault();
        let titulo = $('#nuevoEvento').val().trim();
        if (titulo) {
            eventosGlobal.unshift({title: titulo, id: Date.now()});
            mostrarEventos(eventosGlobal);
            this.reset();
            actualizarContador();
        }
    });

    $(document).on('click', '.eliminar', function() {
        let id = Number($(this).closest('tr').attr('evento-id'));
        eventosGlobal = eventosGlobal.filter(e => e.id !== id);
        mostrarEventos(eventosGlobal);
        actualizarContador();
    });

    function actualizarContador() {
        let count = eventosGlobal.length;
        $('#total').text(count);
        if (count > 0) {
            $('#total-label').show();
        } else {
            $('#total-label').hide();
        }
    }
});