import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import About from "./pages/About";
import MisPedidos from "./pages/MisPedidos"; // <-- NUEVA IMPORTACIÓN

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/unamonos" element={<About />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} /> {/* <-- NUEVA RUTA */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;