import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const apiUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${apiUrl}/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Dashboard do Admin</h1>
        <Link to="/admin/create">
          <button className="btn-create">Cadastrar Produto</button>
        </Link>
      </header>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={`https://picsum.photos/200?random=${p._id}`} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p className="price">R$ {p.price.toFixed(2)}</p>
            <p className={p.inStock ? "in-stock" : "out-stock"}>
              {p.inStock ? "Em estoque ✅" : "Fora de estoque ❌"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
