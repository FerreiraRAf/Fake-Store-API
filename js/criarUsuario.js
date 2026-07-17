        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });


        let usuarios = [];

        const resposta = fetch ( 'https://fakestoreapi.com/users' ) 
            . then ( response  => response . json()) 
            . then ( data  => {
                usuarios = data;
                console.log('✅ Usuários carregados:', usuarios.length);


                document.getElementById('registerForm').addEventListener('submit', function(e) {
                    e.preventDefault();

                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const password = document.getElementById('password').value;
                    const confirmPassword = document.getElementById('confirmPassword').value;
                    const modalConteiner = document.getElementById('meuModal');


                    if (name.trim().length < 3) {
                        alert('⚠️ Nome deve ter pelo menos 3 caracteres!');
                        return;
                    }

                    if (password.length < 6) {
                        alert('⚠️ A senha deve ter pelo menos 6 caracteres!');
                        return;
                    }

                    if (password !== confirmPassword) {
                        alert('⚠️ As senhas não coincidem!');
                        return;
                    }


                    const usuarioExistente = usuarios.some(user =>
                        user.email.toLowerCase() === email.toLowerCase() ||
                        user.username.toLowerCase() === name.toLowerCase()
                    );

                    if (usuarioExistente) {
                        alert('⚠️ Usuário já cadastrado!');
                        return;
                    }

                    // Dados para enviar
                    const userData = {
                        username: name,
                        email: email,
                        password: password
                    };

                    fetch ( 'https://fakestoreapi.com/users' ,  { 
                        method :  'POST' , 
                        headers :  {  'Content-Type' :  'application/json'  } , 
                        body :  JSON . stringify ( userData ) 
                    }) 
                    . then ( response  => response.json( ) ) 
                    . then ( user  => {
                        
                        modalConteiner.innerHTML = `
                            <div class="modal-content">
                                <span class="success-icon">✅</span>
                                <h2>Usuário criado com sucesso!</h2>
                                
                                <div class="user-info">
                                    <p>
                                        <strong>👤 Nome:</strong>
                                        <span>${name}</span>
                                    </p>
                                    <p>
                                        <strong>📧 Email:</strong>
                                        <span>${email}</span>
                                    </p>
                                </div>
                                
                                <button id="closeModal" class="btn-fechar">Fechar</button>
                            </div>
                        `;
                        modalConteiner.showModal();

                        const closeModal = document.getElementById('closeModal');
                            closeModal.addEventListener('click', function() {
                            modalConteiner.close();
                        });
                    }) ;

        });
            });