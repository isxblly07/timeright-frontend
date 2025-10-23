// Configuração do banco de dados SQL Server
export const dbConfig = {
  server: 'timeright.mssql.somee.com',
  database: 'timeright',
  user: 'Isxblly_07_SQLLogin_1',
  password: 'wm1qivt6o6',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
}

// Base URL da API
export const API_BASE_URL = 'https://didactic-space-fiesta-7vpvwxv9qj652wp-3001.app.github.dev/api'