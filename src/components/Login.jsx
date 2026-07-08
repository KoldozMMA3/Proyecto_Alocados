import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLanguage } from '../state/languageContext'; // Importamos idioma

const Login = ({ onClose }) => {
  const { t } = useLanguage(); // Hook de traducción
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigoOtp, setCodigoOtp] = useState('');
  
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    const endpoint = isLogin ? '/api/login' : '/api/registro';

    try {
      const respuesta = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setIsError(true);
        setMessage(data.error || 'Error');
        return;
      }

      if (isLogin) {
        localStorage.setItem('token_alocados', data.token);
        localStorage.setItem('email_usuario', data.usuario.email);
        
        setIsError(false);
        setMessage(`Success!`);
        
        setTimeout(() => {
            onClose();
            window.location.reload();
        }, 1200);
      } else {
        setIsError(false);
        setMessage('OTP Code sent to your email.');
        setIsVerifying(true);
      }

    } catch (error) {
      setIsError(true);
      setMessage('Server error.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const respuesta = await fetch('http://localhost:3000/api/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo: codigoOtp })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setIsError(true);
        setMessage(data.error || 'Error.');
        return;
      }

      setIsError(false);
      setMessage(data.mensaje);
      setIsVerifying(false);
      setIsLogin(true);
      setPassword('');
      setCodigoOtp('');

    } catch (error) {
      setIsError(true);
      setMessage('Verification error.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem('token_alocados', data.token);
        localStorage.setItem('email_usuario', data.usuario.email);
        
        setIsError(false);
        setMessage(`Success!`);
        
        setTimeout(() => {
            onClose();
            window.location.reload();
        }, 1200);
      } else {
        setIsError(true);
        setMessage(data.error || 'Error Google.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Error de red.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] px-4 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl relative text-black">
        
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-400 hover:text-red-600 text-3xl font-bold">&times;</button>

        {isVerifying ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">{t('verificarTitulo')}</h2>
            <p className="text-sm text-gray-500 text-center mb-6">{t('verificarSub')} <strong>{email}</strong></p>

            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-medium text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">{t('verificarCodigo')}</label>
                <input 
                  type="text" maxLength="6" value={codigoOtp}
                  onChange={(e) => setCodigoOtp(e.target.value)} required
                  className="w-full text-center px-4 py-3 border border-gray-300 rounded-lg text-2xl font-bold tracking-[10px] focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="000000"
                />
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md">{t('verificarBtn')}</button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {isLogin ? t('loginIniciar') : t('loginCrear')}
            </h2>

            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-medium text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('loginCorreo')}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('loginClave')}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md mt-2">
                {isLogin ? t('loginBtnIngresar') : t('loginBtnRegistrar')}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <hr className="w-full border-gray-300" />
              <span className="px-3 text-gray-400 text-sm font-medium">{t('loginO')}</span>
              <hr className="w-full border-gray-300" />
            </div>

            <div className="mt-6 flex justify-center">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setMessage('Google Error')} width="100%" />
            </div>

            <div className="mt-6 text-center text-sm">
              <button onClick={() => { setIsLogin(!isLogin); setMessage(''); setIsError(false); }} className="text-red-600 hover:underline font-bold">
                {isLogin ? t('loginNoCuenta') : t('loginSiCuenta')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;