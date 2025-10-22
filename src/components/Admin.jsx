import { useState, useEffect } from 'react'
import './Admin.css'

// Componente do painel administrativo
function Admin({ onBackClick }) {
  // Estados para gerenciar usuários e carregamento
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Busca usuários do backend ao carregar o componente
  useEffect(() => {
    fetchUsuarios()
  }, [])

  // Função para buscar usuários da API
  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/usuario')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários')
      }
      
      const data = await response.json()
      setUsuarios(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Função para deletar usuário
  const deleteUsuario = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return
    
    try {
      const response = await fetch(`http://localhost:8080/api/usuario/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Remove usuário da lista local
        setUsuarios(usuarios.filter(user => user.id !== id))
        alert('Usuário deletado com sucesso!')
      } else {
        throw new Error('Erro ao deletar usuário')
      }
    } catch (err) {
      alert('Erro: ' + err.message)
    }
  }

  return (
    <div className="admin-container">
      {/* Botão para voltar */}
      <button className="back-button" onClick={onBackClick}>
        ← Voltar
      </button>
      
      <div className="admin-panel">
        <h1 className="admin-title">Painel Administrativo</h1>
        
        {/* Botão para recarregar dados */}
        <button className="refresh-btn" onClick={fetchUsuarios}>
          🔄 Atualizar
        </button>
        
        {/* Estados de carregamento e erro */}
        {loading && <p className="loading">Carregando usuários...</p>}
        {error && <p className="error">Erro: {error}</p>}
        
        {/* Lista de usuários */}
        {!loading && !error && (
          <div className="users-section">
            <h2>Usuários Cadastrados ({usuarios.length})</h2>
            
            {usuarios.length === 0 ? (
              <p className="no-users">Nenhum usuário encontrado</p>
            ) : (
              <div className="users-grid">
                {usuarios.map(usuario => (
                  <div key={usuario.id} className="user-card">
                    <div className="user-info">
                      <h3>{usuario.nome}</h3>
                      <p>{usuario.email}</p>
                      <small>ID: {usuario.id}</small>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteUsuario(usuario.id)}
                    >
                      🗑️ Deletar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin