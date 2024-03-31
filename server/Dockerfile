FROM node:lts-alpine3.19

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

RUN npm install express

CMD ["npm", "run", "dev"]