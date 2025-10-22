import './Admin.css'

// Componente do painel administrativo
function Admin({ onBackClick, adminData, onNavigate }) {

  return (
    <div className="admin-container">
      {/* Navbar administrativa */}
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
          <div className="admin-profile" onClick={() => onNavigate && onNavigate('profile')}>
            <div className="profile-avatar-small">
              👤
            </div>
            <span className="admin-name">{adminData?.nome || 'Admin'}</span>
          </div>
          <button className="logout-btn" onClick={onBackClick}>
            Sair
          </button>
        </div>
      </nav>
      
      <div className="welcome-panel">
        <h1 className="welcome-title">Bem-Vindo</h1>
      </div>
    </div>
  )
}

export default Admin