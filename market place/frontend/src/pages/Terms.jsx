import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ color: "#2f4f2f", marginBottom: 24 }}>Termos de Uso</h1>
      
      <div style={{ lineHeight: 1.8, fontSize: "1rem", color: "#333", textAlign: "left" }}>
        <p style={{ marginBottom: 20 }}>
          Bem-vindo ao marketplace da <strong>Associação dos Horticultores</strong>. 
          Ao utilizar nossa plataforma, você concorda com os termos abaixo descritos.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          1. Aceitação dos Termos
        </h2>
        <p>
          Ao acessar e usar este site, você aceita e concorda em cumprir estes Termos de Uso. 
          Se você não concordar com qualquer parte destes termos, não utilize nossa plataforma.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          2. Cadastro de Usuário
        </h2>
        <p>
          Para realizar compras em nossa plataforma, você deve criar uma conta com informações 
          verdadeiras e atualizadas. Você é responsável por manter a confidencialidade da sua senha 
          e por todas as atividades realizadas em sua conta.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          3. Compra e Venda
        </h2>
        <p>
          Nossos vendedores são horticultores associados. Ao comprar um produto, você concorda 
          em pagar o valor informado no momento da compra. Os produtos são entregues conforme 
          combinado entre comprador e vendedor.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          4. Responsabilidades
        </h2>
        <p>
          O usuário é responsável por utilizar a plataforma de forma ética e legal. Não é permitido 
          publicar conteúdo falso, enganoso ou que viole direitos de terceiros. A Associação dos 
          Horticultores não se responsabiliza por disputas entre compradores e vendedores.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          5. Propriedade Intelectual
        </h2>
        <p>
          Todo o conteúdo desta plataforma (textos, imagens, logos) é propriedade da Associação dos 
          Horticultores ou de seus parceiros e não pode ser reproduzido sem autorização prévia.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          6. Alterações nos Termos
        </h2>
        <p>
          Reservamos o direito de modificar estes termos a qualquer momento. As alterações entram 
          em vigor imediatamente após a publicação no site.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          7. Contato
        </h2>
        <p>
          Em caso de dúvidas sobre estes termos, entre em contato pelo email: 
          <strong> contato@horticultores.com.br</strong>
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link to="/" className="btn btn-success">Voltar para Home</Link>
      </div>
    </div>
  );
}

