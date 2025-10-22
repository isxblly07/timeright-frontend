import { useState } from 'react'
import Auth from './components/Auth'
import Admin from './components/Admin'
import Profile from './components/Profile'
import './App.css'

// Componente principal da aplicação
function App() {
  // Estado para controlar qual página está sendo exibida
  // 'home' = página inicial, 'auth' = página de login/cadastro
  const [currentPage, setCurrentPage] = useState('home')
  
  // Estado para controlar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Estado para armazenar dados do admin logado
  const [adminData, setAdminData] = useState(null)

  // Função para navegar entre páginas
  const navigateTo = (page, data = null) => {
    setCurrentPage(page)
    if (data) setAdminData(data)
  }

  // Função para fazer logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('home')
  }

  // Renderização condicional baseada na página atual
  if (currentPage === 'auth') {
    return <Auth onBackClick={(page = 'home', data = null) => navigateTo(page, data)} />
  }
  
  if (currentPage === 'admin') {
    return <Admin onBackClick={() => navigateTo('home')} adminData={adminData} onNavigate={navigateTo} />
  }
  
  if (currentPage === 'profile') {
    return <Profile adminData={adminData} onBackClick={(page, data) => {
      if (data) setAdminData(data)
      navigateTo(page)
    }} />
  }

  // Página inicial (home)
  return (
    <div className="App">
      {/* Home page minimalista com fundo rosa pastel */}
      <main className="home-container">
        <h1 className="home-title">TimeRight</h1>
        <button 
          className="home-button"
          onClick={() => navigateTo('auth')}
        >
          Começar Agora
        </button>
      </main>
    </div>
  )
}

export default App