import React, { useState, useEffect } from 'react';
import { useLanguage } from '../state/languageContext';

const MisPedidos = () => {
    const { t } = useLanguage();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPedidos = async () => {
            const token = localStorage.getItem('token_alocados');
            if (!token) {
                setError(t('historialErrorLogin'));
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/mis-pedidos', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Error al cargar');
                
                const data = await response.json();
                setPedidos(data);
            } catch (err) {
                setError(t('historialErrorServer'));
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, [t]);

    const contactarSoporte = (pedidoId) => {
        const mensaje = `Hola Alocados Restobar, necesito ayuda con mi Pedido #${pedidoId}.`;
        const url = `https://api.whatsapp.com/send?phone=51956222110&text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    if (loading) return <div className="text-center py-20 text-white font-bold text-xl">{t('historialCargando')}</div>;

    return (
        <div className="container mx-auto px-4 py-16 font-body min-h-[75vh]">
            <h1 className="text-4xl font-bold text-center mb-12 font-display text-white tracking-wider">
                {t('historialTitulo')}
            </h1>

            {error ? (
                <div className="bg-red-900/80 text-red-200 border border-red-700 p-4 rounded-xl text-center font-bold max-w-2xl mx-auto shadow-lg">
                    {error}
                </div>
            ) : pedidos.length === 0 ? (
                <div className="text-center text-zinc-400 text-xl bg-zinc-900 p-10 rounded-2xl max-w-3xl mx-auto border border-zinc-800">
                    {t('historialVacio')}
                    <br/><br/>
                    <a href="/menu" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-all uppercase tracking-wider text-sm shadow-md">
                        {t('verMenu')}
                    </a>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto grid gap-6">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6 hover:border-zinc-500 transition-colors">
                            
                            {/* Info del Pedido */}
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {t('pedidoId')} <span className="text-red-500">#{pedido.id}</span>
                                </h3>
                                <p className="text-zinc-400 text-sm">
                                    {t('fecha')}: {new Date(pedido.creado_en).toLocaleString()}
                                </p>
                                <p className="text-zinc-400 text-sm mt-1">
                                    Yape Op: <span className="font-mono text-cyan-400 font-bold tracking-widest">{pedido.numero_operacion}</span>
                                </p>
                            </div>
                            
                            {/* Estado y Monto */}
                            <div className="flex items-center gap-8 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-8">
                                <div className="text-center">
                                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">{t('estado')}</p>
                                    <span className="bg-green-950 text-green-400 border border-green-800 px-3 py-1.5 rounded-full text-xs font-black tracking-wider">
                                        {t('procesado')}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">{t('total')}</p>
                                    <p className="text-2xl font-black text-white">S/. {parseFloat(pedido.total).toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Botón WhatsApp */}
                            <div className="border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-6">
                                <button 
                                    onClick={() => contactarSoporte(pedido.id)}
                                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                    {t('soporte')}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MisPedidos;