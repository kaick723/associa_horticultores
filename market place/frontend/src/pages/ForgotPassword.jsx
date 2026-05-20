import { useState } from 'react';
import { apiFetch } from '../api';

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const submit = async (e)=>{
    e.preventDefault();
    setMessage('');
    try{
      const res = await apiFetch('/api/auth/forgot-password', { method: 'POST', body: { email } });
      setMessage((res.data && res.data.message) || 'Verifique seu email para instruções');
      if(res.data && res.data.previewUrl) setPreviewUrl(res.data.previewUrl);
    }catch(err){
      setMessage('Erro ao enviar instruções');
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '30px auto' }}>
      <h2>Esqueceu a senha</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Enviar instruções</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {previewUrl && (
        <div className="mt-2">
          <a href={previewUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">Abrir pré-visualização do e-mail (dev)</a>
        </div>
      )}
    </div>
  );
}
