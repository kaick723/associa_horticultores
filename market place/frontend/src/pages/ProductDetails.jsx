import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const apiUrl = "http://localhost:3000";
  const params = useParams();

  useEffect(() => {
    const id = productId || params.id || window.location.pathname.split("/").pop();
    fetch(`${apiUrl}/products/${id}`)
      .then((r) => r.json())
      .then(setProduct)
      .catch(console.error);
  }, [productId, params.id]);

  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if(!user || !user.address){
      localStorage.setItem('pendingAdd', JSON.stringify(product));
      window.dispatchEvent(new Event('open-signup'));
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ id: product._id, name: product.name, price: product.price, qty: 1, image: product.mainImage });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Adicionado ao carrinho");
  };

  if (!product) return <div style={{ padding: 20 }}>Carregando...</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <img src={product.mainImage || "https://picsum.photos/400"} alt={product.name} style={{ width: 360, height: 360, objectFit: "cover", borderRadius: 8 }} />
        <div style={{ maxWidth: 700 }}>
          <h2 style={{ marginTop: 0 }}>{product.name}</h2>
          <p style={{ color: "#2f4f2f", fontWeight: 700 }}>R$ {Number(product.price).toFixed(2)}</p>
          <p>{product.description}</p>

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-success" onClick={addToCart}>Adicionar ao carrinho</button>
            <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>Voltar</button>
          </div>
        </div>
      </div>

      {product.images && product.images.length > 1 && (
        <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {product.images.map((src, i) => (
            <img key={i} src={src} alt={`img-${i}`} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6 }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
