FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY server.js .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]