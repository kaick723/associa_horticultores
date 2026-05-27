import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import App from "./App"; // admin app
import logo from "./assets/logo.png";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Footer from './components/Footer';
import MyOrders from './pages/MyOrders';

export default function Root() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  const handleSaveUser = (u)=>{
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    const pending = JSON.parse(localStorage.getItem('pendingAdd') || 'null');
    if(pending){
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const idx = cart.findIndex(i=>i.id === (pending._id || pending.id));
      if(idx >= 0) cart[idx].qty += 1; else cart.push({ id: pending._id || pending.id, name: pending.name, price: pending.price, qty: 1, image: pending.mainImage || pending.image });
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.removeItem('pendingAdd');
      alert('Produto adicionado ao carrinho após criação da conta');
    }
  }

  const logout = ()=>{ localStorage.removeItem('user'); setUser(null); }

  return (
    <BrowserRouter>
      <header style={{ background: "#2f4f2f", padding: 10 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={logo} alt="Associação dos Horticultores" style={{ height: 36 }} />
            <span>Associação dos Horticultores</span>
          </Link>
          <nav style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: 'center' }}>
            <Link to="/" className="btn btn-light">Produtos</Link>
            <Link to="/cart" className="btn btn-light" title="Carrinho" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {/* simple cart SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1a1 1 0 0 1 1-1h1.27a1 1 0 0 1 .97.757L3.89 3H15a1 1 0 0 1 .98 1.197l-1.5 8A1 1 0 0 1 13.5 13H5a1 1 0 0 1-1-.858L3.11 2H1a1 1 0 0 1-1-1zM5.5 14a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
              </svg>
            </Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link to="/my-orders" className="btn btn-outline-light">Meus Pedidos</Link>
                <div style={{ color: 'white' }}>{user.name}</div>
                <button className="btn btn-outline-light" onClick={logout}>Sair</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light">Entrar</Link>
                <Link to="/signup" className="btn btn-outline-light">Criar conta</Link>
              </>
            )}

          </nav>
        </div>
      </header>

        <div style={{ paddingTop: 70, minHeight: "calc(100vh - 250px)" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart openSignup={()=> window.location.href = '/signup'} />} />
          <Route path="/signup" element={<Signup onSave={handleSaveUser} />} />
          <Route path="/login" element={<Login onLogin={handleSaveUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/admin/*" element={<App />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
