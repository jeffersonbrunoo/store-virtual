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
git clone git@github.com:jeffersonbrunoo/store-virtual.git
cd store-virtual
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

# Dockerização

Este projeto já possui Dockerfiles para o **backend** e para o **frontend**, além de um `docker-compose.yml` para orquestrar toda a aplicação (sem serviço Mongo local, pois usamos o MongoDB remoto). Siga os passos abaixo para subir o ambiente completo em containers:

---

## 1. Clone o repositório

```bash
git clone git@github.com:jeffersonbrunoo/store-virtual.git
cd store-virtual
```

---

## 2. Configure o `.env` do backend

### Acesse a pasta do backend:

```bash
cd dropshipping-backend
```

### Copie o arquivo de exemplo e edite:

```bash
cp .env.example .env
```

### Em `dropshipping-backend/.env`, defina as variáveis:

```env
MONGODB_URI=<sua_string_de_conexao_MongoDB_remoto>
PORT=5001
```

> **Importante:** verifique se o `.gitignore` inclui a linha `.env` para não versionar esse arquivo.

---

## 3. Configure o `.env` do frontend (opcional)

### Volte para a raiz do projeto:

```bash
cd ..
```

### Acesse a pasta do frontend:

```bash
cd dropshipping-frontend
cp .env.example .env
```

### Em `dropshipping-frontend/.env`, defina:

```env
REACT_APP_API_URL=http://backend:5001/api
```

> Caso não crie esse arquivo, o frontend usará por padrão `http://localhost:5001/api` localmente e `http://backend:5001/api` dentro do container, conforme definido no `docker-compose.yml`.

---

## 4. Suba todos os containers com Docker Compose

### Volte para a raiz do projeto:

```bash
cd ..
```

### Rode:

```bash
docker-compose up --build -d
```

- O `--build` força a reconstrução das imagens (backend e frontend).
- A flag `-d` roda os containers em segundo plano.



