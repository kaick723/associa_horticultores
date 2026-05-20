import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword(){
  const query = useQuery();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>{
    const t = query.get('token');
    const e = query.get('email');
    if(t) setToken(t);
    if(e) setEmail(decodeURIComponent(e));
  },[]);

  const submit = async (e)=>{
    e.preventDefault();
    if(password !== confirm) return setMessage('Senhas não conferem');
    try{
      const res = await apiFetch('/api/auth/reset-password', { method: 'POST', body: { email, token, password } });
      if(!res.ok) return setMessage((res.data && res.data.error) || 'Erro');
      setMessage('Senha redefinida com sucesso');
      setTimeout(()=> navigate('/'), 1500);
    }catch(err){
      setMessage('Erro ao redefinir senha');
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '30px auto' }}>
      <h2>Redefinir senha</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Nova senha</label>
          <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Confirmar senha</label>
          <input className="form-control" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Redefinir</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
