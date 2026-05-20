import { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export default function SignupModal({ show, onClose, onSave }){
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(()=>{
    if(show){
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if(u){ setName(u.name || ''); setAddress(u.address || ''); }
    }
  },[show])

  if(!show) return null;

  const save = () => {
    if(!name.trim() || !address.trim()){ alert('Nome e endereço são obrigatórios'); return; }
    const userPayload = { name: name.trim(), address: address.trim() };

    // try to save to backend first
    apiFetch('/users', { method: 'POST', body: userPayload }).then((res) => {
      if (!res.ok) throw new Error('Erro ao salvar no servidor');
      const saved = res.data;
      localStorage.setItem('user', JSON.stringify(saved));
      onSave && onSave(saved);
      onClose && onClose();
    }).catch((err)=>{
      // fallback to localStorage if server fails
      const user = userPayload;
      localStorage.setItem('user', JSON.stringify(user));
      onSave && onSave(user);
      onClose && onClose();
    });
  }

  return (
    <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Criar conta</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Endereço</label>
              <textarea className="form-control" value={address} onChange={e=>setAddress(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={save}>Salvar conta</button>
          </div>
        </div>
      </div>
    </div>
  )
}
