# DROPP – Loja Online de Dropshipping

Repositório único contendo o **backend** (Node.js/Express/MongoDB) e o **frontend** (React/Axios) da loja.

---

## Tecnologias

- **Backend**: Node.js, Express, MongoDB, Mongoose, Joi, dotenv, Jest, Supertest  
- **Frontend**: React, React Router, Axios, Context API  
- **Ferramentas**: Git, VSCode (ou similar)

---

## Estrutura de Pastas

```
DROPP/
├── dropshipping-backend/
│   ├── src/
│   │   ├── config/          # database.js
│   │   ├── controllers/     # productController.js, orderController.js
│   │   ├── middlewares/     # validações
│   │   ├── models/          # Product.js, Order.js
│   │   ├── routes/          # productRoutes.js, orderRoutes.js
│   │   ├── tests/           # product.test.js, order.test.js (Jest + Supertest)
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── .env.test
│   ├── jest.config.cjs
│   ├── package.json
│   └── .gitignore
│
└── dropshipping-frontend/
    ├── public/
    ├── src/
    │   ├── components/       # ProductCard.jsx
    │   ├── context/          # CartContext.jsx
    │   ├── pages/            # HomePage.jsx, ProductPage.jsx, CartPage.jsx, CheckoutPage.jsx
    │   ├── services/         # api.js
    │   ├── App.js
    │   └── index.js
    ├── .env.example
    ├── package.json
    └── .gitignore
```

---

## Instalação e Execução

### 1. Clonar o repositório e entrar na pasta raiz

```bash
git clone git@github.com:SEU_USUARIO/DROPP.git
cd DROPP
```

---

### 2. Backend

1. Acesse a pasta do backend:
   ```bash
   cd dropshipping-backend
   ```
2. Copie o arquivo de exemplo de variáveis de ambiente e edite:
   ```bash
   cp .env.example .env
   ```
   Em `dropshipping-backend/.env`, defina:
   ```
   MONGODB_URI=<sua_string_de_conexao_MongoDB>
   PORT=5001
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor em modo de desenvolvimento (recarga automática):
   ```bash
   npm run dev
   ```
   O backend ficará disponível em:
   ```
   http://localhost:5001
   ```
5. (Opcional) Execute os testes automatizados:
   ```bash
   npm test
   ```

---

### 3. Frontend

1. Em outro terminal, volte à raiz e entre na pasta do frontend:
   ```bash
   cd ../dropshipping-frontend
   ```
2. Copie o exemplo de variáveis de ambiente (opcional):
   ```bash
   cp .env.example .env
   ```
   Em `dropshipping-frontend/.env`, defina (se quiser personalizar):
   ```
   REACT_APP_BASE_API_URL=http://localhost:5001/api
   ```
   Caso não edite, o frontend usará `http://localhost:5001/api` por padrão.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie a aplicação React:
   ```bash
   npm start
   ```
   O frontend ficará disponível em:
   ```
   http://localhost:3000
   ```

---

## Uso Básico

1. **Criar produtos**  
   No backend (por Postman ou similar), faça um **POST** para:
   ```
   http://localhost:5001/api/products
   ```
   enviando JSON com, pelo menos, `name` e `price`.

2. **Navegar no frontend**  
   Abra no navegador:
   ```
   http://localhost:3000
   ```
   - A Home exibe todos os produtos.  
   - Clicando em um produto, vê detalhes e pode adicioná-lo ao carrinho.  
   - Na página “Carrinho”, ajuste quantidades ou siga para “Checkout”.

3. **Finalizar compra**  
   No Checkout, preencha nome, e-mail e endereço, e envie o pedido.

---

## Contribuição

1. Faça **fork** deste repositório.  
2. Clone seu fork:
   ```bash
   git clone git@github.com:SEU_USUARIO/DROPP.git
   cd DROPP
   ```
3. Crie um branch:
   ```bash
   git checkout -b feat/nova-funcionalidade
   ```
4. Implemente suas modificações, depois:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin feat/nova-funcionalidade
   ```
5. Abra um **Pull Request** no repositório original.

---

## Licença

Este projeto está licenciado sob a **MIT License**.
