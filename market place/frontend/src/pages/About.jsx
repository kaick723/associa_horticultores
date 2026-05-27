import { Link } from "react-router-dom";
import batataImg from '../assets/batatas.png';
import colherImg from '../assets/colher.jpeg';

export default function About() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ color: "#2f4f2f", fontSize: "2.5rem", marginBottom: 16 }}>
          Associação dos Horticultores
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Conectando horticultores de Itapé ao mercado
        </p>
      </div>

      <section style={{ marginBottom: 32 }}>
  <h2
    style={{
      color: "#2f4f2f",
      borderBottom: "2px solid #4a7c59",
      paddingBottom: 8,
      marginBottom: 16,
    }}
  >
    Conheça Nossa História
  </h2>

  <div
    style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      overflow: "hidden",
      borderRadius: "12px",
    }}
  >
    <iframe
      src="https://youtu.be/L4lWAPP0O3c?si=8_8PeBX9g9x23BeQ"
      title="Vídeo Associação dos Horticultores"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "12px",
      }}
    ></iframe>
  </div>
</section>
      <div style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#333" }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#2f4f2f", borderBottom: "2px solid #4a7c59", paddingBottom: 8, marginBottom: 16 }}>
            Nossa História
          </h2>
          <p>
            A <strong>Associação dos Horticultores</strong> nasceu de uma necessidade real: os agricultores 
            familiares de Itapé - BA que toda quinta-feira trazem suas produções de alimentos e materiais 
            agrícolas não tinham um espaço digital adequado para comercializar seus produtos.
          </p>
          <p>
            Pensando nessa demanda, desenvolvemos este <strong>marketplace</strong> para facilitar e modernizar 
            a comercialização dos produtos hortícolas da região. Nossa plataforma permite que horticultores 
            cadastrem seus produtos de forma simples e que os consumidores encontrem variedade de hortaliças, 
            frutas, flores, sementes e outros materiais agrícolas de qualidade.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#2f4f2f", borderBottom: "2px solid #4a7c59", paddingBottom: 8, marginBottom: 16 }}>
            Nossa Missão
          </h2>
          <p>
            Nossa missão é <strong>conectar</strong> os produtores horticultores de Itapé aos consumidores 
            e comerciantes de Itabuna e região, promovendo o desenvolvimento sustentável da agricultura familiar 
            e facilitando o acesso a produtos frescos e de qualidade.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#2f4f2f", borderBottom: "2px solid #4a7c59", paddingBottom: 8, marginBottom: 16 }}>
            O Mercado de Quinta-feira 
          </h2>
          <p>
            Todo jueves, dezenas de horticultores das cidades vizinhas se deslocam para vender 
            suas produções. Este tradicional mercado de jueves é fundamental para a economia local e para 
            a segurança alimentar da região.
          </p>
          <p>
            Com este marketplace digital, queremos <strong>ampliar as oportunidades de vendas</strong> desses 
            produtores, permitindo que eles alcancem mais clientes durante toda a semana, não apenas no dia 
            de mercado.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#2f4f2f", borderBottom: "2px solid #4a7c59", paddingBottom: 8, marginBottom: 16 }}>
            Nossos Valores
          </h2>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}><strong>Valorização do produtor local:</strong> Priorizamos os horticultores da região Sul da Bahia</li>
            <li style={{ marginBottom: 8 }}><strong>Qualidade:</strong> Promovemos produtos frescos e de excelência</li>
            <li style={{ marginBottom: 8 }}><strong>Sustentabilidade:</strong> Apoiamos a agricultura familiar e sustentável</li>
            <li style={{ marginBottom: 8 }}><strong>Transparência:</strong> Garantimos relações comerciais justas e seguras</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#2f4f2f", borderBottom: "2px solid #4a7c59", paddingBottom: 8, marginBottom: 16 }}>
            Venha Conhecer!
          </h2>
          <p>
            Somos parceiros dos horticultores que toda quinta-feira estão presentes no mercado. 
            Compre produtos frescos, apoiar a agricultura local e conheça de perto o trabalho dos nossos 
            produtores!
          </p>
        </section>
      </div>

<div
  style={{
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "30px"
  }}
>
  <div
    style={{
      width: "420px",
      height: "300px",
      overflow: "hidden",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}
  >
    <img
      src={batataImg}
      alt="Batatas"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  </div>

  <div
    style={{
      width: "420px",
      height: "300px",
      overflow: "hidden",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}
  >
    <img
      src={colherImg}
      alt="Horticultura"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  </div>
</div>

      <div style={{ textAlign: "center", marginTop: 40, paddingTop: 24, borderTop: "1px solid #ddd" }}>
        <Link to="/" className="btn btn-success" style={{ marginRight: 12 }}>
          Ver Produtos
        </Link>
        <Link to="/cart" className="btn btn-outline-secondary">
          Ver Carrinho
        </Link>
      </div>
    </div>
  );
}

