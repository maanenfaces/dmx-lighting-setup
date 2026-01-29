FROM node:18-slim

WORKDIR /app

COPY package.json ./
RUN npm install
COPY index.js ./

EXPOSE 8080
EXPOSE 6454/udp
CMD ["node", "index.js"]
