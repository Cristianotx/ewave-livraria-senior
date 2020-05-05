
FROM node:alpine as builder

COPY package*.json /app/

RUN cd /app && npm set progress=false && npm set strict-ssl false && npm install

COPY . /app

RUN cd /app && npm run build -- --prod --output-path=./dist/out


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
