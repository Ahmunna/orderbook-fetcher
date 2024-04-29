FROM node:16

RUN apt-get update && apt-get install -y redis-tools

WORKDIR /user/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

CMD npm run dev
