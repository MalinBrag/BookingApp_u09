FROM node:18-alpine as build

WORKDIR /my-booking-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /my-booking-app/dist/my-booking-app/browser /usr/share/nginx/html
#COPY --from=build /my-booking-app/dist/my-booking-app/server /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


