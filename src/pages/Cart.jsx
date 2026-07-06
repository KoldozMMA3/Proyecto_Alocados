import React, { useState } from 'react';
import { useCart } from '../state/cartContext'; // Importación nativa de tu contexto

const Cart = () => {
  const { cartItems, removeFromCart, total } = useCart();
  const [numeroOperacion, setNumeroOperacion] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleCheckoutPayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // 1. VALIDACIÓN: Obligar a estar logueado / vinculado
    const token = localStorage.getItem('token_alocados');
    if (!token) {
      setStatus({ 
        loading: false, 
        message: '⚠️ Acceso Denegado: Debes iniciar sesión o vincular tu cuenta de Gmail en la barra superior para proceder al pago.', 
        type: 'error' 
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. VALIDACIÓN: Validar que digite las 6 cifras de Yape
    if (!numeroOperacion || numeroOperacion.trim().length < 6) {
      setStatus({ 
        loading: false, 
        message: '⚠️ Por favor, ingresa un número de operación válido de Yape (mínimo 6 dígitos).', 
        type: 'error' 
      });
      return;
    }

    setStatus({ loading: true, message: 'Validando comprobante y registrando transacción atómica...', type: 'info' });

    // Mapeamos los productos según las propiedades de tu contexto
    const itemsPayload = cartItems.map(item => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      precioUnitario: item.precio
    }));

    try {
      const response = await fetch('http://localhost:3000/api/comprar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          total: parseFloat(total.toFixed(2)),
          items: itemsPayload,
          numeroOperacion: numeroOperacion.trim() // Enviamos el código al backend
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago en el servidor.');
      }

      setStatus({
        loading: false,
        message: `✅ ¡Pago enviado con éxito! Pedido #${data.pedidoId} registrado. Tu recibo digital se está enviando a tu correo electrónico.`,
        type: 'success'
      });

      // Limpieza controlada del carro tras la transacción exitosa
      setNumeroOperacion('');
      localStorage.removeItem('cart');
      setTimeout(() => {
        window.location.reload();
      }, 3500);

    } catch (error) {
      setStatus({ loading: false, message: `❌ Falla en la transacción: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-[85vh]">
      <h1 className="text-3xl font-black text-center mb-8 uppercase tracking-wider text-red-500">
        Resumen de tu Orden de Compra
      </h1>

      {status.message && (
        <div className={`p-4 rounded-xl mb-8 text-center font-bold shadow-md tracking-wide ${
          status.type === 'error' ? 'bg-red-900/80 text-red-200 border border-red-700' :
          status.type === 'success' ? 'bg-green-950/80 text-green-200 border border-green-700' :
          'bg-zinc-800 text-blue-300 border border-zinc-700'
        }`}>
          {status.message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 rounded-2xl border border-zinc-800">
          <p className="text-gray-400 text-xl mb-6">Tu carrito está vacío en este momento.</p>
          <a href="/menu" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-all uppercase tracking-wider text-sm">
            Ver el Menú Completo
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LADO IZQUIERDO: DETALLE DE ARTÍCULOS */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-gray-200 mb-4 border-b border-zinc-800 pb-2">Productos Seleccionados</h2>
            <div className="divide-y divide-zinc-800 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map((item, index) => (
                <div key={index} className="py-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg text-white block">{item.nombre}</span>
                    <span className="text-zinc-400 text-sm">Cantidad: {item.cantidad} x S/. {item.precio.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-red-500">S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-zinc-600 hover:text-red-500 font-bold text-xl transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800 text-right text-2xl font-black text-white">
              Total Neto: <span className="text-red-500">S/. {total.toFixed(2)}</span>
            </div>
          </div>

          {/* LADO DERECHO: PASARELA YAPE INTEGRADA */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
            <div className="w-full text-center mb-4">
              <span className="bg-cyan-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest">
                Pago Express vía Yape
              </span>
              <h3 className="text-lg font-bold text-gray-200 mt-2">Escanea el Código QR para pagar</h3>
            </div>

            {/* Renderizado de la imagen QR cargada */}
            <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-inner mb-4 border-4 border-cyan-500">
              <img 
                src="/img/qr_yape.jpeg" 
                alt="QR Yape Alocados Restobar" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = "https://www.svgrepo.com/show/499313/qr-code.svg";
                }}
              />
            </div>

            <p className="text-sm text-zinc-400 text-center mb-6">
              O realiza la transferencia directa al número telefónico:<br />
              <strong className="text-cyan-400 text-lg tracking-wider">956 222 110</strong><br />
              <span className="text-xs text-zinc-500">(Titular: Alocados Restobar S.A.C.)</span>
            </p>

            <form onSubmit={handleCheckoutPayment} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-zinc-400 mb-1 tracking-wider">
                  Número de Operación / Código de Referencia
                </label>
                <input 
                  type="text"
                  value={numeroOperacion}
                  onChange={(e) => setNumeroOperacion(e.target.value.replace(/\D/g, ''))}
                  required
                  placeholder="Ej: 054921"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-4 text-center text-xl font-bold tracking-widest text-cyan-400 focus:outline-none focus:border-cyan-500 transition-colors placeholder:tracking-normal placeholder:text-zinc-700"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading || cartItems.length === 0}
                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-lg ${
                  status.loading ? 'bg-zinc-800 cursor-not-allowed text-zinc-500' : 'bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-900/30 transform hover:-translate-y-0.5'
                }`}
              >
                {status.loading ? 'Verificando Código...' : 'Confirmar y Finalizar Pedido'}
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;