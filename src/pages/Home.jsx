import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../state/languageContext'; // Importamos el idioma

const productos = [
    { nombre: 'Salchipapas Combinadas', imagen: "Papi Toxico.jpg", ruta: "/menu#salchipapas" },
    { nombre: 'Alitas', imagen: "Alas BBQ.jpg", ruta: "/menu#alitas" },
    { nombre: 'Posha Broaster', imagen: "Posha Carguera.jpg", ruta: "/menu#posha" },
    { nombre: 'Hamburguesas', imagen: "Hamburguesa Carguera.jpg", ruta: "/menu#hamburguesas" },
    { nombre: 'Combos Alocados', imagen: "Porcion Familiar de Alitas.jpg", ruta: "/menu#combos" },
    { nombre: 'Bebidas', imagen: "Limonada Americana Helada 1.2L.jpg", ruta: "/menu#bebidas" },
    { nombre: 'Cocteles', imagen: "Mojitos.jpg", ruta: "/menu#cocteles" },
];

function Home() {
    const navigate = useNavigate();
    const { t } = useLanguage(); // Hook de traducción

    return (
        <div className="font-body">
            <section className="bg-gradient-to-br from-red-700 via-black to-zinc-900 py-16 text-center">
                <h1 className="text-5xl font-extrabold text-white mb-6 tracking-wide font-display">
                    {t('homeWelcome')}
                </h1>
                <p className="text-lg text-zinc-300">
                    {t('homeSubWelcome')}
                </p>
                <div className="mt-5 flex justify-center items-center">
                    <img
                        src="/img/fachada.jpg"
                        alt="Fachada de Alocados"
                        className="w-[1500px] h-[450px] object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            <section className="py-1 container mx-auto px-10">
                <h2 className="text-3xl font-bold text-center text-white mb-5 font-display">
                    {t('homeCraving')}
                </h2>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {productos.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="bg-zinc-800 shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform">
                                <a href={item.ruta}>
                                    <img
                                        src={`/img/${item.imagen}`}
                                        alt={t(item.nombre)}
                                        className="w-full h-40 object-cover rounded mb-2"
                                    />
                                </a>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-white font-display">
                                        {t(item.nombre)}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="relative w-full max-w-3xl mx-auto mt-8 mb-8">
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="w-full md:w-1/2">
                            <video className="w-full h-auto cursor-pointer" controls>
                                <source src="/videos/vid_alocados.mp4" type="video/mp4" />
                                Tu navegador no soporta el formato de video.
                            </video>
                        </div>
                        <div className="w-full md:w-1/2 pl-0 md:pl-6 flex flex-col justify-center mt-4 md:mt-0">
                            <h2 className="text-2xl text-white font-bold mb-5">
                                {t('homeVideoTitle')}
                            </h2>
                            <p className="text-zinc-400 text-base leading-relaxed text-justify">
                                {t('homeVideoDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;