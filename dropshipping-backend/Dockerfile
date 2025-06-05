# ---------------------------------------------------
# STAGE 1: Builder – instala dependências e prepara o código
# ---------------------------------------------------
FROM node:22-alpine AS builder

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para aproveitar cache do Docker
COPY package.json package-lock.json ./

# Instala todas as dependências (incluindo devDependencies)
RUN npm ci

# Copia todo o restante do código-fonte para dentro do container
COPY . .

# ---------------------------------------------------
# STAGE 2: Runner – imagem enxuta pronta para rodar
# ---------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

# Copia node_modules e o código do estágio anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app      ./

# Define variável de ambiente para produção (ajuste se usar outra)
ENV NODE_ENV=production

# Expõe a porta que a sua API usa (ex: 5000). Ajuste se for outra.
EXPOSE 5000

# Comando padrão para iniciar a aplicação
CMD ["node", "index.js"]
