import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const apiUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${apiUrl}/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "Todas" || p.category === category)
  );

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Menu Admin</h2>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <h3>Categorias</h3>
        <button onClick={() => setCategory("Todas")}>Todas</button>
        <button onClick={() => setCategory("Hortaliças")}>Hortaliças</button>
        <button onClick={() => setCategory("Frutas")}>Frutas</button>
        <button onClick={() => setCategory("Flores")}>Flores</button>
        <button onClick={() => setCategory("Sementes")}>Sementes</button>
        <button onClick={() => setCategory("Fertilizantes")}>Fertilizantes</button>
        <button onClick={() => setCategory("Ferramentas")}>Ferramentas</button>
        <button onClick={() => setCategory("Vasos")}>Vasos</button>
        <Link to="/admin/create">
          <button className="btn-create">Cadastrar Produto</button>
        </Link>
      </aside>

      <main className="admin-main">
        <div className="products-grid">
          {filteredProducts.map(p => (
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
      </main>
    </div>
  );
}

export default AdminHome;
