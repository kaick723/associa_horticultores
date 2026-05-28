import { useState } from 'react';
import { apiFetch } from '../api';

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e)=>{
    e.preventDefault();
    setMessage('');

    try{
      const res = await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      });

      setMessage(
        (res.data && res.data.message) ||
        'Se esse email existir, enviaremos as instruções.'
      );
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
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Enviar instruções
        </button>
      </form>

      {message && (
        <div className="alert alert-info mt-3">
          {message}
        </div>
      )}
    </div>
  );
}
