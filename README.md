# 🛍️ FakeStore - E-commerce Simulado

## 📖 Sobre o Projeto

O **FakeStore** é um projeto de e-commerce desenvolvido para fins educacionais, que consome a [FakeStore API](https://fakestoreapi.com) - uma API gratuita e open-source que simula dados de uma loja virtual. O projeto foi criado para demonstrar conceitos fundamentais de desenvolvimento front-end, integração com APIs RESTful e gerenciamento de estado no navegador.

## 🎯 Intuito do Projeto

Este projeto foi desenvolvido com os seguintes objetivos:

- **Aprendizado de integração com APIs**: Demonstrar como consumir dados de uma API RESTful utilizando `fetch()` e manipular respostas JSON.
- **Prática de JavaScript**: Implementar funcionalidades como autenticação, filtros, busca, carrinho de compras e manipulação dinâmica do DOM.
- **Design responsivo**: Criar uma interface limpa e adaptável a diferentes tamanhos de tela usando apenas HTML e CSS.
- **Gerenciamento de estado**: Utilizar `localStorage` para persistir dados de autenticação e estado do carrinho entre sessões.
- **Arquitetura de projeto**: Organizar o código em estrutura de pastas clara (pages, scripts, styles) seguindo boas práticas.

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| **HTML5** | Estrutura das páginas |
| **CSS3** | Estilização e design responsivo |
| **JavaScript (ES6+)** | Lógica de negócio, consumo de API, manipulação do DOM |
| **FakeStore API** | Dados mockados de produtos, usuários e carrinhos |
| **LocalStorage** | Persistência de dados no navegador |
| **Live Server** | Servidor de desenvolvimento local |

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação
- **Login**: Autenticação de usuários utilizando a FakeStore API
- **Cadastro**: Criação de novas contas com validação de dados
- **Verificação de sessão**: Controle de acesso baseado em token armazenado no `localStorage`
- **Logout**: Encerramento de sessão com redirecionamento automático

### 🛒 Produtos
- **Listagem**: Exibição de todos os produtos disponíveis
- **Busca**: Filtro por texto (título, descrição ou categoria)
- **Categorias**: Filtro por categorias pré-definidas (eletrônicos, jóias, roupas masculinas/femininas)
- **Ordenação**: Ordenação por preço (crescente/decrescente) e nome

### 🛍️ Carrinho
- **Listagem**: Exibir produtos adicionados com quantidade e subtotal
- **Cálculo**: Cálculo automático do subtotal e total

### 👤 Usuário
- **Cadastro**: Criação de conta com validação de usuário existente
- **Verificação**: Checagem de disponibilidade de nome/email

## 🏗️ Como Foi Feito

### Estrutura do Projeto

```
/projeto-fakestore/
│
├── index.html                # Página inicial (redireciona para login)
│
├── pages/                    # Páginas do sistema
│   ├── login.html           # Página de autenticação
│   ├── criarUsuario.html    # Página de cadastro
│   ├── produtos.html        # Listagem de produtos
│   └── carrinho.html        # Carrinho de compras
│
├── scripts/                  # Código JavaScript
│   ├── login.js             # Lógica de autenticação
│   ├── criarUsuario.js      # Lógica de cadastro
│   ├── produtos.js          # Lógica de produtos (filtros, busca)
│   └── carrinho.js          # Lógica do carrinho
│
└── styles/                   # Estilos CSS
    ├── login.css            # Estilo da página de login
    ├── criarUsuario.css     # Estilo da página de cadastro
    ├── produtos.css         # Estilo da lista de produtos
    └── carrinho.css         # Estilo do carrinho
```


### Fluxo de Funcionamento

1. **Acesso inicial**: Ao abrir `index.html`, o sistema verifica se há um token válido no `localStorage`
   - ✅ Se sim → Redireciona para a página de produtos
   - ❌ Se não → Redireciona para a página de login

2. **Login**: O usuário insere credenciais (username + senha)
   - A requisição é enviada para a FakeStore API (`/auth/login`)
   - Em caso de sucesso, o token é armazenado no `localStorage`
   - Redireciona para a página de produtos

3. **Cadastro**: O usuário preenche os dados (nome, email, senha)
   - Verifica se o usuário já existe na API (`/users`)
   - Cria o usuário na API (`/users`) com método POST
   - Mostra mensagem de sucesso

4. **Produtos**: Ao acessar a página, os produtos são carregados da API
   - GET `/products` para listar todos os produtos
   - GET `/products/category/{categoria}` para filtrar por categoria
   - Filtros e busca são aplicados em tempo real (client-side)

5. **Carrinho**: Os produtos do carrinho são exibidos
   - GET `/carts/{id}` para buscar o carrinho do usuário
   - GET `/products/{id}` para detalhes de cada produto
   - Cálculo automático de subtotais e total

### Padrões e Boas Práticas Utilizados

- **Clean Code**: Nomes descritivos, funções pequenas e específicas
- **Separação de Responsabilidades**: HTML, CSS e JS em arquivos separados
- **Manipulação do DOM**: Criação dinâmica de elementos
- **Tratamento de Erros**: `try/catch` e `.catch()` para requisições
- **Feedback Visual**: Loaders e mensagens de sucesso/erro
- **Responsividade**: Mobile-first com media queries

## 🚀 Como Startar o Projeto

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- [VS Code](https://code.visualstudio.com/) (recomendado)
- Extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (opcional, mas recomendado)

### Passos para Executar

#### 1️⃣ Clonar o Repositório

git clone https://github.com/seu-usuario/fakestore.git
cd fakestore

### 2️⃣ Iniciar o Servidor

**Opção A - Via Live Server (recomendado):**

1. Clique com o botão direito no arquivo `index.html`
2. Selecione **"Open with Live Server"**
3. O projeto será aberto em `http://127.0.0.1:5500`

**Opção B - Via VS Code Live Server (atalho):**

1. Pressione `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (Mac)
2. Digite "Live Server: Open with Live Server"
3. Selecione e pressione Enter

### 3️⃣ Acessar no Navegador

- Abra `http://127.0.0.1:5500` (ou a porta configurada)
- Você será redirecionado automaticamente para a página de login

### Credenciais de Teste

| Username | Password |
|----------|----------|
| `mor_2314` | `83r5^_` |
| `johnd` | `m38rmF$` |

## 🎨 Estilização

O projeto utiliza um design **moderno e minimalista** com as seguintes características:

- **Paleta de cores**: Gradiente roxo/azul (`#667eea` → `#764ba2`)
- **Fontes**: `Segoe UI`, fonte padrão do Windows/macOS
- **Efeitos**: Animações suaves, hover effects, sombras
- **Responsividade**: Adaptação automática para dispositivos móveis

## 📚 Endpoints Utilizados da API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/auth/login` | POST | Autenticação do usuário |
| `/users` | GET | Lista todos os usuários |
| `/users` | POST | Cria um novo usuário |
| `/products` | GET | Lista todos os produtos |
| `/products/category/{categoria}` | GET | Lista produtos por categoria |
| `/products/{id}` | GET | Detalhes de um produto |
| `/carts/{id}` | GET | Detalhes de um carrinho |

## 🔒 Segurança

- **Autenticação**: Token JWT armazenado no `localStorage`
- **Rotas protegidas**: Redirecionamento automático para login em páginas restritas
- **Validação**: Dados validados antes de serem enviados à API

## ⚠️ Observações Importantes

1. **API Fake**: A FakeStore API **não persiste** dados criados (POST, PUT, DELETE). As alterações são simuladas apenas para teste.
2. **Cors**: A API já suporta CORS, podendo ser acessada diretamente do navegador.
3. **LocalStorage**: Os dados de autenticação são salvos apenas localmente.
4. **Educacional**: Este projeto foi criado para fins de aprendizado e demonstração.

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais.

## ✍️ Autor

Rafael da R. Ferreira - [rafaferreirarosa941@gmail.com](mailto:rafaferreirarosa941@gmail.com)

---

**Divirta-se explorando a FakeStore!** 🛍️

---

*Este projeto foi desenvolvido como parte de estudos em desenvolvimento web e integração de APIs.*
