import { useState } from 'react'
import './Auth.css'

// Componente principal de autenticação que alterna entre login e cadastro
function Auth({ onBackClick }) {
  // Estado para controlar se está mostrando login (true) ou cadastro (false)
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

  // Função para processar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Verifica se é acesso de administrador
      if (formData.email === 'admin@timeright.com' && formData.password === 'admin123') {
        alert('Acesso de administrador autorizado!')
        onBackClick('admin') // Navega para painel admin
        return
      }
      
      // Login normal - busca usuário no backend
      try {
        const response = await fetch('http://localhost:8080/api/usuario')
        const usuarios = await response.json()
        
        const usuario = usuarios.find(u => 
          u.email === formData.email && u.senha === formData.password
        )
        
        if (usuario) {
          alert(`Bem-vindo, ${usuario.nome}!`)
          onBackClick('home')
        } else {
          alert('Email ou senha incorretos!')
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor!')
      }
    } else {
      // Validação para cadastro
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem!')
        return
      }
      
      // Cadastro - envia para o backend
      try {
        const response = await fetch('http://localhost:8080/api/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: formData.name,
            email: formData.email,
            senha: formData.password
          })
        })
        
        if (response.ok) {
          alert('Cadastro realizado com sucesso!')
          setIsLogin(true) // Muda para tela de login
        } else {
          alert('Erro ao realizar cadastro!')
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor!')
      }
    }
  }

  // Função para alternar entre login e cadastro
  const toggleMode = () => {
    setIsLogin(!isLogin)
    // Limpa os campos ao trocar de modo
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
        {/* Título dinâmico baseado no modo atual */}
        <h2 className="auth-title">
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </h2>
        
        {/* Formulário de autenticação */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          {/* Campo nome - só aparece no cadastro */}
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Digite seu nome completo"
              />
            </div>
          )}
          
          {/* Campo email - aparece sempre */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Digite seu email"
            />
          </div>
          
          {/* Campo senha - aparece sempre */}
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Digite sua senha"
              minLength="6"
            />
          </div>
          
          {/* Campo confirmar senha - só aparece no cadastro */}
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
                placeholder="Confirme sua senha"
                minLength="6"
              />
            </div>
          )}
          
          {/* Botão de envio com texto dinâmico */}
          <button type="submit" className="auth-button">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        
        {/* Informações sobre acesso de administrador */}
        {isLogin && (
          <div className="admin-info">
            <small>
              🔑 Administrador: admin@timeright.com / admin123
            </small>
          </div>
        )}
        
        {/* Link para alternar entre login e cadastro */}
        <div className="auth-toggle">
          <p>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              type="button" 
              onClick={toggleMode} 
              className="toggle-button"
            >
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth