FROM node:alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM  node:alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM  nginx:1.23.3 as prod
EXPOSE 80
COPY --from=builder /app/dist/contacts-project /usr/share/nginx/html
CMD ["nginx", '-g', 'daemon off;'] 