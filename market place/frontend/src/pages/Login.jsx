import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    setError('');
    try{
      const res = await apiFetch('/api/auth/login', { method: 'POST', body: { email, password } });
      if(!res.ok) return setError((res.data && res.data.error) || 'Credenciais inválidas');
      localStorage.setItem('user', JSON.stringify(res.data));
      if(onLogin) onLogin(res.data);
      navigate('/');
    }catch(err){
      setError('Erro ao conectar');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '30px auto' }}>
      <h2>Entrar</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" type="submit">Entrar</button>
          <a href="/forgot-password" className="btn btn-link">Esqueceu a senha?</a>
        </div>
      </form>
    </div>
  );
}
