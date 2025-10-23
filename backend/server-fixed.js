import express from 'express';
import cors from 'cors';
import sql from 'mssql';

const app = express();
const PORT = 8080;

// Configuração do banco
const dbConfig = {
  server: 'timeright.mssql.somee.com',
  database: 'timeright',
  user: 'Isxblly_07_SQLLogin_1',
  password: 'wm1qivt6o6',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

// CORS mais permissivo
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// GET /api/usuario
app.get('/api/usuario', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Usuario');
    res.json(result.recordset);
  } catch (error) {
    console.error('Erro GET /api/usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/usuario
app.post('/api/usuario', async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    const { nome, email, senha, codStatus = 1 } = req.body;
    
    await sql.connect(dbConfig);
    const result = await sql.query`
      INSERT INTO Usuario (nome, email, senha, data_cadastro, cod_status) 
      VALUES (${nome}, ${email}, ${senha}, GETDATE(), ${codStatus});
      SELECT SCOPE_IDENTITY() as id;
    `;
    
    const newUser = await sql.query`SELECT * FROM Usuario WHERE id = ${result.recordset[0].id}`;
    console.log('Usuário criado:', newUser.recordset[0]);
    res.status(201).json(newUser.recordset[0]);
  } catch (error) {
    console.error('Erro POST /api/usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/usuario/login
app.post('/api/usuario/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log('Tentativa de login:', email);
    
    await sql.connect(dbConfig);
    const result = await sql.query`SELECT * FROM Usuario WHERE email = ${email} AND senha = ${senha}`;
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    console.log('Login bem-sucedido:', email);
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Erro POST /api/usuario/login:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});