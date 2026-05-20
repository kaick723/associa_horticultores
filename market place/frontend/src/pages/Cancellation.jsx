import { Link } from "react-router-dom";

export default function Cancellation() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ color: "#2f4f2f", marginBottom: 24 }}>Política de Troca e Devolução</h1>
      
      <div style={{ lineHeight: 1.8, fontSize: "1rem", color: "#333", textAlign: "left" }}>
        <p style={{ marginBottom: 20 }}>
          A <strong>Associação dos Horticultores</strong> preza pela satisfação dos clientes. 
          Veja abaixo nossas políticas para trocas e devoluções de produtos.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          1. Direito de Arrependimento
        </h2>
        <p>
          De acordo com o Código de Defesa do Consumidor, você tem até <strong>7 dias corridos</strong> 
          após o recebimento do produto para solicitar a devolução, caso não fique satisfeito.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          2. Condições para Devolução
        </h2>
        <p>
          O produto deve estar em sua embalagem original, sem sinais de uso e acompanhado da nota fiscal. 
          Produtos perecíveis (como hortaliças e frutas) devem ser devolvidos no mesmo dia do recebimento 
          caso apresentem problemas de qualidade.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          3. Produto Defeituoso
        </h2>
        <p>
          Caso receba um produto com defeito ou em más condições, entre em contato imediatamente 
          (em até 48 horas após o recebimento) para que possamos resolver a situação. O custo 
          do frete para devolução será.arcaded por nós.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          4. Processo de Devolução
        </h2>
        <p>
          Para solicitar uma devolução, entre em contato conosco pelo WhatsApp ou email. 
          Após a análise e aprovação, o reembolso será realizado no prazo de até 
          <strong> 5 dias úteis</strong> após o recebimento do produto.
        </p>

        <h2 style={{ color: "#2f4f2f", fontSize: "1.3rem", marginTop: 24, marginBottom: 12 }}>
          5. Troca de Produtos
        </h2>
        <p>
          Para trocar um produto (por outro tamanho, variedade, etc.), o cliente deve devolver 
          o produto original e realizar uma nova compra. Entre em contato para verificar a 
          disponibilidade do produto desejado.
        </p>

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

