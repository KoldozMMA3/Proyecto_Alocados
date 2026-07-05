import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../state/cartContext';

function Header() {
    const { cartItems, total } = useCart();

    return (
        <header className="bg-red-700 shadow-lg sticky top-0 z-50 font-body">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide font-display">🍟 ALOCADOS</Link>
                <nav className="space-x-6 text-sm sm:text-base text-white flex items-center">
                    <Link to="/" className="hover:text-red-300 transition-colors">Inicio</Link>
                    <Link to="/menu" className="hover:text-red-300 transition-colors">Menú</Link>
                    <Link to="/unamonos" className="hover:text-red-300 transition-colors">Unámonos</Link>
                    <Link to="/carrito" className="hover:text-red-300 transition-colors inline-flex items-center">
                        <FaShoppingCart className="mr-1" />
                        Carrito
                        {cartItems.length > 0 && (
                            <span className="ml-2 bg-white text-red-700 font-bold rounded-full px-2 py-0.5 text-xs">
                S/. {total.toFixed(2)}
              </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
