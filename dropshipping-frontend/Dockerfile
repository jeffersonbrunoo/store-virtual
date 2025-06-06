# ---------------------------------------------------
# STAGE 1: Builder – gera o build estático do React
# ---------------------------------------------------
FROM node:22-alpine AS builder

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json para cache do npm
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia todo o código-fonte
COPY . .

# Cria o build de produção (gera a pasta 'build/')
RUN npm run build

# ---------------------------------------------------
# STAGE 2: Production – usa Nginx para servir o build estático
# ---------------------------------------------------
FROM nginx:stable-alpine AS production

# Remove qualquer conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos gerados no estágio anterior
COPY --from=builder /app/build /usr/share/nginx/html

# (Opcional) Se precisar de configuração customizada do Nginx para React Router:
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80 (onde o Nginx irá servir)
EXPOSE 80

# Comando padrão do Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
