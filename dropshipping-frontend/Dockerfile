# ---------------------------------------------------
# STAGE 1: Builder – gera o build estático do React
# ---------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# ---------------------------------------------------
# STAGE 2: Production – usa Nginx para servir o build estático
# ---------------------------------------------------
FROM nginx:stable-alpine AS production

# Remove qualquer conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos gerados
COPY --from=builder /app/build /usr/share/nginx/html

# Copia apenas o bloco server {…} para conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
