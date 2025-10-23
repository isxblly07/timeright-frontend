import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Dados em memória
let usuarios = [];
let nextId = 1;

// GET /api/usuario - Lista todos os usuários
app.get('/api/usuario', (req, res) => {
  res.json(usuarios);
});

// GET /api/usuario/{id} - Busca usuário por ID
app.get('/api/usuario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (!usuario) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  res.json(usuario);
});

// POST /api/usuario - Cria novo usuário
app.post('/api/usuario', (req, res) => {
  const { nome, email, senha, codStatus = 1 } = req.body;
  
  // Verifica se email já existe
  if (usuarios.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }
  
  const novoUsuario = {
    id: nextId++,
    nome,
    email,
    senha,
    dataCadastro: new Date().toISOString(),
    codStatus
  };
  
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// PUT /api/usuario/{id} - Atualiza usuário
app.put('/api/usuario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...req.body };
  res.json(usuarios[usuarioIndex]);
});

// DELETE /api/usuario/{id} - Remove usuário
app.delete('/api/usuario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  
  if (usuarioIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  
  usuarios.splice(usuarioIndex, 1);
  res.json({ message: 'Usuário deletado' });
});

// POST /api/usuario/login - Login de usuário
app.post('/api/usuario/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  
  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  res.json(usuario);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}/api`);
});