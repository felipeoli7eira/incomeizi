FROM node:lts-alpine

WORKDIR /usr/frontend

ENV HOST=0.0.0.0
ENV PORT=8000

COPY ./app/package*.json ./

RUN npm install

COPY ./app/ .

EXPOSE 8000

CMD ["npm", "run", "dev"]
