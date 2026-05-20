import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ color: "#2f4f2f", marginBottom: 24 }}>Política de Privacidade</h1>
      
      <div style={{ lineHeight: 1.8, fontSize: "1rem", color: "#333", textAlign: "left" }}>
        <p style={{ marginBottom: 20 }}>
          A <strong>Associação dos Horticultores</strong> está comprometida em proteger a privacidade 
          e os dados pessoais dos nossos usuários. Esta Política de Privacidade estabelece como 
          coletamos, usamos e protegemos suas informações.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          1. Dados Coletados
        </h2>
        <p>
          Coletamos informações fornecidas por você no cadastro, como nome, email, telefone e endereço 
          para entrega. Também armazenamos dados dos produtos que você compra em nossa plataforma.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          2. Uso das Informações
        </h2>
        <p>
          Utilizamos seus dados para: processar pedidos, entregar produtos, entrar em contato regarding 
          compras, e melhorar nossos serviços. Não compartilhamos seus dados com terceiros sem seu consentimento.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          3. Armazenamento de Dados
        </h2>
        <p>
          Os dados são armazenados em nossos servidores de forma segura, utilizando protocolos de 
          criptografia para proteção. Você pode solicitar a exclusão dos seus dados a qualquer momento.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          4. Cookies
        </h2>
        <p>
          Utilizamos cookies para melhorar sua experiência de navegação e lembrar suas preferências. 
          Você pode desativar cookies nas configurações do seu navegador.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          5. Contato
        </h2>
        <p>
          Em caso de dúvidas sobre esta política, entre em contato conosco pelo email: 
          <strong> contato@horticultores.com.br</strong>
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link to="/" className="btn btn-success">Voltar para Home</Link>
      </div>
    </div>
  );
}

