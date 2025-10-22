import './Navbar.css'

// Componente de navegação principal
function Navbar({ onAuthClick, isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Mostra botões de login/cadastro apenas se não estiver logado */}
        {!isLoggedIn ? (
          <button className="nav-btn" onClick={onAuthClick}>
            Entrar / Cadastrar
          </button>
        ) : (
          // Mostra botão de logout se estiver logado
          <button className="nav-btn logout-btn" onClick={onLogout}>
            Sair
          </button>
        )}
      </div>
      
      {/* Logo centralizada */}
      <div className="navbar-center">
        <h1 className="logo">TimeRight</h1>
      </div>
      
      {/* Espaço reservado para futuros elementos à direita */}
      <div className="navbar-right">
        {isLoggedIn && (
          <span className="user-welcome">Bem-vindo!</span>
        )}
      </div>
    </nav>
  )
}

export default Navbar