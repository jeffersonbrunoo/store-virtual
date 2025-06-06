# STAGE 1: Builder – instala dependências e prepara o código
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# STAGE 2: Runner – imagem enxuta pronta para rodar
FROM node:24-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app           ./

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "index.js"]
