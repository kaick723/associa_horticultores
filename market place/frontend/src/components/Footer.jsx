import { Link } from "react-router-dom";
import instaIcon from "../assets/insta.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: "#2f4f2f",
      color: "white",
      padding: "40px 20px 20px",
      marginTop: "auto"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 32
      }}>
        {/* Sobre Nós */}
        <div>
          <h3 style={{ marginBottom: 16, fontSize: "1.2rem", borderBottom: "2px solid #4a7c59", paddingBottom: 8 }}>
            Sobre Nós
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: "0.95rem", opacity: 0.9 }}>
            A Associação dos Horticultores do Sul da Bahia conecta produtores locais 
            de hortaliças, frutas, flores e materiais agrícolas aos consumidores de Itabuna e região.
          </p>
          <Link 
            to="/about" 
            style={{ color: "#8fbc8f", textDecoration: "underline", fontSize: "0.95rem" }}
          >
            Leia mais sobre nós →
          </Link>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 style={{ marginBottom: 16, fontSize: "1.2rem", borderBottom: "2px solid #4a7c59", paddingBottom: 8 }}>
            Links Rápidos
          </h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
            <li>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                🏠 Início
              </Link>
            </li>
            <li>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                🛒 Ver Produtos
              </Link>
            </li>
            <li>
              <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
                🛒 Meu Carrinho
              </Link>
            </li>
            <li>
              <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
                👤 Criar Conta
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                🔐 Entrar
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 style={{ marginBottom: 16, fontSize: "1.2rem", borderBottom: "2px solid #4a7c59", paddingBottom: 8 }}>
            Contato
          </h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
            <li>📍 <strong>Local:</strong> Mercado de Quinta-feira, Itabuna-BA</li>
            <li>📧 <strong>Email:</strong> contato@horticultores.com.br</li>
            <li>📱 <strong>WhatsApp:</strong> (73) 99999-9999</li>
            <li>📅 <strong>Funcionamento:</strong> Quinta-feira (presencial)</li>
            <li>
              <strong>Instagram:</strong> <a href="https://www.instagram.com/familiadasbatatas_?igsh=cGFpc3l1a3N2OHd3&utm_source=qr" target="_blank" rel="noreferrer" style={{ color: '#8fbc8f', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <img src={instaIcon} alt="Instagram" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                <span style={{ marginLeft: 4 }}>@familiadasbatatas_</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Política de Privacidade */}
        <div>
          <h3 style={{ marginBottom: 16, fontSize: "1.2rem", borderBottom: "2px solid #4a7c59", paddingBottom: 8 }}>
            Informações Legais
          </h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
            <li>
              <Link to="/privacy" style={{ color: "white", textDecoration: "none" }}>
                🔒 Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/terms" style={{ color: "white", textDecoration: "none" }}>
                📝 Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: "center",
        marginTop: 40,
        paddingTop: 20,
        borderTop: "1px solid rgba(255,255,255,0.2)",
        fontSize: "0.9rem",
        opacity: 0.8
      }}>
        <p>© {currentYear} Associação dos Horticultores do Sul da Bahia. Todos os direitos reservados.</p>
        <p style={{ fontSize: "0.85rem", marginTop: 8 }}>
          Feito com ❤️ para apoiar a agricultura familiar da região.
        </p>
      </div>
    </footer>
  );
}

