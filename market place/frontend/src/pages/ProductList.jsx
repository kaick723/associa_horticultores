import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const apiUrl = "https://associacao-horticultores.onrender.com";

  useEffect(() => {
    fetch(`${apiUrl}/products`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const categories = ["Todas", ...Array.from(new Set(products.map(p => p.category || "Outros")))]

  const filtered = products.filter(p => (
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "Todas" || (p.category || "Outros") === category)
  ));

  const addToCart = (p) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if(!user || !user.address){
      // store pending and open signup modal
      localStorage.setItem('pendingAdd', JSON.stringify(p));
      window.dispatchEvent(new Event('open-signup'));
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex(i => i.id === p._id);
    if (idx >= 0) cart[idx].qty += 1; else cart.push({ id: p._id, name: p.name, price: p.price, qty: 1, image: p.mainImage });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Adicionado ao carrinho");
  }

  return (
    <div style={{ maxWidth: 1200, margin: "18px auto", padding: 12 }}>
      <div className="d-flex mb-3" style={{ gap: 8 }}>
        <input className="form-control" placeholder="Buscar" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <select className="form-select" style={{ width: 200 }} value={category} onChange={(e)=>setCategory(e.target.value)}>
          {categories.map((c,i)=> <option key={i} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="row">
        {filtered.map(p => (
          <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <Link to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={p.mainImage || `https://picsum.photos/300?random=${p._id}`} className="card-img-top" alt={p.name} style={{ height: 180, objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">R$ {Number(p.price).toFixed(2)}</p>
                </div>
              </Link>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-success" onClick={() => addToCart(p)}>Adicionar</button>
                <Link to={`/product/${p._id}`} className="btn btn-outline-secondary">Ver</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
