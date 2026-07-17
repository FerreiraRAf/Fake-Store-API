// Nome: johnd Senha: m38rmF$
// Nome: mor_2314 Senha: 83r5^_

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const resultado = document.getElementById('resultado');
    const btnLogin = document.querySelector('.btn-login');

    if (password.length < 6) {
        alert('⚠️ A senha deve ter pelo menos 6 caracteres!');
        return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = '⏳ Entrando...';
    resultado.innerHTML = '';

    const credentials = { username: name, password: password };
    
    console.log('📤 Enviando:', credentials);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        signal: controller.signal 
    })
    .then(response => {
        clearTimeout(timeoutId);
        console.log('📥 Status:', response.status);
        
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Credenciais inválidas');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('✅ Resposta:', data);
        
        if (data.token) {
            localStorage.setItem('fakeStoreToken', data.token);
            localStorage.setItem('fakeStoreUser', name);
            
            resultado.style.background = '#d4edda';
            resultado.style.color = '#155724';
            resultado.style.padding = '10px';
            resultado.style.borderRadius = '8px';
            resultado.style.border = '1px solid #c3e6cb';
            resultado.innerHTML = '✅ Login realizado com sucesso! Redirecionando...';

            setTimeout(() => {
                window.location.href = '../pages/produtos.html';
            }, 1000);
        } else {
            throw new Error('Token não recebido');
        }
    })
    .catch(error => {
        clearTimeout(timeoutId);
        console.error('❌ Erro:', error);
        
        let mensagem = '❌ Erro ao fazer login. Tente novamente.';
        
        if (error.name === 'AbortError') {
            mensagem = '❌ Tempo limite excedido. Verifique sua conexão.';
        } else if (error.message.includes('Failed to fetch')) {
            mensagem = '❌ Não foi possível conectar ao servidor. Verifique sua internet.';
        } else if (error.message.includes('401') || error.message.includes('Invalid credentials')) {
            mensagem = '❌ Usuário ou senha incorretos!';
        }
        
        resultado.style.background = '#f8d7da';
        resultado.style.color = '#721c24';
        resultado.style.padding = '10px';
        resultado.style.borderRadius = '8px';
        resultado.style.border = '1px solid #f5c6cb';
        resultado.innerHTML = mensagem;
    })
    .finally(() => {
        btnLogin.disabled = false;
        btnLogin.textContent = 'Entrar';
    });
});