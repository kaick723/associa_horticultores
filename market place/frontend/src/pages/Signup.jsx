import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

export default function Signup(props){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAddressFromCep = async (rawCep)=>{
    const onlyDigits = (rawCep || '').replace(/\D/g,'');
    if(onlyDigits.length !== 8) return;
    try{
      setLoadingCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
      const data = await res.json();
      if(data && !data.erro){
        const full = `${data.logradouro || ''} ${data.complemento || ''} ${data.bairro || ''} ${data.localidade || ''} - ${data.uf || ''}`.replace(/\s+/g,' ').trim();
        setAddress(full);
      }
    }catch(e){
      console.warn('CEP lookup failed', e);
    }finally{ setLoadingCep(false); }
  }

  const submit = async (e)=>{
    e.preventDefault();
    setError('');
    if(password !== confirm) return setError('Senhas não conferem');
    try{
      const res = await apiFetch('/api/auth/signup', { method: 'POST', body: { name, email, password, cep, address, number } });
      if(!res.ok){
        const message = typeof res.data === 'string'
          ? res.data
          : res.data?.error || res.data?.message || `Erro ao criar conta (${res.status})`;
        return setError(message);
      }
      localStorage.setItem('user', JSON.stringify(res.data));
      if(props.onSave) props.onSave(res.data);
      navigate('/');
    }catch(err){
      setError(err?.message || 'Erro de rede ao criar conta');
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '30px auto' }}>
      <h2>Criar conta</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Nome</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Confirmar senha</label>
          <input className="form-control" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>CEP</label>
          <input className="form-control" value={cep} onChange={e=>setCep(e.target.value)} onBlur={e=>fetchAddressFromCep(e.target.value)} placeholder="Só números, ex: 01001000" required />
        </div>
        <div className="mb-3">
          <label>Endereço completo</label>
          <input className="form-control" value={address} onChange={e=>setAddress(e.target.value)} required />
          {loadingCep && <div style={{fontSize:12, color:'#666'}}>Buscando endereço por CEP...</div>}
        </div>
        <div className="mb-3">
          <label>Número</label>
          <input className="form-control" value={number} onChange={e=>setNumber(e.target.value)} placeholder="Número da casa" required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" type="submit">Criar conta</button>
          <a href="/forgot-password" className="btn btn-link">Esqueceu a senha?</a>
        </div>
      </form>
    </div>
  );
}
