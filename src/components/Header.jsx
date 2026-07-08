import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaGlobe, FaClipboardList } from 'react-icons/fa'; // <-- AQUÍ ESTABA EL ERROR
import { useCart } from '../state/cartContext';
import { useLanguage } from '../state/languageContext'; 
import Login from './Login';

function Header() {
    const { cartItems, total } = useCart();
    const { language, changeLanguage, t } = useLanguage(); 
          
    const [showLogin, setShowLogin] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const emailGuardado = localStorage.getItem('email_usuario');
        if (emailGuardado) {
            setUsuario(emailGuardado);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token_alocados');
        localStorage.removeItem('email_usuario');
        setUsuario(null);
        window.location.reload();
    };

    return (
        <>
            <header className="bg-red-700 shadow-lg sticky top-0 z-40 font-body">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                                          
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-extrabold text-white tracking-wide font-display">
                        ALOCADOS
                    </Link>

                    {/* Navegación Traducida */}
                    <nav className="space-x-6 text-sm sm:text-base text-white flex items-center">
                        <Link to="/" className="hover:text-red-300 transition-colors">{t('navInicio')}</Link>
                        <Link to="/menu" className="hover:text-red-300 transition-colors">{t('navMenu')}</Link>
                        <Link to="/unamonos" className="hover:text-red-300 transition-colors">{t('navUnamonos')}</Link>
                                                  
                        <Link to="/carrito" className="hover:text-red-300 transition-colors inline-flex items-center">
                            <FaShoppingCart className="mr-1" />
                            {t('navCarrito')}
                            {cartItems && cartItems.length > 0 && (
                                <span className="ml-2 bg-white text-red-700 font-bold rounded-full px-2 py-0.5 text-xs">
                                    S/. {total.toFixed(2)}
                                </span>
                            )}
                        </Link>
                        
                        {/* SELECTOR DE IDIOMA */}
                        <div className="flex items-center gap-1 bg-red-800 px-2 py-1 rounded border border-red-600 ml-2">
                            <FaGlobe className="text-xs text-red-200" />
                            <select 
                                value={language} 
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
                            >
                                <option value="es" className="text-black font-sans">ES</option>
                                <option value="en" className="text-black font-sans">EN</option>
                                <option value="pt" className="text-black font-sans">PT</option>
                            </select>
                        </div>

                        {/* Autenticación UI Traducida */}
                        {usuario ? (
                            <div className="flex items-center gap-4 ml-2 pl-4 border-l border-red-500">
                                <span className="text-sm font-semibold text-yellow-300 hidden md:block">
                                    {t('hola')}, {usuario.split('@')[0]}
                                </span>
                                  
                                {/* BOTÓN: MIS PEDIDOS */}
                                <Link to="/mis-pedidos" className="hover:text-red-300 transition-colors flex items-center gap-1 text-sm font-bold">
                                    <FaClipboardList />
                                    {t('navMisPedidos')}
                                </Link>

                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-800 hover:bg-red-900 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                                >
                                    <FaSignOutAlt />
                                    {t('btnSalir')}
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setShowLogin(true)} 
                                className="hover:text-red-300 transition-colors inline-flex items-center ml-2 pl-4 border-l border-red-500 font-bold"
                            >
                                <FaUser className="mr-1" />
                                {t('btnIngresar')}
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            {/* Modal de login traducido */}
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default Header;