FROM node:18.15-alpine3.16

RUN npm install nodemon -g

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000
# required for docker desktop port mapping
# should be matched with the application port

CMD [ "npm", "run", "start" ]