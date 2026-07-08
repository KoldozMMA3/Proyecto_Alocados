import { useCart } from '../state/cartContext';
import { useLanguage } from '../state/languageContext';
import { useEffect } from 'react';

// Diccionario para los nombres de los platos individuales corregido
const dishTranslations = {
    es: {
        "Papi Clásica": "Papi Clásica", "Papi Ahumada": "Papi Ahumada", "Papi Loco": "Papi Loco",
        "Papi Carguero": "Papi Carguero", "Papi Soli": "Papi Soli", "Papi Huevón": "Papi Huevón",
        "Papi Chori": "Papi Chori", "Papi Fino": "Papi Fino", "Papi Tóxico": "Papi Tóxico",
        "Alitas Clásica": "Alitas Clásica", "Alitas Urbana": "Alitas Urbana", "Alitas Glotona": "Alitas Glotona",
        "Alitas Cargueras": "Alitas Cargueras", "Alitas Soli": "Alitas Soli", "Alitas Combinadas": "Alitas Combinadas",
        "Alitas Cri Cri": "Alitas Cri Cri", "Alitas Especiales": "Alitas Especiales", "Alas BBQ": "Alas BBQ",
        "Alas Acevichadas": "Alas Acevichadas", "Alas Buffalo": "Alas Buffalo", "Alitas Combinadas (2)": "Alitas Combinadas (2)",
        "Posha Clásica": "Posha Clásica", "Posha Urbana": "Posha Urbana", "Posha Glotona": "Posha Glotona",
        "Posha Carguera": "Posha Carguera", "Posha Soli": "Posha Soli", "Posha Combinadas": "Posha Combinadas",
        "Posha Cri Cri": "Posha Cri Cri", "Posha Especiales": "Posha Especiales", "Monstritos Broaster": "Monstritos Broaster",
        "Arroz Chaufa": "Arroz Chaufa", "1 4to Broaster Pecho": "1/4 Broaster Pecho", "1 4to Broaster Pierna": "1/4 Broaster Pierna",
        "Hamburguesa Clásica": "Hamburguesa Clásica", "Hamburguesa Huevona": "Hamburguesa Huevona", 
        "Hamburguesa Tóxica": "Hamburguesa Tóxica", "Hamburguesa Carguera": "Hamburguesa Carguera", "Hamburguesa Carguera X2": "Hamburguesa Carguera X2",
        "Porción Grande de Alitas": "Porción Grande de Alitas", "Porción Familiar de Alitas": "Porción Familiar de Alitas",
        "Porción Extra Grande de Alitas": "Porción Extra Grande de Alitas", "Hamburguealitas": "Hamburguealitas"
    },
    en: {
        "Papi Clásica": "Classic Fries", "Papi Ahumada": "Smoked Fries", "Papi Loco": "Crazy Fries",
        "Papi Carguero": "Cargo Fries", "Papi Soli": "Soli Fries", "Papi Huevón": "Big Egg Fries",
        "Papi Chori": "Chorizo Fries", "Papi Fino": "Fine Fries", "Papi Tóxico": "Toxic Fries",
        "Alitas Clásica": "Classic Wings", "Alitas Urbana": "Urban Wings", "Alitas Glotona": "Glutton Wings",
        "Alitas Cargueras": "Cargo Wings", "Alitas Soli": "Soli Wings", "Alitas Combinadas": "Combined Wings",
        "Alitas Cri Cri": "Cri Cri Wings", "Alitas Especiales": "Special Wings", "Alas BBQ": "BBQ Wings",
        "Alas Acevichadas": "Ceviche-Style Wings", "Alas Buffalo": "Buffalo Wings", "Alitas Combinadas (2)": "Combined Wings (2)",
        "Posha Clásica": "Classic Chicken", "Posha Urbana": "Urban Chicken", "Posha Glotona": "Glutton Chicken",
        "Posha Carguera": "Cargo Chicken", "Posha Soli": "Soli Chicken", "Posha Combinadas": "Combined Chicken",
        "Posha Cri Cri": "Cri Cri Chicken", "Posha Especiales": "Special Chicken", "Monstritos Broaster": "Broaster Monstritos",
        "Arroz Chaufa": "Chaufa Rice", "1 4to Broaster Pecho": "1/4 Broaster Breast", "1 4to Broaster Pierna": "1/4 Broaster Leg",
        "Hamburguesa Clásica": "Classic Burger", "Hamburguesa Huevona": "Egg Burger", 
        "Hamburguesa Tóxica": "Toxic Burger", "Hamburguesa Carguera": "Cargo Burger", "Hamburguesa Carguera X2": "Double Cargo Burger",
        "Porción Grande de Alitas": "Large Wings Portion", "Porción Familiar de Alitas": "Family Wings Portion",
        "Porción Extra Grande de Alitas": "Extra Large Wings Portion", "Hamburguealitas": "Burgers & Wings"
    },
    pt: {
        "Papi Clásica": "Batata Clássica", "Papi Ahumada": "Batata Defumada", "Papi Loco": "Batata Louca",
        "Papi Carguero": "Batata Cargueiro", "Papi Soli": "Batata Soli", "Papi Huevón": "Batata com Ovo",
        "Papi Chori": "Batata Chori", "Papi Fino": "Batata Fina", "Papi Tóxico": "Batata Tóxica",
        "Alitas Clásica": "Asas Clássicas", "Alitas Urbana": "Asas Urbanas", "Alitas Glotona": "Asas Gulosas",
        "Alitas Cargueras": "Asas Cargueiras", "Alitas Soli": "Asas Soli", "Alitas Combinadas": "Asas Combinadas",
        "Alitas Cri Cri": "Asas Cri Cri", "Alitas Especiales": "Asas Especiais", "Alas BBQ": "Asas BBQ",
        "Alas Acevichadas": "Asas Acevichadas", "Alas Buffalo": "Asas Buffalo", "Alitas Combinadas (2)": "Asas Combinadas (2)",
        "Posha Clásica": "Frango Clássico", "Posha Urbana": "Frango Urbano", "Posha Glotona": "Frango Guloso",
        "Posha Carguera": "Frango Cargueiro", "Posha Soli": "Frango Soli", "Posha Combinadas": "Frango Combinado",
        "Posha Cri Cri": "Frango Cri Cri", "Posha Especiales": "Frango Especial", "Monstritos Broaster": "Monstritos Broaster",
        "Arroz Chaufa": "Arroz Chaufa", "1 4to Broaster Pecho": "1/4 Frango Peito", "1 4to Broaster Pierna": "1/4 Frango Coxa",
        "Hamburguesa Clásica": "Hambúrguer Clássico", "Hamburguesa Huevona": "Hambúrguer com Ovo", 
        "Hamburguesa Tóxica": "Hambúrguer Tóxico", "Hamburguesa Carguera": "Hambúrguer Cargueiro", "Hamburguesa Carguera X2": "Hambúrguer Cargueiro X2",
        "Porción Grande de Alitas": "Porção Grande de Asas", "Porción Familiar de Alitas": "Porção Familiar de Asas",
        "Porción Extra Grande de Alitas": "Porção Extra Grande de Asas", "Hamburguealitas": "Hambúrguer e Asas"
    }
};

const menuData = [
    {
        seccion: "Salchipapas Combinadas",
        items: [
            { nombre: "Papi Clásica", precio: 7, imagen: "Papi Clasica.jpg", id: "papi-clasica" },
            { nombre: "Papi Ahumada", precio: 8, imagen: "Papi Ahumada.jpg" },
            { nombre: "Papi Loco", precio: 12, imagen: "Papi Loco.jpg" },
            { nombre: "Papi Carguero", precio: 12.5, imagen: "Papi Carguero.jpg" },
            { nombre: "Papi Soli", precio: 7, imagen: "Papi Soli.jpg" },
            { nombre: "Papi Huevón", precio: 9.5, imagen: "Papi Huevon.jpg" },
            { nombre: "Papi Chori", precio: 11, imagen: "Papi Chori.jpg" },
            { nombre: "Papi Fino", precio: 11.5, imagen: "Papi Fino.jpg" },
            { nombre: "Papi Tóxico", precio: 14, imagen: "Papi Toxico.jpg" },
        ],
    },
    {
        seccion: "Alitas",
        items: [
            { nombre: "Alitas Clásica", precio: 10, imagen: "Alitas Clasica.jpg", id: "alitas-clasica" },
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
            { nombre: "Alitas Combinadas (2)", precio: 23, imagen: "alitas_combinadas.jpg" },
        ],
    },
    {
        seccion: "Posha Broaster",
        items: [
            { nombre: "Posha Clásica", precio: 10, imagen: "Posha Clasica.jpg", id: "posha-clasica" },
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
            { nombre: "Hamburguesa Clásica", precio: 6, imagen: "Hamburguesa Clasica.jpg", id: "hamburguesa-clasica" },
            { nombre: "Hamburguesa Huevona", precio: 7.5, imagen: "Hamburguesa Huevona.jpg" },
            { nombre: "Hamburguesa Tóxica", precio: 10.5, imagen: "Hamburguesa Toxica.jpg" },
            { nombre: "Hamburguesa Carguera", precio: 12, imagen: "Hamburguesa Carguera.jpg" },
            { nombre: "Hamburguesa Carguera X2", precio: 14.5, imagen: "Hamburguesa Carguera X2.jpg" },
        ],
    },
    {
        seccion: "Combos Alocados",
        items: [
            { nombre: "Porción Grande de Alitas", precio: 25, imagen: "Porcion Grande de Alitas.jpg", id: "combos" },
            { nombre: "Porción Familiar de Alitas", precio: 30, imagen: "Porcion Familiar de Alitas.jpg" },
            { nombre: "Porción Extra Grande de Alitas", precio: 55, imagen: "Porcion Extra Grande de Alitas.jpg" },
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
            { nombre: "Refresco de Piña Concentrada 1.2L", precio: 13, imagen: "Refresco de Pina Concentrada 1.2L.jpg" },
            { nombre: "Mate de Cacao 2L", precio: 8, imagen: "Mate de Cacao 2L.jpg" },
            { nombre: "Mate de Manzanilla 2L", precio: 8, imagen: "Mate de Manzanilla 2L.jpg" },
            { nombre: "Mate de Anís 2L", precio: 7, imagen: "Mate de Anis 2L.jpg" },
            { nombre: "Café 2L", precio: 9, imagen: "Cafe 2L.jpg" },
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
            { nombre: "Piña Colada", precio: 9, imagen: "Pina Colada.jpg" },
        ],
    },
];
function Menu() {
    const { addToCart } = useCart();
    const { language, t } = useLanguage();

    const translateDishName = (name) => {
        return dishTranslations[language]?.[name] || name;
    };

    // LÓGICA DE SCROLL AUTOMÁTICO (al detectar #en la URL)
    useEffect(() => {
        const hash = window.location.hash; // Captura el #alitas, #bebidas, etc.
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    // Función para crear IDs (ej: "Salchipapas Combinadas" -> "salchipapas-combinadas")
    const toSlug = (text) => text.toLowerCase().replace(/ /g, '-');

    return (
        <div className="container mx-auto px-4 py-16 font-body">
            <h1 className="text-4xl font-bold text-center mb-12 font-display text-white">
                {t('Menú Completo')}
            </h1>

            {menuData.map((seccion, index) => (
                // AQUI SE APLICA EL ID PARA QUE EL SCROLL LLEGUE AQUÍ
                <div key={index} id={toSlug(seccion.seccion)} className="mb-12">
                    <h2 className="text-3xl font-bold font-display text-red-500 border-b border-red-700 pb-2 mb-6 uppercase tracking-wide">
                        {t(seccion.seccion)}
                    </h2>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seccion.items.map((item, i) => (
                            <li
                                key={i}
                                className="bg-zinc-800 p-4 rounded-xl shadow transition-transform border border-zinc-700 hover:scale-105 flex flex-col justify-between"
                            >
                                <div>
                                    <img
                                        src={`/img/${item.imagen}`}
                                        alt={item.nombre}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <div className="text-white font-semibold text-lg md:text-xl font-display text-center mb-2">
                                        {translateDishName(item.nombre)}
                                    </div>
                                    <div className="text-zinc-400 text-center font-bold text-lg mb-4">
                                        S/. {item.precio.toFixed(2)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-base font-bold transition-colors shadow-md uppercase tracking-wider"
                                >
                                    {t('Agregar al carrito')}
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