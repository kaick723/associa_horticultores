import { useState } from "react";
import "./login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Login hardcoded (apenas para protótipo)
    if (username === "admin" && password === "123456") {
      setError("");        // Limpa qualquer erro anterior
      onLogin();           // Chama função do App.jsx
      setUsername("");     // Limpa campos
      setPassword("");
    } else {
      setError("Usuário ou senha incorretos");
      setPassword("");     // Limpa apenas a senha
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login do Administrador</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
           <br/>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
