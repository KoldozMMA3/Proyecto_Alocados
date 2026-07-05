import { useCart } from '../state/cartContext';
const menuData = [
    {
        seccion: "Salchipapas Combinadas",
        items: [
            { nombre: "Papi Clásica", precio: 7, imagen: "Papi Clásica.jpg", id: "papi-clasica" },
            { nombre: "Papi Ahumada", precio: 8, imagen: "Papi Ahumada.jpg" },
            { nombre: "Papi Loco", precio: 12, imagen: "Papi Loco.jpg" },
            { nombre: "Papi Carguero", precio: 12.5, imagen: "Papi Carguero.jpg" },
            { nombre: "Papi Soli", precio: 7, imagen: "Papi Soli.jpg" },
            { nombre: "Papi Huevón", precio: 9.5, imagen: "Papi Huevón.jpg" },
            { nombre: "Papi Chori", precio: 11, imagen: "Papi Chori.jpg" },
            { nombre: "Papi Fino", precio: 11.5, imagen: "Papi Fino.jpg" },
            { nombre: "Papi Tóxico", precio: 14, imagen: "Papi Tóxico.jpg" },
        ],
    },
    {
        seccion: "Alitas",
        items: [
            { nombre: "Alitas Clásica", precio: 10, imagen: "Alitas Clásica.jpg", id: "alitas-clasica" },
            { nombre: "Alitas Urbana", precio: 11.5, imagen: "Alitas Urbana.jpg" },
            { nombre: "Alitas Glotona", precio: 13, imagen: "Alitas Glotona.jpg" },
            { nombre: "Alitas Cargueras", precio: 16, imagen: "Alitas Cargueras.jpg" },
            { nombre: "Alitas Soli", precio: 11, imagen: "Alitas Soli.jpg" },
            { nombre: "Alitas Combinadas", precio: 13.5, imagen: "Alitas Combinadas.jpg" },
            { nombre: "Alitas Cri Cri", precio: 14.5, imagen: "Alitas Cri Cri.jpg" },
            { nombre: "Alitas Especiales", precio: 17.5, imagen: "Alitas Especiales.jpg" },
            { nombre: "Alas BBQ", precio: 18, imagen: "Alas BBQ.jpg" },
            { nombre: "Alas Acevichadas", precio: 18, imagen: "Alas Acevichadas.jpg" },
            { nombre: "Alas Buffalo", precio: 19, imagen: "Alas Buffalo.jpg" },
            { nombre: "Alitas Combinadas (2)", precio: 23, imagen: "Alitas Combinadas.jpg" },
        ],
    },
    {
        seccion: "Posha Broaster",
        items: [
            { nombre: "Posha Clásica", precio: 10, imagen: "Posha Clásica.jpg", id: "posha-clasica" },
            { nombre: "Posha Urbana", precio: 11.5, imagen: "Posha Urbana.jpg" },
            { nombre: "Posha Glotona", precio: 13, imagen: "Posha Glotona.jpg" },
            { nombre: "Posha Carguera", precio: 16, imagen: "Posha Carguera.jpg" },
            { nombre: "Posha Soli", precio: 11, imagen: "Posha Soli.jpg" },
            { nombre: "Posha Combinadas", precio: 13.5, imagen: "Posha Combinadas.jpg" },
            { nombre: "Posha Cri Cri", precio: 14.5, imagen: "Posha Cri Cri.jpg" },
            { nombre: "Posha Especiales", precio: 17.5, imagen: "Posha Especiales.jpg" },
            { nombre: "Monstritos Broaster", precio: 13, imagen: "Monstritos Broaster.jpg" },
            { nombre: "Arroz Chaufa", precio: 9, imagen: "Arroz Chaufa.jpg" },
            { nombre: "1 4to Broaster Pecho", precio: 19, imagen: "1 4to Broaster Pecho.jpg" },
            { nombre: "1 4to Broaster Pierna", precio: 18, imagen: "1 4to Broaster Pierna.jpg" },
        ],
    },
    {
        seccion: "Hamburguesas",
        items: [
            { nombre: "Hamburguesa Clásica", precio: 6, imagen: "Hamburguesa Clásica.jpg", id: "hamburguesa-clasica" },
            { nombre: "Hamburguesa Huevona", precio: 7.5, imagen: "Hamburguesa Huevona.jpg" },
            { nombre: "Hamburguesa Tóxica", precio: 10.5, imagen: "Hamburguesa Tóxica.jpg" },
            { nombre: "Hamburguesa Carguera", precio: 12, imagen: "Hamburguesa Carguera.jpg" },
            { nombre: "Hamburguesa Carguera X2", precio: 14.5, imagen: "Hamburguesa Carguera X2.jpg" },
        ],
    },
    {
        seccion: "Combos Alocados",
        items: [
            { nombre: "Porción Grande de Alitas", precio: 25, imagen: "Porción Grande de Alitas.jpg", id: "combos" },
            { nombre: "Porción Familiar de Alitas", precio: 30, imagen: "Porción Familiar de Alitas.jpg" },
            { nombre: "Porción Extra Grande de Alitas", precio: 55, imagen: "Porción Extra Grande de Alitas.jpg" },
            { nombre: "Hamburguealitas", precio: 27, imagen: "Hamburguealitas.jpg" },
        ],
    },
    {
        seccion: "Bebidas",
        items: [
            { nombre: "Kola Real 600 ml", precio: 1.5, imagen: "Kola Real 600 ml.jpg", id: "bebidas" },
            { nombre: "Inca Kola 600 ml", precio: 4, imagen: "Inca Kola 600 ml.jpg" },
            { nombre: "Coca Kola 600 ml", precio: 4, imagen: "Coca Kola 600 ml.jpg" },
            { nombre: "Cola Escosesa 600 ml", precio: 3, imagen: "Cola Escosesa 600 ml.jpg" },
            { nombre: "Agua San Luis 1L", precio: 3, imagen: "Agua San Luis 1L.jpg" },
            { nombre: "Limonada Americana 1.2L", precio: 10, imagen: "Limonada Americana 1.2L.jpg" },
            { nombre: "Limonada Americana Menta 1.2L", precio: 12, imagen: "Limonada Americana Menta 1.2L.jpg" },
            { nombre: "Limonada Americana Helada 1.2L", precio: 12, imagen: "Limonada Americana Helada 1.2L.jpg" },
            { nombre: "Limonada Menta Helada 1.2L", precio: 14, imagen: "Limonada Menta Helada 1.2L.jpg" },
            { nombre: "Refresco de Piña Concentrada 1.2L", precio: 13, imagen: "Refresco de Piña Concentrada 1.2L.jpg" },
            { nombre: "Mate de Cacao 2L", precio: 8, imagen: "Mate de Cacao 2L.jpg" },
            { nombre: "Mate de Manzanilla 2L", precio: 8, imagen: "Mate de Manzanilla 2L.jpg" },
            { nombre: "Mate de Anís 2L", precio: 7, imagen: "Mate de Anís 2L.jpg" },
            { nombre: "Café 2L", precio: 9, imagen: "Café 2L.jpg" },
        ],
    },
    {
        seccion: "Cocteles",
        items: [
            { nombre: "Macchu Picchu", precio: 8, imagen: "Macchu Picchu.jpg", id: "cocteles" },
            { nombre: "Pisco Sour", precio: 8, imagen: "Pisco Sour.jpg" },
            { nombre: "Cuba Libre", precio: 8, imagen: "Cuba Libre.jpg" },
            { nombre: "Mojitos", precio: 8, imagen: "Mojitos.jpg" },
            { nombre: "Laguna Azul", precio: 9, imagen: "Laguna Azul.jpg" },
            { nombre: "Piña Colada", precio: 9, imagen: "Piña Colada.jpg" },
        ],
    },
];

function Menu() {
    const { addToCart } = useCart();

    return (
        <div className="container mx-auto px-4 py-16 font-body">
            <h1 className="text-4xl font-bold text-center mb-12 font-display text-white">Menú Completo</h1>
            {menuData.map((seccion, index) => (
                <div key={index} className="mb-12">
                    <h2 className="text-3xl font-bold font-display text-red-500 border-b border-red-700 pb-2 mb-6 uppercase tracking-wide">
                        {seccion.seccion}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seccion.items.map((item, i) => (
                            <li
                                key={i}
                                className="bg-zinc-800 p-4 rounded-xl shadow transition-transform border border-zinc-700 hover:scale-105 fire-border"
                            >
                                <img
                                    src={`/img/${item.imagen}`}  // Cambié 'public' por 'src'
                                    alt={item.nombre}
                                    className="w-full h-40 object-cover rounded mb-2"
                                />
                                <div className="text-white font-semibold text-base md:text-lg font-display hover-fire text-center">
                                    {item.nombre}
                                </div>

                                <div className="text-zinc-400">S/. {item.precio.toFixed(2)}</div>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="mt-3 px-4 py-1 bg-red-600 hover:bg-red-500 text-white rounded-full text-sm font-bold transition-colors"
                                >
                                    Agregar al carrito
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Menu;