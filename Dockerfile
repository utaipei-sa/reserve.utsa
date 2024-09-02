FROM node:alpine as build

ARG BUILD_ENV

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . ./
COPY ".env.$BUILD_ENV" .env
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine


COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]