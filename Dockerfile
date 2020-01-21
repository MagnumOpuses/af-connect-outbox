FROM node:10-alpine

# Create server directory
RUN apk update

# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
COPY . .
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# EXPOSE and BIND port
EXPOSE 8100

WORKDIR /app

CMD [ "node", "./app.js" ]