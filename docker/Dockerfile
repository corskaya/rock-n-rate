FROM node:18-alpine3.17 as build

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]