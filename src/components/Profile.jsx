import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config/database'
import './Admin.css'

function Profile({ adminData, onBackClick }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nome: adminData?.nome || '',
    email: adminData?.email || '',
    senha: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const updateData = {
        nome: formData.nome,
        email: formData.email
      }
      
      if (formData.senha) {
        updateData.senha = formData.senha
      }
      
      const response = await axios.put(`${API_BASE_URL}/usuario/${adminData.id}`, updateData)
      
      alert('Dados atualizados com sucesso!')
      setIsEditing(false)
      onBackClick('admin', response.data)
    } catch (error) {
      alert('Erro ao atualizar dados!')
    }
  }

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <div className="navbar-left">
          <h2 className="navbar-logo">TimeRight</h2>
        </div>
        <div className="navbar-center">
          <button className="nav-item">Funcionários</button>
          <button className="nav-item">Agenda</button>
          <button className="nav-item">Categoria</button>
          <button className="nav-item">Promoções</button>
        </div>
        <div className="navbar-right">
          <div className="admin-profile">
            <div className="profile-avatar-small">👤</div>
            <span className="admin-name">{adminData?.nome || 'Admin'}</span>
          </div>
          <button className="logout-btn" onClick={() => onBackClick('home')}>
            Sair
          </button>
        </div>
      </nav>
      
      <div className="profile-main">
        <div className="profile-card">
          <div className="profile-avatar-large">
            👤
          </div>
          
          <h2 className="profile-name">{formData.nome}</h2>
          
          {!isEditing ? (
            <div className="profile-view">
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{formData.email}</span>
              </div>
              
              <div className="profile-actions">
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>
                <button className="back-btn" onClick={() => onBackClick('admin')}>
                  Voltar
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-edit">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome"
                className="profile-input"
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="profile-input"
              />
              
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Nova senha (opcional)"
                className="profile-input"
              />
              
              <div className="profile-actions">
                <button className="save-btn" onClick={handleSave}>
                  Salvar
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile