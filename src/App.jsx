import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import Menu from './pages/Menu';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="min-h-screen bg-black text-white font-body">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/unamonos" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;