import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="nav-btn">Cadastro</button>
        <button className="nav-btn">Login</button>
      </div>
      <div className="navbar-center">
        <h1 className="logo">TimeRight</h1>
      </div>
      <div className="navbar-right"></div>
    </nav>
  )
}

export default Navbar