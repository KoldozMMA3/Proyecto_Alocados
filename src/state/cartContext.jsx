import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.nombre === item.nombre);
            if (existing) {
                return prev.map((i) =>
                    i.nombre === item.nombre ? { ...i, cantidad: i.cantidad + 1 } : i
                );
            }
            return [...prev, { ...item, cantidad: 1 }];
        });
    };

    const removeFromCart = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
