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

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// GET /api/usuario
app.get('/api/usuario', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Usuario');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/usuario
app.post('/api/usuario', async (req, res) => {
  try {
    const { nome, email, senha, codStatus = 1 } = req.body;
    
    await sql.connect(dbConfig);
    const result = await sql.query`
      INSERT INTO Usuario (nome, email, senha, data_cadastro, cod_status) 
      VALUES (${nome}, ${email}, ${senha}, GETDATE(), ${codStatus});
      SELECT SCOPE_IDENTITY() as id;
    `;
    
    const newUser = await sql.query`SELECT * FROM Usuario WHERE id = ${result.recordset[0].id}`;
    res.status(201).json(newUser.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/usuario/login
app.post('/api/usuario/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    await sql.connect(dbConfig);
    const result = await sql.query`SELECT * FROM Usuario WHERE email = ${email} AND senha = ${senha}`;
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor com BD rodando na porta ${PORT}`);
});