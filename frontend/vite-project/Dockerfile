# Stage 1: Build the application
FROM node:19-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
# Copy the build output
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf.default 2>/dev/null || true
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




# Stage 1: Build the application
#FROM node:19-alpine as builder
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#<<<<<<< HEAD
# Build the application (assuming you have a build script in package.json)
#EXPOSE 5173

#CMD npm run dev
#=======
#RUN npm run build

# Stage 2: Serve the app using Nginx
#FROM nginx:alpine
# Copy the build output
#COPY --from=builder /app/dist /usr/share/nginx/html
# Copy nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# Remove default nginx configuration
#RUN rm /etc/nginx/conf.d/default.conf.default 2>/dev/null || true
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
#>>>>>>> files modifed
