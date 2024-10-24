FROM node:18-alpine as build

WORKDIR /my-booking-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

FROM node:18-alpine as production

WORKDIR /my-booking-app

COPY --from=build /my-booking-app/dist/my-booking-app/browser ./dist/my-booking-app/browser
COPY --from=build /my-booking-app/dist/my-booking-app/server ./dist/my-booking-app/server

CMD ["node", "dist/my-booking-app/server/main.server.mjs"]


