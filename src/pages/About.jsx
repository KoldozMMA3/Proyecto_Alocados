import { useLanguage } from '../state/languageContext'; // Importamos el idioma

function About() {
    const { t } = useLanguage(); // Hook de traducción

    return (
        <div className="container mx-auto px-4 py-10 font-body">
            {/* Imagen de la campaña */}
            <div className="flex justify-center mb-8">
                <img
                    src="/img/campañaF.jpg"
                    alt="Campaña Unámonos"
                    className="w-[1200px] h-[600px] object-cover rounded-lg shadow-lg"
                />
            </div>
            {/* Descripción centrada */}
            <div className="text-center mb-8">
                <p className="text-white text-lg font-semibold mb-4 max-w-4xl mx-auto leading-relaxed">
                    {t('aboutDesc')}
                </p>
            </div>
            {/* Breve descripción de Unámonos */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-500 mb-4">{t('aboutQueEs')}</h2>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">
                    {t('aboutQueEsDesc')}
                </p>
            </div>
            {/* Imagen de los talleres */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-500 mb-4">{t('aboutTalleres')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex justify-center">
                            <img
                                src={`/img/talleres${index + 1}.jpg`}
                                alt={`Taller ${index + 1}`}
                                className="w-full h-56 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                    {t('aboutTalleresDesc')}
                </p>
            </div>
            {/* Imagen de logros */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-500 mb-4">{t('aboutLogros')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex justify-center">
                            <img
                                src={`/img/logros${index + 1}.jpg`}
                                alt={`Logro ${index + 1}`}
                                className="w-full h-56 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                    {t('aboutLogrosDesc')}
                </p>
            </div>
            {/* Sección de números destacados */}
            <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-bold mb-6">{t('aboutInspiran')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">100+</h3>
                        <p>{t('aboutStat1')}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">15</h3>
                        <p>{t('aboutStat2')}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">50+</h3>
                        <p>{t('aboutStat3')}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">10</h3>
                        <p>{t('aboutStat4')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;