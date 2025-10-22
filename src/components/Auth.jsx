import { useState } from 'react'
import axios from 'axios'
import './Auth.css'

// Componente de autenticação administrativa
function Auth({ onBackClick }) {
  // Estado para alternar entre login e cadastro de admin
  const [isLogin, setIsLogin] = useState(true)
  
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  // Função para atualizar os campos do formulário
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Função para processar login/cadastro administrativo
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // LOGIN - Verifica admin padrão ou cadastrados
      if (formData.email === 'admin@timeright.com' && formData.password === 'admin123') {
        alert('Acesso autorizado! Admin padrão.')
        onBackClick('admin', { nome: 'Administrador', email: 'admin@timeright.com' })
        return
      }
      
      // Verifica admins cadastrados no localStorage
      const admins = JSON.parse(localStorage.getItem('admins') || '[]')
      const admin = admins.find(a => 
        a.email === formData.email && a.senha === formData.password
      )
      
      if (admin) {
        alert(`Bem-vindo, ${admin.nome}!`)
        onBackClick('admin', admin)
      } else {
        alert('Credenciais inválidas!')
      }
    } else {
      // CADASTRO - Validação e registro
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem!')
        return
      }
      
      if (!formData.name.trim()) {
        alert('Nome é obrigatório!')
        return
      }
      
      // Verifica se email já existe
      const admins = JSON.parse(localStorage.getItem('admins') || '[]')
      if (admins.find(a => a.email === formData.email)) {
        alert('Email já cadastrado!')
        return
      }
      
      // Cadastra novo admin
      const novoAdmin = {
        id: Date.now(),
        nome: formData.name,
        email: formData.email,
        senha: formData.password
      }
      
      admins.push(novoAdmin)
      localStorage.setItem('admins', JSON.stringify(admins))
      
      alert('Administrador cadastrado com sucesso!')
      setIsLogin(true)
      
      // Limpa formulário
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      })
    }
  }

  // Função para alternar entre login e cadastro
  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    })
  }



  return (
    <div className="auth-container">
      {/* Botão para voltar à página inicial */}
      <button className="back-button" onClick={onBackClick}>
        ← Voltar
      </button>
      
      <div className="auth-card">
        {/* Título dinâmico */}
        <h2 className="auth-title">
          {isLogin ? 'Login Administrativo' : 'Cadastro Administrativo'}
        </h2>
        
        {/* Formulário de autenticação administrativa */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          {/* Campo nome - só no cadastro */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Nome do Administrador</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Digite o nome completo"
              />
            </div>
          )}
          
          {/* Campo email */}
          <div className="form-group">
            <label htmlFor="email">Email Administrativo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Digite o email administrativo"
            />
          </div>
          
          {/* Campo senha */}
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Digite a senha"
              minLength="6"
            />
          </div>
          
          {/* Campo confirmar senha - só no cadastro */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirme a senha"
                minLength="6"
              />
            </div>
          )}
          
          {/* Botão dinâmico */}
          <button type="submit" className="auth-button">
            {isLogin ? 'Acessar Painel' : 'Cadastrar Admin'}
          </button>
        </form>
        
        {/* Informações sobre acesso padrão */}
        {isLogin && (
          <div className="admin-info">
            <small>
              🔑 Admin padrão: admin@timeright.com / admin123
            </small>
          </div>
        )}
        
        {/* Alternância entre login e cadastro */}
        <div className="auth-toggle">
          <p>
            {isLogin ? 'Não tem conta administrativa?' : 'Já tem conta administrativa?'}
            <button 
              type="button" 
              onClick={toggleMode} 
              className="toggle-button"
            >
              {isLogin ? 'Cadastrar Admin' : 'Fazer Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth