# Use the official Node.js image
FROM node:22

# Expose port for application 
EXPOSE 8000

# Set the working directory
WORKDIR /app

# Копирование package.json to the container
COPY ./package.json .

# Если package-lock.json существует, копировать его в контейнер
COPY ./yarn.json* .

# Установка зависимостей
RUN yarn

# Установка global nest cli
RUN npm install -g @nestjs/cli

# Копирование остальных файлов приложения в контейнер
COPY . .

CMD [ "yarn", "start:dev" ]