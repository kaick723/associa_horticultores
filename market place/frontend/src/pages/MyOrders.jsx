import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      alert('Você precisa estar logado');
      window.location.href = '/login';
      return;
    }

    const fetchOrders = async () => {
      const { ok, data } = await apiFetch(`/api/users/orders/${user.id}`);
      if (ok) {
        setOrders(data);
      } else {
        alert('Erro ao carregar pedidos');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Carregando...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 12 }}>
      <h3>Meus Pedidos</h3>
      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item">
              <h5>Pedido #{order._id.slice(-6)}</h5>
              <p>Data: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: R$ {order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <p>Endereço: {order.deliveryAddress.address}, {order.deliveryAddress.number} - CEP: {order.deliveryAddress.cep}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - {item.qty} x R$ {item.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}