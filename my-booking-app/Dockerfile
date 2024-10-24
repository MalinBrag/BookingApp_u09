FROM node:18-alpine as build

WORKDIR /my-booking-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

FROM node:18-alpine as production

COPY --from=build /my-booking-app/dist/my-booking-app/browser /my-booking-app/dist/my-booking-app/browser

CMD ["node", "dist/my-booking-app/browser/server/main.js"]


