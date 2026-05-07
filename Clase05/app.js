let productosGlobal = [];

$(document).ready(function () {

    console.log("DOM listo");

    // CLICK → cargar productos
    $('#cargar').click(function () {
        cargarProductos();
    });

    // CLICK → limpiar
    $('#limpiar').click(function () {
        $('#lista').html('');
    });

    // INPUT → buscador
    $('#buscador').on('input', function () {

        let texto = $(this).val().toLowerCase();

        let filtrados = productosGlobal.filter(p =>
            p.title.toLowerCase().includes(texto)
        );

        mostrarProductos(filtrados);
    });

    // CLICK → agregar (POST)
    $('#agregar').click(function () {

        let nombre = $('#nombre').val();
        let precio = $('#precio').val();

        $.post('https://dummyjson.com/products/add', {
            title: nombre,
            price: precio
        }, function (respuesta) {

            alert("Producto agregado (fake): " + respuesta.title);

        });

    });

});


// 🔹 GET → obtener productos
function cargarProductos() {

    $.get('https://dummyjson.com/products', function (data) {

        productosGlobal = data.products.slice(0, 5); // Limitar a 5 productos

        mostrarProductos(productosGlobal);

    });

}
// 🔹 renderizar en HTML
function mostrarProductos(productos) {

    $('#lista').html('');

    productos.forEach(p => {

        $('#lista').append(`
            <div class="producto">
                <h3>${p.title}</h3>
                <p>💲 ${p.price}</p>
                <p>Stock: ${p.stock}</p>
                <p>Categoría: ${p.category}</p>
                <button onclick="verDetalle(${p.id})">Ver detalle</button>
            </div>
        `);

    });

}


// 🔹 evento dinámico
function verDetalle(id) {

    $.get(`https://dummyjson.com/products/${id}`, function (p) {

        alert(`Producto: ${p.title}\nPrecio: $${p.price}\nStock: ${p.stock}\nCategoría: ${p.category}`);

    });

}