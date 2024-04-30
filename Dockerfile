FROM node:20-slim

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3100

ARG MODE
ENV MODE=$MODE

CMD npm run "$MODE"
