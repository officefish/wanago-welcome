FROM node:22

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev" ]