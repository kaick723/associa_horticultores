import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";

export default function Cart(){
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  },[])

  const save = (next) => {
    setCart(next);
    localStorage.setItem('cart', JSON.stringify(next));
  }

  const changeQty = (i, qty) => {
    const next = [...cart];
    next[i].qty = Math.max(1, qty);
    save(next);
  }

  const remove = (i) => {
    const next = cart.filter((_, idx) => idx !== i);
    save(next);
  }

  const total = cart.reduce((s,it)=> s + (Number(it.price) * Number(it.qty)), 0);

  const checkout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if(!user || !user.address || !user.number){
        // request signup/address
        window.dispatchEvent(new Event('open-signup'));
        alert('Você precisa criar conta com endereço completo antes de finalizar o pedido');
        return;
      }

      const { ok, data } = await apiFetch('/api/users/orders', {
        method: 'POST',
        body: {
          userId: user.id,
          items: cart.map(it => ({
            product: it.id,
            name: it.name,
            price: it.price,
            qty: it.qty,
            image: it.image
          })),
          total
        }
      });

      if (ok) {
        alert('Pedido confirmado! Pedido criado com sucesso.');
        localStorage.removeItem('cart');
        setCart([]);
      } else {
        console.error('Erro ao confirmar pedido:', data);
        alert('Erro ao confirmar pedido: ' + (data.error || data.message || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro inesperado: ' + error.message);
    }
  }

  if (!cart.length) return (
    <div style={{ padding: 20 }}>
      <h3>Seu carrinho está vazio</h3>
      <Link to="/" className="btn btn-primary">Continuar comprando</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 12 }}>
      <h3>Meu Carrinho</h3>
      <div className="list-group mb-3">
        {cart.map((it, i) => (
          <div key={i} className="list-group-item d-flex align-items-center">
            <img src={it.image || `https://picsum.photos/80?random=${it.id}`} alt="img" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
            <div style={{ marginLeft: 12, flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div className="text-muted">R$ {Number(it.price).toFixed(2)}</div>
            </div>
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <input className="form-control" style={{ width: 80 }} type="number" value={it.qty} onChange={(e)=> changeQty(i, Number(e.target.value))} />
              <button className="btn btn-danger" onClick={()=> remove(i)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div><strong>Total:</strong> R$ {total.toFixed(2)}</div>
        <div>
          <button className="btn btn-success me-2" onClick={checkout}>Finalizar pedido</button>
          <Link to="/" className="btn btn-outline-secondary">Continuar comprando</Link>
        </div>
      </div>
    </div>
  )
}
