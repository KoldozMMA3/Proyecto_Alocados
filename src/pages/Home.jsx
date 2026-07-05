import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

const productos = [
    { nombre: 'Salchipapas Combinadas', imagen: "Papi Tóxico.jpg", ruta: "/menu#salchipapas" },
    { nombre: 'Alitas', imagen: "Alas BBQ.jpg", ruta: "/menu#alitas" },
    { nombre: 'Posha Broaster', imagen: "Posha Carguera.jpg", ruta: "/menu#posha" },
    { nombre: 'Hamburguesas', imagen: "Hamburguesa Carguera.jpg", ruta: "/menu#hamburguesas" },
    { nombre: 'Combos Alocados', imagen: "Porción Familiar de Alitas.jpg", ruta: "/menu#combos" },
    { nombre: 'Bebidas', imagen: "Limonada Americana Helada 1.2L.jpg", ruta: "/menu#bebidas" },
    { nombre: 'Cocteles', imagen: "Mojitos.jpg", ruta: "/menu#cocteles" },
];

function Home() {
    const navigate = useNavigate();

    const handleClick = (ruta) => {
        navigate(ruta);
    }

    return (
        <div className="font-body">
            <section className="bg-gradient-to-br from-red-700 via-black to-zinc-900 py-16 text-center">
                <h1 className="text-5xl font-extrabold text-white mb-6 tracking-wide font-display">¡Bienvenido a Alocados!</h1>
                <p className="text-lg text-zinc-300">Tu sabor favorito, al instante. Delivery y recojo en tienda disponibles.</p>
                {/* Imagen debajo del texto */}
                <div className="mt-5  flex justify-center items-center">
                    <img
                        src="/img/fachada.jpg"  // Asegúrate de que la imagen esté en la carpeta correcta
                        alt="Fachada de Alocados"
                        className="w-[1500px] h-[450px] object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            <section className="py-1 container mx-auto px 10">
                <h2 className="text-3xl font-bold text-center text-white mb-5 font-display">¿De qué te antojaste hoy?</h2>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    breakpoints={{
                        640: { slidesPerView: 2 },      // Para pantallas pequeñas (ej. móviles)
                        768: { slidesPerView: 3 },      // Para pantallas medianas (ej. tablets)
                        1024: { slidesPerView: 4 },     // Para pantallas grandes (ej. escritorios)
                    }}
                >
                    {productos.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-zinc-800 shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform">
                                <a href={item.ruta}> {/* Esto dirige a la ruta que definimos */}
                                    <img
                                        src={`/img/${item.imagen}`}
                                        alt={item.nombre}
                                        className="w-full h-40 object-cover rounded mb-2"
                                    />
                                </a>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-white font-display">{item.nombre}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="relative w-full max-w-3xl mx-auto mt-8">
                    <div className="flex items-start">
                        {/* Video en la parte izquierda */}
                        <div className="w-1/2">
                            <video
                                className="w-full h-auto cursor-pointer"
                                controls
                            >
                                <source src="/videos/vid_alocados.mp4" type="video/mp4" />
                                Tu navegador no soporta el formato de video.
                            </video>
                        </div>

                        {/* Descripción en la parte derecha */}
                        <div className="w-1/2 pl-6 flex flex-col justify-center">
                            <h2 className="text-2xl text-white font-bold mb-5">Conocenos y Unete a la causa</h2>
                            <p className="text-zinc-350 text-xl">
                                En Alocados Restobar, no solo nos dedicamos a ofrecerte los mejores platillos, sino que también te invitamos a ser parte de un movimiento solidario.
                                Nos hemos unido a Unámonos, una organización dedicada a apoyar a niños con discapacidades, para que cada compra que realices sea una contribución directa a una causa noble.

                                Durante el Mes de la Solidaridad, diversas empresas del sector de la alimentación están tomando la iniciativa de apoyar a los pequeños con habilidades especiales, trabajando para crear un futuro mejor para ellos.

                                Por cada plato que compres, se donará S/. 1 a Unámonos, una asociación comprometida con el desarrollo y bienestar de la comunidad en Arequipa. Juntos, podemos hacer una gran diferencia. ¡Únete a nosotros y sé parte de este hermoso cambio!
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Home;
