import { Link } from "react-router-dom";

export default function Cancellation() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ color: "#2f4f2f", marginBottom: 24 }}>
        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          6. Contato
        </h2>
        <p>
          Para solicitações de troca ou devolução, entre em contato:
        </p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>📧 Email: contato@horticultores.com.br</li>
          <li>📱 WhatsApp: (73) 99999-9999</li>
        </ul>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link to="/" className="btn btn-success">Voltar para Home</Link>
      </div>
    </div>
  );
}

