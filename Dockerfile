# Imagem base mais leve
FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos de dependências primeiro (cache de build)
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --production

# Copiar o restante do código
COPY . .

# Expor a porta da API
EXPOSE 3000

# Comando para iniciar em modo produção
CMD ["npm", "start"]
