FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 3000

CMD ["npm", "start"]

