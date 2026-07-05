function About() {
    return (
        <div className="container mx-auto px-4 py-10 font-body">
            {/* Imagen de la campaña */}
            <div className="flex justify-center mb-8">
                <img
                    src="/img/campañaF.jpg"  // Asegúrate de que la imagen esté en la carpeta correcta
                    alt="Campaña Unámonos"
                    className="w-[1200px] h-[600px] object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Descripción centrada */}
            <div className="text-center mb-8">
                <p className="text-white text-lg font-semibold mb-4">
                    En Alocados Restobar nos enorgullece apoyar la causa de la Asociación Unámonos, una organización dedicada a mejorar la vida de los niños y jóvenes con discapacidad.
                    Gracias a esta colaboración, cada plato que compras en nuestro local contribuye a un futuro mejor para estos niños. ¡Tu ayuda es invaluable!
                </p>
            </div>

            {/* Breve descripción de Unámonos */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-500 mb-4">¿Qué es Unámonos?</h2>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
                    Unámonos es una organización sin fines de lucro dedicada a mejorar la calidad de vida de los niños y jóvenes con discapacidad en nuestra comunidad.
                    Su misión es brindarles herramientas educativas, emocionales y físicas para mejorar su integración social y su bienestar general.
                    Trabajamos con dedicación para crear un espacio donde los niños puedan desarrollarse plenamente, aprender nuevas habilidades y alcanzar su máximo potencial.
                </p>
            </div>

            {/* Imagen de los talleres */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Nuestros Talleres</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Imágenes de los talleres */}
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex justify-center">
                            <img
                                src={`/img/talleres${index + 1}.jpg`}  // Asegúrate de que las imágenes estén correctamente nombradas en la carpeta de imágenes
                                alt={`Taller ${index + 1}`}
                                className="w-full h-56 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto mt-4">
                    Los talleres son una parte fundamental del desarrollo de los niños y jóvenes en Unámonos. Cada taller está diseñado para fomentar habilidades prácticas, educativas y sociales, brindando a los participantes las herramientas necesarias para crecer y prosperar en la sociedad.
                </p>
            </div>

            {/* Imagen de logros */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Logros</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex justify-center">
                            <img
                                src={`/img/logros${index + 1}.jpg`}  // Asegúrate de que las imágenes estén correctamente nombradas en la carpeta de imágenes
                                alt={`Logro ${index + 1}`}
                                className="w-full h-56 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto mt-4">
                    Los logros alcanzados por los niños y jóvenes con discapacidad en Unámonos son verdaderamente inspiradores. Gracias al apoyo de todos, estos logros continúan impulsando el desarrollo y la integración de los pequeños en la sociedad.
                </p>
            </div>

            {/* Sección de números destacados */}
            <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-bold mb-6">Números que nos inspiran</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">100+</h3>
                        <p>Niños beneficiados</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">15</h3>
                        <p>Talleres impartidos</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">50+</h3>
                        <p>Familias apoyadas</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">10</h3>
                        <p>Años de experiencia</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
