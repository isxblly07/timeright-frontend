// Script para testar conexão com backend
const axios = require('axios');

async function testBackend() {
  try {
    const response = await axios.get('http://localhost:8080/api/usuario');
    console.log('✅ Backend conectado! Status:', response.status);
  } catch (error) {
    console.log('❌ Backend offline:', error.code);
  }
}

testBackend();