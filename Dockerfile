FROM node:14.21.2-alpine

RUN mkdir -p /var/www
WORKDIR /var/www

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3001

CMD [ "npm", "start" ]
