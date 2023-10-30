FROM node:18-alpine as build

ARG API_URL=""

ENV REACT_APP_API_URL=${API_URL}

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]