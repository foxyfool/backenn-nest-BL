

FROM node:slim

WORKDIR /app


COPY package*.json ./


RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate


COPY . .


RUN npm run build


EXPOSE 3001


CMD ["npm", "run", "start:dev"]
