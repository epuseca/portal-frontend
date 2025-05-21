# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Development stage
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app ./

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
