import axios from 'axios';

async function testCadastro() {
  try {
    console.log('🔄 Testando cadastro...');
    
    const response = await axios.post('http://localhost:8080/api/usuario', {
      nome: 'Teste Frontend',
      email: 'teste.frontend@timeright.com',
      senha: '123456',
      codStatus: 1
    });
    
    console.log('✅ Cadastro funcionou!');
    console.log('📄 Resposta:', response.data);
    
  } catch (error) {
    console.log('❌ Erro no cadastro:');
    if (error.code === 'ECONNREFUSED') {
      console.log('🚫 Servidor offline');
    } else {
      console.log('📝 Erro:', error.response?.data || error.message);
    }
  }
}

testCadastro();