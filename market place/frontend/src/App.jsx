import { useState, useEffect } from "react";
import Login from "./login";
import "./App.css";

function App() {
  const [adminLogged, setAdminLogged] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const apiUrl =
    import.meta.env.VITE_API_BASE ||
    "https://associacao-horticultores.onrender.com";

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    inStock: true,
    category: "Hortaliças",
    images: [],
    previews: [],
  });

  // orders
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);



  // ================== FETCH ==================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/admin/orders`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
    fetchOrders();
  }, []);

  // ================== FILTRO ==================
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "Todas" || p.category === category)
  );

  // ================== CRIAR ==================
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", parseFloat(newProduct.price));
      formData.append("inStock", newProduct.inStock);
      formData.append("category", newProduct.category);

      newProduct.images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok || res.status === 201) {
        setProducts([data, ...products]);

        setNewProduct({
          name: "",
          description: "",
          price: 0,
          inStock: true,
          category: "Hortaliças",
          images: [],
          previews: [],
        });

        setShowCreateForm(false);
        alert("Produto criado!");
      } else {
        alert(data.error || "Erro ao criar produto");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================== DELETE ==================
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar?")) return;

    try {
      await fetch(`${apiUrl}/products/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================== EDITAR ==================
  const handleEditProduct = (product) => {
  const existingImages =
    product.images?.length > 0
      ? product.images
      : product.mainImage
      ? [product.mainImage]
      : [];

  setEditingProduct({
    ...product,
    previews: existingImages,
    existingImages,
    images: [],
  });

  setShowEditForm(true);
  setShowCreateForm(false);
};

const handleUpdateProduct = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    editingProduct.existingImages?.forEach((img) => {
  formData.append("imagesToKeep", img);
});

    formData.append("name", editingProduct.name);
    formData.append("description", editingProduct.description);
    formData.append("price", parseFloat(editingProduct.price));
    formData.append("inStock", editingProduct.inStock);
    formData.append("category", editingProduct.category);

    editingProduct.images?.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(`${apiUrl}/products/${editingProduct._id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Erro ao atualizar");
      return;
    }

    // ✅ BUSCA ATUALIZADA DO BANCO (ESSA LINHA RESOLVE)
    const refresh = await fetch(`${apiUrl}/products`);
    const data = await refresh.json();
    setProducts(data);

    setShowEditForm(false);
    setEditingProduct(null);
    alert("Produto atualizado!");
  } catch (err) {
    console.error(err);
  }
};

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setEditingProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
      previews: [
        ...(prev.previews || []),
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    }));

    e.target.value = null;
  };

  const removeEditImage = (index) => {
  setEditingProduct((prev) => {
    const updatedPreviews = prev.previews.filter((_, i) => i !== index);

    return {
      ...prev,
      previews: updatedPreviews,
      existingImages: updatedPreviews.filter((img) =>
        typeof img === "string" && img.startsWith("http")
      ),
    };
  });
};

  // ================== MULTI-IMAGEM ==================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      previews: [
        ...prev.previews,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    }));

    e.target.value = null;
  };

  const navigateToProduct = (p) => {
    // navega para a rota pública do produto
    window.history.pushState({}, '', `/product/${p._id}`);
    // reload simples para forçar render sem router completo
    window.location.reload();
  };

  const removeImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index),
    }));
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
    setShowEditForm(false);
    setSidebarOpen(false);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  if (!adminLogged) {
    return <Login onLogin={() => setAdminLogged(true)} />;
  }

  return (
    <div className="admin-wrapper">
      {/* Topbar */}
      <header className="topbar">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <div className="topbar-actions">
          <button
            className="btn-create"
            onClick={() => {
              setShowOrders(false);
              setShowCreateForm(false);
              setShowEditForm(false);
              setSelectedProduct(null);
              setSidebarOpen(false);
            }}
          >
            Ver Produtos
          </button>
          <button
            className="btn-create"
            onClick={() => {
              setShowOrders(true);
              setShowCreateForm(false);
              setShowEditForm(false);
              setSelectedProduct(null);
              setSidebarOpen(false);
            }}
          >
            Ver Pedidos
          </button>
        </div>
        <h1>Admin Dashboard</h1>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Menu Admin</h2>

        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h3>Categorias</h3>
        <button onClick={() => setCategory("Todas")}>Todas</button>
        <button onClick={() => setCategory("Hortaliças")}>Hortaliças</button>
        <button onClick={() => setCategory("Frutas")}>Frutas</button>
        <button onClick={() => setCategory("Flores")}>Flores</button>
        <button onClick={() => setCategory("Sementes")}>Sementes</button>
        <button onClick={() => setCategory("Fertilizantes")}>
          Fertilizantes
        </button>
        <button onClick={() => setCategory("Ferramentas")}>
          Ferramentas
        </button>
        <button onClick={() => setCategory("Vasos")}>Vasos</button>

        <button className="btn-create" onClick={() => { setShowOrders(false); setShowCreateForm(false); setShowEditForm(false); setSelectedProduct(null); setSidebarOpen(false); }}>
          Ver Produtos
        </button>

        <button className="btn-create" onClick={openCreateForm}>
          Cadastrar Produto
        </button>

        <button className="btn-create" onClick={() => { setShowOrders(true); setShowCreateForm(false); setShowEditForm(false); setSelectedProduct(null); setSidebarOpen(false); }}>
          Ver Pedidos
        </button>
      </aside>

      {/* Modal produto */}
      {selectedProduct && (
        <div className="product-overlay" onClick={closeProduct}>
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeProduct}>
              ×
            </button>

            <div className="product-view">
              <div className="product-gallery">
                <img
                  className="main-image"
                  src={
                    selectedProduct.images?.[selectedImage] ||
                    selectedProduct.mainImage ||
                    `https://picsum.photos/500?random=${selectedProduct._id}`
                  }
                  alt={selectedProduct.name}
                />

                <div className="thumbs">
                  {selectedProduct.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="thumb"
                      className={i === selectedImage ? "active" : ""}
                      onClick={() => setSelectedImage(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="product-info">
                <h2>{selectedProduct.name}</h2>
                <p className="price">
                  R$ {Number(selectedProduct.price).toFixed(2)}
                </p>
                <p>{selectedProduct.description}</p>
                <p
                  className={
                    selectedProduct.inStock ? "in-stock" : "out-stock"
                  }
                >
                  {selectedProduct.inStock
                    ? "Em estoque ✅"
                    : "Fora de estoque ❌"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="admin-main">
        {/* ===== FORM EDITAR ===== */}
        {showEditForm && editingProduct ? (
          <div className="admin-form-container">
            <h2>Editar Produto</h2>

            <form onSubmit={handleUpdateProduct}>
              <label>Fotos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleEditImageChange}
              />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {editingProduct.previews?.map((src, i) => (
                  <div key={i} className="img-preview">
                    <img src={src} alt="preview" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/120x120?text=Sem+Imagem";}}/>
                    <button
                      type="button"
                      className="img-remove"
                      onClick={() => removeEditImage(i)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <label>Nome</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                required
              />

              <label>Descrição</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />

              <label>Preço</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                required
              />

              <button type="submit">Salvar</button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        ) : showCreateForm ? (
          <div className="admin-form-container">
            <h2>Cadastrar Produto</h2>

            <form onSubmit={handleCreateProduct}>
              <label>Fotos do Produto</label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {newProduct.previews.map((src, i) => (
                  <div key={i} className="img-preview">
                    <img src={src} alt="preview" />
                    <button
                      type="button"
                      className="img-remove"
                      onClick={() => removeImage(i)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <label>Nome</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />

              <label>Descrição</label>
              <textarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />

              <label>Preço</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                required
              />

              <button type="submit">Cadastrar</button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        ) : showOrders ? (
          <div className="orders-container" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Pedidos</h2>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <title>Lista de Pedidos - ${new Date().toLocaleDateString('pt-BR')}</title>
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            font-size: 12px;
                            line-height: 1.3;
                            margin: 10px;
                            color: #333;
                          }
                          .header {
                            text-align: center;
                            border-bottom: 2px solid #2f4f2f;
                            padding-bottom: 10px;
                            margin-bottom: 15px;
                          }
                          .header h1 {
                            color: #2f4f2f;
                            margin: 0;
                            font-size: 18px;
                          }
                          .order {
                            border: 1px solid #ddd;
                            border-radius: 6px;
                            padding: 8px;
                            margin-bottom: 10px;
                            page-break-inside: avoid;
                            background: #fff;
                          }
                          .order-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 6px;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 4px;
                          }
                          .order-number {
                            font-weight: bold;
                            color: #2f4f2f;
                            font-size: 14px;
                          }
                          .order-status {
                            display: inline-block;
                            padding: 2px 6px;
                            border-radius: 3px;
                            font-size: 10px;
                            font-weight: bold;
                          }
                          .status-pending { background-color: #fff3cd; color: #856404; }
                          .status-confirmed { background-color: #d1ecf1; color: #0c5460; }
                          .status-shipped { background-color: #d4edda; color: #155724; }
                          .status-delivered { background-color: #c3e6cb; color: #155724; }
                          .status-cancelled { background-color: #f8d7da; color: #721c24; }
                          .customer-info {
                            margin-bottom: 6px;
                            font-size: 11px;
                          }
                          .address {
                            margin-bottom: 6px;
                            font-size: 11px;
                            font-weight: bold;
                          }
                          .items {
                            font-size: 11px;
                            margin-bottom: 6px;
                          }
                          .items-summary {
                            background: #f8f9fa;
                            padding: 4px;
                            border-radius: 3px;
                            margin-top: 4px;
                          }
                          .total {
                            text-align: right;
                            font-weight: bold;
                            font-size: 13px;
                            color: #2f4f2f;
                            border-top: 1px solid #ddd;
                            padding-top: 4px;
                          }
                          .date {
                            font-size: 10px;
                            color: #666;
                            text-align: right;
                          }
                          @media print {
                            body { margin: 0; }
                            .order { break-inside: avoid; }
                          }
                          @page {
                            size: A4;
                            margin: 0.5cm;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <h1>Lista de Pedidos para Entrega</h1>
                          <p>Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        ${orders.filter(order => order.status !== 'delivered').map(order => `
                          <div class="order">
                            <div class="order-header">
                              <span class="order-number">Pedido #${order._id.slice(-6)}</span>
                              <span class="order-status status-${order.status}">
                                ${order.status === 'pending' ? 'Pendente' : 
                                  order.status === 'confirmed' ? 'Confirmado' : 
                                  order.status === 'shipped' ? 'Enviado' : 
                                  order.status === 'delivered' ? 'Entregue' : 'Cancelado'}
                              </span>
                            </div>
                            <div class="customer-info">
                              <strong>${order.user.name}</strong><br>
                              ${order.user.email}
                            </div>
                            <div class="address">
                              📍 ${order.deliveryAddress.address}, ${order.deliveryAddress.number}<br>
                              CEP: ${order.deliveryAddress.cep}
                            </div>
                            <div class="items">
                              <strong>Itens:</strong> ${order.items.length} produto(s)
                              <div class="items-summary">
                                ${order.items.slice(0, 3).map(item => 
                                  `${item.qty}x ${item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name}`
                                ).join(' • ')}
                                ${order.items.length > 3 ? ` • +${order.items.length - 3} mais` : ''}
                              </div>
                            </div>
                            <div class="total">
                              Total: R$ ${order.total.toFixed(2)}
                            </div>
                            <div class="date">
                              ${new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        `).join('')}
                      </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }}
                >
                  🖨️ Imprimir Todos
                </button>
                <button className="btn btn-outline-secondary" onClick={() => setShowOrders(false)}>Voltar</button>
              </div>
            </div>
            <div className="orders-list" style={{ display: 'grid', gap: 20 }}>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                  <h4>Nenhum pedido encontrado</h4>
                  <p>Ainda não há pedidos para exibir.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="order-card" style={{
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    padding: 20,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                      <div>
                        <h3 style={{ margin: 0, color: '#2f4f2f' }}>Pedido #{order._id.slice(-6)}</h3>
                        <small style={{ color: '#666' }}>
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')} às {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#2f4f2f' }}>
                          R$ {order.total.toFixed(2)}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <select
                            value={order.status}
                            onChange={async (e) => {
                              const nextStatus = e.target.value;
                              try {
                                const res = await fetch(`${apiUrl}/api/admin/orders/${order._id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: nextStatus })
                                });
                                const data = await res.json();
                                if (res.ok) {
                                  setOrders((prev) => prev.map((o) => (o._id === data._id ? data : o)));
                                } else {
                                  console.error('Erro ao atualizar status:', data);
                                  alert('Não foi possível atualizar o status do pedido.');
                                }
                              } catch (err) {
                                console.error('Erro na requisição de status:', err);
                                alert('Erro na comunicação com o servidor.');
                              }
                            }}
                            style={{
                              padding: '5px 10px',
                              borderRadius: 4,
                              border: '1px solid #ccc',
                              backgroundColor: order.status === 'pending' ? '#fff3cd' :
                                             order.status === 'confirmed' ? '#d1ecf1' :
                                             order.status === 'shipped' ? '#d4edda' :
                                             order.status === 'delivered' ? '#c3e6cb' : '#f8d7da',
                              color: order.status === 'pending' ? '#856404' :
                                     order.status === 'confirmed' ? '#0c5460' :
                                     order.status === 'shipped' ? '#155724' :
                                     order.status === 'delivered' ? '#155724' : '#721c24'
                            }}
                          >
                            <option value="pending">Pendente</option>
                            <option value="confirmed">Confirmado</option>
                            <option value="shipped">Enviado</option>
                            <option value="delivered">Entregue</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: 15 }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Cliente</h4>
                      <p style={{ margin: 0 }}><strong>{order.user.name}</strong></p>
                      <p style={{ margin: 0, color: '#666' }}>{order.user.email}</p>
                    </div>

                    <div style={{ marginBottom: 15 }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Endereço de Entrega</h4>
                      <p style={{ margin: 0 }}>
                        {order.deliveryAddress.address}, {order.deliveryAddress.number}<br />
                        CEP: {order.deliveryAddress.cep}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Itens do Pedido</h4>
                      <div style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 6 }}>
                        {order.items.map((item, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 0',
                            borderBottom: i < order.items.length - 1 ? '1px solid #eee' : 'none'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <img
                                src={item.image || `https://picsum.photos/40?random=${item.product}`}
                                alt={item.name}
                                style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                              />
                              <div>
                                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                <div style={{ fontSize: '0.9em', color: '#666' }}>
                                  {item.qty} x R$ {item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div style={{ fontWeight: 'bold' }}>
                              R$ {(item.price * item.qty).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className="product-card"
                onClick={() => openProduct(p)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <img
                  src={
                    p.mainImage
                      ? p.mainImage
                      : `https://picsum.photos/200?random=${p._id}`
                  }
                  alt={p.name}
                />

                <div className="card-actions">
                  <button
                    className="btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProduct(p);
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(p._id);
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p className="price">
                  R$ {Number(p.price).toFixed(2)}
                </p>
                <p className={p.inStock ? "in-stock" : "out-stock"}>
                  {p.inStock ? "Em estoque ✅" : "Fora de estoque ❌"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
