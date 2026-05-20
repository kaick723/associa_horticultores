import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminCreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    inStock: true,
    image: null,
  });

  const navigate = useNavigate();
  const apiUrl = "https://associacao-horticultores.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("inStock", product.inStock);
    if (product.image) formData.append("image", product.image);

    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        body: formData,
      });

      if (res.ok || res.status === 201) {
        alert("Produto cadastrado!");
        navigate("/admin");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao cadastrar produto");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-create-product">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Nome"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />

        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          placeholder="Descrição"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />

        <label htmlFor="price">Preço</label>
        <input
          id="price"
          type="number"
          placeholder="Preço"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          min="0"
          step="0.01"
          required
        />

        <label htmlFor="inStock">Disponibilidade</label>
        <select
          id="inStock"
          value={product.inStock}
          onChange={(e) => setProduct({ ...product, inStock: e.target.value === "true" })}
        >
          <option value="true">Em estoque</option>
          <option value="false">Fora de estoque</option>
        </select>

        <label htmlFor="image">Fotos do Produto</label>
        <input
          id="image"
          type="file"
          onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
        />

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
          <button type="submit">Cadastrar</button>
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AdminCreateProduct;
