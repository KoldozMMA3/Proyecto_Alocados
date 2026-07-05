import { useCart } from '../state/cartContext';
import { useState } from 'react';
import html2pdf from 'html2pdf.js';

function Cart() {
    const { cartItems, removeFromCart, total, setCartItems } = useCart();
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [statusText, setStatusText] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const deliveryFee = address.trim() !== '' ? 5.0 : 0;
    const igv = +(total * 0.18).toFixed(2);
    const grandTotal = +(total + deliveryFee + igv).toFixed(2);

    const handleOrderSubmit = async () => {
        const wait = (ms) => new Promise((res) => setTimeout(res, ms));

        setStep(3);
        setStatusText("⏳ Pedido en espera...");
        await wait(5000);

        setStatusText("🔍 Validando pedido...");
        await wait(5000);

        setStatusText("🍳 Preparando pedido...");
        await wait(5000);

        setStatusText("🚚 Pedido en camino...");
        await wait(5000);

        setStatusText("✅ Pedido entregado satisfactoriamente");
        await wait(2000);

        setStep(3.5);
    };

    const handleReseñaSubmit = () => {
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-10 font-body text-white">
            <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

            {step === 1 && cartItems.length === 0 && (
                <p className="text-zinc-300">Tu carrito está vacío.</p>
            )}

            {step === 1 && cartItems.length > 0 && (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center border border-zinc-600"
                            >
                                <div>
                                    <h2 className="text-lg font-display font-bold">
                                        {item.nombre}
                                    </h2>
                                    <p className="text-zinc-400">
                                        S/. {item.precio.toFixed(2)} x {item.cantidad}
                                    </p>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-300 font-bold"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Quitar
                                </button>
                            </div>
                        ))}
                        <div className="text-xl font-bold mt-6 text-right">
                            Total: S/. {total.toFixed(2)}
                        </div>
                        <div className="text-right mt-4">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded"
                            >
                                Ir a pagar
                            </button>
                        </div>
                    </div>
                </>
            )}

            {step === 2 && (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Dirección de entrega</h2>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ej. Av. Lima 123, Arequipa"
                            className="w-full p-2 rounded bg-zinc-900 border border-zinc-600 text-white"
                        />

                        <h2 className="text-2xl font-bold">Método de pago</h2>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-2 rounded bg-zinc-900 border border-zinc-600 text-white"
                        >
                            <option value="">Selecciona un método</option>
                            <option value="yape">Yape</option>
                            <option value="plin">Plin</option>
                            <option value="efectivo">Efectivo</option>
                        </select>

                        <button
                            disabled={!address || !paymentMethod}
                            onClick={handleOrderSubmit}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded disabled:opacity-50 mt-4"
                        >
                            Confirmar pedido y simular envío
                        </button>
                    </div>

                    <div
                        id="boleta"
                        className="bg-zinc-800 p-6 rounded-xl border border-zinc-600"
                    >
                        <h3 className="text-xl font-bold mb-4">Resumen del pedido</h3>
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between">
                <span>
                  {item.nombre} x{item.cantidad}
                </span>
                                <span>S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                        <hr className="my-4 border-zinc-600" />
                        <div className="flex justify-between">
                            <span>IGV (18%):</span>
                            <span>S/. {igv.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery:</span>
                            <span>S/. {deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-2">
                            <span>Total:</span>
                            <span>S/. {grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold mb-4 animate-pulse">{statusText}</h2>
                </div>
            )}

            {step === 3.5 && (
                <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-green-500">
                        ✅ Pedido entregado satisfactoriamente
                    </h2>
                    <p className="text-zinc-300 mb-4">¿Deseas descargar tu boleta ahora?</p>
                    <button
                        onClick={() => {
                            const content = document.getElementById('boleta');
                            if (content) {
                                html2pdf()
                                    .set({
                                        margin: 10,
                                        filename: 'boleta.pdf',
                                        html2canvas: { scale: 2 },
                                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                                    })
                                    .from(content)
                                    .save()
                                    .then(() => {
                                        setCartItems([]);
                                        setStep(4);
                                    });
                            }
                        }}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded"
                    >
                        Descargar Boleta
                    </button>
                </div>
            )}

            {step === 4 && (
                <div className="text-center mt-10 max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-green-500">
                        ✅ Pedido entregado satisfactoriamente
                    </h2>
                    <p className="text-zinc-300 mb-6">
                        Gracias por comprar en Alocados. ¡Buen provecho!
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        ¿Cómo calificarías tu experiencia?
                    </h3>
                    <div className="flex justify-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl ${
                                    rating >= star ? 'text-yellow-400' : 'text-zinc-600'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Deja un comentario si lo deseas..."
                        className="w-full p-3 rounded bg-zinc-900 border border-zinc-600 text-white"
                        rows={4}
                    ></textarea>
                    <button
                        onClick={handleReseñaSubmit}
                        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded"
                    >
                        Enviar reseña
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;