FROM node:16

WORKDIR /user/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

CMD npm run dev
