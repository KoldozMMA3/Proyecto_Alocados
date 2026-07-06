import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../state/cartContext';
import Login from './Login'; // Importamos el modal emergente

function Header() {
    const { cartItems, total } = useCart();
    
    // Estados para controlar el modal y el usuario
    const [showLogin, setShowLogin] = useState(false);
    const [usuario, setUsuario] = useState(null);

    // Revisar si ya hay una sesión activa al cargar la página
    useEffect(() => {
        const emailGuardado = localStorage.getItem('email_usuario');
        if (emailGuardado) {
            setUsuario(emailGuardado);
        }
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('token_alocados');
        localStorage.removeItem('email_usuario');
        setUsuario(null);
        window.location.reload(); // Recargar para limpiar estados globales si los hay
    };

    return (
        <>
            <header className="bg-red-700 shadow-lg sticky top-0 z-40 font-body">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="bg-white text-red-700 px-2 py-1 rounded-md">AR</span>
                        Alocados Restobar
                    </Link>

                    {/* Navegación y Botones */}
                    <nav className="flex items-center gap-6 text-white font-medium">
                        <Link to="/" className="hover:text-red-300 transition-colors">Inicio</Link>
                        <Link to="/menu" className="hover:text-red-300 transition-colors">Menú</Link>
                        <Link to="/about" className="hover:text-red-300 transition-colors">Nosotros</Link>
                        
                        <Link to="/cart" className="hover:text-red-300 transition-colors inline-flex items-center">
                            <FaShoppingCart className="mr-2" />
                            Carrito
                            {cartItems && cartItems.length > 0 && (
                                <span className="ml-2 bg-white text-red-700 font-bold rounded-full px-2 py-0.5 text-xs">
                                    S/. {total.toFixed(2)}
                                </span>
                            )}
                        </Link>

                        {/* Validar si el usuario está logueado o no */}
                        {usuario ? (
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-red-500">
                                <span className="text-sm font-semibold text-yellow-300 hidden md:block">
                                    Hola, {usuario.split('@')[0]}
                                </span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-800 hover:bg-red-900 text-white px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2"
                                    title="Cerrar Sesión"
                                >
                                    <FaSignOutAlt />
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setShowLogin(true)} 
                                className="hover:text-red-300 transition-colors inline-flex items-center ml-4 pl-4 border-l border-red-500 font-bold"
                            >
                                <FaUser className="mr-2" />
                                Ingresar
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            {/* Renderizar el Modal Emergente si showLogin es true */}
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default Header;